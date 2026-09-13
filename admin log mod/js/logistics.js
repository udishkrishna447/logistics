/**
 * AgriNex Logistics Module - Main Application Controller
 * Enhanced with User-Friendly Features:
 * - Floating Toast Notifications (replaces browser alert)
 * - 1-Click Sample Data Preset Auto-fillers
 * - Live Search & Filter Chips
 * - HTML5 Interactive Signature Pad
 * - Multi-Language Switcher (English, हिन्दी, தமிழ்)
 * - WhatsApp Tracking Link Sharing
 * - Dynamic Moving Truck on Map
 * - Rural IVR / Helpline Assistant
 */

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });
}

let currentShipmentFilter = 'all';
let currentSearchQuery = '';

function initApp() {
  if (typeof setAppLanguage === 'function') {
    setAppLanguage(currentAppLang || 'en');
  } else {
    renderStats();
    renderBookings();
    renderTransporters();
    renderStorageFacilities();
    renderIdlePartners();
  }
  setupRoleSwitcher();
  setupPickupForm();
  setupLiveCostEstimator();
  setupSignaturePad();
}

// ----------------------------------------------------
// 1. TOAST NOTIFICATION ENGINE
// ----------------------------------------------------
function showToast(type, title, message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    warning: '⚠️',
    danger: '❌',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px) scale(0.95)';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

// ----------------------------------------------------
// 2. STATS RENDERING
// ----------------------------------------------------
function renderStats() {
  const activeTrips = LOGISTICS_DATA.bookings.filter(b => b.status !== 'Delivered').length;
  const deliveredTrips = LOGISTICS_DATA.bookings.filter(b => b.status === 'Delivered').length;
  const totalFleet = LOGISTICS_DATA.transporters.length;

  const elActive = document.getElementById('stat-active-shipments');
  const elDelivered = document.getElementById('stat-delivered-count');
  const elFleet = document.getElementById('stat-fleet-count');
  const elStorage = document.getElementById('stat-storage-avail');

  if (elActive) elActive.textContent = activeTrips;
  if (elDelivered) elDelivered.textContent = deliveredTrips;
  if (elFleet) elFleet.textContent = totalFleet;
  if (elStorage) elStorage.textContent = '1,270 Tons';
}

// ----------------------------------------------------
// 3. FILTERING & ACTIVE SHIPMENTS LIST
// ----------------------------------------------------
function setShipmentFilter(filterType) {
  currentShipmentFilter = filterType;
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-filter') === filterType);
  });
  renderBookings();
}

function handleShipmentSearch(query) {
  currentSearchQuery = query.toLowerCase().trim();
  renderBookings();
}

function renderBookings() {
  const container = document.getElementById('shipments-table-body');
  if (!container) return;

  let filtered = LOGISTICS_DATA.bookings;

  // Filter by status tab
  if (currentShipmentFilter === 'transit') {
    filtered = filtered.filter(b => b.status !== 'Delivered');
  } else if (currentShipmentFilter === 'delivered') {
    filtered = filtered.filter(b => b.status === 'Delivered');
  } else if (currentShipmentFilter === 'issues') {
    filtered = filtered.filter(b => b.complaint !== null);
  }

  // Filter by search term
  if (currentSearchQuery) {
    filtered = filtered.filter(b => 
      b.trackingId.toLowerCase().includes(currentSearchQuery) ||
      b.crop.toLowerCase().includes(currentSearchQuery) ||
      b.driverName.toLowerCase().includes(currentSearchQuery) ||
      b.pickupLocation.toLowerCase().includes(currentSearchQuery) ||
      b.deliveryLocation.toLowerCase().includes(currentSearchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 36px; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
          <div style="font-weight: 700; color: var(--text-main);">${typeof t === 'function' ? t('noShipmentsTitle') : 'No matching shipments found'}</div>
          <div style="font-size: 0.82rem; margin-top: 4px;">${typeof t === 'function' ? t('noShipmentsSub') : 'Try searching for a different keyword or create a new pickup.'}</div>
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(b => {
    let statusBadgeClass = 'badge-pending';
    if (b.status === 'In Transit' || b.status === 'Vehicle Departed') statusBadgeClass = 'badge-transit';
    if (b.status === 'Delivered') statusBadgeClass = 'badge-delivered';

    const stageObj = b.statusStep !== undefined && typeof LogisticsTracking !== 'undefined' ? LogisticsTracking.stages[b.statusStep] : null;
    const localizedStatus = (stageObj && typeof t === 'function') ? t(stageObj.key) : b.status;

    return `
      <tr>
        <td>
          <div style="font-weight: 800; color: var(--text-main); font-size: 0.95rem;">${b.trackingId}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${b.lotId}</div>
        </td>
        <td>
          <div style="font-weight: 700; font-size: 0.9rem;">${b.crop}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${b.quantityTons} Tons (${b.bagsOrCrates})</div>
        </td>
        <td>
          <div style="font-size: 0.82rem; font-weight: 600;">📍 ${b.pickupLocation}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">➡️ ${b.deliveryLocation} <span style="font-weight: 700; color: var(--primary);">(${b.distanceKm} km)</span></div>
        </td>
        <td>
          <div style="font-weight: 700; font-size: 0.85rem;">${b.driverName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${b.regNumber}</div>
        </td>
        <td>
          <div style="font-weight: 800; color: var(--primary); font-size: 0.95rem;">₹${b.cost.totalCost.toLocaleString('en-IN')}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">₹${b.cost.costPerKg}/kg · ₹${b.cost.costPerQuintal}/qtl</div>
        </td>
        <td>
          <span class="badge ${statusBadgeClass}">${localizedStatus}</span>
        </td>
        <td>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="openTrackingModal('${b.trackingId}')" title="Track Live GPS">
              ${typeof t === 'function' ? t('btnTrack') : '🛰️ Track'}
            </button>
            <button class="btn btn-outline btn-sm" onclick="openInvoiceModal('${b.trackingId}')" title="View Freight Fare Breakdown">
              ${typeof t === 'function' ? t('btnFare') : '🧾 Fare'}
            </button>
            ${b.status !== 'Delivered' ? `
              <button class="btn btn-secondary btn-sm" onclick="openPODModal('${b.trackingId}')" title="Receiver OTP Confirmation">
                ${typeof t === 'function' ? t('btnPod') : '✍️ POD'}
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="openRatingModal('${b.trackingId}')" title="Rate Transporter">
                ⭐ ${b.rating ? b.rating.stars + '★' : (typeof t === 'function' ? t('btnRate') : 'Rate')}
              </button>
            `}
            <button class="btn btn-whatsapp btn-sm" onclick="shareTripOnWhatsApp('${b.trackingId}')" title="Share Tracking on WhatsApp">
              💬
            </button>
            <button class="btn btn-outline btn-sm" style="color: var(--status-danger);" onclick="openExceptionModal('${b.trackingId}')" title="Report Delay / Breakdown Issue">
              ⚠️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ----------------------------------------------------
// 4. TRANSPORTER FLEET DIRECTORY
// ----------------------------------------------------
function renderTransporters() {
  const container = document.getElementById('transporter-fleet-list');
  if (!container) return;

  container.innerHTML = LOGISTICS_DATA.transporters.map(tData => {
    return `
      <div class="vehicle-card">
        <div class="vehicle-header">
          <div class="vehicle-meta">
            <div class="vehicle-icon-box">🚛</div>
            <div>
              <div class="vehicle-type-title">${tData.vehicleType}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">${tData.name}</div>
            </div>
          </div>
          <span class="badge badge-verified">${typeof t === 'function' ? t('badgeVerified') : '✓ Verified'}</span>
        </div>

        <div class="specs-row">
          <div class="spec-item">
            <span class="spec-label">${typeof t === 'function' ? t('specRegNumber') : 'Reg Number'}</span>
            <span class="vehicle-reg-plate">${tData.regNumber}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${typeof t === 'function' ? t('specCapacity') : 'Capacity'}</span>
            <span class="spec-val">${tData.capacityTons} Tonnes</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${typeof t === 'function' ? t('specDriver') : 'Driver'}</span>
            <span class="spec-val">${tData.driverName} (★ ${tData.driverRating})</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${typeof t === 'function' ? t('specCompletedTrips') : 'Completed Trips'}</span>
            <span class="spec-val">${tData.completedTrips} Trips</span>
          </div>
        </div>

        <div class="vehicle-footer">
          <div class="price-tag-group">
            <span class="price-main">₹${tData.ratePerKm}/km</span>
            <span class="price-sub">${typeof t === 'function' ? t('rateBaseFare') : 'Base Fare'}: ₹${tData.baseFare} + ₹${tData.loadingRatePerTon}/T ${typeof t === 'function' ? t('rateLoading') : 'Loading'}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="selectTransporterForBooking('${tData.id}')">
            ${typeof t === 'function' ? t('btnSelectBook') : 'Select & Book'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------
// 5. STORAGE FACILITIES DISCOVERY
// ----------------------------------------------------
function renderStorageFacilities() {
  const container = document.getElementById('storage-facilities-list');
  if (!container) return;

  container.innerHTML = LOGISTICS_DATA.storageFacilities.map(s => {
    return `
      <div class="storage-card">
        <div>
          <div style="font-weight: 700; font-size: 1rem; color: var(--text-main);">${s.name}</div>
          <div style="font-size: 0.8rem; color: var(--cold-cyan); font-weight: 600; margin-top: 2px;">${s.type} · ${s.tempRange}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">📍 ${s.location}</div>
          <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600; margin-top: 4px;">✓ ${s.accreditation}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">₹${s.monthlyChargePerTon} <span style="font-size: 0.75rem; font-weight: normal; color: var(--text-muted);">${typeof t === 'function' ? t('perTonMonth') : '/ ton / mo'}</span></div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">${typeof t === 'function' ? t('availText') : 'Avail'}: <strong>${s.availableCapacityTons} T</strong> / ${s.totalCapacityTons} T</div>
          <button class="btn btn-outline btn-sm" onclick="bookStorageModal('${s.id}')">${typeof t === 'function' ? t('btnReserveSpace') : 'Reserve Space'}</button>
        </div>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------
// 6. 1-CLICK PRESET AUTO-FILL SCENARIOS
// ----------------------------------------------------
function autoFillPickupPreset(type) {
  const presets = {
    tomato: {
      crop: 'Tomatoes',
      variety: 'Roma Hybrid (Grade A)',
      quantity: 10,
      crates: '400 Plastic Crates',
      pickup: 'Village Collection Center, Erode',
      delivery: 'AgriCorp Processing Plant, Coimbatore',
      distance: 85,
      datetime: 'Tomorrow 06:00 AM - 08:00 AM',
      contact: '+91 98421 55672',
      vehicleType: 'ventilated',
      loadingHelp: true,
      notes: 'Rigid plastic crates, avoid direct sun, max 3-tier stacking'
    },
    onion: {
      crop: 'Onions',
      variety: 'Nashik Red Quality',
      quantity: 12,
      crates: '240 Mesh Gunny Bags',
      pickup: 'Bhavani FPO Aggregation Yard',
      delivery: 'APMC Wholesale Mandi, Tiruppur',
      distance: 60,
      datetime: '15 Sep, 08:00 AM',
      contact: '+91 94432 99881',
      vehicleType: 'ventilated',
      loadingHelp: true,
      notes: 'Keep well-ventilated and dry to avoid sprouting'
    },
    paddy: {
      crop: 'Paddy / Rice',
      variety: 'BPT 5204 Sona Masuri',
      quantity: 15,
      crates: '300 Sealed Gunny Bags',
      pickup: 'Perundurai Farm Hub',
      delivery: 'Central Modern Rice Mill, Erode',
      distance: 35,
      datetime: '16 Sep, 09:30 AM',
      contact: '+91 98940 77123',
      vehicleType: 'heavy',
      loadingHelp: true,
      notes: 'Waterproof tarpaulin required, strict rain protection'
    }
  };

  const p = presets[type];
  if (!p) return;

  document.getElementById('req-crop').value = p.crop;
  document.getElementById('req-crop').dispatchEvent(new Event('change'));
  document.getElementById('req-variety').value = p.variety;
  document.getElementById('req-quantity').value = p.quantity;
  document.getElementById('req-crates').value = p.crates;
  document.getElementById('req-pickup-loc').value = p.pickup;
  document.getElementById('req-delivery-loc').value = p.delivery;
  document.getElementById('req-distance').value = p.distance;
  document.getElementById('req-datetime').value = p.datetime;
  document.getElementById('req-contact').value = p.contact;
  document.getElementById('req-vehicle-type').value = p.vehicleType;
  document.getElementById('req-loading-help').checked = p.loadingHelp;
  document.getElementById('req-notes').value = p.notes;

  updateCalculatedFarePreview();
  showToast('info', 'Preset Loaded', `Populated ${p.quantity}T ${p.crop} sample details.`);
}

// ----------------------------------------------------
// 7. PICKUP REQUEST MODAL & LIVE COST CALCULATOR
// ----------------------------------------------------
function setupPickupForm() {
  const cropSelect = document.getElementById('req-crop');
  if (cropSelect) {
    cropSelect.addEventListener('change', (e) => {
      const crop = e.target.value;
      const rec = LOGISTICS_DATA.cropRecommendations[crop];
      const recBox = document.getElementById('crop-recommendation-box');
      if (rec && recBox) {
        recBox.style.display = 'block';
        recBox.innerHTML = `
          <div style="font-weight: 700; margin-bottom: 4px;">💡 FAO Crop Guidance for ${crop}:</div>
          <div><strong>Recommended Vehicle:</strong> ${rec.vehicleType}</div>
          <div><strong>Target Temperature:</strong> ${rec.idealTemp}</div>
          <div><strong>Packaging:</strong> ${rec.packaging}</div>
          <div style="margin-top: 4px; font-style: italic;">⚠️ ${rec.caution}</div>
        `;
      }
      updateCalculatedFarePreview();
    });
  }

  const form = document.getElementById('form-create-pickup');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      createNewPickup();
    });
  }
}

function setupLiveCostEstimator() {
  const inputs = ['req-distance', 'req-quantity', 'req-loading-help', 'req-vehicle-type'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateCalculatedFarePreview);
  });
}

function updateCalculatedFarePreview() {
  const distance = Number(document.getElementById('req-distance')?.value) || 50;
  const quantity = Number(document.getElementById('req-quantity')?.value) || 5;
  const loadingHelp = document.getElementById('req-loading-help')?.checked ?? true;
  const vehicleType = document.getElementById('req-vehicle-type')?.value || 'ventilated';

  let base = 1000;
  let perKm = 25;
  let loadingRate = loadingHelp ? 150 : 0;
  let unloadingRate = loadingHelp ? 150 : 0;
  let toll = distance > 40 ? 200 : 0;

  if (vehicleType === 'reefer') {
    base = 2500;
    perKm = 42;
  } else if (vehicleType === 'heavy') {
    base = 3000;
    perKm = 38;
  }

  const result = LogisticsCalculator.calculateFare({
    baseFare: base,
    distanceKm: distance,
    ratePerKm: perKm,
    quantityTons: quantity,
    loadingRatePerTon: loadingRate,
    unloadingRatePerTon: unloadingRate,
    tollCharge: toll,
    waitingHours: 0
  });

  const preview = document.getElementById('fare-estimation-preview');
  if (preview) {
    preview.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
        <span>Estimated Total Fare:</span>
        <strong style="color: var(--primary); font-size: 1.15rem;">₹${result.totalCost.toLocaleString('en-IN')}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
        <span>Rate per kg: <strong style="color: var(--text-main);">₹${result.costPerKg} / kg</strong></span>
        <span>Rate per quintal: <strong style="color: var(--text-main);">₹${result.costPerQuintal} / qtl</strong></span>
      </div>
      <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 6px;">
        Includes: Base (₹${base}) + Distance (₹${result.distanceCharge}) + Loading/Unloading (₹${result.loadingCharge + result.unloadingCharge}) + Toll (₹${toll})
      </div>
    `;
  }
}

function createNewPickup() {
  const crop = document.getElementById('req-crop').value;
  const variety = document.getElementById('req-variety').value || 'Standard Quality';
  const quantity = Number(document.getElementById('req-quantity').value) || 5;
  const crates = document.getElementById('req-crates').value || `${quantity * 40} Units`;
  const pickup = document.getElementById('req-pickup-loc').value || 'Local Farmgate';
  const delivery = document.getElementById('req-delivery-loc').value || 'APMC Mandi';
  const distance = Number(document.getElementById('req-distance').value) || 50;
  const datetime = document.getElementById('req-datetime').value || 'Tomorrow 07:00 AM';
  const contact = document.getElementById('req-contact').value || '+91 98400 12345';
  const notes = document.getElementById('req-notes').value || 'Handle with care';

  const randomTrp = LOGISTICS_DATA.transporters[0];

  const fareBreakdown = LogisticsCalculator.calculateFare({
    baseFare: randomTrp.baseFare,
    distanceKm: distance,
    ratePerKm: randomTrp.ratePerKm,
    quantityTons: quantity,
    loadingRatePerTon: randomTrp.loadingRatePerTon,
    unloadingRatePerTon: randomTrp.unloadingRatePerTon,
    tollCharge: distance > 40 ? 220 : 0,
    waitingHours: 0
  });

  const newBooking = {
    trackingId: 'AGX-TRK-' + Math.floor(1000 + Math.random() * 9000),
    lotId: 'LOT-' + crop.slice(0, 3).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900),
    farmerName: 'Udish Krishna (Farmgate)',
    crop,
    variety,
    quantityTons: quantity,
    bagsOrCrates: crates,
    pickupLocation: pickup,
    deliveryLocation: delivery,
    distanceKm: distance,
    pickupDate: datetime,
    vehicleType: randomTrp.vehicleType,
    regNumber: randomTrp.regNumber,
    driverName: randomTrp.driverName,
    driverPhone: randomTrp.driverPhone,
    transporterName: randomTrp.name,
    status: 'Vehicle Assigned',
    statusStep: 1,
    cost: fareBreakdown,
    qualityRequirement: notes,
    pod: {
      otp: LogisticsTracking.generateOTP(),
      verified: false,
      receiverName: 'Pending Delivery',
      deliveredQuantity: quantity,
      conditionAtArrival: 'Pending Inspection',
      signatureDate: null
    },
    complaint: null,
    rating: null
  };

  LOGISTICS_DATA.bookings.unshift(newBooking);
  renderBookings();
  renderStats();
  closeModal('modal-create-pickup');

  showToast('success', 'Pickup Booked Successfully!', `Tracking ID: ${newBooking.trackingId} · Assigned: ${randomTrp.regNumber} (${randomTrp.driverName})`);
}

function selectTransporterForBooking(transporterId) {
  const trp = LOGISTICS_DATA.transporters.find(t => t.id === transporterId);
  if (!trp) return;

  openModal('modal-create-pickup');
  const cropSelect = document.getElementById('req-crop');
  if (cropSelect && !cropSelect.value) {
    cropSelect.value = 'Tomatoes';
    cropSelect.dispatchEvent(new Event('change'));
  }
}

// ----------------------------------------------------
// 8. LIVE TRACKING MODAL & DYNAMIC TRUCK MOVEMENT
// ----------------------------------------------------
let activeTrackingId = null;

function openTrackingModal(trackingId) {
  activeTrackingId = trackingId;
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
  if (!booking) return;

  document.getElementById('track-modal-title').textContent = `Live Tracking: ${booking.trackingId}`;
  document.getElementById('track-crop-title').textContent = `${booking.crop} (${booking.quantityTons} Tons) · ${booking.bagsOrCrates}`;
  document.getElementById('track-route-desc').textContent = `${booking.pickupLocation} ➔ ${booking.deliveryLocation}`;
  document.getElementById('track-driver-name').textContent = booking.driverName;
  document.getElementById('track-driver-phone').textContent = booking.driverPhone;
  document.getElementById('track-driver-phone').setAttribute('href', `tel:${booking.driverPhone.replace(/\s+/g, '')}`);
  document.getElementById('track-vehicle-reg').textContent = booking.regNumber;
  document.getElementById('track-vehicle-type').textContent = booking.vehicleType;
  document.getElementById('track-current-status').textContent = booking.status;

  renderTrackingTimeline(booking);
  openModal('modal-live-tracking');

  // Trigger Google Maps / Swiggy-style real GPS map rendering
  if (typeof LogisticsTracking !== 'undefined' && typeof LogisticsTracking.renderLiveMap === 'function') {
    setTimeout(() => {
      LogisticsTracking.renderLiveMap(booking);
    }, 150);
  }
}

function renderTrackingTimeline(booking) {
  const container = document.getElementById('tracking-stepper');
  if (!container) return;

  container.innerHTML = LogisticsTracking.stages.map((st, idx) => {
    let stateClass = '';
    if (idx < booking.statusStep) stateClass = 'completed';
    else if (idx === booking.statusStep) stateClass = 'active';

    const stageTitle = typeof t === 'function' && st.key ? t(st.key) : st.title;

    return `
      <div class="timeline-step ${stateClass}">
        <div class="step-node">${idx < booking.statusStep ? '✓' : (idx + 1)}</div>
        <div class="step-label">${stageTitle}</div>
      </div>
    `;
  }).join('');

  const stage = LogisticsTracking.stages[booking.statusStep] || LogisticsTracking.stages[0];
  const etaEl = document.getElementById('track-eta-display');
  if (etaEl && stage) {
    etaEl.textContent = `ETA: ${stage.eta}`;
  }
}

function advanceActiveTripSimulation() {
  if (!activeTrackingId) return;
  const updated = LogisticsTracking.advanceStep(activeTrackingId);
  if (updated) {
    document.getElementById('track-current-status').textContent = updated.status;
    renderTrackingTimeline(updated);

    // Update real GPS vehicle marker and road polylines
    if (typeof LogisticsTracking !== 'undefined' && typeof LogisticsTracking.updateVehiclePosition === 'function') {
      LogisticsTracking.updateVehiclePosition(updated);
    }

    renderBookings();
    renderStats();
    showToast('info', 'Milestone Advanced', `Shipment status updated to: ${updated.status}`);
  }
}

// ----------------------------------------------------
// 9. DIGITAL PROOF OF DELIVERY (POD) & SIGNATURE PAD
// ----------------------------------------------------
let activePodId = null;
let signatureCanvas, signatureCtx;
let isDrawing = false;

function setupSignaturePad() {
  signatureCanvas = document.getElementById('pod-signature-canvas');
  if (!signatureCanvas) return;
  signatureCtx = signatureCanvas.getContext('2d');

  signatureCanvas.width = 500;
  signatureCanvas.height = 120;
  signatureCtx.strokeStyle = '#0f172a';
  signatureCtx.lineWidth = 2.5;
  signatureCtx.lineCap = 'round';

  const getPos = (e) => {
    const rect = signatureCanvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDraw = (e) => {
    isDrawing = true;
    const pos = getPos(e);
    signatureCtx.beginPath();
    signatureCtx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    signatureCtx.lineTo(pos.x, pos.y);
    signatureCtx.stroke();
    if (e.touches) e.preventDefault();
  };

  const stopDraw = () => { isDrawing = false; };

  signatureCanvas.addEventListener('mousedown', startDraw);
  signatureCanvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDraw);

  signatureCanvas.addEventListener('touchstart', startDraw);
  signatureCanvas.addEventListener('touchmove', draw);
  window.addEventListener('touchend', stopDraw);
}

function clearSignature() {
  if (signatureCanvas && signatureCtx) {
    signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    showToast('info', 'Signature Cleared', 'You can sign again.');
  }
}

function openPODModal(trackingId) {
  activePodId = trackingId;
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
  if (!booking) return;

  document.getElementById('pod-modal-tracking-id').textContent = booking.trackingId;
  document.getElementById('pod-modal-otp-display').textContent = booking.pod.otp;
  document.getElementById('pod-receiver-name').value = booking.pod.receiverName === 'Pending Delivery' ? '' : booking.pod.receiverName;
  document.getElementById('pod-delivered-qty').value = booking.quantityTons;

  clearSignature();
  openModal('modal-pod-verification');
}

function submitPODVerification() {
  if (!activePodId) return;
  const enteredOtp = document.getElementById('pod-otp-input').value.trim();
  const receiverName = document.getElementById('pod-receiver-name').value.trim();
  const condition = document.getElementById('pod-condition').value;

  const result = LogisticsTracking.verifyPOD(activePodId, enteredOtp, receiverName, condition);

  if (result.success) {
    showToast('success', 'Proof of Delivery Verified!', 'Escrow released and final tax invoice unlocked.');
    closeModal('modal-pod-verification');
    renderBookings();
    renderStats();
  } else {
    showToast('danger', 'Verification Failed', result.message);
  }
}

// ----------------------------------------------------
// 10. ITEMISED INVOICE & FARE SLIP
// ----------------------------------------------------
function openInvoiceModal(trackingId) {
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
  if (!booking) return;

  const c = booking.cost;
  document.getElementById('inv-tracking-id').textContent = booking.trackingId;
  document.getElementById('inv-lot-id').textContent = booking.lotId;
  document.getElementById('inv-date').textContent = booking.pickupDate;
  document.getElementById('inv-transporter').textContent = booking.transporterName;
  document.getElementById('inv-vehicle').textContent = `${booking.vehicleType} (${booking.regNumber})`;
  document.getElementById('inv-distance').textContent = `${booking.distanceKm} km`;
  document.getElementById('inv-quantity').textContent = `${booking.quantityTons} Tonnes`;

  document.getElementById('inv-base-fare').textContent = `₹${c.baseFare.toLocaleString('en-IN')}`;
  document.getElementById('inv-distance-charge').textContent = `₹${c.distanceCharge.toLocaleString('en-IN')}`;
  document.getElementById('inv-loading-charge').textContent = `₹${c.loadingCharge.toLocaleString('en-IN')}`;
  document.getElementById('inv-unloading-charge').textContent = `₹${c.unloadingCharge.toLocaleString('en-IN')}`;
  document.getElementById('inv-toll-charge').textContent = `₹${c.tollCharge.toLocaleString('en-IN')}`;
  document.getElementById('inv-waiting-charge').textContent = `₹${c.waitingCharge.toLocaleString('en-IN')}`;
  document.getElementById('inv-total-fare').textContent = `₹${c.totalCost.toLocaleString('en-IN')}`;

  document.getElementById('inv-per-kg').textContent = `₹${c.costPerKg} / kg`;
  document.getElementById('inv-per-qtl').textContent = `₹${c.costPerQuintal} / quintal`;

  const statusEl = document.getElementById('inv-settlement-status');
  if (booking.status === 'Delivered') {
    statusEl.innerHTML = `<span class="badge badge-delivered">Paid & Settled (Escrow Released)</span>`;
  } else {
    statusEl.innerHTML = `<span class="badge badge-pending">Escrow Locked · Pending Delivery</span>`;
  }

  openModal('modal-invoice-detail');
}

// ----------------------------------------------------
// 11. EXCEPTION & DELAY RESOLUTION
// ----------------------------------------------------
let activeExceptionId = null;

function openExceptionModal(trackingId) {
  activeExceptionId = trackingId;
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
  if (!booking) return;

  document.getElementById('exc-tracking-id').textContent = booking.trackingId;
  document.getElementById('exc-driver-info').textContent = `${booking.driverName} (${booking.driverPhone})`;
  openModal('modal-exception-report');
}

function submitExceptionReport() {
  if (!activeExceptionId) return;
  const reason = document.getElementById('exc-reason').value;
  const details = document.getElementById('exc-details').value;
  const reqReplacement = document.getElementById('exc-req-replacement').checked;

  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === activeExceptionId);
  if (booking) {
    booking.complaint = {
      timestamp: new Date().toLocaleString(),
      reason,
      details,
      requestedReplacement: reqReplacement,
      status: 'Under Administrative Investigation'
    };
  }

  showToast('warning', 'Exception Logged', `Incident escalated to FPO & Admin. Replacement requested: ${reqReplacement ? 'Yes' : 'No'}.`);
  closeModal('modal-exception-report');
  renderBookings();
}

// ----------------------------------------------------
// 12. RATINGS & REVIEWS
// ----------------------------------------------------
let activeRatingId = null;
let currentSelectedStars = 5;

function openRatingModal(trackingId) {
  activeRatingId = trackingId;
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
  if (!booking) return;

  document.getElementById('rating-driver-name').textContent = booking.driverName;
  document.getElementById('rating-vehicle').textContent = `${booking.vehicleType} · ${booking.regNumber}`;

  setStars(booking.rating ? booking.rating.stars : 5);
  openModal('modal-trip-rating');
}

function setStars(count) {
  currentSelectedStars = count;
  const starEls = document.querySelectorAll('#star-container .star');
  starEls.forEach((st, idx) => {
    if (idx < count) st.classList.add('filled');
    else st.classList.remove('filled');
  });
}

function submitTripRating() {
  if (!activeRatingId) return;
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === activeRatingId);
  if (booking) {
    const feedback = document.getElementById('rating-feedback').value;
    booking.rating = {
      stars: currentSelectedStars,
      review: feedback,
      timestamp: new Date().toLocaleString()
    };
  }

  showToast('success', 'Rating Submitted', `${currentSelectedStars} Stars recorded for trip.`);
  closeModal('modal-trip-rating');
  renderBookings();
}

// ----------------------------------------------------
// 13. WHATSAPP TRACKING SHARE
// ----------------------------------------------------
function shareTripOnWhatsApp(trackingId) {
  const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === trackingId);
  if (!booking) return;

  const msg = `🚚 *AgriNex Shipment Update*%0A` +
              `*Trip ID:* ${booking.trackingId}%0A` +
              `*Produce:* ${booking.crop} (${booking.quantityTons} Tons)%0A` +
              `*Route:* ${booking.pickupLocation} ➔ ${booking.deliveryLocation}%0A` +
              `*Driver:* ${booking.driverName} (${booking.driverPhone})%0A` +
              `*Vehicle:* ${booking.regNumber}%0A` +
              `*Status:* ${booking.status}%0A` +
              `*Receiver OTP:* ${booking.pod.otp}%0A` +
              `*Track Online:* Open AgriNex Logistics Desk`;

  const url = `https://api.whatsapp.com/send?text=${msg}`;
  window.open(url, '_blank');
  showToast('success', 'WhatsApp Share', 'Generated live tracking message for WhatsApp!');
}

// ----------------------------------------------------
// 14. MULTI-LANGUAGE SWITCHER (EN / HI / TA)
// ----------------------------------------------------
function setLanguage(lang) {
  if (typeof setAppLanguage === 'function') {
    setAppLanguage(lang);
  }
}

// ----------------------------------------------------
// 15. ROLE SWITCHER
// ----------------------------------------------------
function setupRoleSwitcher() {
  const roleButtons = document.querySelectorAll('.role-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedRole = btn.getAttribute('data-role');
      applyRoleView(selectedRole);
    });
  });
}

function applyRoleView(role) {
  LOGISTICS_DATA.currentRole = role;
  const banner = document.getElementById('role-context-banner');
  const sharedLoadCard = document.getElementById('shared-load-pooling-card');

  if (!banner) return;

  if (role === 'farmer') {
    banner.innerHTML = typeof t === 'function' ? t('bannerFarmer') : `👤 <strong>Farmer View:</strong> Book individual farmgate pickups, review per-kg transport fares, track live location, and inspect proof-of-delivery receipts.`;
    if (sharedLoadCard) sharedLoadCard.style.display = 'none';
  } else if (role === 'fpo') {
    banner.innerHTML = typeof t === 'function' ? t('bannerFpo') : `🏢 <strong>FPO Desk:</strong> Combine multiple nearby farmer lots, plan village collection routes, optimize vehicle capacity, and divide shared costs proportionally.`;
    if (sharedLoadCard) sharedLoadCard.style.display = 'block';
  } else if (role === 'buyer') {
    banner.innerHTML = typeof t === 'function' ? t('bannerBuyer') : `🏭 <strong>Processor & Buyer View:</strong> Track incoming crop deliveries, verify delivery condition, and sign digital Proof-of-Delivery (POD).`;
    if (sharedLoadCard) sharedLoadCard.style.display = 'none';
  } else if (role === 'transporter') {
    banner.innerHTML = typeof t === 'function' ? t('bannerTransporter') : `🚚 <strong>Transporter Fleet View:</strong> View trip dispatches, update milestone statuses, and review completed trip payouts.`;
    if (sharedLoadCard) sharedLoadCard.style.display = 'none';
  } else if (role === 'admin') {
    banner.innerHTML = typeof t === 'function' ? t('bannerAdmin') : `🛡️ <strong>Admin Supervision:</strong> Oversee provider verification, monitor delays, handle exceptions, and resolve disputes.`;
    if (sharedLoadCard) sharedLoadCard.style.display = 'none';
  }
}

// ----------------------------------------------------
// 16. STORAGE & HELPLINE MODALS
// ----------------------------------------------------
function bookStorageModal(storageId) {
  const facility = LOGISTICS_DATA.storageFacilities.find(s => s.id === storageId);
  if (!facility) return;
  showToast('info', 'Storage Space Reserved', `Reservation request placed for ${facility.name}. Contact: ${facility.contact}`);
}

function openHelplineModal() {
  openModal('modal-rural-helpline');
}

// ----------------------------------------------------
// MODAL HELPERS
// ----------------------------------------------------
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

// ----------------------------------------------------
// 17. SWIGGY / ZOMATO IDLE GIG PARTNER CONTROLLER
// ----------------------------------------------------
function renderIdlePartners() {
  const container = document.getElementById('idle-partners-list');
  if (!container) return;

  container.innerHTML = LOGISTICS_DATA.idlePartners.map(p => {
    return `
      <div class="gig-partner-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div>
            <span class="badge" style="background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; font-size: 0.72rem; margin-bottom: 6px;">
              ${p.platformBadge}
            </span>
            <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">${p.partnerName}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">${p.vehicle} · <span style="font-family: monospace; font-weight: 700;">${p.regNumber}</span></div>
          </div>
          <span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;">
            ${p.idleDiscount}
          </span>
        </div>

        <div style="display: flex; gap: 14px; margin: 10px 0; font-size: 0.82rem; background: #f8fafc; padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-default);">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">📍 ${typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'இடம்' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'स्थान' : 'LOCATION')}</div>
            <div style="font-weight: 700;">${p.currentLoc} (${p.distanceKm} km ${typeof t === 'function' ? t('lblNearbyAway') : 'away'})</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">⏱️ ${typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'நேரம்' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'समय' : 'ETA')}</div>
            <div style="font-weight: 700; color: var(--primary);">${p.etaMinutes} mins</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">⭐ ${typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'மதிப்பீடு' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'रेटिंग' : 'RATING')}</div>
            <div style="font-weight: 700;">★ ${p.rating} (${p.completedGigs} gigs)</div>
          </div>
        </div>

        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">
          <strong>${typeof t === 'function' ? t('lblBestFor') : 'Best For:'}</strong> ${p.bestFor}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-default); padding-top: 10px;">
          <div>
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary);">${p.fareRate}</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">${typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'ஓய்வு நேர தள்ளுபடி கட்டணம்' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'खाली समय की रियायती दर' : 'Zero food order downtime fare')}</small>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="openInstantGigBookingModal('${p.id}')">
            ${typeof t === 'function' ? t('btnBookInstantGig') : '⚡ Book Instant Gig'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

let activeBookingGigId = null;

function openInstantGigBookingModal(gigId) {
  activeBookingGigId = gigId;
  const partner = LOGISTICS_DATA.idlePartners.find(p => p.id === gigId);
  if (!partner) return;

  document.getElementById('gig-modal-partner-name').textContent = `${partner.partnerName} (${partner.vehicle})`;
  document.getElementById('gig-modal-discount').textContent = partner.idleDiscount;
  document.getElementById('gig-modal-fare').textContent = partner.fareRate;
  document.getElementById('gig-modal-eta').textContent = `${partner.etaMinutes} mins (${partner.distanceKm} km away)`;

  openModal('modal-instant-gig');
}

function confirmInstantGigBooking() {
  if (!activeBookingGigId) return;
  const partner = LOGISTICS_DATA.idlePartners.find(p => p.id === activeBookingGigId);
  if (!partner) return;

  const crop = document.getElementById('gig-req-crop').value || 'Fresh Produce';
  const qty = document.getElementById('gig-req-qty').value || '100 kg';
  const drop = document.getElementById('gig-req-drop').value || 'Local Mandi / Market';

  const newBooking = {
    trackingId: 'GIG-' + Math.floor(1000 + Math.random() * 9000),
    lotId: 'QUICK-GIG-' + Math.floor(100 + Math.random() * 900),
    farmerName: 'Udish Krishna (Express Micro-Pickup)',
    crop: `${crop} (Quick-Gig)`,
    variety: 'Hyperlocal Fresh Run',
    quantityTons: 0.2,
    bagsOrCrates: qty,
    pickupLocation: 'Farmgate Collection Point',
    deliveryLocation: drop,
    distanceKm: partner.distanceKm,
    pickupDate: 'Immediate (Driver arriving in ' + partner.etaMinutes + ' mins)',
    vehicleType: partner.vehicle,
    regNumber: partner.regNumber,
    driverName: partner.partnerName,
    driverPhone: partner.phone,
    transporterName: partner.platformBadge,
    status: 'Vehicle Arrived',
    statusStep: 2,
    cost: {
      baseFare: 79,
      distanceCharge: 50,
      loadingCharge: 0,
      unloadingCharge: 0,
      tollCharge: 0,
      waitingCharge: 0,
      totalCost: 129,
      costPerKg: 1.29,
      costPerQuintal: 129
    },
    qualityRequirement: 'Immediate express micro-delivery during driver downtime',
    pod: {
      otp: LogisticsTracking.generateOTP(),
      verified: false,
      receiverName: 'Pending Delivery',
      deliveredQuantity: 0.2,
      conditionAtArrival: 'Fresh',
      signatureDate: null
    },
    complaint: null,
    rating: null
  };

  LOGISTICS_DATA.bookings.unshift(newBooking);
  renderBookings();
  renderStats();
  closeModal('modal-instant-gig');

  showToast('success', '⚡ Gig Partner Dispatched!', `${partner.partnerName} (${partner.platformBadge}) is on the way! ETA: ${partner.etaMinutes} mins.`);
}

function toggleDriverOnlineStatus() {
  LOGISTICS_DATA.driverOnlineForGigs = !LOGISTICS_DATA.driverOnlineForGigs;
  const isOnline = LOGISTICS_DATA.driverOnlineForGigs;

  const statusText = document.getElementById('driver-toggle-status-text');
  const toggleBtn = document.getElementById('btn-driver-toggle');

  const onlineLabel = typeof t === 'function' ? t('lblGoOnline') : '🟢 Driver Online (Receiving Farmgate Micro-Orders during food downtime)';
  const offlineLabel = typeof t === 'function' ? t('lblGoOffline') : '⚪ Driver Offline';

  if (statusText) {
    statusText.innerHTML = isOnline
      ? `<span style="color:#15803d; font-weight:700;"><span class="pulse-dot"></span> ${onlineLabel}</span>`
      : `<span style="color:#64748b; font-weight:700;">${offlineLabel}</span>`;
  }

  if (toggleBtn) {
    toggleBtn.textContent = isOnline
      ? (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'ऑफलाइन जाएं' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'ஆஃப்லைனில் செல்' : 'Go Offline'))
      : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'ऑनलाइन आएं' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'ஆன்லைனில் வா' : 'Go Online'));
    toggleBtn.className = isOnline ? 'btn btn-outline btn-sm' : 'btn btn-primary btn-sm';
  }

  showToast(
    isOnline ? 'success' : 'info',
    isOnline
      ? (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'राइडर मोड: ऑनलाइन' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'ரைடர் முறை: ஆன்லைன்' : 'Rider Mode: ONLINE'))
      : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'राइडर मोड: ऑफलाइन' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'ரைடர் முறை: ஆஃப்லைன்' : 'Rider Mode: OFFLINE')),
    isOnline
      ? (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'अब आप फूड ऑर्डर के खाली समय में नजदीकी किसानों से सीधे त्वरित डिलीवरी ऑर्डर प्राप्त कर सकते हैं!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'உணவு ஆர்டர்கள் இல்லாத நேரத்தில் அருகிலுள்ள விவசாயிகளிடமிருந்து உடனடி விளைபொருள் விநியோகங்களை நீங்கள் பெறுவீர்கள்!' : 'You will now receive instant micro-pickup requests from nearby farmers during food order downtime!'))
      : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'कृषि डिलीवरी बंद की गई। नियमित फूड डिलीवरी पर वापस।' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'விவசாய டெலிவரி நிறுத்தப்பட்டது. வழக்கமான உணவு விநியோக முறைக்கு திரும்பியது.' : 'Switched off farm delivery gigs. Returning to regular food delivery.'))
  );
}

// ----------------------------------------------------
// 18. SHARED ON-DEMAND AGRICULTURAL LOGISTICS (1.2T CLUSTER)
// ----------------------------------------------------
function dispatchClusterTrip() {
  const cluster = LOGISTICS_DATA.clusterDemo;
  const existing = LOGISTICS_DATA.bookings.find(b => b.trackingId === cluster.clusterId);
  if (existing) {
    openTrackingModal(existing.trackingId);
    showToast('info', 'Cluster Active', 'Shared 1.2T Cluster Trip is already active and running.');
    return;
  }

  const newBooking = {
    trackingId: cluster.clusterId,
    lotId: 'LOT-CLUSTER-TOM-1200',
    farmerName: 'Farmer Cluster: Ravi K. (350kg) + Selvam P. (450kg) + Murugan S. (400kg)',
    crop: `${cluster.crop} (Shared 1.2T Cluster)`,
    variety: 'Pooled Farmgate Grade A',
    quantityTons: cluster.totalTonnage,
    bagsOrCrates: '48 Crates (Pooled)',
    pickupLocation: '3-Village Multi-Stop (Thindal ➔ Villarasampatti ➔ Perundurai)',
    deliveryLocation: cluster.destination,
    distanceKm: 85,
    pickupDate: 'Immediate Multi-Stop Pickup',
    vehicleType: cluster.vehicle,
    regNumber: cluster.regNumber,
    driverName: cluster.driverName,
    driverPhone: cluster.driverPhone,
    transporterName: 'AgriNex Shared Green Logistics',
    status: 'In Transit',
    statusStep: 5,
    isCluster: true,
    cost: {
      baseFare: 600,
      distanceCharge: 750,
      loadingCharge: 150,
      unloadingCharge: 150,
      tollCharge: 0,
      waitingCharge: 0,
      totalCost: cluster.pooledCostTotal,
      costPerKg: 1.38,
      costPerQuintal: 138
    },
    qualityRequirement: 'Multi-stop cluster collection with crate partition (3 Farmers Pooled)',
    pod: {
      otp: LogisticsTracking.generateOTP(),
      verified: false,
      receiverName: 'Coimbatore APMC Mandi Receiver',
      deliveredQuantity: cluster.totalTonnage,
      conditionAtArrival: 'Fresh Farmgate Quality',
      signatureDate: null
    },
    complaint: null,
    rating: null
  };

  LOGISTICS_DATA.bookings.unshift(newBooking);
  renderBookings();
  renderStats();
  openTrackingModal(newBooking.trackingId);

  const toastTitle = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '🚀 பகிர்வு கிளஸ்டர் வாகனம் அனுப்பப்பட்டது!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '🚀 साझा क्लस्टर वाहन रवाना!' : '🚀 Shared Cluster Vehicle Dispatched!');
  const toastMsg = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '3 விவசாயிகளின் 1.2 டன் தக்காளி டாடா ஏஸ் EV-ல் ஏற்றப்பட்டது. மொத்த சேமிப்பு ₹1,950 (54%)!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '3 किसानों का 1.2 टन टमाटर टाटा ऐस EV में लोड किया गया। कुल बचत ₹1,950 (54%)!' : 'Tata Ace EV en route to 3 farmgate stops. 1.2 Tonnes pooled, saving ₹1,950 (54%)!');

  showToast('success', toastTitle, toastMsg);
}

// ----------------------------------------------------
// 19. COLD STORAGE BRANCH (PERISHABLE PRODUCE SAFEGUARD)
// ----------------------------------------------------
function simulateColdStorageReserve() {
  LOGISTICS_DATA.coldStorageState.reservationStatus = 'reserved';
  LOGISTICS_DATA.coldStorageState.reservationId = 'CS-RES-' + Math.floor(1000 + Math.random() * 9000);

  const pill = document.getElementById('cs-status-pill');
  if (pill) {
    pill.textContent = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '✅ WDRA குளிர்சாதன அறை ஒதுக்கப்பட்டது (வாழ்நாள் +21 நாட்கள்)' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '✅ कोल्ड स्टोरेज आरक्षित (+21 दिन शेल्फ-लाइफ)' : '✅ Cold Room Reserved (Shelf-Life +21 Days)');
    pill.style.background = '#f0fdf4';
    pill.style.color = '#15803d';
    pill.style.borderColor = '#bbf7d0';
  }

  const badge = document.getElementById('cs-live-feedback-badge');
  if (badge) {
    badge.className = 'badge badge-verified';
    badge.innerHTML = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '🔒 WDRA பே #B-14 ஒதுக்கப்பட்டது (21 நாட்கள் பாதுகாப்பானது · ₹15/டன்/நாள்)' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '🔒 WDRA बे #B-14 आरक्षित (21 दिनों तक सुरक्षित · ₹15/टन/दिन)' : '🔒 WDRA Cold Bay #B-14 Reserved (Safe for 21 Days · ₹15/ton/day)');
  }

  const btnReserve = document.getElementById('btn-cs-reserve');
  const btnDispatch = document.getElementById('btn-cs-dispatch');
  if (btnReserve) btnReserve.style.display = 'none';
  if (btnDispatch) btnDispatch.style.display = 'inline-block';

  const toastTitle = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '🔒 குளிர்சாதன அறை பதிவு செய்யப்பட்டது!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '🔒 कोल्ड स्टोरेज आरक्षित!' : '🔒 Cold Storage Bay Reserved!');
  const toastMsg = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '10 டன் தக்காளி ஈரோடு அக்ரோ குளிர்சாதன அறையில் 12-15°C-ல் வைக்கப்பட்டது. அவசர விற்பனை தவிர்க்கப்பட்டது!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '10 टन टमाटर 12-15°C पर सुरक्षित। 21 दिनों की शेल्फ-लाइफ बढ़ी, संकटपूर्ण बिक्री टली!' : '10T Roma Tomatoes secured at 12-15°C in Erode Agro Cold Storage. Distress sale prevented! Shelf-life +21 days.');

  showToast('success', toastTitle, toastMsg);
}

function simulateColdStorageDispatch() {
  LOGISTICS_DATA.coldStorageState.reservationStatus = 'dispatched';

  const newBooking = {
    trackingId: 'CS-DISPATCH-' + Math.floor(100 + Math.random() * 900),
    lotId: 'LOT-COLD-TOM-10T',
    farmerName: 'Udish Krishna (via Erode Agro Cold Storage)',
    crop: 'Cold Stored Roma Tomatoes',
    variety: 'Chilled Grade A (Preserved)',
    quantityTons: 10,
    bagsOrCrates: '400 Crates',
    pickupLocation: 'Erode Agro Cold Storage (Bay #B-14, Perundurai)',
    deliveryLocation: 'Nilgiris Fresh Mart Processing Plant, Mettupalayam',
    distanceKm: 65,
    pickupDate: 'Immediate Cold-to-Buyer Dispatch',
    vehicleType: 'Refrigerated 16-Ton Reefer Truck',
    regNumber: 'TN-38-RF-9921',
    driverName: 'Senthil Kumaran',
    driverPhone: '+91 94432 11984',
    transporterName: 'SnowChain Agri Refrig Logistics',
    status: 'In Transit',
    statusStep: 5,
    cost: {
      baseFare: 1500,
      distanceCharge: 2200,
      loadingCharge: 1000,
      unloadingCharge: 1000,
      tollCharge: 180,
      waitingCharge: 0,
      totalCost: 5880,
      costPerKg: 0.59,
      costPerQuintal: 58.80
    },
    qualityRequirement: 'Continuous reefer monitoring at 12°C with automated datalogger',
    pod: {
      otp: LogisticsTracking.generateOTP(),
      verified: false,
      receiverName: 'Nilgiris Fresh Mart Inward Desk',
      deliveredQuantity: 10,
      conditionAtArrival: 'Excellent Cold-Chain Condition',
      signatureDate: null
    },
    complaint: null,
    rating: null
  };

  LOGISTICS_DATA.bookings.unshift(newBooking);
  renderBookings();
  renderStats();

  const pill = document.getElementById('cs-status-pill');
  if (pill) {
    pill.textContent = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '🚚 வாங்குபவருக்கு அனுப்பப்பட்டது' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '🚚 खरीदार को रवाना' : '🚚 Dispatched to Buyer');
  }

  const badge = document.getElementById('cs-live-feedback-badge');
  if (badge) {
    badge.innerHTML = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '🤝 நீலகிரி ப்ராசசிங் பிளாண்ட் வாங்கியது · சிறந்த லாபம்' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '🤝 नीलगिरी प्रोसेसिंग प्लांट से सौदा पक्का · अच्छा मुनाफा' : '🤝 Matched with Nilgiris Processing Plant · High Value Realized');
  }

  const btnDispatch = document.getElementById('btn-cs-dispatch');
  if (btnDispatch) {
    btnDispatch.disabled = true;
    btnDispatch.textContent = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '✅ வாங்குபவருக்கு அனுப்பப்பட்டது' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '✅ खरीदार को भेजा गया' : '✅ Dispatched to Buyer');
  }

  openTrackingModal(newBooking.trackingId);

  const toastTitle = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? '🤝 வாங்குபவர் உறுதி & வண்டி புறப்பட்டது!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? '🤝 खरीदार मिला और वाहन रवाना!' : '🤝 Buyer Matched & Dispatched!');
  const toastMsg = typeof currentAppLang !== 'undefined' && currentAppLang === 'ta' ? 'குளிர்சாதன கிடங்கிலிருந்து நீலகிரி உணவு பதப்படுத்தும் ஆலைக்கு குளிரூட்டப்பட்ட வாகனம் புறப்பட்டது!' : (typeof currentAppLang !== 'undefined' && currentAppLang === 'hi' ? 'कोल्ड स्टोरेज से नीलगिरी प्रोसेसिंग प्लांट के लिए रेफ्रिजरेटेड ट्रक रवाना! संकटपूर्ण बिक्री से बचाव।' : 'Refrigerated reefer truck dispatched from cold room to Nilgiris Fresh Mart Processing Plant!');

  showToast('success', toastTitle, toastMsg);
}

if (typeof module !== 'undefined') {
  module.exports = {
    dispatchClusterTrip,
    simulateColdStorageReserve,
    simulateColdStorageDispatch
  };
}

