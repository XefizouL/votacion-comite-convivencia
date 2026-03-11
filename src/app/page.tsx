import { getConvocation } from "@/actions/convocation";
import Link from "next/link";
import { Calendar, FileText, CheckCircle, Users } from "lucide-react";

export default async function Home() {
  const convocation = await getConvocation();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{convocation?.title}</h1>
          <p className="text-gray-500">Plataforma oficial de votación y postulación</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Fechas */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center mb-4">
              <Calendar className="mr-2 h-5 w-5" /> Fechas del Proceso
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Apertura</p>
                <p className="font-medium">{convocation?.openDate.toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cierre</p>
                <p className="font-medium text-red-600">{convocation?.closeDate.toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>

          {/* Requisitos */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 flex items-center mb-4">
              <CheckCircle className="mr-2 h-5 w-5" /> Requisitos
            </h2>
            <p className="whitespace-pre-line text-sm text-gray-700">
              {convocation?.requirements}
            </p>
          </div>
        </div>

        {/* Acciones (Botones) */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center border-t pt-8">
          {/* Botón Descargar PDF */}
          <a 
            href={convocation?.reglamentUrl || "#"} 
            target="_blank"
            className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FileText className="mr-2 h-5 w-5" /> Descargar Reglamento (PDF)
          </a>

          {/* Botón Ir a Registro */}
          <Link 
            href="/registro"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            <Users className="mr-2 h-5 w-5" /> Registro de Funcionarios
          </Link>
        </div>

      </div>
    </main>
  );
}