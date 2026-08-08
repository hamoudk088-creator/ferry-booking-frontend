"use client";

import React, { useState } from 'react';
import HeaderView from './HeaderView';
import AnimatedMap from './AnimatedMap';
import SearchStep from './SearchStep';
import ResultsView from './ResultsView';
import LandingContent from './LandingContent';
import AiChatbot from './AiChatbot';
import { LOCALES } from './locales';
import { runAutomatedPipelineTest } from './automatedTests'; // <-- Test-Suite importiert!

export default function Home() {
  const [step, setStep] = useState(1);
  const [currentLang, setCurrentLang] = useState('DE');
  const [testLogs, setTestLogs] = useState<string[]>([]); // <-- Logs-Zustand definiert!
  
  // Zentrale Suchmasken-Zustände (Start- und Zielhäfen)
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

  // Mathematisch exakte Netto-Preiskalkulation vor Steuern für das Suchergebnis
  const getPrice = () => {
    let base = accommodation === 'Cabin' ? 120 : 90;
    if (vehicle === 'Van') base += 90;
    if (vehicle === 'Bus') base += 180;
    if (vehicle === 'None') base -= 40;
    return base;
  };

  const stepsConfig = [
    { number: 1, label: currentLang === 'AR' ? 'بحث' : currentLang === 'FR' ? 'Recherche' : '1. Suchen' },
    { number: 2, label: currentLang === 'AR' ? 'العبارات المتاحة' : currentLang === 'FR' ? 'Traversées' : '2. Tarife vergleichen' },
    { number: 3, label: currentLang === 'AR' ? 'البيانات والدفع' : currentLang === 'FR' ? 'Réservation' : '3. Buchung & Ticket' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f8f9] text-slate-900 antialiased font-sans relative">
      
      {/* HEADER & ANIMIERTE SEE-KARTE */}
      <div className="print-hidden">
        <HeaderView currentLang={currentLang} setCurrentLang={setCurrentLang} />
        <AnimatedMap currentLang={currentLang} />
        
        {/* PROGRESS-BAR */}
        <div className="w-full bg-[#0b2545] border-b border-sky-900/40 py-4 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-700/60 z-0"></div>
            {stepsConfig.map((s) => (
              <div key={s.number} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center transition-all duration-300 ${
                  step === s.number ? 'bg-amber-400 text-slate-950 scale-110' : step > s.number ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step > s.number ? "✓" : s.number}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider mt-1.5 ${step === s.number ? 'text-amber-400' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <section className="relative text-center py-10 px-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{t.heroTitle}</h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-2 max-w-xl mx-auto">{t.heroDesc}</p>
          </section>
        )}
      </div>

      {/* HAUPTCONTENT-CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 pb-12 relative z-20 mt-2">
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

        {step === 2 && (
          <ResultsView 
            origin={origin} 
            destination={destination} 
            getPrice={getPrice} 
            setStep={setStep} 
            currentLang={currentLang}
            vehicle={vehicle}
            adults={adults}
            children={children}
          />
        )}
      </main>

      {/* 🧪 AUTOMATISIERTE ENTERPRISE TEST-SUITE IM FOOTER BEREICH */}
      <div className="print-hidden max-w-5xl mx-auto px-6 pb-12 text-left font-sans text-xs">
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-black">🧪 NISOU PIPELINE AUTOMATED TEST CENTER</span>
            <button 
              type="button" 
              onClick={() => {
                setTestLogs([]);
                runAutomatedPipelineTest(setTestLogs);
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-black px-4 py-2 rounded-xl uppercase tracking-wider text-[10px] transition-all transform active:scale-95"
            >
              Test-Modul ausführen
            </button>
          </div>
          
          {testLogs.length > 0 ? (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 max-h-[180px] overflow-y-auto font-mono text-[11px] space-y-1 text-emerald-400">
              {testLogs.map((log, i) => (
                <p key={i} className={log.includes('❌') ? 'text-red-400' : log.includes('✅') ? 'text-cyan-400' : 'text-emerald-400'}>{log}</p>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 font-medium font-mono text-[10px]">// Bereit für automatisierten Integritätstest. Keine Protokolle vorhanden.</p>
          )}
        </div>
      </div>

      <div className="print-hidden">
        <AiChatbot currentLang={currentLang} />
      </div>

    </div>
  );
}
