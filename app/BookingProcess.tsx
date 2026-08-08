"use client";

import React, { useState, useEffect } from 'react';
import BookingFormSteps from './BookingFormSteps';
import BookingSummarySteps from './BookingSummarySteps';
import { getPrintWindowContent } from './printTemplate';
import { ticketPrintStyles } from './ticketStyles';
import { calculateDynamicFerryPrice } from './priceEngine';
import { saveBookingSession, loadBookingSession, clearBookingSession } from './sessionStorage'; // <-- Hier importiert!

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

  // ⚡ LÄDT DIE SITZUNG AUTOMATISCH BEIM STARTFALLBACK BACK
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
      for (let i = 0; i < totalAdults; i++) list.push({ id: `a-${i}`, type: "Erwachsener", firstName: "", lastName: "", birthDate: "", nationality: "Deutsch", passport: "" });
      for (let i = 0; i < totalChildren; i++) list.push({ id: `c-${i}`, type: "Kind", firstName: "", lastName: "", birthDate: "", nationality: "Deutsch", passport: "" });
      setPassengerDetails(list);
    }
  }, [adults, children]);

  // ⚡ SICHERT JEDE ÄNDERUNG SOFORT IM HINTERGRUND-SPEICHER
  useEffect(() => {
    if (subStage !== 'step10_confirmed') {
      saveBookingSession({ passengerDetails, mainEmail, mainPhone, plateNumber, subStage });
    }
  }, [passengerDetails, mainEmail, mainPhone, plateNumber, subStage]);

  const updatePassenger = (id: string, field: string, value: string) => {
    setPassengerDetails(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const priceCalculation = calculateDynamicFerryPrice(
    adults, children, vehicle, selectedOffer, selectedCabin, selectedMeal, selectedPet
  );

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault(); setIsPaying(true);
    setTimeout(() => {
      setPnrNumber("TRV-2026-" + Math.floor(100000 + Math.random() * 900000));
      setIsPaying(false); 
      clearBookingSession(); // Löscht die temporäre Session nach Erfolg
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

      {(subStage === 'step5_data' || subStage === 'step6_extras') && (
        <BookingFormSteps 
          subStage={subStage} setSubStage={setSubStage} passengerDetails={passengerDetails} updatePassenger={updatePassenger}
          mainEmail={mainEmail} setMainEmail={setMainEmail} mainPhone={mainPhone} setMainPhone={setMainPhone} plateNumber={plateNumber} setPlateNumber={setPlateNumber}
          vehicle={vehicle} selectedCabin={selectedCabin} setSelectedCabin={setSelectedCabin} selectedOffer={selectedOffer}
          selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} selectedPet={selectedPet} setSelectedPet={setSelectedPet}
        />
      )}

      {(subStage === 'step7_summary' || subStage === 'step8_pay' || subStage === 'step10_confirmed') && (
        <BookingSummarySteps 
          subStage={subStage} setSubStage={setSubStage} selectedOffer={selectedOffer} origin={origin} destination={destination}
          adults={adults} children={children} vehicle={vehicle} selectedCabin={selectedCabin} 
          ticketCost={priceCalculation.ticketCost} 
          vehicleCost={priceCalculation.vehicleCost}
          cabinCost={priceCalculation.cabinCost} 
          mealCost={priceCalculation.mealCost} 
          petCost={priceCalculation.petCost} 
          totalCost={priceCalculation.totalCost} 
          isPaying={isPaying} handlePayment={handlePayment}
          pnrNumber={pnrNumber} passengerDetails={passengerDetails} plateNumber={plateNumber} mainEmail={mainEmail} setBookingStage={setBookingStage} setStep={setStep} handlePrint={handlePrint}
        />
      )}
    </div>
  );
}
