"use client";

import React from 'react';
import { CreditCard as CardIcon, Wallet, CheckCircle2, Printer, Mail, RefreshCw, Barcode } from 'lucide-react';

export default function BookingPaymentDetails({ step, setStep, paymentMethod, setPaymentMethod, handleProcessPaymentSubmit, isPaying, loadingPhase, validationError, calculateTotal, pnrNumber, selectedOffer, origin, destination, mainEmail }: any) {
  return (
    <div className="space-y-5 animate-scale-up text-xs font-bold text-slate-700 text-left">
      
      {/* 🚢 SCHRITT 8 & 9: ZAHLUNG & BESTÄTIGUNG */}
      {step === 8 && (
        <form onSubmit={handleProcessPaymentSubmit} className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">💳 Schritt 8 &amp; 9: Zahlungsart &amp; 3-D Secure Prüfung</h3>
          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={() => setPaymentMethod('card')} className={`p-2 rounded-xl border-2 font-black text-[9px] uppercase flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'card' ? 'border-[#1e293b] bg-[#1e293b] text-white' : 'bg-slate-50'}`}><CardIcon className="h-3.5 w-3.5" /> Karte</button>
            <button type="button" onClick={() => setPaymentMethod('paypal')} className={`p-2 rounded-xl border-2 font-black text-[9px] uppercase flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'paypal' ? 'border-[#0d9488] bg-teal-50 text-[#0d9488]' : 'bg-slate-50'}`}><Wallet className="h-3.5 w-3.5" /> PayPal</button>
            <button type="button" onClick={() => setPaymentMethod('klarna')} className={`p-2 rounded-xl border-2 font-black text-[9px] uppercase flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'klarna' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'bg-slate-50'}`}><span>🔹</span> Klarna</button>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl font-mono text-left">
            <label className="text-[9px] text-[#0d9488] font-black block mb-1">SECURED PAYMENT CORRIDOR (PCI-DSS)</label>
            <input type="text" required placeholder="4242 4242 4242 4242" className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white focus:outline-none rounded font-mono tracking-widest" />
          </div>

          {isPaying && (
            <div className="p-3 bg-slate-900 text-[#0d9488] font-mono text-[10px] rounded-xl flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" /><span>{loadingPhase}</span>
            </div>
          )}

          {validationError && <div className="p-3 bg-red-50 text-red-700 font-bold rounded-xl">{validationError}</div>}

          <button type="submit" disabled={isPaying} className="w-full bg-[#0d9488] hover:bg-[#0c8074] text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest disabled:opacity-40 shadow-sm">
            {isPaying ? "🔒 Autorisiere..." : `Zahlung freigeben (${calculateTotal()} €)`}
          </button>
        </form>
      )}

      {/* 🚢 SCHRITT 10: TICKET & MEINE BUCHUNG */}
      {step === 10 && (
        <div className="space-y-5 text-center">
          <div className="mx-auto w-12 h-12 bg-emerald-50 text-[#0d9488] rounded-full flex items-center justify-center border border-emerald-200"><CheckCircle2 className="h-6 w-6" /></div>
          <div>
            <h3 className="text-lg font-black text-[#1e293b]">🎟️ Schritt 10: Ticket ausgestellt</h3>
            <p className="text-xs text-slate-400 font-bold mt-1">Offizielle Buchungsnummer (PNR): <span className="font-mono text-[#0d9488] font-black text-sm">{pnrNumber}</span></p>
          </div>

          {/* Virtueller Barcode für das Boarding */}
          <div className="p-4 bg-slate-50 border rounded-xl flex flex-col items-center justify-center gap-1">
            <Barcode className="h-10 w-2/3 text-slate-800" />
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{pnrNumber}-BOARDING-PASS</span>
          </div>

          <div className="p-4 bg-slate-50 border border-[#e2e8f0] rounded-xl grid grid-cols-2 gap-4 text-xs font-bold text-slate-700 text-left">
            <div><span className="text-[8px] text-slate-400 block uppercase">Schiff</span><span className="text-slate-900 font-black">{selectedOffer?.shipName || "Mediterranean Star"}</span></div>
            <div><span className="text-[8px] text-slate-400 block uppercase">Route</span><span className="text-slate-900 font-black">{origin} ➔ {destination}</span></div>
          </div>

          <div className="border-t pt-3 grid grid-cols-2 gap-2 text-xs font-black uppercase">
            <button type="button" onClick={() => window.print()} className="p-3 border rounded-xl bg-white flex items-center justify-center gap-1.5 hover:bg-slate-50"><Printer className="h-4 w-4" /> PDF herunterladen</button>
            <button type="button" onClick={() => alert(`Ticket erneut an ${mainEmail} gesendet.`)} className="p-3 border rounded-xl bg-white flex items-center justify-center gap-1.5 hover:bg-slate-50"><Mail className="h-4 w-4" /> E-Mail senden</button>
          </div>
          <button type="button" onClick={() => window.location.reload()} className="w-full bg-[#1e293b] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Neue Buchung starten</button>
        </div>
      )}

    </div>
  );
}
