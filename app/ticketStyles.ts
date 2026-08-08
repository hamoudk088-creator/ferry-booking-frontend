export const ticketPrintStyles = `
  @media print {
    /* Stellt saubere A4-Ränder ein */
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }

    /* Zwingt den Browser, Farben, Rahmen und Boxen farbig zu drucken */
    html, body {
      background-color: #ffffff !important;
      color: #000000 !important;
      font-family: sans-serif !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Blendet alles aus, was die Klasse web-hide besitzt */
    .web-hide {
      display: none !important;
    }

    /* Der neue, unzerstörbare Ticket-Rahmen im PDF */
    .profi-ticket-box {
      display: block !important;
      visibility: visible !important;
      border: 2px solid #000000 !important;
      background-color: #f8fafc !important;
      padding: 24px !important;
      border-radius: 16px !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 auto !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Erzwingt, dass die Tabellenzeilen im Ausdruck richtig angeordnet bleiben */
    .profi-ticket-box .grid { display: grid !important; }
    .profi-ticket-box .flex { display: flex !important; }

    .print-badge {
      background-color: #0f172a !important;
      color: #ffffff !important;
      padding: 4px 10px !important;
      border-radius: 6px !important;
      display: inline-block !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;
