import { getAllCandidates, approveCandidate, rejectCandidate } from "@/actions/candidates";
import Image from "next/image";

export default async function AdminCandidatesPage() {
  const candidates = await getAllCandidates();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Administración de Candidatos</h1>
        <p className="text-gray-500 mb-8">Aprueba o rechaza las postulaciones (Máximo 4 candidatos oficiales).</p>

        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b">
                <th className="p-4 font-semibold">Foto</th>
                <th className="p-4 font-semibold">Candidato</th>
                <th className="p-4 font-semibold">Cargo / Área</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No hay candidatos postulados aún.</td>
                </tr>
              )}
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {/* Usamos etiqueta img normal por simplicidad con imágenes locales dinámicas */}
                    <img src={candidate.photoUrl} alt="Foto" className="w-12 h-12 rounded-full object-cover border" />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{candidate.fullName}</td>
                  <td className="p-4 text-gray-600">
                    {candidate.position} <br />
                    <span className="text-sm text-gray-400">{candidate.dependency}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${candidate.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                        candidate.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'}`}
                    >
                      {candidate.status === 'APPROVED' ? 'Aprobado' : 
                       candidate.status === 'REJECTED' ? 'Rechazado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    {candidate.status === 'PENDING' && (
                      <>
                        {/* Botón Aprobar */}
                        <form action={approveCandidate.bind(null, candidate.id)} className="inline">
                          <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm transition">
                            Aprobar
                          </button>
                        </form>
                        {/* Botón Rechazar */}
                        <form action={rejectCandidate.bind(null, candidate.id)} className="inline">
                          <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition">
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