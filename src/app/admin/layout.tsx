'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UsersRound, BarChart3, LogOut } from "lucide-react";
import { logoutAdmin } from "@/actions/adminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/login-admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-wp-black">

      <div className="bg-white text-wp-white shadow-md border-b border-black">
        <div className="max-w-6xl mx-auto px-8 py-4 flex flex-wrap gap-4 justify-between items-center">

          {/* 🔹 NAV */}
          <div className="flex gap-4">
            <Link 
              href="/admin/candidatos"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
              ${pathname === '/admin/candidatos' ? 'bg-green-600 text-wp-white border border-black' : 'text-green-600'}`}
            >
              <UsersRound className="h-4 w-4" />
              Candidatos
            </Link>

            <Link 
              href="/admin/resultados"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
              ${pathname === '/admin/resultados' ? 'bg-green-600 text-wp-white border border-black' : 'text-green-600'}`}
            >
              <BarChart3 className="h-4 w-4" />
              Resultados
            </Link>
          </div>

          {/* 🔥 BOTÓN LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-sm font-medium border border-black transition"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
    </div>
  );
}