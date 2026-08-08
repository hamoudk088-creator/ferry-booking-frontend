"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, ShieldCheck, Clock, Waves } from 'lucide-react';
import { LOCALES } from './locales';
import BookingProcess from './BookingProcess';
import FilterBar from './FilterBar';
import { getRealFerriesFromServer } from './ferryApi';

export default function ResultsView({ origin, destination, getPrice, setStep, currentLang, vehicle, adults, children }: any) {
  const t = LOCALES[currentLang] || LOCALES.DE;
  const basePrice = getPrice();

  const [bookingStage, setBookingStage] = useState<'list' | 'process'>('list');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [currency, setCurrency] = useState<'EUR' | 'DZD' | 'TND'>('EUR');
  const [liveViewers, setLiveViewers] = useState(14);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const realFerries = await getRealFerriesFromServer(origin, destination);
      setOffers(realFerries || []);
    }
    loadData();
    
    // 🔏 HIER EXAKT KORRIGIERT: Nutzt nun die saubere prev-Zustands-Syntax!
    const interval = setInterval(() => {
      setLiveViewers((prev) => Math.floor(Math.random() * 6) + 12);
    }, 4000);
    return () => clearInterval(interval);
  }, [origin, destination]);

  const formatPrice = (factor: number) => {
    const finalEur = Math.round(basePrice * factor);
    if (currency === 'DZD') return `${Math.round(finalEur * 145).toLocaleString()} DZD`;
    if (currency === 'TND') return `${Math.round(finalEur * 3.4).toLocaleString()} TND`;
    return `${finalEur} €`;
  };

  const sortedOffers = [...offers].sort((a, b) => {
    if (sortBy === 'price') return (basePrice * a.priceFactor) - (basePrice * b.priceFactor);
    return (a.durationMin || 1200) - (b.durationMin || 1200);
  });

  const handleSelectOffer = (offer: any) => {
    setSelectedOffer({ ...offer, finalPriceCalculated: Math.round(basePrice * offer.priceFactor) });
    setBookingStage('process');
  };

  return (
    <div className="space-y-6 text-left text-slate-900 font-sans animate-fade-in">
      
      {/* HEADER BEREICH */}
      <div className="flex justify-between items-center border-b pb-4 border-slate-200">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{t.resultsTitle || "Verfügbare Fährverbindungen"}</h2>
          <p className="text-xs text-slate-500 font-bold mt-1">{origin} <span className="text-blue-600 font-black">➔</span> {destination}</p>
        </div>
        <button type="button" onClick={() => { if (bookingStage === 'process') setBookingStage('list'); else setStep(1); }} className="text-xs font-black bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm">
          <ArrowLeft className="h-3.5 w-3.5" /> {t.backBtn || "Zurück"}
        </button>
      </div>

      {bookingStage === 'list' && (
        <>
          {/* BINDET DIE FILTERBAR EIN */}
          <FilterBar sortBy={sortBy} setSortBy={setSortBy} liveViewers={liveViewers} currency={currency} setCurrency={setCurrency} basePrice={basePrice} />

          {/* DYNAMISCHE TICKET-SCHLEIFE */}
          <div className="space-y-4">
            {sortedOffers.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-dashed text-sm font-bold text-slate-400 animate-pulse">
                ⏳ Suche nach echten Live-Fahrplänen im Hafennetzwerk...
              </div>
            ) : (
              sortedOffers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border-r-4 border-r-blue-600">
                  
                  {/* SCHIFFNAME */}
                  <div className="lg:col-span-4 bg-slate-900 p-6 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-slate-800">
                    <span className="text-xs font-black tracking-wide bg-slate-950 text-amber-400 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
                      🚢 {offer.shipName}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-black text-amber-300 mt-2">
                      <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> {offer.rating} • Live
                    </div>
                  </div>

                  {/* TIMETABLE ROUTE TRAIL */}
                  <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-blue-900 tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg uppercase">{offer.company}</span>
                      <div className="flex gap-1.5">
                        {(offer.features || ["Comfort", "AC"]).map((f: any, i: number) => (
                          <span key={i} className="text-[9px] bg-slate-50 border text-slate-500 px-2 py-0.5 rounded-md font-bold">{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 font-mono">
                      <div className="text-left">
                        <span className="text-base font-black text-slate-900 block tracking-tight">{offer.time ? offer.time.split(' - ')[0] : "12:00"}</span>
                        <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">{origin.substring(0, 3)}</span>
                      </div>
                      <div className="flex flex-col items-center flex-1 max-w-[120px] font-sans">
                        <span className="text-[10px] font-black text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full"><Clock className="h-3 w-3" /> {offer.duration}</span>
                        <div className="w-full h-0.5 bg-slate-200 relative mt-2 flex items-center justify-center"><Waves className="h-3 w-3 text-sky-400 bg-white px-0.5 absolute" /></div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-slate-900 block tracking-tight">{offer.time ? offer.time.split(' - ')[1] : "09:00"}</span>
                        <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">{destination.substring(0, 3)} (+1)</span>
                      </div>
                    </div>

                    <div className={`text-[10px] font-bold p-2 rounded-xl flex items-center gap-1.5 w-fit border ${offer.seatsLeft <= 3 ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{offer.seatsLeft <= 3 ? `⏳ Nur noch ${offer.seatsLeft} Kabinen zu diesem Tarif!` : "✓ Freigabe: Kabinen-Verfügbarkeit garantiert"}</span>
                    </div>
                  </div>

                  {/* PREIS & INTERAKTIVER BUCHUNGSKNOPF */}
                  <div className="lg:col-span-3 p-6 bg-slate-50/60 lg:border-l border-dashed border-slate-200 flex lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-3">
                    <div className="text-left lg:text-right">
                      <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Gesamtpreis</span>
                      <span className="text-2xl font-black text-[#0b2545] font-mono tracking-tight">{formatPrice(offer.priceFactor)}</span>
                    </div>
                    <button type="button" onClick={() => handleSelectOffer(offer)} className="bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-3 text-xs rounded-xl shadow-md uppercase tracking-wider transition-all transform active:scale-95" >
                      {t.selectBtn || "Ticket buchen"}
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </>
      )}

      {bookingStage === 'process' && (
        <BookingProcess origin={origin} destination={destination} calculatedPrice={basePrice * (selectedOffer?.priceFactor || 1)} selectedOffer={selectedOffer} vehicle={vehicle} setStep={setStep} setBookingStage={setBookingStage} adults={adults} children={children} />
      )}
    </div>
  );
}
