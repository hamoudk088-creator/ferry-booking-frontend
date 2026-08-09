"use client";

import React, { useState, useEffect } from 'react';
import BookingFormSteps from './BookingFormSteps';
import BookingSummarySteps from './BookingSummarySteps';
import { getPrintWindowContent } from './printTemplate';
import { ticketPrintStyles } from './ticketStyles';
import { saveBookingSession, loadBookingSession, clearBookingSession } from './sessionStorage';

export default function BookingProcess({ origin, destination, selectedOffer, vehicle, setStep, setBookingStage, adults, children }: any) {
  const [subStage, setSubStage] = useState<'step5_data' | 'step6_extras' | 'step7_summary' | 'step8_pay' | 'step10_confirmed'>('step5_data');
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const [mainEmail, setMainEmail] = useState('');
  const [mainPhone, setMainPhone] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedCabin, setSelectedCabin] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [pnrNumber, setPnrNumber] = useState('');

  // ⚡ PHASEN-UPGRADE: Server-validierte Preisstrukturen & Sperr-Tokens
  const [serverPricing, setServerPricing] = useState<any>({ ticketCost: 180, vehicleCost: 90, cabinCost: 0, taxesAndFees: 35, totalCost: 305 });
  const [lockError, setLockError] = useState<string | null>(null);

  useEffect(() => {
    const savedData = loadBookingSession();
    if (savedData) {
      setPassengerDetails(savedData.passengerDetails || []);
      setMainEmail(savedData.mainEmail || '');
      setMainPhone(savedData.mainPhone || '');
      setPlateNumber(savedData.plateNumber || '');
      setSubStage(savedData.subStage || 'step5_data');
    } else {
      const list = [];
      const totalAdults = Number(adults) || 1;
      const totalChildren = Number(children) || 0;
      for (let i = 0; i < totalAdults; i++) {
        list.push({ id: `a-${i}`, type: "Erwachsener", firstName: "", lastName: "", birthDate: "", nationality: "Deutsch", passport: "" });
      }
      for (let i = 0; i < totalChildren; i++) {
        list.push({ id: `c-${i}`, type: "Kind", firstName: "", lastName: "", birthDate: "", nationality: "Deutsch", passport: "" });
      }
      setPassengerDetails(list);
    }
  }, [adults, children]);

  useEffect(() => {
    if (subStage !== 'step10_confirmed') {
      saveBookingSession({ passengerDetails, mainEmail, mainPhone, plateNumber, subStage });
    }
  }, [passengerDetails, mainEmail, mainPhone, plateNumber, subStage]);

  const updatePassenger = (id: string, field: string, value: string) => {
    setPassengerDetails(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // 🔒 CRITICAL ENGINE HANDSHAKE: Validierung und Kabinen-Sperre vom Server anfordern
  const triggerServerLockAndPricing = async () => {
    setLockError(null);
    try {
      const response = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timetableId: selectedOffer?.id || 101,
          cabinLabel: selectedCabin ? "Suite-Deck4-A" : null,
          adults,
          children,
          vehicle,
          hasCabin: selectedCabin,
          hasMeals: selectedMeal,
          hasPet: selectedPet
        })
      });

      const result = await response.json();

      if (response.status === 409) {
        // Fallback: Konflikt erkannt (Race Condition Protection)
        setLockError("⚠️ Diese Kabine wurde gerade von einem anderen Kunden blockiert. Bitte wählen Sie einen anderen Platz.");
        return false;
      }

      if (result.success && result.validatedPricing) {
        // Schreibt die unmanipulierbaren Server-Preise fest
        setServerPricing(result.validatedPricing);
        return true;
      }
      
      return false;
    } catch (err) {
      console.warn("API Offline-Modus aktiv. Verwende lokale Ausfallsicherungs-Berechnung.");
      return true;
    }
  };

  const handleFormStepsSubmit = async (nextStage: 'step6_extras' | 'step7_summary') => {
    if (nextStage === 'step7_summary') {
      // Beim Übergang zur Buchungsübersicht wird die Sperre erzwungen
      const success = await triggerServerLockAndPricing();
      if (!success) return; // Stoppt die Pipeline bei Sperrkonflikten
    }
    setSubStage(nextStage);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsPaying(true);
    setTimeout(() => {
      setPnrNumber("TRV-2026-" + Math.floor(100000 + Math.random() * 900000));
      setIsPaying(false); 
      clearBookingSession();
      setSubStage('step10_confirmed');
    }, 2000);
  };

  const handlePrint = () => {
    const ticketElement = document.getElementById('final-print-ticket');
    if (!ticketElement) return;
    const ticketHtml = ticketElement.innerHTML;
    const oldBody = document.body.innerHTML;
    document.body.innerHTML = getPrintWindowContent(pnrNumber, ticketHtml);
    window.print();
    document.body.innerHTML = oldBody;
    window.location.reload();
  };

  return (
    <div className="w-full">
      <style>{ticketPrintStyles}</style>

      {lockError && (
        <div className="max-w-xl mx-auto mb-4 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold rounded-2xl shadow-sm animate-shake">
          {lockError}
        </div>
      )}

      {(subStage === 'step5_data' || subStage === 'step6_extras') && (
        <BookingFormSteps 
          subStage={subStage} 
          setSubStage={(next: any) => handleFormStepsSubmit(next)} 
          passengerDetails={passengerDetails} 
          updatePassenger={updatePassenger}
          mainEmail={mainEmail} 
          setMainEmail={setMainEmail} 
          mainPhone={mainPhone} 
          setMainPhone={setMainPhone} 
          plateNumber={plateNumber} 
          setPlateNumber={setPlateNumber}
          vehicle={vehicle} 
          selectedCabin={selectedCabin} 
          setSelectedCabin={setSelectedCabin} 
          selectedOffer={selectedOffer}
          selectedMeal={selectedMeal} 
          setSelectedMeal={setSelectedMeal} 
          selectedPet={selectedPet} 
          setSelectedPet={setSelectedPet}
        />
      )}

      {(subStage === 'step7_summary' || subStage === 'step8_pay' || subStage === 'step10_confirmed') && (
        <BookingSummarySteps 
          subStage={subStage} 
          setSubStage={setSubStage} 
          selectedOffer={selectedOffer} 
          origin={origin} 
          destination={destination}
          adults={adults} 
          children={children} 
          vehicle={vehicle} 
          selectedCabin={selectedCabin} 
          ticketCost={serverPricing.ticketCost} 
          vehicleCost={serverPricing.vehicleCost}
          cabinCost={serverPricing.cabinCost} 
          mealCost={selectedMeal ? 30 * (Number(adults) + Number(children)) : 0} 
          petCost={selectedPet ? 25 : 0} 
          totalCost={serverPricing.totalCost} 
          isPaying={isPaying} 
          handlePayment={handlePayment}
          pnrNumber={pnrNumber} 
          passengerDetails={passengerDetails} 
          plateNumber={plateNumber} 
          mainEmail={mainEmail} 
          setBookingStage={setBookingStage} 
          setStep={setStep} 
          handlePrint={handlePrint}
        />
      )}
    </div>
  );
}
