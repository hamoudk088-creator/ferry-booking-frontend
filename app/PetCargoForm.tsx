"use client";

import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function PetCargoForm({ selectedPet, currentLang }: { selectedPet: boolean; currentLang: string }) {
  const [petPassport, setPetPassport] = useState('');
  
  if (!selectedPet) return null;

  return (
    <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-3 animate-fade-in text-left text-xs font-bold mt-2">
      <div className="flex items-center gap-1.5 text-amber-800">
        <Info className="h-4 w-4 shrink-0" />
        <span className="uppercase text-[9px] tracking-wider">🛂 Zollpflichtige Haustier-Deklaration</span>
      </div>
      <div>
        <label className="text-[10px] text-slate-500 uppercase block mb-1">EU-Heimtierausweis-Nummer (inkl. Tollwut-Impfstatus)</label>
        <input 
          type="text" 
          required 
          value={petPassport} 
          onChange={(e) => setPetPassport(e.target.value.toUpperCase())} 
          placeholder="z.B. DE-01-1234567" 
          className="w-full bg-white border border-amber-200 p-2.5 rounded-xl text-xs font-mono font-black tracking-wider uppercase focus:outline-none" 
        />
      </div>
      <div className="text-[10px] text-emerald-700 bg-emerald-50 p-2 rounded-xl flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5" /> Veterinär-Zollstatus: Vorregistriert
      </div>
    </div>
  );
}
