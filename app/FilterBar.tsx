"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, TrendingUp, BarChart3, Mail } from 'lucide-react';

export default function FilterBar({ sortBy, setSortBy, liveViewers, currency, setCurrency, basePrice }: any) {
  const [showChart, setShowChart] = useState(false);

  // Günstigste Tage berechnen (Fiktive Balkengrafik)
  const days = [
    { day: "Mo", price: Math.round(basePrice * 0.9), active: false },
    { day: "Di", price: Math.round(basePrice * 0.85), active: true }, // Spartag
    { day: "Mi", price: Math.round(basePrice * 0.95), active: false },
    { day: "Do", price: Math.round(basePrice * 1.0), active: false },
    { day: "Fr", price: Math.round(basePrice * 1.2), active: false },
    { day: "Sa", price: Math.round(basePrice * 1.3), active: false },
    { day: "So", price: Math.round(basePrice * 1.15), active: false }
  ];

  return (
    <div className="space-y-4">
      {/* FILTERBAR HAUPTZEILE */}
      <div className="bg-[#0b2545] text-white p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md text-left">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4 text-amber-400 shrink-0" />
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-[11px] font-black uppercase">
            <button type="button" onClick={() => setSortBy('price')} className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'price' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400'}`}>Bestpreis</button>
            <button type="button" onClick={() => setSortBy('duration')} className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'duration' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400'}`}>Schnellste</button>
          </div>
          <button type="button" onClick={() => setShowChart(!showChart)} className={`flex items-center gap-1 text-[11px] font-black uppercase px-3 py-2 rounded-xl border border-slate-700 transition-colors ${showChart ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            <BarChart3 className="h-3.5 w-3.5" /> Spartage
          </button>
        </div>

        <div className="text-[11px] font-black text-amber-400 flex items-center gap-1.5 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800 animate-pulse">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>🔥 {liveViewers} Kunden vergleichen gerade diese Strecke</span>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-[11px] font-mono font-black">
          {(['EUR', 'DZD', 'TND'] as const).map((curr) => (
            <button key={curr} type="button" onClick={() => setCurrency(curr)} className={`px-2.5 py-1.5 rounded-lg transition-all ${currency === curr ? 'bg-blue-600 text-white shadow' : 'text-slate-400'}`}>{curr}</button>
          ))}
        </div>
      </div>

      {/* OPTION 3: PREISCHART-PROGNOSE GRAPH */}
      {showChart && (
        <div className="bg-white p-5 rounded-2xl border shadow-lg space-y-3 animate-fade-in text-left">
          <div>
            <h4 className="text-xs font-black text-[#0b2545] uppercase tracking-wider">📊 Wochentag-Preistendenz</h4>
            <p className="text-[10px] text-slate-400 font-semibold">Buchen Sie an den grünen Tagen, um zusätzliche Gebühren zu sparen.</p>
          </div>
          <div className="flex items-end justify-between pt-4 h-24 max-w-md mx-auto gap-2 border-b">
            {days.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-500">{d.price}€</span>
                <div 
                  className={`w-full rounded-t-md transition-all duration-500 ${d.active ? 'bg-emerald-500' : 'bg-blue-900/40'}`} 
                  style={{ height: `${(d.price / basePrice) * 40}px` }}
                ></div>
                <span className={`text-[10px] font-black ${d.active ? 'text-emerald-600' : 'text-slate-400'}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
