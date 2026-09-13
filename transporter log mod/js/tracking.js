/**
 * AgriNex Logistics Module - Live Shipment Tracking & Real GPS Map Engine
 * Provides authentic Google Maps / Swiggy-style real location tracking:
 * - Real interactive map (Leaflet with CartoDB Voyager / OpenStreetMap tiles)
 * - Multi-waypoint authentic road curves along highways and city streets
 * - Custom animated Swiggy delivery rider / truck with iconic pulsing radar beacon
 * - Two-tone route polyline (emerald green completed, dashed azure remaining)
 * - Floating live telematics HUD (speed, distance left, ETA)
 * - "Recenter on Vehicle" and "Fit Full Route" controls
 * - Built-in zero-dependency offline SVG fallback in case of no internet
 */

const LogisticsTracking = {
  map: null,
  vehicleMarker: null,
  pickupMarker: null,
  dropMarker: null,
  traveledPolyline: null,
  remainingPolyline: null,
  currentRoute: [],
  activeBooking: null,
  liveMotionInterval: null,

  stages: [
    { step: 0, title: 'Booking Requested', key: 'stRequested', desc: 'Pickup broadcasted to fleet', speed: 0, routeRatio: 0.0, eta: 'Waiting for vehicle' },
    { step: 1, title: 'Vehicle Assigned', key: 'stAssigned', desc: 'Driver & vehicle verified', speed: 28, routeRatio: 0.08, eta: 'Driver en route to farm' },
    { step: 2, title: 'Vehicle Arrived', key: 'stArrived', desc: 'Arrived at farmgate', speed: 0, routeRatio: 0.0, eta: 'At farmgate pickup' },
    { step: 3, title: 'Loaded & Weighed', key: 'stLoaded', desc: 'Tare/gross weight recorded', speed: 0, routeRatio: 0.05, eta: 'Loading crates' },
    { step: 4, title: 'Vehicle Departed', key: 'stDeparted', desc: 'GPS route active & sealed', speed: 38, routeRatio: 0.25, eta: 'Departed · ETA 1h 45m' },
    { step: 5, title: 'In Transit', key: 'stInTransit', desc: 'On highway toward warehouse', speed: 54, routeRatio: 0.65, eta: 'On highway · ETA 35m' },
    { step: 6, title: 'Delivered', key: 'stDelivered', desc: 'Digital POD confirmed', speed: 0, routeRatio: 1.0, eta: 'Delivered & Completed' }
  ],

  // Real curved road coordinates (South India Agro Corridors)
  routes: {
    // NH 544 Highway Corridor: Erode Farmgate to Coimbatore APMC Mandi (Curved road waypoints)
    highway: [
      { lat: 11.3125, lng: 77.6780, name: 'Erode Farmgate Collection Point' },
      { lat: 11.3090, lng: 77.6520, name: 'Village Collector Road' },
      { lat: 11.3020, lng: 77.6180, name: 'NH 544 Entry (Perundurai Road)' },
      { lat: 11.2820, lng: 77.5850, name: 'Perundurai Bypass Curve' },
      { lat: 11.2650, lng: 77.5320, name: 'Vijayamangalam Toll Corridor' },
      { lat: 11.2380, lng: 77.4780, name: 'Uttukuli Junction Curve' },
      { lat: 11.2180, lng: 77.4120, name: 'Chengapalli Highway' },
      { lat: 11.1960, lng: 77.3480, name: 'Tiruppur Ring Road Bypass' },
      { lat: 11.1820, lng: 77.2650, name: 'Avinashi Bypass Curve' },
      { lat: 11.1550, lng: 77.1890, name: 'Thekkalur Highway Sector' },
      { lat: 11.1250, lng: 77.1120, name: 'Kaniyur Toll Plaza' },
      { lat: 11.0850, lng: 77.0580, name: 'Karumathampatti Curve' },
      { lat: 11.0420, lng: 77.0120, name: 'Neelambur Flyover Approach' },
      { lat: 11.0180, lng: 76.9740, name: 'Singanallur APMC Bypass' },
      { lat: 11.0065, lng: 76.9625, name: 'Coimbatore APMC Mandi Delivery Gate' }
    ],

    // Hyperlocal Gig Route: Local Farmgate to Town Vegetable Mandi (City road curves)
    hyperlocal: [
      { lat: 11.3180, lng: 77.6920, name: 'Thindal Farmgate Nursery' },
      { lat: 11.3250, lng: 77.7010, name: 'Perundurai Main Road Curve' },
      { lat: 11.3310, lng: 77.7090, name: 'Collectorate Circle' },
      { lat: 11.3360, lng: 77.7160, name: 'GH Hospital Cross Road' },
      { lat: 11.3410, lng: 77.7220, name: 'Brough Road Market Junction' },
      { lat: 11.3455, lng: 77.7285, name: 'Town Vegetable Mandi Yard' }
    ],

    // Multi-Farmer Shared Cluster Route (Farmer A ➔ Farmer B ➔ Farmer C ➔ APMC Mandi)
    cluster: [
      { lat: 11.3125, lng: 77.6780, name: 'Stop 1: Farmer A - Ravi K. (Thindal, 350 kg)', stopNum: 1, farmer: 'Ravi K.' },
      { lat: 11.3210, lng: 77.6690, name: 'Connecting Agro Road' },
      { lat: 11.3320, lng: 77.6590, name: 'Stop 2: Farmer B - Selvam P. (Villarasampatti, 450 kg)', stopNum: 2, farmer: 'Selvam P.' },
      { lat: 11.3090, lng: 77.6250, name: 'Perundurai Link Corridor' },
      { lat: 11.2820, lng: 77.5850, name: 'Stop 3: Farmer C - Murugan S. (Perundurai, 400 kg)', stopNum: 3, farmer: 'Murugan S.' },
      { lat: 11.2380, lng: 77.4780, name: 'NH 544 Highway Westbound' },
      { lat: 11.1820, lng: 77.2650, name: 'Avinashi Bypass' },
      { lat: 11.0850, lng: 77.0580, name: 'Karumathampatti Expressway' },
      { lat: 11.0065, lng: 76.9625, name: 'Final Destination: Coimbatore APMC Mandi Yard (1.2T Delivered)', isFinal: true }
    ]
  },

  /**
   * Determine which road route waypoints to use for a booking
   */
  getRouteForBooking: function(booking) {
    if (!booking) return this.routes.highway;
    if (booking.isCluster || (booking.trackingId && booking.trackingId.startsWith('CLUSTER-'))) {
      return this.routes.cluster;
    }
    const isGig = (booking.trackingId && booking.trackingId.startsWith('GIG-')) ||
                  (booking.vehicleType && (booking.vehicleType.toLowerCase().includes('scooter') || booking.vehicleType.toLowerCase().includes('bike')));
    return isGig ? this.routes.hyperlocal : this.routes.highway;
  },

  /**
   * Initialize or render the Google Maps / Swiggy-style live interactive map
   */
  renderLiveMap: function(booking) {
    this.activeBooking = booking;
    const container = document.getElementById('live-map-canvas');
    if (!container) return;

    const route = this.getRouteForBooking(booking);
    this.currentRoute = route;

    // Check if Leaflet is available in browser
    if (typeof L !== 'undefined') {
      this.initLeafletMap(container, booking, route);
    } else {
      this.renderOfflineSvgMap(container, booking, route);
    }

    this.updateTelematicsHUD(booking);
  },

  /**
   * Initialize interactive Leaflet map instance
   */
  initLeafletMap: function(container, booking, route) {
    // Clear existing map instance cleanly
    if (this.map) {
      try {
        this.map.remove();
      } catch (e) {
        console.warn('Leaflet cleanup notice:', e);
      }
      this.map = null;
    }
    if (container) {
      container._leaflet_id = null;
    }

    if (this.liveMotionInterval) {
      clearInterval(this.liveMotionInterval);
      this.liveMotionInterval = null;
    }

    // Determine current vehicle waypoint from step
    const stage = this.stages[booking.statusStep] || this.stages[0];
    const totalWaypoints = route.length;
    const targetIdx = Math.min(Math.round((totalWaypoints - 1) * stage.routeRatio), totalWaypoints - 1);
    const vehiclePos = route[targetIdx];

    // Create Leaflet map centered between pickup and vehicle
    const startPoint = [route[0].lat, route[0].lng];
    const endPoint = [route[route.length - 1].lat, route[route.length - 1].lng];

    this.map = L.map(container, {
      zoomControl: true,
      attributionControl: false
    }).setView([vehiclePos.lat, vehiclePos.lng], 12);

    // Clean OpenStreetMap tiles (Crystal clear road geometry, zero watermarks)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 1. Pickup Pin Marker(s) - Supports Multi-Stop Farmer Cluster
    if (booking.isCluster || (booking.trackingId && booking.trackingId.startsWith('CLUSTER-'))) {
      route.forEach(pt => {
        if (pt.stopNum) {
          const stopIcon = L.divIcon({
            className: 'custom-map-pin',
            html: `
              <div class="pin-cluster-stop" style="background:#f59e0b; color:#ffffff; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; border:3px solid #ffffff; box-shadow:0 4px 10px rgba(245,158,11,0.5);">
                ${pt.stopNum}
              </div>
              <div class="marker-label-badge" style="background:#d97706;">Stop ${pt.stopNum}: ${pt.farmer}</div>
            `,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
          });
          const stopMarker = L.marker([pt.lat, pt.lng], { icon: stopIcon }).addTo(this.map);
          stopMarker.bindPopup(`
            <div style="font-family: inherit; font-size: 0.85rem;">
              <strong style="color: #d97706;">Stop ${pt.stopNum}: ${pt.farmer}</strong><br/>
              <span style="font-size: 0.75rem; color: #475569;">${pt.name}</span>
            </div>
          `);
        }
      });
    } else {
      const pickupIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="pin-farmgate" title="${typeof t === 'function' ? t('lblPickupPin') : 'Farmgate Pickup'}">
            🌱
          </div>
          <div class="marker-label-badge">${typeof t === 'function' ? t('lblFarmgate') : 'Farmgate'}</div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      this.pickupMarker = L.marker(startPoint, { icon: pickupIcon }).addTo(this.map);
      this.pickupMarker.bindPopup(`
        <div style="font-family: inherit; font-size: 0.85rem; padding: 2px;">
          <strong style="color: #16a34a;">🌱 ${typeof t === 'function' ? t('lblPickupPin') : 'Farmgate Collection Point'}</strong><br/>
          <span style="color: #64748b; font-size: 0.75rem;">${booking.pickupLocation}</span>
        </div>
      `);
    }

    // 2. Dropoff Pin Marker (Mandi / Warehouse)
    const dropIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="pin-mandi" title="${typeof t === 'function' ? t('lblDropPin') : 'Delivery Gate'}">
          🏁
        </div>
        <div class="marker-label-badge">${typeof t === 'function' ? t('lblWarehouse') : 'Mandi'}</div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    this.dropMarker = L.marker(endPoint, { icon: dropIcon }).addTo(this.map);
    this.dropMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 0.85rem; padding: 2px;">
        <strong style="color: #dc2626;">🏁 ${typeof t === 'function' ? t('lblDropPin') : 'Mandi / Warehouse Destination'}</strong><br/>
        <span style="color: #64748b; font-size: 0.75rem;">${booking.deliveryLocation}</span>
      </div>
    `);

    // 3. Polylines: Traveled (Solid Green) & Remaining (Dashed Blue)
    const allCoords = route.map(p => [p.lat, p.lng]);
    const traveledCoords = allCoords.slice(0, targetIdx + 1);
    const remainingCoords = allCoords.slice(targetIdx);

    this.traveledPolyline = L.polyline(traveledCoords, {
      color: '#16a34a',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(this.map);

    this.remainingPolyline = L.polyline(remainingCoords, {
      color: '#2563eb',
      weight: 5,
      dashArray: '8, 10',
      opacity: 0.75,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(this.map);

    // 4. Moving Vehicle Marker with Swiggy-style Pulsing Radar Wave
    const isGigVehicle = booking.vehicleType && (booking.vehicleType.toLowerCase().includes('scooter') || booking.vehicleType.toLowerCase().includes('bike'));
    const vehicleIconHtml = isGigVehicle ? '🛵' : '🚛';

    const vehicleIcon = L.divIcon({
      className: 'rider-marker-container',
      html: `
        <div class="rider-marker-wrapper">
          <div class="rider-radar-wave"></div>
          <div class="rider-avatar-icon" id="live-moving-rider-icon">
            ${vehicleIconHtml}
          </div>
          <div class="marker-label-badge" style="background: #2563eb;">
            ${booking.driverName ? booking.driverName.split(' ')[0] : 'Driver'} · ${stage.speed > 0 ? stage.speed + ' km/h' : 'At Gate'}
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    this.vehicleMarker = L.marker([vehiclePos.lat, vehiclePos.lng], {
      icon: vehicleIcon,
      zIndexOffset: 1000
    }).addTo(this.map);

    this.vehicleMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 0.85rem;">
        <strong style="color: #2563eb;">${vehicleIconHtml} ${booking.driverName}</strong><br/>
        <span style="font-size: 0.75rem; color: #475569;">${booking.vehicleType} · ${booking.regNumber}</span><br/>
        <span style="font-size: 0.75rem; color: #16a34a; font-weight: 700;">● ${booking.status}</span>
      </div>
    `);

    // Fit map bounds to show route
    const bounds = L.latLngBounds(allCoords);
    this.map.fitBounds(bounds, { padding: [55, 55] });

    // Invalidate size once modal animation completes
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 280);

    // Start gentle live motion simulation along road
    this.startGentleRoadMotion(route, targetIdx, stage.speed);
  },

  /**
   * Gentle continuous animation that glides the vehicle subtly on road
   */
  startGentleRoadMotion: function(route, currentIdx, speed) {
    if (speed === 0 || currentIdx >= route.length - 1) return;

    let subProgress = 0;
    const startPt = route[currentIdx];
    const nextPt = route[Math.min(currentIdx + 1, route.length - 1)];

    this.liveMotionInterval = setInterval(() => {
      subProgress += 0.04;
      if (subProgress > 0.95) subProgress = 0.05;

      const currentLat = startPt.lat + (nextPt.lat - startPt.lat) * subProgress;
      const currentLng = startPt.lng + (nextPt.lng - startPt.lng) * subProgress;

      if (this.vehicleMarker) {
        this.vehicleMarker.setLatLng([currentLat, currentLng]);
      }
    }, 180);
  },

  /**
   * Update vehicle position and road polylines when trip milestone advances
   */
  updateVehiclePosition: function(booking) {
    this.activeBooking = booking;
    const route = this.getRouteForBooking(booking);
    const stage = this.stages[booking.statusStep] || this.stages[0];
    const totalWaypoints = route.length;
    const targetIdx = Math.min(Math.round((totalWaypoints - 1) * stage.routeRatio), totalWaypoints - 1);
    const vehiclePos = route[targetIdx];

    if (this.liveMotionInterval) {
      clearInterval(this.liveMotionInterval);
      this.liveMotionInterval = null;
    }

    if (this.map && this.vehicleMarker) {
      this.vehicleMarker.setLatLng([vehiclePos.lat, vehiclePos.lng]);

      // Update polylines
      const allCoords = route.map(p => [p.lat, p.lng]);
      const traveledCoords = allCoords.slice(0, targetIdx + 1);
      const remainingCoords = allCoords.slice(targetIdx);

      if (this.traveledPolyline) this.traveledPolyline.setLatLngs(traveledCoords);
      if (this.remainingPolyline) this.remainingPolyline.setLatLngs(remainingCoords);

      // Pan smoothly to vehicle
      this.map.panTo([vehiclePos.lat, vehiclePos.lng], { animate: true, duration: 0.8 });

      this.startGentleRoadMotion(route, targetIdx, stage.speed);
    } else {
      // Re-render offline map with new step
      const container = document.getElementById('live-map-canvas');
      if (container) this.renderOfflineSvgMap(container, booking, route);
    }

    this.updateTelematicsHUD(booking);
  },

  /**
   * Update the live HUD overlay chips (speed, remaining distance, ETA)
   */
  updateTelematicsHUD: function(booking) {
    const stage = this.stages[booking.statusStep] || this.stages[0];
    const totalDist = booking.distanceKm || 85;
    const remainingDist = Math.max(0, Math.round(totalDist * (1 - stage.routeRatio) * 10) / 10);

    const speedEl = document.getElementById('track-live-speed');
    const distEl = document.getElementById('track-live-dist');
    const etaEl = document.getElementById('track-live-eta');

    if (speedEl) {
      speedEl.textContent = `${stage.speed} km/h`;
    }
    if (distEl) {
      distEl.textContent = `${remainingDist} km`;
    }
    if (etaEl) {
      etaEl.textContent = stage.eta;
    }
  },

  /**
   * Center map on vehicle (Swiggy "Recenter" button)
   */
  recenterOnVehicle: function() {
    if (!this.map || !this.vehicleMarker) return;
    const latLng = this.vehicleMarker.getLatLng();
    this.map.setView(latLng, 14, { animate: true });
  },

  /**
   * Fit full route inside map view
   */
  fitFullRoute: function() {
    if (!this.map || !this.currentRoute || this.currentRoute.length === 0) return;
    const allCoords = this.currentRoute.map(p => [p.lat, p.lng]);
    const bounds = L.latLngBounds(allCoords);
    this.map.fitBounds(bounds, { padding: [50, 50], animate: true });
  },

  /**
   * Offline interactive SVG vector map fallback (zero-CDN guarantee)
   */
  renderOfflineSvgMap: function(container, booking, route) {
    const stage = this.stages[booking.statusStep] || this.stages[0];
    const percent = Math.min(100, Math.max(8, stage.routeRatio * 100));

    container.innerHTML = `
      <div class="offline-map-fallback">
        <svg viewBox="0 0 800 320" style="width: 100%; height: 100%; background: #eef2f6;">
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#16a34a" />
              <stop offset="${percent}%" stop-color="#16a34a" />
              <stop offset="${percent}%" stop-color="#94a3b8" />
              <stop offset="100%" stop-color="#cbd5e1" />
            </linearGradient>
          </defs>
          
          <!-- Background Grid & Terrain -->
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
          </pattern>
          <rect width="800" height="320" fill="url(#gridPattern)" />

          <!-- Authentic Curved Highway/Street Path -->
          <path id="svgRoadPath" d="M 80 180 C 220 70, 360 260, 500 130 S 680 220, 720 140" fill="none" stroke="url(#roadGradient)" stroke-width="8" stroke-linecap="round" />
          <path d="M 80 180 C 220 70, 360 260, 500 130 S 680 220, 720 140" fill="none" stroke="#ffffff" stroke-dasharray="8 8" stroke-width="2" />

          <!-- Start Pin -->
          <circle cx="80" cy="180" r="14" fill="#16a34a" stroke="#ffffff" stroke-width="3" />
          <text x="80" y="185" text-anchor="middle" font-size="12" fill="#fff" font-weight="bold">🌱</text>
          <text x="80" y="215" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="bold">${booking.pickupLocation}</text>

          <!-- Destination Pin -->
          <circle cx="720" cy="140" r="14" fill="#dc2626" stroke="#ffffff" stroke-width="3" />
          <text x="720" y="145" text-anchor="middle" font-size="12" fill="#fff" font-weight="bold">🏁</text>
          <text x="720" y="175" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="bold">${booking.deliveryLocation}</text>

          <!-- Animated Moving Vehicle Node -->
          <g style="transform: translate(${80 + (640 * (percent / 100))}px, ${180 - (40 * Math.sin((percent / 100) * Math.PI))}px); transition: transform 0.8s ease;">
            <circle cx="0" cy="0" r="22" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" stroke-width="2">
              <animate attributeName="r" values="18;30;18" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#2563eb" stroke-width="2.5" />
            <text x="0" y="5" text-anchor="middle" font-size="14">${booking.vehicleType && booking.vehicleType.toLowerCase().includes('scooter') ? '🛵' : '🚛'}</text>
            <rect x="-35" y="22" width="70" height="18" rx="4" fill="#0f172a" />
            <text x="0" y="34" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">${stage.speed} km/h</text>
          </g>
        </svg>
      </div>
    `;
  },

  /**
   * Advance tracking status of a shipment
   */
  advanceStep: function(trackingId) {
    const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
    if (!booking) return null;

    if (booking.statusStep < this.stages.length - 1) {
      booking.statusStep += 1;
      booking.status = this.stages[booking.statusStep].title;
    }

    if (booking.statusStep === 6) {
      booking.pod.verified = true;
      booking.pod.signatureDate = new Date().toLocaleString();
    }

    return booking;
  },

  /**
   * Generate an OTP for Proof of Delivery
   */
  generateOTP: function() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  /**
   * Verify POD with OTP
   */
  verifyPOD: function(trackingId, enteredOtp, receiverName, condition) {
    const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
    if (!booking) return { success: false, message: 'Booking not found' };

    if (booking.pod.otp === enteredOtp) {
      booking.pod.verified = true;
      booking.pod.receiverName = receiverName || booking.pod.receiverName;
      booking.pod.conditionAtArrival = condition || 'Good';
      booking.pod.signatureDate = new Date().toLocaleString();
      booking.status = 'Delivered';
      booking.statusStep = 6;
      return { success: true, message: 'Proof of Delivery verified successfully!' };
    } else {
      return { success: false, message: 'Invalid OTP! Please verify with receiver.' };
    }
  }
};

/**
 * Global bridge functions for HTML controls
 */
function recenterLiveMap() {
  LogisticsTracking.recenterOnVehicle();
}

function fitFullRouteBounds() {
  LogisticsTracking.fitFullRoute();
}

if (typeof module !== 'undefined') {
  module.exports = LogisticsTracking;
}

