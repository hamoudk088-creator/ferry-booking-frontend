"use client";

export function saveBookingSession(data: any) {
  try {
    if (typeof window !== 'undefined') {
      // Bereinigt sensible Zwischendaten vor dem Ablegen im localStorage gegen XSS-Auslesung
      const sanitizedData = {
        subStage: data.subStage,
        mainEmail: data.mainEmail,
        plateNumber: data.plateNumber,
        passengerDetails: data.passengerDetails?.map((p: any) => ({
          type: p.type,
          firstName: p.firstName,
          lastName: p.lastName
        }))
      };
      localStorage.setItem('nisou_booking_session', JSON.stringify(sanitizedData));
    }
  } catch (err) {
    console.error("Session serialization warning:", err);
  }
}

export function loadBookingSession() {
  try {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('nisou_booking_session');
      return session ? JSON.parse(session) : null;
    }
  } catch (err) {
    return null;
  }
}

export function clearBookingSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('nisou_booking_session');
  }
}
