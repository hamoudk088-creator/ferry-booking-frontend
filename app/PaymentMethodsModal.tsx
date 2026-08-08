"use client";

import React from 'react';
import { CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodsModal({ onClose, currentLang }: { onClose: () => void; currentLang: string }) {
  
  // Trilinguale Texte für das Zahlungsmodal
  const textConfig: any = {
    DE: { title: "Unterstützte Zahlungsarten", desc: "Alle Transaktionen sind über das Stripe-Netzwerk militärisch verschlüsselt.", security: "PCI-DSS Level 1 zertifiziert" },
    FR: { title: "Modes de paiement", desc: "Toutes les transactions sont cryptées via le réseau Stripe.", security: "Certifié PCI-DSS Niveau 1" },
    AR: { title: "طرق الدفع المدعومة", desc: "جميع المعاملات مشفرة بالكامل عبر شبكة Stripe الآمنة.", security: "معتمد ومتوافق مع PCI-DSS" }
  };

  const currentText = textConfig[currentLang] || textConfig.DE;

  const methods = [
    { id: 1, name: "Stripe Gateway", icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />, desc: "Live API Integration" },
    { id: 2, name: "Visa / Mastercard", icon: <CreditCard className="h-5 w-5 text-blue-500" />, desc: "3D-Secure 2.0 active" },
    { id: 3, name: "Apple & Google Pay", icon: <Smartphone className="h-5 w-5 text-slate-900" />, desc: "One-Click Mobile Wallet" },
    { id: 4, name: "Klarna / Sofort", icon: <Wallet className="h-5 w-5 text-pink-500" />, desc: "Realtime Bank Transfer" }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-[28px] max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 text-left space-y-5 animate-scale-up">
        
        {/* Schließen-Kreuz */}
        <button type="button" onClick={onClose} className="absolute top-4 right-5 font-black text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">NISOUFERRIES SECURE NET</span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">{currentText.title}</h3>
          <p className="text-xs text-slate-400 font-semibold mt-1 leading-relaxed">{currentText.desc}</p>
        </div>

        {/* Die interaktiven Kacheln */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {methods.map((m) => (
            <div key={m.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3 shadow-inner hover:border-blue-400 transition-all">
              <div className="p-2 bg-white rounded-xl border shadow-sm shrink-0">{m.icon}</div>
              <div>
                <p className="text-xs font-black text-slate-900">{m.name}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grüner Sicherheitsbalken */}
        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-xs font-black text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>🛡️ {currentText.security}</span>
        </div>

      </div>
    </div>
  );
}
