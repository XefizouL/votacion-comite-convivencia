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


  const dataPayload = {
    title: "Elecciones de Representantes 2026",
    openDate: new Date("2026-04-20T08:00:00"), // Inicio postulaciones
    closeDate: new Date("2026-04-24T17:00:00"), // Cierre postulaciones
    requirements: newRequirements
  };

  if (!convocation) {
    convocation = await prisma.convocation.create({ data: dataPayload });
  } else {
    convocation = await prisma.convocation.update({
      where: { id: convocation.id },
      data: dataPayload
    });
  }

  return convocation;
}