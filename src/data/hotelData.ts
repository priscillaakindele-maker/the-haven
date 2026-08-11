import { Room, DiningItem, SpaTreatment, Experience, GalleryItem, Testimonial, Award, CMSContent } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'The Haven Cliffside Villa',
    subtitle: 'Private Infinity Pool & Dedicated 24/7 Butler',
    category: 'villa',
    pricePerNight: 3200,
    sizeSqm: 280,
    maxOccupancy: 4,
    bedType: 'Custom King Cloud Bed + Daybed',
    view: 'Panoramic Amalfi Cliffside & Sea',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=85&w=1920',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=85&w=1200'
    ],
    description: 'Suspended dramatically above the Mediterranean horizon, The Haven Cliffside Villa represents the pinnacle of private sanctuary luxury. Featuring a cantilevered heated saltwater pool, private sun deck, custom Scandinavian teak woodwork, and round-the-clock butler service.',
    detailedSpecs: {
      squareMeters: 280,
      bathroomFeatures: ['Dual Carrara Marble Rain Showers', 'Freestanding Monolithic Bathing Tub', 'Dyson Airwrap & Heated Floors', 'Organic Diptyque Amenities'],
      techFeatures: ['Bowers & Wilkins 360 Spatial Audio', 'Motorized Blackout Sheers', 'Integrated iPad Concierge Control', 'Invisible Apple TV & OLED Display'],
      specialServices: ['24/7 Personal Valet & Butler', 'Private In-Villa Chef Dining On Request', 'Helicopter Luggage Dispatch', 'Unpacking & Steaming Service']
    },
    amenities: [
      'Private saltwater infinity pool',
      '24-hour dedicated butler service',
      'Panoramic oceanfront terrace',
      'In-villa wine cellar & sommelier selection',
      'Outdoor rain shower',
      'Custom cloud mattress with 1000-thread Egyptian cotton',
      'Daily complimentary high tea'
    ],
    isAvailable: true,
    featured: true
  },
  {
    id: 'room-2',
    name: 'Sanctuary Ocean Suite',
    subtitle: 'Expansive Terrace with Private Plunge Pool',
    category: 'suite',
    pricePerNight: 1850,
    sizeSqm: 140,
    maxOccupancy: 3,
    bedType: 'Super King Featherbed',
    view: 'Unobstructed Tyrrhenian Sea View',
    heroImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=85&w=1920',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=85&w=1200'
    ],
    description: 'Designed with clean architectural lines, muted limestone floors, and warm natural oak tones. The Sanctuary Ocean Suite seamlessly merges indoor tranquility with an expansive outdoor living room and sunken heated plunge pool.',
    detailedSpecs: {
      squareMeters: 140,
      bathroomFeatures: ['Deep Soaking Travertine Tub', 'Walk-in Glass Rain Shower', 'Byredo Custom Fragrance Line', 'Double Vanity Basins'],
      techFeatures: ['Bang & Olufsen Wireless Sound', 'Smart Lighting Scenes', 'Private Starlink Wi-Fi Hub'],
      specialServices: ['Nightly Turndown Ritual', 'Daily Fresh Botanical Infusions', 'Priority Dining Reservations']
    },
    amenities: [
      'Sunken plunge pool',
      'Floor-to-ceiling glass sliding doors',
      'Custom teak daybeds',
      'Complimentary gourmet espresso bar',
      'Subtle ambient lighting control',
      'Plush cashmere lounge robes'
    ],
    isAvailable: true,
    featured: true
  },
  {
    id: 'room-3',
    name: 'Pine Canopy Forest Pavilion',
    subtitle: 'Secluded Woodland Sanctuary with Stone Soaking Bath',
    category: 'pavilion',
    pricePerNight: 1400,
    sizeSqm: 110,
    maxOccupancy: 2,
    bedType: 'Emperor King Bed',
    view: 'Maritime Pine Forest & Coastal Valleys',
    heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=85&w=1920',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=85&w=1200'
    ],
    description: 'Embraced by ancient scent-filled maritime pines, the Forest Pavilion offers an intimate retreat for mind and soul. Features a private Japanese-inspired stone soaking bath carved from natural mountain granite.',
    detailedSpecs: {
      squareMeters: 110,
      bathroomFeatures: ['Outdoor Mountain Granite Tub', 'Steam Rain Shower', 'Aromatherapy Bath Salts'],
      techFeatures: ['Acoustic Soundproofing', 'Gentle Circadian Lighting', 'Integrated Fireplace'],
      specialServices: ['In-pavilion Morning Yoga Setup', 'Private Tea Ceremony Setup']
    },
    amenities: [
      'Private outdoor stone bath',
      'Double-sided gas fireplace',
      'Custom cedar wood decking',
      'Organic herbal pillow menu',
      'Yoga mats & meditation cushions'
    ],
    isAvailable: true,
    featured: true
  },
  {
    id: 'room-4',
    name: 'Horizon Minimalist King Suite',
    subtitle: 'Understated Elegance with Sweeping Ocean Vistas',
    category: 'room',
    pricePerNight: 950,
    sizeSqm: 75,
    maxOccupancy: 2,
    bedType: 'Custom King Plush Mattress',
    view: 'Cliffside Coastline',
    heroImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=85&w=1920',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=85&w=1200'
    ],
    description: 'Inspired by Japanese minimalism and Nordic warm texture. High-ceilinged, airy room featuring a private balcony, handcrafted pottery, bespoke linen robes, and floor-to-ceiling vistas.',
    detailedSpecs: {
      squareMeters: 75,
      bathroomFeatures: ['Free-standing tub', 'Rain shower', 'Custom organic toiletries'],
      techFeatures: ['High-speed Starlink Wi-Fi', 'Touchless Climate Control'],
      specialServices: ['Evening Pillow Mist Service']
    },
    amenities: [
      'Private glass balcony',
      'Curated artisan tea bar',
      'Plush linen lounge furniture',
      'Complimentary spa hydrotherapy access'
    ],
    isAvailable: true,
    featured: false
  }
];

export const INITIAL_DINING: DiningItem[] = [
  {
    id: 'd-1',
    category: 'tasting',
    name: '7-Course Mediterranean Heritage Tasting',
    description: 'Curated by 3 Michelin-Star Executive Chef Jean-Luc Laurent. Featuring wild red prawns from Sorrento, hand-harvested black truffle, and 24-hour slow roasted heritage veal.',
    price: 280,
    tags: ['Chef Special', 'Michelin 3-Star', 'Grand Pairing Available'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'd-2',
    category: 'alacarte',
    name: 'Wild Bluefin Tuna Tartare with White Truffle Pearl',
    description: 'Sustainably caught bluefin, citrus blossom reduction, imperial caviar, crispy rice leaf crisp.',
    price: 68,
    tags: ['Gluten-Free', 'Signature Starter'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'd-3',
    category: 'alacarte',
    name: 'Handcrafted Tagliolini with Amalfi Lemon & Langoustine',
    description: 'Bronze-extruded house pasta, organic Sorrento lemons, butter-poached Mediterranean langoustine, ocean foam.',
    price: 84,
    tags: ['House Specialty'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'd-4',
    category: 'dessert',
    name: 'Golden Honeycomb & Smoked Rosemary Gelato',
    description: 'Wild mountain honey, 24-karat edible leaf, smoked cedarwood infusion, toasted pine nut praline.',
    price: 32,
    tags: ['Artisanal Dessert'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'd-5',
    category: 'bar',
    name: 'The Haven Botanical Elixir (1942 Reserva)',
    description: 'Don Julio 1942, wild thyme syrup, clarified local blood orange, smoked rosemary smoke dome.',
    price: 45,
    tags: ['Craft Cocktail', 'Sunken Bar Highlight'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1000'
  }
];

export const INITIAL_SPA: SpaTreatment[] = [
  {
    id: 'spa-1',
    category: 'ritual',
    name: 'The Haven Total Transcendence Ritual',
    durationMinutes: 120,
    price: 480,
    description: 'Our most sought-after signature journey. Begins with a warm volcanic stone foot cleanse, followed by a customized full-body organic oil massage, sound bowl resonance vibration, and thermal hydrotherapy session.',
    benefits: ['Deep muscle release', 'Mental clarity & nervous system reset', 'Skin cell rejuvenation'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'spa-2',
    category: 'massage',
    name: 'Warm Cedarwood & Botanical Deep Tissue',
    durationMinutes: 90,
    price: 360,
    description: 'Therapeutic pressure targeted to release chronic tension, using essential oils distilled from pine, sage, and wild mountain cedar harvested on hotel grounds.',
    benefits: ['Post-travel revival', 'Joint mobility enhancement', 'Circulation boost'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'spa-3',
    category: 'hydrotherapy',
    name: 'Japanese Onsen Thermal Mineral Bathing',
    durationMinutes: 60,
    price: 220,
    description: 'Private mineral bath immersion enriched with magnesium salts and botanical elixirs, set against a quiet cliffside bamboo courtyard.',
    benefits: ['Detoxification', 'Muscle inflammation relief', 'Deep sleep induction'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=85&w=1000'
  },
  {
    id: 'spa-4',
    category: 'facial',
    name: 'Diamond & Botanical Cell-Renewal Facial',
    durationMinutes: 75,
    price: 390,
    description: 'Advanced micro-current sculpting combined with pure rosehip oil, peptide serums, and cold marble stone lymphatic massage.',
    benefits: ['Instant glow & lift', 'Hydration boost', 'Cellular repair'],
    image: 'https://images.unsplash.com/photo-1512290900673-70020f1883b4?auto=format&fit=crop&q=85&w=1000'
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Private Riviera Yacht Excursion',
    category: 'Maritime Adventure',
    duration: 'Full Day (8 Hours)',
    pricePerPerson: 1800,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=85&w=1200',
    description: 'Board our bespoke 65ft Rivarama yacht with a private skipper and sommelier. Explore hidden sea caves, secluded swimming coves, and enjoy a private lobster lunch served on deck.',
    highlights: ['Private Riviera Skipper & Crew', 'Chilled Vintage Champagne & Raw Bar', 'Secluded snorkelling coves', 'Sunset deck dining']
  },
  {
    id: 'exp-2',
    title: 'Sunset Helicopter Wine Tasting',
    category: 'Aviation & Enology',
    duration: '3.5 Hours',
    pricePerPerson: 1450,
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=85&w=1200',
    description: 'Lift off from The Haven private helipad for a thrilling flight over coastal cliffs, landing directly at a private century-old volcanic vineyard for exclusive cellar access.',
    highlights: ['Direct helipad departure', 'Guided flight over UNESCO coastline', 'Tasting rare 50-year reserve vintages', 'Private chef pairings']
  },
  {
    id: 'exp-3',
    title: 'Stargazing with Master Astronomer',
    category: 'Cosmic Evening',
    duration: '2 Hours',
    pricePerPerson: 350,
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=85&w=1200',
    description: 'On our isolated cliffside observatory deck, discover deep space nebulas and constellations guided by a resident astrophysicist using a research-grade telescope.',
    highlights: ['Research-grade Meade telescope', 'Cosmic cocktail lounge setup', 'Personalized star map print souvenir']
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Architectural Monolith at Sunset',
    category: 'architecture',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=85&w=1200',
    caption: 'Minimalist limestone structure built into the ancient cliff face.',
    aspectRatio: 'wide'
  },
  {
    id: 'g-2',
    title: 'Sanctuary Infinity Pool',
    category: 'grounds',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=85&w=1200',
    caption: 'Saltwater infinity pool merging seamlessly with the sea skyline.',
    aspectRatio: 'square'
  },
  {
    id: 'g-3',
    title: "L'Étoile Private Dining Room",
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=1200',
    caption: 'Candlelit 3-Michelin star dining room framing sea horizons.',
    aspectRatio: 'tall'
  },
  {
    id: 'g-4',
    title: 'Cliffside Villa Suite Interior',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=85&w=1200',
    caption: 'Natural oak, Belgian linen, and floor-to-ceiling glass architecture.',
    aspectRatio: 'wide'
  },
  {
    id: 'g-5',
    title: 'Hydrotherapy Onsen Courtyard',
    category: 'spa',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1200',
    caption: 'Quiet stone courtyard surrounded by maritime pines and steam baths.',
    aspectRatio: 'square'
  },
  {
    id: 'g-6',
    title: 'Sunken Garden Sunset Lounge',
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1200',
    caption: 'Artisanal botanical cocktails as twilight descends over the Mediterranean.',
    aspectRatio: 'tall'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Architectural Digest',
    title: 'Design Excellence',
    publication: 'Architectural Digest, June 2026',
    quote: 'The Haven sets a new global benchmark for quiet luxury. Every detail — from the silent acoustic dampening to the monolithic limestone pools — radiates pure architectural mastery.',
    rating: 5,
    year: '2026'
  },
  {
    id: 't-2',
    author: 'Condé Nast Traveler',
    title: 'Gold List Winner',
    publication: 'Condé Nast Traveler 2026 Reader Awards',
    quote: 'Rarely does a hotel manage to combine extreme privacy with such emotional warmth. The Haven feels less like a hotel and more like a private sanctuary reserved for a fortunate few.',
    rating: 5,
    year: '2026'
  },
  {
    id: 't-3',
    author: 'Lord Harrison Vance',
    title: 'Unrivaled Tranquility',
    publication: 'Verified Private Guest',
    quote: 'Having stayed at Amanzoe and Four Seasons Cap-Ferrat, I can state without hesitation that The Haven surpasses them all. The butler team anticipated every desire before we spoke.',
    rating: 5,
    year: '2026'
  }
];

export const INITIAL_AWARDS: Award[] = [
  {
    id: 'a-1',
    title: "World's 50 Best Hotels #1",
    issuer: 'The World’s 50 Best Academy',
    year: '2026',
    badgeText: 'Ranked #1 Resort'
  },
  {
    id: 'a-2',
    title: 'Forbes 5-Star Hotel & Spa',
    issuer: 'Forbes Travel Guide',
    year: '2026',
    badgeText: 'Highest Distinction'
  },
  {
    id: 'a-3',
    title: '3 Michelin Keys',
    issuer: 'Guide Michelin',
    year: '2026',
    badgeText: 'Exceptional Stay'
  },
  {
    id: 'a-4',
    title: '3 Michelin Stars (L\'Étoile)',
    issuer: 'Guide Michelin Culinary',
    year: '2026',
    badgeText: 'Culinary Pinnacle'
  }
];

export const INITIAL_CMS: CMSContent = {
  heroTitle: 'Where Luxury Meets Tranquility.',
  heroSubtitle: 'An intimate 5-star sanctuary suspended between cliff and sea.',
  announcementBanner: 'Now Accepting Summer & Autumn 2026 Reservations',
  hotelPhone: '+39 081 998 0100',
  hotelEmail: 'concierge@thehaven-resort.com',
  locationAddress: 'Via Panoramica 88, 84011 Amalfi Cliffside, Italy',
  checkInTime: '15:00',
  checkOutTime: '12:00',
  welcomingText: 'Welcome to The Haven. A world of discreet luxury, organic wellness, and culinary mastery awaits you.'
};
