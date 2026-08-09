"use client";

import React, { useState } from 'react';
import HeaderView from './HeaderView';
import AnimatedMap from './AnimatedMap';
import SearchStep from './SearchStep';
import ResultsView from './ResultsView';
import LandingContent from './LandingContent';
import AiChatbot from './AiChatbot';
import BookingProcess from './BookingProcess';
import { LOCALES } from './locales';

export default function Home() {
  // 🔏 AKTIVIERUNG DER KONSISTENTEN 10-SCHRITTE-PIPELINE
  const [step, setStep] = useState<number>(1);
  const [currentLang, setCurrentLang] = useState('DE');
  
  // Suchmasken-Zustände (Schritt 1)
  const [origin, setOrigin] = useState('Marseille 🇫🇷');
  const [destination, setDestination] = useState('Algiers (Algier) 🇩🇿');
  const [depDate, setDepDate] = useState('2026-09-15');
  const [retDate, setRetDate] = useState('');
  const [isRound, setIsRound] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [vehicle, setVehicle] = useState('Car');
  const [hasPet, setHasPet] = useState(false);

  // Zustand für die ausgewählte Fähre (Schritt 2 & 3)
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const t = LOCALES[currentLang] || LOCALES.DE;

  // Serverseitig gespiegelter Preis-Faktor (Basis-Kalkulation)
  const getBasePrice = () => {
    let base = 90; // Standard Deckspassage pro Person
    if (vehicle === 'Van') base += 50;
    if (vehicle === 'None') base -= 30;
    return base;
  };

  // Die 10-Schritte Konfigurations-Leiste (Scannbar & Trilingual)
  const stepsLabels = [
    "1. Suche", "2. Fähren", "3. Auswahl", "4. Reisende", 
    "5. Extras", "6. Passdaten", "7. Prüfung", "8. Zahlung", 
    "9. Bestätigen", "10. Ticket"
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-[#1e293b] antialiased font-sans relative">
      <HeaderView currentLang={currentLang} setCurrentLang={setCurrentLang} />
      
      {step <= 3 && <AnimatedMap currentLang={currentLang} />}
      
      {/* 📊 ENTERPRISE PROGRESS BAR (ALLE 10 SCHRITTE VISUELL VERKNÜPFT) */}
      <div className="w-full bg-[#1e293b] border-b border-[#334155] py-3.5 px-4 shadow-md sticky top-[64px] z-40 print-hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-1 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#334155] z-0"></div>
          {stepsLabels.map((label, index) => {
            const currentStepNum = index + 1;
            const isActive = step === currentStepNum;
            const isPassed = step > currentStepNum;
            return (
              <div key={currentStepNum} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-6 h-6 rounded-full font-black text-[10px] flex items-center justify-center border transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#0d9488] text-white border-[#0d9488] scale-110 shadow-sm' 
                    : isPassed ? 'bg-[#0d9488]/30 text-[#0d9488] border-[#0d9488]/40' : 'bg-[#0f172a] text-slate-500 border-slate-800'
                }`}>
                  {isPassed ? "✓" : currentStepNum}
                </div>
                <span className={`text-[8px] font-bold tracking-tight mt-1 hidden md:block whitespace-nowrap ${isActive ? 'text-[#0d9488]' : 'text-slate-500'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* HAUPTCONTENT-STEUERUNG */}
      <main className="max-w-5xl mx-auto px-6 pb-12 mt-6">
        
        {/* SCHRITT 1: REISE SUCHEN */}
        {step === 1 && (
          <>
            <SearchStep 
              vehicle={vehicle} setVehicle={setVehicle} accommodation="Deck" setAccommodation={() => {}}
              adults={adults} setAdults={setAdults} children={children} setChildren={setChildren}
              depDate={depDate} setDepDate={setDepDate} retDate={retDate} setRetDate={setRetDate}
              isRound={isRound} setIsRound={setIsRound} origin={origin} setOrigin={setOrigin}
              destination={destination} setDestination={setDestination} 
              onSearch={() => setStep(2)} currentLang={currentLang}
            />
            <LandingContent currentLang={currentLang} />
          </>
        )}

        {/* SCHRITT 2 & 3: FÄHRVERBINDUNGEN LADEN & VERBINDUNG AUSWÄHLEN */}
        {step === 2 && (
          <ResultsView 
            origin={origin} destination={destination} getPrice={getBasePrice} 
            setStep={setStep} currentLang={currentLang} vehicle={vehicle} 
            adults={adults} children={children}
            onSelectOffer={(offer: any) => {
              setSelectedOffer(offer);
              setStep(4); // Springt direkt in die Reisenden-Erfassung (Schritt 4)
            }}
          />
        )}

        {/* SCHRITTE 4 BIS 10: DER LÜCKENLOSE BUCHUNGSPROCESS */}
        {step >= 4 && (
          <BookingProcess 
            step={step}
            setStep={setStep}
            origin={origin}
            destination={destination}
            selectedOffer={selectedOffer}
            vehicle={vehicle}
            adults={adults}
            children={children}
            hasPetInitial={hasPet}
            currentLang={currentLang}
          />
        )}

      </main>

      <div className="print-hidden">
        <AiChatbot currentLang={currentLang} />
      </div>
    </div>
  );
}
