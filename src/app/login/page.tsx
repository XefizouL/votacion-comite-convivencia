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
    } else if (response.success) {
      // Si el login es correcto, lo enviamos al tarjetón
      router.push('/votacion');
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al Inicio
        </Link>

        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <KeyRound className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Acceso de Votantes</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Ingrese para acceder al tarjetón electoral</p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200 text-center">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Documento de Identidad o Correo</label>
            <input 
              type="text" 
              name="identifier" 
              required 
              autoComplete="off"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Ej: 1020304050 o correo@institucion.com" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}