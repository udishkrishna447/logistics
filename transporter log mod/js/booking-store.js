/**
 * AgriNex Vehicle Logistics Engine & Reactive Booking Store
 * Enforces strict vehicle role-based isolation:
 * - TRUCK: Heavy Freight (> 100 kg and tonnes)
 * - NORMAL: Petrol/Diesel Medium Vehicles (10 kg - 100 kg)
 * - EV: Electric Vehicles (10 kg - 30 kg) + Exclusive EV Charging Hub Navigation
 */

const BookingStore = {
  STORAGE_KEY: 'agrinex_logistics_bookings_v2',
  SESSION_KEY: 'agrinex_active_session_role',
  CHARGING_KEY: 'agrinex_charging_history',

  defaultBookings: [
    // --- TRUCK BOOKINGS (> 100 kg up to several tonnes) ---
    {
      id: 'TRK-801',
      vehicleType: 'TRUCK',
      customerName: 'Ravi Kumar (Kongu Farmers Collective)',
      customerPhone: '+91 98421 11201',
      item: 'Fresh Farm Tomatoes (48 Crates)',
      weightKg: 2000,
      weightDisplay: '2.0 Tonnes',
      pickup: 'Thindal Farmgate Collection Point, Erode',
      delivery: 'Coimbatore APMC Mandi Gate #2',
      dateTime: '15 Sep 2026, 08:30 AM',
      fare: '₹1,650',
      status: 'IN_TRANSIT', // Default active demo trip
      distanceKm: 85,
      route: 'Thindal ➔ Perundurai ➔ Bhavani ➔ Coimbatore Mandi',
      notes: 'Requires heavy freight commercial truck with ventilated crates.'
    },
    {
      id: 'TRK-802',
      vehicleType: 'TRUCK',
      customerName: 'Selvam V. (Perundurai FPO)',
      customerPhone: '+91 94432 44312',
      item: 'Organic Paddy Harvest (Bags)',
      weightKg: 4500,
      weightDisplay: '4.5 Tonnes',
      pickup: 'Perundurai FPO Aggregation Yard',
      delivery: 'Erode Central Civil Supplies Godown',
      dateTime: '15 Sep 2026, 11:00 AM',
      fare: '₹3,400',
      status: 'AVAILABLE',
      distanceKm: 32,
      route: 'Perundurai ➔ NH 544 ➔ Erode Central',
      notes: 'Full truckload, moisture tested, direct godown delivery.'
    },
    {
      id: 'TRK-803',
      vehicleType: 'TRUCK',
      customerName: 'Murugan K. (Bhavani Agro Society)',
      customerPhone: '+91 97894 88723',
      item: 'Hill Cavandish Bananas (Bunches)',
      weightKg: 1800,
      weightDisplay: '1.8 Tonnes',
      pickup: 'Bhavani Riverbed Farmgate',
      delivery: 'Tiruppur Wholesale Fruit Market',
      dateTime: '15 Sep 2026, 01:15 PM',
      fare: '₹2,100',
      status: 'AVAILABLE',
      distanceKm: 48,
      route: 'Bhavani ➔ Chengapalli ➔ Tiruppur',
      notes: 'Strap crates securely to prevent bruising.'
    },

    // --- NORMAL VEHICLE BOOKINGS (10 kg to 100 kg, Petrol/Diesel) ---
    {
      id: 'NRM-201',
      vehicleType: 'NORMAL',
      customerName: 'Anitha R. (Nilgiri Spices)',
      customerPhone: '+91 98422 33411',
      item: 'Sorted Green Cardamom & Black Pepper',
      weightKg: 45,
      weightDisplay: '45 kg',
      pickup: 'Sathyamangalam Hill Depot',
      delivery: 'Erode Commercial Spices Auction Hall',
      dateTime: '15 Sep 2026, 09:15 AM',
      fare: '₹620',
      status: 'AVAILABLE',
      distanceKm: 42,
      route: 'Sathyamangalam ➔ Gobi ➔ Erode',
      notes: 'High-value aromatic spice parcels. Keep dry.'
    },
    {
      id: 'NRM-202',
      vehicleType: 'NORMAL',
      customerName: 'Palanisamy G. (Organic Press)',
      customerPhone: '+91 94421 77823',
      item: 'Cold Pressed Sesame & Groundnut Oil Tins',
      weightKg: 70,
      weightDisplay: '70 kg',
      pickup: 'Gobichettipalayam Mill Depot',
      delivery: 'Perundurai Retail Distributor',
      dateTime: '15 Sep 2026, 10:45 AM',
      fare: '₹750',
      status: 'AVAILABLE',
      distanceKm: 28,
      route: 'Gobi ➔ Kunnathur ➔ Perundurai',
      notes: 'Food-grade sealed tins, upright handling required.'
    },
    {
      id: 'NRM-203',
      vehicleType: 'NORMAL',
      customerName: 'Dr. Subramanian (Auro Herbals)',
      customerPhone: '+91 97881 22904',
      item: 'Wild Forest Honey & Dried Herbal Roots',
      weightKg: 30,
      weightDisplay: '30 kg',
      pickup: 'Bhavani Sagar Forest Fringe Hub',
      delivery: 'Erode Ayurvedic Pharmacy Center',
      dateTime: '15 Sep 2026, 02:30 PM',
      fare: '₹480',
      status: 'AVAILABLE',
      distanceKm: 36,
      route: 'Bhavani Sagar ➔ Chithode ➔ Erode',
      notes: 'Fragile glass containers with bubble wrap.'
    },

    // --- EV VEHICLE BOOKINGS (10 kg to 30 kg, Electric Vehicle) ---
    {
      id: 'EV-101',
      vehicleType: 'EV',
      customerName: 'K. Deepa (Thindal Hydroponics)',
      customerPhone: '+91 98433 11892',
      item: 'Fresh White Button Mushrooms (Punnets)',
      weightKg: 15,
      weightDisplay: '15 kg',
      pickup: 'Thindal Polyhouse Eco-Farm',
      delivery: 'Erode Swiggy Instamart Darkstore',
      dateTime: '15 Sep 2026, 08:45 AM',
      fare: '₹190',
      status: 'AVAILABLE',
      distanceKm: 8,
      route: 'Thindal Farmgate ➔ Perundurai Road Darkstore',
      notes: 'Zero-emission green delivery. Low temperature pack.'
    },
    {
      id: 'EV-102',
      vehicleType: 'EV',
      customerName: 'M. Ramesh (Modakkurichi Berry Farm)',
      customerPhone: '+91 94435 88910',
      item: 'Organic Farmgate Strawberries (Trays)',
      weightKg: 22,
      weightDisplay: '22 kg',
      pickup: 'Modakkurichi Organic Plot',
      delivery: 'Erode Town Gourmet Supermarket',
      dateTime: '15 Sep 2026, 11:30 AM',
      fare: '₹280',
      status: 'AVAILABLE',
      distanceKm: 14,
      route: 'Modakkurichi ➔ Solar ➔ Erode Town',
      notes: 'Delicate berries, requires smooth EV regenerative braking.'
    },
    {
      id: 'EV-103',
      vehicleType: 'EV',
      customerName: 'S. Nithya (Green Leaf Farms)',
      customerPhone: '+91 97892 44102',
      item: 'Living Hydroponic Microgreens & Salad Greens',
      weightKg: 12,
      weightDisplay: '12 kg',
      pickup: 'Villarasampatti Micro-Farm',
      delivery: 'Erode Daily Farm-to-Fork Store',
      dateTime: '15 Sep 2026, 03:00 PM',
      fare: '₹160',
      status: 'AVAILABLE',
      distanceKm: 6,
      route: 'Villarasampatti ➔ Collectorate ➔ Brough Road',
      notes: 'Express 30-min delivery window.'
    }
  ],

  // EXCLUSIVE EV CHARGING STATIONS (NH 544 & Erode Agro Corridor)
  chargingStations: [
    {
      id: 'CHG-01',
      name: 'Perundurai NH 544 EV Superfast Hub',
      distanceKm: 2.4,
      address: 'NH 544 Toll Plaza Bypass, Opp. Sipcot Industrial Gate, Perundurai',
      types: 'CCS2 60kW DC Fast + Type 2 22kW AC',
      availablePorts: '2 / 4 Ports Available',
      isOpen: true,
      openStatus: 'Open 24/7',
      rate: '₹14.50 / kWh',
      lat: 11.2785,
      lng: 77.5834,
      mapLink: 'https://www.google.com/maps/dir/?api=1&destination=11.2785,77.5834'
    },
    {
      id: 'CHG-02',
      name: 'Erode Central Tata Power EV Fast Bay',
      distanceKm: 4.8,
      address: 'Swastik Roundabout, Brough Road, Erode Central',
      types: 'CCS2 50kW Dual Gun Fast Charger',
      availablePorts: '3 / 4 Ports Available',
      isOpen: true,
      openStatus: 'Open 24/7',
      rate: '₹15.00 / kWh',
      lat: 11.3410,
      lng: 77.7172,
      mapLink: 'https://www.google.com/maps/dir/?api=1&destination=11.3410,77.7172'
    },
    {
      id: 'CHG-03',
      name: 'Bhavani Greenway Agro-EV Charging Station',
      distanceKm: 7.1,
      address: 'Kaveri Riverside Highway Sector, Bhavani',
      types: 'CCS2 60kW DC + Bharat DC-001 Fast Bay',
      availablePorts: '1 / 2 Ports Available',
      isOpen: true,
      openStatus: 'Open 24/7',
      rate: '₹13.80 / kWh',
      lat: 11.4485,
      lng: 77.6835,
      mapLink: 'https://www.google.com/maps/dir/?api=1&destination=11.4485,77.6835'
    },
    {
      id: 'CHG-04',
      name: 'Coimbatore APMC Mandi Commercial EV Bay',
      distanceKm: 18.2,
      address: 'Gate #2 Commercial Vehicle Parking, APMC Mandi Yard, Coimbatore',
      types: 'CCS2 120kW Ultra-Fast Dual Gun',
      availablePorts: '4 / 4 Ports Available',
      isOpen: true,
      openStatus: 'Open 24/7',
      rate: '₹16.20 / kWh',
      lat: 11.0065,
      lng: 76.9625,
      mapLink: 'https://www.google.com/maps/dir/?api=1&destination=11.0065,76.9625'
    }
  ],

  // Load bookings from storage or initialize
  getBookings: function() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage read error, using default data:', e);
    }
    this.saveBookings(this.defaultBookings);
    return this.defaultBookings;
  },

  saveBookings: function(bookings) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  },

  // Get bookings strictly isolated by vehicle type
  getBookingsByVehicle: function(vehicleType) {
    const all = this.getBookings();
    return all.filter(b => b.vehicleType === vehicleType);
  },

  // Validate weight capacity according to selected vehicle type
  validateCapacity: function(vehicleType, weightKg) {
    const w = parseFloat(weightKg);
    if (isNaN(w) || w <= 0) {
      return { valid: false, message: 'Please enter a valid positive weight.' };
    }

    if (vehicleType === 'EV') {
      if (w < 10 || w > 30) {
        return {
          valid: false,
          message: 'EV vehicles can carry only 10–30 kg. Please select a Normal Vehicle or Truck.'
        };
      }
      return { valid: true };
    }

    if (vehicleType === 'NORMAL') {
      if (w < 10) {
        return {
          valid: false,
          message: 'Minimum load for a Normal Vehicle is 10 kg. For micro-loads, use an EV.'
        };
      }
      if (w > 100) {
        return {
          valid: false,
          message: 'Normal vehicles can carry only 10–100 kg. Please select a Truck.'
        };
      }
      return { valid: true };
    }

    if (vehicleType === 'TRUCK') {
      if (w <= 100) {
        return {
          valid: false,
          message: 'Trucks are for heavy loads (>100 kg / tonnes). For loads under 100 kg, please select an EV or Normal Vehicle.'
        };
      }
      return { valid: true };
    }

    return { valid: false, message: 'Unknown vehicle type selected.' };
  },

  // Create a new customer booking with automatic vehicle queue routing
  createBooking: function(bookingData) {
    const validation = this.validateCapacity(bookingData.vehicleType, bookingData.weightKg);
    if (!validation.valid) {
      return { success: false, error: validation.message };
    }

    const bookings = this.getBookings();
    const prefix = bookingData.vehicleType === 'TRUCK' ? 'TRK' : (bookingData.vehicleType === 'NORMAL' ? 'NRM' : 'EV');
    const newId = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = {
      id: newId,
      vehicleType: bookingData.vehicleType,
      customerName: bookingData.customerName || 'AgriNex Farmer/Trader',
      customerPhone: bookingData.customerPhone || '+91 98421 00000',
      item: bookingData.item || 'Agricultural Produce',
      weightKg: parseFloat(bookingData.weightKg),
      weightDisplay: bookingData.weightDisplay || (bookingData.weightKg >= 1000 ? `${(bookingData.weightKg/1000).toFixed(1)} Tonnes` : `${bookingData.weightKg} kg`),
      pickup: bookingData.pickup || 'Erode Rural Farmgate',
      delivery: bookingData.delivery || 'Coimbatore Mandi',
      dateTime: bookingData.dateTime || new Date().toLocaleString(),
      fare: bookingData.fare || (bookingData.vehicleType === 'TRUCK' ? '₹2,400' : (bookingData.vehicleType === 'NORMAL' ? '₹580' : '₹210')),
      status: 'AVAILABLE',
      distanceKm: bookingData.distanceKm || 35,
      route: `${bookingData.pickup} ➔ ${bookingData.delivery}`,
      notes: bookingData.notes || 'Customer booking auto-routed.'
    };

    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    return { success: true, booking: newBooking };
  },

  // Accept booking
  acceptBooking: function(id) {
    const bookings = this.getBookings();
    const b = bookings.find(item => item.id === id);
    if (b) {
      b.status = 'IN_TRANSIT';
      this.saveBookings(bookings);
      return b;
    }
    return null;
  },

  // Reject / Decline booking
  rejectBooking: function(id) {
    let bookings = this.getBookings();
    bookings = bookings.filter(item => item.id !== id);
    this.saveBookings(bookings);
    return true;
  },

  // Complete delivery (POD)
  completeBooking: function(id) {
    const bookings = this.getBookings();
    const b = bookings.find(item => item.id === id);
    if (b) {
      b.status = 'COMPLETED';
      b.completedAt = new Date().toLocaleTimeString();
      this.saveBookings(bookings);
      return b;
    }
    return null;
  },

  // Search or get charging stations
  getChargingStations: function(searchQuery) {
    if (!searchQuery || !searchQuery.trim()) {
      return this.chargingStations;
    }
    const q = searchQuery.toLowerCase().trim();
    return this.chargingStations.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.types.toLowerCase().includes(q)
    );
  }
};

/**
 * Authentication & Role Session Management
 * Roles:
 * - 'TRUCK'
 * - 'NORMAL'
 * - 'EV'
 * - 'CUSTOMER'
 * - null (Logged Out / Gateway view)
 */
const AuthSession = {
  getRole: function() {
    return localStorage.getItem(BookingStore.SESSION_KEY) || 'TRUCK'; // Default to Truck if first visit
  },

  setRole: function(role) {
    if (role) {
      localStorage.setItem(BookingStore.SESSION_KEY, role);
    } else {
      localStorage.removeItem(BookingStore.SESSION_KEY);
    }
  },

  getDriverProfile: function(role) {
    switch (role) {
      case 'TRUCK':
        return {
          name: 'Karthik Raja',
          phone: '+91 98421 99812',
          roleTitle: 'Heavy Commercial Truck Fleet Operator',
          vehicle: 'Tata Ace Gold 1.5T / Ashok Leyland Dost',
          regNumber: 'TN-33-AX-8910',
          permit: 'Commercial Heavy Goods (All India Permit)',
          rating: '★ 4.92',
          capacityRange: '> 100 kg up to several tonnes',
          badgeClass: 'badge-truck',
          avatarInitials: 'KR'
        };
      case 'NORMAL':
        return {
          name: 'Ramesh Babu',
          phone: '+91 94432 66781',
          roleTitle: 'Petrol/Diesel Commercial Carrier',
          vehicle: 'Mahindra Bolero Maxi / Maruti Super Carry (Diesel)',
          regNumber: 'TN-33-BZ-4102',
          permit: 'State Commercial Light Goods',
          rating: '★ 4.88',
          capacityRange: '10 kg to 100 kg',
          badgeClass: 'badge-normal',
          avatarInitials: 'RB'
        };
      case 'EV':
        return {
          name: 'Suresh Kumar',
          phone: '+91 97891 33490',
          roleTitle: 'Zero-Emission EV Agro-Fleet Partner',
          vehicle: 'Tata Ace EV / Mahindra Treo Zor (Electric)',
          regNumber: 'TN-33-EV-7721',
          permit: 'Green Commercial Clean Air Pass',
          rating: '★ 4.96',
          capacityRange: '10 kg to 30 kg',
          badgeClass: 'badge-ev',
          avatarInitials: 'SK'
        };
      default:
        return {
          name: 'AgriNex Shipper / Farmer',
          phone: '+91 98420 00000',
          roleTitle: 'Customer / Agricultural Shipper',
          vehicle: 'N/A',
          regNumber: 'N/A',
          avatarInitials: 'CU'
        };
    }
  }
};

window.BookingStore = BookingStore;
window.AuthSession = AuthSession;
