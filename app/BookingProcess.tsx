"use client";

import React, { useState, useEffect } from 'react';
import { User, CreditCard, Armchair, BedDouble } from 'lucide-react';
import BoardingPass from './BoardingPass'; // <-- Hier importiert!

export default function BookingProcess({ origin, destination, calculatedPrice, selectedOffer, vehicle, setStep, setBookingStage, adults, children }: any) {
  const [stage, setStage] = useState<'passengers' | 'deckplan' | 'pay' | 'success'>('passengers');
  const [passengerList, setPassengerList] = useState<any[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seatPriceAdd, setSeatPriceAdd] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const [pnrNumber, setPnrNumber] = useState('');

  useEffect(() => {
    const list = [];
    const totalAdults = Number(adults) || 1;
    const totalChildren = Number(children) || 0;
    for (let i = 0; i < totalAdults; i++) list.push({ id: `a-${i}`, type: "Erwachsener", firstName: "", lastName: "", passport: "" });
    for (let i = 0; i < totalChildren; i++) list.push({ id: `c-${i}`, type: "Kind", firstName: "", lastName: "", passport: "" });
    setPassengerList(list);
  }, [adults, children]);

  const updatePassenger = (id: string, field: string, value: string) => {
    setPassengerList(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setPnrNumber("MED" + Math.random().toString(36).substring(2, 9).toUpperCase());
      setIsPaying(false);
      setStage('success');
    }, 1500);
  };

  const finalPrice = calculatedPrice + seatPriceAdd;
  const cabinDeckSlots = [
    { id: "K-101 (Luxus)", type: "cabin", label: "Suite Premium 101", price: 120, free: true },
    { id: "K-102 (Luxus)", type: "cabin", label: "Suite Premium 102", price: 120, free: false },
    { id: "S-201 (Sessel)", type: "seat", label: "Ruhesessel A1", price: 30, free: true },
    { id: "S-202 (Sessel)", type: "seat", label: "Ruhesessel A2", price: 30, free: true }
  ];

  return (
    <div className="w-full space-y-6">
      {stage === 'passengers' && (
        <form onSubmit={(e) => { e.preventDefault(); setStage('deckplan'); }} className="bg-white rounded-3xl p-6 border shadow-xl max-w-xl mx-auto space-y-6">
          <div className="bg-blue-50 border p-3.5 rounded-xl text-xs font-semibold text-blue-800 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600 shrink-0" />
            <span>Familien-Modus aktiv: Bitte tragen Sie alle {passengerList.length} Reisenden ein.</span>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {passengerList.map((p, idx) => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border space-y-3">
                <span className="text-[10px] font-black text-blue-600 block uppercase tracking-wider">#{idx + 1} {p.type}</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Vorname" value={p.firstName} onChange={(e) => updatePassenger(p.id, 'firstName', e.target.value)} className="border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                  <input type="text" required placeholder="Nachname" value={p.lastName} onChange={(e) => updatePassenger(p.id, 'lastName', e.target.value)} className="border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
                <input type="text" required placeholder="Reisepassnummer" value={p.passport} onChange={(e) => updatePassenger(p.id, 'passport', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none font-mono" />
              </div>
            ))}
          </div>
          {vehicle !== 'None' && (
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Amtliches Fahrzeug-Kennzeichen (Pflicht für Zoll)</label>
              <input type="text" required value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} placeholder="z.B. MA-F-2026" className="w-full border p-3 rounded-xl text-xs font-black text-slate-900 tracking-widest focus:outline-none font-mono uppercase bg-amber-50/30 border-amber-200" />
            </div>
          )}
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">E-Mail für den Ticketversand</label>
            <input type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="name@beispiel.com" className="w-full border p-3 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-[#0b2545] text-amber-400 font-black py-4 rounded-xl text-xs uppercase tracking-wider">Weiter zur Kabinenwahl</button>
        </form>
      )}

      {stage === 'deckplan' && (
        <div className="bg-white rounded-3xl p-6 border shadow-xl max-w-xl mx-auto space-y-5">
          <h3 className="text-lg font-black text-slate-900 text-center">Wunschplatz auf der Fähre reservieren</h3>
          <div className="p-4 bg-slate-900 rounded-2xl space-y-3 border-4 border-slate-800 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cabinDeckSlots.map(slot => (
                <button key={slot.id} type="button" disabled={!slot.free} onClick={() => { setSelectedSeat(slot.id); setSeatPriceAdd(slot.price); }} className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${!slot.free ? 'opacity-40 cursor-not-allowed' : selectedSeat === slot.id ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-white'}`}>
                  <div className="flex items-center gap-2">{slot.type === 'cabin' ? <BedDouble className="h-4 w-4" /> : <Armchair className="h-4 w-4" />}<span>{slot.label}</span></div>
                  <span className="text-xs font-mono">+{slot.price} €</span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setStage('pay')} className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl text-xs uppercase">Auswahl bestätigen (Zahlung)</button>
        </div>
      )}

      {stage === 'pay' && (
        <form onSubmit={handlePayment} className="bg-white rounded-3xl p-6 border shadow-xl max-w-md mx-auto space-y-5 text-center">
          <div className="inline-flex p-3 bg-amber-50 rounded-full text-amber-600"><CreditCard className="h-8 w-8" /></div>
          <h3 className="text-lg font-black text-slate-900">Sicheres Stripe-Test-Terminal</h3>
          <input type="text" disabled value="4242 •••• •••• 4242" className="w-full bg-slate-50 border p-3 rounded-xl text-xs font-mono font-bold text-slate-700 text-center shadow-inner" />
          <button type="submit" disabled={isPaying} className="w-full bg-blue-600 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest">{isPaying ? "Verarbeite..." : `Jetzt bezahlen (${finalPrice} €)`}</button>
        </form>
      )}

      {stage === 'success' && (
        <BoardingPass pnrNumber={pnrNumber} passengerList={passengerList} origin={origin} destination={destination} selectedOffer={selectedOffer} vehicle={vehicle} plateNumber={plateNumber} selectedSeat={selectedSeat} finalPrice={finalPrice} emailInput={emailInput} setBookingStage={setBookingStage} setStep={setStep} />
      )}
    </div>
  );
}
