"use client";

import React from 'react';
import { Shield, Anchor, CheckCircle2, HelpCircle } from 'lucide-react';
import { LOCALES } from './locales';

export default function LandingContent({ currentLang }: { currentLang: string }) {
  const t = LOCALES[currentLang] || LOCALES.DE;

  return (
    <div className="space-y-12 mt-12 print-hidden text-left font-sans text-slate-900">
      
      {/* SEKTION 1: 3 SMART-BADGES (OFFIZIELLE TARIFE, SUPPORTS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-start gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-600 rounded-xl shrink-0"><Shield className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-black text-[#0b2545]">{t.badge1Title || "Offizielle Tarife"}</h4>
            <p className="text-[11px] text-slate-400 font-semibold mt-1 leading-relaxed">{t.badge1Desc || "Direkte Anbindung an Reedereien ohne Aufschlag."}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-start gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-600 rounded-xl shrink-0"><Anchor className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-black text-[#0b2545]">{t.badge2Title || "Garantierte Kabine"}</h4>
            <p className="text-[11px] text-slate-400 font-semibold mt-1 leading-relaxed">{t.badge2Desc || "Sichern Sie sich Ihren Schlafplatz auf dem Schiff."}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-start gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-600 rounded-xl shrink-0"><CheckCircle2 className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-black text-[#0b2545]">{t.badge3Title || "24/7 Support"}</h4>
            <p className="text-[11px] text-slate-400 font-semibold mt-1 leading-relaxed">{t.badge3Desc || "Unser mehrsprachiges Team hilft am Hafenterminal."}</p>
          </div>
        </div>
      </div>

      {/* SEKTION 2: OFFIZIELLE BUCHUNGS-PARTNER */}
      <div className="bg-slate-50 border p-6 rounded-3xl text-center space-y-4">
        <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block">
          {t.partnerTitle || "OFFIZIELLE BUCHUNGSPARTNER IM MITTELMEERRAUM"}
        </span>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-xs font-black font-mono text-slate-400/80">
          <span className="hover:text-red-600 transition-colors cursor-pointer">🔴 CORSICA LINEA</span>
          <span className="hover:text-emerald-600 transition-colors cursor-pointer">🟢 ALGÉRIE FERRIES</span>
          <span className="hover:text-blue-600 transition-colors cursor-pointer">🔵 CTN TUNISIA</span>
          <span className="hover:text-cyan-600 transition-colors cursor-pointer">⚓ BALEARIA</span>
        </div>
      </div>

      {/* SEKTION 3: HÄUFIG GESTELLTE FRAGEN (FAQ) */}
      <div className="bg-white border rounded-[32px] p-6 md:p-8 shadow-xl space-y-5">
        <h3 className="text-lg font-black text-[#0b2545] border-b pb-2 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-cyan-500" /> {t.faqTitle || "Häufig gestellte Fragen (FAQ)"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700 leading-relaxed">
          <div className="bg-slate-50 p-4 rounded-2xl border">
            <p className="text-[#0b2545] font-black text-sm mb-1">🚢 {t.faq1Q || "Wann muss ich zur Einschiffung eintreffen?"}</p>
            <p className="text-slate-400 font-medium">{t.faq1A || "Mit Fahrzeug ca. 3-4 Stunden vor Abfahrt am Hafentor für die Zollkontrolle."}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border">
            <p className="text-[#0b2545] font-black text-sm mb-1">🍽️ {t.faq2Q || "Sind Mahlzeiten an Bord inklusive?"}</p>
            <p className="text-slate-400 font-medium">{t.faq2A || "Abhängig vom gewählten Reederei-Tarif. Sie können Vollpension flexibel hinzubuchen."}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
