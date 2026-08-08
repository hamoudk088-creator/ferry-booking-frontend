"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Scale, ArrowRight, Info } from 'lucide-react';
import { LOCALES } from './locales';

export default function VehicleCockpit({ vehicle, currentLang }: { vehicle: string; currentLang: string }) {
  const t = LOCALES[currentLang] || LOCALES.DE;

  // States für Fahrzeuginformationen
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [len, setLen] = useState(4.50);
  const [hgt, setHgt] = useState(1.50);
  const [weight, setWeight] = useState(1800); // Gewicht in KG
  const [trailer, setTrailer] = useState(false);

  // Setzt Standardwerte je nach gewählter Fahrzeugklasse
  useEffect(() => {
    setBrand(''); setModel(''); setTrailer(false);
    if (vehicle === 'Car') { setLen(4.50); setHgt(1.50); setWeight(1600); }
    else if (vehicle === 'Van') { setLen(5.40); setHgt(2.10); setWeight(2400); }
    else if (vehicle === 'Bus') { setLen(7.20); setHgt(2.90); setWeight(3800); }
    else if (vehicle === 'Motorcycle') { setLen(2.10); setHgt(1.20); setWeight(280); }
  }, [vehicle]);

  if (vehicle === 'None') return null;

  // Logik für die Grenzkontroll-Ampel (Zoll-Zertifizierung)
  const getZollStatus = () => {
    if (vehicle === 'Bus' || len > 6.0 || hgt > 2.5) {
      return {
        status: "critical",
        color: "bg-amber-50 border-amber-200 text-amber-900",
        icon: <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />,
        text: currentLang === 'AR' 
          ? "⚠️ تنبيه الجمارك: مركبة ذات حجم كبير. قد يتم تطبيق رسوم إضافية في الميناء." 
          : "⚠️ Zoll-Hinweis: Übergröße/Nutzfahrzeug. Abfertigung erfolgt auf der Sonderspur im Hafen."
      };
    }
    return {
      status: "safe",
      color: "bg-emerald-50 border-emerald-200 text-emerald-900",
      icon: <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />,
      text: currentLang === 'AR'
        ? "🟢 جمارك سليمة: أبعاد المركبة مطابقة للتعرفة القياسية للعبّارات."
        : "🟢 Zoll-Freigabe: Fahrzeugmaße entsprechen dem Standard-Tarif. Schnelle Einschiffung möglich."
    };
  };

  const zoll = getZollStatus();

  return (
    <div className="bg-amber-50/60 p-6 rounded-[28px] border border-amber-200/70 space-y-5 text-left animate-fade-in">
      
      {/* ZEILE 1: MARKE & MODELL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-amber-800 block uppercase mb-1">{t.brandLabel}</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder={t.brandPlaceholder} className="w-full bg-white border border-amber-200 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="text-[10px] font-black text-amber-800 block uppercase mb-1">{t.modelLabel}</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder={t.modelPlaceholder} className="w-full bg-white border border-amber-200 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
      </div>

      {/* ZEILE 2: SCHIEBEREGLER FÜR LÄNGE & HÖHE & GEWICHT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-amber-200 text-xs font-bold">
        {/* LÄNGE */}
        <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
          <div className="flex justify-between mb-1.5"><span className="text-[9px] text-amber-800 uppercase">{t.lenLabel}</span><span className="font-mono font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">{len.toFixed(2)}m</span></div>
          <input type="range" min="1.5" max="12.0" step="0.05" value={len} onChange={(e) => setLen(parseFloat(e.target.value))} className="w-full accent-[#0b2545] cursor-pointer" />
        </div>
        
        {/* HÖHE */}
        <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
          <div className="flex justify-between mb-1.5"><span className="text-[9px] text-amber-800 uppercase">{t.hgtLabel}</span><span className="font-mono font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">{hgt.toFixed(2)}m</span></div>
          <input type="range" min="1.0" max="4.2" step="0.05" value={hgt} onChange={(e) => setHgt(parseFloat(e.target.value))} className="w-full accent-[#0b2545] cursor-pointer" />
        </div>

        {/* NEU: SCHIFFS-GEWICHTSKONTROLLE */}
        <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
          <div className="flex justify-between mb-1.5"><span className="text-[9px] text-amber-800 uppercase flex items-center gap-1"><Scale className="h-3 w-3" /> Gesamtgewicht</span><span className="font-mono font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">{weight} kg</span></div>
          <input type="range" min={vehicle === 'Motorcycle' ? "50" : "1000"} max={vehicle === 'Bus' ? "7500" : "3500"} step="50" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="w-full accent-[#0b2545] cursor-pointer" />
        </div>
      </div>

      {/* ANHÄNGER-UMSCHALTER & VISUELLE CSS-FAHRZEUG-SILHOUETTE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-t border-amber-200 pt-4">
        <button type="button" onClick={() => setTrailer(!trailer)} className={`py-3.5 rounded-xl font-black text-xs border tracking-wider transition-all h-fit ${trailer ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-md' : 'bg-white text-slate-700 border-amber-200 hover:border-amber-400'}`}>
          {trailer ? t.trailerYes : t.trailerNo}
        </button>

        {/* INTERAKTIVE PROPORTIONALE AUTO-GRAFIKBOX */}
        <div className="hidden sm:flex bg-slate-900/5 h-12 rounded-xl border border-dashed border-slate-300 relative items-center justify-start p-1 overflow-hidden">
          <div 
            className="bg-[#0b2545] h-8 rounded-lg flex items-center justify-center text-white font-mono text-[9px] font-black transition-all duration-300 relative"
            style={{ width: `${(len / 12.0) * 100}%`, minWidth: '20%' }}
          >
            🚗 {brand ? brand.substring(0, 8).toUpperCase() : "CAR"}
            {trailer && <div className="absolute -right-5 top-1 h-6 w-4 bg-amber-500 rounded border-l border-white animate-pulse"></div>}
          </div>
        </div>
      </div>

      {/* DIE INTEGRATIVE ZOLL-CHECK AMPELBOX */}
      <div className={`p-3 rounded-2xl border text-xs font-bold leading-relaxed flex items-start gap-2.5 transition-colors ${zoll.color}`}>
        {zoll.icon}
        <span>{zoll.text}</span>
      </div>

    </div>
  );
}
