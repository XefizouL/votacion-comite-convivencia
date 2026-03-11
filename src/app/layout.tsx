import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Votación Institucional",
  description: "Plataforma oficial para elecciones y postulación de candidatos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        {/* El menú superior global */}
        <Navbar />
        
        {/* El contenido de cada página */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Pie de página global */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Sistema de Elecciones Institucionales. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}