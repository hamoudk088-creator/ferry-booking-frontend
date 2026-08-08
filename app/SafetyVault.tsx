"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Anchor, ShieldAlert, Wifi, ShieldEllipsis } from 'lucide-react';

export default function SafetyVault({ currentLang, vehicle }: { currentLang: string; vehicle: string }) {
  const [satelliteStatus, setSatelliteStatus] = useState("CALIBRATING...");
  const [shipLat, setShipLat] = useState(41.385);

  // Simuliert ein Live-Satelliten-Tracking des Fährschiffs auf dem Mittelmeer
  useEffect(() => {
    setSatelliteStatus("CONNECTED 🛰️");
    const interval = setInterval(() => {
      setShipLat(prev => prev + 0.002 > 43.000 ? 41.385 : prev + 0.002);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (vehicle === 'None') return null;

  return (
    <div className="bg-[#0b2545] text-white p-5 rounded-[28px] border border-slate-800 shadow-xl space-y-4 text-left animate-fade-in print:hidden">
      
      {/* HEADER: GRIDREF MAP SYSTEM */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <ShieldEllipsis className="h-4 w-4 text-amber-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">
            {currentLang === 'AR' ? 'نظام جمارك آمن' : 'GRIDREF: SKY-MAP SYSTEM'}
          </span>
        </div>
        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
          {satelliteStatus}
        </span>
      </div>

      {/* INTELLIGENTE GRENZKONTROLL-AMPEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        
        {/* RADAR TRACKING */}
        <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] font-black text-slate-500 uppercase block tracking-wider">Live Ship Position</span>
            <span className="text-xs font-mono font-black text-slate-200">LAT {shipLat.toFixed(4)}° N</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
        </div>

        {/* ZOLLFREIGABE LEVEL */}
        <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] font-black text-slate-500 uppercase block tracking-wider">Encryption Level</span>
            <span className="text-xs font-mono font-black text-slate-200">AES-256 BIT / SSL</span>
          </div>
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        </div>

      </div>

      {/* SICHERHEITSHINWEIS */}
      <p className="text-[10px] text-slate-400 font-semibold leading-relaxed border-t border-slate-800 pt-2.5">
        ℹ️ {currentLang === 'AR' 
          ? "تشفير البيانات فوري. يتم إرسال أرقام جوازات السفر ولوحات السيارات مباشرة إلى نظام أمن الموانئ لتسريع عملية الدخول." 
          : "Verschlüsselte Datenübermittlung aktiv. Ihre Reisepass- und Kennzeichendaten werden verschlüsselt an die Hafenterminals übermittelt, um Grenzkontrollen vor Ort auf unter 5 Minuten zu verkürzen."}
      </p>

    </div>
  );
}
