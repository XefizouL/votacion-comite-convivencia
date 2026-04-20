import { getConvocation } from "@/actions/convocation";
import Link from "next/link";
import { Users, Upload, Vote } from "lucide-react";

export default async function Home() {
  const convocation = await getConvocation();

 
  const formatDateTime = (date: Date | undefined) =>
    date
      ? new Date(date).toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "-";

  return (
    <main className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Banner Principal */}
        <section className="bg-wp-primary border border-black rounded-[28px] shadow-2xl overflow-hidden">
          <div className="bg-wp-primary/95 px-8 py-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">
              Convocatoria oficial
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Comité de Convivencia Laboral ASMETA 2026-2028
            </h1>

            <p className="mt-6 text-lg text-white/85 max-w-3xl mx-auto">
              Plataforma oficial para la democracia, transparencia y gestión de
              las elecciones del comité.
            </p>
          </div>

          {/* Cronograma en el Banner */}
          <div className="grid md:grid-cols-3 gap-4 bg-wp-white px-6 py-8 border-t border-black">
            <div className="rounded-3xl border border-black/10 bg-slate-100 p-5 text-left">
              <p className="text-sm font-semibold text-wp-primary uppercase tracking-[0.25em] mb-2">
                Inicio Postulaciones
              </p>
              <p className="text-xl font-bold text-wp-black">
                {formatDateTime(convocation?.openDate)}
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-slate-100 p-5 text-left">
              <p className="text-sm font-semibold text-wp-primary uppercase tracking-[0.25em] mb-2">
                Cierre Postulaciones
              </p>
              <p className="text-xl font-bold text-wp-black">
                {formatDateTime(convocation?.closeDate)}
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-slate-100 p-5 text-left">
              <p className="text-sm font-semibold text-wp-primary uppercase tracking-[0.25em] mb-2">
                Votaciones
              </p>
              <div className="text-wp-black space-y-1">
                <p className="text-sm font-bold">
                  Inicia: 27 de Abril, 08:00 AM
                </p>
                <p className="text-sm font-bold">
                  Cierra: 29 de Abril, 08:00 AM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Requisitos y Perfil */}
        <section className="bg-wp-white rounded-[28px] border border-black/10 shadow-xl p-8">
          <h2 className="text-2xl font-bold text-wp-black mb-6">
            Detalles de la convocatoria
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requisitos Dinámicos */}
            <div className="bg-wp-primary/10 rounded-3xl border border-wp-primary/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-wp-primary font-semibold mb-3">
                Requisitos para Postularse
              </p>
              <ul className="list-disc list-inside text-wp-black/80 leading-relaxed space-y-1">
                {convocation?.requirements
                  ?.split("\n")
                  .filter((item) => item.trim() !== "")
                  .map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </div>

            {/* Perfil Fijo */}
            <div className="bg-wp-primary/10 rounded-3xl border border-wp-primary/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-wp-primary font-semibold mb-3">
                PERFIL DEL VOCERO DE LOS CONTRATISTAS
              </p>

              <ul className="list-disc list-inside text-wp-black/80 leading-relaxed space-y-1">
                <li>Persona con alto sentido de responsabilidad y compromiso </li>
                <li>Capacidad de actuar con imparcialidad y objetividad</li>
                <li>Comunicación asertiva y ética profesional</li>
                <li>Reconocido por su comportamiento ético y respetuoso</li>
                <li>Interés en promover ambientes laborales sanos</li>
                <li>Disposición para apoyar procesos de mejora del clima laboral</li>
                
              </ul>
            </div>
          </div>
        </section>

        {/* Acciones Rápidas */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-wp-white p-6 rounded-xl border border-black shadow hover:shadow-lg text-center">
            <Users className="mx-auto text-wp-primary mb-3" />
            <h3 className="font-bold text-wp-black">Regístrese</h3>
            <Link
              href="/registro"
              className="block mt-4 bg-wp-primary text-white p-2 rounded border border-black hover:bg-wp-primary/90 transition-colors"
            >
              Ir al Registro
            </Link>
          </div>

          <div className="bg-wp-white p-6 rounded-xl border border-black shadow hover:shadow-lg text-center">
            <Upload className="mx-auto text-wp-primary mb-3" />
            <h3 className="font-bold text-wp-black">Postularse</h3>
            <Link
              href="/postular"
              className="block mt-4 bg-wp-primary text-white p-2 rounded border border-black hover:bg-wp-primary/90 transition-colors"
            >
              Postular Ahora
            </Link>
          </div>

          <div className="bg-wp-white p-6 rounded-xl border border-black shadow hover:shadow-lg text-center">
            <Vote className="mx-auto text-wp-primary mb-3" />
            <h3 className="font-bold text-wp-black">Votar</h3>
            <Link
              href="/login"
              className="block mt-4 bg-wp-primary text-white p-2 rounded border border-black hover:bg-wp-primary/90 transition-colors"
            >
              Ir a Votación
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}