"use client";

import React, { useState } from 'react';
import HeaderView from './HeaderView';
import AnimatedMap from './AnimatedMap';
import SearchStep from './SearchStep';
import ResultsView from './ResultsView';
import LandingContent from './LandingContent';
import AiChatbot from './AiChatbot';
import { LOCALES } from './locales';
import { runAutomatedPipelineTest } from './automatedTests';

export default function Home() {
  const [step, setStep] = useState(1);
  const [currentLang, setCurrentLang] = useState('DE');
  const [testLogs, setTestLogs] = useState<string[]>([]);
  
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
    let base = accommodation === 'Cabin' ? 120 : 90;
    if (vehicle === 'Van') base += 90;
    if (vehicle === 'None') base -= 40;
    return base;
  };

  const stepsConfig = [
    { number: 1, label: currentLang === 'AR' ? 'بحث' : '1. Suchen' },
    { number: 2, label: currentLang === 'AR' ? 'العبارات' : '2. Vergleichen' },
    { number: 3, label: currentLang === 'AR' ? 'الدفع' : '3. Ticket' }
  ];

  return (
    // 🎨 NEUER HINTERGRUND: Sanftes, mattes Off-White
    <div className="min-h-screen bg-[#f8fafd] text-slate-800 antialiased font-sans relative">
      <HeaderView currentLang={currentLang} setCurrentLang={setCurrentLang} />
      <AnimatedMap currentLang={currentLang} />
      
      {/* 🎨 PROGRESS-BAR: Edles Deep Marine (#0f2c59) */}
      <div className="w-full bg-[#0f2c59] border-b border-[#1d3d6f] py-4 px-6 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-600/40 z-0"></div>
          {stepsConfig.map((s) => (
            <div key={s.number} className="flex flex-col items-center relative z-10 flex-1">
              {/* 🎨 STATUS-KREISE: Champagner-Gold (#dac0a3) für den aktiven Schritt */}
              <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all duration-300 ${
                step === s.number 
                  ? 'bg-[#dac0a3] text-[#0f2c59] border-[#dac0a3] scale-110 shadow-lg' 
                  : 'bg-[#143666] text-slate-400 border-slate-700'
              }`}>
                {s.number}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest mt-1.5 ${step === s.number ? 'text-[#dac0a3]' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-12 mt-6">
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
          <ResultsView origin={origin} destination={destination} getPrice={getPrice} setStep={setStep} currentLang={currentLang} vehicle={vehicle} adults={adults} children={children} />
        )}
      </main>

      {/* 🧪 TEST CENTER: Unauffälliges, professionelles Anthrazit-Design */}
      <div className="max-w-5xl mx-auto px-6 pb-12 text-left font-sans text-xs">
        <div className="bg-[#121824] text-slate-100 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <span className="font-mono text-[10px] text-slate-400 font-black tracking-widest">🧪 PIPELINE SUITE INTERN</span>
            <button type="button" onClick={() => runAutomatedPipelineTest(setTestLogs)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-black px-4 py-2 rounded-xl text-[10px] uppercase border border-slate-700 transition-all">Test ausführen</button>
          </div>
          <div className="bg-[#090d16] p-4 rounded-xl text-emerald-400 font-mono text-[11px] max-h-[120px] overflow-y-auto border border-slate-900">
            {testLogs.map((log, i) => <p key={i}>{log}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}
