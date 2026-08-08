export function calculateDynamicFerryPrice(adults: number, children: number, vehicle: string, selectedOffer: any, hasCabin: boolean, hasMeals: boolean, hasPet: boolean) {
  // 1. Basis-Tarife aus dem gewählten Schiff auslesen (Standardisiert)
  const baseAdultPrice = selectedOffer?.basePrice || 90; // 90€ pro Erwachsener
  const baseChildPrice = 45;                            // 45€ pro Kind
  const baseVehiclePrice = selectedOffer?.vehiclePrice || 90; // 90€ für PKW
  const baseCabinPrice = selectedOffer?.cabinPrice || 120;   // 120€ für Innenkabine
  const petPrice = hasPet ? 25 : 0;                     // 25€ für Haustier

  // 2. Posten-Berechnung (Netto-Tarife)
  const adultSubtotal = Number(adults) * baseAdultPrice;
  const childSubtotal = Number(children) * baseChildPrice;
  const vehicleSubtotal = vehicle !== 'None' ? baseVehiclePrice : 0;
  const cabinSubtotal = hasCabin ? baseCabinPrice : 0;
  const mealSubtotal = hasMeals ? 30 * (Number(adults) + Number(children)) : 0;

  // Fixe, transparente Steuern & Hafengebühren (Von Anfang an einkalkuliert)
  const taxesAndFees = 35; 

  // Gesamtsumme mathematisch präzise addieren
  const totalCost = adultSubtotal + childSubtotal + vehicleSubtotal + cabinSubtotal + mealSubtotal + petPrice + taxesAndFees;

  return {
    adultCount: Number(adults),
    childCount: Number(children),
    adultCost: adultSubtotal,
    childCost: childSubtotal,
    vehicleCost: vehicleSubtotal,
    cabinCost: cabinSubtotal,
    mealCost: mealSubtotal,
    petCost: petPrice,
    taxesAndFees: taxesAndFees,
    totalCost: totalCost
  };
}
