"use client";

import React, { useState } from 'react';
import { BedDouble, Armchair, AlertCircle } from 'lucide-react';
import PetCargoForm from './PetCargoForm';

export default function BookingFormSteps({ subStage, setSubStage, passengerDetails, updatePassenger, mainEmail, setMainEmail, mainPhone, setMainPhone, plateNumber, setPlateNumber, vehicle, selectedCabin, setSelectedCabin, selectedOffer, selectedMeal, setSelectedMeal, selectedPet, setSelectedPet, currentLang }: any) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateFormSteps = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mainEmail)) {
      setValidationError("❌ Bitte geben Sie eine gültige E-Mail-Adresse für das Ticket ein.");
      return;
    }

    for (let p of passengerDetails) {
      if (!p.passport || p.passport.trim().length < 6) {
        setValidationError(`❌ Ausweisnummer für ${p.firstName || 'Passagier'} ungültig (mind. 6 Zeichen).`);
        return;
      }
    }

    setSubStage('step7_summary');
  };

  return (
    <div className="w-full text-slate-800 font-sans animate-fade-in text-left">
      <form onSubmit={validateFormSteps} className="max-w-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Links: Personendaten */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-5">
          <div className="border-b pb-2">
            <span className="text-[9px] font-black text-[#0d9488] uppercase block tracking-widest">Angaben zur Reise</span>
            <h3 className="text-base font-black text-[#1e293b]">📋 Passagierdaten &amp; Ausweise</h3>
          </div>

          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <AlertCircle className="h-4 w-4 shrink-0" /> {validationError}
            </div>
          )}

          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            {passengerDetails.map((p: any, idx: number) => (
              <div key={p.id} className="p-4 bg-[#f4f7f6] rounded-xl border border-[#e2e8f0] space-y-3">
                <span className="text-[10px] font-black text-[#0d9488] uppercase block tracking-wider">Passagier #{idx + 1}</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Vorname" value={p.firstName || ''} onChange={(e) => updatePassenger(p.id, 'firstName', e.target.value)} className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#0d9488]" />
                  <input type="text" required placeholder="Nachname" value={p.lastName || ''} onChange={(e) => updatePassenger(p.id, 'lastName', e.target.value)} className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#0d9488]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" required value={p.birthDate || ''} onChange={(e) => updatePassenger(p.id, 'birthDate', e.target.value)} className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer" />
                  <input type="text" required placeholder="Nationalität" value={p.nationality || ''} onChange={(e) => updatePassenger(p.id, 'nationality', e.target.value)} className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-bold focus:outline-none" />
                </div>
                <input type="text" required placeholder="Reisepassnummer" value={p.passport || ''} onChange={(e) => updatePassenger(p.id, 'passport', e.target.value)} className="w-full bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-mono font-black tracking-wider uppercase focus:outline-none focus:border-[#0d9488]" />
              </div>
            ))}
          </div>

          <div className="bg-[#f4f7f6] p-4 rounded-xl border border-[#e2e8f0] space-y-3">
            <span className="text-[9px] font-black text-slate-500 block uppercase tracking-wider">🔒 Kontakt für Ticketversand</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="email" required placeholder="E-Mail-Adresse" value={mainEmail} onChange={(e) => setMainEmail(e.target.value)} className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#0d9488]" />
              <input type="tel" required placeholder="Telefonnummer" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} className="bg-white border border-[#e2e8f0] p-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#0d9488]" />
            </div>
            {vehicle !== 'None' && (
              <input type="text" required placeholder="Amtliches Kennzeichen (Zoll-Pflicht)" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} className="w-full bg-white border border-[#e2e8f0] p-3 rounded-xl text-xs font-black font-mono uppercase tracking-widest focus:outline-none focus:border-[#0d9488]" />
            )}
          </div>
        </div>

        {/* Rechts: Zusatzleistungen & Absenden */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-4">
            <div className="border-b pb-2">
              <span className="text-[9px] font-black text-[#0d9488] uppercase block tracking-widest">Unterbringung</span>
              <h3 className="text-base font-black text-[#1e293b]">⚓ Kabinen &amp; Optionen</h3>
            </div>

            <div className="space-y-2">
              <button type="button" onClick={() => setSelectedCabin(!selectedCabin)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedCabin ? 'bg-[#f4f7f6] border-[#0d9488] text-slate-900' : 'bg-white border-[#e2e8f0] text-slate-500'}`}>
                <div className="flex items-center gap-2 text-left">
                  <BedDouble className="h-4 w-4 text-[#0d9488]" />
                  <div><span>Private Schlafkabine</span><p className="text-[9px] text-slate-400 font-medium">Bettplatz inkl. WC &amp; Dusche</p></div>
                </div>
                <span className="font-mono font-black">+{selectedOffer?.cabinPrice || 120} €</span>
              </button>

              <button type="button" onClick={() => setSelectedMeal(!selectedMeal)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedMeal ? 'bg-[#f4f7f6] border-[#0d9488] text-slate-900' : 'bg-white border-[#e2e8f0] text-slate-500'}`}>
                <div className="flex items-center gap-2 text-left">
                  <Armchair className="h-4 w-4 text-[#0d9488]" />
                  <div><span>Vollpension an Bord</span><p className="text-[9px] text-slate-400 font-medium">Frühstück und warmes Abendessen</p></div>
                </div>
                <span className="font-mono font-black">+30 € / Pers.</span>
              </button>

              <button type="button" onClick={() => setSelectedPet(!selectedPet)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedPet ? 'bg-[#f4f7f6] border-[#0d9488] text-slate-900' : 'bg-white border-[#e2e8f0] text-slate-500'}`}>
                <div className="flex items-center gap-2 text-left">
                  <span className="text-sm">🐾</span>
                  <div><span>Haustier-Mitnahme</span><p className="text-[9px] text-slate-400 font-medium">Veterinärprüfung am Hafen</p></div>
                </div>
                <span className="font-mono font-black">+25 €</span>
              </button>

              <PetCargoForm selectedPet={selectedPet} currentLang={currentLang} />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#0d9488] hover:bg-[#0c8074] text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all">
            Weiter zur Übersicht ➔
          </button>
        </div>

      </form>
    </div>
  );
}
