"use client";

// Speichert den aktuellen Buchungszustand sicher im Browser des Kunden
export function saveBookingSession(data: any) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nisou_booking_session', JSON.stringify(data));
    }
  } catch (err) {
    console.error("Fehler beim Sichern der Sitzung:", err);
  }
}

// Holt den letzten Zustand bei einem versehentlichen Neuladen sofort zurück
export function loadBookingSession() {
  try {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('nisou_booking_session');
      return session ? JSON.parse(session) : null;
    }
  } catch (err) {
    console.error("Fehler beim Laden der Sitzung:", err);
  }
  return null;
}

// Löscht die Sitzungsdaten nach erfolgreichem Ticketdruck für die nächste Buchung
export function clearBookingSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('nisou_booking_session');
  }
}
