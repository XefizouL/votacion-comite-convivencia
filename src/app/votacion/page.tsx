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

  // Pantalla éxito
  if (successMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wp-primary p-4">
        <CheckCircle2 className="h-24 w-24 text-wp-white mb-6" />
        <h1 className="text-3xl font-bold text-wp-white mb-2">¡Voto Registrado con Éxito!</h1>
        <p className="text-wp-white/90">Redirigiendo...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-wp-primary p-8">
      <div className="max-w-5xl mx-auto bg-wp-white border border-black rounded-3xl shadow-xl p-8">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-wp-blue mb-2">Tarjetón Electoral</h1>
          <p className="text-wp-black/70">Seleccione un candidato</p>
        </div>

        {errorMsg && (
          <div className="bg-wp-red/10 text-wp-red p-4 rounded-lg text-center mb-8 border border-wp-red">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              className={`bg-wp-white rounded-xl overflow-hidden cursor-pointer transition transform hover:-translate-y-1 shadow-md border 
              ${selectedCandidate?.id === candidate.id ? 'border-wp-primary shadow-lg' : 'border-black'}`}
            >
              <img src={candidate.photoUrl} className="w-full h-56 object-cover" />

              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-wp-black">{candidate.fullName}</h3>

                <div className={`mt-4 py-2 rounded-lg font-medium 
                  ${selectedCandidate?.id === candidate.id ? 'bg-wp-primary text-white' : 'bg-wp-primary/10 text-wp-black'}`}>
                  {selectedCandidate?.id === candidate.id ? 'Seleccionado' : 'Elegir'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedCandidate && (
          <div className="fixed bottom-0 left-0 w-full bg-wp-white border-t border-black p-6">
            <div className="max-w-5xl mx-auto flex justify-between items-center">

              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-wp-primary mr-4" />
                <p className="text-wp-black">
                  Votar por <strong className="text-wp-primary">{selectedCandidate.fullName}</strong>
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="px-6 py-3 bg-wp-white text-wp-primary border border-black rounded-lg"
                >
                  Cancelar
                </button>

                <button 
                  onClick={handleConfirmVote}
                  className="px-6 py-3 bg-wp-primary text-white border border-black rounded-lg"
                >
                  Confirmar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}