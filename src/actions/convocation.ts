'use server'
import prisma from "@/lib/prisma"

export async function getConvocation() {
  let convocation = await prisma.convocation.findFirst();
  
  const newRequirements = `Ser funcionario de planta activo
No presentar sanciones disciplinarias vigentes
Tener contrato vigente con ASMETA
Estar en ejercicio de sus funciones al momento de la postulación
Tener al menos 6 meses de antigüedad en la empresa
Manifestar disponibilidad de tiempo para ejercer las funciones`;

  if (!convocation) {
    convocation = await prisma.convocation.create({
      data: {
        title: "Elecciones de Representantes 2026",
        openDate: new Date(),
        closeDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        requirements: newRequirements
      }
    });
  } else {
    convocation = await prisma.convocation.update({
      where: { id: convocation.id },
      data: {
        requirements: newRequirements
      }
    });
  }

  return convocation;
}