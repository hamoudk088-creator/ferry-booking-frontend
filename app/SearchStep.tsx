"use client";

import React, { useState } from 'react';
import { Calendar, Ship, Users, Bed, ArrowRight, ShieldCheck } from 'lucide-react';
import VehicleCockpit from './VehicleCockpit';
import SafetyVault from './SafetyVault';
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
  const [selectedRouteId, setSelectedRouteId] = useState("mrs-alg");

  return (
    <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border border-slate-100 space-y-6 text-left relative overflow-hidden transition-all duration-300">
      
      {/* Elegantes Deko-Element im Hintergrund */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-amber-400 to-sky-500"></div>
      
      {/* 1. SELEKTOR: EINWEGTICKET / HIN- & RÜCKFAHRT */}
      <div className="flex bg-slate-50 p-1 rounded-2xl w-fit border border-slate-200 shadow-inner">
        <button type="button" onClick={() => setIsRound(false)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${!isRound ? 'bg-[#0b2545] text-amber-400 shadow-md scale-102' : 'text-slate-600 hover:text-slate-900'}`}>{t.oneWay}</button>
        <button type="button" onClick={() => setIsRound(true)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${isRound ? 'bg-[#0b2545] text-amber-400 shadow-md scale-102' : 'text-slate-600 hover:text-slate-900'}`}>{t.roundTrip}</button>
      </div>

      {/* 2. ROUTEN- UND REISEDATEN-GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <label className="text-[10px] font-black text-slate-400 block uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Ship className="h-3.5 w-3.5 text-blue-600" /> {t.selectRoute}
          </label>
          <select value={selectedRouteId} onChange={(e) => setSelectedRouteId(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm md:text-base focus:outline-none cursor-pointer">
            {OFFICIAL_FERRY_ROUTES.map(route => (
              <option key={route.id} value={route.id} className="text-slate-800 font-bold bg-white">{route.from} ➔ {route.to}</option>
            ))}
          </select>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <label className="text-[10px] font-black text-slate-400 block uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-600" /> {t.depDate}
          </label>
          <input type="date" value={depDate} onChange={(e) => setDepDate(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm md:text-base focus:outline-none cursor-pointer" />
        </div>

        <div className={`bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm transition-all ${isRound ? 'opacity-100 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100' : 'opacity-40 pointer-events-none'}`}>
          <label className="text-[10px] font-black text-slate-400 block uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-600" /> {t.retDate}
          </label>
          <input type="date" value={retDate} onChange={(e) => setRetDate(e.target.value)} disabled={!isRound} className="w-full bg-transparent font-black text-slate-800 text-sm md:text-base focus:outline-none cursor-pointer" />
        </div>
      </div>

      {/* 3. REISENDE & UNTERBRINGUNG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-slate-100 pt-5">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div className="flex flex-col"><span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t.adults}</span><span className="text-[11px] text-slate-400 font-medium">Ab 12 Jahren</span></div>
          <input type="number" min="1" max="9" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-12 bg-white border border-slate-200 rounded-xl py-1.5 text-center font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div className="flex flex-col"><span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t.children}</span><span className="text-[11px] text-slate-400 font-medium">2 - 11 Jahre</span></div>
          <input type="number" min="0" max="9" value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-12 bg-white border border-slate-200 rounded-xl py-1.5 text-center font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <label className="text-[10px] font-black text-slate-400 block uppercase tracking-widest mb-1 flex items-center gap-1.5"><Bed className="h-3.5 w-3.5 text-blue-600" /> {t.cabin}</label>
          <select value={accommodation} onChange={(e) => setAccommodation(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm focus:outline-none cursor-pointer">
            <option value="Cabin" className="text-slate-800 font-bold bg-white">{t.cabin}</option>
            <option value="NoCabin" className="text-slate-800 font-bold bg-white">{t.deck}</option>
          </select>
        </div>
      </div>

      {/* 4. SEKTION: FAHRZEUGAUSWAHL ALS MODERNE DESIGN-CHIPS */}
      <div className="space-y-2.5 border-t border-slate-100 pt-5">
        <label className="text-[10px] font-black text-slate-400 block uppercase tracking-widest">{t.category}</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'Car', label: t.pkw }, { id: 'Van', label: t.van },
            { id: 'Bus', label: t.bus }, { id: 'Motorcycle', label: t.moto },
            { id: 'None', label: t.pedestrian }
          ].map((v) => {
            const isActive = vehicle === v.id;
            return (
              <button 
                key={v.id} 
                type="button" 
                onClick={() => setVehicle(v.id)} 
                className={`p-3.5 rounded-2xl border-2 font-black text-xs transition-all duration-200 text-center flex items-center justify-center h-14 ${
                  isActive 
                    ? 'border-[#0b2545] bg-[#0b2545] text-amber-400 shadow-md scale-102' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* INTEGRIERTE COCKPIT- & SECURITY-MODULE */}
      <VehicleCockpit vehicle={vehicle} currentLang={currentLang} />
      <SafetyVault currentLang={currentLang} vehicle={vehicle} />

      {/* HAUPT-SUCHBUTTON IM MODERNEN FLUGPORTAL-DESIGN */}
      <button 
        type="button" 
        onClick={onSearch} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-xl text-center text-sm md:text-base uppercase tracking-wider transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <span>{t.searchBtn}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
