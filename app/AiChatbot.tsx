"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { LOCALES } from './locales';

export default function AiChatbot({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: 'bot', text: currentLang === 'AR' ? "مرحباً بك في الدعم الذكي لـ NISOUFERRIES! كيف يمكنني مساعدتك؟" : currentLang === 'FR' ? "Bienvenue sur l'assistance NISOUFERRIES ! Comment puis-je vous aider ?" : "Ahlan! Willkommen beim NISOUFERRIES KI-Support! Wie kann ich Ihnen helfen? 🚢" }
  ]);
  const [input, setInput] = useState('');
  const t = LOCALES[currentLang] || LOCALES.DE;

  const handleFastQuestion = (type: string) => {
    let reply = t.resDefault || "Bitte nutzen Sie die Buchungsmaske.";
    if (type === 'dok') reply = t.resDok || "🛂 Gültiger Reisepass und Fahrzeugpapiere notwendig.";
    if (type === 'port') reply = t.resHafen || "⚓ Bitte eintreffen Sie 3-4 Stunden vor Abfahrt am Hafen.";
    if (type === 'trailer') reply = t.resTrailer || "⚠️ Anhänger-Option im Cockpit aktivieren.";

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: type === 'dok' ? t.fastQ1 : type === 'port' ? t.fastQ2 : t.fastQ3 },
      { id: Date.now() + 1, sender: 'bot', text: reply }
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: input },
      { id: Date.now() + 1, sender: 'bot', text: "🤖 NISOU-KI: " + (t.resDefault || "Daten empfangen. Bitte nutzen Sie die Buchungsstrecke für Echtzeit-Preise.") }
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans text-slate-900 print-hidden">
      {!isOpen ? (
        <button type="button" onClick={() => setIsOpen(true)} className="bg-[#0b2545] hover:bg-slate-800 text-amber-300 p-4 rounded-full shadow-2xl flex items-center justify-center transition-all transform active:scale-95 border border-amber-500/20">
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-white border rounded-[24px] shadow-2xl w-80 md:w-88 flex flex-col h-96 overflow-hidden border-slate-100 animate-scale-up">
          {/* BOT HEADER */}
          <div className="bg-[#0b2545] text-white p-4 flex justify-between items-center border-b">
            <div className="flex items-center gap-2 font-mono text-[10px] font-black tracking-wider uppercase text-amber-300">
              <Bot className="h-4 w-4" /> NISOU CONCIERGE BOT
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
          </div>

          {/* CHAT-WINDOWS */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-bold max-h-[250px]">
            {messages.map(m => (
              <div key={m.id} className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${m.sender === 'bot' ? 'bg-slate-100 text-slate-800 mr-auto text-left' : 'bg-blue-600 text-white ml-auto text-right'}`}>
                {m.text}
              </div>
            ))}
          </div>

          {/* SNELLKLICK BUTTONS */}
          <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
            <button type="button" onClick={() => handleFastQuestion('dok')} className="bg-slate-50 border hover:bg-slate-100 text-[10px] font-bold text-slate-500 px-2 py-1 rounded-lg">{t.fastQ1 || "🛂 Dokumente?"}</button>
            <button type="button" onClick={() => handleFastQuestion('port')} className="bg-slate-50 border hover:bg-slate-100 text-[10px] font-bold text-slate-500 px-2 py-1 rounded-lg">{t.fastQ2 || "⚓ Check-in?"}</button>
            <button type="button" onClick={() => handleFastQuestion('trailer')} className="bg-slate-50 border hover:bg-slate-100 text-[10px] font-bold text-slate-500 px-2 py-1 rounded-lg">{t.fastQ3 || "⚠️ Anhänger?"}</button>
          </div>

          {/* FORMULAR INPUT */}
          <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.botPlaceholder || "Frage eingeben..."} className="flex-1 bg-white border px-3 py-2 rounded-xl text-xs focus:outline-none" />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow"><Send className="h-3.5 w-3.5" /></button>
          </form>
        </div>
      )}
    </div>
  );
}
