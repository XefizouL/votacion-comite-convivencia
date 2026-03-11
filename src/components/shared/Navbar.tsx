'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, Users, ShieldCheck, FileCheck2, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-brand-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-brand-dark p-2 rounded-lg">
                <Vote className="h-6 w-6 text-brand-white" />
              </div>
              <span className="font-bold text-xl text-brand-dark tracking-tight">Agro<span className="text-brand-light">Votos</span></span>
            </Link>
          </div>

          {/* Enlaces */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/registro" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/registro') ? 'bg-brand-light/10 text-brand-dark' : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'}`}>
              <Users className="h-4 w-4" /> Registro
            </Link>
            <Link href="/postular" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/postular') ? 'bg-brand-light/10 text-brand-dark' : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'}`}>
              <FileCheck2 className="h-4 w-4" /> Postularse
            </Link>
            <Link href="/admin/candidatos" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${pathname.startsWith('/admin') ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'}`}>
              <ShieldCheck className="h-4 w-4" /> Panel Admin
            </Link>
          </div>

          {/* Botón Destacado (Amarillo Institucional) */}
          <div className="flex items-center">
            <Link href="/login" className="bg-brand-yellow hover:bg-yellow-400 text-brand-dark px-5 py-2 rounded-lg text-sm font-bold transition shadow flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Ingresar a Votar
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}