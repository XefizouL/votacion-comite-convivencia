import { getAllCandidates, approveCandidate, rejectCandidate } from "@/actions/candidates";
import { getConvocation } from "@/actions/convocation";

// ✅ Server Actions correctamente definidas
async function approveCandidateAction(candidateId: string, formData: FormData) {
  "use server";
  await approveCandidate(candidateId);
}

async function rejectCandidateAction(candidateId: string, formData: FormData) {
  "use server";
  await rejectCandidate(candidateId);
}

export default async function AdminCandidatesPage() {
  const candidates = await getAllCandidates();
  const convocation = await getConvocation();

  const openDate = convocation?.openDate
    ? new Date(convocation.openDate).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const closeDate = convocation?.closeDate
    ? new Date(convocation.closeDate).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto bg-wp-white rounded-3xl border border-black/10 shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-wp-black mb-2">
          Administración de Candidatos
        </h1>

        <p className="text-wp-black/70 mb-8">
          Aprueba o rechaza las postulaciones (Máximo 4 candidatos oficiales).
        </p>

        {/* FECHAS INTACTAS - Solo se quitó la caja de firmas */}
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-slate-100 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-wp-primary font-semibold mb-2">
              Inicio
            </p>
            <p className="text-2xl font-bold text-wp-black">{openDate}</p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-slate-100 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-wp-primary font-semibold mb-2">
              Cierre
            </p>
            <p className="text-2xl font-bold text-wp-black">{closeDate}</p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-wp-white rounded-xl shadow-sm border border-black overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-wp-primary text-wp-white border-b border-black">
                <th className="p-4 font-semibold">Foto</th>
                <th className="p-4 font-semibold">Candidato</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {candidates.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-wp-black/70">
                    No hay candidatos postulados aún.
                  </td>
                </tr>
              )}

              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b hover:bg-wp-primary/10">
                  
                  {/* Foto */}
                  <td className="p-4">
                    <img
                      src={candidate.photoUrl}
                      alt="Foto"
                      className="w-12 h-12 rounded-full object-cover border border-black"
                    />
                  </td>

                  {/* Nombre */}
                  <td className="p-4 font-medium text-wp-black">
                    {candidate.fullName}
                  </td>

                  {/* Estado */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          candidate.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : candidate.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {candidate.status === "APPROVED"
                        ? "Aprobado"
                        : candidate.status === "REJECTED"
                        ? "Rechazado"
                        : "Pendiente"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="p-4 text-center space-x-2">
                    {candidate.status === "PENDING" && (
                      <>
                        {/* Aprobar */}
                        <form
                          action={approveCandidateAction.bind(null, candidate.id)}
                          className="inline"
                        >
                          <button className="bg-wp-primary text-white px-3 py-1 rounded border border-black hover:bg-wp-primary/90 text-sm transition">
                            Aprobar
                          </button>
                        </form>

                        {/* Rechazar */}
                        <form
                          action={rejectCandidateAction.bind(null, candidate.id)}
                          className="inline"
                        >
                          <button className="bg-wp-white text-wp-primary px-3 py-1 rounded border border-black hover:bg-wp-white/90 text-sm transition">
                            Rechazar
                          </button>
                        </form>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}