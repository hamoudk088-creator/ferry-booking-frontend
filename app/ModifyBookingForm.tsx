"use client";

import React from 'react';

export default function ModifyBookingForm({ editDate, setEditDate, editVehicle, setEditVehicle, editCabin, setEditCabin, handleTriggerRecalculate, calculation, handleConfirmModification, setSubStage, activeBooking }: any) {
  return (
    <div className="space-y-4 animate-scale-up text-xs font-bold">
      <div>
        <h3 className="text-base font-black text-slate-900">🔄 Umbuchungs- &amp; Änderungsanfrage</h3>
        <p className="text-[11px] text-slate-400 font-semibold">Passen Sie Ihre Reisedaten an. Der Server kalkuliert die Differenz live.</p>
      </div>

      <div className="space-y-3 p-4 bg-slate-50 border rounded-2xl">
        <div>
          <label className="text-[9px] text-slate-400 block uppercase mb-1">Neues Reisedatum wählen</label>
          <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full bg-white border border-slate-200 p-2.5 rounded-xl font-black text-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] text-slate-400 block uppercase mb-1">Fahrzeugtyp ändern</label>
            <select value={editVehicle} onChange={(e) => setEditVehicle(e.target.value)} className="w-full bg-white border p-2.5 rounded-xl font-black text-slate-800 focus:outline-none">
              <option value="None">Ohne Fahrzeug (Pedestrian)</option>
              <option value="Car">PKW / Standard Auto</option>
              <option value="Van">Großer Van</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] text-slate-400 block uppercase mb-1">Unterbringung</label>
            <select value={editCabin ? 'C' : 'N'} onChange={(e) => setEditCabin(e.target.value === 'C')} className="w-full bg-white border p-2.5 rounded-xl font-black text-slate-800 focus:outline-none">
              <option value="C">Private Schlafkabine</option>
              <option value="N">Standard Deckspassage</option>
            </select>
          </div>
        </div>

        <button type="button" onClick={handleTriggerRecalculate} className="w-full bg-cyan-600 text-white font-black py-2.5 rounded-xl text-[11px] uppercase tracking-wider">
          ⚙️ Server-Neuberechnung anfordern
        </button>
      </div>

      {calculation && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3 animate-fade-in">
          <div className="flex justify-between border-b pb-1.5 border-amber-200">
            <span className="text-slate-500">Bisheriger Tarif:</span><span className="font-mono text-slate-900">{activeBooking.totalCost} €</span>
          </div>
          <div className="flex justify-between border-b pb-1.5 border-amber-200">
            <span className="text-slate-500">Neuer berechneter Server-Tarif:</span><span className="font-mono text-slate-900">{calculation.newTotal} €</span>
          </div>
          <div className="flex justify-between items-center text-sm font-black text-blue-950 bg-white p-2 rounded-xl border border-amber-300">
            <span>💰 Differenzbetrag:</span>
            <span className="font-mono text-base">{calculation.difference > 0 ? `+${calculation.difference} € (Nachzahlung)` : `${calculation.difference} € (Erstattung)`}</span>
          </div>
          <button type="button" onClick={handleConfirmModification} className="w-full bg-emerald-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider">
            {calculation.difference > 0 ? "💳 Differenz bezahlen" : "✓ Differenz gutschreiben"}
          </button>
        </div>
      )}

      <button type="button" onClick={() => setSubStage('dashboard')} className="w-full bg-slate-200 text-slate-700 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider">
        Abbrechen
      </button>
    </div>
  );
}
