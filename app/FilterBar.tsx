"use client";

import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Euro } from 'lucide-react';

export default function FilterBar({ sortBy, setSortBy, basePrice }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-bold text-slate-600 animate-fade-in font-sans">
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#f4f7f6] border border-[#e2e8f0] px-3 py-2 rounded-xl text-[#1e293b] font-black">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#0d9488]" />
          <span>Ergebnisse filtern</span>
        </div>

        <div className="relative">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'price' | 'duration')} 
            className="appearance-none bg-[#f4f7f6] hover:bg-[#e2e8f0] border border-[#e2e8f0] pl-3 pr-8 py-2 rounded-xl font-black text-slate-800 cursor-pointer focus:outline-none transition-all"
          >
            <option value="price">💸 Günstigster Preis zuerst</option>
            <option value="duration">⏱️ Schnellste Überfahrt zuerst</option>
          </select>
          <ArrowUpDown className="h-3 w-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
        <div className="flex items-center gap-1.5 bg-[#f4f7f6] border border-[#e2e8f0] text-slate-700 px-3 py-2 rounded-xl font-black">
          <Euro className="h-3.5 w-3.5 text-[#0d9488]" />
          <span>Währung: EUR (€)</span>
        </div>
      </div>

    </div>
  );
}
