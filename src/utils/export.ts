import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Pillar, Initiative } from '../types';

export const exportToPDF = (pillars: Pillar[], fileName: string = 'initiatives-report') => {
  const doc = new jsPDF();
  let yPosition = 10;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(18, 40, 63);
  doc.text('برنامج الذكاء الاصطناعي', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  doc.setFontSize(12);
  doc.setTextColor(92, 107, 122);
  doc.text('لتطوير بيئة العمل والتميز المؤسسي', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Summary stats
  let totalInitiatives = 0;
  let totalBudget = 0;
  pillars.forEach((p) => {
    totalInitiatives += p.initiatives.length;
    totalBudget += p.totalBudget || 0;
  });

  doc.setFontSize(10);
  doc.setTextColor(34, 48, 63);
  doc.text(`إجمالي المبادرات: ${totalInitiatives}`, margin, yPosition);
  yPosition += 7;
  doc.text(`إجمالي الميزانية: ${totalBudget.toLocaleString('ar-SA')} ريال`, margin, yPosition);
  yPosition += 12;

  // Pillars and initiatives
  pillars.forEach((pillar) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 10;
    }

    // Pillar title
    doc.setFontSize(14);
    doc.setTextColor(18, 40, 63);
    doc.text(pillar.title, margin, yPosition);
    yPosition += 8;

    // Pillar description
    doc.setFontSize(9);
    doc.setTextColor(92, 107, 122);
    const descLines = doc.splitTextToSize(pillar.description, pageWidth - 2 * margin);
    doc.text(descLines, margin, yPosition);
    yPosition += descLines.length * 5 + 5;

    // Initiatives
    pillar.initiatives.forEach((initiative) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 10;
      }

      doc.setFontSize(10);
      doc.setTextColor(34, 48, 63);
      doc.text(`${initiative.num}. ${initiative.title}`, margin + 5, yPosition);
      yPosition += 6;

      doc.setFontSize(8);
      doc.setTextColor(92, 107, 122);
      const descLines = doc.splitTextToSize(initiative.description, pageWidth - 2 * margin - 10);
      doc.text(descLines, margin + 5, yPosition);
      yPosition += descLines.length * 4 + 3;

      doc.setTextColor(198, 153, 79);
      doc.text(`التأثير: ${initiative.impact}`, margin + 5, yPosition);
      yPosition += 5;

      if (initiative.progress !== undefined) {
        doc.setTextColor(92, 107, 122);
        doc.text(`التقدم: ${initiative.progress}%`, margin + 5, yPosition);
        yPosition += 5;
      }

      yPosition += 3;
    });

    yPosition += 10;
  });

  doc.save(`${fileName}.pdf`);
};

export const exportToExcel = (pillars: Pillar[], fileName: string = 'initiatives-report') => {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Summary
  const summaryData = [
    ['برنامج الذكاء الاصطناعي - تقرير المبادرات'],
    [],
    ['الإحصائيات الأساسية'],
    ['إجمالي المحاور', pillars.length],
  ];

  let totalInitiatives = 0;
  let totalBudget = 0;
  let completedCount = 0;
  let inProgressCount = 0;

  pillars.forEach((pillar) => {
    totalInitiatives += pillar.initiatives.length;
    totalBudget += pillar.totalBudget || 0;
    pillar.initiatives.forEach((init) => {
      if (init.status === 'completed') completedCount++;
      if (init.status === 'in-progress') inProgressCount++;
    });
  });

  summaryData.push(['إجمالي المبادرات', totalInitiatives]);
  summaryData.push(['المبادرات المكتملة', completedCount]);
  summaryData.push(['المبادرات قيد التنفيذ', inProgressCount]);
  summaryData.push(['إجمالي الميزانية', totalBudget]);

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'الملخص');

  // Sheet 2: Detailed initiatives
  const detailedData = [
    ['المحور', 'رقم المبادرة', 'العنوان', 'الحالة', 'الأولوية', 'التقدم %', 'الميزانية', 'تاريخ البداية', 'تاريخ النهاية']
  ];

  pillars.forEach((pillar) => {
    pillar.initiatives.forEach((initiative) => {
      detailedData.push([
        pillar.title,
        initiative.num,
        initiative.title,
        initiative.status,
        initiative.priority,
        initiative.progress || 0,
        initiative.budget || 0,
        initiative.startDate || '',
        initiative.endDate || '',
      ]);
    });
  });

  const detailedSheet = XLSX.utils.aoa_to_sheet(detailedData);
  XLSX.utils.book_append_sheet(workbook, detailedSheet, 'تفاصيل المبادرات');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToCSV = (pillars: Pillar[], fileName: string = 'initiatives-report') => {
  const csvData: string[] = [];
  csvData.push('المحور,رقم المبادرة,العنوان,الوصف,الحالة,الأولوية,التقدم %,الميزانية,تاريخ البداية,تاريخ النهاية');

  pillars.forEach((pillar) => {
    pillar.initiatives.forEach((initiative) => {
      const row = [
        `"${pillar.title}"`,
        `"${initiative.num}"`,
        `"${initiative.title}"`,
        `"${initiative.description}"`,
        initiative.status,
        initiative.priority,
        initiative.progress || 0,
        initiative.budget || 0,
        initiative.startDate || '',
        initiative.endDate || '',
      ].join(',');
      csvData.push(row);
    });
  });

  const csvContent = csvData.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  link.click();
};
