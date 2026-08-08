"use client";

import React from 'react';
import { ShieldCheck, QrCode, Printer } from 'lucide-react';

export default function FinalTicketView({ pnrNumber, selectedOffer, origin, destination, passengerDetails, plateNumber, totalCost, handlePrint, setBookingStage, setStep }: any) {
  return (
    <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border max-w-xl mx-auto text-center space-y-6 ticket-container animate-scale-up">
      <div className="print-hidden flex flex-col items-center">
        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-full shadow-inner mb-1"><ShieldCheck className="h-5 w-5" /></div>
        <h2 className="text-lg font-black text-slate-900">✅ Zahlung erfolgreich • 🎉 Buchung bestätigt</h2>
        <p className="text-xs text-slate-500">Buchungsnummer: <b>{pnrNumber}</b></p>
      </div>

      {/* 🎫 DAS OFFIZIELLE TICKET */}
      <div id="final-print-ticket" className="ticket-card border-2 border-slate-900 rounded-[20px] p-5 bg-slate-50/40 text-left relative space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-sm font-black text-slate-950">🚢 NISOUFERRIES</span>
          <span className="print-badge font-mono text-xs font-black bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded tracking-wider uppercase">{pnrNumber}</span>
        </div>
        <div className="bg-white border p-3 rounded-xl space-y-2 shadow-sm text-xs font-bold">
          <div className="flex justify-between border-b pb-1.5 border-slate-100">
            <span>Fähre: {selectedOffer?.shipName || "Mediterranean Star"}</span>
            <span className="text-right">{origin.split(' ')[0]} ➔ {destination.split(' ')[0]}</span>
          </div>
          <p className="text-slate-500">📅 Datum: 15.08.2026 • 🕒 Reisezeit: {selectedOffer?.duration || "20 Stunden"}</p>
        </div>
        <div className="space-y-1 text-xs font-bold">
          <span className="text-[8px] text-slate-400 block uppercase">Passagierliste:</span>
          {passengerDetails.map((p: any, idx: number) => (
            <div key={p.id} className="flex justify-between text-slate-900 text-[11px] bg-white border p-2 rounded-xl">
              <span>{idx + 1}. {p.lastName.toUpperCase()}, {p.firstName} ({p.type})</span>
              <span className="font-mono text-slate-400">{p.passport || "C99999"}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <div className="bg-white border p-2 rounded-xl"><span className="text-[8px] text-slate-400 block">Zoll-Kennzeichen</span><span className="font-mono text-slate-900 font-black uppercase text-xs">{plateNumber || "🚶 PIÉTON"}</span></div>
          <div className="bg-white border p-2 rounded-xl"><span className="text-[8px] text-slate-400 block">Gesamtpreis</span><span className="text-slate-900 font-black text-xs font-mono">{totalCost} € PAID</span></div>
        </div>
        <div className="pt-2 border-t border-slate-200/60 flex flex-col items-center">
          <QrCode className="h-12 w-14 text-slate-950 mb-1" />
          <div className="h-5 w-48 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-60"></div>
          <span className="text-[7px] font-mono tracking-[0.3em] font-black text-slate-400 uppercase mt-0.5">{pnrNumber}</span>
        </div>
      </div>
      <div className="print-hidden grid grid-cols-2 gap-2">
        <button type="button" onClick={handlePrint} className="bg-blue-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1"><Printer className="h-4 w-4" /> Ticket anzeigen / PDF</button>
        <button type="button" onClick={() => { setBookingStage('list'); setStep(1); }} className="bg-slate-100 text-slate-700 font-black py-3 rounded-xl text-xs uppercase tracking-wider">Neue Suche</button>
      </div>
    </div>
  );
}
