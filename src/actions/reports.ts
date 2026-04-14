'use server'

import prisma from "@/lib/prisma"

// 1. Obtener los resultados ordenados por cantidad de votos
export async function getElectionResults() {
  const results = await prisma.candidate.findMany({
    where: { status: "APPROVED" },
    include: {
      _count: {
        select: { votes: true } // Cuenta los votos reales en la tabla Vote
      }
    },
    orderBy: {
      votes: { _count: 'desc' } // Ordena del que tiene más al que tiene menos
    }
  });

  return results;
}

// 2. Obtener lista de todos los votantes (Para el Excel)
export async function getVotersList() {
  const voters = await prisma.user.findMany({
    select: {
      fullName: true,
      documentId: true,
      hasVoted: true,
      createdAt: true
    
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return voters;
}