export function calculateDynamicFerryPrice(adults: number, children: number, vehicle: string, selectedOffer: any, hasCabin: boolean, hasMeals: boolean, hasPet: boolean) {
  // 1. Basis-Preise aus dem gewählten Schiff auslesen
  const basePricePerPerson = selectedOffer?.basePrice || 120;
  const baseVehiclePrice = selectedOffer?.vehiclePrice || 80;
  const baseCabinPrice = selectedOffer?.cabinPrice || 60;

  // 2. Roh-Kosten berechnen
  const passengerCount = Number(adults) + Number(children);
  const ticketSubtotal = passengerCount * basePricePerPerson;
  const vehicleSubtotal = vehicle !== 'None' ? baseVehiclePrice : 0;
  const cabinSubtotal = hasCabin ? baseCabinPrice : 0;
  const mealSubtotal = hasMeals ? 30 * passengerCount : 0;
  const petSubtotal = hasPet ? 40 : 0;

  const rawTotal = ticketSubtotal + vehicleSubtotal + cabinSubtotal + mealSubtotal + petSubtotal;

  // 3. Echte Schalter-Abgaben und Steuern isolieren (Im Gesamtpreis enthalten für Transparenz)
  const euPortTax = Math.round(rawTotal * 0.08); // 8% Hafengebühr
  const customsTax = vehicle !== 'None' ? 25 : 5; // Zollgebühr für Fahrzeuge
  const netTarif = rawTotal - euPortTax - customsTax;

  return {
    ticketCost: ticketSubtotal,
    vehicleCost: vehicleSubtotal,
    cabinCost: cabinSubtotal,
    mealCost: mealSubtotal,
    petCost: petSubtotal,
    euPortTax: euPortTax,
    customsTax: customsTax,
    netTarif: netTarif,
    totalCost: rawTotal
  };
}
