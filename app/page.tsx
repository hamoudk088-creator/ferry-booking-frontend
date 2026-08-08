"use client";

import React, { useState } from 'react';
import HeaderView from './HeaderView';
import AnimatedMap from './AnimatedMap';
import SearchStep from './SearchStep';
import ResultsView from './ResultsView'; // <-- Hier importiert!
import LandingContent from './LandingContent';
import AiChatbot from './AiChatbot';
import { LOCALES } from './locales';

export default function Home() {
  const [step, setStep] = useState(1);
  const [currentLang, setCurrentLang] = useState('DE');
  
  const [origin, setOrigin] = useState('Marseille 🇫🇷');
  const [destination, setDestination] = useState('Algiers (Algier) 🇩🇿');
  const [depDate, setDepDate] = useState('2026-09-15');
  const [retDate, setRetDate] = useState('');
  const [isRound, setIsRound] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [vehicle, setVehicle] = useState('Car');
  const [accommodation, setAccommodation] = useState('Cabin');

  const t = LOCALES[currentLang] || LOCALES.DE;

  const getPrice = () => {
    let base = accommodation === 'Luxury' ? 450 : accommodation === 'Family' ? 350 : accommodation === 'Standard' ? 260 : 180;
    if (vehicle === 'Van') base += 90;
    if (vehicle === 'Bus') base += 180;
    if (vehicle === 'None') base -= 60;
    return (base * adults) + (children * 40) + 15;
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] text-slate-900 antialiased font-sans relative">
      <HeaderView currentLang={currentLang} setCurrentLang={setCurrentLang} />
      <AnimatedMap currentLang={currentLang} />

      <section className="relative text-center py-12 px-4">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{t.heroTitle}</h1>
        <p className="text-slate-500 font-medium text-xs md:text-sm mt-2 max-w-xl mx-auto">{t.heroDesc}</p>
      </section>

      <main className="max-w-5xl mx-auto px-6 pb-24 relative z-20">
        {step === 1 && (
          <>
            <SearchStep 
              vehicle={vehicle} setVehicle={setVehicle} accommodation={accommodation} setAccommodation={setAccommodation}
              adults={adults} setAdults={setAdults} children={children} setChildren={setChildren}
              depDate={depDate} setDepDate={setDepDate} retDate={retDate} setRetDate={setRetDate}
              isRound={isRound} setIsRound={setIsRound} origin={origin} setOrigin={setOrigin}
              destination={destination} setDestination={setDestination} onSearch={() => setStep(2)}
              currentLang={currentLang}
            />
            <LandingContent currentLang={currentLang} />
          </>
        )}

        {/* SCHRITT 2: DIE FUNKTIONIERENDE TICKETLISTE NACH DEM DRÜCKEN */}
        {step === 2 && (
          <ResultsView 
            origin={origin} 
            destination={destination} 
            getPrice={getPrice} 
            setStep={setStep} 
            currentLang={currentLang} 
          />
        )}

        {/* SCHRITT 3: BUCHUNGS-BESTÄTIGUNG */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 max-w-md mx-auto text-center space-y-6">
            <h2 className="text-3xl font-black text-slate-900">System Live!</h2>
            <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs font-bold text-slate-700 space-y-2 border">
              <div className="flex justify-between"><span>Route:</span><span>{origin} ➔ {destination}</span></div>
              <div className="flex justify-between border-t pt-2 text-blue-600 text-sm"><span>Preis:</span><span>{getPrice()} €</span></div>
            </div>
            <button type="button" onClick={() => setStep(1)} className="w-full bg-blue-600 text-white font-bold py-3 text-sm rounded-xl shadow-md">Neue Suche</button>
          </div>
        )}
      </main>
      <AiChatbot currentLang={currentLang} />
    </div>
  );
}
