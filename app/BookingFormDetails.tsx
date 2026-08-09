"use client";

import React from 'react';

export default function BookingFormDetails({ step, setStep, passengerDetails, updatePassenger, adults, children, vehicle, mainEmail, setMainEmail, mainPhone, setMainPhone, plateNumber, setPlateNumber, cabinType, hasMeals, calculateTotal }: any) {
  return (
    <div className="space-y-4 animate-scale-up text-xs font-bold text-slate-700">
      
      {/* SCHRITT 6: GRENZKONTROLL-PASSAGIERDATEN */}
      {step === 6 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b] text-left">🪪 Schritt 6: Grenzkontroll-Passagierdaten</h3>
          <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1 text-left">
            {passengerDetails.map((p: any, i: number) => (
              <div key={p.id} className="p-3 bg-[#f4f7f6] rounded-xl border border-[#e2e8f0] space-y-2">
                <span className="text-[10px] text-[#0d9488] block uppercase">Reisender #{i + 1}</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Vorname" value={p.firstName} onChange={(e) => updatePassenger(p.id, 'firstName', e.target.value)} className="p-2 border rounded-lg bg-white focus:outline-none" />
                  <input type="text" required placeholder="Nachname" value={p.lastName} onChange={(e) => updatePassenger(p.id, 'lastName', e.target.value)} className="p-2 border rounded-lg bg-white focus:outline-none" />
                </div>
                <input type="text" required placeholder="Reisepassnummer (Zoll-Zulassung)" value={p.passport} onChange={(e) => updatePassenger(p.id, 'passport', e.target.value)} className="w-full p-2 border rounded-lg bg-white uppercase font-mono focus:outline-none" />
              </div>
            ))}
          </div>
          <div className="space-y-2 text-left">
            <input type="email" required placeholder="Ticket E-Mail-Adresse" value={mainEmail} onChange={(e) => setMainEmail(e.target.value)} className="w-full p-2.5 border rounded-xl focus:outline-none" />
            <input type="tel" required placeholder="Mobilnummer" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} className="w-full p-2.5 border rounded-xl focus:outline-none" />
            {vehicle !== 'None' && <input type="text" required placeholder="Amtliches Autokennzeichen" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} className="w-full p-2.5 border rounded-xl font-mono tracking-widest uppercase focus:outline-none" />}
          </div>
          <button type="button" onClick={() => setStep(7)} className="w-full bg-[#0d9488] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">Weiter zur Rechnungsprüfung ➔</button>
        </div>
      )}

      {/* SCHRITT 7: BUCHUNGSPRÜFUNG */}
      {step === 7 && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1e293b] text-left">🧾 Schritt 7: Transparente Rechnungsprüfung</h3>
          <div className="border rounded-xl overflow-hidden text-xs font-bold text-slate-700 shadow-xs">
            <table className="w-full border-collapse bg-[#f4f7f6]">
              <thead>
                <tr className="bg-[#1e293b] text-white text-[10px] uppercase tracking-wider">
                  <th className="p-2.5 text-left">Posten</th>
                  <th className="p-2.5 text-right">Betrag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] bg-white text-left">
                <tr><td className="p-2.5">Passagierticket (passage {adults} Erw.)</td><td className="p-2.5 text-right font-mono">{Number(adults) * 90} €</td></tr>
                {Number(children) > 0 && <tr><td className="p-2.5">Kinderticket ({children} Kind/er)</td><td className="p-2.5 text-right font-mono">{Number(children) * 45} €</td></tr>}
                {vehicle !== 'None' && <tr><td className="p-2.5">Fahrzeugfracht ({vehicle})</td><td className="p-2.5 text-right font-mono">90 €</td></tr>}
                {cabinType !== 'None' && <tr><td className="p-2.5">Unterbringung (Kabine: {cabinType})</td><td className="p-2.5 text-right font-mono">{cabinType === 'Inside' ? 120 : 180} €</td></tr>}
                {hasMeals && <tr><td className="p-2.5">Verpflegungs-Paket (Vollpension)</td><td className="p-2.5 text-right font-mono">{30 * (Number(adults) + Number(children))} €</td></tr>}
                <tr><td className="p-2.5 text-slate-400">Hafengebühren &amp; Öko-Steuern</td><td className="p-2.5 text-right font-mono text-slate-400">35 €</td></tr>
                <tr className="bg-emerald-50 text-[#1e293b] text-sm font-black"><td className="p-3">GESAMTPREIS (Brutto)</td><td className="p-3 text-right font-mono text-base">{calculateTotal()} €</td></tr>
              </tbody>
            </table>
          </div>
          <button type="button" onClick={() => setStep(8)} className="w-full bg-[#0d9488] text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm">Weiter zur Kasse (Schritt 8) ➔</button>
        </div>
      )}

    </div>
  );
}
