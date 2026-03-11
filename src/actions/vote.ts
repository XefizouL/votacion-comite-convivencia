'use server'

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function castVote(candidateId: string) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('voter_session')?.value;

    if (!userId) return { error: "Sesión inválida o expirada. Vuelva a iniciar sesión." };

    // Validar de nuevo por seguridad
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.hasVoted) return { error: "Usted ya ha votado." };

    // Transacción: Guardar voto y marcar usuario AL MISMO TIEMPO
    await prisma.$transaction([
      prisma.vote.create({
        data: { userId, candidateId }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { hasVoted: true }
      })
    ]);

    // Borrar la sesión para que se cierre automáticamente
    cookieStore.delete('voter_session');
    
    // Actualizar los resultados en segundo plano
    revalidatePath('/admin/resultados');

    return { success: true };
  } catch (error) {
    return { error: "Error al procesar el voto. Intente de nuevo." };
  }
}