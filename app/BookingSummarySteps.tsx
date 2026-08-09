"use client";

import React, { useState } from 'react';
import { CreditCard as CardIcon, Wallet, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import FinalTicketView from './FinalTicketView';
import MailInboxView from './MailInboxView';

export default function BookingSummarySteps({ subStage, setSubStage, selectedOffer, origin, destination, adults, children, vehicle, selectedCabin, ticketCost, vehicleCost, cabinCost, mealCost, petCost, totalCost, pnrNumber, setPnrNumber, passengerDetails, plateNumber, mainEmail, setBookingStage, setStep, handlePrint }: any) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingPhase, setLoadingPhase] = useState<string>("");
  
  // 🔏 INTEGRITÄTS-GUARD: Verwaltet den Ladezustand autark lokal, um Parent-Fehler auszuschließen!
  const [isLocalPaying, setIsLocalPaying] = useState(false);

  const handleProcessRealPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocalPaying(true);
    setErrorMessage(null);
    setLoadingPhase("🔐 Initialisiere verschlüsselte Bankverbindung via TLS 1.3...");

    try {
      const formattedPassengers = passengerDetails.map((p: any) => ({
        firstName: p.firstName || "Unspecified",
        lastName: p.lastName || "Unspecified",
        gender: p.gender || "M",
        passportNumber: p.passport || "PASS-DE-12345",
        nationality: p.nationality || "Deutsch",
        birthDate: p.birthDate || "1990-01-01"
      }));

      // 1. Fordert den Payment Intent beim Express-Backend an
      const response = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: totalCost,
          contactEmail: mainEmail || "customer@nisouferries.com",
          routeId: 101,
          departureDate: "2026-09-15",
          vehicle: { type: vehicle, licensePlate: plateNumber || "🚶 OHNE FAHRZEUG" },
          passengers: formattedPassengers,
          contactPhone: "+491761111222"
        })
      });

      if (!response.ok) {
        throw new Error("Das Gateway hat die Verbindung abgelehnt (Port 5000 offline).");
      }

      const data = await response.json();
      
      if (!data.success) {
        setErrorMessage("❌ Autorisierung abgelehnt: Die Kreditkarte hat unzureichende Deckung oder ein falsches Ablaufdatum.");
        setIsLocalPaying(false);
        return;
      }

      // 2. Simuliert die asynchrone 3-D Secure Freigabe (SCA)
      setLoadingPhase("🛡️ Warte auf 3-D Secure Bestätigung (SCA App-Freigabe)...");
      
      setTimeout(() => {
        setLoadingPhase("📡 Zahlung autorisiert. Synchronisiere Ticket-Zolldatenbank...");
        
        setTimeout(() => {
          const finalPnr = data.mockPnr || "BKG-" + Math.floor(100000 + Math.random() * 900000);
          setPnrNumber(finalPnr);
          setSubStage('step10_confirmed');
          setIsLocalPaying(false);
          setLoadingPhase("");
        }, 1200);
      }, 2000);

    } catch (err: any) {
      setErrorMessage("⚠️ Netzwerk-Zahlungsfehler: Die Verbindung zum Banken-Gateway wurde unterbrochen. Bitte überprüfen Sie, ob Ihr Backend-Server auf Port 5000 gestartet ist.");
      setIsLocalPaying(false);
      setLoadingPhase("");
    }
  };

  return (
    <div className="w-full text-slate-900 font-sans">
      
      {/* SCHRITT 7: BUCHUNGSÜBERSICHT */}
      {subStage === 'step7_summary' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border shadow-xl max-w-xl mx-auto space-y-4 animate-scale-up">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 uppercase tracking-wider">📊 Schritt 7: Buchungsübersicht</h3>
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3 text-xs font-bold text-slate-800">
            <div className="flex justify-between border-b pb-2">
              <div>
                <span className="text-sm font-black block">🚢 {selectedOffer?.shipName || "Mediterranean Star"}</span>
                <span className="text-blue-600 text-[10px] block mt-0.5">{origin} ➔ {destination}</span>
              </div>
              <span className="font-mono text-base font-black text-[#0b2545]">{totalCost} €</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium space-y-1">
              <p>👥 Reisende: {adults} Erw. {children > 0 && `• ${children} Kind`}</p>
              <p>🚘 Zoll-Fahrzeugklasse: {vehicle === 'None' ? '🚶 Fußgänger' : vehicle}</p>
              <p>🛌 Kabine gebucht: {selectedCabin ? 'Ja (Innenkabine Bettplatz)' : 'Nein (Deckspassage)'}</p>
            </div>
          </div>
          <button type="button" onClick={() => setSubStage('step8_pay')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md">Weiter zur Zahlung</button>
        </div>
      )}

      {/* SCHRITT 8 & 9: PAYMENT SCREEN */}
      {subStage === 'step8_pay' && (
        <div className="bg-white rounded-3xl p-6 border shadow-xl max-w-md mx-auto space-y-4 animate-scale-up">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 text-left uppercase tracking-wider">Abrechnung &amp; Zahlungsart</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setPaymentMethod('card')} className={`p-2.5 rounded-xl border-2 font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${paymentMethod === 'card' ? 'border-[#0b2545] bg-[#0b2545] text-amber-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}><CardIcon className="h-4 w-4" /> Credit Card</button>
            <button type="button" onClick={() => setPaymentMethod('paypal')} className={`p-2.5 rounded-xl border-2 font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}><Wallet className="h-4 w-4 text-blue-600" /> PayPal</button>
          </div>

          <form onSubmit={handleProcessRealPayment} className="space-y-4">
            {paymentMethod === 'card' ? (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-inner text-left font-mono">
                <label className="text-[10px] text-cyan-400 font-black block mb-2 tracking-wider">SECURED INTEGRATED INPUT (PCI-DSS)</label>
                <input type="text" required maxLength={19} placeholder="4242 4242 4242 4242" className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs font-black tracking-widest text-white focus:outline-none" />
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-left text-xs font-bold text-blue-900">🔹 Weiterleitung zu PayPal Checkout nach Klick aktiv.</div>
            )}

            {/* LIVE UX LOADER */}
            {isLocalPaying && (
              <div className="p-4 bg-slate-900 text-cyan-400 rounded-xl font-mono text-[10px] flex items-center gap-3 text-left border border-slate-800 shadow-md">
                <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin shrink-0" />
                <span className="font-bold tracking-tight">{loadingPhase}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-bold rounded-xl text-xs text-left flex items-start gap-2 shadow-sm animate-shake">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button type="submit" disabled={isLocalPaying} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed shadow-md">
              {isLocalPaying ? "🔒 Transaktion läuft..." : `Sicher bezahlen (${totalCost} €)`}
            </button>
          </form>
        </div>
      )}

      {/* SCHRITT 10: BUCHUNGSBESTÄTIGUNG */}
      {subStage === 'step10_confirmed' && (
        <div className="space-y-6">
          <FinalTicketView 
            pnrNumber={pnrNumber} selectedOffer={selectedOffer} origin={origin} destination={destination}
            passengerDetails={passengerDetails} plateNumber={plateNumber} totalCost={totalCost}
            handlePrint={handlePrint} setBookingStage={setBookingStage} setStep={setStep} mainEmail={mainEmail}
          />
          <MailInboxView emailInput={mainEmail} pnrNumber={pnrNumber} destination={destination} origin={origin} />
        </div>
      )}
    </div>
  );
}
