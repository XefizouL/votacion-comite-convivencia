import { getElectionResults, getVotersList } from "@/actions/reports";
import { getConvocation } from "@/actions/convocation";
import { Trophy, Medal } from "lucide-react";
import ReportButtons from "@/components/ReportButtons"; 

// Fuerza a Vercel a siempre obtener los datos frescos de la BD
export const dynamic = 'force-dynamic';

export default async function ResultsPage() {
  // Ejecución paralela: todas las consultas al mismo tiempo
  const [results, voters, convocation] = await Promise.all([
    getElectionResults(),
    getVotersList(),
    getConvocation()
  ]);

  const openDate = convocation?.openDate ? new Date(convocation.openDate).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" }) : "-";
  const closeDate = convocation?.closeDate ? new Date(convocation.closeDate).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" }) : "-";

  // Variables de control
  const totalVotes = results.reduce((acc, candidate) => acc + candidate._count.votes, 0);
  const winner = results[0]; 
  const substitute = results[1]; 

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cronograma */}
        <div className="mb-8">
          <div className="bg-wp-white rounded-3xl border border-black/10 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-wp-black mb-4">Cronograma</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-black/10 bg-slate-100 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-wp-black/70 mb-2">Inicio Votaciones</p>
                <p className="text-lg font-semibold text-wp-black">{openDate}</p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-slate-100 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-wp-black/70 mb-2">Cierre Votaciones</p>
                <p className="text-lg font-semibold text-wp-black">{closeDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-wp-black">Resultados Oficiales</h1>
          </div>
          <ReportButtons results={results} voters={voters} totalVotes={totalVotes} />
        </div>

        {/* Tarjetas de Ganadores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {winner && (
            <div className="bg-wp-white p-6 rounded-xl border border-black shadow-lg flex items-center gap-6">
              <Trophy className="h-16 w-16 text-wp-primary" />
              <div>
                <p className="text-sm font-bold text-wp-primary uppercase tracking-wide">Candidato Principal</p>
                <h2 className="text-2xl font-bold text-wp-black">{winner.fullName}</h2>
                <div className="mt-2 inline-block bg-wp-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                  {winner._count.votes} Votos
                </div>
              </div>
            </div>
          )}

          {substitute && (
            <div className="bg-wp-white p-6 rounded-xl border border-black shadow-lg flex items-center gap-6">
              <Medal className="h-16 w-16 text-wp-primary" />
              <div>
                <p className="text-sm font-bold text-wp-primary uppercase tracking-wide">Candidato Suplente</p>
                <h2 className="text-2xl font-bold text-wp-black">{substitute.fullName}</h2>
                <div className="mt-2 inline-block bg-wp-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                  {substitute._count.votes} Votos
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabla General de Resultados */}
        <div className="bg-wp-white rounded-xl shadow-lg border border-black overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-wp-primary text-wp-white border-b border-black">
                <th className="p-4 font-semibold">Posición</th>
                <th className="p-4 font-semibold">Candidato</th>
                <th className="p-4 font-semibold text-center">Votos Recibidos</th>
                <th className="p-4 font-semibold text-center">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-wp-black/70">No hay datos de votación aún</td></tr>
              )}
              {results.map((candidate, index) => {
                const percentage = totalVotes > 0 ? ((candidate._count.votes / totalVotes) * 100).toFixed(1) : "0.0";
                return (
                  <tr key={candidate.id} className="border-b hover:bg-wp-primary/10">
                    <td className="p-4 font-bold text-gray-400">#{index + 1}</td>
                    <td className="p-4 font-medium text-wp-black flex items-center gap-3">
                      <img src={candidate.photoUrl} alt="Foto" className="w-10 h-10 rounded-full object-cover border border-black" />
                      {candidate.fullName}
                    </td>
                    <td className="p-4 text-center text-xl font-bold text-wp-primary">{candidate._count.votes}</td>
                    <td className="p-4 text-center">
                      <div className="w-full bg-wp-primary/10 rounded-full h-2.5 mb-1">
                        <div className="bg-wp-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm text-wp-black/70">{percentage}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}