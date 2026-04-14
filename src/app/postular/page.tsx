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

    if (response.error) setError(response.error);
    if (response.success) setSuccess(response.success);

    setLoading(false);
  }

  return (
    /* --- FONDO APLICADO AQUÍ --- */
    <main className="min-h-screen bg-[url('/fondo.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-wp-white p-8 rounded-xl shadow-lg border border-black">
        
        <Link href="/" className="inline-flex items-center text-sm text-wp-primary mb-6 hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver
        </Link>

        <h2 className="text-2xl font-bold text-wp-black mb-6 text-center">
          Postulación de Candidato
        </h2>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 border border-red-200">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4 border border-green-200">{success}</div>}

        <form onSubmit={onSubmit} className="space-y-4 text-wp-black">

          <input 
            name="fullName" 
            placeholder="Nombre y Apellido" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue outline-none" 
          />
          
          <input 
            name="position" 
            placeholder="Cargo" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue outline-none" 
          />

          <div>
            <label className="text-sm font-semibold flex items-center mb-1 text-wp-black">
              <Upload className="mr-1 h-4 w-4" /> Foto del Candidato
            </label>
            <input 
              type="file" 
              name="photo" 
              required 
              accept="image/*"
              className="w-full border p-2 rounded bg-gray-50 text-sm file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-wp-primary file:text-white hover:file:bg-opacity-90" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-wp-primary text-white py-2 rounded font-bold hover:opacity-90 disabled:opacity-50 transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {loading ? "Enviando..." : "Postularme"}
          </button>

        </form>
      </div>
    </main>
  );
}