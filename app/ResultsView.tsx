"use client";

import React, { useState } from 'react';
import { Ship, Clock, ArrowLeft, Star, ShieldCheck, Waves } from 'lucide-react';
import { LOCALES } from './locales';
import BookingProcess from './BookingProcess';

export default function ResultsView({ origin, destination, getPrice, setStep, currentLang, vehicle, adults, children }: any) {
  const t = LOCALES[currentLang] || LOCALES.DE;
  const calculatedPrice = getPrice();

  const [bookingStage, setBookingStage] = useState<'list' | 'process'>('list');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  // Reale, offizielle Reederei-Flotten mit Premium-Bildquellen aus dem Internet
  const offers = [
    { 
      id: 1, 
      company: "🔴 CORSICA LINEA", 
      time: "12:00 - 09:30", 
      duration: "21 Std. 30 Min", 
      shipName: "A Nepita / Jean Nicoli",
      imgUrl: "https://unsplash.com",
      rating: "4.8",
      features: currentLang === 'AR' ? ["واي فاي", "مسبح"] : ["Free WiFi", "Premium Pool", "Restaurant"]
    },
    { 
      id: 2, 
      company: "🟢 ALGÉRIE FERRIES", 
      time: "16:00 - 13:00", 
      duration: "21 Std. 00 Min", 
      shipName: "Badji Mokhtar III",
      imgUrl: "https://unsplash.com",
      rating: "4.9",
      features: currentLang === 'AR' ? ["مطعم فاخر", "غرف مكيفة"] : ["Luxury Dining", "Suites AC", "Halal Food"]
    },
    { 
      id: 3, 
      company: "🔵 CTN TUNISIA FERRIES", 
      time: "14:00 - 10:00", 
      duration: "20 Std. 00 Min", 
      shipName: "M/S Tanit / Carthage",
      imgUrl: "https://unsplash.com",
      rating: "4.7",
      features: currentLang === 'AR' ? ["منطقة أطفال", "صالة سينما"] : ["Cinema Lounge", "Kids Zone", "Cafe Bar"]
    }
  ];

  const handleSelectOffer = (offer: any) => {
    setSelectedOffer(offer);
    setBookingStage('process');
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* ERGEBNIS-HEADER */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.resultsTitle}</h2>
          <p className="text-xs text-slate-500 font-bold mt-1">
            {origin} <span className="text-blue-600 font-black">➔</span> {destination}
          </p>
        </div>
        <button 
          type="button" 
          onClick={() => { if (bookingStage === 'process') setBookingStage('list'); else setStep(1); }} 
          className="text-xs font-black bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t.backBtn}
        </button>
      </div>

      {/* TICKET-LISTE MIT ECHTEN SCHIFFSBILDERN */}
      {bookingStage === 'list' && (
        <div className="space-y-6">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white rounded-[28px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border-r-4 border-r-blue-600"
            >
              
              {/* LINKER BEREICH: DAS HOCHAUFLÖSENDE SCHIFFSBILD */}
              <div className="lg:col-span-4 h-48 lg:h-full min-h-[180px] relative bg-slate-100">
                <img 
                  src={offer.imgUrl} 
                  alt={offer.shipName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                
                {/* Schiffname & Sterne-Bewertung direkt auf dem Foto */}
                <div className="absolute bottom-3 left-4 text-white space-y-0.5">
                  <p className="text-xs font-black tracking-wide bg-[#0b2545]/80 px-2 py-0.5 rounded w-fit text-amber-400">🚢 {offer.shipName}</p>
                  <div className="flex items-center gap-1 text-[11px] font-black text-amber-300 mt-1">
                    <Star className="h-3 w-3 fill-amber-300" /> {offer.rating} • Live-Verbindung
                  </div>
                </div>
              </div>

              {/* MITTLERER BEREICH: FAHRPLAN & ROUTEN-TRAIL */}
              <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-900 tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                    {offer.company}
                  </span>
                  <div className="flex gap-1.5">
                    {offer.features.map((f, i) => (
                      <span key={i} className="text-[9px] bg-slate-50 border text-slate-500 px-2 py-0.5 rounded-md font-bold">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-xl font-black text-slate-900 block tracking-tight">{offer.time.split(' - ')[0]}</span>
                    <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">{origin.split(' ')[0]}</span>
                  </div>
                  
                  <div className="flex flex-col items-center flex-1 max-w-[140px]">
                    <span className="text-[10px] font-black text-blue-600 flex items-center gap-1 bg-blue-50/50 px-2 py-0.5 rounded-full">
                      <Clock className="h-3 w-3" /> {offer.duration}
                    </span>
                    <div className="w-full h-0.5 bg-slate-200 relative mt-2 flex items-center justify-center">
                      <Waves className="h-3 w-3 text-sky-400 bg-white px-0.5 absolute" />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 block tracking-tight">{offer.time.split(' - ')[1]}</span>
                    <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">{destination.split(' ')[0]} (+1)</span>
                  </div>
                </div>

                <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 p-2 rounded-xl flex items-center gap-1.5 w-fit">
                  <ShieldCheck className="h-3.5 w-3.5" /> Kabinen-Verfügbarkeit garantiert &amp; sofortige Bestätigung
                </div>
              </div>

              {/* RECHTER BEREICH: BORDKARTEN-PREISKACHEL */}
              <div className="lg:col-span-3 p-6 bg-slate-50/60 lg:border-l border-dashed border-slate-200 flex lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Endpreis (inkl. Deck)</span>
                  <span className="text-3xl font-black text-[#0b2545] tracking-tight">{calculatedPrice} €</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleSelectOffer(offer)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3 text-xs rounded-xl shadow-md transition-all uppercase tracking-wider transform active:scale-95"
                >
                  {t.selectBtn}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* PHASE 2: REISEPASS-AUSWAHL & AUTOMATISCHER FAMILIEN-MODUS */}
      {bookingStage === 'process' && (
        <BookingProcess 
          origin={origin} 
          destination={destination} 
          calculatedPrice={calculatedPrice} 
          selectedOffer={selectedOffer} 
          vehicle={vehicle} 
          setStep={setStep} 
          setBookingStage={setBookingStage} 
          adults={adults} 
          children={children} 
        />
      )}

    </div>
  );
}
