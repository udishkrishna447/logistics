/**
 * AgriNex Transporter & Logistics Module - Complete Multilingual Engine
 * Full support for English (EN), हिन्दी (Hindi - HI), and தமிழ் (Tamil - TA)
 */

const TRANSLATIONS = {
  en: {
    // Top Bar & Brand
    brandTitle: "AgriNex",
    brandSubtitle: "Driver Fleet Console",
    driverBadgeRole: "Tata Ace EV · TN-33-AX-8910",
    topPageTitle: "🚚 AgriNex Driver & Fleet Console",
    btnSosTop: "🚨 SOS Emergency",

    // Sidebar
    sidebarSectionLabel: "DRIVER SHIFT WORKFLOW",
    navActiveMission: "Active Mission & Map",
    navDutyProfile: "Duty & Profile",
    navEarningsWallet: "Earnings & UPI Payout",
    navNearbyLoads: "Nearby Load Broadcasts",
    navPodHandover: "POD Handover",
    navVehicleDiagnostics: "Vehicle Diagnostics",
    navEmergencySos: "Emergency SOS",
    driverName: "Karthik Raja",
    driverVehicle: "Tata Ace EV · TN-33-AX-8910",

    // Section 1: Active Mission Overview
    lblActiveDispatch: "LIVE DISPATCH MISSION",
    missionCode: "CLUSTER-AGX-801",
    missionTitle: "3-Village Tomato Collection (1.2 Tonnes · Net ₹1,650)",
    missionRouteText: "Route: Thindal ➔ Perundurai ➔ Bhavani ➔ Coimbatore Mandi",
    missionBadgeCrates: "48 Crates",
    missionBadgeCold: "Passive Cold Mesh",
    btnNavigateNext: "🚗 Navigate to Stop 1 (Thindal) ➔",

    // Map HUD
    hudSpeed: "SPEED",
    hudDist: "REMAINING",
    hudEta: "EST. ARRIVAL",
    btnRecenter: "🎯 Recenter",
    btnFullRoute: "🗺️ Full Route",

    // Sequential Waypoints
    waypointsTitle: "Sequential Collection Route (3 Stops)",
    stop1Title: "Stop 1: Thindal Farmgate (Ravi Kumar)",
    stop1Details: "18 Crates (450 kg) · Call: 98421 11201 · Status: Next Stop",
    btnCallRavi: "📞 Call Ravi",
    stop2Title: "Stop 2: Perundurai FPO Hub (Selvam V.)",
    stop2Details: "20 Crates (500 kg) · Call: 94432 44312 · Status: Queued",
    btnCallSelvam: "📞 Call Selvam",
    stop3Title: "Stop 3: Bhavani Riverside (Murugan K.)",
    stop3Details: "10 Crates (250 kg) · Call: 97894 88723 · Status: Queued",
    btnCallMurugan: "📞 Call Murugan",

    // POD Handover Card
    podCardTitle: "✍️ Proof of Delivery (POD) Handover",
    podCardDesc: "Deliver 48 Crates (1.2T) at Coimbatore Mandi Gate #2",
    btnOpenPodTerminal: "✍️ Open POD Receiver Screen",

    // Duty & Profile Card
    driverNameTitle: "Karthik Raja",
    driverSub: "Tata Ace EV · TN-33-AX-8910 · Rating ★ 4.92",
    dutyOnline: "ONLINE",
    dutyOffline: "OFFLINE",

    // Shift Earnings
    earningsCardTitle: "💰 Shift Earnings & Instant UPI Cashout",
    lblSettled: "TODAY'S SETTLED",
    lblInTripAccrual: "IN-TRIP ACCRUAL",
    btnInstantCashout: "⚡ Instant UPI Cashout",
    lblDirectCredit: "Direct bank credit to: 9842199812@okhdfcbank",
    fareTableTitle: "Fare Breakdown",
    thTrip: "Trip / Lot",
    thDistance: "Dist",
    thGross: "Gross",
    thNet: "Net Payout",
    thStatus: "Status",
    valSettledStatus: "Settled",
    valInTripStatus: "In-Trip",

    // Load Broadcasts
    loadsCardTitle: "📡 Nearby Load Broadcasts (Dispatch Board)",
    load1Tag: "SWIGGY QUICK-GIG",
    load1Title: "⚡ Swiggy Instamart Downtime Hop",
    load1Route: "Erode Hub ➔ Perundurai Darkstore (8 km)",
    load1Pay: "₹129",
    load1Guarantee: "Guaranteed 45-min transit",
    load2Tag: "BULK FREIGHT",
    load2Title: "🌾 Bhavani FPO ➔ Pollachi Mandi",
    load2Route: "60 km · 12 Tonnes Tender Coconut",
    load2Pay: "₹9,020",
    load2Guarantee: "Full truckload · Net payout",
    btnAccept: "Accept",
    btnDecline: "Decline",

    // Telematics & Diagnostics
    telematicsTitle: "🔧 Vehicle Telematics & Fastag",
    lblBattery: "TRACTION BATTERY",
    valBattery: "84% (110 km)",
    subBattery: "Health 98%",
    lblFastag: "NHAI FASTAG",
    valFastag: "₹1,240 Balance",
    subFastag: "Auto-Recharge Active",
    lblTpms: "TIRE TPMS",
    valTpms: "36 PSI",
    subTpms: "Optimal Pressure",
    lblPermit: "COMMERCIAL PERMIT",
    valPermit: "Valid Feb 2027",
    subPermit: "Goods Carriage",

    // Roadside Assistance Card
    roadsideTitle: "🚨 24/7 Roadside Assistance",
    btnTowing: "📞 NH 544 Towing Helpline (1800 425 1234)",
    btnTransshipment: "🔄 Emergency Produce Transshipment",

    // Modals
    sosModalTitle: "🚨 Highway Emergency SOS & Breakdown Support",
    sosModalDesc: "Immediate 24/7 breakdown helpline for agricultural commercial transporters on NH 544:",
    btnSosCall: "📞 Call Highway Towing & Mobile Mechanic (1800 425 1234)",
    btnSosTransship: "🔄 Request Emergency Cargo Transshipment (Perishable Safeguard)",
    btnSosEv: "⚡ Locate Nearest EV Fast-Charging Station",
    podModalTitle: "✍️ Proof of Delivery (POD) Handover",
    podModalSub: "Mandi Receiver Gate Handover: CLUSTER-AGX-801",
    podVerifyTitle: "Mandi Receiver Verification",
    podVerifyDesc: "Request the 4-digit code displayed on the Mandi receiving screen. Demo code: 4912",
    lblEnterOtp: "Enter Receiver OTP *",
    lblCratesIntact: "Crates Delivered Intact *",
    valCratesIntact: "48 Crates (1.2 Tonnes)",
    lblDock: "Unloading Dock",
    valDock: "Coimbatore Gate #2",
    lblReceiverSig: "Mandi Receiver Signature (Touchscreen)",
    btnClearSig: "Clear Signature",
    btnClose: "Close",
    btnCancel: "Cancel",
    btnCompleteDelivery: "✅ Complete Delivery & Collect ₹1,650"
  },

  hi: {
    // Top Bar & Brand
    brandTitle: "AgriNex",
    brandSubtitle: "ड्राइवर फ्लीट कंसोल",
    driverBadgeRole: "टाटा ऐस EV · TN-33-AX-8910",
    topPageTitle: "🚚 एग्रीनेक्स ड्राइवर एवं फ्लीट कंसोल",
    btnSosTop: "🚨 SOS आपातकालीन",

    // Sidebar
    sidebarSectionLabel: "ड्राइवर शिफ्ट वर्कफ़्लो",
    navActiveMission: "सक्रिय मिशन एवं मैप",
    navDutyProfile: "ड्यूटी एवं प्रोफाइल",
    navEarningsWallet: "कमाई एवं UPI भुगतान",
    navNearbyLoads: "नजदीकी लोड प्रसारण",
    navPodHandover: "POD हैंडओवर",
    navVehicleDiagnostics: "वाहन डायग्नोस्टिक्स",
    navEmergencySos: "आपातकालीन SOS",
    driverName: "कार्तिक राजा",
    driverVehicle: "टाटा ऐस EV · TN-33-AX-8910",

    // Section 1: Active Mission Overview
    lblActiveDispatch: "सक्रिय प्रेषण मिशन",
    missionCode: "CLUSTER-AGX-801",
    missionTitle: "3-गाँव टमाटर संग्रह (1.2 टन · शुद्ध ₹1,650)",
    missionRouteText: "मार्ग: थिंडल ➔ पेरुंदुरई ➔ भवानी ➔ कोयंबटूर मंडी",
    missionBadgeCrates: "48 क्रेट्स",
    missionBadgeCold: "निष्क्रिय कोल्ड मेश",
    btnNavigateNext: "🚗 स्टॉप 1 (थिंडल) पर नेविगेट करें ➔",

    // Map HUD
    hudSpeed: "गति",
    hudDist: "शेष दूरी",
    hudEta: "अनुमानित समय",
    btnRecenter: "🎯 केंद्रित करें",
    btnFullRoute: "🗺️ संपूर्ण मार्ग",

    // Sequential Waypoints
    waypointsTitle: "अनुक्रमिक संग्रह मार्ग (3 पड़ाव)",
    stop1Title: "स्टॉप 1: थिंडल फार्मगेट (रवि कुमार)",
    stop1Details: "18 क्रेट्स (450 किग्रा) · कॉल: 98421 11201 · स्थिति: अगला पड़ाव",
    btnCallRavi: "📞 रवि को कॉल करें",
    stop2Title: "स्टॉप 2: पेरुंदुरई FPO हब (सेल्वम वी.)",
    stop2Details: "20 क्रेट्स (500 किग्रा) · कॉल: 94432 44312 · स्थिति: कतारबद्ध",
    btnCallSelvam: "📞 सेल्वम को कॉल करें",
    stop3Title: "स्टॉप 3: भवानी नदी तट (मुरुगन के.)",
    stop3Details: "10 क्रेट्स (250 किग्रा) · कॉल: 97894 88723 · स्थिति: कतारबद्ध",
    btnCallMurugan: "📞 मुरुगन को कॉल करें",

    // POD Handover Card
    podCardTitle: "✍️ डिलीवरी का प्रमाण (POD) हैंडओवर",
    podCardDesc: "कोयंबटूर मंडी गेट #2 पर 48 क्रेट्स (1.2 टन) सौंपें",
    btnOpenPodTerminal: "✍️ POD रिसीवर स्क्रीन खोलें",

    // Duty & Profile Card
    driverNameTitle: "कार्तिक राजा",
    driverSub: "टाटा ऐस EV · TN-33-AX-8910 · रेटिंग ★ 4.92",
    dutyOnline: "ऑनलाइन",
    dutyOffline: "ऑफलाइन",

    // Shift Earnings
    earningsCardTitle: "💰 शिफ्ट कमाई एवं तत्काल UPI निकासी",
    lblSettled: "आज की चुकता कमाई",
    lblInTripAccrual: "चालू यात्रा संचित",
    btnInstantCashout: "⚡ तत्काल UPI निकासी",
    lblDirectCredit: "प्रत्यक्ष बैंक क्रेडिट: 9842199812@okhdfcbank",
    fareTableTitle: "किराया विवरण",
    thTrip: "यात्रा / लॉट",
    thDistance: "दूरी",
    thGross: "सकल",
    thNet: "शुद्ध भुगतान",
    thStatus: "स्थिति",
    valSettledStatus: "चुकता",
    valInTripStatus: "प्रगति में",

    // Load Broadcasts
    loadsCardTitle: "📡 नजदीकी लोड प्रसारण (लाइव बोर्ड)",
    load1Tag: "त्वरित गिग",
    load1Title: "⚡ स्विगी इंस्टामार्ट डाउनटाइम हॉप",
    load1Route: "इरोड हब ➔ पेरुंदुरई डार्कस्टोर (8 किमी)",
    load1Pay: "₹129",
    load1Guarantee: "45 मिनट गारंटीकृत पारगमन",
    load2Tag: "थोक माल",
    load2Title: "🌾 भवानी FPO ➔ पोल्लाची मंडी",
    load2Route: "60 किमी · 12 टन नारियल",
    load2Pay: "₹9,020",
    load2Guarantee: "फुल ट्रकलोड · शुद्ध भुगतान",
    btnAccept: "स्वीकारें",
    btnDecline: "अस्वीकार",

    // Telematics & Diagnostics
    telematicsTitle: "🔧 वाहन टेलीमैटिक्स एवं फास्टैग",
    lblBattery: "कर्षण बैटरी",
    valBattery: "84% (110 किमी)",
    subBattery: "स्वास्थ्य 98%",
    lblFastag: "NHAI फास्टैग",
    valFastag: "₹1,240 शेष राशि",
    subFastag: "ऑटो-रिचार्ज सक्रिय",
    lblTpms: "टायर TPMS",
    valTpms: "36 PSI",
    subTpms: "अनुकूलतम दबाव",
    lblPermit: "वाणिज्यिक परमिट",
    valPermit: "वैध फरवरी 2027",
    subPermit: "माल वाहक वाहन",

    // Roadside Assistance Card
    roadsideTitle: "🚨 24/7 सड़क सहायता",
    btnTowing: "📞 NH 544 टोइंग हेल्पलाइन (1800 425 1234)",
    btnTransshipment: "🔄 आपातकालीन उपज ट्रांसशिपमेंट",

    // Modals
    sosModalTitle: "🚨 हाईवे आपातकालीन SOS एवं ब्रेकडाउन सहायता",
    sosModalDesc: "NH 544 पर कृषि वाणिज्यिक ट्रांसपोर्टरों के लिए 24/7 तत्काल ब्रेकडाउन हेल्पलाइन:",
    btnSosCall: "📞 हाईवे टोइंग व मोबाइल मैकेनिक को कॉल करें (1800 425 1234)",
    btnSosTransship: "🔄 आपातकालीन उपज ट्रांसशिपमेंट अनुरोध (खराब होने से बचाएं)",
    btnSosEv: "⚡ निकटतम EV फास्ट-चार्जिंग स्टेशन खोजें",
    podModalTitle: "✍️ डिलीवरी का प्रमाण (POD) हैंडओवर",
    podModalSub: "मंडी रिसीवर गेट हैंडओवर: CLUSTER-AGX-801",
    podVerifyTitle: "मंडी प्राप्तकर्ता सत्यापन",
    podVerifyDesc: "मंडी रिसीविंग स्क्रीन पर प्रदर्शित 4-अंकों का कोड दर्ज करें। डेमो कोड: 4912",
    lblEnterOtp: "रिसीवर OTP दर्ज करें *",
    lblCratesIntact: "सुरक्षित प्राप्त क्रेट्स *",
    valCratesIntact: "48 क्रेट्स (1.2 टन)",
    lblDock: "अनलोडिंग डॉक",
    valDock: "कोयंबटूर गेट #2",
    lblReceiverSig: "मंडी प्राप्तकर्ता हस्ताक्षर (टचस्क्रीन)",
    btnClearSig: "हस्ताक्षर हटाएं",
    btnClose: "बंद करें",
    btnCancel: "रद्द करें",
    btnCompleteDelivery: "✅ डिलीवरी पूर्ण करें और ₹1,650 प्राप्त करें"
  },

  ta: {
    // Top Bar & Brand
    brandTitle: "AgriNex",
    brandSubtitle: "ஓட்டுநர் வாகன பணியகம்",
    driverBadgeRole: "டாடா ஏஸ் EV · TN-33-AX-8910",
    topPageTitle: "🚚 அக்ரிநெக்ஸ் ஓட்டுநர் & வாகன பணியகம்",
    btnSosTop: "🚨 SOS அவசர உதவி",

    // Sidebar
    sidebarSectionLabel: "ஓட்டுநர் பணிப் பாதை",
    navActiveMission: "தற்போதைய பயணம் & வரைபடம்",
    navDutyProfile: "பணி & சுயவிவரம்",
    navEarningsWallet: "வருமானம் & UPI பணம்",
    navNearbyLoads: "அருகிலுள்ள புதிய சுமைகள்",
    navPodHandover: "POD ஒப்படைப்பு",
    navVehicleDiagnostics: "வாகன நிலை பரிசோதனை",
    navEmergencySos: "அவசரக்கால SOS",
    driverName: "கார்த்திக் ராஜா",
    driverVehicle: "டாடா ஏஸ் EV · TN-33-AX-8910",

    // Section 1: Active Mission Overview
    lblActiveDispatch: "நேரடி ஏற்றுமதிப் பணி",
    missionCode: "CLUSTER-AGX-801",
    missionTitle: "3-கிராம தக்காளி சேகரிப்பு (1.2 டன் · நிகர வருமானம் ₹1,650)",
    missionRouteText: "பாதை: திண்டல் ➔ பெருந்துறை ➔ பவானி ➔ கோயம்புத்தூர் மார்க்கெட்",
    missionBadgeCrates: "48 கிரேட்கள்",
    missionBadgeCold: "செயலற்ற குளிர் வலை",
    btnNavigateNext: "🚗 நிறுத்தம் 1 (திண்டல்) க்கு வழிசெலுத்துக ➔",

    // Map HUD
    hudSpeed: "வேகம்",
    hudDist: "மீதமுள்ள தூரம்",
    hudEta: "வந்து சேரும் நேரம்",
    btnRecenter: "🎯 மையப்படுத்துக",
    btnFullRoute: "🗺️ முழுப் பாதை",

    // Sequential Waypoints
    waypointsTitle: "வரிசைமுறை சேகரிப்புப் பாதை (3 நிறுத்தங்கள்)",
    stop1Title: "நிறுத்தம் 1: திண்டல் பண்ணைக் களம் (ரவி குமார்)",
    stop1Details: "18 கிரேட்கள் (450 கிலோ) · அலைபேசி: 98421 11201 · நிலை: அடுத்த நிறுத்தம்",
    btnCallRavi: "📞 ரவியை அழைக்கவும்",
    stop2Title: "நிறுத்தம் 2: பெருந்துறை FPO மையம் (செல்வம் வி.)",
    stop2Details: "20 கிரேட்கள் (500 கிலோ) · அலைபேசி: 94432 44312 · நிலை: காத்திருப்பில்",
    btnCallSelvam: "📞 செல்வத்தை அழைக்கவும்",
    stop3Title: "நிறுத்தம் 3: பவானி ஆற்றங்கரை (முருகன் கே.)",
    stop3Details: "10 கிரேட்கள் (250 கிலோ) · அலைபேசி: 97894 88723 · நிலை: காத்திருப்பில்",
    btnCallMurugan: "📞 முருகனை அழைக்கவும்",

    // POD Handover Card
    podCardTitle: "✍️ டெலிவரி உறுதிப்படுத்தல் (POD) ஒப்படைப்பு",
    podCardDesc: "கோயம்புத்தூர் மார்க்கெட் கேட் #2-ல் 48 கிரேட்கள் (1.2 டன்) ஒப்படைக்கவும்",
    btnOpenPodTerminal: "✍️ POD பெறுநர் திரையைத் திறக்கவும்",

    // Duty & Profile Card
    driverNameTitle: "கார்த்திக் ராஜா",
    driverSub: "டாடா ஏஸ் EV · TN-33-AX-8910 · மதிப்பீடு ★ 4.92",
    dutyOnline: "ஆன்லைன்",
    dutyOffline: "ஆஃப்லைன்",

    // Shift Earnings
    earningsCardTitle: "💰 ஷிப்ட் வருமானம் & உடனடி UPI வரவு",
    lblSettled: "இன்றைய வரவு வைக்கப்பட்ட தொகை",
    lblInTripAccrual: "பயணத்தில் உள்ள தொகை",
    btnInstantCashout: "⚡ உடனடி UPI கணக்கு மாற்றம்",
    lblDirectCredit: "நேரடி வங்கிக் கணக்கு: 9842199812@okhdfcbank",
    fareTableTitle: "வாடகை விவரம்",
    thTrip: "பயணம் / லாட்",
    thDistance: "தூரம்",
    thGross: "மொத்தம்",
    thNet: "நிகர வரவு",
    thStatus: "நிலை",
    valSettledStatus: "வரவு வைக்கப்பட்டது",
    valInTripStatus: "நடைபெறுகிறது",

    // Load Broadcasts
    loadsCardTitle: "📡 நேரடி சுமைப் பலகை (அருகிலுள்ள சுமைகள்)",
    load1Tag: "விரைவு கிக்",
    load1Title: "⚡ ஸ்விக்கி இன்ஸ்டாமார்ட் ஓய்வு நேர பணி",
    load1Route: "ஈரோடு மையம் ➔ பெருந்துறை கிடங்கு (8 கி.மீ)",
    load1Pay: "₹129",
    load1Guarantee: "45 நிமிட உத்தரவாதப் பயணம்",
    load2Tag: "மொத்த சுமை",
    load2Title: "🌾 பவானி FPO ➔ பொள்ளாச்சி மார்க்கெட்",
    load2Route: "60 கி.மீ · 12 டன்கள் இளநீர்",
    load2Pay: "₹9,020",
    load2Guarantee: "முழு லாரி சுமை · நிகர வரவு",
    btnAccept: "ஏற்கவும்",
    btnDecline: "நிராகரி",

    // Telematics & Diagnostics
    telematicsTitle: "🔧 வாகன நிலை & ஃபாஸ்டேக்",
    lblBattery: "மின்சார பேட்டரி",
    valBattery: "84% (110 கி.மீ)",
    subBattery: "திறன் 98%",
    lblFastag: "NHAI ஃபாஸ்டேக்",
    valFastag: "₹1,240 இருப்பு",
    subFastag: "தானியங்கி ரீசார்ஜ் செயலில் உள்ளது",
    lblTpms: "டயர் அழுத்தம் (TPMS)",
    valTpms: "36 PSI",
    subTpms: "சரியான காற்றழுத்தம்",
    lblPermit: "வணிக அனுமதி சீட்டு",
    valPermit: "செல்லுபடியாகும் காலம்: பிப் 2027",
    subPermit: "சரக்கு வாகனம்",

    // Roadside Assistance Card
    roadsideTitle: "🚨 24/7 அவசரச் சாலை உதவி",
    btnTowing: "📞 NH 544 அவசர இழுவை சேவை (1800 425 1234)",
    btnTransshipment: "🔄 அவசரப் பயிர் மாற்று வாகனம்",

    // Modals
    sosModalTitle: "🚨 நெடுஞ்சாலை அவசர SOS & பழுது நீக்கும் உதவி",
    sosModalDesc: "NH 544-ல் வேளாண் வணிக வாகனங்களுக்கான 24/7 உடனடி அவசர உதவி எண்:",
    btnSosCall: "📞 நெடுஞ்சாலை இழுவை & நடமாடும் மெக்கானிக்கை அழைக்கவும் (1800 425 1234)",
    btnSosTransship: "🔄 அவசரப் பயிர் மாற்று வாகனக் கோரிக்கை (அழுகாமல் காக்க)",
    btnSosEv: "⚡ அருகில் உள்ள EV சார்ஜிங் நிலையம்",
    podModalTitle: "✍️ டெலிவரி உறுதிப்படுத்தல் (POD) ஒப்படைப்பு",
    podModalSub: "மார்க்கெட் பெறுநர் வாயில் ஒப்படைப்பு: CLUSTER-AGX-801",
    podVerifyTitle: "மார்க்கெட் பெறுநர் சரிபார்ப்பு",
    podVerifyDesc: "மார்க்கெட் திரையில் காட்டப்படும் 4-இலக்க ரகசிய எண்ணை உள்ளிடவும். மாதிரி எண்: 4912",
    lblEnterOtp: "பெறுநர் OTP எண்ணை உள்ளிடவும் *",
    lblCratesIntact: "சேதமின்றி ஒப்படைக்கப்பட்ட கிரேட்கள் *",
    valCratesIntact: "48 கிரேட்கள் (1.2 டன்கள்)",
    lblDock: "சரக்கு இறங்கு தளம்",
    valDock: "கோயம்புத்தூர் கேட் #2",
    lblReceiverSig: "மார்க்கெட் பெறுநர் கையொப்பம் (தொடுதிரை)",
    btnClearSig: "கையொப்பத்தை அழிக்கவும்",
    btnClose: "மூடுக",
    btnCancel: "ரத்து செய்",
    btnCompleteDelivery: "✅ டெலிவரி முடித்து ₹1,650 பெறுக"
  }
};

let currentAppLang = (typeof localStorage !== 'undefined' && localStorage.getItem('agrinex_lang')) ? localStorage.getItem('agrinex_lang') : 'en';

function t(key) {
  if (TRANSLATIONS[currentAppLang] && TRANSLATIONS[currentAppLang][key]) {
    return TRANSLATIONS[currentAppLang][key];
  }
  if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
    return TRANSLATIONS.en[key];
  }
  return key;
}

function setAppLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  currentAppLang = lang;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('agrinex_lang', lang);
    }
  } catch (e) {}

  // 1. Update Language Selector Pill Buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // 2. Translate All Elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated) {
      el.innerHTML = translated;
    }
  });

  // 3. Translate All Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated) {
      el.setAttribute('placeholder', translated);
    }
  });

  // 4. Update Document Language attribute
  document.documentElement.lang = lang;
}

// Global bridge functions
if (typeof window !== 'undefined') {
  window.setLanguage = setAppLanguage;
  window.setAppLanguage = setAppLanguage;
  window.t = t;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('agrinex_lang')) ? localStorage.getItem('agrinex_lang') : 'en';
    setAppLanguage(savedLang);
  });
}

if (typeof module !== 'undefined') {
  module.exports = { TRANSLATIONS, t, setAppLanguage };
}
