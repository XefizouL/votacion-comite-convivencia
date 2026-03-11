
'use server'
import prisma from "@/lib/prisma"

export async function getConvocation() {
  let convocation = await prisma.convocation.findFirst();
  
  // Si no hay convocatoria en la BD, creamos una de prueba automáticamente
  if (!convocation) {
    convocation = await prisma.convocation.create({
      data: {
        title: "Elecciones de Representantes 2024 - 2025",
        openDate: new Date(),
        closeDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Cierra en 30 días
        requirements: "1. Ser funcionario de planta activo.\n2. Antigüedad mínima de 1 año en la institución.\n3. No presentar sanciones disciplinarias vigentes.",
        reglamentUrl: "/reglamento.pdf" // Simularemos que está en la carpeta public
      }
    });
  }
  return convocation;
}