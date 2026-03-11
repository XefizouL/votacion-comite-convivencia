'use server'
import prisma from "@/lib/prisma"

export async function registerUser(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const documentId = formData.get('documentId') as string;
  const email = formData.get('email') as string;
  const dependency = formData.get('dependency') as string;

  if (!fullName || !documentId || !email || !dependency) {
    return { error: "Todos los campos son obligatorios." };
  }

  try {
    // Verificar si ya existe un usuario con ese correo o documento
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ documentId: documentId }, { email: email }]
      }
    });

    if (existingUser) {
      return { error: "El documento o el correo electrónico ya están registrados." };
    }

    // Crear el funcionario
    await prisma.user.create({
      data: {
        fullName,
        documentId,
        email,
        dependency,
        role: "VOTER"
      }
    });

    return { success: "Registro completado con éxito. Ya puede participar en el proceso." };
  } catch (error) {
    return { error: "Ocurrió un error en el servidor. Intente nuevamente." };
  }
}