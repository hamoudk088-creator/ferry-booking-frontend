"use client";

import React, { useState, useEffect } from 'react';
import { LOCALES } from './locales';

export default function VehicleCockpit({ vehicle, currentLang }: { vehicle: string; currentLang: string }) {
  const t = LOCALES[currentLang] || LOCALES.DE;

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [len, setLen] = useState(4.50);
  const [hgt, setHgt] = useState(1.50);
  const [trailer, setTrailer] = useState(false);

  useEffect(() => {
    setBrand(''); setModel(''); setTrailer(false);
    if (vehicle === 'Car') { setLen(4.50); setHgt(1.50); }
    else if (vehicle === 'Van') { setLen(5.20); setHgt(2.00); }
    else if (vehicle === 'Bus') { setLen(6.80); setHgt(2.90); }
    else if (vehicle === 'Motorcycle') { setLen(2.10); setHgt(1.20); }
  }, [vehicle]);

  if (vehicle === 'None') return null;

  return (
    <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-200/70 space-y-4 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-amber-800 block uppercase mb-1">{t.brandLabel}</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder={t.brandPlaceholder} className="w-full bg-white border border-amber-200 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
        </div>
        <div>
          <label className="text-[10px] font-black text-amber-800 block uppercase mb-1">{t.modelLabel}</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder={t.modelPlaceholder} className="w-full bg-white border border-amber-200 p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-amber-200 text-xs font-bold">
        <div>
          <div className="flex justify-between mb-1"><span className="text-[9px] text-amber-800 uppercase">{t.lenLabel}</span><span className="font-mono font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">{len.toFixed(2)}m</span></div>
          <input type="range" min="1.0" max="15.0" step="0.05" value={len} onChange={(e) => setLen(parseFloat(e.target.value))} className="w-full accent-[#0b2545] cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between mb-1"><span className="text-[9px] text-amber-800 uppercase">{t.hgtLabel}</span><span className="font-mono font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">{hgt.toFixed(2)}m</span></div>
          <input type="range" min="1.0" max="4.5" step="0.05" value={hgt} onChange={(e) => setHgt(parseFloat(e.target.value))} className="w-full accent-[#0b2545] cursor-pointer" />
        </div>
        <div className="flex flex-col justify-end">
          <button type="button" onClick={() => setTrailer(!trailer)} className={`w-full py-3 rounded-xl font-black text-xs border tracking-wider transition-all ${trailer ? 'bg-[#0b2545] text-white border-[#0b2545]' : 'bg-white text-slate-700 border-amber-200'}`}>
            {trailer ? t.trailerYes : t.trailerNo}
          </button>
        </div>
      </div>
    </div>
  );
}
