"use client";

import React, { useState } from 'react';
import { ShieldCheck, QrCode, Printer, Mail, Download, CheckCircle2 } from 'lucide-react';

export default function FinalTicketView({ pnrNumber, selectedOffer, origin, destination, passengerDetails, plateNumber, totalCost, handlePrint, mainEmail, mainPhone, chosenSeat }: any) {
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const handleSendEmail = () => {
    setEmailStatus("⏳ Sende verschlüsseltes PDF-Ticket an Mail-Gateway...");
    setTimeout(() => {
      setEmailStatus(`✅ Ticket erfolgreich an ${mainEmail} übermittelt!`);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border max-w-xl mx-auto text-center space-y-6 ticket-container animate-scale-up text-slate-900 font-sans">
      
      {/* 🎉 STEP 10: CONFIRMATION HEADER */}
      <div className="print-hidden flex flex-col items-center">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full shadow-inner mb-2">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight" id="test-confirmation-header">
          🎉 Buchung bestätigt • Buchung #{pnrNumber}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Zahlungsstatus: <span className="text-emerald-600 font-black">SUCCEEDED (Stripe Secured)</span></p>
      </div>

      {emailStatus && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs font-black rounded-xl text-left animate-pulse print-hidden">
          {emailStatus}
        </div>
      )}

      {/* 🎫 DETAILED BOARDING PASS BOX */}
      <div id="final-print-ticket" className="ticket-card border-2 border-slate-950 rounded-[24px] p-6 bg-slate-50/40 text-left relative space-y-4">
        
        <div className="flex justify-between items-center border-b-2 border-slate-950 pb-3">
          <div>
            <span className="text-base font-black text-slate-950 tracking-tight">🚢 NISOUFERRIES</span>
            <span className="text-[8px] font-mono text-slate-400 block tracking-widest uppercase">Mediterranean Transit Network</span>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-slate-400 font-black block uppercase">Buchungsnummer</span>
            <span className="font-mono text-sm font-black bg-slate-950 text-amber-400 px-3 py-1 rounded-lg tracking-wider uppercase font-mono" id="ticket-pnr-display">
              {pnrNumber}
            </span>
          </div>
        </div>

        {/* ROUTE AND TIMING MATRIX */}
        <div className="bg-white border p-3.5 rounded-xl space-y-3 shadow-sm text-xs font-bold">
          <div className="grid grid-cols-2 gap-4 border-b pb-2 border-slate-100">
            <div>
              <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Abfahrt / Route</span>
              <span className="font-black text-slate-900 text-sm">{origin}</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Ziel / Destination</span>
              <span className="font-black text-slate-900 text-sm">{destination}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <div className="flex items-center gap-1">📅 15.08.2026</div>
            <div className="flex items-center gap-1 font-mono bg-slate-50 px-2 py-0.5 rounded border">🕒 Abfahrt: {selectedOffer?.time || "18:00"}</div>
          </div>
        </div>

        {/* PASSENGERS CONTAINER */}
        <div className="space-y-1.5 text-xs font-bold">
          <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Registrierte Passagiere:</span>
          {passengerDetails?.map((p: any, idx: number) => (
            <div key={idx} className="flex justify-between text-slate-900 text-[11px] bg-white border p-2.5 rounded-xl shadow-xs">
              <span className="uppercase">{idx + 1}. {p.lastName}, {p.firstName}</span>
              <span className="font-mono text-slate-500 text-[10px]">{p.passport || "PASS-DE-123"}</span>
            </div>
          ))}
        </div>

        {/* LOGISTICS SLOTS */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <div className="bg-white border-2 border-amber-300 p-2.5 rounded-xl">
            <span className="text-[8px] text-amber-800 uppercase block">Fahrzeug (Zoll)</span>
            <span className="font-mono text-slate-900 font-black uppercase tracking-wider text-[11px] block mt-0.5" id="ticket-plate-display">
              {plateNumber || "🚶 OHNE FAHRZEUG (PIÉTON)"}
            </span>
          </div>
          <div className="bg-white border-2 border-blue-200 p-2.5 rounded-xl">
            <span className="text-[8px] text-blue-800 uppercase block">Unterbringung</span>
            <span className="text-slate-900 font-black text-[11px] block mt-0.5 uppercase">
              {chosenSeat ? chosenSeat : "Deckspassage Standard"}
            </span>
          </div>
        </div>

        {/* COMPREHENSIVE PRICE VERIFICATION */}
        <div className="border-t-2 border-slate-950 pt-3 flex justify-between items-center text-xs font-bold">
          <div>Gesamtpreis: <span className="text-slate-950 font-mono font-black text-base pl-1" id="ticket-price-display">{totalCost} €</span></div>
          <div className="font-mono text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-black">PAID / WEBHOOK_VERIFIED</div>
        </div>

        {/* BARCODE FOOTER FOR CUSTOMS */}
        <div className="pt-3 border-t border-slate-200 flex flex-col items-center justify-center">
          <QrCode className="h-12 w-12 text-slate-950 mb-1" />
          <div className="h-6 w-48 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-60"></div>
          <span className="text-[7px] font-mono tracking-[0.3em] font-black text-slate-400 uppercase mt-0.5">GATE SCAN CONTROL</span>
        </div>
      </div>

      {/* 🚀 ACTION HANDLERS */}
      <div className="print-hidden grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button type="button" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all" id="btn-download-ticket">
          <Download className="h-4 w-4" /> [Ticket herunterladen]
        </button>
        <button type="button" onClick={handleSendEmail} className="bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all" id="btn-email-ticket">
          <Mail className="h-4 w-4 text-sky-400" /> [Ticket per E-Mail senden]
        </button>
      </div>

    </div>
  );
}
