/**
 * AgriNex Logistics Module - Complete Multilingual (i18n) Engine
 * Full support for English, हिन्दी (Hindi), and தமிழ் (Tamil)
 */

const TRANSLATIONS = {
  en: {
    // Brand & App
    brandTitle: "AgriNex",
    brandSubtitle: "Logistics & Supply Chain",
    pageTitle: "AgriNex Logistics Desk",
    farmerBadgeRole: "Farmer / FPO Producer",

    // Sidebar
    navOverview: "Overview",
    navBookTransport: "Book Transport",
    navActiveShipments: "Active Shipments",
    navLiveTracking: "Live Tracking",
    navStorageDiscovery: "Storage Discovery",
    navQuickGig: "Quick-Gig (Swiggy/Zomato)",
    navSharedLogistics: "Shared Logistics (Cluster)",
    navColdStorageBranch: "Cold Storage Branch",
    navHelpline: "Voice & Helpline",

    // Roles
    roleFarmer: "Farmer",
    roleFpo: "FPO Desk",
    roleBuyer: "Buyer",
    roleTransporter: "Transporter",
    roleAdmin: "Admin",

    // Action buttons
    btnBookPickup: "+ Book Pickup",
    btnQuickBookNow: "⚡ Quick Book Now",
    btnRefresh: "Refresh",
    btnSelectBook: "Select & Book",
    btnTrack: "🛰️ Track",
    btnFare: "🧾 Fare",
    btnPod: "✍️ POD",
    btnRate: "⭐ Rate",
    btnReportIssue: "⚠️ Report",
    btnCancel: "Cancel",
    btnConfirmBook: "Confirm & Book Transporter",
    btnClose: "Close",
    btnPrintInvoice: "🖨️ Print Invoice",
    btnDone: "Done",
    btnSubmitReport: "Submit Incident Report",
    btnSkip: "Skip",
    btnSubmitRating: "Submit Rating",
    btnCallHelpline: "Call Helpline Now",
    btnClearSignature: "Clear Signature",
    btnAdvanceDemo: "⚡ Advance Milestone (Demo)",
    btnReserveSpace: "Reserve Space",

    // Onboarding Banner
    guideTitle: "🌾 Simple 4-Step Farmgate Logistics Workflow",
    guideStep1: "Create Pickup & Get Instant Fare",
    guideStep2: "Assign Verified Transporter",
    guideStep3: "Track Live GPS & Temperature",
    guideStep4: "Confirm Delivery with OTP & POD",

    // Role Banners
    bannerFarmer: "👤 <strong>Farmer View:</strong> Book individual farmgate pickups, review per-kg transport fares, track live location, and inspect proof-of-delivery receipts.",
    bannerFpo: "🏢 <strong>FPO Desk:</strong> Combine multiple nearby farmer lots, plan village collection routes, optimize vehicle capacity, and divide shared costs proportionally.",
    bannerBuyer: "🏭 <strong>Processor & Buyer View:</strong> Track incoming crop deliveries, verify delivery condition, and sign digital Proof-of-Delivery (POD).",
    bannerTransporter: "🚚 <strong>Transporter Fleet View:</strong> View trip dispatches, update milestone statuses, and review completed trip payouts.",
    bannerAdmin: "🛡️ <strong>Admin Supervision:</strong> Oversee provider verification, monitor delays, handle exceptions, and resolve disputes.",

    // Stat Widgets
    statActiveShipments: "Active Shipments",
    statActiveSub: "● In Transit",
    statDeliveredToday: "Delivered Today",
    statDeliveredSub: "100% POD Verified",
    statVerifiedFleet: "Verified Transporters",
    statFleetSub: "All GPS-Enabled",
    statStorageCap: "Storage Capacity",
    statStorageSub: "Near Mandis & Farmgate",

    // FPO Pooling Card
    fpoPoolTitle: "🤝 FPO Multi-Farmer Load Pooling (Shared Vehicle Route)",
    fpoPoolBadge: "Optimized Route",
    fpoPoolDesc: "Small farmers often cannot fill an entire vehicle. AgriNex combines 3 nearby onion farmers into a single 12-Tonne truck, saving up to <strong>35% transport cost</strong>.",
    thFarmer: "Farmer",
    thPickupVillage: "Pickup Village",
    thQuantity: "Quantity",
    thVehicleShare: "Vehicle Share",
    thCalculatedFare: "Calculated Fare",
    thCostPerKg: "Cost / kg",
    fpoRouteSummary: "🚚 Consolidated Route: Village A ➔ Village B ➔ Village C ➔ APMC Mandi Yard (Total Vehicle Fare: ₹9,020)",

    // Shipments Table
    secActiveShipments: "📦 Active Shipments & Movement Status",
    searchPlaceholder: "Search ID, crop, driver...",
    filterAll: "All Shipments",
    filterTransit: "🚚 In Transit",
    filterDelivered: "✅ Delivered",
    filterExceptions: "⚠️ Exceptions",
    thTrackingId: "Tracking / Lot ID",
    thCommodity: "Commodity",
    thRoute: "Route",
    thDriverVehicle: "Driver & Vehicle",
    thCostBreakdown: "Cost Breakdown",
    thStatus: "Status",
    thActions: "Actions",
    noShipmentsTitle: "No matching shipments found",
    noShipmentsSub: "Try searching for a different keyword or create a new pickup.",

    // Fleet & Storage
    secFleetTitle: "🚛 Verified Transporter Fleet",
    badgeVerified: "✓ Verified",
    specRegNumber: "Reg Number",
    specCapacity: "Capacity",
    specDriver: "Driver",
    specCompletedTrips: "Completed Trips",
    rateBaseFare: "Base Fare",
    rateLoading: "Loading",
    secStorageTitle: "❄️ Storage & Cold Chain Warehouse Discovery",
    badgeWdra: "WDRA & e-NAM Verified",
    storageDesc: "Reserve cold rooms and modern scientific warehouses to prevent distress sales and preserve perishable produce quality.",
    perTonMonth: "/ ton / mo",
    availText: "Avail",

    // Modal 1: Pickup
    modalPickupTitle: "📦 Create Produce Pickup Request",
    demoPresetsLabel: "⚡ 1-Click Auto-Fill Demo Scenarios:",
    presetTomato: "🍅 10T Tomatoes (Cold Chain)",
    presetOnion: "🧅 12T Onions (FPO Pooled)",
    presetPaddy: "🌾 15T Paddy (Bulk Grain)",
    lblCrop: "Crop / Commodity",
    selectCropDefault: "Select Crop...",
    lblVariety: "Variety / Quality Spec",
    lblQuantity: "Quantity (Tonnes)",
    lblPackaging: "Packaging Units (Bags / Crates)",
    lblPickupLoc: "Farmgate / Collection Pickup",
    lblDeliveryLoc: "Destination (Warehouse / Mandi / Processor)",
    lblDistance: "Trip Distance (Est. km)",
    lblPickupWindow: "Pickup Window (Date & Time)",
    lblVehicleConfig: "Required Vehicle Configuration",
    optVentilated: "Ventilated Truck (Recommended for Veg/Fruit)",
    optReefer: "Refrigerated Reefer (2°C - 8°C Cold Chain)",
    optHeavy: "Covered Heavy Truck (Grains & Bulk)",
    lblContact: "Contact Person Phone",
    lblLoadingHelp: "Include Loading & Unloading Assistance at Gate",
    lblInstructions: "Handling Instructions & Temperature Limit",
    titleFormulaFare: "Formula Fare Estimation",
    lblEstTotal: "Estimated Total Fare:",
    lblRateKg: "Rate per kg:",
    lblRateQtl: "Rate per quintal:",

    // Modal 2: Live Tracking
    modalTrackTitle: "Live Tracking",
    lblProduceDetails: "Produce Details",
    lblPinPickup: "📍 Pickup",
    lblPinDelivery: "🏁 Delivery",
    lblFarmgate: "Farmgate",
    lblWarehouse: "Warehouse",
    badgeGpsActive: "🚛 GPS Active",
    lblVerifiedTelemetry: "Verified Crew & Vehicle Telemetry",
    lblAssignedDriver: "Assigned Driver",
    lblCallDriver: "📞 Call Driver",
    lblVehicleRegPlate: "Vehicle Reg #",
    lblBodyType: "Body Type",
    lblSensorTelemetry: "Sensor Telemetry",
    valTempNormal: "Temp: 13.8°C (Normal)",
    valSealOk: "Seal # AGX-9014-OK",

    // Modal 3: POD
    modalPodTitle: "✍️ Digital Proof of Delivery (POD)",
    podInstruction: "Confirming delivery for shipment. Receiver must verify OTP or scan QR to unlock escrow settlement.",
    lblReceiverOtp: "Receiver Verification OTP:",
    lblEnterOtp: "Enter 4-Digit Receiver Confirmation OTP",
    lblReceiverName: "Authorized Receiver Name / Warehouse Officer",
    lblDeliveredQty: "Delivered Quantity (Tonnes)",
    lblArrivalCondition: "Condition at Arrival",
    optCondGood: "Good - Zero Damage / Fresh",
    optCondMinor: "Minor Crushing (< 2%)",
    optCondSevere: "Severe Damage / Rejected",
    lblDigitalSignOff: "Digital Sign-off (Sign with Mouse / Finger)",
    hintDrawSignature: "Draw signature inside box",

    // Modal 4: Invoice
    modalInvoiceTitle: "🧾 Freight Invoice & Breakdown",
    invHeaderTitle: "AgriNex Logistics Invoice",
    invTripId: "Trip ID:",
    invLotRef: "Lot Reference:",
    invTransporter: "Transporter:",
    invVehicle: "Vehicle:",
    invDistWeight: "Distance & Weight:",
    invBaseFare: "Base Fare",
    invDistCharge: "Distance Charge",
    invLoadingCharge: "Loading Charge",
    invUnloadingCharge: "Unloading Charge",
    invTollCharge: "Toll & Highway Charges",
    invWaitingCharge: "Waiting Charge",
    invTotalFare: "Total Logistics Fare",
    invCostPerKg: "Cost per kg:",
    invCostPerQtl: "Cost per quintal:",
    badgePaidSettled: "Paid & Settled (Escrow Released)",
    badgeEscrowLocked: "Escrow Locked · Pending Delivery",

    // Modal 5: Exception
    modalExceptionTitle: "⚠️ Report Trip Exception",
    lblExceptionCategory: "Exception Category",
    optBreakdown: "Vehicle Breakdown / Mechanical Failure",
    optWeather: "Extreme Weather / Heavy Rain",
    optDriverDelay: "Driver Unreachable / Delayed Arrival",
    optMismatch: "Quantity / Weight Mismatch at Loading",
    optWarehouseClosed: "Buyer Warehouse Closed / Intake Delayed",
    lblIssueDetails: "Issue Details & Situation",
    placeholderDetails: "Describe the delay, location, and produce risk...",
    lblReqReplacement: "Request Immediate Replacement Transporter",

    // Modal 6: Rating
    modalRatingTitle: "⭐ Rate Transporter & Trip",
    lblDriverFeedback: "Driver Conduct & Cargo Care Feedback",
    placeholderRating: "How was punctuality, packaging handling, and communication?",

    // Modal 7: Helpline
    modalHelplineTitle: "📞 Rural Helpline & IVR Voice Desk",
    helplineDesc: "For weak internet connections or quick voice booking, farmers and FPOs can use our automated IVR or WhatsApp helpline.",
    lblTollFree: "Toll-Free Helpline:",
    helplineAvail: "Available 24x7 in Hindi, Tamil, Telugu, and English",
    ivrOpt1: "Option 1: Book farmgate pickup via voice (\"Book 5T maize for tomorrow\")",
    ivrOpt2: "Option 2: Check active shipment location by entering 4-digit trip ID",
    ivrOpt3: "Option 3: Emergency breakdown or vehicle replacement request",
    floatingHelplineText: "📞 Rural Helpline & IVR",

    // Statuses
    stRequested: "Booking Requested",
    stAssigned: "Vehicle Assigned",
    stArrived: "Vehicle Arrived",
    stLoaded: "Loaded & Weighed",
    stDeparted: "Vehicle Departed",
    stInTransit: "In Transit",
    stDelivered: "Delivered",

    // Crops
    cropTomato: "Tomatoes",
    cropOnion: "Onions",
    cropPaddy: "Paddy / Rice",
    cropWheat: "Wheat",
    cropDairy: "Dairy / Milk",
    cropBanana: "Banana / Mango",

    // Swiggy/Zomato Idle Gig Integration
    secIdleGigTitle: "⚡ Quick-Gig: Idle Delivery Partners (Swiggy / Zomato / Hyperlocal Fleet)",
    secIdleGigDesc: "When delivery drivers have zero food/parcel orders or trucks return empty, they go online here to take immediate farm deliveries at up to 50% discount.",
    driverModeCardTitle: "🛵 Delivery Partner App: Idle & Downtime Mode",
    lblGoOnline: "🟢 Driver Online (Receiving Farmgate Micro-Orders during food downtime)",
    lblGoOffline: "⚪ Driver Offline",
    btnToggleOnlineStatus: "Toggle Online / Offline",
    btnBookInstantGig: "⚡ Book Instant Gig",
    modalGigTitle: "⚡ Book Instant Gig Partner (Zero Food-Order Fleet)",
    lblGigPartner: "Assigned Delivery Partner",
    lblGigDiscountTag: "Downtime / Empty-Return Discount",
    lblGigRateEst: "Discounted Rate",
    lblGigEta: "Arrival ETA",
    lblGigSelectCrop: "Produce / Commodity",
    lblGigQuantityKg: "Weight / Packaging (e.g. 50 kg / 2 Crates)",
    lblGigDropLoc: "Destination (Local Mandi / Customer / Warehouse)",
    btnConfirmGigBook: "⚡ Dispatch Gig Rider Now",
    badgeIdleZeroOrder: "⚡ Idle (Zero Food Orders)",
    badgeBackhaulDiscount: "🔄 Empty Return Discount",
    lblNearbyAway: "away",
    lblEstArrival: "Arrives in",
    lblBestFor: "Best For:",

    // Real Map & Live GPS Telemetry
    btnRecenterVehicle: "🎯 Recenter Vehicle",
    btnFitRoute: "🗺️ Fit Full Route",
    lblLiveSpeed: "Live Speed",
    lblRemainingDist: "Remaining Distance",
    lblPickupPin: "Farmgate Pickup Point",
    lblDropPin: "Mandi / Warehouse Destination",
    lblDriverMoving: "Vehicle Moving on Road",

    // Shared On-Demand Agricultural Logistics & Farmer Cluster
    secSharedLogisticsTitle: "🚚 Shared On-Demand Agricultural Logistics",
    secSharedLogisticsSubtitle: "AI-Powered Load Pooling & Multi-Stop Farmgate Collection",
    flowStepOrderConfirmed: "Order Confirmed",
    flowStepAiChecks: "AI Checks (Qty, Distance, Urgency, Crop)",
    flowStepClusterDecision: "Farmer Cluster?",
    flowStepPoolLoads: "Pool Loads (Shared Vehicle)",
    flowStepIndividual: "Individual Transport",
    flowStepRouteOpt: "AI Route Optimization (Multi-Stop)",
    flowStepLiveGps: "Live GPS Tracking",
    flowStepDeliveryPod: "Delivery & POD Escrow",
    clusterTitle: "🔥 Strong Combination: 3-Farmer Cluster (1.2 Tonnes)",
    clusterDesc: "Nearby small farmers pooling their produce into a single Tata Ace EV to avoid expensive separate trips.",
    lblFarmerA: "Farmer A: Ravi K. (Thindal) - 350 kg",
    lblFarmerB: "Farmer B: Selvam P. (Villarasampatti) - 450 kg",
    lblFarmerC: "Farmer C: Murugan S. (Perundurai) - 400 kg",
    lblClusterTotalLoad: "Combined Cluster Load: 1.2 Tonnes (1,200 kg)",
    lblCostSeparateTrips: "3 Separate Trips Cost:",
    lblCostPooledVehicle: "Shared Pooled Vehicle:",
    lblNetSavings: "Net Farmer Savings:",
    btnDispatchCluster: "🚀 Dispatch Shared Cluster Vehicle (1.2T)",
    badgeMultiStop: "3-Stop Optimized Route",

    // Cold Storage Branch (Perishable Produce Safeguard)
    secColdBranchTitle: "🧊 Cold Storage Branch: Perishable Produce Safeguard",
    secColdBranchSubtitle: "Automated Decision Tree: Protect Perishable Produce When No Immediate Buyer Is Available",
    csStepHarvested: "Produce Ready & Harvested",
    csStepImmediateBuyer: "Immediate Buyer Available?",
    csStepPerishableCheck: "Is Produce Perishable?",
    csStepAiEvaluate: "AI Evaluates Nearby Cold Stores (Capacity, Distance, Cost)",
    csStepReserve: "Reserve Cold Room Space",
    csStepBuyerSearch: "Continue Buyer Match in Background",
    csStepDispatchBuyer: "Buyer Confirmed ➔ Transport from Store to Buyer",
    lblSimulateColdPrompt: "Simulate Scenario: 10T Tomatoes Harvested but Mandi Buyer Delayed",
    btnSimulateReserveStorage: "🔒 AI Reserve Cold Room Bay (Prevent Distress Sale)",
    btnSimulateBuyerFound: "🤝 Buyer Found ➔ Dispatch from Cold Storage",
    badgeDistressPrevented: "Distress Sale Prevented (Shelf-life +21 Days)",
    badgeStorageReserved: "WDRA Cold Bay #B-14 Reserved",
    badgeInStorageDispatched: "Dispatched from Storage to Processor"
  },

  hi: {
    // Brand & App
    brandTitle: "एग्रीनेक्स",
    brandSubtitle: "लॉजिस्टिक्स एवं आपूर्ति श्रृंखला",
    pageTitle: "एग्रीनेक्स लॉजिस्टिक्स डेस्क",
    farmerBadgeRole: "किसान / एफपीओ उत्पादक",

    // Sidebar
    navOverview: "अवलोकन (डैशबोर्ड)",
    navBookTransport: "वाहन बुक करें",
    navActiveShipments: "सक्रिय शिपमेंट",
    navLiveTracking: "लाइव ट्रैकिंग",
    navStorageDiscovery: "भंडारण खोज",
    navQuickGig: "त्वरित गिग (Swiggy/Zomato)",
    navSharedLogistics: "साझा लॉजिस्टिक्स (क्लस्टर)",
    navColdStorageBranch: "कोल्ड स्टोरेज शाखा",
    navHelpline: "आवाज़ व हेल्पलाइन",

    // Roles
    roleFarmer: "किसान",
    roleFpo: "एफपीओ डेस्क",
    roleBuyer: "खरीदार / व्यापारी",
    roleTransporter: "ट्रांसपोर्टर",
    roleAdmin: "प्रशासक",

    // Action buttons
    btnBookPickup: "+ पिकअप बुक करें",
    btnQuickBookNow: "⚡ तुरंत बुक करें",
    btnRefresh: "रीफ्रेश",
    btnSelectBook: "चुनें और बुक करें",
    btnTrack: "🛰️ ट्रैक करें",
    btnFare: "🧾 किराया",
    btnPod: "✍️ पीओडी",
    btnRate: "⭐ रेटिंग",
    btnReportIssue: "⚠️ शिकायत",
    btnCancel: "रद्द करें",
    btnConfirmBook: "पुष्टि करें और ट्रांसपोर्टर बुक करें",
    btnClose: "बंद करें",
    btnPrintInvoice: "🖨️ चालान प्रिंट करें",
    btnDone: "सम्पन्न",
    btnSubmitReport: "दुर्घटना रिपोर्ट दर्ज करें",
    btnSkip: "छोड़ें",
    btnSubmitRating: "रेटिंग जमा करें",
    btnCallHelpline: "हेल्पलाइन पर कॉल करें",
    btnClearSignature: "हस्ताक्षर साफ़ करें",
    btnAdvanceDemo: "⚡ अगला चरण बढ़ाएं (डेमो)",
    btnReserveSpace: "स्थान आरक्षित करें",

    // Onboarding Banner
    guideTitle: "🌾 सरल 4-चरणीय कृषि लॉजिस्टिक्स प्रक्रिया",
    guideStep1: "पिकअप अनुरोध बनाएं व तुरंत किराया जानें",
    guideStep2: "सत्यापित ट्रांसपोर्टर आवंटित करें",
    guideStep3: "लाइव जीपीएस व तापमान ट्रैक करें",
    guideStep4: "ओटीपी व डिजिटल पीओडी से डिलीवरी की पुष्टि करें",

    // Role Banners
    bannerFarmer: "👤 <strong>किसान दृश्य:</strong> खेत से सीधे पिकअप बुक करें, प्रति किलोग्राम परिवहन दर देखें, वाहन को लाइव ट्रैक करें और रसीद जांचें।",
    bannerFpo: "🏢 <strong>एफपीओ डेस्क:</strong> आसपास के किसानों की उपज को मिलाकर साझा ट्रक बुक करें और लागत को आनुपातिक रूप से साझा करें।",
    bannerBuyer: "🏭 <strong>खरीदार व प्रसंस्करणकर्ता:</strong> आने वाली फसल की डिलीवरी ट्रैक करें, माल की स्थिति जांचें और डिजिटल पीओडी पर हस्ताक्षर करें।",
    bannerTransporter: "🚚 <strong>ट्रांसपोर्टर दृश्य:</strong> यात्रा की जानकारी देखें, मार्ग की स्थिति अपडेट करें और भुगतान विवरण प्राप्त करें।",
    bannerAdmin: "🛡️ <strong>प्रशासनिक निगरानी:</strong> परमिट व लाइसेंस का सत्यापन करें, देरी पर नज़र रखें और विवादों का निपटारा करें।",

    // Stat Widgets
    statActiveShipments: "सक्रिय शिपमेंट",
    statActiveSub: "● रास्ते में है",
    statDeliveredToday: "आज वितरित",
    statDeliveredSub: "100% पीओडी सत्यापित",
    statVerifiedFleet: "सत्यापित वाहन",
    statFleetSub: "सभी जीपीएस युक्त",
    statStorageCap: "भंडारण क्षमता",
    statStorageSub: "मंडियों के पास उपलब्ध",

    // FPO Pooling Card
    fpoPoolTitle: "🤝 एफपीओ बहु-किसान साझा वाहन परिवहन (रूट योजना)",
    fpoPoolBadge: "अनुकूलित रूट",
    fpoPoolDesc: "छोटे किसान अकेले पूरा ट्रक नहीं भर पाते। एग्रीनेक्स आसपास के 3 किसानों के प्याज को एक 12-टन ट्रक में जोड़कर <strong>35% तक लागत बचाता है</strong>।",
    thFarmer: "किसान",
    thPickupVillage: "पिकअप गांव",
    thQuantity: "मात्रा",
    thVehicleShare: "वाहन में हिस्सा",
    thCalculatedFare: "निर्धारित किराया",
    thCostPerKg: "लागत / कि.ग्रा.",
    fpoRouteSummary: "🚚 संयुक्त रूट: गांव A ➔ गांव B ➔ गांव C ➔ मंडी यार्ड (कुल ट्रक किराया: ₹9,020)",

    // Shipments Table
    secActiveShipments: "📦 सक्रिय शिपमेंट एवं आवागमन स्थिति",
    searchPlaceholder: "ट्रैकिंग आईडी, फसल, ड्राइवर खोजें...",
    filterAll: "सभी शिपमेंट",
    filterTransit: "🚚 रास्ते में",
    filterDelivered: "✅ वितरित",
    filterExceptions: "⚠️ समस्याएं",
    thTrackingId: "ट्रैकिंग / लॉट आईडी",
    thCommodity: "फसल / उत्पाद",
    thRoute: "मार्ग (रूट)",
    thDriverVehicle: "ड्राइवर एवं वाहन",
    thCostBreakdown: "लागत विवरण",
    thStatus: "स्थिति",
    thActions: "कार्रवाई",
    noShipmentsTitle: "कोई शिपमेंट नहीं मिला",
    noShipmentsSub: "कृपया अन्य कीवर्ड खोजें या नया पिकअप बुक करें।",

    // Fleet & Storage
    secFleetTitle: "🚛 सत्यापित ट्रांसपोर्टर बेड़ा",
    badgeVerified: "✓ सत्यापित",
    specRegNumber: "पंजीकरण संख्या",
    specCapacity: "क्षमता",
    specDriver: "ड्राइवर",
    specCompletedTrips: "पूर्ण यात्राएं",
    rateBaseFare: "मूल किराया",
    rateLoading: "लोडिंग",
    secStorageTitle: "❄️ आधुनिक भंडारण एवं कोल्ड स्टोर खोजें",
    badgeWdra: "WDRA एवं e-NAM प्रमाणित",
    storageDesc: "खराब होने वाली फसलों की सुरक्षा और संकटपूर्ण बिक्री से बचने के लिए वैज्ञानिक कोल्ड स्टोर व गोदाम आरक्षित करें।",
    perTonMonth: "/ टन / माह",
    availText: "उपलब्ध",

    // Modal 1: Pickup
    modalPickupTitle: "📦 उपज पिकअप अनुरोध बनाएं",
    demoPresetsLabel: "⚡ 1-क्लिक ऑटो-फिल डेमो विकल्प:",
    presetTomato: "🍅 10 टन टमाटर (कोल्ड चेन)",
    presetOnion: "🧅 12 टन प्याज (साझा लोड)",
    presetPaddy: "🌾 15 टन धान (अनाज ट्रक)",
    lblCrop: "फसल / वस्तु",
    selectCropDefault: "फसल चुनें...",
    lblVariety: "किस्म / गुणवत्ता",
    lblQuantity: "मात्रा (टन में)",
    lblPackaging: "पैकेजिंग इकाइयां (बोरी / क्रेट)",
    lblPickupLoc: "खेत / संकलन केंद्र का पता",
    lblDeliveryLoc: "गंतव्य (गोदाम / मंडी / प्रोसेसर)",
    lblDistance: "यात्रा की दूरी (कि.मी.)",
    lblPickupWindow: "पिकअप समय (दिनांक एवं समय)",
    lblVehicleConfig: "आवश्यक वाहन का प्रकार",
    optVentilated: "हवादार ट्रक (सब्जी व फल हेतु उत्तम)",
    optReefer: "प्रशीतित रीफर (2°C - 8°C कोल्ड चेन)",
    optHeavy: "ढका हुआ भारी ट्रक (अनाज व थोक हेतु)",
    lblContact: "संपर्क व्यक्ति का फोन",
    lblLoadingHelp: "लोडिंग और अनलोडिंग सहायता शामिल करें",
    lblInstructions: "रखरखाव निर्देश एवं तापमान सीमा",
    titleFormulaFare: "सटीक किराया अनुमान",
    lblEstTotal: "कुल अनुमानित किराया:",
    lblRateKg: "प्रति कि.ग्रा. दर:",
    lblRateQtl: "प्रति क्विंटल दर:",

    // Modal 2: Live Tracking
    modalTrackTitle: "लाइव जीपीएस ट्रैकिंग",
    lblProduceDetails: "उपज का विवरण",
    lblPinPickup: "📍 पिकअप",
    lblPinDelivery: "🏁 डिलीवरी",
    lblFarmgate: "खेत का द्वार",
    lblWarehouse: "मंडी / गोदाम",
    badgeGpsActive: "🚛 जीपीएस सक्रिय",
    lblVerifiedTelemetry: "सत्यापित वाहन व सेंसर डेटा",
    lblAssignedDriver: "आवंटित ड्राइवर",
    lblCallDriver: "📞 ड्राइवर को कॉल करें",
    lblVehicleRegPlate: "वाहन नंबर",
    lblBodyType: "वाहन का प्रकार",
    lblSensorTelemetry: "सेंसर तापमान",
    valTempNormal: "तापमान: 13.8°C (सामान्य)",
    valSealOk: "सुरक्षा सील # AGX-9014-OK",

    // Modal 3: POD
    modalPodTitle: "✍️ डिजिटल डिलीवरी प्रमाण (पीओडी)",
    podInstruction: "डिलीवरी की पुष्टि हेतु प्राप्तकर्ता को 4-अंकीय ओटीपी दर्ज करना होगा।",
    lblReceiverOtp: "प्राप्तकर्ता सत्यापन ओटीपी:",
    lblEnterOtp: "4-अंकीय प्राप्तकर्ता ओटीपी दर्ज करें",
    lblReceiverName: "अधिकृत प्राप्तकर्ता / गोदाम अधिकारी का नाम",
    lblDeliveredQty: "प्राप्त हुई मात्रा (टन में)",
    lblArrivalCondition: "पहुंचने पर फसल की स्थिति",
    optCondGood: "उत्कृष्ट - कोई नुकसान नहीं / एकदम ताज़ा",
    optCondMinor: "मामूली नुकसान (< 2%)",
    optCondSevere: "गंभीर नुकसान / अस्वीकृत",
    lblDigitalSignOff: "डिजिटल हस्ताक्षर (माउस या उंगली से बनाएं)",
    hintDrawSignature: "बॉक्स के अंदर हस्ताक्षर करें",

    // Modal 4: Invoice
    modalInvoiceTitle: "🧾 माल ढुलाई चालान एवं विवरण",
    invHeaderTitle: "एग्रीनेक्स लॉजिस्टिक्स चालान",
    invTripId: "यात्रा आईडी:",
    invLotRef: "लॉट संदर्भ:",
    invTransporter: "ट्रांसपोर्टर:",
    invVehicle: "वाहन:",
    invDistWeight: "दूरी एवं वजन:",
    invBaseFare: "मूल किराया",
    invDistCharge: "दूरी शुल्क",
    invLoadingCharge: "लोडिंग शुल्क",
    invUnloadingCharge: "अनलोडिंग शुल्क",
    invTollCharge: "टोल एवं हाईवे शुल्क",
    invWaitingCharge: "प्रतीक्षा शुल्क",
    invTotalFare: "कुल लॉजिस्टिक्स किराया",
    invCostPerKg: "प्रति कि.ग्रा. लागत:",
    invCostPerQtl: "प्रति क्विंटल लागत:",
    badgePaidSettled: "भुगतान पूर्ण (एस्क्रो राशि जारी)",
    badgeEscrowLocked: "एस्क्रो सुरक्षित · डिलीवरी लंबित",

    // Modal 5: Exception
    modalExceptionTitle: "⚠️ यात्रा संबंधी समस्या दर्ज करें",
    lblExceptionCategory: "समस्या की श्रेणी",
    optBreakdown: "वाहन खराबी / यांत्रिक समस्या",
    optWeather: "खराब मौसम / भारी बारिश",
    optDriverDelay: "ड्राइवर से संपर्क नहीं / अत्यधिक देरी",
    optMismatch: "वजन में अंतर / माल की कमी",
    optWarehouseClosed: "गोदाम बंद है / माल अनलोडिंग में देरी",
    lblIssueDetails: "समस्या का विस्तृत विवरण",
    placeholderDetails: "स्थान, देरी और फसल के जोखिम का विवरण दें...",
    lblReqReplacement: "तुरंत दूसरा वाहन भेजने का अनुरोध करें",

    // Modal 6: Rating
    modalRatingTitle: "⭐ ड्राइवर व यात्रा का मूल्यांकन करें",
    lblDriverFeedback: "ड्राइवर का व्यवहार एवं फसल की सुरक्षा पर प्रतिक्रिया",
    placeholderRating: "समय की पाबंदी, सामान की देखभाल और बातचीत कैसी रही?",

    // Modal 7: Helpline
    modalHelplineTitle: "📞 ग्रामीण हेल्पलाइन एवं वॉयस डेस्क",
    helplineDesc: "कमजोर इंटरनेट या वॉयस बुकिंग के लिए किसान व एफपीओ हमारी स्वचालित आईवीआर हेल्पलाइन का उपयोग कर सकते हैं।",
    lblTollFree: "टोल-फ्री हेल्पलाइन नंबर:",
    helplineAvail: "हिन्दी, तमिल, तेलुगु और अंग्रेजी में 24x7 उपलब्ध",
    ivrOpt1: "विकल्प 1: बोलकर वाहन बुक करें (\"कल के लिए 5 टन मक्का बुक करें\")",
    ivrOpt2: "विकल्प 2: 4-अंकीय यात्रा आईडी दर्ज करके लोकेशन जानें",
    ivrOpt3: "विकल्प 3: वाहन खराबी या आपातकालीन सहायता",
    floatingHelplineText: "📞 ग्रामीण हेल्पलाइन व आईवीआर",

    // Statuses
    stRequested: "अनुरोध प्राप्त",
    stAssigned: "वाहन आवंटित",
    stArrived: "खेत पर पहुंचा",
    stLoaded: "लोडिंग व वजन पूर्ण",
    stDeparted: "रवाना हुआ",
    stInTransit: "रास्ते में है",
    stDelivered: "सफलतापूर्वक वितरित",

    // Crops
    cropTomato: "टमाटर",
    cropOnion: "प्याज",
    cropPaddy: "धान / चावल",
    cropWheat: "गेहूं",
    cropDairy: "दूध / डेयरी",
    cropBanana: "केला / आम",

    // Swiggy/Zomato Idle Gig Integration
    secIdleGigTitle: "⚡ त्वरित गिग: खाली / आइडल डिलीवरी पार्टनर (स्विगी / ज़ोमेटो मॉडल)",
    secIdleGigDesc: "जब डिलीवरी ड्राइवरों के पास कोई फूड/पार्सल ऑर्डर नहीं होता या ट्रक खाली लौटते हैं, तो वे यहां ऑनलाइन आकर 50% तक छूट पर तत्काल कृषि उपज ले जाते हैं।",
    driverModeCardTitle: "🛵 डिलीवरी पार्टनर ऐप: आइडल व डाउनटाइम मोड",
    lblGoOnline: "🟢 ड्राइवर ऑनलाइन (ऑर्डर न होने पर खेत से सीधे माल डिलीवरी हेतु उपलब्ध)",
    lblGoOffline: "⚪ ड्राइवर ऑफलाइन",
    btnToggleOnlineStatus: "ऑनलाइन / ऑफलाइन बदलें",
    btnBookInstantGig: "⚡ तुरंत गिग बुक करें",
    modalGigTitle: "⚡ त्वरित गिग पार्टनर बुक करें (खाली डिलीवरी वाहन)",
    lblGigPartner: "आवंटित डिलीवरी पार्टनर",
    lblGigDiscountTag: "खाली समय / वापसी डिस्काउंट",
    lblGigRateEst: "रियायती दर",
    lblGigEta: "पहुंचने का समय",
    lblGigSelectCrop: "ले जाने वाली उपज",
    lblGigQuantityKg: "वजन / पैकेजिंग (जैसे 50 किग्रा / 2 क्रेट्स)",
    lblGigDropLoc: "गंतव्य (स्थानीय मंडी / ग्राहक / गोदाम)",
    btnConfirmGigBook: "⚡ तुरंत राइडर बुक करें",
    badgeIdleZeroOrder: "⚡ आइडल (कोई फूड ऑर्डर नहीं)",
    badgeBackhaulDiscount: "🔄 खाली वापसी छूट",
    lblNearbyAway: "दूरी पर",
    lblEstArrival: "पहुंचने का समय",
    lblBestFor: "उत्कृष्ट उपयोग:",

    // Real Map & Live GPS Telemetry
    btnRecenterVehicle: "🎯 वाहन पर केंद्रित करें",
    btnFitRoute: "🗺️ पूरा मार्ग देखें",
    lblLiveSpeed: "लाइव गति",
    lblRemainingDist: "बची हुई दूरी",
    lblPickupPin: "खेत पिकअप स्थल",
    lblDropPin: "मंडी / गोदाम गंतव्य",
    lblDriverMoving: "सड़क पर वाहन गतिमान",

    // Shared On-Demand Agricultural Logistics & Farmer Cluster
    secSharedLogisticsTitle: "🚚 साझा ऑन-डिमांड कृषि लॉजिस्टिक्स",
    secSharedLogisticsSubtitle: "एआई-संचालित लोड पूलिंग एवं बहु-स्टॉप फार्मगेट संग्रह",
    flowStepOrderConfirmed: "ऑर्डर स्वीकृत",
    flowStepAiChecks: "एआई जांच (मात्रा, दूरी, तात्कालिकता, फसल)",
    flowStepClusterDecision: "किसान क्लस्टर उपलब्ध?",
    flowStepPoolLoads: "लोड पूलिंग (साझा वाहन)",
    flowStepIndividual: "व्यक्तिगत परिवहन",
    flowStepRouteOpt: "एआई मार्ग अनुकूलन (मल्टी-स्टॉप)",
    flowStepLiveGps: "लाइव जीपीएस ट्रैकिंग",
    flowStepDeliveryPod: "वितरण एवं डिजिटल पीओडी",
    clusterTitle: "🔥 बेहतरीन संयोजन: 3-किसान क्लस्टर (1.2 टन)",
    clusterDesc: "नजदीकी छोटे किसान महंगे अलग-अलग वाहनों से बचने के लिए एक ही साझा टाटा ऐस में उपज मिलाते हैं।",
    lblFarmerA: "किसान A: रवि कुमार (थिंडल) - 350 किग्रा",
    lblFarmerB: "किसान B: सेल्वम पी. (विल्लारसमपट्टी) - 450 किग्रा",
    lblFarmerC: "किसान C: मुरुगन एस. (पेरुंदुरई) - 400 किग्रा",
    lblClusterTotalLoad: "कुल क्लस्टर भार: 1.2 टन (1,200 किग्रा)",
    lblCostSeparateTrips: "3 अलग-अलग फेरों का खर्च:",
    lblCostPooledVehicle: "साझा पूल्ड वाहन का खर्च:",
    lblNetSavings: "किसानों की कुल बचत:",
    btnDispatchCluster: "🚀 साझा क्लस्टर वाहन रवाना करें (1.2 टन)",
    badgeMultiStop: "3-स्टॉप अनुकूलित मार्ग",

    // Cold Storage Branch (Perishable Produce Safeguard)
    secColdBranchTitle: "🧊 कोल्ड स्टोरेज शाखा: खराब होने वाली फसलों की सुरक्षा",
    secColdBranchSubtitle: "स्वचालित निर्णय प्रवाह: जब तत्काल खरीदार उपलब्ध न हो तो फसल को सड़ने से बचाएं",
    csStepHarvested: "उपज तुड़ाई पश्चात तैयार",
    csStepImmediateBuyer: "तत्काल खरीदार उपलब्ध है?",
    csStepPerishableCheck: "क्या उपज शीघ्र खराब होने वाली है?",
    csStepAiEvaluate: "एआई नजदीकी कोल्ड स्टोर की जांच करता है (क्षमता, दूरी, किराया)",
    csStepReserve: "कोल्ड स्टोर रूम आरक्षित करें",
    csStepBuyerSearch: "पृष्ठभूमि में खरीदार खोज जारी रखें",
    csStepDispatchBuyer: "खरीदार मिला ➔ कोल्ड स्टोर से खरीदार तक परिवहन",
    lblSimulateColdPrompt: "सिम्युलेट करें: 10 टन टमाटर तैयार हैं परंतु मंडी खरीदार उपलब्ध नहीं है",
    btnSimulateReserveStorage: "🔒 एआई कोल्ड रूम बुक करें (घाटे की बिक्री से बचाव)",
    btnSimulateBuyerFound: "🤝 खरीदार मिल गया ➔ कोल्ड स्टोर से रवाना करें",
    badgeDistressPrevented: "घाटे की बिक्री से बचाव (शेल्फ-लाइफ +21 दिन)",
    badgeStorageReserved: "WDRA कोल्ड बे #B-14 आरक्षित",
    badgeInStorageDispatched: "कोल्ड स्टोर से फैक्ट्री हेतु रवाना"
  },

  ta: {
    // Brand & App
    brandTitle: "அக்ரிநெக்ஸ்",
    brandSubtitle: "சரக்கு போக்குவரத்து மற்றும் விநியோகம்",
    pageTitle: "அக்ரிநெக்ஸ் சரக்கு போக்குவரத்து தளம்",
    farmerBadgeRole: "விவசாயி / FPO உற்பத்தியாளர்",

    // Sidebar
    navOverview: "முக்கிய பலகை (Dashboard)",
    navBookTransport: "வாகனம் முன்பதிவு",
    navActiveShipments: "செயலில் உள்ள சரக்குகள்",
    navLiveTracking: "நேரடி ஜிபிஎஸ் கண்காணிப்பு",
    navStorageDiscovery: "சேமிப்பு கிடங்கு",
    navQuickGig: "விரைவு கிக் (Swiggy/Zomato)",
    navSharedLogistics: "பகிர்வு சரக்கு (கிளஸ்டர்)",
    navColdStorageBranch: "குளிர்சாதன சேமிப்பு கிளை",
    navHelpline: "குரல் & உதவி மையம்",

    // Roles
    roleFarmer: "விவசாயி",
    roleFpo: "FPO தளம்",
    roleBuyer: "வாங்குபவர்",
    roleTransporter: "போக்குவரத்தாளர்",
    roleAdmin: "நிர்வாகி",

    // Action buttons
    btnBookPickup: "+ வாகனம் முன்பதிவு செய்",
    btnQuickBookNow: "⚡ உடனே முன்பதிவு செய்",
    btnRefresh: "புதுப்பி",
    btnSelectBook: "தேர்ந்தெடுத்து முன்பதிவு செய்",
    btnTrack: "🛰️ கண்காணி",
    btnFare: "🧾 கட்டணம்",
    btnPod: "✍️ POD",
    btnRate: "⭐ மதிப்பீடு",
    btnReportIssue: "⚠️ புகார்",
    btnCancel: "ரத்து செய்",
    btnConfirmBook: "உறுதி செய்து முன்பதிவு செய்",
    btnClose: "மூடு",
    btnPrintInvoice: "🖨️ ரசீது அச்சிடு",
    btnDone: "முடிந்தது",
    btnSubmitReport: "புகாரை சமர்ப்பி",
    btnSkip: "தவிர்",
    btnSubmitRating: "மதிப்பீட்டை சமர்ப்பி",
    btnCallHelpline: "உதவி மையத்தை அழைக்கவும்",
    btnClearSignature: "கையொப்பத்தை அழி",
    btnAdvanceDemo: "⚡ அடுத்த நிலைக்கு நகர்த்து (டெமோ)",
    btnReserveSpace: "இடத்தை முன்பதிவு செய்",

    // Onboarding Banner
    guideTitle: "🌾 எளிய 4-படி விவசாய சரக்கு போக்குவரத்து முறை",
    guideStep1: "முன்பதிவு செய்து உடனடி கட்டணத்தை அறிந்திடுங்கள்",
    guideStep2: "சரிபார்க்கப்பட்ட லாரியை ஒதுக்குங்கள்",
    guideStep3: "நேரடி ஜிபிஎஸ் & குளிர்சாதன வெப்பநிலையைக் கண்காணியுங்கள்",
    guideStep4: "OTP & டிஜிட்டல் ரசீது மூலம் டெலிவரியை உறுதிப்படுத்துங்கள்",

    // Role Banners
    bannerFarmer: "👤 <strong>விவசாயி பார்வை:</strong> விளைநிலத்திலிருந்தே லாரி முன்பதிவு செய்யுங்கள், கிலோ கட்டணத்தை அறிந்து, வாகனத்தை நேரடியாக கண்காணிக்கலாம்.",
    bannerFpo: "🏢 <strong>FPO தளம்:</strong> அருகிலுள்ள விவசாயிகளின் விளைபொருட்களை ஒன்று சேர்த்து ஒரே லாரியில் ஏற்றி, செலவை பங்கிட்டுக் கொள்ளுங்கள்.",
    bannerBuyer: "🏭 <strong>வாங்குபவர் பார்வை:</strong> வருகை தரும் விளைபொருட்களைக் கண்காணித்து, தரத்தை சரிபார்த்து டிஜிட்டல் முறையில் ஒப்புதல் அளியுங்கள்.",
    bannerTransporter: "🚚 <strong>போக்குவரத்தாளர் பார்வை:</strong> ஒதுக்கப்பட்ட பயணங்களை அறிந்து, வழித்தட நிலையை மாற்றி, கட்டண வரவுகளைப் பெறுங்கள்.",
    bannerAdmin: "🛡️ <strong>நிர்வாக மேற்பார்வை:</strong> ஆவணங்களைச் சரிபார்த்து, தாமதங்களைக் கண்காணித்து, சிக்கல்களைத் தீர்க்கவும்.",

    // Stat Widgets
    statActiveShipments: "செயலில் உள்ள சரக்குகள்",
    statActiveSub: "● பயணத்தில் உள்ளது",
    statDeliveredToday: "இன்று வழங்கப்பட்டது",
    statDeliveredSub: "100% POD உறுதிப்படுத்தப்பட்டது",
    statVerifiedFleet: "சரிபார்க்கப்பட்ட வாகனங்கள்",
    statFleetSub: "அனைத்திலும் ஜிபிஎஸ் உள்ளது",
    statStorageCap: "சேமிப்பு கிடங்கு கொள்ளளவு",
    statStorageSub: "சந்தைகளுக்கு அருகில்",

    // FPO Pooling Card
    fpoPoolTitle: "🤝 FPO கூட்டு சரக்கு போக்குவரத்து (பகிரப்பட்ட லாரி வழித்தடம்)",
    fpoPoolBadge: "உகந்த வழித்தடம்",
    fpoPoolDesc: "சிறு விவசாயிகளால் முழு லாரியையும் நிரப்ப முடியாது. அக்ரிநெக்ஸ் அருகிலுள்ள 3 விவசாயிகளின் வெங்காயத்தை ஒரே 12-டன் லாரியில் ஏற்றி <strong>35% வரை செலவை மிச்சப்படுத்துகிறது</strong>.",
    thFarmer: "விவசாயி",
    thPickupVillage: "ஏற்றும் கிராமம்",
    thQuantity: "அளவு",
    thVehicleShare: "லாரி பங்கு",
    thCalculatedFare: "கணக்கிடப்பட்ட கட்டணம்",
    thCostPerKg: "செலவு / கிலோ",
    fpoRouteSummary: "🚚 ஒருங்கிணைந்த வழித்தடம்: கிராமம் A ➔ கிராமம் B ➔ கிராமம் C ➔ திருப்பூர் சந்தை (மொத்த லாரி கட்டணம்: ₹9,020)",

    // Shipments Table
    secActiveShipments: "📦 செயலில் உள்ள சரக்குகள் & நேரடி நிலை",
    searchPlaceholder: "ஐடி, பயிர், ஓட்டுநர் தேடுக...",
    filterAll: "அனைத்து சரக்குகள்",
    filterTransit: "🚚 பயணத்தில் உள்ளவை",
    filterDelivered: "✅ வழங்கப்பட்டவை",
    filterExceptions: "⚠️ சிக்கல்கள்",
    thTrackingId: "கண்காணிப்பு / லாட் ஐடி",
    thCommodity: "விளைபொருள்",
    thRoute: "வழித்தடம்",
    thDriverVehicle: "ஓட்டுநர் & வாகனம்",
    thCostBreakdown: "கட்டண விபரம்",
    thStatus: "தற்போதைய நிலை",
    thActions: "செயல்கள்",
    noShipmentsTitle: "சரக்குகள் எதுவும் கிடைக்கவில்லை",
    noShipmentsSub: "வேறு வார்த்தையைத் தேடவும் அல்லது புதிய முன்பதிவு செய்யவும்.",

    // Fleet & Storage
    secFleetTitle: "🚛 சரிபார்க்கப்பட்ட போக்குவரத்து வாகனங்கள்",
    badgeVerified: "✓ சரிபார்க்கப்பட்டது",
    specRegNumber: "வாகன எண்",
    specCapacity: "கொள்ளளவு",
    specDriver: "ஓட்டுநர்",
    specCompletedTrips: "முடிந்த பயணங்கள்",
    rateBaseFare: "அடிப்படை கட்டணம்",
    rateLoading: "ஏற்றுதல்",
    secStorageTitle: "❄️ குளிர்சாதன மற்றும் தானிய சேமிப்பு கிடங்குகள்",
    badgeWdra: "WDRA & e-NAM அங்கீகரிக்கப்பட்டது",
    storageDesc: "அழுகும் பயிர்களைப் பாதுகாக்கவும், அவசர விலை வீழ்ச்சியைத் தவிர்க்கவும் குளிர்சாதன அறைகளை முன்பதிவு செய்யுங்கள்.",
    perTonMonth: "/ டன் / மாதம்",
    availText: "கையிருப்பு",

    // Modal 1: Pickup
    modalPickupTitle: "📦 விளைபொருள் ஏற்றுகை முன்பதிவு",
    demoPresetsLabel: "⚡ ஒரே கிளிக்கில் மாதிரி விவரங்களை நிரப்பவும்:",
    presetTomato: "🍅 10 டன் தக்காளி (குளிர்சாதன வாகனம்)",
    presetOnion: "🧅 12 டன் வெங்காயம் (கூட்டு லாரி)",
    presetPaddy: "🌾 15 டன் நெல் (தானிய லாரி)",
    lblCrop: "பயிர் / விளைபொருள்",
    selectCropDefault: "பயிரைத் தேர்ந்தெடுக்கவும்...",
    lblVariety: "ரகம் / தரம்",
    lblQuantity: "அளவு (டன்னில்)",
    lblPackaging: "பேக்கேஜிங் அலகுகள் (சாக்கு / பெட்டிகள்)",
    lblPickupLoc: "தோட்டம் / சேகரிப்பு மையம் முகவரி",
    lblDeliveryLoc: "சென்றடையும் இடம் (கிடங்கு / சந்தை / தொழிற்சாலை)",
    lblDistance: "பயண தூரம் (கி.மீ.)",
    lblPickupWindow: "ஏற்றும் நேரம் (தேதி & நேரம்)",
    lblVehicleConfig: "தேவையான வாகனத்தின் வகை",
    optVentilated: "காற்றோட்டமான லாரி (காய்கறி/பழங்களுக்கு உகந்தது)",
    optReefer: "குளிர்சாதன ரீஃபர் (2°C - 8°C வரை)",
    optHeavy: "மூடப்பட்ட கனரக லாரி (தானியங்களுக்கு)",
    lblContact: "தொடர்பு எண்",
    lblLoadingHelp: "ஏற்றுதல் மற்றும் இறக்குதல் ஆட்கள் உதவி தேவை",
    lblInstructions: "கையாளுதல் வழிமுறைகள் & வெப்பநிலை வரம்பு",
    titleFormulaFare: "துல்லியமான கட்டண மதிப்பீடு",
    lblEstTotal: "மதிப்பிடப்பட்ட மொத்த கட்டணம்:",
    lblRateKg: "ஒரு கிலோ கட்டணம்:",
    lblRateQtl: "ஒரு குவிண்டால் கட்டணம்:",

    // Modal 2: Live Tracking
    modalTrackTitle: "நேரடி ஜிபிஎஸ் கண்காணிப்பு",
    lblProduceDetails: "விளைபொருள் விபரம்",
    lblPinPickup: "📍 ஏற்றிய இடம்",
    lblPinDelivery: "🏁 சேருமிடம்",
    lblFarmgate: "விளைநிலம்",
    lblWarehouse: "கிடங்கு",
    badgeGpsActive: "🚛 ஜிபிஎஸ் இயங்குகிறது",
    lblVerifiedTelemetry: "வாகனம் மற்றும் சென்சார் தரவுகள்",
    lblAssignedDriver: "ஒதுக்கப்பட்ட ஓட்டுநர்",
    lblCallDriver: "📞 ஓட்டுநரை அழைக்கவும்",
    lblVehicleRegPlate: "வாகன எண்",
    lblBodyType: "வாகன அமைப்பு",
    lblSensorTelemetry: "சென்சார் வெப்பநிலை",
    valTempNormal: "வெப்பநிலை: 13.8°C (சரியானது)",
    valSealOk: "பாதுகாப்பு சீல் # AGX-9014-OK",

    // Modal 3: POD
    modalPodTitle: "✍️ டெலிவரி உறுதிப்படுத்தல் ரசீது (POD)",
    podInstruction: "டெலிவரியை உறுதிப்படுத்த வாங்குபவர் 4-இலக்க OTP எண்ணை உள்ளிட வேண்டும்.",
    lblReceiverOtp: "வாங்குபவரின் OTP எண்:",
    lblEnterOtp: "4-இலக்க OTP எண்ணை உள்ளிடவும்",
    lblReceiverName: "பெறுநர் / கிடங்கு மேலாளர் பெயர்",
    lblDeliveredQty: "வழங்கப்பட்ட அளவு (டன்னில்)",
    lblArrivalCondition: "வந்தடைந்த பயிரின் நிலை",
    optCondGood: "சிறப்பானது - சேதமில்லை / புத்தம் புதியது",
    optCondMinor: "சிறிய சேதம் (< 2%)",
    optCondSevere: "கடுமையான சேதம் / நிராகரிக்கப்பட்டது",
    lblDigitalSignOff: "டிஜிட்டல் கையொப்பம் (விரல் அல்லது மவுஸ் மூலம் வரையவும்)",
    hintDrawSignature: "பெட்டியின் உள்ளே கையொப்பமிடவும்",

    // Modal 4: Invoice
    modalInvoiceTitle: "🧾 சரக்கு போக்குவரத்து கட்டண ரசீது",
    invHeaderTitle: "அக்ரிநெக்ஸ் சரக்கு ரசீது",
    invTripId: "பயண ஐடி:",
    invLotRef: "லாட் எண்:",
    invTransporter: "போக்குவரத்தாளர்:",
    invVehicle: "வாகனம்:",
    invDistWeight: "தூரம் & எடை:",
    invBaseFare: "அடிப்படை கட்டணம்",
    invDistCharge: "தூரக் கட்டணம்",
    invLoadingCharge: "ஏற்றுதல் கட்டணம்",
    invUnloadingCharge: "இறக்குதல் கட்டணம்",
    invTollCharge: "சுங்கச்சாவடி கட்டணம்",
    invWaitingCharge: "காத்திருப்பு கட்டணம்",
    invTotalFare: "மொத்த போக்குவரத்து கட்டணம்",
    invCostPerKg: "ஒரு கிலோ செலவு:",
    invCostPerQtl: "ஒரு குவிண்டால் செலவு:",
    badgePaidSettled: "செலுத்தப்பட்டது (பணம் விடுவிக்கப்பட்டது)",
    badgeEscrowLocked: "பாதுகாப்பாக வைக்கப்பட்டுள்ளது · நிலுவையில் உள்ளது",

    // Modal 5: Exception
    modalExceptionTitle: "⚠️ பயண சிக்கலைத் தெரிவிக்கவும்",
    lblExceptionCategory: "சிக்கலின் வகை",
    optBreakdown: "வாகன பழுது / இயந்திரக் கோளாறு",
    optWeather: "கடுமையான மழை / வானிலை பாதிப்பு",
    optDriverDelay: "ஓட்டுநரைத் தொடர்பு கொள்ள முடியவில்லை / தாமதம்",
    optMismatch: "எடை குறைவு / சரக்கு முரண்பாடு",
    optWarehouseClosed: "கிடங்கு மூடப்பட்டுள்ளது / இறக்க தாமதம்",
    lblIssueDetails: "சிக்கலின் முழு விவரம்",
    placeholderDetails: "இடம், தாமதம் மற்றும் விளைபொருள் சேத அபாயத்தை விவரிக்கவும்...",
    lblReqReplacement: "மாற்று வாகனத்தை உடனடியாக அனுப்பக் கோரவும்",

    // Modal 6: Rating
    modalRatingTitle: "⭐ ஓட்டுநர் மற்றும் பயணத்தை மதிப்பிடுங்கள்",
    lblDriverFeedback: "ஓட்டுநரின் நடத்தை மற்றும் பயிர் பாதுகாப்பு பற்றிய கருத்து",
    placeholderRating: "நேரந்தவறாமை, பொருட்களைக் கையாளுதல் எப்படி இருந்தது?",

    // Modal 7: Helpline
    modalHelplineTitle: "📞 கிராமப்புற உதவி மையம் & குரல் சேவை",
    helplineDesc: "குறைந்த இணைய வசதி உள்ளவர்கள் குரல் மூலமாகவோ வாட்ஸ்அப் மூலமாகவோ வண்டி முன்பதிவு செய்யலாம்.",
    lblTollFree: "கட்டணமில்லா உதவி எண்:",
    helplineAvail: "தமிழ், இந்தி, தெலுங்கு, ஆங்கிலத்தில் 24x7 கிடைக்கும்",
    ivrOpt1: "விருப்பம் 1: குரல் மூலம் லாரி முன்பதிவு செய்ய (\"நாளைக்கு 5 டன் சோளம் ஏற்ற வேண்டும்\")",
    ivrOpt2: "விருப்பம் 2: 4-இலக்க ஐடியை கூறி லாரி எங்குள்ளது என அறிய",
    ivrOpt3: "விருப்பம் 3: வாகன பழுது அல்லது அவசர உதவி பெற",
    floatingHelplineText: "📞 உதவி மையம் & குரல் சேவை",

    // Statuses
    stRequested: "முன்பதிவு கோரப்பட்டது",
    stAssigned: "வாகனம் ஒதுக்கப்பட்டது",
    stArrived: "விளைநிலம் வந்தடைந்தது",
    stLoaded: "ஏற்றி எடையிடப்பட்டது",
    stDeparted: "புறப்பட்டது",
    stInTransit: "பயணத்தில் உள்ளது",
    stDelivered: "வெற்றிகரமாக வழங்கப்பட்டது",

    // Crops
    cropTomato: "தக்காளி",
    cropOnion: "வெங்காயம்",
    cropPaddy: "நெல் / அரிசி",
    cropWheat: "கோதுமை",
    cropDairy: "பால் / பண்ணை",
    cropBanana: "வாழை / மாம்பழம்",

    // Swiggy/Zomato Idle Gig Integration
    secIdleGigTitle: "⚡ விரைவு கிக்: ஓய்வு நேர விநியோக வாகனங்கள் (Swiggy / Zomato மாதிரி)",
    secIdleGigDesc: "உணவு விநியோக ஓட்டுநர்களுக்கு ஆர்டர்கள் இல்லாதபோதும், லாரிகள் காலியாக திரும்பும்போதும், அவர்கள் 50% தள்ளுபடி கட்டணத்தில் உடனடி சரக்குகளை ஏற்றிச் செல்கின்றனர்.",
    driverModeCardTitle: "🛵 விநியோக ஓட்டுநர் செயலி: ஓய்வு நேர முறை",
    lblGoOnline: "🟢 ஓட்டுநர் ஆன்லைனில் உள்ளார் (உணவு ஆர்டர்கள் இல்லாத நேரத்தில் விளைபொருட்களை ஏற்றிச் செல்ல தயார்)",
    lblGoOffline: "⚪ ஓட்டுநர் ஆஃப்லைனில் உள்ளார்",
    btnToggleOnlineStatus: "ஆன்லைன் / ஆஃப்லைன் நிலை மாற்று",
    btnBookInstantGig: "⚡ உடனடி வண்டி முன்பதிவு",
    modalGigTitle: "⚡ உடனடி விநியோக பார்ட்னரை முன்பதிவு செய் (ஆர்டர் இல்லாத ஓய்வு நேர வண்டி)",
    lblGigPartner: "ஒதுக்கப்பட்ட விநியோக பார்ட்னர்",
    lblGigDiscountTag: "ஓய்வு நேர / காலியாக திரும்பும் தள்ளுபடி",
    lblGigRateEst: "தள்ளுபடி கட்டணம்",
    lblGigEta: "வந்து சேரும் நேரம்",
    lblGigSelectCrop: "விளைபொருள் விவரம்",
    lblGigQuantityKg: "எடை / பேக்கேஜிங் (எ.கா. 50 கிலோ / 2 பெட்டிகள்)",
    lblGigDropLoc: "சேருமிடம் (உள்ளூர் சந்தை / வாங்குபவர் / கிடங்கு)",
    btnConfirmGigBook: "⚡ உடனடியாக ரைடரை அனுப்புங்கள்",
    badgeIdleZeroOrder: "⚡ ஓய்வு நேரம் (உணவு ஆர்டர் இல்லை)",
    badgeBackhaulDiscount: "🔄 காலியாக திரும்பும் தள்ளுபடி",
    lblNearbyAway: "தொலைவில்",
    lblEstArrival: "வந்து சேரும் நேரம்",
    lblBestFor: "சிறந்தது:",

    // Real Map & Live GPS Telemetry
    btnRecenterVehicle: "🎯 வாகனத்தின் மீது நிலைநிறுத்து",
    btnFitRoute: "🗺️ முழு வழியையும் காண்க",
    lblLiveSpeed: "தற்போதைய வேகம்",
    lblRemainingDist: "மீதமுள்ள தூரம்",
    lblPickupPin: "விளைநில ஏற்றும் இடம்",
    lblDropPin: "சந்தை / கிடங்கு சேருமிடம்",
    lblDriverMoving: "வாகனம் சாலையில் செல்கிறது",

    // Shared On-Demand Agricultural Logistics & Farmer Cluster
    secSharedLogisticsTitle: "🚚 பகிர்வு தேவைக்கேற்ற விவசாய சரக்கு போக்குவரத்து",
    secSharedLogisticsSubtitle: "AI-இயங்கும் கூட்டு சரக்கு ஏற்றுதல் & பல-இட சேகரிப்பு",
    flowStepOrderConfirmed: "ஆர்டர் உறுதி செய்யப்பட்டது",
    flowStepAiChecks: "AI சரிபார்ப்பு (அளவு, தூரம், அவசரம், பயிர் வகை)",
    flowStepClusterDecision: "விவசாயிகள் கிளஸ்டர் உள்ளதா?",
    flowStepPoolLoads: "கூட்டு சரக்கு ஏற்றுதல் (பகிர்வு வாகனம்)",
    flowStepIndividual: "தனிநபர் போக்குவரத்து",
    flowStepRouteOpt: "AI வழித்தட உகப்பாக்கம் (பல நிறுத்தங்கள்)",
    flowStepLiveGps: "நேரடி ஜிபிஎஸ் கண்காணிப்பு",
    flowStepDeliveryPod: "டெலிவரி & டிஜிட்டல் ரசீது",
    clusterTitle: "🔥 சக்திவாய்ந்த இணைப்பு: 3 விவசாயிகள் கிளஸ்டர் (1.2 டன்)",
    clusterDesc: "தனித்தனி லாரி வாடகைக்கு பதிலாக அருகிலுள்ள 3 சிறு விவசாயிகள் ஒரே டாட்டா ஏஸ் வண்டியைப் பகிர்ந்து கொள்கின்றனர்.",
    lblFarmerA: "விவசாயி A: ரவி குமார் (திண்டல்) - 350 கிலோ",
    lblFarmerB: "விவசாயி B: செல்வம் பி. (வில்லரசம்பட்டி) - 450 கிலோ",
    lblFarmerC: "விவசாயி C: முருகன் எஸ். (பெருந்துறை) - 400 கிலோ",
    lblClusterTotalLoad: "மொத்த கிளஸ்டர் எடை: 1.2 டன் (1,200 கிலோ)",
    lblCostSeparateTrips: "3 தனித்தனி பயணங்களின் செலவு:",
    lblCostPooledVehicle: "பகிர்வு வாகனத்தின் கட்டணம்:",
    lblNetSavings: "விவசாயிகளின் நிகர சேமிப்பு:",
    btnDispatchCluster: "🚀 பகிர்வு கிளஸ்டர் வாகனத்தை அனுப்பு (1.2 டன்)",
    badgeMultiStop: "3 நிறுத்தங்கள் கொண்ட உகந்த வழித்தடம்",

    // Cold Storage Branch (Perishable Produce Safeguard)
    secColdBranchTitle: "🧊 குளிர்சாதன சேமிப்பு கிளை: அழுகும் பயிர்கள் பாதுகாப்பு முறை",
    secColdBranchSubtitle: "தானியங்கி முடிவெடுக்கும் முறை: உடனடி வாங்குபவர் இல்லாதபோது விளைபொருளைப் பாதுகாக்கவும்",
    csStepHarvested: "விளைச்சல் தயாராக உள்ளது",
    csStepImmediateBuyer: "உடனடி வாங்குபவர் உள்ளாரா?",
    csStepPerishableCheck: "இது அழுகக்கூடிய பயிரா?",
    csStepAiEvaluate: "AI அருகிலுள்ள குளிர்சாதன கிடங்கைத் தேடுகிறது (கொள்ளளவு, தூரம், வாடகை)",
    csStepReserve: "குளிர்சாதன அறையை முன்பதிவு செய்",
    csStepBuyerSearch: "பின்னணியில் வாங்குபவரைத் தேடவும்",
    csStepDispatchBuyer: "வாங்குபவர் உறுதி ➔ கிடங்கிலிருந்து நேரடி டெலிவரி",
    lblSimulateColdPrompt: "மாதிரி சூழல்: 10 டன் தக்காளி தயார் ஆனால் வியாபாரி உடனடியாக வரவில்லை",
    btnSimulateReserveStorage: "🔒 AI குளிர்சாதன அறையை முன்பதிவு செய் (விலை வீழ்ச்சி தடுப்பு)",
    btnSimulateBuyerFound: "🤝 வாங்குபவர் கிடைத்துவிட்டார் ➔ கிடங்கிலிருந்து அனுப்பு",
    badgeDistressPrevented: "அவசர விலை வீழ்ச்சி தடுக்கப்பட்டது (வாழ்நாள் +21 நாட்கள்)",
    badgeStorageReserved: "WDRA குளிர்பதன அறை #B-14 ஒதுக்கப்பட்டது",
    badgeInStorageDispatched: "கிடங்கிலிருந்து வாங்குபவருக்கு அனுப்பப்பட்டது"
  }
};

let currentAppLang = (typeof localStorage !== 'undefined' && localStorage.getItem('agrinex_lang')) ? localStorage.getItem('agrinex_lang') : 'en';

/**
 * Get translation for key
 */
function t(key) {
  if (TRANSLATIONS[currentAppLang] && TRANSLATIONS[currentAppLang][key]) {
    return TRANSLATIONS[currentAppLang][key];
  }
  if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
    return TRANSLATIONS.en[key];
  }
  return key;
}

/**
 * Apply language to all elements with data-i18n and data-i18n-placeholder
 */
function setAppLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  currentAppLang = lang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('agrinex_lang', lang);
  }

  // Update language pill buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update text content of static elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated) {
      el.innerHTML = translated;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated) {
      el.setAttribute('placeholder', translated);
    }
  });

  // Re-render dynamic parts
  if (typeof renderBookings === 'function') renderBookings();
  if (typeof renderTransporters === 'function') renderTransporters();
  if (typeof renderStorageFacilities === 'function') renderStorageFacilities();
  if (typeof renderIdlePartners === 'function') renderIdlePartners();
  if (typeof renderStats === 'function') renderStats();
  if (typeof applyRoleView === 'function' && typeof LOGISTICS_DATA !== 'undefined') {
    applyRoleView(LOGISTICS_DATA.currentRole);
  }

  // Toast feedback
  const langName = lang === 'hi' ? 'हिन्दी (Hindi)' : (lang === 'ta' ? 'தமிழ் (Tamil)' : 'English');
  if (typeof showToast === 'function') {
    showToast('info', 'Language Switched', `Active language set to ${langName}`);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { TRANSLATIONS, t, setAppLanguage };
}
