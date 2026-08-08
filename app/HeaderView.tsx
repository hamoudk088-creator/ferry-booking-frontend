"use client";

import React, { useState } from 'react';
import { Ship, Globe, ChevronDown, Radio, LogOut, User } from 'lucide-react';
import { LOCALES } from './locales';
import PaymentMethodsModal from './PaymentMethodsModal';
import AuthModalView from './AuthModalView'; // <-- Hier importiert!

export default function HeaderView({ currentLang, setCurrentLang }: any) {
  const [modal, setModal] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Status: Login-Erkennung
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInName, setLoggedInName] = useState('Mohamed Ali');

  // Formular-Zustände
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'error' | 'success' | 'loading' | null>(null);

  const t = LOCALES[currentLang] || LOCALES.DE;
  const languages = [
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'AR', label: 'العربية', flag: '🇩🇿' },
    { code: 'FR', label: 'Français', flag: '🇫🇷' }
  ];

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage("⏳ Daten werden übertragen...");
    setStatusType('loading');

    if (authMode === 'register') {
      try {
        const response = await fetch('http://127.0.0', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, phone, birthDate })
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setStatusType('success');
          setInfoMessage("✅ Registrierung erfolgreich durchgeführt!");
          setLoggedInName(name);
          setTimeout(() => {
            setModal(null); setInfoMessage(null); setStatusType(null);
            setIsLoggedIn(true);
          }, 2000);
        } else {
          setStatusType('error');
          setInfoMessage(`❌ ${data.error || "Fehler aufgetreten."}`);
        }
      } catch (err) {
        setStatusType('error');
        setInfoMessage("❌ Verbindungsfehler zum lokalen Registrierungs-Server.");
      }
    } else {
      setModal(null);
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      {/* TERMINAL STATUS LIVE TICKER */}
      <div className="bg-[#0b2545] text-amber-400 text-[10px] font-black uppercase tracking-widest py-1.5 px-6 flex justify-between items-center border-b border-sky-950 print-hidden">
        <div className="flex items-center gap-1.5 animate-pulse"><Radio className="h-3 w-3 text-red-500" /> Live Terminal Status</div>
        <marquee className="max-w-xl cursor-pointer">⚓ Marseille Terminal 1: Einschiffung geöffnet • ⚓ Algiers Port: Abfertigung läuft flüssig</marquee>
        <span className="text-slate-400 font-mono text-[9px]">UTC +1</span>
      </div>

      <header className="bg-amber-400/90 backdrop-blur-md border-b border-amber-500 sticky top-0 z-50 shadow-md px-6 py-4 flex justify-between items-center text-slate-950 print-hidden">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-[#0b2545] p-2.5 rounded-2xl text-amber-400 shadow-lg flex items-center justify-center"><Ship className="h-5 w-5" /></div>
          <span className="text-xl font-black text-slate-950 tracking-tight">NISOU<span className="text-blue-600">FERRIES</span></span>
        </div>
        
        <div className="flex items-center space-x-5 text-xs font-bold text-[#0b2545]">
          <button onClick={() => setModal('about')} className="hover:underline">{t.about}</button>
          <button onClick={() => setModal('pay')} className="hover:underline">{t.pay}</button>
          <button onClick={() => setModal('contact')} className="hover:underline">{t.contact}</button>
          
          <div className="relative">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1 bg-white/40 hover:bg-white/70 px-3 py-1.5 rounded-xl border border-amber-500 transition-all font-black">
              <Globe className="h-3.5 w-3.5" />
              <span>{languages.find(l => l.code === currentLang)?.flag} {currentLang}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl py-1.5 w-36 z-50 text-slate-800">
                {languages.map(lang => (
                  <button key={lang.code} type="button" onClick={() => { setCurrentLang(lang.code); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-black hover:bg-amber-400 flex items-center gap-2">
                    <span>{lang.flag}</span><span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-emerald-600/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              <span className="text-[#0b2545] font-black uppercase text-[11px]">ID: {loggedInName.split(' ')[0]}</span>
              <button type="button" onClick={() => setIsLoggedIn(false)} className="text-red-700 hover:text-red-900 border-l border-emerald-500/20 pl-2 flex items-center">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button onClick={() => { setInfoMessage(null); setAuthMode('login'); setModal('auth'); }} className="bg-[#0b2545] text-white font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
              <User className="h-3.5 w-3.5" /> {t.login}
            </button>
          )}
        </div>
      </header>

      {modal === 'pay' && <PaymentMethodsModal onClose={() => setModal(null)} currentLang={currentLang} />}
      
      {modal === 'auth' && (
        <AuthModalView 
          onClose={() => setModal(null)} authMode={authMode} setAuthMode={setAuthMode} infoMessage={infoMessage} statusType={statusType} handleAuthSubmit={handleAuthSubmit}
          name={name} setName={setName} phone={phone} setPhone={setPhone} birthDate={birthDate} setBirthDate={setBirthDate} email={email} setEmail={setEmail} password={password} setPassword={setPassword} t={t}
        />
      )}

      {modal && modal !== 'auth' && modal !== 'pay' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative border text-slate-800">
            <button onClick={() => setModal(null)} className="absolute top-3 right-4 font-bold text-slate-400">✕</button>
            <p className="text-xs font-bold text-slate-700">{modal === 'about' ? t.aboutText : t.contactText}</p>
          </div>
        </div>
      )}
    </>
  );
}
