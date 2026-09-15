/**
 * AgriNex Vehicle Dashboard Controller
 * Handles:
 * 1. Role-based Login & Dashboard Isolation (Truck, Normal Vehicle, EV, Customer)
 * 2. Real-time Customer Load Validation
 * 3. Booking Routing, Acceptance, Rejection & POD Completion
 * 4. EV Nearby Charging Station Locator & Navigation
 */

// Active state
let currentActiveRole = 'TRUCK';
let currentActiveTab = 'dashboard';

document.addEventListener('DOMContentLoaded', function() {
  initVehicleSystem();
});

function initVehicleSystem() {
  // 1. Determine active role from storage or gateway
  const savedRole = AuthSession.getRole();
  if (savedRole) {
    loginAsRole(savedRole, false);
  } else {
    showLoginGateway();
  }

  // 2. Setup Customer Booking Form Real-time Validation
  setupCustomerBookingValidation();

  // 3. Render initial bookings
  renderRoleBookings();
}

/**
 * Switch Active User Role
 */
function loginAsRole(role, notify = true) {
  currentActiveRole = role;
  AuthSession.setRole(role);

  // Hide Login Gateway
  const gateway = document.getElementById('login-gateway-screen');
  if (gateway) gateway.style.display = 'none';

  // Show App Layout
  const appLayout = document.querySelector('.app-layout');
  if (appLayout) appLayout.style.display = 'flex';

  // Hide all vehicle sidebars
  document.querySelectorAll('.role-sidebar').forEach(el => el.style.display = 'none');

  // Hide all vehicle dashboard containers
  document.querySelectorAll('.role-dashboard-container').forEach(el => el.style.display = 'none');

  // Show active role sidebar & container
  const activeSidebar = document.getElementById(`sidebar-${role.toLowerCase()}`);
  if (activeSidebar) activeSidebar.style.display = 'flex';

  const activeContainer = document.getElementById(`container-${role.toLowerCase()}`);
  if (activeContainer) activeContainer.style.display = 'block';

  // Update Top Navbar Role Badge
  updateNavbarRoleBadge(role);

  // Default to Dashboard tab
  switchRoleTab('dashboard');

  // Refresh role data
  renderRoleBookings();

  if (notify) {
    const profile = AuthSession.getDriverProfile(role);
    showToast('success', `Logged in as ${profile.name}`, `Accessing ${profile.roleTitle}`);
  }
}

/**
 * Show Login Gateway (Logout)
 */
function showLoginGateway() {
  AuthSession.setRole(null);
  currentActiveRole = null;

  const appLayout = document.querySelector('.app-layout');
  if (appLayout) appLayout.style.display = 'none';

  const gateway = document.getElementById('login-gateway-screen');
  if (gateway) gateway.style.display = 'flex';
}

/**
 * Update Top Navbar Role Info & Pill Selector
 */
function updateNavbarRoleBadge(role) {
  const profile = AuthSession.getDriverProfile(role);
  const badgeEl = document.getElementById('top-role-badge');
  const userMiniName = document.querySelectorAll('.active-user-name');
  const userMiniVeh = document.querySelectorAll('.active-user-vehicle');
  const userMiniInit = document.querySelectorAll('.active-user-avatar');

  if (badgeEl) {
    let icon = '🚚';
    let color = '#0c5a36';
    let bg = '#e8f5ed';
    let border = '#bbf7d0';

    if (role === 'NORMAL') {
      icon = '🚗';
      color = '#1d4ed8';
      bg = '#eff6ff';
      border = '#bfdbfe';
    } else if (role === 'EV') {
      icon = '⚡';
      color = '#059669';
      bg = '#ecfdf5';
      border = '#a7f3d0';
    } else if (role === 'CUSTOMER') {
      icon = '📦';
      color = '#d97706';
      bg = '#fffbeb';
      border = '#fde68a';
    }

    badgeEl.style.color = color;
    badgeEl.style.backgroundColor = bg;
    badgeEl.style.borderColor = border;
    badgeEl.innerHTML = `${icon} ${profile.vehicle} · ${profile.regNumber} (${profile.capacityRange})`;
  }

  userMiniName.forEach(el => el.textContent = profile.name);
  userMiniVeh.forEach(el => el.textContent = `${profile.vehicle} · ${profile.regNumber}`);
  userMiniInit.forEach(el => el.textContent = profile.avatarInitials);

  // Update quick role switcher dropdown/buttons
  document.querySelectorAll('.role-switcher-btn').forEach(btn => {
    if (btn.dataset.role === role) {
      btn.classList.add('active-role');
    } else {
      btn.classList.remove('active-role');
    }
  });
}

/**
 * Switch Tab within Active Vehicle Dashboard
 */
function switchRoleTab(tabName) {
  currentActiveTab = tabName;
  if (!currentActiveRole) return;

  const role = currentActiveRole.toLowerCase();

  // 1. Update Sidebar Active State
  document.querySelectorAll(`#sidebar-${role} .sidebar-item`).forEach(item => {
    item.classList.remove('active');
  });
  const activeNavItem = document.getElementById(`${role}-nav-${tabName}`);
  if (activeNavItem) activeNavItem.classList.add('active');

  // 2. Hide all views in active container
  document.querySelectorAll(`#container-${role} .vehicle-view-panel`).forEach(panel => {
    panel.style.display = 'none';
  });

  // 3. Show selected view
  const targetView = document.getElementById(`${role}-view-${tabName}`);
  if (targetView) targetView.style.display = 'block';

  // 4. Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 5. Special handlers
  if (tabName === 'active' || tabName === 'dashboard') {
    // Invalidate map size if map canvas exists
    setTimeout(() => {
      if (typeof LogisticsTracking !== 'undefined') {
        if (LogisticsTracking.map && typeof LogisticsTracking.map.invalidateSize === 'function') {
          LogisticsTracking.map.invalidateSize();
        }
        if (window.google && LogisticsTracking.googleMap) {
          google.maps.event.trigger(LogisticsTracking.googleMap, 'resize');
          if (typeof LogisticsTracking.recenterOnVehicle === 'function') {
            LogisticsTracking.recenterOnVehicle();
          }
        }
      }
    }, 150);
  }

  // If EV Nearby Charging Stations tab is selected, render charging stations
  if (role === 'ev' && tabName === 'charging-stations') {
    renderEVChargingStations();
  }
}

/**
 * Render Bookings strictly filtered for active vehicle role
 */
function renderRoleBookings() {
  if (!currentActiveRole) return;

  const role = currentActiveRole; // 'TRUCK', 'NORMAL', 'EV'
  const bookings = BookingStore.getBookingsByVehicle(role);

  const availableList = bookings.filter(b => b.status === 'AVAILABLE');
  const activeList = bookings.filter(b => b.status === 'IN_TRANSIT');
  const completedList = bookings.filter(b => b.status === 'COMPLETED');

  // Update counts on badges
  const availCountEl = document.getElementById(`${role.toLowerCase()}-avail-count`);
  if (availCountEl) availCountEl.textContent = `${availableList.length} Available`;

  const activeCountEl = document.getElementById(`${role.toLowerCase()}-active-count`);
  if (activeCountEl) activeCountEl.textContent = `${activeList.length} Active`;

  // 1. Render Available Bookings List
  const bookingsContainer = document.getElementById(`${role.toLowerCase()}-bookings-list`);
  if (bookingsContainer) {
    if (availableList.length === 0) {
      bookingsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 2.5rem;">📭</div>
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main); margin-top: 8px;">No Pending Bookings for ${role}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">New bookings created by customers matching this vehicle's capacity will appear here automatically.</div>
          <button class="btn btn-outline btn-sm" onclick="openCustomerBookingModal()" style="margin-top: 14px;">+ Create Sample Booking</button>
        </div>
      `;
    } else {
      bookingsContainer.innerHTML = availableList.map(b => `
        <div class="booking-card ${role.toLowerCase()}-card" style="background: #fff; border: 1px solid var(--border-default); border-left: 5px solid ${getRoleColor(role)}; border-radius: 12px; padding: 18px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge" style="background: ${getRoleBg(role)}; color: ${getRoleColor(role)}; font-weight: 800; font-size: 0.75rem;">${b.id}</span>
                <span class="badge" style="background: #f1f5f9; color: #475569; font-weight: 700; font-size: 0.75rem;">Weight: ${b.weightDisplay}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">🕒 ${b.dateTime}</span>
              </div>
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main); margin-top: 6px;">${b.item}</div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">👤 Customer: <strong>${b.customerName}</strong> (${b.customerPhone})</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #0c5a36;">${b.fare}</div>
              <div style="font-size: 0.75rem; color: #16a34a; font-weight: 700;">Est. Payout</div>
            </div>
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin: 12px 0; font-size: 0.85rem; display: flex; flex-direction: column; gap: 6px;">
            <div>📍 <strong>Pickup:</strong> ${b.pickup}</div>
            <div>🏁 <strong>Delivery:</strong> ${b.delivery}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">🛣️ <strong>Route:</strong> ${b.route} (${b.distanceKm} km)</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">📝 ${b.notes}</div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="handleRejectBooking('${b.id}')" style="color: #dc2626; border-color: #fca5a5;">Decline</button>
              <button class="btn btn-primary btn-sm" onclick="handleAcceptBooking('${b.id}')" style="background: ${getRoleColor(role)}; border-color: ${getRoleColor(role)}; font-weight: 800; padding: 6px 16px;">Accept Booking ➔</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // 2. Render Completed Deliveries List
  const completedContainer = document.getElementById(`${role.toLowerCase()}-completed-list`);
  if (completedContainer) {
    if (completedList.length === 0) {
      completedContainer.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 0.9rem;">
          No deliveries completed in this shift yet.
        </div>
      `;
    } else {
      completedContainer.innerHTML = `
        <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
          <thead>
            <tr style="text-align: left; border-bottom: 2px solid var(--border-default); color: var(--text-muted);">
              <th style="padding: 10px 8px;">Booking ID</th>
              <th style="padding: 10px 8px;">Item & Load</th>
              <th style="padding: 10px 8px;">Customer</th>
              <th style="padding: 10px 8px;">Route</th>
              <th style="padding: 10px 8px;">Payout</th>
              <th style="padding: 10px 8px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${completedList.map(b => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; font-weight: 800;">${b.id}</td>
                <td style="padding: 12px 8px;">${b.item} <br><span style="font-size: 0.75rem; color: var(--text-muted);">${b.weightDisplay}</span></td>
                <td style="padding: 12px 8px;">${b.customerName}</td>
                <td style="padding: 12px 8px;">${b.route}</td>
                <td style="padding: 12px 8px; font-weight: 800; color: #16a34a;">${b.fare}</td>
                <td style="padding: 12px 8px;"><span class="badge" style="background: #f0fdf4; color: #16a34a;">✅ Delivered (${b.completedAt || 'Today'})</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  }
}

function getRoleColor(role) {
  if (role === 'TRUCK') return '#0c5a36';
  if (role === 'NORMAL') return '#1d4ed8';
  if (role === 'EV') return '#059669';
  return '#475569';
}

function getRoleBg(role) {
  if (role === 'TRUCK') return '#e8f5ed';
  if (role === 'NORMAL') return '#eff6ff';
  if (role === 'EV') return '#ecfdf5';
  return '#f1f5f9';
}

/**
 * Handle Accept Booking
 */
function handleAcceptBooking(id) {
  const b = BookingStore.acceptBooking(id);
  if (b) {
    showToast('success', 'Booking Accepted!', `${b.id} is now in Active Deliveries. Routing GPS to pickup.`);
    renderRoleBookings();
    switchRoleTab('active');
  }
}

/**
 * Handle Reject Booking
 */
function handleRejectBooking(id) {
  BookingStore.rejectBooking(id);
  showToast('info', 'Booking Declined', `${id} removed from available list.`);
  renderRoleBookings();
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

    const rawVal = parseFloat(weightInput.value);
    const unit = unitSelect ? unitSelect.value : 'kg';
    const weightInKg = unit === 'tonnes' ? rawVal * 1000 : rawVal;

    if (!weightInput.value || isNaN(rawVal) || rawVal <= 0) {
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

  // Auto-switch to that vehicle dashboard so the user can verify immediately
  setTimeout(() => {
    loginAsRole(selectedVehicle, false);
    switchRoleTab('bookings');
  }, 600);
}

/**
 * EXCLUSIVE EV FEATURE: Render Nearby EV Charging Stations
 */
function renderEVChargingStations(query = '') {
  const container = document.getElementById('ev-charging-stations-grid');
  if (!container) return;

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
  const q = document.getElementById('search-ev-chargers').value;
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

// Global bridges
window.loginAsRole = loginAsRole;
window.showLoginGateway = showLoginGateway;
window.switchRoleTab = switchRoleTab;
window.handleAcceptBooking = handleAcceptBooking;
window.handleRejectBooking = handleRejectBooking;
window.submitCustomerBooking = submitCustomerBooking;
window.renderEVChargingStations = renderEVChargingStations;
window.handleSearchChargingStations = handleSearchChargingStations;
window.detectCurrentLocationChargers = detectCurrentLocationChargers;
window.openCustomerBookingModal = openCustomerBookingModal;
