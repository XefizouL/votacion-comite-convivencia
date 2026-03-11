'use client'

import { useState } from "react";
import { createCandidate } from "@/actions/candidates";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function PostulatePage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const response = await createCandidate(formData);

    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      setSuccess(response.success);
      (event.target as HTMLFormElement).reset();
    }
    
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al Inicio
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Postulación de Candidato</h2>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm border border-green-200">{success}</div>}

        <form onSubmit={onSubmit} className="space-y-4 text-gray-800">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Candidato</label>
            <input type="text" name="fullName" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cargo Actual</label>
            <input type="text" name="position" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Analista de Sistemas" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dependencia</label>
            <input type="text" name="dependency" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Tecnología" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Upload className="h-4 w-4 mr-1" /> Fotografía (JPG, PNG)
            </label>
            <input type="file" name="photo" accept="image/*" required className="w-full border rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 mt-4"
          >
            {loading ? "Enviando postulación..." : "Postularme"}
          </button>
        </form>
      </div>
    </main>
  );
}