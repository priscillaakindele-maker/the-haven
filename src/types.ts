export type RoomCategory = 'villa' | 'suite' | 'pavilion' | 'room';

export interface Room {
  id: string;
  name: string;
  subtitle: string;
  category: RoomCategory;
  pricePerNight: number;
  sizeSqm: number;
  maxOccupancy: number;
  bedType: string;
  view: string;
  heroImage: string;
  images: string[];
  description: string;
  detailedSpecs: {
    squareMeters: number;
    bathroomFeatures: string[];
    techFeatures: string[];
    specialServices: string[];
  };
  amenities: string[];
  isAvailable: boolean;
  featured: boolean;
}

export interface Booking {
  id: string;
  confirmationCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: {
    adults: number;
    children: number;
  };
  extras: {
    helicopterTransfer: boolean;
    dailyBreakfast: boolean;
    spaPackage: boolean;
    privateButler: boolean;
    champagneOnArrival: boolean;
  };
  numberOfNights: number;
  roomTotal: number;
  extrasTotal: number;
  taxAndServiceFee: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface DiningItem {
  id: string;
  category: 'tasting' | 'alacarte' | 'dessert' | 'cellar' | 'bar';
  name: string;
  description: string;
  price: number;
  tags?: string[];
  image?: string;
}

export interface TableReservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  venue: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingPreference: 'indoor' | 'terrace' | 'chef-table';
  specialNotes?: string;
  status: 'confirmed' | 'pending';
}

export interface SpaTreatment {
  id: string;
  category: 'massage' | 'hydrotherapy' | 'ritual' | 'facial' | 'wellness';
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
  benefits: string[];
  image: string;
}

export interface SpaAppointment {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  time: string;
  therapistPreference: string;
  status: 'confirmed' | 'pending';
  totalPrice: number;
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  duration: string;
  pricePerPerson: number;
  image: string;
  description: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'architecture' | 'rooms' | 'dining' | 'spa' | 'grounds';
  imageUrl: string;
  caption: string;
  aspectRatio: 'square' | 'wide' | 'tall';
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  publication: string;
  quote: string;
  rating: number;
  year: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeText: string;
}

export interface CMSContent {
  heroTitle: string;
  heroSubtitle: string;
  announcementBanner: string;
  hotelPhone: string;
  hotelEmail: string;
  locationAddress: string;
  checkInTime: string;
  checkOutTime: string;
  welcomingText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
