import { getConvocation } from "@/actions/convocation";
import Link from "next/link";
import { Calendar, FileText, CheckCircle, Users, ArrowRight, Upload, Vote } from "lucide-react";

export default async function Home() {
  const convocation = await getConvocation();
  const openDate = convocation?.openDate ? new Date(convocation.openDate).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" }) : "-";
  const closeDate = convocation?.closeDate ? new Date(convocation.closeDate).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" }) : "-";

  return (
    <main className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Banner */}
        <section className="bg-wp-primary border border-black rounded-[28px] shadow-2xl overflow-hidden">
          <div className="bg-wp-primary/95 px-8 py-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">Convocatoria oficial</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              {convocation?.title}
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-3xl mx-auto">
              Plataforma oficial para la democracia, transparencia y gestión de las elecciones del comité.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={convocation?.reglamentUrl || "#"}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-wp-white text-wp-primary px-6 py-3 rounded-full font-bold border border-black shadow-lg hover:bg-wp-white/90 transition"
              >
                <FileText className="h-5 w-5" /> Ver Reglamento
              </a>
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-wp-white text-wp-primary px-6 py-3 rounded-full font-bold border border-black shadow-lg hover:bg-wp-white/90 transition"
              >
                <CheckCircle className="h-5 w-5" /> Registrarse
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 bg-wp-white px-6 py-8 border-t border-black">
            <div className="rounded-3xl border border-black/10 bg-slate-100 p-5 text-left">
              <p className="text-sm font-semibold text-wp-primary uppercase tracking-[0.25em] mb-2">Inicio</p>
              <p className="text-2xl font-bold text-wp-black">{openDate}</p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-slate-100 p-5 text-left">
              <p className="text-sm font-semibold text-wp-primary uppercase tracking-[0.25em] mb-2">Cierre</p>
              <p className="text-2xl font-bold text-wp-black">{closeDate}</p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-slate-100 p-5 text-left">
              <p className="text-sm font-semibold text-wp-primary uppercase tracking-[0.25em] mb-2">Votaciones</p>
              <p className="text-2xl font-bold text-wp-black">{openDate} - {closeDate}</p>
            </div>
          </div>
        </section>

        {/* Cronograma y firmas */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-wp-white rounded-[28px] border border-black/10 shadow-xl p-8">
            <h2 className="text-2xl font-bold text-wp-black mb-4">Cronograma de la convocatoria</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-black/10 bg-slate-100 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-wp-black/70 mb-2">Inicio de convocatoria</p>
                <p className="text-xl font-semibold text-wp-black">{openDate}</p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-slate-100 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-wp-black/70 mb-2">Cierre de convocatoria</p>
                <p className="text-xl font-semibold text-wp-black">{closeDate}</p>
              </div>
            </div>
            <div className="mt-6 bg-wp-primary/10 rounded-3xl border border-wp-primary/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-wp-primary font-semibold mb-3">Requisitos</p>
              <p className="whitespace-pre-line text-wp-black/80 leading-relaxed">{convocation?.requirements}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-wp-white rounded-[28px] border border-black/10 shadow-xl p-6">
              <h3 className="text-lg font-semibold text-wp-black mb-4">Firma director ejecutivo</h3>
              <div className="h-24 rounded-3xl border border-black/10 bg-slate-100 flex items-center justify-center text-wp-black/60">
                Área de Firma
              </div>
            </div>
            <div className="bg-wp-white rounded-[28px] border border-black/10 shadow-xl p-6">
              <h3 className="text-lg font-semibold text-wp-black mb-4">Firma Área SST</h3>
              <div className="h-24 rounded-3xl border border-black/10 bg-slate-100 flex items-center justify-center text-wp-black/60">
                Área de Firma
              </div>
            </div>
          </div>
        </section>

        {/* Accesos rápidos */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-wp-white p-6 rounded-xl border border-black shadow hover:shadow-lg text-center">
            <Users className="mx-auto text-wp-primary mb-3" />
            <h3 className="font-bold text-wp-black">Regístrese</h3>
            <Link href="/registro" className="block mt-4 bg-wp-primary text-white p-2 rounded border border-black hover:bg-wp-primary/90">
              Ir
            </Link>
          </div>

          <div className="bg-wp-white p-6 rounded-xl border border-black shadow hover:shadow-lg text-center">
            <Upload className="mx-auto text-wp-primary mb-3" />
            <h3 className="font-bold text-wp-black">Postularse</h3>
            <Link href="/postular" className="block mt-4 bg-wp-primary text-white p-2 rounded border border-black hover:bg-wp-primary/90">
              Postular
            </Link>
          </div>

          <div className="bg-wp-white p-6 rounded-xl border border-black shadow hover:shadow-lg text-center">
            <Vote className="mx-auto text-wp-primary mb-3" />
            <h3 className="font-bold text-wp-black">Votar</h3>
            <Link href="/login" className="block mt-4 bg-wp-primary text-white p-2 rounded border border-black hover:bg-wp-primary/90">
              Votar
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}