import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASMETA - Sistema de Votación Institucional",
  description: "Plataforma oficial para elecciones y postulación de candidatos del comité.",
  openGraph: {
    title: "ASMETA - Elecciones Institucionales",
    description: "Plataforma oficial para la democracia, transparencia y gestión de las elecciones.",
    url: "https://votacion-comite-convivencia.vercel.app",
    siteName: "ASMETA Votaciones",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Logo ASMETA",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 flex flex-col min-h-screen`}>
        {/* Navegación Global */}
        <Navbar />

        {/* Contenido Dinámico */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Pie de página con los colores de la marca */}
        <footer className="bg-wp-primary border-t border-black py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-white">
            &copy; {new Date().getFullYear()} ASMETA - Sistema de Elecciones Institucionales. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}