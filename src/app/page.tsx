import { getConvocation } from "@/actions/convocation";
import Link from "next/link";
import { Calendar, FileText, CheckCircle, Users, ArrowRight, Upload, Vote } from "lucide-react";

export default async function Home() {
  const convocation = await getConvocation();

  return (
    <main className="py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner Principal (Gradiente Institucional) */}
        <div className="bg-gradient-to-r from-brand-dark to-brand-light p-10 rounded-2xl shadow-lg border border-brand-dark text-center relative overflow-hidden">
          {/* Decoración abstracta de fondo */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-brand-yellow opacity-20 w-40 h-40 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 bg-white opacity-10 w-40 h-40 rounded-full blur-2xl"></div>
          
          <h1 className="text-4xl font-extrabold text-brand-white mb-4 tracking-tight relative z-10">
            {convocation?.title}
          </h1>
          <p className="text-lg text-brand-white/90 max-w-2xl mx-auto relative z-10">
            Plataforma oficial para la democracia, el desarrollo rural y la transparencia institucional.
          </p>
          
          <div className="mt-8 relative z-10">
            <a 
              href={convocation?.reglamentUrl || "#"} 
              target="_blank"
              className="inline-flex items-center text-brand-dark bg-brand-yellow px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg"
            >
              <FileText className="mr-2 h-5 w-5" /> Ver Resolución / Reglamento (PDF)
            </a>
          </div>
        </div>

        {/* Pasos del Proceso */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-brand-light transition group">
            <div className="bg-brand-light/10 p-4 rounded-full text-brand-dark mb-4 group-hover:scale-110 transition">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-brand-dark">1. Regístrese</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">
              Todo funcionario debe registrarse en el censo electoral para poder postularse o votar.
            </p>
            <Link href="/registro" className="w-full flex justify-center items-center bg-gray-100 text-brand-dark font-bold py-2 rounded-lg hover:bg-gray-200 transition">
              Ir a Registro <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-brand-light transition group">
            <div className="bg-brand-light/10 p-4 rounded-full text-brand-dark mb-4 group-hover:scale-110 transition">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-brand-dark">2. Postúlese</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">
              ¿Cumple los requisitos? Envíe su fotografía y datos para ser candidato oficial.
            </p>
            <Link href="/postular" className="w-full flex justify-center items-center bg-brand-light text-white font-bold py-2 rounded-lg hover:bg-brand-dark transition">
              Postularme <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-light shadow-brand-light/20 flex flex-col items-center text-center hover:shadow-brand-light/40 transition group">
            <div className="bg-brand-yellow p-4 rounded-full text-brand-dark mb-4 group-hover:scale-110 transition">
              <Vote className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-brand-dark">3. Votación</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow font-medium">
              Ingrese el día de las elecciones con su documento y elija a su representante.
            </p>
            <Link href="/login" className="w-full flex justify-center items-center bg-brand-dark text-white font-bold py-2 rounded-lg hover:opacity-90 transition">
              Ir a Votar <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

        </div>

        {/* Info Extra */}
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="bg-white p-6 rounded-xl border-l-4 border-brand-light shadow-sm">
            <h2 className="text-lg font-bold text-brand-dark flex items-center mb-4">
              <Calendar className="mr-2 h-5 w-5 text-brand-light" /> Cronograma Oficial
            </h2>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border mb-2">
              <span className="text-sm font-medium text-gray-600">Apertura</span>
              <span className="text-sm font-bold text-brand-dark">{convocation?.openDate.toLocaleDateString('es-ES')}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
              <span className="text-sm font-medium text-gray-600">Cierre</span>
              <span className="text-sm font-bold text-red-600">{convocation?.closeDate.toLocaleDateString('es-ES')}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-l-4 border-brand-yellow shadow-sm">
            <h2 className="text-lg font-bold text-brand-dark flex items-center mb-4">
              <CheckCircle className="mr-2 h-5 w-5 text-brand-yellow" /> Requisitos
            </h2>
            <p className="whitespace-pre-line text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">
              {convocation?.requirements}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}