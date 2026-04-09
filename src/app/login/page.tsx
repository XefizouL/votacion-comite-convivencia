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
    <main className="min-h-screen bg-wp-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-wp-white p-8 rounded-xl shadow-lg border border-black">

        <Link href="/" className="inline-flex items-center text-sm text-wp-primary mb-6">
          <ArrowLeft className="mr-1" /> Volver
        </Link>

        <div className="flex justify-center mb-4">
          <div className="bg-wp-primary/10 p-4 rounded-full text-wp-primary">
            <KeyRound className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-wp-black text-center">
          Acceso
        </h2>

        {error && <div className="bg-wp-red/10 text-wp-red p-3 rounded mt-4 text-center">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4 mt-6">

          <input 
            name="identifier"
            placeholder="Documento o correo"
            required
            className="w-full border p-3 rounded focus:ring-2 focus:ring-wp-blue"
          />

          <button 
            disabled={loading}
            className="w-full theme-button"
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>

        </form>
      </div>
    </main>
  );
}