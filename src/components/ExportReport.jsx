import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ExportReport({ targetId, filename }) {
    const [isExporting, setIsExporting] = useState(false);

    const generatePDF = async () => {
        setIsExporting(true);
        const element = document.getElementById(targetId);

        if (element) {
            try {
                // Take a "screenshot" of the dashboard
                const canvas = await html2canvas(element, {
                    scale: 2, // Makes the PDF high-resolution
                    backgroundColor: '#000000', // Matches your dark theme
                    useCORS: true // Helps load external SVG icons properly
                });

                const imgData = canvas.toDataURL('image/png');

                // Create a new PDF document (A4 size)
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                // Add the image to the PDF and download it
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${filename}-${new Date().toLocaleDateString()}.pdf`);
            } catch (error) {
                console.error("Failed to generate PDF", error);
                alert("Failed to generate report. Check console for details.");
            }
        }
        setIsExporting(false);
    };

    return (
        <button
            onClick={generatePDF}
            disabled={isExporting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isExporting
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-brandBlue/10 text-brandBlue hover:bg-brandBlue hover:text-white border border-brandBlue/20'
                }`}
        >
            {isExporting ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                </>
            ) : (
                <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    Export Report
                </>
            )}
        </button>
    );
}