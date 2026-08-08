"use client";

import React from 'react';
import { Tag } from 'lucide-react';

export default function InvoiceSidebar({ calculatedPrice, seatPriceAdd, promoCode, setPromoCode, applyPromoCode, promoSuccess, promoError, discountPercent, discountAmount, finalPrice }: any) {
  return (
    <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200/80 shadow-md space-y-4 text-left">
      <h4 className="text-xs font-black text-[#0b2545] uppercase tracking-widest border-b border-amber-200 pb-2">📋 Buchungsübersicht</h4>
      
      <div className="space-y-2 text-xs font-bold text-slate-700">
        <div className="flex justify-between"><span className="text-slate-400 font-medium">Fähr-Ticket Basis:</span><span>{calculatedPrice} €</span></div>
        {seatPriceAdd > 0 && <div className="flex justify-between text-blue-800"><span className="text-slate-400 font-medium">Kabinen-Zusatz:</span><span>+{seatPriceAdd} €</span></div>}
        
        {/* Gutscheinfeld */}
        <div className="border-t border-dashed border-amber-200 pt-3 mt-2 space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase block">Haben Sie einen Rabattcode?</label>
          <div className="flex gap-1.5">
            <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="z.B. ALGERIA2026" className="flex-1 bg-white border border-amber-200 px-2 py-1.5 rounded-lg text-xs font-black uppercase text-slate-900 focus:outline-none" />
            <button type="button" onClick={applyPromoCode} className="bg-[#0b2545] text-amber-400 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-slate-800 transition-colors">
              <Tag className="h-3.5 w-3.5" />
            </button>
          </div>
          {promoSuccess && <p className="text-[10px] text-emerald-600 font-black">✓ 15% Rabattcode aktiviert!</p>}
          {promoError && <p className="text-[10px] text-red-600 font-bold">{promoError}</p>}
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-100 mt-2">
            <span className="font-medium">Gutschein Rabatt (-15%):</span><span>-{discountAmount} €</span>
          </div>
        )}

        <div className="flex justify-between border-t border-amber-200 pt-3 text-sm font-black text-blue-950 bg-amber-200/40 p-2.5 rounded-xl">
          <span>Endbetrag:</span><span className="text-base font-mono">{finalPrice} €</span>
        </div>
      </div>
    </div>
  );
}
