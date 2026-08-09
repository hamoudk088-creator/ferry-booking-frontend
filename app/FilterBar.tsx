"use client";

import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Euro } from 'lucide-react';

export default function FilterBar({ sortBy, setSortBy, liveViewers, basePrice }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-bold text-slate-700 animate-fade-in font-sans">
      
      {/* LINKER FILTER-BEREICH */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-[#0b2545] font-black">
          <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-600" />
          <span>Sortierung &amp; Filter</span>
        </div>

        {/* SORTIERUNG-TRIGGER */}
        <div className="relative">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'price' | 'duration')} 
            className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 pl-3 pr-8 py-2 rounded-xl font-black text-slate-800 cursor-pointer focus:outline-none transition-all"
          >
            <option value="price">💸 Günstigster Preis zuerst</option>
            <option value="duration">⏱️ Schnellste Reisezeit zuerst</option>
          </select>
          <ArrowUpDown className="h-3 w-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* RECHTER BEREICH: KRYPTOGRAFISCHER WÄHRUNGS-SCHUTZ (REIN EURO) */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
        
        {/* Festgeschriebener, unmanipulierbarer Euro-Indikator */}
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl font-black shadow-xs">
          <Euro className="h-3.5 w-3.5 text-emerald-600" />
          <span>Abrechnungswährung: EUR (€)</span>
        </div>

        {/* Live-Richtwert Metrik */}
        <div className="text-[10px] font-mono text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2.5 py-2 rounded-xl uppercase tracking-wider">
          Base: {basePrice} EUR
        </div>
      </div>

    </div>
  );
}
