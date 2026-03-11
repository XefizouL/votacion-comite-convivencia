'use server'

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

export async function loginVoter(formData: FormData) {
  const identifier = formData.get('identifier') as string;

  if (!identifier) {
    return { error: "Por favor, ingrese su documento o correo." };
  }

  try {
    // 1. Buscar al usuario
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { documentId: identifier },
          { email: identifier }
        ]
      }
    });

    // 2. Validaciones
    if (!user) return { error: "Funcionario no encontrado. Regístrese en la convocatoria primero." };
    if (user.hasVoted) return { error: "Acceso denegado: Usted ya ha registrado su voto." };

    // 3. Crear sesión segura (Cookie)
    const cookieStore = await cookies();
    cookieStore.set('voter_session', user.id, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15 // La sesión dura 15 minutos máximo
    });

    return { success: true };
  } catch (error) {
    return { error: "Ocurrió un error en el servidor." };
  }
}