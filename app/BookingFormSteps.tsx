"use client";

import React from 'react';

export default function BookingFormSteps({ subStage, setSubStage, passengerDetails, updatePassenger, mainEmail, setMainEmail, mainPhone, setMainPhone, plateNumber, setPlateNumber, vehicle, selectedCabin, setSelectedCabin, selectedOffer, selectedMeal, setSelectedMeal, selectedPet, setSelectedPet }: any) {
  return (
    <div className="w-full">
      {/* SCHRITT 5: PERSONENDATEN EINGEBEN */}
      {subStage === 'step5_data' && (
        <form onSubmit={(e) => { e.preventDefault(); setSubStage('step6_extras'); }} className="bg-white rounded-3xl p-6 border shadow-xl space-y-6 max-w-xl mx-auto">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 uppercase tracking-wider">📋 Schritt 5: Personendaten</h3>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {passengerDetails.map((p: any, idx: number) => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border space-y-3">
                <span className="text-[10px] font-black text-blue-600 block uppercase">Reisender #{idx + 1} ({p.type})</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Vorname" value={p.firstName} onChange={(e) => updatePassenger(p.id, 'firstName', e.target.value)} className="border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                  <input type="text" required placeholder="Nachname" value={p.lastName} onChange={(e) => updatePassenger(p.id, 'lastName', e.target.value)} className="border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" required value={p.birthDate} onChange={(e) => updatePassenger(p.id, 'birthDate', e.target.value)} className="border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                  <input type="text" required placeholder="Nationalität" value={p.nationality} onChange={(e) => updatePassenger(p.id, 'nationality', e.target.value)} className="border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
                <input type="text" required placeholder="Ausweis- / Reisepassnummer" value={p.passport} onChange={(e) => updatePassenger(p.id, 'passport', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none" />
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
            <span className="text-[9px] font-black text-amber-800 block uppercase">Kontaktdaten Hauptreisender</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="email" required placeholder="E-Mail-Adresse" value={mainEmail} onChange={(e) => setMainEmail(e.target.value)} className="bg-white border p-2.5 rounded-xl text-xs font-bold focus:outline-none" />
              <input type="tel" required placeholder="Telefonnummer" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} className="bg-white border p-2.5 rounded-xl text-xs font-bold focus:outline-none" />
            </div>
            {vehicle !== 'None' && (
              <input type="text" required placeholder="Amtliches Fahrzeug-Kennzeichen (Zoll)" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} className="w-full bg-white border p-3 rounded-xl text-xs font-black font-mono uppercase tracking-widest focus:outline-none" />
            )}
          </div>
          <button type="submit" className="w-full bg-[#0b2545] text-amber-400 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider">Weiter zu Zusatzleistungen</button>
        </form>
      )}

      {/* SCHRITT 6: ZUSATZLEISTUNGEN */}
      {subStage === 'step6_extras' && (
        <div className="bg-white rounded-3xl p-6 border shadow-xl space-y-4 max-w-md mx-auto">
          <h3 className="text-sm font-black text-[#0b2545] border-b pb-2 uppercase tracking-wider">⚓ Schritt 6: Zusatzleistungen</h3>
          <div className="space-y-2.5">
            <button type="button" onClick={() => setSelectedCabin(!selectedCabin)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedCabin ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-slate-50 border-slate-200'}`}>
              <span className="block text-left">🛌 Private Schlafkabine reservieren</span>
              <span className="font-mono text-xs font-black">+{selectedOffer?.cabinPrice || 60} €</span>
            </button>
            <button type="button" onClick={() => setSelectedMeal(!selectedMeal)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedMeal ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-slate-50 border-slate-200'}`}>
              <span className="block text-left">🍽️ Vollpension (Mahlzeiten inkl.)</span>
              <span className="font-mono text-xs font-black">+30 € / Pers.</span>
            </button>
            <button type="button" onClick={() => setSelectedPet(!selectedPet)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedPet ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-slate-50 border-slate-200'}`}>
              <span className="block text-left">🐾 Haustier-Mitnahme anmelden</span>
              <span className="font-mono text-xs font-black">+40 €</span>
            </button>
          </div>
          <button type="button" onClick={() => setSubStage('step7_summary')} className="w-full bg-blue-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Zur Buchungsübersicht ➔</button>
        </div>
      )}
    </div>
  );
}
