"use client";

import React, { useState, useEffect } from 'react';
import BookingFormDetails from './BookingFormDetails';
import BookingPaymentDetails from './BookingPaymentDetails'; // <-- Hier importiert!

export default function BookingProcess({ step, setStep, origin, destination, selectedOffer, vehicle, adults, children, hasPetInitial }: any) {
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const [mainEmail, setMainEmail] = useState('');
  const [mainPhone, setMainPhone] = useState('');
  const [plateNumber, setPlateNumber] = useState('');

  const [cabinType, setCabinType] = useState<'None' | 'Seat' | 'Inside' | 'Outside'>('Inside');
  const [hasMeals, setHasMeals] = useState(false);
  const [hasPet, setHasPet] = useState(hasPetInitial);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isPaying, setIsPaying] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("");
  const [pnrNumber, setPnrNumber] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const calculateTotal = () => {
    let total = (Number(adults) * 90) + (Number(children) * 45);
    if (vehicle !== 'None') total += 90;
    if (cabinType === 'Inside') total += 120;
    if (cabinType === 'Outside') total += 180;
    if (hasMeals) total += 30 * (Number(adults) + Number(children));
    if (hasPet) total += 25;
    return total + 35; // +35€ Steuern
  };

  useEffect(() => {
    const list = [];
    for (let i = 0; i < (Number(adults) || 1); i++) {
      list.push({ id: `a-${i}`, type: "Erwachsener", firstName: "", lastName: "", birthDate: "", nationality: "Deutsch", passport: "" });
    }
    for (let i = 0; i < (Number(children) || 0); i++) {
      list.push({ id: `c-${i}`, type: "Kind", firstName: "", lastName: "", birthDate: "", nationality: "Deutsch", passport: "" });
    }
    setPassengerDetails(list);
  }, [adults, children]);

  const updatePassenger = (id: string, field: string, value: string) => {
    setPassengerDetails(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleProcessPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setValidationError(null);
    setLoadingPhase("🔐 Initialisiere sichere Verbindung via TLS 1.3...");
    try {
      const res = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: calculateTotal(),
          contactEmail: mainEmail || "customer@nisouferries.com",
          routeId: 101,
          departureDate: "2026-09-15",
          vehicle: { type: vehicle, licensePlate: plateNumber || "PIETON" },
          passengers: passengerDetails.map(p => ({ firstName: p.firstName, lastName: p.lastName, gender: "M", passportNumber: p.passport, nationality: p.nationality, birthDate: p.birthDate })),
          contactPhone: mainPhone
        })
      });
      const data = await res.json();
      setLoadingPhase("🛡️ Warte auf 3-D Secure Bestätigung (SCA)...");
      setTimeout(() => {
        setLoadingPhase("📡 Zahlung erfolgreich autorisiert. Erzeuge Ticket...");
        setTimeout(() => {
          setPnrNumber(data.mockPnr || "BKG-492104");
          setStep(10);
          setIsPaying(false);
        }, 1200);
      }, 2000);
    } catch (err) {
      setValidationError("⚠️ Verbindung zum Banken-Gateway unterbrochen.");
      setIsPaying(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 md:p-8 text-left animate-scale-up">
      
      {/* SCHRITT 4: REISENDE & FAHRZEUG */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">📋 Schritt 4: Reisende &amp; Fahrzeugdaten</h3>
          <div className="p-4 bg-[#f4f7f6] rounded-xl border border-[#e2e8f0] text-xs font-bold space-y-2">
            <p>👥 Passagiere: <span className="text-[#0d9488]">{adults} Erwachsene</span> {children > 0 && `• ${children} Kinder`}</p>
            <p>🚘 Fahrzeugklasse: <span className="text-[#0d9488] uppercase">{vehicle === 'None' ? 'Fußgänger' : vehicle}</span></p>
          </div>
          <button type="button" onClick={() => setStep(5)} className="w-full bg-[#0d9488] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zu Extras ➔</button>
        </div>
      )}

      {/* SCHRITT 5: KABINE & EXTRAS */}
      {step === 5 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">🛌 Schritt 5: Kabine &amp; Verpflegung</h3>
          <div className="space-y-3 text-xs font-bold">
            <select value={cabinType} onChange={(e: any) => setCabinType(e.target.value)} className="w-full bg-[#f4f7f6] border border-[#e2e8f0] p-3 rounded-xl focus:outline-none text-slate-800">
              <option value="None">Standard Deckspassage [+0 €]</option>
              <option value="Inside">Verschlossene Innenkabine [+120 €]</option>
              <option value="Outside">Luxuriöse Außenkabine mit Meerblick [+180 €]</option>
            </select>
            <button type="button" onClick={() => setHasMeals(!hasMeals)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center border-[#e2e8f0] ${hasMeals ? 'border-[#0d9488] bg-[#f4f7f6]' : ''}`}>
              <span>🍽️ Vollpension an Bord</span><span className="text-[#0d9488]">+30€ / Pers</span>
            </button>
          </div>
          <button type="button" onClick={() => setStep(6)} className="w-full bg-[#0d9488] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zur Passagiereingabe ➔</button>
        </div>
      )}

      {/* SCHRITT 6 & 7: FORMULAR DETAILS */}
      {(step === 6 || step === 7) && (
        <BookingFormDetails 
          step={step} setStep={setStep} passengerDetails={passengerDetails} updatePassenger={updatePassenger}
          adults={adults} children={children} vehicle={vehicle} mainEmail={mainEmail} setMainEmail={setMainEmail}
          mainPhone={mainPhone} setMainPhone={setMainPhone} plateNumber={plateNumber} setPlateNumber={setPlateNumber}
          cabinType={cabinType} hasMeals={hasMeals} calculateTotal={calculateTotal}
        />
      )}

      {/* SCHRITT 8, 9 & 10: AUSGELAGERTES ZAHLUNGS- UND TICKETMODUL */}
      {(step === 8 || step === 10) && (
        <BookingPaymentDetails 
          step={step} setStep={setStep} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
          handleProcessPaymentSubmit={handleProcessPaymentSubmit} isPaying={isPaying} loadingPhase={loadingPhase}
          validationError={validationError} calculateTotal={calculateTotal} pnrNumber={pnrNumber}
          selectedOffer={selectedOffer} origin={origin} destination={destination}
        />
      )}

    </div>
  );
}
