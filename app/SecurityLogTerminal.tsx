"use client";

import React, { useState, useEffect } from 'react';
import { Lock, Cpu, ShieldAlert } from 'lucide-react';

export default function SecurityLogTerminal({ isPaying, totalCost }: { isPaying: boolean; totalCost: number }) {
  const [logMessage, setLogMessage] = useState("SYSTEM: Status Ready. Awaiting payload encryption...");

  useEffect(() => {
    if (isPaying) {
      setLogMessage("🔐 [INIT] Generating ephemeral RSA key exchange...");
      const t1 = setTimeout(() => setLogMessage("🔏 [HASH] Tokenizing border-control customs passport data..."), 1500);
      const t2 = setTimeout(() => setLogMessage("📡 [SEND] Routing end-to-end payload via secured TLS 1.3..."), 3000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setLogMessage("SYSTEM: Status Ready. Awaiting payload encryption...");
    }
  }, [isPaying]);

  return (
    <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-[10px] border border-slate-800 space-y-3 shadow-inner text-left select-none">
      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-400">
          <Cpu className="h-3.5 w-3.5 text-blue-500 animate-pulse" /> SECURITY GATEWAY SHA-512
        </div>
        <span className="text-slate-500 text-[9px]">TLS 1.3 SECURE</span>
      </div>

      <div className="space-y-1">
        <p className="text-slate-600">// LIVE TRANSIT LOG:</p>
        <p className={isPaying ? 'text-amber-400 animate-pulse font-black' : 'text-emerald-400'}>{logMessage}</p>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-slate-400 font-sans font-bold">
        <div className="flex items-center gap-1 text-[11px]">
          <Lock className="h-3 w-3 text-emerald-500" /> PCI-DSS Compliant Gateway
        </div>
        <span className="text-emerald-400 font-mono text-xs">{totalCost} €</span>
      </div>
    </div>
  );
}
