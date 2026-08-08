"use client";

import React, { useState } from 'react';
import { Ship, User, Globe, ChevronDown } from 'lucide-react';
import { LOCALES } from './locales';

export default function HeaderView({ currentLang, setCurrentLang }: any) {
  const [modal, setModal] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Formular-Zustände
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'error' | 'success' | 'loading' | null>(null);

  const t = LOCALES[currentLang];
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
          setInfoMessage("✅ Registrierung erfolgreich! Ihr Konto ist aktiv.");
          
          setTimeout(() => {
            setModal(null);
            setInfoMessage(null);
            setStatusType(null);
            setName(''); setPhone(''); setBirthDate(''); setEmail(''); setPassword('');
          }, 2000);
        } else {
          setStatusType('error');
          setInfoMessage(`❌ ${data.error || "Fehler aufgetreten."}`);
        }
      } catch (err) {
        setStatusType('error');
        setInfoMessage("❌ Verbindungsfehler: Der Server auf Port 5000 antwortet nicht.");
      }
    } else {
      setModal(null);
      alert("Erfolgreich eingeloggt!");
    }
  };

  return (
    <>
      <header className="bg-amber-400 border-b border-amber-500 sticky top-0 z-50 shadow-md px-6 py-4 flex justify-between items-center text-slate-950">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-[#0b2545] p-2.5 rounded-2xl text-amber-400 shadow-lg flex items-center justify-center"><Ship className="h-5 w-5" /></div>
          <span className="text-xl font-black text-slate-950">MED<span className="text-[#0b2545]">FERRIES</span></span>
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

          <button onClick={() => { setInfoMessage(null); setAuthMode('login'); setModal('auth'); }} className="bg-[#0b2545] hover:bg-slate-800 text-white font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"><User className="h-3.5 w-3.5" /> {t.login}</button>
        </div>
      </header>

      {modal === 'auth' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-[28px] max-w-md w-full p-6 md:p-8 shadow-2xl relative border text-left space-y-5">
            <button onClick={() => setModal(null)} className="absolute top-4 right-5 font-bold text-slate-400 hover:text-slate-600">✕</button>
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">{t.authTitle}</h3>
            
            <div className="flex bg-slate-100 p-1 rounded-xl w-full border">
              <button type="button" onClick={() => { setInfoMessage(null); setAuthMode('login'); }} className={`w-1/2 py-2 rounded-lg text-xs font-bold transition-all ${authMode === 'login' ? 'bg-[#0b2545] text-white shadow' : 'text-slate-500'}`}>{t.loginBtn}</button>
              <button type="button" onClick={() => { setInfoMessage(null); setAuthMode('register'); }} className={`w-1/2 py-2 rounded-lg text-xs font-bold transition-all ${authMode === 'register' ? 'bg-[#0b2545] text-white shadow' : 'text-slate-500'}`}>{t.registerBtn}</button>
            </div>

            {infoMessage && (
              <div className={`p-3.5 rounded-xl text-xs font-black leading-relaxed shadow-sm ${statusType === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : statusType === 'loading' ? 'bg-blue-50 border border-blue-200 text-blue-900 animate-pulse' : 'bg-amber-50 border border-amber-200 text-amber-900'}`}>
                {infoMessage}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-3">
                  <input type="text" required placeholder="Vollständiger Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-3 rounded-xl text-xs font-semibold focus:outline-none" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="tel" required placeholder="Telefonnummer" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-3 rounded-xl text-xs font-semibold focus:outline-none" />
                    <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full border p-3 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer" />
                  </div>
                </div>
              )}
              <input type="email" required placeholder="E-Mail-Adresse" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-3 rounded-xl text-xs font-semibold focus:outline-none" />
              <input type="password" required placeholder="Sicheres Passwort" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-3 rounded-xl text-xs font-semibold focus:outline-none" />
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs shadow-md uppercase tracking-wider transition-colors">
                {authMode === 'login' ? t.loginBtn : t.registerBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
