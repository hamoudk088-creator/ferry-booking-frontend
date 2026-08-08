"use client";

import React from 'react';
import { Ticket } from 'lucide-react';

export default function BoardingPass({ pnrNumber, passengerList, origin, destination, selectedOffer, vehicle, plateNumber, selectedSeat, finalPrice, emailInput, setBookingStage, setStep }: any) {
  return (
    <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border max-w-xl mx-auto text-center space-y-6 animate-scale-up">
      <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 shadow-inner">✓</div>
      <div>
        <h2 className="text-2xl font-black text-slate-900">Buchung erfolgreich!</h2>
        <p className="text-xs text-slate-500 mt-1">Bestätigung &amp; PDF-Fährticket gesendet an: <b>{emailInput}</b></p>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-3xl p-5 bg-slate-50/60 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#0b2545] text-amber-400 px-4 py-1 text-[10px] font-black rounded-bl-xl tracking-wider">
          <Ticket className="h-3.5 w-3.5 inline mr-1" /> BOARDING PASS
        </div>
        
        <div className="space-y-3 text-xs font-bold text-slate-700">
          <div className="flex justify-between"><span>Buchungsnummer (PNR):</span><span className="font-mono text-slate-900 font-black text-sm">{pnrNumber}</span></div>
          
          <div className="border-t pt-2 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">Registrierte Passagiere:</span>
            {passengerList.map((p: any, idx: number) => (
              <div key={p.id} className="flex justify-between text-slate-900 font-black text-[11px]">
                <span>{idx + 1}. {p.lastName.toUpperCase()}, {p.firstName} ({p.type})</span>
                <span className="font-mono text-slate-500">{p.passport}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t pt-2"><span>Fährstrecke:</span><span className="text-slate-900">{origin} ➔ {destination}</span></div>
          <div className="flex justify-between"><span>Reiselinie:</span><span className="text-blue-700 font-black">{selectedOffer?.company}</span></div>
          
          {vehicle !== 'None' && (
            <div className="flex justify-between border-t pt-2 bg-amber-400/10 p-2 rounded-xl border border-amber-200">
              <span className="text-slate-500 font-medium">Grenz-Kennzeichen:</span>
              <span className="font-mono text-slate-900 font-black tracking-widest">{plateNumber}</span>
            </div>
          )}

          <div className="flex justify-between"><span>Gewählter Platz:</span><span className="text-slate-900">{selectedSeat ? selectedSeat : "Standard Deckspassage"}</span></div>
          <div className="flex justify-between border-t pt-2 text-blue-900 font-black text-sm"><span>Endbetrag (Stripe):</span><span>{finalPrice} €</span></div>
        </div>
      </div>

      <button type="button" onClick={() => { setBookingStage('list'); setStep(1); }} className="w-full bg-[#0b2545] text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider">
        Neue Suche starten
      </button>
    </div>
  );
}
