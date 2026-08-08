"use client";

import React from 'react';
import { Armchair, BedDouble, ShieldCheck } from 'lucide-react';

export default function CabinGridSelector({ selectedSeat, onSelectSeat }: any) {
  // Professionelles Schiffs-Layout: Reale Decks-Struktur
  const decks = [
    { id: "C-101", type: "cabin", label: "Suite 101", price: 60, status: "free" },
    { id: "C-102", type: "cabin", label: "Suite 102", price: 60, status: "occupied" },
    { id: "C-103", type: "cabin", label: "Luxus 103", price: 90, status: "free" },
    { id: "C-104", type: "cabin", label: "Suite 104", price: 60, status: "free" },
    { id: "S-201", type: "seat", label: "Sessel A1", price: 20, status: "free" },
    { id: "S-202", type: "seat", label: "Sessel A2", price: 20, status: "occupied" },
    { id: "S-203", type: "seat", label: "Sessel B1", price: 20, status: "free" },
    { id: "S-204", type: "seat", label: "Sessel B2", price: 20, status: "free" },
  ];

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-left font-mono text-xs text-slate-300">
      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
        <span className="text-cyan-400 font-black tracking-widest text-[10px]">🚢 LIVE DECKPLAN // CHOOSE ACCOMMODATION</span>
        <span className="text-[9px] text-slate-500">DECK 4 &amp; 5</span>
      </div>

      {/* Legende */}
      <div className="flex gap-4 text-[9px] font-sans text-slate-400 font-bold">
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-cyan-500/20 border border-cyan-500 rounded"></div> Frei</div>
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-slate-800 border border-slate-700 rounded opacity-40"></div> Belegt</div>
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-amber-400 rounded"></div> Ihre Wahl</div>
      </div>

      {/* Das interaktive Grid-System */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {decks.map((slot) => {
          const isOccupied = slot.status === "occupied";
          const isSelected = selectedSeat?.id === slot.id;

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isOccupied}
              onClick={() => onSelectSeat(slot)}
              className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all duration-200 ${
                isOccupied
                  ? 'bg-slate-900/50 border-slate-800/40 opacity-30 cursor-not-allowed'
                  : isSelected
                    ? 'bg-amber-400 border-amber-500 text-slate-950 font-black shadow-lg shadow-amber-400/10 scale-[1.01]'
                    : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {slot.type === "cabin" ? <BedDouble className="h-3.5 w-3.5 text-cyan-400 print:text-black" /> : <Armchair className="h-3.5 w-3.5 text-slate-400" />}
                <span className="font-sans text-[11px] font-bold">{slot.label}</span>
              </div>
              <span className="text-[10px] font-bold opacity-80">+{slot.price} €</span>
            </button>
          );
        })}
      </div>

      {selectedSeat && (
        <div className="bg-cyan-500/5 border border-cyan-500/20 p-2.5 rounded-xl flex items-center gap-2 text-[10px] text-cyan-400 font-sans font-bold animate-fade-in">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Sitzplatz {selectedSeat.label} erfolgreich für Ihre Familie reserviert!</span>
        </div>
      )}
    </div>
  );
}
