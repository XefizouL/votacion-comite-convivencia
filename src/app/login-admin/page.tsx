'use client'

import { useState } from "react";
import { loginAdmin } from "@/actions/adminAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await loginAdmin(formData);

    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else {
      
      router.push('/admin/candidatos');
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-black/10">
        
        <Link href="/" className="inline-flex items-center text-sm text-[#1F6B3A] hover:underline mb-6 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al Inicio
        </Link>

        <div className="flex justify-center mb-6">
          <div className="bg-[#1F6B3A]/10 p-5 rounded-full text-[#1F6B3A]">
            <LockKeyhole className="h-10 w-10" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Acceso Administrativo</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Área restringida. Ingrese su credencial de seguridad.</p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-200 text-center font-medium">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Contraseña de Administrador</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#1F6B3A] focus:ring-0 outline-none transition" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1F6B3A] text-white py-3 rounded-xl font-bold hover:bg-[#1a5a30] transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Ingresar al Panel"}
          </button>
        </form>
      </div>
    </main>
  );
}