'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { castVote } from "@/actions/vote";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function VotacionPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [loadingVote, setLoadingVote] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
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
      setTimeout(() => router.push('/'), 3000);
    }
  };

  
  if (successMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/fondo.png')] bg-cover bg-center bg-no-repeat p-4">
        <div className="bg-wp-white/90 p-10 rounded-3xl border-2 border-black flex flex-col items-center shadow-2xl backdrop-blur-sm">
            <CheckCircle2 className="h-24 w-24 text-green-600 mb-6" />
            <h1 className="text-3xl font-bold text-wp-black mb-2 text-center">¡Voto Registrado con Éxito!</h1>
            <p className="text-wp-black/70 font-medium">Redirigiendo al inicio...</p>
        </div>
      </div>
    );
  }

  return (
   
    <main className="min-h-screen bg-[url('/logo.png')] bg-cover bg-center bg-no-repeat p-8">
      <div className="max-w-5xl mx-auto bg-green-600 border-2 border-black rounded-3xl shadow-xl p-8">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-wp-white mb-2">Tarjetón Electoral</h1>
          <p className="text-wp-black/100 font-semibold">Seleccione un candidato de la lista</p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-8 border border-red-400">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              className={`bg-wp-white rounded-xl overflow-hidden cursor-pointer transition transform hover:-translate-y-1 shadow-md border-2 
              ${selectedCandidate?.id === candidate.id ? 'border-wp-primary ring-4 ring-wp-primary/20 shadow-lg' : 'border-black hover:border-wp-primary/50'}`}
            >
              <img src={candidate.photoUrl} className="w-full h-56 object-cover" alt={candidate.fullName} />

              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-wp-black">{candidate.fullName}</h3>

                <div className={`mt-4 py-2 rounded-lg font-bold transition-colors
                  ${selectedCandidate?.id === candidate.id ? 'bg-wp-primary text-white' : 'bg-gray-100 text-wp-black'}`}>
                  {selectedCandidate?.id === candidate.id ? 'SELECCIONADO' : 'ELEGIR'}
                </div>
              </div>
            </div>
          ))}
        </div>

      
        {selectedCandidate && (
          <div className="fixed bottom-0 left-0 w-full bg-wp-white/95 backdrop-blur-md border-t-4 border-wp-primary p-6 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] z-50">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

              <div className="flex items-center">
                <div className="bg-wp-primary/10 p-3 rounded-full mr-4">
                    <AlertTriangle className="h-8 w-8 text-wp-primary" />
                </div>
                <p className="text-xl text-wp-black">
                  ¿Confirmas tu voto por <strong className="text-wp-primary uppercase">{selectedCandidate.fullName}</strong>?
                </p>
              </div>

              <div className="flex gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 sm:flex-none px-8 py-3 bg-wp-white text-wp-primary border-2 border-black rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>

                <button 
                  onClick={handleConfirmVote}
                  disabled={loadingVote}
                  className="flex-1 sm:flex-none px-8 py-3 bg-wp-primary text-white border-2 border-black rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
                >
                  {loadingVote ? "Procesando..." : "SÍ, CONFIRMO"}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}