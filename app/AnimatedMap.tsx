"use client";

import React from 'react';
import { Anchor, Compass } from 'lucide-react';

export default function AnimatedMap() {
  return (
    <div className="w-full bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 border-b-4 border-[#0b2545] relative overflow-hidden py-20 px-6 sm:px-12 shadow-md">
      <style>{`
        @keyframes radarPulse {
          0% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(11, 37, 69, 0.4); }
          70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 16px rgba(11, 37, 69, 0); }
          100% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(11, 37, 69, 0); }
        }
        @keyframes shipSailing {
          0% { left: 10%; top: 25%; transform: scaleX(1) rotate(3deg); }
          45% { left: 85%; top: 70%; transform: scaleX(1) rotate(-1deg); }
          50% { left: 85%; top: 70%; transform: scaleX(-1) rotate(0deg); }
          95% { left: 10%; top: 25%; transform: scaleX(-1) rotate(-3deg); }
          100% { left: 10%; top: 25%; transform: scaleX(1) rotate(3deg); }
        }
        @keyframes wakeRipple {
          0% { opacity: 0.6; transform: scale(0.8); filter: blur(1px); }
          100% { opacity: 0; transform: scale(1.6); filter: blur(2px); }
        }
        .infinite-sea {
          background-image: 
            linear-gradient(rgba(11, 37, 69, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11, 37, 69, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .ship-anim {
          animation: shipSailing 26s ease-in-out infinite;
        }
        .pulse-dark { animation: radarPulse 2.5s infinite; }
      `}</style>

      {/* Das unendliche Meeresraster in edlem Marineblau auf himmelblauem Grund */}
      <div className="absolute inset-0 infinite-sea pointer-events-none"></div>

      {/* RIESIGE KOMPASSROSE IM HINTERGRUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] select-none text-[#0b2545]">
        <Compass className="w-[380px] h-[380px]" />
      </div>

      {/* KOORDINATEN TEXTE IN DUNKELBLAU */}
      <div className="absolute top-4 left-6 text-[9px] font-mono text-[#0b2545]/50 tracking-[0.2em] font-bold select-none">GRID REF: SKY-MAP SYSTEM</div>
      <div className="absolute bottom-4 left-6 text-[9px] font-mono text-[#0b2545]/50 tracking-[0.2em] font-bold select-none">SATELLITE SENSORS: CALIBRATED</div>

      {/* REISECONTAINER */}
      <div className="max-w-[1300px] mx-auto h-64 relative">
        
        {/* EUROPA HÄFEN (OBEN LINKS) */}
        <div className="absolute top-2 left-4 text-left z-10">
          <span className="text-[10px] font-black text-[#0b2545] uppercase tracking-[0.2em] block mb-2 drop-shadow-sm">⚓ Südeuropa / Europe</span>
          <div className="flex flex-wrap gap-3">
            <span className="pulse-dark flex items-center gap-1.5 text-xs font-black text-white bg-[#0b2545] px-4 py-2 rounded-2xl shadow-xl border border-slate-900">
              <Anchor className="h-3.5 w-3.5 text-amber-400" /> MARSEILLE 🇫🇷
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-black text-[#0b2545] bg-white/70 px-3 py-2 rounded-2xl border border-[#0b2545]/20">
              <Anchor className="h-3.5 w-3.5" /> GENUA 🇮🇹
            </span>
          </div>
        </div>

        {/* DUNKELBLAUE ROUTEN-LINIE */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 150 70 Q 450 130 850 190" fill="none" stroke="#0b2545" strokeWidth="2.5" strokeDasharray="10,8" className="opacity-35" />
        </svg>

        {/* DAS SCHIFF MIT DESIGN-WELLE */}
        <div className="absolute ship-anim text-5xl z-30 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] select-none">
          🚢
          <span className="absolute -left-5 top-5 w-8 h-4 bg-[#0b2545]/15 rounded-full blur-sm animate-[wakeRipple_1.3s_infinite]"></span>
        </div>

        {/* NORD-AFRIKA HÄFEN (UNTEN RECHTS) */}
        <div className="absolute bottom-2 right-4 text-right z-10">
          <span className="text-[10px] font-black text-[#0b2545] uppercase tracking-[0.2em] block mb-2 drop-shadow-md">⚓ Nordafrika / Maghreb</span>
          <div className="flex flex-wrap gap-3 justify-end">
            <span className="pulse-dark flex items-center gap-1.5 text-xs font-black text-white bg-[#0b2545] px-4 py-2 rounded-2xl shadow-xl border border-slate-900">
              <Anchor className="h-3.5 w-3.5 text-amber-400" /> ALGIER 🇩🇿
            </span>
            <span className="pulse-dark flex items-center gap-1.5 text-xs font-black text-white bg-[#0b2545] px-4 py-2 rounded-2xl shadow-xl border border-slate-900">
              <Anchor className="h-3.5 w-3.5 text-amber-400" /> TUNIS 🇹🇳
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
