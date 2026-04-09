'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, Users, ShieldCheck, FileCheck2, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-wp-primary shadow-sm border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-wp-white p-2 rounded-lg border border-black">
                <Vote className="h-6 w-6 text-wp-primary" />
              </div>
              <span className="font-bold text-xl text-wp-white tracking-tight">Agro<span className="text-wp-white">Votos</span></span>
            </Link>
          </div>

          {/* Enlaces */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/registro" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/registro') ? 'bg-wp-white text-wp-primary border border-black' : 'text-wp-white hover:bg-wp-white/10 hover:text-wp-white'}`}>
              <Users className="h-4 w-4" /> Registro
            </Link>
            <Link href="/postular" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/postular') ? 'bg-wp-white text-wp-primary border border-black' : 'text-wp-white hover:bg-wp-white/10 hover:text-wp-white'}`}>
              <FileCheck2 className="h-4 w-4" /> Postularse
            </Link>
            <Link href="/admin/candidatos" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${pathname.startsWith('/admin') ? 'bg-wp-white text-wp-primary border border-black' : 'text-wp-white hover:bg-wp-white/10 hover:text-wp-white'}`}>
              <ShieldCheck className="h-4 w-4" /> Panel Admin
            </Link>
          </div>

          {/* Botón Destacado (Amarillo Institucional) */}
          <div className="flex items-center">
            <Link href="/login" className="bg-wp-white text-wp-primary px-5 py-2 rounded-lg text-sm font-bold transition shadow border border-black flex items-center gap-2 hover:bg-wp-white/90">
              <LogIn className="h-4 w-4" /> Ingresar a Votar
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}