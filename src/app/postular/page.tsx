'use client'

import { useState } from "react";
import { createCandidate } from "@/actions/candidates";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function PostulatePage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [docValue, setDocValue] = useState(""); // Estado para controlar el input numérico

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

  // Función para permitir solo números
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setDocValue(onlyNumbers);
  };

  return (
    <main className="min-h-screen bg-[url('/fondo.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-3xl shadow-xl border border-black/10">
        
        <Link href="/" className="inline-flex items-center text-sm text-wp-primary mb-6 hover:underline font-bold">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <h2 className="text-2xl font-bold text-wp-black mb-6">Postularme</h2>
            
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 border border-red-200 text-sm">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-4 border border-green-200 text-sm">{success}</div>}

            <form onSubmit={onSubmit} className="space-y-4">
              <input 
                name="fullName" 
                placeholder="Nombre completo" 
                required 
                className="w-full border-2 border-gray-200 p-3 rounded-xl outline-none focus:border-wp-primary text-wp-black" 
              />
              <input 
                name="position" 
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={docValue}
                onChange={handleNumberChange}
                placeholder="Nº de Documento" 
                required 
                className="w-full border-2 border-gray-200 p-3 rounded-xl outline-none focus:border-wp-primary text-wp-black" 
              />
              
              <div>
                <label className="text-sm font-bold flex items-center mb-2 text-wp-black">
                  <Upload className="mr-2 h-4 w-4" /> Fotografía
                </label>
                <input 
                  type="file" 
                  name="photo" 
                  required 
                  accept="image/*" 
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 text-sm text-wp-black file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-wp-primary file:text-white" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-wp-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg border border-black/10"
              >
                {loading ? "Enviando..." : "Enviar Postulación"}
              </button>
            </form>
          </div>

          {/* Bloque Funciones del Vocero */}
          <div className="bg-wp-primary/5 p-6 rounded-2xl border border-wp-primary/10">
            <h3 className="text-lg font-bold text-wp-primary mb-4">
              FUNCIONES DEL VOCERO
            </h3>
            <ul className="space-y-3 text-sm text-wp-black/80">
              <li className="flex items-start">
                <span className="mr-2 text-black font-bold">•</span> Recoge inquietudes de contratistas
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-black font-bold">•</span> Canaliza situaciones hacia el Comité
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-black font-bold">•</span> Apoya actividades y/o capacitaciones del Comité de convivencia Laboral
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-black font-bold">•</span> Participa en reuniones (con voz, sin voto)
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-black font-bold">•</span> Promueve cultura preventiva y ética profesional
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}