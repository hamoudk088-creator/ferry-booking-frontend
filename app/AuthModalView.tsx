"use client";

import React from 'react';

export default function AuthModalView({ onClose, authMode, setAuthMode, infoMessage, statusType, handleAuthSubmit, name, setName, phone, setPhone, birthDate, setBirthDate, email, setEmail, password, setPassword, t }: any) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-[28px] max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 text-left space-y-5 animate-scale-up">
        <button type="button" onClick={onClose} className="absolute top-4 right-5 font-black text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">{t.authTitle}</h3>
        
        <div className="flex bg-slate-100 p-1 rounded-xl w-full border">
          <button type="button" onClick={() => setAuthMode('login')} className={`w-1/2 py-2 rounded-lg text-xs font-bold transition-all ${authMode === 'login' ? 'bg-[#0b2545] text-white shadow' : 'text-slate-500'}`}>{t.loginBtn}</button>
          <button type="button" onClick={() => setAuthMode('register')} className={`w-1/2 py-2 rounded-lg text-xs font-bold transition-all ${authMode === 'register' ? 'bg-[#0b2545] text-white shadow' : 'text-slate-500'}`}>{t.registerBtn}</button>
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
          <button type="submit" className="w-full bg-blue-600 text-white font-black py-3 rounded-xl text-xs shadow-md uppercase tracking-wider">
            {authMode === 'login' ? t.loginBtn : t.registerBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
