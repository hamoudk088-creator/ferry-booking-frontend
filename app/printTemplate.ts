export function getPrintWindowContent(pnrNumber: string, ticketHtml: string): string {
  return `
    <html>
      <head>
        <title>NISOUFERRIES_Ticket_${pnrNumber}</title>
        <style>
          @page { size: A4 portrait; margin: 10mm 15mm 10mm 15mm; }
          body { background: #ffffff !important; color: #000000 !important; font-family: sans-serif !important; padding: 20px !important; }
          .ticket-print-box { border: 2px solid #000000 !important; padding: 24px !important; border-radius: 16px !important; background-color: #f8fafc !important; }
          .grid { display: grid !important; grid-template-cols: repeat(4, minmax(0, 1fr)) !important; gap: 16px !important; }
          .grid-cols-2 { display: grid !important; grid-template-cols: repeat(2, minmax(0, 1fr)) !important; gap: 16px !important; }
          .flex { display: flex !important; align-items: center !important; }
          .flex-between { display: flex !important; justify-content: space-between !important; width: 100% !important; }
          .border-b { border-bottom: 1px solid #cbd5e1 !important; padding-bottom: 12px !important; margin-bottom: 12px !important; }
          .space-y-4 > * + * { margin-top: 16px !important; }
          .bg-slate-950 { background-color: #0f172a !important; color: #ffffff !important; padding: 4px 10px !important; border-radius: 6px !important; }
          .text-right { text-align: right !important; }
        </style>
      </head>
      <body>
        <div class="ticket-print-box">${ticketHtml}</div>
      </body>
    </html>
  `;
}
