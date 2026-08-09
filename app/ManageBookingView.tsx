"use client";

import React, { useState } from 'react';
import { Search, RefreshCw, XCircle, Printer, Mail, ArrowLeft } from 'lucide-react';
import ModifyBookingForm from './ModifyBookingForm'; // <-- Hier importiert!

export default function ManageBookingView({ onClose }: { onClose: () => void }) {
  const [pnrInput, setPnrInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [subStage, setSubStage] = useState<'search' | 'dashboard' | 'modify'>('search');

  const [editDate, setEditDate] = useState('2026-08-15');
  const [editVehicle, setEditVehicle] = useState('Car');
  const [editCabin, setEditCabin] = useState(true);
  const [calculation, setCalculation] = useState<any>(null);

  const handleRetrieveBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage(null);
    try {
      const res = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pnr: pnrInput, email: emailInput })
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setActiveBooking(data.booking);
        setEditDate(data.booking.depDate);
        setEditVehicle(data.booking.vehicleType);
        setSubStage('dashboard');
      } else {
        setInfoMessage("❌ Keine aktive Buchung unter dieser PNR/E-Mail-Kombination gefunden.");
      }
    } catch (err) {
      setInfoMessage("❌ Netzwerkfehler zum Hafennetzwerk.");
    }
  };

  const handleTriggerRecalculate = async () => {
    try {
      const res = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pnr: activeBooking.pnr, currentCost: activeBooking.totalCost, newVehicleType: editVehicle, newHasCabin: editCabin })
      });
      const data = await res.json();
      if (data.success) setCalculation(data);
    } catch (err) { console.error(err); }
  };

  const handleConfirmModification = async () => {
    setInfoMessage("⏳ Synchronisiere Änderungsdaten mit Hafen-Terminal...");
    try {
      const res = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pnr: activeBooking.pnr, email: activeBooking.email, newDate: editDate, newVehicleType: editVehicle, newTotal: calculation ? calculation.newTotal : activeBooking.totalCost })
      });
      const data = await res.json();
      if (data.success) {
        setActiveBooking((prev: any) => ({ ...prev, depDate: editDate, vehicleType: editVehicle, totalCost: calculation ? calculation.newTotal : prev.totalCost, status: data.newStatus }));
        setInfoMessage("✅ Ticket erfolgreich umgebucht!");
        setSubStage('dashboard');
        setCalculation(null);
      }
    } catch (err) { setInfoMessage("❌ Fehler beim Übermitteln der Änderungen."); }
  };

  const handleRequestCancellation = async () => {
    if (!window.confirm("Möchten Sie diese Fährüberfahrt wirklich unwiderruflich stornieren?")) return;
    setInfoMessage("⏳ Stornierung wird prozessiert...");
    try {
      const res = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pnr: activeBooking.pnr, email: activeBooking.email })
      });
      const data = await res.json();
      if (data.success) {
        setActiveBooking((prev: any) => ({ ...prev, status: data.newStatus }));
        setInfoMessage("✅ Buchung erfolgreich storniert. Betrag wurde vollständig zurückerstattet.");
      }
    } catch (err) { setInfoMessage("❌ Fehler bei der Stornierungsabwicklung."); }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900 text-left font-sans">
      <div className="bg-white rounded-[28px] max-w-xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 flex flex-col space-y-5 animate-scale-up">
        
        <button type="button" onClick={onClose} className="absolute top-4 right-5 font-black text-slate-400 hover:text-slate-600 transition-colors">✕</button>

        {subStage === 'search' && (
          <form onSubmit={handleRetrieveBooking} className="space-y-4">
            <div>
              <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest block">CUSTOMER SELF SERVICE</span>
              <h3 className="text-xl font-black text-[#0b2545] tracking-tight mt-0.5">🔍 Meine Buchung verwalten</h3>
            </div>
            {infoMessage && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold">{infoMessage}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" required placeholder="Buchungsnummer (z.B. ALG-8F42K)" value={pnrInput} onChange={(e) => setPnrInput(e.target.value.toUpperCase())} className="border p-3 rounded-xl text-xs font-black font-mono focus:outline-none uppercase" />
              <input type="email" required placeholder="E-Mail-Adresse" value={emailInput} onChange={(e) => setEmailInput(e.target.value.toLowerCase())} className="border p-3 rounded-xl text-xs font-bold focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-[#0b2545] text-amber-300 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
              <Search className="h-4 w-4" /> Buchung abrufen
            </button>
          </form>
        )}

        {subStage === 'dashboard' && activeBooking && (
          <div className="space-y-5">
            <div className="border-b pb-2 flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-slate-900">🎟️ Buchung: <span className="font-mono text-cyan-600">{activeBooking.pnr}</span></h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{activeBooking.routeKey}</p>
              </div>
              <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-md border bg-emerald-50 border-emerald-200 text-emerald-600">
                {activeBooking.status}
              </span>
            </div>

            {infoMessage && <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-black">{infoMessage}</div>}

            <div className="p-4 bg-slate-50 border rounded-2xl grid grid-cols-2 gap-4 text-xs font-bold text-slate-700">
              <div><span className="text-[8px] text-slate-400 block uppercase">Fährschiff</span><span className="text-slate-900 font-black">{activeBooking.shipName}</span></div>
              <div><span className="text-[8px] text-slate-400 block uppercase">Reisedatum</span><span className="text-slate-900 font-black">{activeBooking.depDate}</span></div>
              <div><span className="text-[8px] text-slate-400 block uppercase">Fahrzeugklasse</span><span className="text-slate-900 font-black uppercase font-mono">{activeBooking.vehicleType}</span></div>
              <div><span className="text-[8px] text-slate-400 block uppercase">Zahlbetrag</span><span className="text-slate-900 font-mono font-black">{activeBooking.totalCost} €</span></div>
            </div>

            {activeBooking.status !== 'CANCELLED' && (
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setInfoMessage(null); setSubStage('modify'); }} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black text-slate-800 border flex items-center justify-center gap-1.5"><RefreshCw className="h-3.5 w-3.5 text-blue-600" /> Reise umbuchen</button>
                <button type="button" onClick={handleRequestCancellation} className="p-3 bg-red-50 hover:bg-red-100 rounded-xl text-xs font-black text-red-700 border border-red-200 flex items-center justify-center gap-1.5"><XCircle className="h-3.5 w-3.5" /> Stornierung</button>
              </div>
            )}

            <div className="border-t pt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-black text-slate-500 uppercase">
              <button type="button" onClick={() => window.print()} className="p-2 border rounded-xl bg-white flex items-center justify-center gap-1"><Printer className="h-3 w-3" /> PDF</button>
              <button type="button" onClick={() => alert("E-Mail gesendet")} className="p-2 border rounded-xl bg-white flex items-center justify-center gap-1"><Mail className="h-3 w-3" /> E-Mail</button>
              <button type="button" onClick={() => setSubStage('search')} className="p-2 border rounded-xl bg-slate-900 text-white flex items-center justify-center gap-1"><ArrowLeft className="h-3 w-3" /> Zurück</button>
            </div>
          </div>
        )}

        {subStage === 'modify' && activeBooking && (
          <ModifyBookingForm 
            editDate={editDate} setEditDate={setEditDate} editVehicle={editVehicle} setEditVehicle={setEditVehicle}
            editCabin={editCabin} setEditCabin={setEditCabin} handleTriggerRecalculate={handleTriggerRecalculate}
            calculation={calculation} handleConfirmModification={handleConfirmModification} setSubStage={setSubStage}
            activeBooking={activeBooking}
          />
        )}

      </div>
    </div>
  );
}
