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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-wp-primary text-wp-white flex flex-col min-h-screen`}>
        
        <Navbar />

        <div className="flex-grow">
          {children}
        </div>

        <footer className="bg-wp-primary border-t border-black py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-wp-white">
            &copy; {new Date().getFullYear()} Sistema de Elecciones Institucionales.
          </div>
        </footer>

      </body>
    </html>
  );
}