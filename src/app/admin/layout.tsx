'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UsersRound, BarChart3 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sub-menú del Administrador */}
      <div className="bg-gray-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-8 py-3 flex gap-6">
          <Link 
            href="/admin/candidatos" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${pathname === '/admin/candidatos' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <UsersRound className="h-4 w-4" /> Gestión de Candidatos
          </Link>
          <Link 
            href="/admin/resultados" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${pathname === '/admin/resultados' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <BarChart3 className="h-4 w-4" /> Resultados y Reportes
          </Link>
        </div>
      </div>

      {/* Aquí cargan las páginas de candidatos o resultados */}
      <div>
        {children}
      </div>
    </div>
  );
}