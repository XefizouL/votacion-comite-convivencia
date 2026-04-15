'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// 1. Postular un candidato (Guardar datos y enviar foto a la nube ImgBB)
export async function createCandidate(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const position = formData.get('position') as string;
  const file = formData.get('photo') as File;

  if (!fullName || !position || !file || file.size === 0) {
    return { error: "Todos los campos y la fotografía son obligatorios." };
  }

  // Asegurarnos de que tenemos la API Key
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return { error: "Error de configuración del servidor: Falta API Key de imágenes." };
  }

  try {
    // 1. Convertir la imagen a formato Base64 para que la nube la acepte
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 2. Preparar el envío a ImgBB
    const imgData = new FormData();
    imgData.append('image', base64Image);

    // 3. Enviar la imagen a la nube
    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgData,
    });

    const imgbbResult = await imgbbResponse.json();

    if (!imgbbResponse.ok || !imgbbResult.success) {
      throw new Error("No se pudo subir la imagen a la nube.");
    }

    // 4. Obtener la URL pública final de la imagen
    const photoUrl = imgbbResult.data.url;

    // 5. Crear el registro en la base de datos con la URL de la nube
    await prisma.candidate.create({
      data: {
        fullName,
        position,
        photoUrl,
        status: "PENDING"
      }
    });

    // ESTA LÍNEA ES LA QUE FALTABA: Refresca el panel cuando alguien se postula
    revalidatePath('/admin/candidatos');

    return { success: "Postulación enviada con éxito. Está pendiente de aprobación." };
  } catch (error) {
    console.error(error);
    return { error: "Ocurrió un error al guardar la postulación." };
  }
}

// 2. Aprobar un candidato (Regla: Máximo 4 aprobados)
export async function approveCandidate(candidateId: string) {
  try {
    const approvedCount = await prisma.candidate.count({
      where: { status: "APPROVED" }
    });

    if (approvedCount >= 4) {
      return { error: "No puedes aprobar más de 4 candidatos en este proceso." };
    }

    await prisma.candidate.update({
      where: { id: candidateId },
      data: { status: "APPROVED" }
    });

    revalidatePath('/admin/candidatos'); // Refresca la tabla del admin
    return { success: true };
  } catch (error) {
    return { error: "Error al aprobar al candidato." };
  }
}

// 3. Rechazar un candidato
export async function rejectCandidate(candidateId: string) {
  try {
    await prisma.candidate.update({
      where: { id: candidateId },
      data: { status: "REJECTED" }
    });

    revalidatePath('/admin/candidatos');
    return { success: true };
  } catch (error) {
    return { error: "Error al rechazar al candidato." };
  }
}

// 4. Obtener todos los candidatos (Para el panel de Admin)
export async function getAllCandidates() {
  return await prisma.candidate.findMany({
    orderBy: { createdAt: 'desc' }
  });
}