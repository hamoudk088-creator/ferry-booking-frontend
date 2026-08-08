"use client";

import React from 'react';
import { ShieldCheck, Anchor, Headphones, HelpCircle } from 'lucide-react';
import { LOCALES } from './locales';

export default function LandingContent({ currentLang }: { currentLang: string }) {
  const t = LOCALES[currentLang] || LOCALES.DE;

  return (
    <div className="mt-16 space-y-16 text-left">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.routeTitle}</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">{t.routeDesc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { from: 'Marseille 🇫🇷', to: 'Algier 🇩🇿', price: '195€' },
            { from: 'Marseille 🇫🇷', to: 'Tunis 🇹🇳', price: '180€' },
            { from: 'Alicante 🇪🇸', to: 'Oran 🇩🇿', price: '210€' }
          ].map((r, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between h-36">
              <h3 className="text-base font-black text-slate-900">{r.from} ➔ {r.to}</h3>
              <div className="flex justify-between items-baseline border-t pt-3">
                <span className="text-xs font-bold text-slate-400">{t.ticketFrom}</span>
                <span className="text-lg font-black text-blue-600">{r.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-3xl border shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><ShieldCheck /></div>
          <div><h4 className="font-black text-sm">{t.badge1Title}</h4><p className="text-xs text-slate-500 mt-1">{t.badge1Desc}</p></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Anchor /></div>
          <div><h4 className="font-black text-sm">{t.badge2Title}</h4><p className="text-xs text-slate-500 mt-1">{t.badge2Desc}</p></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Headphones /></div>
          <div><h4 className="font-black text-sm">{t.badge3Title}</h4><p className="text-xs text-slate-500 mt-1">{t.badge3Desc}</p></div>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-black text-slate-900 text-center flex items-center justify-center gap-2"><HelpCircle className="text-sky-500" /> {t.faqTitle}</h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h4 className="font-bold text-slate-900 text-xs md:text-sm">🔹 {t.faq1Q}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-1.5 border-t pt-2">{t.faq1A}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h4 className="font-bold text-slate-900 text-xs md:text-sm">🔹 {t.faq2Q}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-1.5 border-t pt-2">{t.faq2A}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
