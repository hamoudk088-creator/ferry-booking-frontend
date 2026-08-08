"use client";

import React, { useState } from 'react';
import { Calendar, Ship, Users, Bed } from 'lucide-react';
import VehicleCockpit from './VehicleCockpit';
import { LOCALES } from './locales';

const OFFICIAL_FERRY_ROUTES = [
  { id: "mrs-alg", from: "Marseille 🇫🇷", to: "Algiers (Algier) 🇩🇿" },
  { id: "mrs-orn", from: "Marseille 🇫🇷", to: "Oran 🇩🇿" },
  { id: "mrs-ski", from: "Marseille 🇫🇷", to: "Skikda 🇩🇿" },
  { id: "mrs-bej", from: "Marseille 🇫🇷", to: "Bejaia 🇩🇿" },
  { id: "mrs-tun", from: "Marseille 🇫🇷", to: "Tunis 🇹🇳" },
  { id: "alc-orn", from: "Alicante 🇪🇸", to: "Oran 🇩🇿" },
  { id: "goa-tun", from: "Genua 🇮🇹", to: "Tunis 🇹🇳" }
];

export default function SearchStep({
  vehicle, setVehicle, accommodation, setAccommodation, adults, setAdults,
  children, setChildren, depDate, setDepDate, retDate, setRetDate,
  isRound, setIsRound, onSearch, currentLang
}: any) {

  const t = LOCALES[currentLang] || LOCALES.DE;
  const [selectedRouteId, setSelectedRouteId] = useState(OFFICIAL_FERRY_ROUTES[0].id);

  return (
    <div className="bg-amber-100 rounded-[32px] shadow-2xl p-6 md:p-8 border-4 border-amber-300 space-y-6 text-left">
      
      {/* 1. EINWEGTICKET / HIN- & RÜCKFAHRT */}
      <div className="flex bg-amber-200/60 p-1.5 rounded-2xl w-fit border border-amber-300">
        <button type="button" onClick={() => setIsRound(false)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${!isRound ? 'bg-[#0b2545] text-amber-400 shadow-md' : 'text-[#0b2545]/70'}`}>{t.oneWay}</button>
        <button type="button" onClick={() => setIsRound(true)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${isRound ? 'bg-[#0b2545] text-amber-400 shadow-md' : 'text-[#0b2545]/70'}`}>{t.roundTrip}</button>
      </div>

      {/* 2. STRECKEN & REISE-DATEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm text-[#0b2545]">
          <label className="text-[10px] font-black text-[#0b2545]/60 block uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <Ship className="h-3.5 w-3.5 text-[#0b2545]" /> {t.selectRoute}
          </label>
          <select value={selectedRouteId} onChange={(e) => setSelectedRouteId(e.target.value)} className="w-full bg-transparent font-black text-[#0b2545] text-base focus:outline-none cursor-pointer">
            {OFFICIAL_FERRY_ROUTES.map(route => (
              <option key={route.id} value={route.id} className="text-[#0b2545] font-bold">{route.from} ➔ {route.to}</option>
            ))}
          </select>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm text-[#0b2545]">
          <label className="text-[10px] font-black text-[#0b2545]/60 block uppercase tracking-widest mb-1.5 flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#0b2545]" /> {t.depDate}</label>
          <input type="date" value={depDate} onChange={(e) => setDepDate(e.target.value)} className="w-full bg-transparent font-black text-[#0b2545] text-base focus:outline-none cursor-pointer" />
        </div>

        <div className={`bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm text-[#0b2545] transition-all ${isRound ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <label className="text-[10px] font-black text-[#0b2545]/60 block uppercase tracking-widest mb-1.5 flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#0b2545]" /> {t.retDate}</label>
          <input type="date" value={retDate} onChange={(e) => setRetDate(e.target.value)} className="w-full bg-transparent font-black text-[#0b2545] text-base focus:outline-none" />
        </div>
      </div>

      {/* 3. REISENDE & UNTERBRINGUNG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-amber-200 pt-5">
        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm text-[#0b2545] flex justify-between items-center">
          <div className="flex items-center gap-2"><span className="text-sm font-black uppercase tracking-wider text-[11px] text-[#0b2545]/60">{t.adults}</span></div>
          <input type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-14 bg-white border border-amber-200 rounded-xl py-1.5 text-center font-black text-[#0b2545] focus:outline-none" />
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm text-[#0b2545] flex justify-between items-center">
          <div className="flex items-center gap-2"><span className="text-sm font-black uppercase tracking-wider text-[11px] text-[#0b2545]/60">{t.children}</span></div>
          <input type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-14 bg-white border border-amber-200 rounded-xl py-1.5 text-center font-black text-[#0b2545] focus:outline-none" />
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm text-[#0b2545]">
          <label className="text-[10px] font-black text-[#0b2545]/60 block uppercase tracking-widest mb-1 flex items-center gap-1"><Bed className="h-3.5 w-3.5 text-[#0b2545]" /> {accommodation === 'Cabin' ? t.cabin : t.deck}</label>
          <select value={accommodation} onChange={(e) => setAccommodation(e.target.value)} className="w-full bg-transparent font-black text-[#0b2545] text-sm focus:outline-none cursor-pointer">
            <option value="Cabin" className="text-[#0b2545] font-bold">{t.cabin}</option>
            <option value="NoCabin" className="text-[#0b2545] font-bold">{t.deck}</option>
          </select>
        </div>
      </div>

      {/* 4. FAHRZEUGKATEGORIEN */}
      <div className="space-y-2 border-t border-amber-200 pt-5">
        <label className="text-[10px] font-black text-slate-600 block uppercase tracking-widest">{t.category}</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'Car', label: t.pkw }, { id: 'Van', label: t.van },
            { id: 'Bus', label: t.bus }, { id: 'Motorcycle', label: t.moto },
            { id: 'None', label: t.pedestrian }
          ].map((v) => (
            <button key={v.id} type="button" onClick={() => setVehicle(v.id)} className={`p-4 rounded-2xl border-2 font-black text-xs transition-all shadow-md ${vehicle === v.id ? 'border-[#0b2545] bg-[#0b2545] text-amber-400 text-sm font-black' : 'border-amber-300 text-slate-700 bg-white hover:border-amber-400'}`}>{v.label}</button>
          ))}
        </div>
      </div>

      <VehicleCockpit vehicle={vehicle} currentLang={currentLang} />

      {/* DER NEUE BUTTON: FÄHRE SUCHEN */}
      <button 
        type="button" 
        onClick={onSearch} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4.5 rounded-2xl shadow-xl text-center text-lg tracking-wider transition-all duration-200"
      >
        {t.searchBtn}
      </button>
    </div>
  );
}
