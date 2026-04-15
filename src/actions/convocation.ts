'use server'
import prisma from "@/lib/prisma"

export async function getConvocation() {
  let convocation = await prisma.convocation.findFirst();
  
  const newRequirements = `Ser contratista activo de ASMETA al momento de la postulación
 No tener sanciones disciplinarias vigentes
 No encontrarse en conflictos de interés que afecten su imparcialidad
 Manifestar voluntariamente su interés en participar
 Diligenciar y firmar el formato de postulación
 Contar con disponibilidad de tiempo para participar en actividades del Comité (cuando sea requerido)`;


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