"use client";

import React from 'react';
import { Ship, QrCode, FileText, Printer, ShieldCheck } from 'lucide-react';
import MailInboxView from './MailInboxView';
import { getPrintWindowContent } from './printTemplate'; // <-- Hier importiert!

export default function BoardingPass({ pnrNumber, passengerList, origin, destination, selectedOffer, vehicle, plateNumber, selectedSeat, finalPrice, emailInput, setBookingStage, setStep }: any) {
  
  const handlePrint = () => {
    const ticketElement = document.getElementById('final-print-ticket');
    if (!ticketElement) return;

    const ticketHtml = ticketElement.innerHTML;
    const oldBody = document.body.innerHTML;

    // Nutzt das ausgelagerte, unzerstörbare Druck-Template
    document.body.innerHTML = getPrintWindowContent(pnrNumber, ticketHtml);

    window.print();

    // Stellt die Webseite sofort wieder funktionsfähig her
    document.body.innerHTML = oldBody;
    window.location.reload();
  };

  return (
    <div className="space-y-6 text-left text-slate-900 font-sans">
      
      <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border border-slate-100 max-w-2xl mx-auto space-y-6">
        
        {/* AKTIONBAR (NUR IM BROWSER) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5 text-emerald-600">
            <div className="p-2 bg-emerald-50 rounded-xl"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Offizielles Ticket ausgestellt</h2>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Grenz-ID: APPROVED</p>
            </div>
          </div>
          <button type="button" onClick={handlePrint} className="bg-[#0b2545] hover:bg-slate-800 text-amber-400 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md">
            <Printer className="h-4 w-4" /> PDF herunterladen / Drucken
          </button>
        </div>

        {/* 🎫 DAS CODE-ISOLIERTE MASTER-TICKET (ID="final-print-ticket") */}
        <div id="final-print-ticket" className="border-2 border-slate-900 rounded-[24px] p-6 md:p-8 bg-slate-50/40 relative space-y-6">
          
          <div className="flex-between border-b">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-slate-950 tracking-tight">NISOU<span className="text-blue-600">FERRIES</span></span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 font-black uppercase block">BUCHUNGSCODE / PNR</span>
              <span className="font-mono text-base font-black bg-slate-950 text-amber-400 px-3 py-1 rounded-lg tracking-widest uppercase">{pnrNumber}</span>
            </div>
          </div>

          <div className="bg-white border p-4 rounded-xl shadow-sm space-y-4">
            <div className="grid-cols-2 border-b">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-black block">Abfahrtshafen / From</span>
                <span className="font-black text-slate-950 text-sm md:text-base">{origin}</span>
                <span className="text-[10px] text-blue-600 font-bold block mt-1">📅 15. September 2026</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 uppercase font-black block">Zielhafen / To</span>
                <span className="font-black text-slate-950 text-sm md:text-base block">{destination}</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1">🕒 Ankunft (+1 Tag)</span>
              </div>
            </div>
            <div className="flex-between text-xs font-bold text-slate-700">
              <div>Fährlinie: <span className="text-blue-700 font-black">{selectedOffer?.company || "CORSICA LINEA"}</span></div>
              <div className="bg-slate-50 px-2.5 py-1 rounded-lg border text-[11px] font-black">Überfahrt: ~21 Std.</div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] text-slate-400 uppercase font-black block">Registrierte Passagiere ({passengerList.length})</span>
            <div className="space-y-2">
              {passengerList.map((p: any, idx: number) => (
                <div key={p.id} className="flex-between text-slate-900 font-black text-xs bg-white border p-3 rounded-xl shadow-sm">
                  <span className="uppercase text-[12px]">{idx + 1}. {p.lastName}, {p.firstName}</span>
                  <div className="text-right">
                    <span className="text-[8px] text-slate-400 block uppercase">Pass-Nr.</span>
                    <span className="font-mono text-slate-600 text-[11px]">{p.passport || "C9999999"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-cols-2">
            <div className="bg-white border-2 border-amber-300 p-3.5 rounded-2xl">
              <span className="text-[9px] text-amber-800 uppercase font-black block">Amtliches Zoll-Kennzeichen / Plate</span>
              <span className="font-mono text-slate-950 font-black tracking-widest text-sm md:text-base block mt-0.5 uppercase">{plateNumber || "🚶 OHNE FAHRZEUG (PIÉTON)"}</span>
            </div>
            <div className="bg-white border-2 border-blue-200 p-3.5 rounded-2xl">
              <span className="text-[9px] text-blue-800 uppercase font-black block">Unterbringung / Accommodation</span>
              <span className="text-slate-950 font-black text-sm md:text-base block mt-0.5 uppercase">{selectedSeat ? selectedSeat : "Standard Deckspassage"}</span>
            </div>
          </div>

          <div className="border-t-2 border-slate-950 pt-4 flex-between">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[9px] text-slate-400 font-black block uppercase">Gesamtbetrag (Erfolgreich bezahlt)</span>
              <span className="text-2xl font-black text-slate-900 font-mono block">{finalPrice} €</span>
              <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 rounded font-black uppercase mt-1 block w-fit">STRIPE CONFIRMED</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-dashed border-slate-300 shadow-sm">
              <QrCode className="h-14 w-14 text-slate-950 shrink-0" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 flex flex-col items-center justify-center">
            <div className="h-6 w-56 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-60"></div>
            <span className="text-[8px] font-mono tracking-[0.3em] font-black text-slate-400 uppercase mt-1">{pnrNumber}</span>
          </div>
        </div>

        {/* WEB BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl">
            <FileText className="h-4 w-4" /> PDF herunterladen / Drucken
          </button>
          <button type="button" onClick={() => { setBookingStage('list'); setStep(1); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-4 rounded-2xl text-xs uppercase tracking-wider">
            Neue Suche starten
          </button>
        </div>
      </div>

      <MailInboxView emailInput={emailInput} pnrNumber={pnrNumber} destination={destination} origin={origin} />
    </div>
  );
}
