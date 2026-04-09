'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UsersRound, BarChart3 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-wp-black">

      <div className="bg-wp-primary text-wp-white shadow-md border-b border-black">
        <div className="max-w-6xl mx-auto px-8 py-4 flex flex-wrap gap-4">

          <Link 
            href="/admin/candidatos"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
            ${pathname === '/admin/candidatos' ? 'bg-wp-white text-wp-primary border border-black' : 'text-wp-white hover:bg-wp-white/10'}`}
          >
            <UsersRound className="h-4 w-4" />
            Candidatos
          </Link>

          <Link 
            href="/admin/resultados"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
            ${pathname === '/admin/resultados' ? 'bg-wp-white text-wp-primary border border-black' : 'text-wp-white hover:bg-wp-white/10'}`}
          >
            <BarChart3 className="h-4 w-4" />
            Resultados
          </Link>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
    </div>
  );
}