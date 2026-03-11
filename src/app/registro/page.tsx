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

    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      setSuccess(response.success);
      (event.target as HTMLFormElement).reset(); // Limpia el formulario
    }
    
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a la Convocatoria
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registro de Funcionario</h2>

        {/* Mensajes de Alerta */}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm border border-green-200">{success}</div>}

        <form onSubmit={onSubmit} className="space-y-4 text-gray-800">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input type="text" name="fullName" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Juan Pérez" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Documento de Identidad</label>
            <input type="text" name="documentId" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: 1020304050" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input type="email" name="email" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="correo@institucion.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dependencia o Área</label>
            <select name="dependency" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">Seleccione un área...</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Operaciones">Operaciones</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 mt-4"
          >
            {loading ? "Registrando..." : "Completar Registro"}
          </button>
        </form>
      </div>
    </main>
  );
}