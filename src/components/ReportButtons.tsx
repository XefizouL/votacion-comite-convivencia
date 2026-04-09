'use client'

import { Download, FileText, TableProperties } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Definimos los tipos que recibimos de la página anterior
interface Props {
  results: any[];
  voters: any[];
  totalVotes: number;
}

export default function ReportButtons({ results, voters, totalVotes }: Props) {

  // 1. Exportar Lista de Votantes a Excel
  const exportToExcel = () => {
    // Formatear datos
    const excelData = voters.map(v => ({
      "Nombre Completo": v.fullName,
      "Documento": v.documentId,
      "Dependencia": v.dependency,
      "Estado del Voto": v.hasVoted ? "VOTÓ" : "NO VOTÓ",
      "Fecha de Registro": new Date(v.createdAt).toLocaleDateString()
    }));

    // Crear hoja y libro de trabajo
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registro de Votantes");

    // Descargar archivo
    XLSX.writeFile(workbook, `Lista_Votantes_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // 2. Exportar Acta de Escrutinio a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Título y Encabezado
    doc.setFontSize(18);
    doc.text("ACTA DE ESCRUTINIO OFICIAL", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total de Votos Registrados: ${totalVotes}`, 14, 38);

    // Si hay ganadores, mostrarlos en el Acta
    if (results.length > 0) {
      doc.setFont("helvetica", 'bold');
      doc.text("CANDIDATOS ELECTOS:", 14, 50);
      doc.setFont("helvetica", 'normal');
      doc.text(`Candidato Principal: ${results[0].fullName} (${results[0]._count.votes} Votos)`, 14, 58);
      
      if (results[1]) {
        doc.text(`Candidato Suplente: ${results[1].fullName} (${results[1]._count.votes} Votos)`, 14, 66);
      }
    }

    // Preparar tabla de resultados para el PDF
    const tableColumn = ["Posición", "Candidato", "Dependencia", "Votos"];
    const tableRows = results.map((c, index) => [
      `#${index + 1}`,
      c.fullName,
      c.dependency,
      c._count.votes.toString()
    ]);

    // Generar tabla con jspdf-autotable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Firmas al final
    const finalY = (doc as any).lastAutoTable.finalY || 80;
    doc.text("_______________________", 40, finalY + 40);
    doc.text("Firma del Administrador", 40, finalY + 48);

    doc.text("_______________________", 130, finalY + 40);
    doc.text("Firma del Testigo", 130, finalY + 48);

    // Descargar PDF
    doc.save(`Acta_Escrutinio_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={exportToExcel}
        className="flex items-center theme-button px-4 py-2"
      >
        <TableProperties className="h-4 w-4 mr-2" />
        Excel Votantes
      </button>

      <button 
        onClick={exportToPDF}
        className="flex items-center theme-button px-4 py-2"
      >
        <FileText className="h-4 w-4 mr-2" />
        Acta PDF
      </button>
    </div>
  );
}