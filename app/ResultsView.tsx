"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock, Waves, ShieldCheck, RefreshCw, Eye, Ship, Calendar } from 'lucide-react';
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#eaeef6]/60 p-3.5 rounded-2xl border border-[#d3dbec]/60 items-center text-left text-xs font-bold text-slate-600 animate-fade-in">
      <div className="flex items-center gap-2 text-[#0f2c59]">
        <Eye className="h-4 w-4 text-slate-400 shrink-0" />
        <span>12 Personen haben diese Verbindung heute aufgerufen</span>
      </div>
      <div className="flex items-center gap-1.5 sm:justify-end text-slate-500 font-mono">
        <RefreshCw className="h-3.5 w-3.5 text-slate-400 animate-spin duration-3000" />
        <span>Tarif-Aktualisierung: <span className="bg-white/80 px-2 py-0.5 rounded border font-black text-slate-700">vor {secondsAgo} Sek.</span></span>
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

  const formatPrice = (factor: number) => {
    return `${Math.round(basePrice * factor)} €`;
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
    <div className="space-y-6 text-left text-slate-800 font-sans animate-fade-in">
      
      {/* HEADER TAB */}
      <div className="flex justify-between items-center border-b pb-4 border-[#d3dbec]">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#0f2c59] tracking-tight">{t.resultsTitle || "Verfügbare Fährverbindungen"}</h2>
          <p className="text-xs text-slate-500 font-bold mt-1">{origin} <span className="text-[#dac0a3] font-black">➔</span> {destination}</p>
        </div>
        <button type="button" onClick={() => { if (bookingStage === 'process') setBookingStage('list'); else setStep(1); }} className="text-xs font-black bg-[#eaeef6] hover:bg-[#d3dbec] text-[#0f2c59] px-4 py-2.5 rounded-xl border border-[#d3dbec] flex items-center gap-1.5 shadow-xs transition-all">
          <ArrowLeft className="h-3.5 w-3.5" /> {t.backBtn || "Zurück"}
        </button>
      </div>

      {bookingStage === 'list' && (
        <>
          <FilterBar sortBy={sortBy} setSortBy={setSortBy} liveViewers={14} currency="EUR" setCurrency={() => {}} basePrice={basePrice} />

          <div className="mt-4">
            <LiveTrustTicker />
          </div>

          <div className="space-y-5 mt-4">
            {sortedOffers.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-[#d3dbec] text-sm font-bold text-slate-400 animate-pulse">
                ⏳ Synchronisiere Tarife...
              </div>
            ) : (
              sortedOffers.map((offer) => (
                // 🎨 KARTEN-LOOK: Cleaner, flacher Rahmen, extrem schick
                <div key={offer.id} className="bg-white rounded-2xl border border-[#d3dbec] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row md:items-stretch gap-0">
                  
                  {/* BRANDING: Deep Marine (#0f2c59) */}
                  <div className="md:w-1/4 bg-[#0f2c59] p-6 flex flex-col justify-center items-center text-center relative border-b md:border-b-0 md:border-r border-[#1d3d6f]">
                    <div className="absolute top-3 left-4 flex items-center gap-1 text-[10px] font-black text-[#dac0a3] font-mono">
                      <Star className="h-3 w-3 fill-[#dac0a3] text-[#dac0a3]" /> {offer.rating}
                    </div>
                    <div className="bg-[#143666] border border-[#1d3d6f] px-4 py-3 rounded-xl w-full flex flex-col items-center gap-1">
                      <Ship className="h-4 w-4 text-[#dac0a3]" />
                      <span className="text-xs font-bold text-white tracking-tight">{offer.shipName}</span>
                    </div>
                    <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest mt-2">{offer.company}</span>
                  </div>

                  {/* LOGISTIK & ZEITBLOCK */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4 bg-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" /> Standard-Transit-Tarif
                      </div>
                      <div className="flex gap-1">
                        {(offer.features || ["WiFi", "Restaurant"]).map((f: any, i: number) => (
                          <span key={i} className="text-[9px] bg-[#f8fafd] border border-[#d3dbec] text-slate-500 px-2 py-0.5 rounded-md font-bold">{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 font-mono text-slate-700">
                      <div className="text-left">
                        <span className="text-xl font-black text-[#0f2c59] tracking-tight block">18:00</span>
                        <span className="text-[9px] font-black text-slate-400 block uppercase tracking-widest mt-0.5">{origin.substring(0, 3)} Port</span>
                      </div>
                      
                      <div className="flex flex-col items-center flex-1 font-sans">
                        <span className="text-[10px] font-black text-[#0f2c59] bg-[#eaeef6] border border-[#d3dbec] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-500" /> {offer.duration}
                        </span>
                        <div className="w-full h-[1px] bg-[#d3dbec] relative mt-2.5 flex items-center justify-center">
                          <Waves className="h-3 w-3 text-slate-300 bg-white px-0.5 absolute" />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-black text-[#0f2c59] tracking-tight block">14:00</span>
                        <span className="text-[9px] font-black text-slate-400 block uppercase tracking-widest mt-0.5">{destination.substring(0, 3)} Port (+1)</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-bold text-slate-600 bg-[#f8fafd] border border-[#d3dbec] p-2 rounded-xl flex items-center gap-1.5 w-fit">
                      <ShieldCheck className="h-4 w-4 text-slate-400" />
                      <span>✓ Verifizierte Direktverbindung mit Kabinen-Garantie</span>
                    </div>
                  </div>

                  {/* PREIS & INTERAKTIONBLOCK: Champagner-Gold (#dac0a3) */}
                  <div className="md:w-1/4 p-6 bg-[#f8fafd] md:border-l border-dashed border-[#d3dbec] flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3">
                    <div className="text-left md:text-right">
                      <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Gesamtpreis</span>
                      <span className="text-2xl font-black text-[#0f2c59] font-mono tracking-tight">{formatPrice(offer.priceFactor)}</span>
                    </div>
                    <button type="button" onClick={() => handleSelectOffer(offer)} className="bg-[#dac0a3] hover:bg-[#c9aa88] text-[#0f2c59] font-black px-5 py-3 text-xs rounded-xl shadow-xs uppercase tracking-widest transition-all transform active:scale-95">
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
