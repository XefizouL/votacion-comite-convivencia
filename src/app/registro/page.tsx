'use client'

import { useState } from "react";
import { registerUser } from "@/actions/register";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const response = await registerUser(formData);

    if (response.error) setError(response.error);
    if (response.success) setSuccess(response.success);

    setLoading(false);
  }

  return (
    /* --- CAMBIO AQUÍ: Se reemplazó bg-wp-primary por la imagen de fondo --- */
    <main className="min-h-screen bg-[url('/fondo.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      
      {/* El contenedor blanco se mantiene para que el formulario sea legible */}
      <div className="w-full max-w-md bg-wp-white p-8 rounded-xl shadow-lg border border-black">

        <Link href="/" className="inline-flex items-center text-sm text-wp-primary mb-6 hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver
        </Link>

        <h2 className="text-2xl font-bold text-wp-black mb-6 text-center">
          Registro
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
            name="documentId" 
            placeholder="Nº de documento" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue outline-none" 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Correo Electronico" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue outline-none" 
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-wp-primary text-white py-2 rounded font-bold hover:opacity-90 disabled:opacity-50 transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {loading ? "Cargando..." : "Registrarse"}
          </button>

        </form>
      </div>
    </main>
  );
}