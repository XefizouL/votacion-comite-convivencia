import { getElectionResults, getVotersList } from "@/actions/reports";
import { Download, Trophy, Medal } from "lucide-react";
import ReportButtons from "@/components/ReportButtons"; 

export default async function ResultsPage() {
  const results = await getElectionResults();
  const voters = await getVotersList();

  // Variables de control
  const totalVotes = results.reduce((acc, candidate) => acc + candidate._count.votes, 0);
  const winner = results[0]; // El de mayor votos
  const substitute = results[1]; // El segundo lugar

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Resultados Oficiales</h1>
            <p className="text-gray-500">Escrutinio automático en tiempo real</p>
          </div>
          
          {/* Aquí irán los botones de Excel y PDF */}
          <ReportButtons results={results} voters={voters} totalVotes={totalVotes} />
        </div>

        {/* Tarjetas de Ganadores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Principal */}
          {winner && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border border-amber-200 shadow-md flex items-center gap-6">
              <Trophy className="h-16 w-16 text-amber-500" />
              <div>
                <p className="text-sm font-bold text-amber-600 uppercase tracking-wide">Candidato Principal</p>
                <h2 className="text-2xl font-bold text-gray-800">{winner.fullName}</h2>
                <p className="text-gray-600">{winner.dependency}</p>
                <div className="mt-2 inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                  {winner._count.votes} Votos
                </div>
              </div>
            </div>
          )}

          {/* Suplente */}
          {substitute && (
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border border-slate-200 shadow-md flex items-center gap-6">
              <Medal className="h-16 w-16 text-slate-400" />
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Candidato Suplente</p>
                <h2 className="text-2xl font-bold text-gray-800">{substitute.fullName}</h2>
                <p className="text-gray-600">{substitute.dependency}</p>
                <div className="mt-2 inline-block bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                  {substitute._count.votes} Votos
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabla General de Resultados */}
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b">
                <th className="p-4 font-semibold">Posición</th>
                <th className="p-4 font-semibold">Candidato</th>
                <th className="p-4 font-semibold text-center">Votos Recibidos</th>
                <th className="p-4 font-semibold text-center">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No hay datos de votación aún.</td></tr>
              )}
              {results.map((candidate, index) => {
                const percentage = totalVotes > 0 ? ((candidate._count.votes / totalVotes) * 100).toFixed(1) : "0.0";
                
                return (
                  <tr key={candidate.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-400">#{index + 1}</td>
                    <td className="p-4 font-medium text-gray-800 flex items-center gap-3">
                      <img src={candidate.photoUrl} alt="Foto" className="w-10 h-10 rounded-full object-cover border" />
                      {candidate.fullName}
                    </td>
                    <td className="p-4 text-center text-xl font-bold text-blue-600">{candidate._count.votes}</td>
                    <td className="p-4 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500">{percentage}%</span>
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