"use client";

import React, { useState } from 'react';
import { User, ShieldCheck, Armchair, BedDouble, AlertCircle, FileText } from 'lucide-react';
import PetCargoForm from './PetCargoForm';

export default function BookingFormSteps({ subStage, setSubStage, passengerDetails, updatePassenger, mainEmail, setMainEmail, mainPhone, setMainPhone, plateNumber, setPlateNumber, vehicle, selectedCabin, setSelectedCabin, selectedOffer, selectedMeal, setSelectedMeal, selectedPet, setSelectedPet, currentLang }: any) {
  const [validationError, setValidationError] = useState<string | null>(null);

  // 🔬 SERVERSEITIGE VOR-VALIDIERUNG IM FRONTEND (INPUT VALIDATION GUARD)
  const validateFormSteps = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // E-Mail Formatprüfung über RegEx
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mainEmail)) {
      setValidationError("❌ Ungültiges E-Mail-Format für den Ticketversand.");
      return;
    }

    // Passnummer-Sicherheitscheck (Mindestens 6 Zeichen, alphanumerisch gegen Fehleingaben)
    for (let p of passengerDetails) {
      if (!p.passport || p.passport.trim().length < 6) {
        setValidationError(`❌ Die Reisepassnummer für ${p.firstName || 'Passagier'} ist ungültig (mind. 6 Zeichen).`);
        return;
      }
    }

    // Wechselt direkt zu Schritt 7 (Buchungsübersicht) – Schritte 5 & 6 sind nun eins!
    setSubStage('step7_summary');
  };

  return (
    <div className="w-full text-slate-900 font-sans animate-fade-in">
      <form onSubmit={validateFormSteps} className="max-w-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LINKE SPALTE: SQUASHED STEP 5 (PERSONENDATEN) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border shadow-xl space-y-5">
          <div className="border-b pb-2">
            <span className="text-[9px] font-black text-cyan-600 uppercase tracking-widest block">Schritt 5 / 10</span>
            <h3 className="text-base font-black text-[#0b2545] tracking-tight">📋 Passagierdaten &amp; Ausweise</h3>
          </div>

          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <AlertCircle className="h-4 w-4 shrink-0" /> {validationError}
            </div>
          )}

          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            {passengerDetails.map((p: any, idx: number) => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3 relative">
                <span className="text-[10px] font-black text-cyan-600 uppercase block tracking-wider">Reisender #{idx + 1} ({p.type})</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Vorname" value={p.firstName || ''} onChange={(e) => updatePassenger(p.id, 'firstName', e.target.value)} className="bg-white border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-cyan-500" />
                  <input type="text" required placeholder="Nachname" value={p.lastName || ''} onChange={(e) => updatePassenger(p.id, 'lastName', e.target.value)} className="bg-white border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-cyan-500" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" required value={p.birthDate || ''} onChange={(e) => updatePassenger(p.id, 'birthDate', e.target.value)} className="bg-white border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer" />
                  <input type="text" required placeholder="Nationalität" value={p.nationality || ''} onChange={(e) => updatePassenger(p.id, 'nationality', e.target.value)} className="bg-white border p-2.5 rounded-xl text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
                <input type="text" required placeholder="Ausweis- / Reisepassnummer" value={p.passport || ''} onChange={(e) => updatePassenger(p.id, 'passport', e.target.value)} className="w-full bg-white border p-2.5 rounded-xl text-xs font-mono font-black tracking-wider uppercase text-slate-800 focus:outline-none focus:border-cyan-500" />
              </div>
            ))}
          </div>

          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 space-y-3">
            <span className="text-[9px] font-black text-amber-800 block uppercase tracking-wider">🔒 Kontaktdaten Hauptreisender (Zoll-Log)</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="email" required placeholder="E-Mail-Adresse" value={mainEmail} onChange={(e) => setMainEmail(e.target.value)} className="bg-white border border-amber-200 p-2.5 rounded-xl text-xs font-bold focus:outline-none" />
              <input type="tel" required placeholder="Telefonnummer" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} className="bg-white border border-amber-200 p-2.5 rounded-xl text-xs font-bold focus:outline-none" />
            </div>
            {vehicle !== 'None' && (
              <input type="text" required placeholder="Amtliches Fahrzeug-Kennzeichen (Zoll)" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} className="w-full bg-white border border-amber-200 p-3 rounded-xl text-xs font-black font-mono uppercase tracking-widest focus:outline-none focus:border-cyan-600" />
            )}
          </div>
        </div>

        {/* RECHTE SPALTE: SQUASHED STEP 6 (ZUSATZLEISTUNGEN & PIPELINE RUN) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border shadow-xl space-y-4">
            <div className="border-b pb-2">
              <span className="text-[9px] font-black text-cyan-600 uppercase tracking-widest block">Schritt 6 / 10</span>
              <h3 className="text-base font-black text-[#0b2545] tracking-tight">⚓ Kabinen &amp; Optionen</h3>
            </div>

            <div className="space-y-2">
              {/* Kabinen Selector */}
              <button type="button" onClick={() => setSelectedCabin(!selectedCabin)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedCabin ? 'bg-cyan-50 border-cyan-600 text-cyan-9TACT' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2 text-left">
                  <BedDouble className="h-4 w-4 text-cyan-600" />
                  <div><span>Private Schlafkabine</span><p className="text-[9px] text-slate-400 font-medium">Inklusive Bettwäsche &amp; WC</p></div>
                </div>
                <span className="font-mono text-xs font-black">+{selectedOffer?.cabinPrice || 120} €</span>
              </button>

              {/* Mahlzeiten Selector */}
              <button type="button" onClick={() => setSelectedMeal(!selectedMeal)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedMeal ? 'bg-cyan-50 border-cyan-600 text-cyan-9TACT' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2 text-left">
                  <Armchair className="h-4 w-4 text-slate-400" />
                  <div><span>Vollpension an Bord</span><p className="text-[9px] text-slate-400 font-medium">Abendessen &amp; Frühstück</p></div>
                </div>
                <span className="font-mono text-xs font-black">+30 € / Pers.</span>
              </button>

              {/* Haustier Selector */}
              <button type="button" onClick={() => setSelectedPet(!selectedPet)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center font-bold text-xs transition-all ${selectedPet ? 'bg-cyan-50 border-cyan-600 text-cyan-9TACT' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2 text-left">
                  <span className="text-base">🐾</span>
                  <div><span>Haustier-Mitnahme</span><p className="text-[9px] text-slate-400 font-medium">Zwinger- oder Kabinenplatz</p></div>
                </div>
                <span className="font-mono text-xs font-black">+25 €</span>
              </button>

              {/* Integriertes Haustierausweis-Validierungsformular */}
              <PetCargoForm selectedPet={selectedPet} currentLang={currentLang} />
            </div>
          </div>

          {/* HAUPT-WEITER-BUTTON ZUR DYNAMISCHEN RECHNUNG */}
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl transition-all transform active:scale-[0.99]">
            Zur Buchungsübersicht ➔
          </button>
        </div>

      </form>
    </div>
  );
}
