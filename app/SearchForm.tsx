"use client";

import React, { useState } from 'react';
import { MapPin, Calendar, Car, Bed, ShieldAlert } from 'lucide-react';

// Echte Fahrzeugdatenbank sortiert nach Kategorien
const VEHICLE_DATA: Record<string, Record<string, { label: string; defLen: number; defHeight: number }[]>> = {
  Car: {
    Volkswagen: [{ label: "Golf / Polo / Passat Variant", defLen: 4.40, defHeight: 1.45 }, { label: "Tiguan / T-Roc (SUV)", defLen: 4.50, defHeight: 1.65 }],
    Mercedes: [{ label: "A-Klasse / C-Klasse / E-Klasse", defLen: 4.65, defHeight: 1.45 }, { label: "GLC / GLE Coupe (SUV)", defLen: 4.75, defHeight: 1.70 }],
    BMW: [{ label: "3er / 5er Touring", defLen: 4.70, defHeight: 1.45 }, { label: "X3 / X5 Allrad (SUV)", defLen: 4.80, defHeight: 1.75 }],
    Renault: [{ label: "Clio / Megane / Captur", defLen: 4.25, defHeight: 1.45 }],
    Fiat: [{ label: "Fiat 500 / Panda / Tipo Kombi", defLen: 3.95, defHeight: 1.50 }]
  },
  Van: {
    Volkswagen: [{ label: "T5 / T6 / T7 Multivan Caravelle", defLen: 4.90, defHeight: 1.95 }, { label: "Caddy Maxi Van", defLen: 4.85, defHeight: 1.80 }],
    Mercedes: [{ label: "Vito / V-Klasse Großraumlimousine", defLen: 5.14, defHeight: 1.88 }, { label: "Sprinter Kastenwagen Hochdach", defLen: 5.93, defHeight: 2.35 }],
    Ford: [{ label: "Transit Custom Tourneo", defLen: 4.97, defHeight: 1.98 }, { label: "Transit Connect Kasten", defLen: 4.42, defHeight: 1.82 }]
  },
  Bus: {
    Fiat: [{ label: "Ducato Reisemobil (Kompakt)", defLen: 5.99, defHeight: 2.65 }, { label: "Ducato Maxi Alkoven Wohnmobil", defLen: 6.99, defHeight: 3.10 }],
    Mercedes: [{ label: "Sprinter Hymer / Carthago Wohnmobil", defLen: 6.90, defHeight: 2.90 }, { label: "Großer 3-Achs Reisebus", defLen: 12.00, defHeight: 3.60 }],
    Volkswagen: [{ label: "Grand California Camper", defLen: 6.00, defHeight: 2.95 }]
  },
  Motorcycle: {
    BMW: [{ label: "R 1250 GS / Adventure Tourer", defLen: 2.20, defHeight: 1.40 }],
    Honda: [{ label: "Africa Twin / Goldwing Luxus", defLen: 2.35, defHeight: 1.50 }],
    Vespa: [{ label: "GTS / Primavera Motorroller", defLen: 1.85, defHeight: 1.20 }]
  }
};

export default function SearchForm({
  origin, setOrigin, destination, setDestination, depDate, setDepDate,
  retDate, setRetDate, isRound, setIsRound, adults, setAdults,
  children, setChildren, vehicle, setVehicle, accommodation, setAccommodation, onSearch
}: any) {
  
  // Interne Listensteuerung
  const [brand, setBrand] = useState('Volkswagen');
  const [model, setModel] = useState('Golf / Polo / Passat Variant');
  const [len, setLen] = useState(4.40);
  const [hgt, setHgt] = useState(1.45);
  const [trailer, setTrailer] = useState(false);

  // Reagiert sofort, wenn eine neue Marke im Dropdown gewählt wird
  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    const models = VEHICLE_DATA[vehicle]?.[newBrand] || [];
    if (models.length > 0) {
      setModel(models[0].label);
      setLen(models[0].defLen);
      setHgt(models[0].defHeight);
    }
  };

  // Reagiert sofort, wenn ein neues Modell gewählt wird
  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    const modelObj = VEHICLE_DATA[vehicle]?.[brand]?.find(m => m.label === newModel);
    if (modelObj) {
      setLen(modelObj.defLen);
      setHgt(modelObj.defHeight);
    }
  };

  // Reagiert sofort auf die Haupt-Fahrzeugklasse (PKW, Van, Bus...)
  const handleCategoryChange = (newCat: string) => {
    setVehicle(newCat);
    const availableBrands = Object.keys(VEHICLE_DATA[newCat] || {});
    if (availableBrands.length > 0) {
      const firstBrand = availableBrands[0];
      setBrand(firstBrand);
      const models = VEHICLE_DATA[newCat][firstBrand] || [];
      if (models.length > 0) {
        setModel(models[0].label);
        setLen(models[0].defLen);
        setHgt(models[0].defHeight);
      }
    }
  };

  const flags: Record<string, string> = { France: "🇫🇷", Italy: "🇮🇹", Spain: "🇪🇸", Algeria: "🇩🇿", Tunisia: "🇹🇳" };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 space-y-6 text-left">
      
      {/* 1. EINWEG / RÜCKFAHRT */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
        <button type="button" onClick={() => setIsRound(false)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!isRound ? 'bg-[#0b2545] text-white shadow-sm' : 'text-slate-500'}`}>Einwegticket</button>
        <button type="button" onClick={() => setIsRound(true)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isRound ? 'bg-[#0b2545] text-white shadow-sm' : 'text-slate-500'}`}>Hin- &amp; Rückfahrt</button>
      </div>

      {/* 2. REISEZIELE & REISE-DATEN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70">
          <label className="text-[10px] font-bold text-sky-600 block uppercase tracking-widest mb-1">Abfahrt {flags[origin]}</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm focus:outline-none cursor-pointer">
            <option value="France">Frankreich (Marseille)</option>
            <option value="Italy">Italien (Genua)</option>
            <option value="Spain">Spanien (Alicante)</option>
          </select>
        </div>
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70">
          <label className="text-[10px] font-bold text-sky-600 block uppercase tracking-widest mb-1">Ziel {flags[destination]}</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm focus:outline-none cursor-pointer">
            <option value="Algeria">Algerien</option>
            <option value="Tunisia">Tunesien</option>
          </select>
        </div>
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70">
          <label className="text-[10px] font-bold text-sky-600 block uppercase tracking-widest mb-1">Hinfahrt</label>
          <input type="date" value={depDate} onChange={(e) => setDepDate(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm focus:outline-none" />
        </div>
        <div className={`bg-sky-50/40 p-4 rounded-2xl border transition-all ${isRound ? 'border-sky-100' : 'opacity-40 pointer-events-none'}`}>
          <label className="text-[10px] font-bold text-sky-600 block uppercase tracking-widest mb-1">Rückfahrt</label>
          <input type="date" value={retDate} onChange={(e) => setRetDate(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm focus:outline-none" />
        </div>
      </div>

      {/* 3. REISENDE & KATEGORIE & UNTERBRINGUNG */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-slate-100 pt-5">
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70 flex justify-between items-center text-xs">
          <span>Erwachsene</span>
          <input type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-12 bg-white border border-slate-200 rounded-xl py-1 text-center font-black text-blue-600 focus:outline-none shadow-sm" />
        </div>
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70 flex justify-between items-center text-xs">
          <span>Kinder</span>
          <input type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-12 bg-white border border-slate-200 rounded-xl py-1 text-center font-black text-blue-600 focus:outline-none shadow-sm" />
        </div>
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70">
          <label className="text-[10px] font-bold text-sky-600 block uppercase tracking-widest mb-1">Fahrzeugtyp</label>
          <select value={vehicle} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full bg-transparent font-black text-slate-800 text-sm focus:outline-none cursor-pointer">
            <option value="Car">🚗 PKW / Auto</option>
            <option value="Van"> Vans &amp; Transporter</option>
            <option value="Bus">🚌 Wohnmobil / Bus</option>
            <option value="Motorcycle">🏍️ Motorrad</option>
            <option value="None">🚶 Ohne Fahrzeug (Fußgänger)</option>
          </select>
        </div>
        <div className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/70">
          <label className="text-[10px] font-bold text-sky-600 block uppercase tracking-widest mb-1">Unterbringung</label>
          <select value={accommodation} onChange={(e) => setAccommodation(e.target.value)} className="w-full bg-transparent font-black text-blue-700 text-sm focus:outline-none cursor-pointer">
            <option value="Cabin">Private Schlafkabine</option>
            <option value="NoCabin">Standard Deckspassage</option>
          </select>
        </div>
      </div>

      {/* 4. DYNAMISCHES PROFI-COCKPIT FÜR DIE FAHRZEUGAUSWAHL */}
      {vehicle !== 'None' && VEHICLE_DATA[vehicle] && (
        <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-200 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Marke */}
            <div>
              <label className="text-[10px] font-black text-amber-800 block uppercase tracking-wider mb-1">1. Marke auswählen</label>
              <select value={brand} onChange={(e) => handleBrandChange(e.target.value)} className="w-full bg-white border border-amber-200 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer">
                {Object.keys(VEHICLE_DATA[vehicle]).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
