export interface Hotel {
  _id?: string;
  name: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  images: string[];
  amenities: string[];
  rating: number;
  pricePerNight: number;
  currency: string;
  roomTypes: {
    name: string;
    description: string;
    price: number;
    capacity: number;
    available: number;
  }[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: boolean;
    smoking: boolean;
  };
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SAMPLE_HOTELS: Hotel[] = [
  {
    name: "Timbertales Luxury Resort",
    description: "Experience luxury in the heart of nature with our premium resort featuring world-class amenities and breathtaking views.",
    location: {
      city: "Coorg",
      state: "Karnataka",
      country: "India",
      address: "123 Coffee Estate Road, Madikeri, Coorg",
      coordinates: {
        latitude: 12.3375,
        longitude: 75.8069
      }
    },
    images: [
      "https://platforms.makemytrip.com/contents/f8efe442-684a-4331-86d9-edc1a165d0c6",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa & Wellness Center",
      "Restaurant",
      "Room Service",
      "Air Conditioning",
      "Mini Bar",
      "Garden View",
      "Mountain View",
      "Free Parking"
    ],
    rating: 4.8,
    pricePerNight: 8500,
    currency: "INR",
    roomTypes: [
      {
        name: "Deluxe Room",
        description: "Spacious room with garden view and modern amenities",
        price: 8500,
        capacity: 2,
        available: 15
      },
      {
        name: "Premium Suite",
        description: "Luxury suite with mountain view and private balcony",
        price: 12000,
        capacity: 4,
        available: 8
      },
      {
        name: "Family Villa",
        description: "Large villa perfect for families with kitchenette",
        price: 18000,
        capacity: 6,
        available: 5
      }
    ],
    contact: {
      phone: "+91-98765-43210",
      email: "info@timbertales.com",
      website: "https://timbertales.com"
    },
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: true,
      smoking: false
    }
  },
  {
    name: "Best Western Hotels & Resorts",
    description: "Discover comfort and luxury worldwide with our premium hotel chain offering exceptional service and amenities.",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      address: "456 Marine Drive, Colaba, Mumbai",
      coordinates: {
        latitude: 18.9217,
        longitude: 72.8347
      }
    },
    images: [
      "https://platforms.makemytrip.com/contents/227f8737-13e4-4e43-95ad-872b488a55cd",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Fitness Center",
      "Business Center",
      "Restaurant",
      "Bar/Lounge",
      "Room Service",
      "Air Conditioning",
      "Flat-screen TV",
      "Free Breakfast"
    ],
    rating: 4.5,
    pricePerNight: 6500,
    currency: "INR",
    roomTypes: [
      {
        name: "Standard Room",
        description: "Comfortable room with city view",
        price: 6500,
        capacity: 2,
        available: 25
      },
      {
        name: "Executive Room",
        description: "Premium room with sea view and extra amenities",
        price: 9500,
        capacity: 2,
        available: 12
      },
      {
        name: "Business Suite",
        description: "Spacious suite with work area and meeting facilities",
        price: 15000,
        capacity: 3,
        available: 8
      }
    ],
    contact: {
      phone: "+91-98765-43211",
      email: "info@bestwesternmumbai.com",
      website: "https://bestwesternmumbai.com"
    },
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: false,
      smoking: true
    }
  },
  {
    name: "Luxe Palace Resort",
    description: "Experience royal luxury with our palace-themed resort featuring traditional architecture and modern comforts.",
    location: {
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      address: "789 Palace Road, Amer, Jaipur",
      coordinates: {
        latitude: 26.9124,
        longitude: 75.7873
      }
    },
    images: [
      "https://promos.makemytrip.com/Hotels_product/Luxe/brands.png",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa & Wellness Center",
      "Restaurant",
      "Bar/Lounge",
      "Room Service",
      "Air Conditioning",
      "Mini Bar",
      "Garden View",
      "Free Parking",
      "Cultural Shows",
      "Camel Rides"
    ],
    rating: 4.9,
    pricePerNight: 15000,
    currency: "INR",
    roomTypes: [
      {
        name: "Heritage Room",
        description: "Traditional room with palace architecture",
        price: 15000,
        capacity: 2,
        available: 10
      },
      {
        name: "Royal Suite",
        description: "Luxury suite with private courtyard",
        price: 25000,
        capacity: 4,
        available: 5
      },
      {
        name: "Maharaja Villa",
        description: "Ultimate luxury villa with private pool",
        price: 45000,
        capacity: 6,
        available: 3
      }
    ],
    contact: {
      phone: "+91-98765-43212",
      email: "info@luxepalace.com",
      website: "https://luxepalace.com"
    },
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 72 hours before check-in",
      pets: false,
      smoking: false
    }
  }
];

export const HOTEL_AMENITIES = [
  "Free WiFi",
  "Swimming Pool",
  "Spa & Wellness Center",
  "Restaurant",
  "Bar/Lounge",
  "Room Service",
  "Air Conditioning",
  "Mini Bar",
  "Garden View",
  "Mountain View",
  "Sea View",
  "Free Parking",
  "Fitness Center",
  "Business Center",
  "Conference Rooms",
  "Laundry Service",
  "Airport Shuttle",
  "Pet Friendly",
  "Smoking Allowed",
  "Non-Smoking",
  "Free Breakfast",
  "All-Inclusive",
  "Kids Club",
  "Tennis Court",
  "Golf Course",
  "Beach Access",
  "Skiing",
  "Hiking Trails",
  "Cultural Shows",
  "Camel Rides"
];

export const ROOM_TYPES = [
  "Standard Room",
  "Deluxe Room",
  "Premium Room",
  "Executive Room",
  "Suite",
  "Presidential Suite",
  "Family Room",
  "Villa",
  "Cottage",
  "Bungalow",
  "Apartment",
  "Studio"
]; 