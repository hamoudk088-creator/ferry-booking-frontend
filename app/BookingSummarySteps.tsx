"use client";

import React from 'react';
import { ShieldCheck, QrCode, Printer, FileText, Calendar, Clock } from 'lucide-react';
import MailInboxView from './MailInboxView';
import SecurityLogTerminal from './SecurityLogTerminal'; // <-- Hier importiert!

export default function BookingSummarySteps({ subStage, setSubStage, selectedOffer, origin, destination, adults, children, vehicle, selectedCabin, ticketCost, vehicleCost, cabinCost, mealCost, petCost, totalCost, isPaying, handlePayment, pnrNumber, passengerDetails, plateNumber, mainEmail, setBookingStage, setStep, handlePrint }: any) {
  return (
    <div className="w-full">
      {/* SCHRITT 7: BUCHUNGSÜBERSICHT */}
      {subStage === 'step7_summary' && (
        <div className="bg-white rounded-3xl p-6 border shadow-xl max-w-md mx-auto space-y-4">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 uppercase tracking-wider">📊 Schritt 7: Buchungsübersicht</h3>
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3 text-xs font-bold text-slate-800">
            <div className="border-b pb-2">
              <span className="text-sm font-black block">🚢 {selectedOffer?.shipName}</span>
              <span className="text-blue-600 text-[10px] block mt-0.5">{origin} ➔ {destination}</span>
              <span className="text-[9px] text-slate-400 block font-medium mt-0.5">Hinreise: 15.08.2026 • Dauer: {selectedOffer?.duration}</span>
            </div>
            <div className="space-y-1.5 border-b pb-2.5 text-[11px]">
              <div className="flex justify-between font-medium text-slate-500"><span>Fährticket</span><span className="font-mono text-slate-900 font-bold">{ticketCost} €</span></div>
              {vehicle !== 'None' && <div className="flex justify-between font-medium text-slate-500"><span>Fahrzeug</span><span className="font-mono text-slate-900 font-bold">{vehicleCost} €</span></div>}
              {selectedCabin && <div className="flex justify-between font-medium text-slate-500"><span>Kabine</span><span className="font-mono text-slate-900 font-bold">{cabinCost} €</span></div>}
              {mealCost > 0 && <div className="flex justify-between font-medium text-slate-500"><span>Mahlzeit</span><span className="font-mono text-slate-900 font-bold">{mealCost} €</span></div>}
              {petCost > 0 && <div className="flex justify-between font-medium text-slate-600"><span>Haustier</span><span className="font-mono text-slate-900 font-bold">{petCost} €</span></div>}
              <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-black text-blue-950 bg-amber-400/20 p-2 rounded-xl"><span>Gesamt</span><span className="text-sm font-mono">{totalCost} €</span></div>
            </div>
          </div>
          <button type="button" onClick={() => setSubStage('step8_pay')} className="w-full bg-blue-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zur Zahlung</button>
        </div>
      )}

      {/* SCHRITT 8 & 9: ZAHLUNG MIT CYBER-CONVENTIONAL TERMINAL */}
      {subStage === 'step8_pay' && (
        <form onSubmit={handlePayment} className="bg-white rounded-3xl p-6 border shadow-xl max-w-md mx-auto space-y-4 text-center">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 text-left uppercase tracking-wider">💳 Schritt 8 &amp; 9: Zahlung</h3>
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-4.5 rounded-2xl text-left shadow-lg font-mono">
            <div className="flex justify-between items-center"><span className="text-[10px] font-black tracking-widest text-blue-200">STRIPE GATEWAY</span><span className="text-base font-bold">VISA</span></div>
            <div className="text-base tracking-[0.2em] font-black text-center py-4">4242 4242 4242 4242</div>
          </div>
          
          {/* TERMINAL LOG INTEGRATION HIER */}
          <SecurityLogTerminal isPaying={isPaying} totalCost={totalCost} />

          <button type="submit" disabled={isPaying} className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest disabled:opacity-40">{isPaying ? "🔒 Tokenisierung aktiv..." : `Jetzt bezahlen (${totalCost} €)`}</button>
        </form>
      )}

      {/* SCHRITT 10: CONFIRMED */}
      {subStage === 'step10_confirmed' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border max-w-xl mx-auto text-center space-y-6 ticket-container">
            <div className="print-hidden flex flex-col items-center">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-full shadow-inner mb-1"><ShieldCheck className="h-5 w-5" /></div>
              <h2 className="text-lg font-black text-slate-900">✅ Zahlung erfolgreich • 🎉 Buchung bestätigt</h2>
              <p className="text-xs text-slate-500">Buchungsnummer: <b>{pnrNumber}</b></p>
            </div>

            <div id="final-print-ticket" className="ticket-card border-2 border-slate-900 rounded-[20px] p-5 bg-slate-50/40 text-left relative space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-1.5"><span className="text-sm font-black text-slate-950">🚢 NISOUFERRIES</span></div>
                <span className="print-badge font-mono text-xs font-black bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded tracking-wider uppercase">{pnrNumber}</span>
              </div>
              <div className="bg-white border p-3 rounded-xl space-y-3 shadow-sm">
                <div className="grid grid-cols-2 gap-4 border-b pb-2 border-slate-100 text-xs font-bold">
                  <div><span className="text-[8px] text-slate-400 block uppercase">Fähre / Line</span><span className="font-black">{selectedOffer?.shipName}</span></div>
                  <div className="text-right"><span className="text-[8px] text-slate-400 block uppercase">Strecke / Route</span><span className="font-black">{origin.split(' ')} ➔ {destination.split(' ')}</span></div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 15.08.2026</div>
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Reisezeit: {selectedOffer?.duration || "20 Stunden"}</div>
                </div>
              </div>
              <div className="space-y-1 text-xs font-bold">
                <span className="text-[8px] text-slate-400 block uppercase">Passagierliste / Passengers:</span>
                {passengerDetails.map((p: any, idx: number) => (
                  <div key={p.id} className="flex justify-between text-slate-900 text-[11px] bg-white border p-2 rounded-xl">
                    <span>{idx + 1}. {p.lastName.toUpperCase()}, {p.firstName} ({p.type})</span>
                    <span className="font-mono text-slate-400">{p.passport || "C99999"}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="bg-white border p-2 rounded-xl"><span className="text-[8px] text-slate-400 block">Zoll-Kennzeichen</span><span className="font-mono text-slate-900 font-black uppercase text-xs tracking-wider">{plateNumber || "🚶 PIÉTON"}</span></div>
                <div className="bg-white border p-2 rounded-xl"><span className="text-[8px] text-slate-400 block">Gesamtpreis</span><span className="text-slate-900 font-black text-xs font-mono">{totalCost} € PAID</span></div>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex flex-col items-center">
                <QrCode className="h-14 w-14 text-slate-950 mb-1" />
                <div className="h-6 w-48 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-60"></div>
                <span className="text-[8px] font-mono tracking-[0.3em] font-black text-slate-400 uppercase">{pnrNumber}</span>
              </div>
            </div>
            <div className="print-hidden grid grid-cols-2 gap-2"><button type="button" onClick={handlePrint} className="bg-blue-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1"><Printer className="h-4 w-4" /> Ticket anzeigen / PDF</button><button type="button" onClick={() => { setBookingStage('list'); setStep(1); }} className="bg-slate-100 text-slate-700 font-black py-3 rounded-xl text-xs uppercase tracking-wider">Neue Suche</button></div>
          </div>
          <MailInboxView emailInput={mainEmail} pnrNumber={pnrNumber} destination={destination} origin={origin} />
        </div>
      )}
    </div>
  );
}
