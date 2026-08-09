"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock, Waves, ShieldCheck, RefreshCw, Ship, Calendar } from 'lucide-react';
import { LOCALES } from './locales';
import BookingProcess from './BookingProcess';
import FilterBar from './FilterBar';
import { getRealFerriesFromServer } from './ferryApi';

function LiveTrustTicker() {
  const [secondsAgo, setSecondsAgo] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => { setSecondsAgo(prev => prev + 1); }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-2xl border border-[#e2e8f0] items-center text-left text-xs font-bold text-slate-500 animate-fade-in shadow-xs">
      <div className="flex items-center gap-2 text-[#1e293b]">
        <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-ping" />
        <span>12 Personen buchen aktuell diese Route</span>
      </div>
      <div className="flex items-center gap-1.5 sm:justify-end font-mono">
        <RefreshCw className="h-3.5 w-3.5 text-[#0d9488] animate-spin" />
        <span>Preisschutz aktiv: <span className="bg-[#f4f7f6] px-2 py-0.5 rounded border text-slate-700">vor {secondsAgo} Sek. aktualisiert</span></span>
      </div>
    </div>
  );
}

export default function ResultsView({ origin, destination, getPrice, setStep, currentLang, vehicle, adults, children }: any) {
  const t = LOCALES[currentLang] || LOCALES.DE;
  const basePrice = getPrice();

  const [bookingStage, setBookingStage] = useState<'list' | 'process'>('list');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const realFerries = await getRealFerriesFromServer(origin, destination, "2026-09-15", adults, children, vehicle);
      setOffers(realFerries || []);
    }
    loadData();
  }, [origin, destination, adults, children, vehicle]);

  const sortedOffers = [...offers].sort((a, b) => {
    if (sortBy === 'price') return (basePrice * a.priceFactor) - (basePrice * b.priceFactor);
    return (a.durationMin || 1200) - (b.durationMin || 1200);
  });

  return (
    <div className="space-y-6 text-left text-[#1e293b] font-sans animate-fade-in">
      
      <div className="flex justify-between items-center border-b pb-4 border-[#e2e8f0]">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1e293b] tracking-tight">{t.resultsTitle || "Verfügbare Verbindungen"}</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">{origin} <span className="text-[#0d9488] font-black">➔</span> {destination}</p>
        </div>
        <button type="button" onClick={() => { if (bookingStage === 'process') setBookingStage('list'); else setStep(1); }} className="text-xs font-black bg-white hover:bg-[#f4f7f6] text-[#1e293b] px-4 py-2.5 rounded-xl border border-[#e2e8f0] flex items-center gap-1.5 transition-all shadow-xs">
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück
        </button>
      </div>

      {bookingStage === 'list' && (
        <>
          <FilterBar sortBy={sortBy} setSortBy={setSortBy} basePrice={basePrice} />
          <div className="mt-4"><LiveTrustTicker /></div>

          <div className="space-y-4 mt-4">
            {sortedOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row md:items-stretch">
                
                {/* Links: Reederei-Logo (Slate Blue) */}
                <div className="md:w-1/4 bg-[#1e293b] p-6 flex flex-col justify-center items-center text-center relative text-white">
                  <div className="absolute top-3 left-4 flex items-center gap-0.5 text-[10px] font-black text-[#0d9488] font-mono">
                    <Star className="h-3 w-3 fill-[#0d9488]" /> {offer.rating}
                  </div>
                  <div className="bg-[#334155] p-3 rounded-xl w-full flex flex-col items-center gap-1 border border-[#475569]">
                    <Ship className="h-4 w-4 text-[#0d9488]" />
                    <span className="text-xs font-black tracking-tight">{offer.shipName}</span>
                  </div>
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest mt-2">{offer.company}</span>
                </div>

                {/* Mitte: Zeiten & Logistik */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#0d9488]" /> Direktverbindung</div>
                  </div>

                  <div className="flex items-center justify-between gap-6 font-mono">
                    <div className="text-left">
                      <span className="text-xl font-black text-[#1e293b]">18:00</span>
                      <span className="text-[9px] text-slate-400 block font-sans uppercase font-bold mt-0.5">{origin.substring(0,3)} Port</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 font-sans">
                      <span className="text-[10px] font-black text-[#0d9488] bg-[#f4f7f6] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {offer.duration}
                      </span>
                      <div className="w-full h-[1px] bg-[#e2e8f0] relative mt-2.5 flex items-center justify-center">
                        <Waves className="h-3 w-3 text-slate-300 bg-white px-0.5 absolute" />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#1e293b]">14:00</span>
                      <span className="text-[9px] text-slate-400 block font-sans uppercase font-bold mt-0.5">{destination.substring(0,3)} Port (+1)</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-bold text-[#0d9488] bg-[#f4f7f6] p-2 rounded-xl flex items-center gap-1.5 w-fit">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Inklusive sicherer Kabinen-Sperrung auf dem Server</span>
                  </div>
                </div>

                {/* Rechts: Preis & Action Button (Teal Blue) */}
                <div className="md:w-1/4 p-6 bg-[#f4f7f6] md:border-l border-dashed border-[#e2e8f0] flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[9px] font-black text-slate-400 block uppercase">Gesamtbetrag</span>
                    <span className="text-2xl font-black text-[#1e293b] font-mono">{Math.round(basePrice * offer.priceFactor)} €</span>
                  </div>
                  <button type="button" onClick={() => handleSelectOffer(offer)} className="bg-[#0d9488] hover:bg-[#0c8074] text-white font-black px-5 py-3 text-xs rounded-xl shadow-sm uppercase tracking-wider transition-all transform active:scale-95">
                    Auswählen
                  </button>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

      {bookingStage === 'process' && (
        <BookingProcess origin={origin} destination={destination} selectedOffer={selectedOffer} vehicle={vehicle} setStep={setStep} setBookingStage={setBookingStage} adults={adults} children={children} totalCost={selectedOffer?.finalPriceCalculated} />
      )}
    </div>
  );
}
