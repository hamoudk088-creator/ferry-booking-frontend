"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, RefreshCw, Cpu } from 'lucide-react';

export default function SecurityTerminal({ isPaying, finalPrice }: { isPaying: boolean; finalPrice: number }) {
  const [logText, setLogText] = useState("Status: Bereit für Transaktion...");

  useEffect(() => {
    if (isPaying) {
      setLogText("🔑 Initialisiere AES-256 Bit RSA-Schlüssel...");
      const t1 = setTimeout(() => setLogText("🔏 Verschlüssele Passagier-Grenzdaten..."), 4000);
      const t2 = setTimeout(() => setLogText("📡 Sende tokenisierten Payload an Stripe-Netzwerk..."), 9000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setLogText("Status: Bereit für Transaktion...");
    }
  }, [isPaying]);

  return (
    <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-[10px] border border-slate-800 space-y-3 shadow-inner text-left">
      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-400">
          <Cpu className="h-3.5 w-3.5 text-blue-500" /> SECURE GATEWAY
        </div>
        <span className="text-slate-500 text-[9px]">TLS 1.3 ACTIVE</span>
      </div>

      <div className="space-y-1">
        <p className="text-slate-500">// NETWORK PROTOCOL LOG:</p>
        <p className={`${isPaying ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>{logText}</p>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-slate-400 font-sans font-bold">
        <div className="flex items-center gap-1 text-[11px]">
          <Lock className="h-3 w-3 text-emerald-500" /> End-to-End Encrypted
        </div>
        <span className="text-emerald-400 font-mono text-xs">{finalPrice} €</span>
      </div>
    </div>
  );
}
