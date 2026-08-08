"use client";

import React, { useState, useEffect } from 'react';
import { Compass, Ship, Wifi } from 'lucide-react';

export default function AnimatedMap({ currentLang }: { currentLang: string }) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* 🚀 REIN-DIGITALE DESIGN-OPTIMIERUNG: 100% bündig direkt am Header (mt-0) im edlen Türkis-Look */
    <div className="w-full bg-cyan-950 py-5 px-4 md:px-6 relative overflow-hidden border-b-2 border-cyan-500/20 mt-0 print-hidden select-none">
      
      {/* GEOMETRISCHES DESIGN-NETZ IM HINTERGRUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:40px_35px]"></div>

      {/* BREITE AUF MAX-W-7XL FÜR SCREEN-FILLING DESIGN */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* STATUSTEXT ZEILE */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[10px] font-black tracking-widest uppercase">
            <Compass className="h-3.5 w-3.5 animate-spin duration-5000" /> NISOU MARITIME ROUTING SYSTEM
          </div>
          <div className="flex items-center gap-3 font-mono text-[9px] text-amber-300/70 font-bold">
            <span className="flex items-center gap-1 text-emerald-400"><Wifi className="h-3 w-3" /> NETWORK STATUS: OPERATIONAL</span>
          </div>
        </div>

        {/* 🗺️ INTERAKTIVES LINIE-BOARD (px-10 / md:px-20) */}
        <div className="w-full h-44 bg-cyan-900/40 rounded-2xl relative overflow-hidden border border-cyan-500/30 shadow-2xl flex items-center justify-between px-10 md:px-20">
          
          {/* LINKER BLOCK: SÜDEUROPA TERMINALS */}
          <div className="flex flex-col gap-4 relative z-20 text-left">
            <span className="text-[9px] font-black text-amber-300/60 uppercase tracking-widest block mb-1">⚓ DEPARTURES</span>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white border border-cyan-950 z-10 shadow-sm"></div>
              <span className="text-xs font-black text-amber-300 font-mono tracking-wide">MARSEILLE 🇫🇷</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white border border-cyan-950 z-10"></div>
              <span className="text-xs font-black text-amber-300 font-mono tracking-wide">ALICANTE 🇪🇸</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white border border-cyan-950 z-10"></div>
              <span className="text-xs font-black text-amber-300 font-mono tracking-wide">GENUA 🇮🇹</span>
            </div>
          </div>

          {/* MITTLERER BEREICH: ANIMIERTE TRANSIT-VEKTOREN */}
          <div className="flex-1 h-full relative mx-6 hidden sm:block">
            {/* Feine, elegante gepunktete Verbindungslinien */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://w3.org">
              <line x1="5%" y1="30%" x2="95%" y2="30%" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="5%" y1="55%" x2="95%" y2="55%" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="5%" y1="80%" x2="95%" y2="80%" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="5 4" />
            </svg>

            {/* Sanft gleitende Deko-Schiffs-Silhouetten */}
            <div className="absolute text-cyan-300" style={{ animation: 'transitShip 20s linear infinite', top: '18%' }}>
              <Ship className="h-4 w-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </div>
            <div className="absolute text-white/40" style={{ animation: 'transitShip 26s linear infinite', top: '44%' }}>
              <Ship className="h-4 w-4" />
            </div>
            <div className="absolute text-cyan-400" style={{ animation: 'transitShip 22s linear infinite', top: '69%' }}>
              <Ship className="h-4 w-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </div>
          </div>

          {/* RECHTER BLOCK: NORDAFRIKA ZIELHÄFEN */}
          <div className="flex flex-col gap-4 text-right relative z-20">
            <span className="text-[9px] font-black text-amber-300/60 uppercase tracking-widest block mb-1">⚓ ARRIVALS</span>
            
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-black text-amber-300 font-mono tracking-wide">ALGIER 🇩🇿</span>
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 z-10 border border-cyan-950"></div>
                <div className={`w-3.5 h-3.5 rounded-full bg-cyan-400/30 absolute ${pulse ? 'scale-125' : 'scale-100'} transition-transform duration-1000`}></div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-black text-amber-300 font-mono tracking-wide">ORAN 🇩🇿</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 z-10 border border-cyan-950"></div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-black text-amber-300 font-mono tracking-wide">TUNIS 🇹🇳</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 z-10 border border-cyan-950"></div>
            </div>
          </div>

        </div>
      </div>

      {/* FLÜSSIGER TRANSIT-FLOW */}
      <style>{`
        @keyframes transitShip {
          0% { left: 0%; transform: scaleX(1); }
          49% { transform: scaleX(1); }
          50% { left: 90%; transform: scaleX(-1); }
          99% { transform: scaleX(-1); }
          100% { left: 0%; transform: scaleX(1); }
        }
      `}</style>

    </div>
  );
}
