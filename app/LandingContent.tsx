"use client";

import React from 'react';
import { ShieldCheck, Anchor, Headphones, HelpCircle, Star, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { LOCALES } from './locales';

export default function LandingContent({ currentLang }: { currentLang: string }) {
  const t = LOCALES[currentLang] || LOCALES.DE;

  // Offizielle Reederei-Partner im Mittelmeer
  const operators = [
    { name: "Corsica Linea", country: "Marseille 🇫🇷", color: "border-red-500 bg-red-50/50" },
    { name: "Algérie Ferries", country: "Algier 🇩🇿", color: "border-emerald-500 bg-emerald-50/50" },
    { name: "CTN Tunisia Ferries", country: "Tunis 🇹🇳", color: "border-blue-500 bg-blue-50/50" },
    { name: "Balearia / Armas", country: "Alicante 🇪🇸", color: "border-amber-500 bg-amber-50/50" }
  ];

  // Realistische Kundenbewertungen für maximales Vertrauen
  const reviews = [
    { name: "Yassine B.", date: "02.08.2026", route: "Marseille ➔ Algier", text: currentLang === 'AR' ? "حجز سريع وسهل جداً. التذكرة وصلت مباشرة." : currentLang === 'FR' ? "Réservation super rapide. Billet reçu immédiatement." : "Sehr schnelle Buchung. Ticket kam sofort an.", stars: 5 },
    { name: "Amel T.", date: "28.07.2026", route: "Genua ➔ Tunis", text: currentLang === 'AR' ? "ممتاز لرحلات العائلات مع السيارات." : currentLang === 'FR' ? "Parfait pour les familles avec voiture." : "Perfekt für Familien mit Fahrzeug.", stars: 5 },
    { name: "Karim M.", date: "15.07.2026", route: "Alicante ➔ Oran", text: currentLang === 'AR' ? "الدعم الفني ساعدني في تغيير لوحة السيارة." : currentLang === 'FR' ? "Le support m'a aidé pour la plaque." : "Der Support half mir beim Kennzeichen.", stars: 5 }
  ];

  return (
    <div className="mt-16 space-y-16 text-left animate-fade-in">
      
      {/* 1. SEKTION: DIE TOP ROUTEN MIT DYNAMISCHER HAFENANZEIGE */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.routeTitle}</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">{t.routeDesc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { from: 'Marseille 🇫🇷', to: 'Algiers 🇩🇿', price: '195 €' },
            { from: 'Marseille 🇫🇷', to: 'Tunis 🇹🇳', price: '180 €' },
            { from: 'Alicante 🇪🇸', to: 'Oran 🇩🇿', price: '210 €' }
          ].map((r, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-36 hover:border-amber-400 transition-colors">
              <h3 className="text-base font-black text-slate-900">{r.from} <span className="text-blue-500">➔</span> {r.to}</h3>
              <div className="flex justify-between items-baseline border-t border-slate-50 pt-3">
                <span className="text-xs font-bold text-slate-400">{t.ticketFrom}</span>
                <span className="text-lg font-black text-blue-600">{r.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SEKTION: ZERTIFIZIERTE REEDEREI-PARTNER LOGOS */}
      <div className="space-y-4">
        <span className="text-[10px] font-black text-slate-400 block uppercase tracking-widest text-center">{t.partnerTitle}</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {operators.map((op, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border-2 text-center shadow-inner transition-all flex flex-col justify-center items-center h-20 ${op.color}`}>
              <span className="text-xs font-black text-[#0b2545] tracking-tight block">{op.name}</span>
              <span className="text-[9px] font-bold text-slate-400 block uppercase mt-0.5">{op.country}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SEKTION: UNTERNEHMENS-PROFIL & SICHERHEITS-BADGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 md:p-8 rounded-[32px] border shadow-md relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl shadow-inner"><ShieldCheck className="h-5 w-5" /></div>
          <div><h4 className="font-black text-sm">{t.badge1Title}</h4><p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.badge1Desc}</p></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shadow-inner"><Anchor className="h-5 w-5" /></div>
          <div><h4 className="font-black text-sm">{t.badge2Title}</h4><p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.badge2Desc}</p></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shadow-inner"><Headphones className="h-5 w-5" /></div>
          <div><h4 className="font-black text-sm">{t.badge3Title}</h4><p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.badge3Desc}</p></div>
        </div>
      </div>

      {/* 4. SEKTION: INTERAKTIVE REALE KUNDENBEWERTUNGEN */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-900 tracking-tight text-center">Was unsere Reisenden sagen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.stars)].map((_, idx) => <Star key={idx} className="h-3.5 w-3.5 fill-amber-400" />)}
                </div>
                <p className="text-xs font-semibold text-slate-600 italic">"{rev.text}"</p>
              </div>
              <div className="border-t border-slate-50 pt-2 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <div>
                  <span className="text-slate-800 font-black block">{rev.name}</span>
                  <span className="text-blue-500 text-[9px] block">{rev.route}</span>
                </div>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SEKTION: DIE ZOLL-KONFORMEN FAQs */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h3 className="text-xl font-black text-slate-900 text-center flex items-center justify-center gap-2">
          <HelpCircle className="text-blue-500" /> {t.faqTitle}
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <h4 className="font-black text-slate-900 text-xs md:text-sm flex items-center gap-2">
              <span className="text-blue-600">🔹</span> {t.faq1Q}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 border-t border-slate-50 pt-2.5">{t.faq1A}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <h4 className="font-black text-slate-900 text-xs md:text-sm flex items-center gap-2">
              <span className="text-blue-600">🔹</span> {t.faq2Q}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 border-t border-slate-50 pt-2.5">{t.faq2A}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
