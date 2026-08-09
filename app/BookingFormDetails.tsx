"use client";

import React, { useState } from 'react';

export default function BookingFormDetails({ step, setStep, passengerDetails, updatePassenger, adults, children, vehicle, mainEmail, setMainEmail, mainPhone, setMainPhone, plateNumber, setPlateNumber, cabinType, setCabinType, hasMeals, setHasMeals, hasPet, setHasPet, calculateTotal }: any) {
  return (
    <div className="space-y-5 animate-scale-up text-xs font-bold text-slate-700 text-left">
      
      {/* 🚢 SCHRITT 4: REISENDE & FAHRZEUG */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">👥 Schritt 4: Reisende &amp; Fahrzeugtyp</h3>
          <div className="p-4 bg-[#f4f7f6] rounded-xl border border-[#e2e8f0] space-y-2">
            <p>• Erwachsene: <span className="text-[#0d9488]">{adults} Personen</span></p>
            <p>• Kinder: <span className="text-[#0d9488]">{children} (Alter: 2-12 Jahre)</span></p>
            <p>• Kategorie: <span className="text-[#0d9488] uppercase">{vehicle === 'None' ? '🚶 Fußgänger' : vehicle}</span></p>
          </div>
          <button type="button" onClick={() => setStep(5)} className="w-full bg-[#0d9488] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zu 5. Kabine &amp; Extras ➔</button>
        </div>
      )}

      {/* 🚢 SCHRITT 5: KABINE & EXTRAS */}
      {step === 5 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">🛌 Schritt 5: Kabine &amp; Verpflegung</h3>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Kabinenklasse wählen</label>
              <select value={cabinType} onChange={(e: any) => setCabinType(e.target.value)} className="w-full bg-[#f4f7f6] border border-[#e2e8f0] p-3 rounded-xl focus:outline-none text-slate-800">
                <option value="None">Ruhesessel / Deckspassage [+0 €]</option>
                <option value="Inside">Standard Innenkabine (Zoll-versiegelt) [+120 €]</option>
                <option value="Outside">Außenkabine mit Meerblick [+180 €]</option>
                <option value="Family">Große Familienkabine [+240 €]</option>
              </select>
            </div>
            <button type="button" onClick={() => setHasMeals(!hasMeals)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center transition-all ${hasMeals ? 'border-[#0d9488] bg-[#f4f7f6]' : 'border-[#e2e8f0]'}`}>
              <span>🍽️ Bord-Verpflegung (Vollpension)</span><span className="text-[#0d9488]">+30€ / Pers</span>
            </button>
            <button type="button" onClick={() => setHasPet(!hasPet)} className={`w-full p-3.5 rounded-xl border-2 flex justify-between items-center transition-all ${hasPet ? 'border-[#0d9488] bg-[#f4f7f6]' : 'border-[#e2e8f0]'}`}>
              <span>🐾 Haustier-Mitnahme (Veterinär-Box)</span><span className="text-[#0d9488]">+25 €</span>
            </button>
          </div>
          <button type="button" onClick={() => setStep(6)} className="w-full bg-[#0d9488] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zu 6. Passagierdaten ➔</button>
        </div>
      )}

      {/* 🚢 SCHRITT 6: PASSAGIERDATEN */}
      {step === 6 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">🪪 Schritt 6: Dokumente &amp; Personendaten</h3>
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {passengerDetails.map((p: any, i: number) => (
              <div key={p.id} className="p-3 bg-[#f4f7f6] rounded-xl border border-[#e2e8f0] space-y-2">
                <span className="text-[10px] text-[#0d9488] block uppercase">Reisender #{i + 1} ({p.type})</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Vorname" value={p.firstName} onChange={(e) => updatePassenger(p.id, 'firstName', e.target.value)} className="p-2 border rounded-lg bg-white focus:outline-none" />
                  <input type="text" required placeholder="Nachname" value={p.lastName} onChange={(e) => updatePassenger(p.id, 'lastName', e.target.value)} className="p-2 border rounded-lg bg-white focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" required value={p.birthDate} onChange={(e) => updatePassenger(p.id, 'birthDate', e.target.value)} className="p-2 border rounded-lg bg-white text-slate-700" />
                  <input type="text" required placeholder="Nationalität" value={p.nationality} onChange={(e) => updatePassenger(p.id, 'nationality', e.target.value)} className="p-2 border rounded-lg bg-white focus:outline-none" />
                </div>
                <input type="text" required placeholder="Reisepassnummer (Dokument-ID)" value={p.passport} onChange={(e) => updatePassenger(p.id, 'passport', e.target.value)} className="w-full p-2 border rounded-lg bg-white uppercase font-mono focus:outline-none" />
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t pt-2">
            <input type="email" required placeholder="E-Mail-Adresse für Tickets" value={mainEmail} onChange={(e) => setMainEmail(e.target.value)} className="w-full p-2.5 border rounded-xl focus:outline-none" />
            <input type="tel" required placeholder="Mobilnummer für SMS-Notfälle" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} className="w-full p-2.5 border rounded-xl focus:outline-none" />
            {vehicle !== 'None' && <input type="text" required placeholder="Amtliches Autokennzeichen (Zoll-Zulassung)" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} className="w-full p-2.5 border rounded-xl font-mono uppercase focus:outline-none tracking-widest" />}
          </div>
          <button type="button" onClick={() => setStep(7)} className="w-full bg-[#0d9488] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zu 7. Buchungsprüfung ➔</button>
        </div>
      )}

      {/* 🚢 SCHRITT 7: BUCHUNGSPRÜFUNG */}
      {step === 7 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b]">🧾 Schritt 7: Aufstellung &amp; Einzelpreise</h3>
          <div className="border rounded-xl overflow-hidden shadow-xs">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-[#1e293b] text-white text-[10px] uppercase tracking-wider">
                  <th className="p-2.5 text-left">Gebuchter Posten</th>
                  <th className="p-2.5 text-right">Einzelpreis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                <tr><td className="p-2.5">Passagierticket ({adults} Erw.)</td><td className="p-2.5 text-right font-mono">{Number(adults) * 90} €</td></tr>
                {Number(children) > 0 && <tr><td className="p-2.5">Kinderticket ({children} Kind/er)</td><td className="p-2.5 text-right font-mono">{Number(children) * 45} €</td></tr>}
                {vehicle !== 'None' && <tr><td className="p-2.5">Fahrzeug-Stellplatz ({vehicle})</td><td className="p-2.5 text-right font-mono">90 €</td></tr>}
                {cabinType !== 'None' && <tr><td className="p-2.5">Kabinen-Zuschlag ({cabinType})</td><td className="p-2.5 text-right font-mono">{cabinType === 'Inside' ? 120 : cabinType === 'Outside' ? 180 : 240} €</td></tr>}
                {hasMeals && <tr><td className="p-2.5">Verpflegung (Bord-Menü)</td><td className="p-2.5 text-right font-mono">{30 * (Number(adults) + Number(children))} €</td></tr>}
                {hasPet && <tr><td className="p-2.5">Haustier-Transportgebühr</td><td className="p-2.5 text-right font-mono">25 €</td></tr>}
                <tr className="bg-slate-50 text-slate-400"><td className="p-2.5">Internationale Hafengebühren &amp; Steuern</td><td className="p-2.5 text-right font-mono">35 €</td></tr>
                <tr className="bg-emerald-50 text-[#1e293b] text-sm font-black"><td className="p-3">GESAMTBETRAG (REIN IN EURO)</td><td className="p-3 text-right font-mono text-base">{calculateTotal()} €</td></tr>
              </tbody>
            </table>
          </div>
          <button type="button" onClick={() => setStep(8)} className="w-full bg-[#0d9488] text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider">Weiter zu 8. Zahlung ➔</button>
        </div>
      )}

    </div>
  );
}
