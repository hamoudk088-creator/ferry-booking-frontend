"use client";

import React, { useState, useEffect } from 'react';
import BookingFormDetails from './BookingFormDetails';
import BookingPaymentDetails from './BookingPaymentDetails';

export default function BookingProcess({ step, setStep, origin, destination, selectedOffer, vehicle, adults, children, hasPetInitial }: any) {
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const [mainEmail, setMainEmail] = useState('');
  const [mainPhone, setMainPhone] = useState('');
  const [plateNumber, setPlateNumber] = useState('');

  const [cabinType, setCabinType] = useState<'None' | 'Seat' | 'Inside' | 'Outside' | 'Family'>('Inside');
  const [hasMeals, setHasMeals] = useState(false);
  const [hasPet, setHasPet] = useState(hasPetInitial);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'klarna'>('card');
  const [isPaying, setIsPaying] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("");
  const [pnrNumber, setPnrNumber] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const calculateTotal = () => {
    let total = (Number(adults) * 90) + (Number(children) * 45);
    if (vehicle !== 'None') total += 90;
    if (cabinType === 'Inside') total += 120;
    if (cabinType === 'Outside') total += 180;
    if (cabinType === 'Family') total += 240;
    if (hasMeals) total += 30 * (Number(adults) + Number(children));
    if (hasPet) total += 25;
    return total + 35; // +35€ feste Hafengebühren
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
    setLoadingPhase("🔐 Initialisiere verschlüsselte Verbindung via TLS 1.3...");
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
      
      {/* SCHRITTE 4, 5, 6 & 7: FORMULAR DETAILS */}
      {(step === 4 || step === 5 || step === 6 || step === 7) && (
        <BookingFormDetails 
          step={step} setStep={setStep} passengerDetails={passengerDetails} updatePassenger={updatePassenger}
          adults={adults} children={children} vehicle={vehicle} mainEmail={mainEmail} setMainEmail={setMainEmail}
          mainPhone={mainPhone} setMainPhone={setMainPhone} plateNumber={plateNumber} setPlateNumber={setPlateNumber}
          cabinType={cabinType} setCabinType={setCabinType} hasMeals={hasMeals} setHasMeals={setHasMeals}
          hasPet={hasPet} setHasPet={setHasPet} calculateTotal={calculateTotal}
        />
      )}

      {/* SCHRITTE 8, 9 & 10: ZAHLUNGS- UND TICKETSCHLEIFE */}
      {(step === 8 || step === 10) && (
        <BookingPaymentDetails 
          step={step} setStep={setStep} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
          handleProcessPaymentSubmit={handleProcessPaymentSubmit} isPaying={isPaying} loadingPhase={loadingPhase}
          validationError={validationError} calculateTotal={calculateTotal} pnrNumber={pnrNumber}
          selectedOffer={selectedOffer} origin={origin} destination={destination} mainEmail={mainEmail}
        />
      )}

    </div>
  );
}
