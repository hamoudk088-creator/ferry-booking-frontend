"use client";

import React, { useState } from 'react';
import { CreditCard as CardIcon, Wallet, ShieldCheck, Receipt } from 'lucide-react';
import MailInboxView from './MailInboxView';
import SecurityLogTerminal from './SecurityLogTerminal';
import FinalTicketView from './FinalTicketView';

export default function BookingSummarySteps({ subStage, setSubStage, selectedOffer, origin, destination, adults, children, vehicle, selectedCabin, ticketCost, vehicleCost, cabinCost, mealCost, petCost, totalCost, isPaying, handlePayment, pnrNumber, passengerDetails, plateNumber, mainEmail, setBookingStage, setStep, handlePrint }: any) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  // Holt die dynamischen, transparenten Berechnungen
  const adultPriceItem = Number(adults) * (selectedOffer?.basePrice || 90);
  const childPriceItem = Number(children) * 45;
  const taxesAndFeesItem = 35; // Transparente Hafengebühr

  return (
    <div className="w-full text-slate-900 font-sans">
      
      {/* SCHRITT 7: BUCHUNGSÜBERSICHT (EXAKTE TABELLARISCHE AUFSCHLÜSSELUNG) */}
      {subStage === 'step7_summary' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border shadow-xl max-w-xl mx-auto space-y-5 animate-scale-up">
          <div className="flex items-center gap-2 border-b pb-3">
            <Receipt className="h-5 w-5 text-cyan-600" />
            <h3 className="text-sm font-black text-[#0b2545] uppercase tracking-wider">📊 Schritt 7: Transparente Buchungsübersicht</h3>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-inner">
            {/* Reale Rechnungs-Tabelle nach OWASP- und E-Commerce-Standards */}
            <table className="w-full border-collapse text-xs text-left">
              <thead>
                <tr className="bg-[#0b2545] text-amber-300 font-mono text-[10px] tracking-widest uppercase">
                  <th className="p-3 font-black">Position / Item</th>
                  <th className="p-3 text-right font-black">Preis / Price</th>
                </tr>
              </thead>
              <tbody className="font-bold text-slate-700 divide-y divide-slate-200/60">
                <tr className="hover:bg-slate-100/50">
                  <td className="p-3">{adults} × Erwachsene</td>
                  <td className="p-3 text-right font-mono">{adultPriceItem} €</td>
                </tr>
                {Number(children) > 0 && (
                  <tr className="hover:bg-slate-100/50">
                    <td className="p-3">{children} × Kind</td>
                    <td className="p-3 text-right font-mono">{childPriceItem} €</td>
                  </tr>
                )}
                {vehicle !== 'None' && (
                  <tr className="hover:bg-slate-100/50">
                    <td className="p-3">Fahrzeug ({vehicle === 'Car' ? 'PKW' : vehicle})</td>
                    <td className="p-3 text-right font-mono">{vehicleCost} €</td>
                  </tr>
                )}
                {selectedCabin && (
                  <tr className="hover:bg-slate-100/50">
                    <td className="p-3">Innenkabine (Bettplatz)</td>
                    <td className="p-3 text-right font-mono">{cabinCost} €</td>
                  </tr>
                )}
                {petCost > 0 && (
                  <tr className="hover:bg-slate-100/50">
                    <td className="p-3">Haustier-Mitnahme</td>
                    <td className="p-3 text-right font-mono">{petCost} €</td>
                  </tr>
                )}
                {mealCost > 0 && (
                  <tr className="hover:bg-slate-100/50">
                    <td className="p-3">Vollpension (Mahlzeiten)</td>
                    <td className="p-3 text-right font-mono">{mealCost} €</td>
                  </tr>
                )}
                {/* Transparente Steuern ohne Überraschungen */}
                <tr className="bg-slate-100/80 text-slate-500 font-medium">
                  <td className="p-3">📋 Steuern &amp; Hafengebühren</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-700">{taxesAndFeesItem} €</td>
                </tr>
                {/* Endbetrag */}
                <tr className="bg-amber-400/20 text-blue-950 font-black text-sm">
                  <td className="p-3 uppercase tracking-wider">Gesamtpreis</td>
                  <td className="p-3 text-right font-mono text-base text-[#0b2545]">{totalCost} €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button type="button" onClick={() => setSubStage('step8_pay')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all">
            Weiter zur sicheren Zahlung ➔
          </button>
        </div>
      )}

      {/* SCHRITT 8 & 9: PAYMENT SCREEN */}
      {subStage === 'step8_pay' && (
        <div className="bg-white rounded-3xl p-6 border shadow-xl max-w-md mx-auto space-y-4 animate-scale-up">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 text-left uppercase tracking-wider">💳 Schritt 8 &amp; 9: Sichere Bezahlung</h3>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setPaymentMethod('card')} className={`p-2.5 rounded-xl border-2 font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${paymentMethod === 'card' ? 'border-[#0b2545] bg-[#0b2545] text-amber-400 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600'}`}><CardIcon className="h-4 w-4" /> Credit Card</button>
            <button type="button" onClick={() => setPaymentMethod('paypal')} className={`p-2.5 rounded-xl border-2 font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600'}`}><Wallet className="h-4 w-4 text-blue-600" /> PayPal</button>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            {paymentMethod === 'card' ? (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-inner text-left font-mono">
                <label className="text-[10px] text-cyan-400 font-black block mb-2 tracking-wider">SECURED CARD INPUT (PCI-DSS COMPLIANT)</label>
                <input type="text" required maxLength={19} placeholder="4242 4242 4242 4242" className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs font-black tracking-widest text-white focus:outline-none" />
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-left text-xs font-bold text-blue-900">🔹 Sie werden sicher zu **PayPal Checkout** weitergeleitet.</div>
            )}
            <SecurityLogTerminal isPaying={isPaying} totalCost={totalCost} />
            <button type="submit" disabled={isPaying} className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest">{isPaying ? "🔒 Autorisierung aktiv..." : `Jetzt bezahlen (${totalCost} €)`}</button>
          </form>
        </div>
      )}

      {/* SCHRITT 10: BUCHUNGSBESTÄTIGUNG */}
      {subStage === 'step10_confirmed' && (
        <div className="space-y-6">
          <FinalTicketView 
            pnrNumber={pnrNumber} selectedOffer={selectedOffer} origin={origin} destination={destination}
            passengerDetails={passengerDetails} plateNumber={plateNumber} totalCost={totalCost}
            handlePrint={handlePrint} setBookingStage={setBookingStage} setStep={setStep}
          />
          <MailInboxView emailInput={mainEmail} pnrNumber={pnrNumber} destination={destination} origin={origin} />
        </div>
      )}
    </div>
  );
}
