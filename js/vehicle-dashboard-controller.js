/**
 * AgriNex Unified Vehicle Controller & Role Dispatch Engine
 * Provides the same options across all vehicle logins:
 * 1. Active Mission & Map
 * 2. Duty & Profile
 * 3. Shift Earnings & Instant UPI
 * 4. Nearby Load Broadcasts (capacity-filtered)
 * 5. POD Handover (OTP + Digital Signature Canvas)
 * 6. Emergency SOS
 * 7. Nearby EV Charging Stations (exclusive to EV)
 * 8. Fleet Login Gateway Screen (before entering dashboard)
 */

let currentActiveRole = 'TRUCK';

document.addEventListener('DOMContentLoaded', function() {
  initVehicleSystem();
});

function initVehicleSystem() {
  // 1. Setup Customer Booking Form Real-time Validation
  setupCustomerBookingValidation();

  // 2. Check saved session role
  let savedRole = null;
  try {
    savedRole = localStorage.getItem('agrinex_active_session_role');
  } catch(e) {}

  if (savedRole && (savedRole === 'TRUCK' || savedRole === 'NORMAL' || savedRole === 'EV')) {
    loginAsRole(savedRole, false);
  } else {
    showLoginGateway();
  }
}

/**
 * Login As Role
 */
function loginAsRole(roleKey, notify = true) {
  if (!roleKey) roleKey = 'TRUCK';
  currentActiveRole = roleKey;

  try {
    localStorage.setItem('agrinex_active_session_role', roleKey);
  } catch(e) {}

  // 1. Hide Login Gateway Screen
  const gateway = document.getElementById('login-gateway-screen');
  if (gateway) gateway.style.display = 'none';

  // 2. Show Main Layout
  const appLayout = document.querySelector('.app-layout');
  if (appLayout) appLayout.style.display = 'flex';

  const profile = (typeof AuthSession !== 'undefined') ? AuthSession.getDriverProfile(roleKey) : null;

  // 3. Update Top Role Badge
  const topBadge = document.getElementById('top-role-badge');
  const subtitle = document.getElementById('sidebar-role-subtitle');
  const evNav = document.getElementById('nav-item-ev-charging');

  if (roleKey === 'TRUCK') {
    if (topBadge) {
      topBadge.style.background = '#e8f5ed';
      topBadge.style.color = '#0c5a36';
      topBadge.style.borderColor = '#bbf7d0';
      topBadge.innerHTML = '🚚 Heavy Truck · Tata Ace 1.5T · TN-33-AX-8910 (> 100 kg / Tonnes)';
    }
    if (subtitle) subtitle.textContent = 'Truck Fleet Console';
    if (evNav) evNav.style.display = 'none';
  } else if (roleKey === 'NORMAL') {
    if (topBadge) {
      topBadge.style.background = '#eff6ff';
      topBadge.style.color = '#1d4ed8';
      topBadge.style.borderColor = '#bfdbfe';
      topBadge.innerHTML = '🚗 Normal Vehicle · Mahindra Bolero · TN-33-BZ-4521 (10 kg – 100 kg)';
    }
    if (subtitle) subtitle.textContent = 'Normal Fleet Console';
    if (evNav) evNav.style.display = 'none';
  } else if (roleKey === 'EV') {
    if (topBadge) {
      topBadge.style.background = '#ecfdf5';
      topBadge.style.color = '#059669';
      topBadge.style.borderColor = '#a7f3d0';
      topBadge.innerHTML = '⚡ EV Vehicle · Tata Ace EV · TN-33-EV-7721 (10 kg – 30 kg)';
    }
    if (subtitle) subtitle.textContent = 'EV Eco-Fleet Console';
    if (evNav) evNav.style.display = 'flex';
  }

  // 4. Update Sidebar Mini Profile
  if (profile) {
    const mName = document.getElementById('mini-name');
    const mVeh = document.getElementById('mini-vehicle');
    const mAv = document.getElementById('mini-avatar');
    if (mName) mName.textContent = profile.name;
    if (mVeh) mVeh.textContent = `${profile.vehicle} · ${profile.regNumber}`;
    if (mAv) mAv.textContent = profile.avatarInitials;
  }

  // 5. Update Duty & Profile Section
  updateDutyProfileRoleData(roleKey);

  // 6. Update Nearby Loads Section
  renderRoleNearbyLoads(roleKey);

  // 7. Update Active Mission Banner
  updateRoleMissionBanner(roleKey);

  // 8. Switch to default Active Mission module
  if (typeof switchTransporterTab === 'function') {
    switchTransporterTab('active-mission');
  }

  if (notify && profile && typeof showToast === 'function') {
    showToast('success', `Logged in as ${profile.name}`, `Accessing ${profile.roleTitle}`);
  }
}

/**
 * Show Login Gateway
 */
function showLoginGateway() {
  currentActiveRole = null;
  try {
    localStorage.removeItem('agrinex_active_session_role');
  } catch(e) {}

  const gateway = document.getElementById('login-gateway-screen');
  if (gateway) gateway.style.display = 'flex';
}

/**
 * Update Duty & Profile Section with Role Data
 */
function updateDutyProfileRoleData(roleKey) {
  if (typeof AuthSession === 'undefined') return;
  const profile = AuthSession.getDriverProfile(roleKey);
  if (!profile) return;

  // Header circle & names
  const avCircle = document.querySelector('.driver-avatar-circle');
  if (avCircle) avCircle.textContent = profile.avatarInitials;

  const nameEl = document.querySelector('[data-i18n="driverNameTitle"]');
  if (nameEl) nameEl.textContent = profile.name;

  const subEl = document.querySelector('[data-i18n="driverSub"]');
  if (subEl) subEl.textContent = `${profile.vehicle} · ${profile.regNumber} · Rating ${profile.rating}`;

  // Find Telematics card and update based on role
  const specsContainer = document.querySelector('#view-duty-profile .card:nth-of-type(2)');
  if (!specsContainer) return;

  let specsHTML = '';
  if (roleKey === 'TRUCK') {
    specsHTML = `
      <div class="card-header">
        <div class="card-title">🚛 Heavy Fleet Vehicle Telematics & Axle Specs</div>
        <span class="badge" style="background: #e8f5ed; color: #0c5a36; font-weight: 800;">Heavy Commercial Certified</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 14px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">⚖️</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">GROSS PAYLOAD CAPACITY</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #0c5a36;">1.5T Payload / 2.8T GVW</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Enforced: > 100 kg & Multi-Tonnes</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">💳</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">NHAI COMMERCIAL FASTAG</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #0284c7;">₹1,240 Balance</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Auto-Recharge Active</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">🛞</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">AXLE TIRE TPMS</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-main);">42 PSI</div>
            <div style="font-size: 0.72rem; color: #16a34a;">Commercial Load Rated</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">📄</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">COMMERCIAL PERMIT</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #10b981;">Valid Feb 2027</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">All India Heavy Goods Carriage</div>
          </div>
        </div>
      </div>
    `;
  } else if (roleKey === 'NORMAL') {
    specsHTML = `
      <div class="card-header">
        <div class="card-title">🚗 Petrol / Diesel Vehicle Status & Telematics</div>
        <span class="badge" style="background: #eff6ff; color: #1d4ed8; font-weight: 800;">BS-VI Diesel Certified</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 14px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">⚖️</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">MEDIUM LOAD CAPACITY</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #1d4ed8;">10 kg to 100 kg</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Ideal for Spices, Oils & Parcels</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">⛽</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">DIESEL FUEL TANK</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #0284c7;">68% (340 km Range)</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">DEF / AdBlue: 85% Optimal</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">🛞</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">TIRE TPMS</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-main);">34 PSI</div>
            <div style="font-size: 0.72rem; color: #16a34a;">Optimal Cold Pressure</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">📄</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">COMMERCIAL PERMIT</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #10b981;">Valid Oct 2026</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Medium Goods Commercial Permit</div>
          </div>
        </div>
      </div>
    `;
  } else if (roleKey === 'EV') {
    specsHTML = `
      <div class="card-header">
        <div class="card-title">⚡ Zero-Emission EV Battery & Charger Telematics</div>
        <span class="badge" style="background: #ecfdf5; color: #059669; font-weight: 800;">Eco Green Certified</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 14px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">⚖️</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">LIGHT ECO CAPACITY</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #059669;">10 kg to 30 kg</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Mushrooms, Berries, Microgreens</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">🔋</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">TRACTION BATTERY SOC</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #16a34a;">84% (110 km Range)</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Battery Health: 98% Optimal</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">🔌</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">CHARGING STANDARD</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-main);">CCS2 60kW DC</div>
            <div style="font-size: 0.72rem; color: #16a34a;">Fast 0-80% in 45 mins</div>
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">🌱</span>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">GREEN ECO CREDITS</div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #059669;">18.4 kg CO₂ Saved</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Zero Carbon Green Permit</div>
          </div>
        </div>
      </div>
    `;
  }
  specsContainer.innerHTML = specsHTML;
}

/**
 * Render Nearby Loads for Selected Role
 */
function renderRoleNearbyLoads(roleKey) {
  const container = document.getElementById('trip-offers-section');
  if (!container || typeof BookingStore === 'undefined') return;

  const bookings = BookingStore.getBookingsByVehicle(roleKey);
  const availableBookings = bookings.filter(b => b.status === 'AVAILABLE');

  let capacityNote = '';
  let themeColor = '#0c5a36';

  if (roleKey === 'TRUCK') {
    capacityNote = 'Showing Heavy Agricultural Cargo (> 100 kg & Multi-Tonnes)';
    themeColor = '#0c5a36';
  } else if (roleKey === 'NORMAL') {
    capacityNote = 'Showing Medium Agricultural Produce (10 kg to 100 kg)';
    themeColor = '#1d4ed8';
  } else if (roleKey === 'EV') {
    capacityNote = 'Showing Light Eco-Deliveries & Produce (10 kg to 30 kg)';
    themeColor = '#059669';
  }

  let cardsHTML = '';
  if (availableBookings.length === 0) {
    cardsHTML = `
      <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; margin-top: 14px;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">📦</div>
        <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">No Broadcasts Currently Available</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
          All scheduled lots in this vehicle category have been accepted or completed.
        </div>
        <button class="btn btn-outline btn-sm" onclick="openCustomerBookingModal()" style="margin-top: 14px; font-weight: 800; color: ${themeColor}; border-color: ${themeColor};">
          + Place Test Consignment Booking
        </button>
      </div>
    `;
  } else {
    cardsHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
        ${availableBookings.map(b => `
          <div class="trip-offer-card trip-offer-highlight" style="border-left: 4px solid ${themeColor};">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="badge" style="background: #f0fdf4; color: ${themeColor}; border: 1px solid #bbf7d0; font-size: 0.72rem; font-weight: 800;">
                  ${b.id} · ${b.weightDisplay}
                </span>
                <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">${b.dateTime}</span>
              </div>
              <div class="trip-offer-title" style="margin-top: 6px; font-weight: 800;">🌾 ${b.item}</div>
              <div class="trip-offer-route" style="margin-top: 4px; font-size: 0.85rem; color: #334155;">📍 ${b.pickup} ➔ ${b.delivery}</div>
              <div style="font-size: 0.78rem; color: #15803d; margin-top: 4px;">Farmer: ${b.customerName} · ${b.customerPhone}</div>
            </div>
            <div class="trip-offer-pay">
              <div class="trip-offer-amt" style="font-size: 1.4rem; color: ${themeColor}; font-weight: 800;">${b.fare}</div>
              <div class="trip-offer-actions" style="margin-top: 8px; display: flex; gap: 6px;">
                <button class="btn btn-primary btn-sm" onclick="handleAcceptBooking('${b.id}')" style="background: ${themeColor}; border-color: ${themeColor}; font-weight: 800;">
                  Accept
                </button>
                <button class="btn btn-outline btn-sm" onclick="handleRejectBooking('${b.id}')">
                  Decline
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="card-header">
      <div>
        <div class="card-title">📡 Nearby Load Broadcasts (Dispatch Board)</div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
          ${capacityNote} · <strong>${availableBookings.length} Active Loads</strong>
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn btn-outline btn-sm" onclick="openCustomerBookingModal()" style="font-weight: 700; color: ${themeColor}; border-color: ${themeColor};">
          + Place Consignment
        </button>
        <button class="btn btn-outline btn-sm" onclick="renderRoleNearbyLoads('${roleKey}'); showToast('info', 'Refreshed', 'Refreshed active loads radar.');">
          🔄 Refresh
        </button>
      </div>
    </div>
    ${cardsHTML}
  `;
}

/**
 * Update Active Mission Header Banner
 */
function updateRoleMissionBanner(roleKey) {
  const codeEl = document.querySelector('[data-i18n="missionCode"]');
  const titleEl = document.querySelector('[data-i18n="missionTitle"]');
  const routeEl = document.querySelector('[data-i18n="missionRouteText"]');

  if (roleKey === 'TRUCK') {
    if (codeEl) codeEl.textContent = 'CLUSTER-AGX-801';
    if (titleEl) titleEl.textContent = '3-Village Tomato Collection (1.2 Tonnes · Net ₹1,650)';
    if (routeEl) routeEl.textContent = 'Route: Thindal ➔ Perundurai ➔ Bhavani ➔ Coimbatore Mandi';
  } else if (roleKey === 'NORMAL') {
    if (codeEl) codeEl.textContent = 'CLUSTER-NRM-401';
    if (titleEl) titleEl.textContent = 'Regional Spices & Cold-Pressed Sesame Oils (65 kg · Net ₹850)';
    if (routeEl) routeEl.textContent = 'Route: Gobichettipalayam Spices Hub ➔ Perundurai ➔ Erode Central APMC';
  } else if (roleKey === 'EV') {
    if (codeEl) codeEl.textContent = 'CLUSTER-EV-101';
    if (titleEl) titleEl.textContent = 'Chilled Button Mushrooms & Strawberries (25 kg · Net ₹480)';
    if (routeEl) routeEl.textContent = 'Route: Thindal Organic Polyhouse ➔ Perundurai FPO ➔ Coimbatore Gourmet Mart';
  }
}

/**
 * Handle Accept Booking
 */
function handleAcceptBooking(id) {
  const b = BookingStore.acceptBooking(id);
  if (b) {
    showToast('success', 'Booking Accepted!', `${b.id} is now added to your Active Transit Schedule.`);
    renderRoleNearbyLoads(currentActiveRole);
    if (typeof switchTransporterTab === 'function') {
      switchTransporterTab('active-mission');
    }
  }
}

/**
 * Handle Reject Booking
 */
function handleRejectBooking(id) {
  BookingStore.rejectBooking(id);
  showToast('info', 'Booking Declined', `${id} removed from your broadcast list.`);
  renderRoleNearbyLoads(currentActiveRole);
}

/**
 * Setup Customer Booking Real-time Validation
 */
function setupCustomerBookingValidation() {
  const weightInput = document.getElementById('book-weight-input');
  const unitSelect = document.getElementById('book-unit-select');
  const vehicleRadios = document.querySelectorAll('input[name="book-vehicle-type"]');
  const errorBox = document.getElementById('booking-validation-error');
  const submitBtn = document.getElementById('btn-submit-customer-booking');

  function validate() {
    let selectedVehicle = 'TRUCK';
    vehicleRadios.forEach(r => { if (r.checked) selectedVehicle = r.value; });

    const rawVal = parseFloat(weightInput ? weightInput.value : 0);
    const unit = unitSelect ? unitSelect.value : 'kg';
    const weightInKg = unit === 'tonnes' ? rawVal * 1000 : rawVal;

    if (!weightInput || !weightInput.value || isNaN(rawVal) || rawVal <= 0) {
      if (errorBox) {
        errorBox.style.display = 'none';
        errorBox.textContent = '';
      }
      if (submitBtn) submitBtn.disabled = false;
      return true;
    }

    const check = BookingStore.validateCapacity(selectedVehicle, weightInKg);
    if (!check.valid) {
      if (errorBox) {
        errorBox.style.display = 'block';
        errorBox.textContent = `⚠️ ${check.message}`;
      }
      if (submitBtn) submitBtn.disabled = true;
      return false;
    } else {
      if (errorBox) {
        errorBox.style.display = 'none';
        errorBox.textContent = '';
      }
      if (submitBtn) submitBtn.disabled = false;
      return true;
    }
  }

  if (weightInput) weightInput.addEventListener('input', validate);
  if (unitSelect) unitSelect.addEventListener('change', validate);
  vehicleRadios.forEach(r => r.addEventListener('change', validate));
}

/**
 * Submit Customer Booking
 */
function submitCustomerBooking(e) {
  if (e) e.preventDefault();

  let selectedVehicle = 'TRUCK';
  document.querySelectorAll('input[name="book-vehicle-type"]').forEach(r => {
    if (r.checked) selectedVehicle = r.value;
  });

  const rawWeight = parseFloat(document.getElementById('book-weight-input').value);
  const unit = document.getElementById('book-unit-select').value;
  const weightInKg = unit === 'tonnes' ? rawWeight * 1000 : rawWeight;
  const item = document.getElementById('book-item-input').value.trim() || 'Agricultural Cargo';
  const pickup = document.getElementById('book-pickup-input').value.trim() || 'Farmgate Location';
  const delivery = document.getElementById('book-delivery-input').value.trim() || 'Mandi Yard';
  const customerName = document.getElementById('book-cust-name').value.trim() || 'Valued Farmer / Shipper';
  const customerPhone = document.getElementById('book-cust-phone').value.trim() || '+91 98421 88000';

  const res = BookingStore.createBooking({
    vehicleType: selectedVehicle,
    weightKg: weightInKg,
    weightDisplay: unit === 'tonnes' ? `${rawWeight} Tonnes` : `${rawWeight} kg`,
    item: item,
    pickup: pickup,
    delivery: delivery,
    customerName: customerName,
    customerPhone: customerPhone,
    distanceKm: 42
  });

  if (!res.success) {
    const errorBox = document.getElementById('booking-validation-error');
    if (errorBox) {
      errorBox.style.display = 'block';
      errorBox.textContent = `⚠️ ${res.error}`;
    }
    return;
  }

  // Close modal
  closeModal('modal-customer-booking');

  // Success Notification
  showToast('success', '🎉 Booking Dispatched!', `Booking #${res.booking.id} routed exclusively to ${selectedVehicle} Fleet Dashboard.`);

  // Auto-switch to that vehicle dashboard
  setTimeout(() => {
    loginAsRole(selectedVehicle, false);
    if (typeof switchTransporterTab === 'function') {
      switchTransporterTab('nearby-loads');
    }
  }, 500);
}

/**
 * EXCLUSIVE EV FEATURE: Render Nearby EV Charging Stations
 */
function renderEVChargingStations(query = '') {
  const container = document.getElementById('ev-charging-stations-grid');
  if (!container || typeof BookingStore === 'undefined') return;

  const stations = BookingStore.getChargingStations(query);

  if (stations.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--text-muted);">
        No charging stations found matching your search.
      </div>
    `;
    return;
  }

  container.innerHTML = stations.map(s => `
    <div class="card charging-station-card" style="border-top: 4px solid #059669; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #064e3b;">${s.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">📍 ${s.address}</div>
          </div>
          <span class="badge" style="background: #ecfdf5; color: #059669; font-weight: 800; font-size: 0.82rem; white-space: nowrap;">
            ⚡ ${s.distanceKm} km
          </span>
        </div>

        <div style="margin: 14px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 0.82rem; display: flex; flex-direction: column; gap: 6px;">
          <div>🔌 <strong>Plug Types:</strong> ${s.types}</div>
          <div>🟢 <strong>Availability:</strong> <span style="color: #059669; font-weight: 700;">${s.availablePorts}</span></div>
          <div>🕒 <strong>Status:</strong> ${s.openStatus} · <strong>Tariff:</strong> ${s.rate}</div>
        </div>
      </div>

      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button class="btn btn-outline btn-sm" onclick="showToast('success', 'Port Reserved', '${s.name} Bay #1 locked for 30 minutes.');" style="flex: 1; border-color: #059669; color: #059669; font-weight: 700;">
          ⚡ Reserve Port
        </button>
        <a href="${s.mapLink}" target="_blank" class="btn btn-primary btn-sm" style="flex: 1; text-align: center; text-decoration: none; background: #059669; border-color: #059669; font-weight: 800;">
          🗺️ Navigate ➔
        </a>
      </div>
    </div>
  `).join('');
}

function handleSearchChargingStations() {
  const searchInput = document.getElementById('search-ev-chargers');
  const q = searchInput ? searchInput.value : '';
  renderEVChargingStations(q);
}

function detectCurrentLocationChargers() {
  showToast('info', 'Detecting GPS Location', 'Located driver position on NH 544 Perundurai Sector. Showing closest chargers within 10 km.');
  renderEVChargingStations();
}

/**
 * Open Customer Booking Modal
 */
function openCustomerBookingModal() {
  const modal = document.getElementById('modal-customer-booking');
  if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// Global bridges
window.loginAsRole = loginAsRole;
window.showLoginGateway = showLoginGateway;
window.updateDutyProfileRoleData = updateDutyProfileRoleData;
window.renderRoleNearbyLoads = renderRoleNearbyLoads;
window.updateRoleMissionBanner = updateRoleMissionBanner;
window.handleAcceptBooking = handleAcceptBooking;
window.handleRejectBooking = handleRejectBooking;
window.submitCustomerBooking = submitCustomerBooking;
window.renderEVChargingStations = renderEVChargingStations;
window.handleSearchChargingStations = handleSearchChargingStations;
window.detectCurrentLocationChargers = detectCurrentLocationChargers;
window.openCustomerBookingModal = openCustomerBookingModal;
window.closeModal = closeModal;
