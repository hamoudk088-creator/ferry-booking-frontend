// src/models/bookingModel.ts

export interface Passenger {
  firstName: string;      // الاسم الأول / Vorname
  lastName: string;       // اللقب / Nachname
  gender: 'M' | 'F';      // الجنس / Geschlecht
  passportNumber: string; // رقم جواز السفر / Reisepassnummer
  nationality: string;    // الجنسية / Nationalität
  birthDate: string;      // تاريخ الميلاد / Geburtsdatum (YYYY-MM-DD)
}

export interface Vehicle {
  type: 'Car' | 'Van' | 'Motorcycle' | 'None'; // نوع المركبة / Fahrzeugtyp
  licensePlate: string;   // رقم لوحة السيارة / Amtliches Kennzeichen
  length?: number;        // طول السيارة
  height?: number;        // ارتفاع السيارة
}

export interface CreateBookingInput {
  routeId: number;
  departureDate: string;
  passengers: Passenger[];
  vehicle: Vehicle;
  contactEmail: string;   
  contactPhone: string;   
}

export interface BookingResponse {
  bookingReference: string; 
  status: 'Pending' | 'Confirmed' | 'Cancelled'; 
  totalPrice: number;    
  details: CreateBookingInput;
  createdAt: Date;       
}
