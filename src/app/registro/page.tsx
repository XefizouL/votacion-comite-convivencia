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
    <main className="min-h-screen bg-wp-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-wp-white p-8 rounded-xl shadow-lg border border-black">

        <Link href="/" className="inline-flex items-center text-sm text-wp-primary mb-6">
          <ArrowLeft className="mr-1" /> Volver
        </Link>

        <h2 className="text-2xl font-bold text-wp-black mb-6 text-center">
          Registro
        </h2>

        {error && <div className="bg-wp-red/10 text-wp-red p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-wp-green/10 text-wp-green p-3 rounded mb-4">{success}</div>}

        <form onSubmit={onSubmit} className="space-y-4 text-wp-black">

          <input name="fullName" placeholder="Nombre" required className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue" />
          <input name="documentId" placeholder="Documento" required className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue" />
          <input name="email" type="email" placeholder="Correo" required className="w-full border p-2 rounded focus:ring-2 focus:ring-wp-blue" />

          <button 
            type="submit"
            disabled={loading}
            className="w-full theme-button"
          >
            {loading ? "Cargando..." : "Registrarse"}
          </button>

        </form>
      </div>
    </main>
  );
}