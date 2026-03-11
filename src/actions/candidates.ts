'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import path from "path"
import { existsSync, mkdirSync } from "fs"

// 1. Postular un candidato (Guardar datos y foto)
export async function createCandidate(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const position = formData.get('position') as string;
  const dependency = formData.get('dependency') as string;
  const file = formData.get('photo') as File;

  if (!fullName || !position || !dependency || !file || file.size === 0) {
    return { error: "Todos los campos y la fotografía son obligatorios." };
  }

  try {
    // Preparar la imagen para guardarla localmente
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre único para la foto
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.name.split('.').pop();
    const filename = `candidato-${uniqueSuffix}.${ext}`;

    // Asegurar que la carpeta public/uploads exista
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Guardar la imagen en public/uploads/
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // La URL pública que guardaremos en la base de datos
    const photoUrl = `/uploads/${filename}`;

    // Crear el registro en la base de datos (Estado: PENDING por defecto)
    await prisma.candidate.create({
      data: {
        fullName,
        position,
        dependency,
        photoUrl,
        status: "PENDING"
      }
    });

    return { success: "Postulación enviada con éxito. Está pendiente de aprobación." };
  } catch (error) {
    console.error(error);
    return { error: "Ocurrió un error al guardar la postulación." };
  }
}

// 2. Aprobar un candidato (Regla: Máximo 4 aprobados)
export async function approveCandidate(candidateId: string) {
  try {
    // Contar cuántos están aprobados actualmente
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

    revalidatePath('/admin/candidatos'); // Refresca la tabla del admin en tiempo real
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