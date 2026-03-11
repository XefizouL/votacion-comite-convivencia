'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { castVote } from "@/actions/vote";
import { CheckCircle2, AlertTriangle } from "lucide-react";

// Como es un Client Component, obtenemos los candidatos mediante una llamada simple
export default function VotacionPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [loadingVote, setLoadingVote] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Para simplificar, obtenemos los candidatos aprobados llamando al endpoint interno de React
    const fetchCandidates = async () => {
      const { getAllCandidates } = await import('@/actions/candidates');
      const all = await getAllCandidates();
      setCandidates(all.filter(c => c.status === 'APPROVED'));
    };
    fetchCandidates();
  }, []);

  const handleConfirmVote = async () => {
    if (!selectedCandidate) return;
    setLoadingVote(true);
    
    const response = await castVote(selectedCandidate.id);
    
    if (response.error) {
      setErrorMsg(response.error);
      setLoadingVote(false);
    } else {
      setSuccessMsg(true);
      // Tras 3 segundos, lo enviamos al inicio
      setTimeout(() => router.push('/'), 3000);
    }
  };

  // Pantalla de Éxito
  if (successMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <CheckCircle2 className="h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Voto Registrado con Éxito!</h1>
        <p className="text-gray-500">Su decisión ha sido encriptada y guardada. Redirigiendo...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Tarjetón Electoral</h1>
          <p className="text-gray-600">Seleccione un candidato y confirme su voto. Solo puede votar una vez.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-8 border border-red-200">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {candidates.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10">
               Aún no hay candidatos oficiales aprobados para esta elección.
             </div>
          )}

          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              onClick={() => setSelectedCandidate(candidate)}
              className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 shadow-md border-4 
                ${selectedCandidate?.id === candidate.id ? 'border-blue-500 shadow-blue-200' : 'border-transparent'}`}
            >
              <img 
                src={candidate.photoUrl} 
                alt={candidate.fullName} 
                className="w-full h-56 object-cover object-top"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-800">{candidate.fullName}</h3>
                <p className="text-sm text-gray-500 mt-1">{candidate.dependency}</p>
                <div className={`mt-4 py-2 rounded-lg font-medium ${selectedCandidate?.id === candidate.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {selectedCandidate?.id === candidate.id ? 'Seleccionado' : 'Elegir'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Inferior de Confirmación */}
        {selectedCandidate && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl p-6 z-50 animate-in slide-in-from-bottom">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <h4 className="font-bold text-gray-800">Confirmar Voto</h4>
                  <p className="text-sm text-gray-600">Está a punto de votar por <strong className="text-blue-600">{selectedCandidate.fullName}</strong>. Esta acción es irreversible.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                  disabled={loadingVote}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmVote}
                  disabled={loadingVote}
                  className="px-6 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loadingVote ? "Registrando..." : "Sí, Registrar mi Voto"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}