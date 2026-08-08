"use client";

import React from 'react';
import { Mail } from 'lucide-react';

export default function MailInboxView({ emailInput, pnrNumber, destination, origin }: any) {
  return (
    /* 🛑 Die Klasse print-hidden sorgt dafür, dass dieser Block im PDF unsichtbar ist */
    <div className="print-hidden bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-800 max-w-2xl mx-auto shadow-xl space-y-3 text-left mt-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-black text-sky-400">
          <Mail className="h-4 w-4" /> Digitaler Posteingang ({emailInput})
        </div>
        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-black px-2 py-0.5 rounded">Ticket übermittelt</span>
      </div>
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
        <p className="text-[11px] font-bold text-slate-400">Von: <b>booking@nisouferries.com</b></p>
        <h4 className="text-xs font-black text-white">🎟️ Ihre elektronische Bordkarte (PNR: {pnrNumber})</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-900 mt-1.5">
          Hallo, anbei erhalten Sie Ihre offizielle Buchungsbestätigung für die Überfahrt nach {destination.split(' ')}. Ihr Barcode ist für den Zoll freigeschaltet. Bitte nutzen Sie das obige A4-Menü, um Ihr Dokument auszudrucken. NISOUFERRIES wünscht eine gute Überfahrt!
        </p>
      </div>
    </div>
  );
}
