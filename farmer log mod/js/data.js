/**
 * AgriNex Logistics Module - Data Store
 * Initial mock data and domain rules
 */

const LOGISTICS_DATA = {
  // Current active user role ('farmer', 'fpo', 'transporter', 'buyer', 'admin')
  currentRole: 'farmer',

  // Crop-appropriate vehicle recommendations & packaging (FAO guidance)
  cropRecommendations: {
    'Tomatoes': {
      category: 'Perishable Produce',
      vehicleType: 'Ventilated Truck (with crates)',
      idealTemp: '12°C - 15°C',
      packaging: 'Rigid plastic crates, maximum 3-tier stacking',
      caution: 'Avoid direct sunlight exposure, handle gently to prevent bruising.'
    },
    'Onions': {
      category: 'Semi-Perishable',
      vehicleType: 'Dry Ventilated Open/Curtain Truck',
      idealTemp: 'Ambient Dry (Well Ventilated)',
      packaging: 'Jute or mesh bags, dry palletized',
      caution: 'Keep moisture-free to prevent rotting or sprouting.'
    },
    'Paddy / Rice': {
      category: 'Grains & Cereals',
      vehicleType: 'Covered Heavy Truck with Tarpaulin',
      idealTemp: 'Ambient',
      packaging: '50kg Gunny bags, sealed moisture barrier',
      caution: 'Strict protection from rain; check empty vehicle cleanliness.'
    },
    'Wheat': {
      category: 'Grains & Cereals',
      vehicleType: 'Covered Heavy Truck with Tarpaulin',
      idealTemp: 'Ambient',
      packaging: 'Standard moisture-proof bags',
      caution: 'Protect from moisture; ensure dry flooring.'
    },
    'Dairy / Milk': {
      category: 'Highly Perishable Cold Chain',
      vehicleType: 'Insulated Refrigerated Tanker / Reefer',
      idealTemp: '2°C - 4°C',
      packaging: 'Stainless steel sealed dairy tanks',
      caution: 'Continuous temperature sensor logging required.'
    },
    'Banana / Mango': {
      category: 'Fragile Fruit',
      vehicleType: 'Refrigerated or Air-Suspension Ventilated',
      idealTemp: '13°C - 14°C',
      packaging: 'Corrugated cartons with cushioning inserts',
      caution: 'Low-stacking only; protect from heat build-up.'
    }
  },

  // Available Verified Transporters
  transporters: [
    {
      id: 'TRP-101',
      name: 'Kisan Express Logistics Ltd',
      vehicleType: 'Ventilated Truck (10-12 Ton)',
      regNumber: 'TN-33-AX-8912',
      capacityTons: 12,
      baseFare: 1200,
      ratePerKm: 28,
      loadingRatePerTon: 150,
      unloadingRatePerTon: 150,
      driverName: 'Ramesh Kumar',
      driverPhone: '+91 98421 55672',
      driverRating: 4.85,
      completedTrips: 184,
      verified: true,
      insuranceValid: true,
      permit: 'All India Permit (Valid till Dec 2027)'
    },
    {
      id: 'TRP-102',
      name: 'CoolChain Agro Reefer Express',
      vehicleType: 'Refrigerated Reefer (8 Ton, 2°C-15°C)',
      regNumber: 'TN-38-BZ-4419',
      capacityTons: 8,
      baseFare: 2500,
      ratePerKm: 42,
      loadingRatePerTon: 200,
      unloadingRatePerTon: 200,
      driverName: 'Senthil Nathan',
      driverPhone: '+91 97890 23419',
      driverRating: 4.92,
      completedTrips: 210,
      verified: true,
      insuranceValid: true,
      permit: 'Cold Chain Certified (Valid till Aug 2028)'
    },
    {
      id: 'TRP-103',
      name: 'Village Eco Haulers FPO Fleet',
      vehicleType: 'Mini Truck / Bolero Maxi (3 Ton)',
      regNumber: 'TN-40-EF-1102',
      capacityTons: 3,
      baseFare: 600,
      ratePerKm: 18,
      loadingRatePerTon: 120,
      unloadingRatePerTon: 120,
      driverName: 'Murugan Palani',
      driverPhone: '+91 94432 99881',
      driverRating: 4.70,
      completedTrips: 96,
      verified: true,
      insuranceValid: true,
      permit: 'State Commercial (Valid till Nov 2026)'
    },
    {
      id: 'TRP-104',
      name: 'GreenField Bulk Cargo Movers',
      vehicleType: 'Heavy 10-Wheeler Covered (20 Ton)',
      regNumber: 'TN-52-K-9003',
      capacityTons: 20,
      baseFare: 3000,
      ratePerKm: 38,
      loadingRatePerTon: 140,
      unloadingRatePerTon: 140,
      driverName: 'Balaji Anandan',
      driverPhone: '+91 98940 77123',
      driverRating: 4.88,
      completedTrips: 340,
      verified: true,
      insuranceValid: true,
      permit: 'National Highway Permit (Valid till Jan 2029)'
    }
  ],

  // Active Shipments & Bookings
  bookings: [
    {
      trackingId: 'AGX-TRK-9821',
      lotId: 'LOT-TOM-0914',
      farmerName: 'Udish Krishna (Farmgate)',
      crop: 'Tomatoes',
      variety: 'Roma Hybrid',
      quantityTons: 10,
      bagsOrCrates: '400 Plastic Crates',
      pickupLocation: 'Thindal Farm Gate, Erode',
      deliveryLocation: 'AgriCorp Processor Warehouse, Coimbatore',
      distanceKm: 85,
      pickupDate: '2026-09-14 06:30 AM',
      vehicleType: 'Ventilated Truck (10-12 Ton)',
      regNumber: 'TN-33-AX-8912',
      driverName: 'Ramesh Kumar',
      driverPhone: '+91 98421 55672',
      transporterName: 'Kisan Express Logistics Ltd',
      status: 'In Transit', // 'Requested', 'Assigned', 'Arrived', 'Loading', 'Departed', 'In Transit', 'Delivered'
      statusStep: 5, // 0 to 6
      cost: {
        baseFare: 1200,
        distanceCharge: 2380, // 85km * 28
        loadingCharge: 1500,  // 10t * 150
        unloadingCharge: 1500,// 10t * 150
        tollCharge: 240,
        waitingCharge: 0,
        totalCost: 6820,
        costPerKg: 0.68,
        costPerQuintal: 68.20
      },
      qualityRequirement: 'Ventilated crates, temperature monitored (14°C)',
      pod: {
        otp: '5829',
        verified: false,
        receiverName: 'Coimbatore Fresh Processing Ltd',
        deliveredQuantity: 10,
        conditionAtArrival: 'Good (Inspected)',
        signatureDate: null
      },
      complaint: null,
      rating: null
    },
    {
      trackingId: 'AGX-TRK-7410',
      lotId: 'LOT-ONN-0891',
      farmerName: 'Kavitha S. (FPO Lot Pool)',
      crop: 'Onions',
      variety: 'Nashik Red',
      quantityTons: 12,
      bagsOrCrates: '240 Gunny Bags',
      pickupLocation: 'Bhavani FPO Collection Center',
      deliveryLocation: 'APMC Mandi Yard, Tiruppur',
      distanceKm: 60,
      pickupDate: '2026-09-13 09:00 AM',
      vehicleType: 'Heavy 10-Wheeler Covered (20 Ton)',
      regNumber: 'TN-52-K-9003',
      driverName: 'Balaji Anandan',
      driverPhone: '+91 98940 77123',
      transporterName: 'GreenField Bulk Cargo Movers',
      status: 'Delivered',
      statusStep: 6,
      cost: {
        baseFare: 3000,
        distanceCharge: 2280,
        loadingCharge: 1680,
        unloadingCharge: 1680,
        tollCharge: 180,
        waitingCharge: 200,
        totalCost: 9020,
        costPerKg: 0.75,
        costPerQuintal: 75.16
      },
      qualityRequirement: 'Moisture-free covered transport',
      pod: {
        otp: '8104',
        verified: true,
        receiverName: 'Tiruppur Mandi Syndicate',
        deliveredQuantity: 12,
        conditionAtArrival: 'Excellent',
        signatureDate: '2026-09-13 01:15 PM'
      },
      complaint: null,
      rating: {
        stars: 5,
        punctuality: 5,
        cargoCare: 5,
        review: 'On-time delivery, polite driver and zero spillage.'
      }
    }
  ],

  // Storage Facilities for discovery
  storageFacilities: [
    {
      id: 'STR-01',
      name: 'Erode Agro Cold Storage Complex',
      type: 'Cold Storage (Controlled Atmosphere)',
      tempRange: '0°C to 15°C (Humidity 85-95%)',
      availableCapacityTons: 450,
      totalCapacityTons: 1200,
      monthlyChargePerTon: 450,
      dailyChargePerTon: 18,
      location: 'Perundurai Industrial Estate, Erode (12 km away)',
      accreditation: 'WDRA Registered (A Grade)',
      contact: '+91 424 2345678'
    },
    {
      id: 'STR-02',
      name: 'Coimbatore Mandi Dry Grain Silo',
      type: 'Dry Modern Silo & Warehouse',
      tempRange: 'Ambient Dry (Rodent & Pest Proof)',
      availableCapacityTons: 820,
      totalCapacityTons: 2500,
      monthlyChargePerTon: 220,
      dailyChargePerTon: 9,
      location: 'Singanallur Mandi Bypass (4 km from APMC)',
      accreditation: 'e-NAM Integrated Warehouse',
      contact: '+91 422 9876543'
    }
  ],

  // Driver partner idle mode toggle status (like Swiggy / Zomato rider online toggle)
  driverOnlineForGigs: true,

  // Idle Delivery Partners & Backhaul Return Fleet (Swiggy / Zomato / Porter Gig Model)
  // When delivery vehicles have no food/e-commerce orders or are returning empty, they take farm deliveries at discounts
  idlePartners: [
    {
      id: 'GIG-01',
      partnerName: 'Karthi S.',
      platformBadge: '⚡ Swiggy / Zomato Gig Rider',
      vehicle: 'Electric Cargo Scooter (80 kg Crates)',
      regNumber: 'TN-33-BV-1029',
      status: 'Idle (Zero Food Orders)',
      distanceKm: 2.1,
      etaMinutes: 8,
      fareRate: 'Flat ₹79 up to 8 km',
      idleDiscount: '40% Off (Off-Peak Run)',
      rating: 4.92,
      completedGigs: 312,
      currentLoc: 'Thindal Farm Road (2 km away)',
      bestFor: 'Daily Fresh Milk, Mushrooms, Flowers, Micro-Greens',
      phone: '+91 97891 00213'
    },
    {
      id: 'GIG-02',
      partnerName: 'Suresh V.',
      platformBadge: '📦 Hyperlocal Delivery Van',
      vehicle: 'Tata Ace Gold EV (1.5 Ton Mini-Truck)',
      regNumber: 'TN-38-CY-4902',
      status: 'Idle Between Shifts',
      distanceKm: 3.8,
      etaMinutes: 14,
      fareRate: '₹18/km (Standard ₹28)',
      idleDiscount: '35% Off (Downtime Rate)',
      rating: 4.86,
      completedGigs: 428,
      currentLoc: 'Perundurai SIPCOT Junction',
      bestFor: 'Tomatoes, Vegetables, Fruits, Crates',
      phone: '+91 98422 44319'
    },
    {
      id: 'GIG-03',
      partnerName: 'Murugesan P.',
      platformBadge: '🔄 Empty Return (Backhaul Truck)',
      vehicle: 'Mahindra Bolero Maxi (2.5 Ton Pickup)',
      regNumber: 'TN-40-EF-8810',
      status: 'Returning Empty to Mandi',
      distanceKm: 5.2,
      etaMinutes: 18,
      fareRate: '₹15/km (Standard ₹30)',
      idleDiscount: '50% Backhaul Saver',
      rating: 4.88,
      completedGigs: 519,
      currentLoc: 'Bhavani River Bypass',
      bestFor: 'Bulk Onions, Potatoes, Bags of Grain',
      phone: '+91 94431 88902'
    }
  ],

  // Shared On-Demand Agricultural Logistics: Active Farmer Cluster (1.2 Tonnes)
  clusterDemo: {
    clusterId: 'CLUSTER-AGX-801',
    crop: 'Fresh Roma Tomatoes',
    totalTonnage: 1.2, // 1,200 kg
    vehicle: 'Tata Ace Gold EV (1.5 Ton Mini-Truck)',
    regNumber: 'TN-33-AX-8910',
    driverName: 'Karthik Raja',
    driverPhone: '+91 98421 99812',
    destination: 'Coimbatore APMC Mandi Yard',
    separateCostTotal: 3600,
    pooledCostTotal: 1650,
    savingsTotal: 1950,
    savingsPercent: 54,
    farmers: [
      {
        id: 'FARMER-A',
        name: 'Ravi Kumar',
        village: 'Thindal (Village A)',
        quantityKg: 350,
        crates: 14,
        sharePercent: 29.2,
        individualCost: 1200,
        pooledCost: 481,
        savedAmount: 719,
        pickupTime: '08:00 AM',
        otp: '4912',
        status: 'Collected'
      },
      {
        id: 'FARMER-B',
        name: 'Selvam P.',
        village: 'Villarasampatti (Village B)',
        quantityKg: 450,
        crates: 18,
        sharePercent: 37.5,
        individualCost: 1100,
        pooledCost: 618,
        savedAmount: 482,
        pickupTime: '08:20 AM',
        otp: '7823',
        status: 'Collected'
      },
      {
        id: 'FARMER-C',
        name: 'Murugan S.',
        village: 'Perundurai (Village C)',
        quantityKg: 400,
        crates: 16,
        sharePercent: 33.3,
        individualCost: 1300,
        pooledCost: 551,
        savedAmount: 749,
        pickupTime: '08:45 AM',
        otp: '3109',
        status: 'En Route to Mandi'
      }
    ]
  },

  // Cold Storage Branch Interactive Simulator State
  coldStorageState: {
    produceName: 'Fresh Roma Tomatoes (Grade A)',
    quantityTons: 10,
    harvestDate: 'Today, 06:00 AM',
    immediateBuyerAvailable: false,
    isPerishable: true,
    targetTemp: '12°C - 15°C (Humidity 85-90%)',
    recommendedFacilityId: 'STR-01',
    recommendedFacilityName: 'Erode Agro Cold Storage Complex (Perundurai)',
    distanceKm: 12,
    dailyRent: '₹15 / Ton / Day (₹150/day total)',
    shelfLifeExtensionDays: 21,
    reservationStatus: 'idle',
    reservationId: null,
    matchedBuyerName: 'Nilgiris Fresh Mart Processing Plant'
  }
};

if (typeof module !== 'undefined') {
  module.exports = LOGISTICS_DATA;
}

