"use client";

import React, { useState } from 'react';
import { Ship, Clock, ArrowLeft } from 'lucide-react';
import { LOCALES } from './locales';
import BookingProcess from './BookingProcess'; // <-- Hier importiert!

export default function ResultsView({ origin, destination, getPrice, setStep, currentLang, vehicle }: any) {
  const t = LOCALES[currentLang] || LOCALES.DE;
  const calculatedPrice = getPrice();

  const [bookingStage, setBookingStage] = useState<'list' | 'process'>('list');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const offers = [
    { id: 1, company: "🔴 CORSICA LINEA", time: "12:00 - 09:30", duration: "21 Std. 30 Min", shipName: "Jean Nicoli / A Nepita" },
    { id: 2, company: "🟢 ALGÉRIE FERRIES", time: "16:00 - 13:00", duration: "21 Std. 00 Min", shipName: "Badji Mokhtar III" },
    { id: 3, company: "🔵 CTN TUNISIA FERRIES", time: "14:00 - 10:00", duration: "20 Std. 00 Min", shipName: "Tanit / Carthage" }
  ];

  const handleSelectOffer = (offer: any) => {
    setSelectedOffer(offer);
    setBookingStage('process');
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.resultsTitle}</h2>
          <p className="text-xs text-slate-500 font-bold mt-1">{origin} <span className="text-blue-600">➔</span> {destination}</p>
        </div>
        <button type="button" onClick={() => { if (bookingStage === 'process') setBookingStage('list'); else setStep(1); }} className="text-xs font-black bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-xl transition-all flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> {t.backBtn}
        </button>
      </div>

      {bookingStage === 'list' && (
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-xl hover:border-amber-400 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-blue-900 tracking-wider bg-slate-100 px-2.5 py-1 rounded-md block w-fit">{offer.company}</span>
                <div className="flex items-center gap-2 mt-1"><Ship className="h-4 w-4 text-slate-400" /><span className="text-xs font-bold text-slate-600">{offer.shipName}</span></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center md:text-left"><span className="text-lg font-black text-slate-900 block">{offer.time}</span><span className="text-[10px] font-bold text-slate-400 block uppercase mt-0.5">{origin.split(' ')}</span></div>
                <div className="flex flex-col items-center min-w-[100px]"><span className="text-[10px] font-black text-blue-600 flex items-center gap-1"><Clock className="h-3 w-3" /> {offer.duration}</span><div className="w-full h-0.5 bg-slate-200 relative mt-1"><div className="absolute right-0 -top-1 text-[8px]">▶</div></div></div>
                <div className="text-center md:text-right"><span className="text-lg font-black text-slate-900 block">Ankunft (+1)</span><span className="text-[10px] font-bold text-slate-400 block uppercase mt-0.5">{destination.split(' ')}</span></div>
              </div>
              <div className="w-full md:w-auto pt-4 md:pt-0 md:border-l border-slate-100 md:pl-6 flex md:flex-col justify-between items-center md:items-end gap-2">
                <div><span className="text-[10px] font-bold text-slate-400 block uppercase">Gesamtpreis</span><span className="text-2xl font-black text-blue-900">{calculatedPrice} €</span></div>
                <button type="button" onClick={() => handleSelectOffer(offer)} className="bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-2.5 text-xs rounded-xl shadow-md transition-all uppercase tracking-wider">{t.selectBtn}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {bookingStage === 'process' && (
        <BookingProcess origin={origin} destination={destination} calculatedPrice={calculatedPrice} selectedOffer={selectedOffer} vehicle={vehicle} setStep={setStep} setBookingStage={setBookingStage} />
      )}
    </div>
  );
}
