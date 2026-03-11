'use server'
import prisma from "@/lib/prisma"

export async function getResults() {
  const candidates = await prisma.candidate.findMany({
    where: { status: 'APPROVED' },
    include: {
      _count: {
        select: { votes: true }
      }
    },
    orderBy: {
      votes: { _count: 'desc' }
    }
  })

  // candidates[0] será el Principal
  // candidates[1] será el Suplente
  return candidates;
}