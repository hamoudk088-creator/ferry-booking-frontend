"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareCode, Send, Bot, X } from 'lucide-react';
import { LOCALES } from './locales';

export default function AiChatbot({ currentLang }: { currentLang: string }) {
  const t = LOCALES[currentLang] || LOCALES.DE;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: t.botWelcome }]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scrollt automatisch nach unten, wenn neue Nachrichten kommen
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Aktualisiert die Begrüßung des Bots live, wenn die Sprache auf der Webseite wechselt
  useEffect(() => {
    setMessages([{ sender: 'bot', text: t.botWelcome }]);
  }, [currentLang, t.botWelcome]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      let reply = t.resDefault;
      if (text.includes('Dokument') || text.includes('وثائق') || text.includes('document')) reply = t.resDok;
      else if (text.includes('Hafen') || text.includes('ميناء') || text.includes('port')) reply = t.resHafen;
      else if (text.includes('Anhänger') || text.includes('مقطورة') || text.includes('remorque')) reply = t.resTrailer;
      setMessages([...newMsgs, { sender: 'bot', text: reply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-slate-950 font-sans">
      
      {/* CHAT ICON BUTTON */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-[#0b2545] text-amber-400 p-4 rounded-full shadow-2xl border-2 border-amber-400 animate-bounce flex items-center justify-center hover:scale-105 transition-transform">
          <MessageSquareCode className="h-6 w-6" />
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-white w-[350px] h-[460px] rounded-[24px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-fade-in">
          
          {/* BOT HEADER */}
          <div className="bg-[#0b2545] text-white p-4 flex justify-between items-center border-b border-slate-800">
            <span className="font-black text-xs md:text-sm tracking-wide">MEDFERRIES KI</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* MESSAGE STREAM */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2.5 rounded-xl text-xs font-semibold max-w-[80%] leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-800 border shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* QUICK BUTTONS */}
          <div className="p-2 border-t border-slate-100 flex flex-wrap gap-1 bg-white">
            <button type="button" onClick={() => handleSend(t.fastQ1)} className="text-[9px] font-bold bg-slate-100 hover:bg-amber-400 hover:text-slate-950 p-1.5 rounded-lg border transition-colors">{t.fastQ1}</button>
            <button type="button" onClick={() => handleSend(t.fastQ2)} className="text-[9px] font-bold bg-slate-100 hover:bg-amber-400 hover:text-slate-950 p-1.5 rounded-lg border transition-colors">{t.fastQ2}</button>
            <button type="button" onClick={() => handleSend(t.fastQ3)} className="text-[9px] font-bold bg-slate-100 hover:bg-amber-400 hover:text-slate-950 p-1.5 rounded-lg border transition-colors">{t.fastQ3}</button>
          </div>

          {/* INPUT FIELD */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="p-2 border-t border-slate-100 flex gap-2 bg-white">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.botPlaceholder} className="flex-1 bg-slate-50 border p-2 rounded-xl text-xs focus:outline-none font-semibold text-slate-900" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow transition-colors"><Send className="h-3.5 w-3.5" /></button>
          </form>

        </div>
      )}
    </div>
  );
}
