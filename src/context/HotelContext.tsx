import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Room,
  Booking,
  DiningItem,
  TableReservation,
  SpaTreatment,
  SpaAppointment,
  Experience,
  GalleryItem,
  Testimonial,
  Award,
  CMSContent,
  ChatMessage
} from '../types';
import {
  INITIAL_ROOMS,
  INITIAL_DINING,
  INITIAL_SPA,
  INITIAL_EXPERIENCES,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_AWARDS,
  INITIAL_CMS
} from '../data/hotelData';

export type PageView =
  | 'home'
  | 'rooms'
  | 'room-detail'
  | 'dining'
  | 'spa'
  | 'experiences'
  | 'gallery'
  | 'contact'
  | 'booking'
  | 'admin';

interface DraftBooking {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  selectedRoomId: string;
  extras: {
    helicopterTransfer: boolean;
    dailyBreakfast: boolean;
    spaPackage: boolean;
    privateButler: boolean;
    champagneOnArrival: boolean;
  };
  specialRequests: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

interface HotelContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
  viewRoomDetail: (id: string) => void;
  
  // Data lists
  rooms: Room[];
  updateRoom: (updatedRoom: Room) => void;
  addRoom: (newRoom: Room) => void;
  deleteRoom: (id: string) => void;

  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled') => void;

  tableReservations: TableReservation[];
  addTableReservation: (reservation: TableReservation) => void;

  spaAppointments: SpaAppointment[];
  addSpaAppointment: (appointment: SpaAppointment) => void;

  diningItems: DiningItem[];
  spaTreatments: SpaTreatment[];
  experiences: Experience[];

  galleryItems: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  testimonials: Testimonial[];
  awards: Award[];

  cmsContent: CMSContent;
  updateCMSContent: (newContent: Partial<CMSContent>) => void;

  // Booking Draft
  draftBooking: DraftBooking;
  setDraftBooking: React.Dispatch<React.SetStateAction<DraftBooking>>;
  startBookingForRoom: (roomId: string) => void;

  // Modals & UI
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  activeLightboxImage: GalleryItem | null;
  setActiveLightboxImage: (item: GalleryItem | null) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (login: boolean) => void;
  
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    confirmationCode: 'TH-2026-X892',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@luxury.com',
    guestPhone: '+1 (555) 234-5678',
    roomId: 'room-1',
    roomName: 'The Haven Cliffside Villa',
    checkInDate: '2026-08-15',
    checkOutDate: '2026-08-18',
    guests: { adults: 2, children: 0 },
    extras: {
      helicopterTransfer: true,
      dailyBreakfast: true,
      spaPackage: true,
      privateButler: true,
      champagneOnArrival: true
    },
    numberOfNights: 3,
    roomTotal: 9600,
    extrasTotal: 1850,
    taxAndServiceFee: 1145,
    totalPrice: 12595,
    status: 'confirmed',
    specialRequests: 'Prefer Dom Pérignon 2012 vintage on arrival.',
    createdAt: '2026-08-01'
  },
  {
    id: 'bk-102',
    confirmationCode: 'TH-2026-B319',
    guestName: 'Marcus Sterling',
    guestEmail: 'marcus@sterlingholdings.com',
    guestPhone: '+44 20 7946 0912',
    roomId: 'room-2',
    roomName: 'Sanctuary Ocean Suite',
    checkInDate: '2026-08-20',
    checkOutDate: '2026-08-24',
    guests: { adults: 2, children: 1 },
    extras: {
      helicopterTransfer: false,
      dailyBreakfast: true,
      spaPackage: true,
      privateButler: false,
      champagneOnArrival: true
    },
    numberOfNights: 4,
    roomTotal: 7400,
    extrasTotal: 720,
    taxAndServiceFee: 812,
    totalPrice: 8932,
    status: 'confirmed',
    specialRequests: 'High chair and extra organic pillows needed.',
    createdAt: '2026-08-02'
  }
];

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Load state from localStorage or initial fallback
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('haven_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('haven_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [tableReservations, setTableReservations] = useState<TableReservation[]>(() => {
    const saved = localStorage.getItem('haven_dining_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const [spaAppointments, setSpaAppointments] = useState<SpaAppointment[]>(() => {
    const saved = localStorage.getItem('haven_spa_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('haven_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [cmsContent, setCmsContent] = useState<CMSContent>(() => {
    const saved = localStorage.getItem('haven_cms');
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('haven_admin_auth') === 'true';
  });

  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Draft booking state
  const [draftBooking, setDraftBooking] = useState<DraftBooking>({
    checkInDate: '2026-08-10',
    checkOutDate: '2026-08-14',
    adults: 2,
    children: 0,
    selectedRoomId: 'room-1',
    extras: {
      helicopterTransfer: false,
      dailyBreakfast: true,
      spaPackage: false,
      privateButler: false,
      champagneOnArrival: true
    },
    specialRequests: '',
    guestName: '',
    guestEmail: '',
    guestPhone: ''
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('haven_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('haven_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('haven_dining_reservations', JSON.stringify(tableReservations));
  }, [tableReservations]);

  useEffect(() => {
    localStorage.setItem('haven_spa_appointments', JSON.stringify(spaAppointments));
  }, [spaAppointments]);

  useEffect(() => {
    localStorage.setItem('haven_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('haven_cms', JSON.stringify(cmsContent));
  }, [cmsContent]);

  useEffect(() => {
    localStorage.setItem('haven_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const viewRoomDetail = (id: string) => {
    setSelectedRoomId(id);
    setCurrentPage('room-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startBookingForRoom = (roomId: string) => {
    setDraftBooking(prev => ({ ...prev, selectedRoomId: roomId }));
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    showToast(`Room "${updatedRoom.name}" updated successfully.`);
  };

  const addRoom = (newRoom: Room) => {
    setRooms(prev => [...prev, newRoom]);
    showToast(`New room "${newRoom.name}" added.`);
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
    showToast('Room deleted.');
  };

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking ${newBooking.confirmationCode} confirmed!`);
  };

  const updateBookingStatus = (id: string, status: 'confirmed' | 'pending' | 'cancelled') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast(`Booking status updated to ${status}.`);
  };

  const addTableReservation = (res: TableReservation) => {
    setTableReservations(prev => [res, ...prev]);
    showToast(`Table reserved at ${res.venue} for ${res.guestName}.`);
  };

  const addSpaAppointment = (app: SpaAppointment) => {
    setSpaAppointments(prev => [app, ...prev]);
    showToast(`Spa appointment for ${app.treatmentName} confirmed!`);
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems(prev => [item, ...prev]);
    showToast('Photo added to gallery.');
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    showToast('Photo removed from gallery.');
  };

  const updateCMSContent = (newContent: Partial<CMSContent>) => {
    setCmsContent(prev => ({ ...prev, ...newContent }));
    showToast('Website content updated live.');
  };

  return (
    <HotelContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedRoomId,
        setSelectedRoomId,
        viewRoomDetail,
        rooms,
        updateRoom,
        addRoom,
        deleteRoom,
        bookings,
        addBooking,
        updateBookingStatus,
        tableReservations,
        addTableReservation,
        spaAppointments,
        addSpaAppointment,
        diningItems: INITIAL_DINING,
        spaTreatments: INITIAL_SPA,
        experiences: INITIAL_EXPERIENCES,
        galleryItems,
        addGalleryItem,
        deleteGalleryItem,
        testimonials: INITIAL_TESTIMONIALS,
        awards: INITIAL_AWARDS,
        cmsContent,
        updateCMSContent,
        draftBooking,
        setDraftBooking,
        startBookingForRoom,
        isConciergeOpen,
        setIsConciergeOpen,
        activeLightboxImage,
        setActiveLightboxImage,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        toastMessage,
        showToast
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
