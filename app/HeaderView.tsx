"use client";

import React, { useState } from 'react';
import { Ship, Globe, ChevronDown, Radio, User } from 'lucide-react';
import { LOCALES } from './locales';
import PaymentMethodsModal from './PaymentMethodsModal';
import ManageBookingView from './ManageBookingView';
import UserDashboardView from './UserDashboardView'; // <-- Hier importiert!

export default function HeaderView({ currentLang, setCurrentLang }: any) {
  const [modal, setModal] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = LOCALES[currentLang] || LOCALES.DE;

  // Login Simulation für das Dashboard-Handshake
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userEmail = "customer@nisouferries.com";

  return (
    <>
      <div className="bg-cyan-950 text-cyan-400 text-[10px] font-black uppercase tracking-widest py-1.5 px-6 flex justify-between items-center border-b border-cyan-900 print-hidden">
        <div className="flex items-center gap-1.5 animate-pulse"><Radio className="h-3 w-3 text-red-500" /> Terminal Live Stream</div>
        <marquee className="max-w-xl cursor-pointer font-bold">Marseille Port: Check-in geöffnet • Algiers Terminal: Transit flüssig</marquee>
        <span className="text-slate-400 font-mono text-[9px]">UTC +1</span>
      </div>

      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm px-6 py-4 flex justify-between items-center text-slate-900 print-hidden">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-[#0b2545] p-2.5 rounded-2xl text-amber-300 shadow-md flex items-center justify-center"><Ship className="h-5 w-5" /></div>
          <span className="text-xl font-black text-slate-950 tracking-tight">NISOU<span className="text-cyan-600">FERRIES</span></span>
        </div>
        
        <div className="flex items-center space-x-5 text-xs font-bold text-[#0b2545]">
          <button onClick={() => setModal('about')} className="hover:text-cyan-600 transition-colors">{t.about || "Über uns"}</button>
          <button onClick={() => setModal('manage_booking')} className="hover:text-cyan-600 transition-colors">🔍 Suchen</button>
          
          {isLoggedIn ? (
            /* ⚡ AKTIVIERTER PROFI-LINK ZUM KUNDENONTO */
            <button onClick={() => setModal('user_dashboard')} className="text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1.5 rounded-xl hover:bg-cyan-100 transition-all font-black flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Mein Konto
            </button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)} className="bg-[#0b2545] text-white px-3 py-1.5 rounded-xl font-black">Anmelden</button>
          )}
          
          <div className="relative">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all font-black">
              <Globe className="h-3.5 w-3.5 text-slate-500" />
              <span>DE</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      {modal === 'pay' && <PaymentMethodsModal onClose={() => setModal(null)} currentLang={currentLang} />}
      {modal === 'manage_booking' && <ManageBookingView onClose={() => setModal(null)} />}
      
      {/* 🚀 EXTENDED USER DASHBOARD BRIDGE RENDERED HERE */}
      {modal === 'user_dashboard' && (
        <UserDashboardView 
          onClose={() => setModal(null)} 
          userEmail={userEmail} 
          onTriggerManageBooking={(pnr) => { setModal('manage_booking'); }} 
        />
      )}

      {modal && modal !== 'pay' && modal !== 'manage_booking' && modal !== 'user_dashboard' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative border text-slate-800">
            <button onClick={() => setModal(null)} className="absolute top-3 right-4 font-bold text-slate-400">✕</button>
            <p className="text-xs font-bold text-slate-700">{t.aboutText || "NISOUFERRIES Premium Portal 2026."}</p>
          </div>
        </div>
      )}
    </>
  );
}
