'use client'

import { useState } from "react";
import { loginVoter } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await loginVoter(formData);

    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else {
      router.push('/votacion');
    }
  }

  return (
    /* --- FONDO DE IMAGEN APLICADO --- */
    <main className="min-h-screen bg-[url('/fondo.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      
      {/* Contenedor del Formulario */}
      <div className="w-full max-w-md bg-wp-white p-8 rounded-xl shadow-lg border-2 border-black">

        <Link href="/" className="inline-flex items-center text-sm text-wp-primary mb-6 hover:underline font-medium">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver
        </Link>

        <div className="flex justify-center mb-4">
          <div className="bg-wp-primary/10 p-4 rounded-full text-wp-primary border border-wp-primary/20">
            <KeyRound className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-wp-black text-center">
          Acceso de Votante
        </h2>

        <p className="text-center text-wp-black/60 text-sm mt-2">
          Ingresa tus datos para continuar al tarjetón
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mt-4 text-center border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 mt-6">

          <div className="space-y-1">
            <label className="text-xs font-bold text-wp-black uppercase ml-1">Identificación</label>
            <input 
              name="identifier"
              placeholder="Documento o correo"
              required
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-wp-primary outline-none transition-colors text-wp-black"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-wp-primary text-white py-3 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Verificando..." : "INGRESAR A VOTAR"}
          </button>

        </form>
        
        <p className="mt-8 text-center text-xs text-wp-black/40 italic">
          Sistema de votación protegido por ASMETA
        </p>
      </div>
    </main>
  );
}