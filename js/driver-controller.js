/**
 * AgriNex Driver & Transporter Console Controller
 * Implements the exact, logical operational lifecycle for truckers and gig drivers:
 * 1. Duty Status Toggle (Online / Offline)
 * 2. Shift Metrics & Performance Dashboard
 * 3. Trip Dispatch Board (Accept / Decline Load Broadcasts)
 * 4. Interactive Sequential Multi-Stop Mission Workflow
 * 5. Real-Time Leaflet GPS Navigation with Animated Radar Truck
 * 6. Digital POD Receiver Handover & Signature Pad
 * 7. Driver Wallet & Instant UPI Bank Payout
 * 8. Vehicle Health, Battery Telematics & Fastag
 * 9. Emergency SOS & Roadside Assistance
 */

const DRIVER_STATE = {
  driverName: 'Karthik Raja',
  phone: '+91 98421 99812',
  vehicle: 'Tata Ace Gold EV (1.5 Ton)',
  regNumber: 'TN-33-AX-8910',
  isOnline: true,
  batteryPercent: 84,
  batteryKm: 110,
  todayEarnings: 3840,
  todayTrips: 3,
  todayDistanceKm: 142,
  currentStepIndex: 0,
  activeTripId: 'CLUSTER-AGX-801',
  steps: [
    {
      title: 'Stop 1: Farmgate A - Thindal (Farmer: Ravi Kumar)',
      detail: 'Load: 350 kg Fresh Tomatoes (14 Crates) · Share: ₹481',
      btnText: '🚗 Navigate to Stop 1 (Thindal)',
      stopNum: 1,
      speed: 34,
      dist: '4.2 km',
      eta: '8 mins'
    },
    {
      title: 'At Stop 1: Thindal Farmgate',
      detail: 'Farmer A: Ravi Kumar · Verify tare weight & stack crates',
      btnText: '📦 Confirm 350 kg Loaded & Collect OTP (4912)',
      stopNum: 1,
      speed: 0,
      dist: 'At Farm A',
      eta: 'Loading Crates'
    },
    {
      title: 'Stop 2: Farmgate B - Villarasampatti (Farmer: Selvam P.)',
      detail: 'Load: 450 kg Fresh Tomatoes (18 Crates) · Share: ₹618',
      btnText: '🚚 Navigate to Stop 2 (Villarasampatti)',
      stopNum: 2,
      speed: 38,
      dist: '8.6 km',
      eta: '14 mins'
    },
    {
      title: 'At Stop 2: Villarasampatti Farmgate',
      detail: 'Farmer B: Selvam P. · Check crate partition & quality',
      btnText: '📦 Confirm 450 kg Loaded & Collect OTP (7823)',
      stopNum: 2,
      speed: 0,
      dist: 'At Farm B',
      eta: 'Loading Crates'
    },
    {
      title: 'Stop 3: Farmgate C - Perundurai (Farmer: Murugan S.)',
      detail: 'Load: 400 kg Fresh Tomatoes (16 Crates) · Share: ₹551',
      btnText: '🚚 Navigate to Stop 3 (Perundurai)',
      stopNum: 3,
      speed: 42,
      dist: '12.1 km',
      eta: '18 mins'
    },
    {
      title: 'At Stop 3: Perundurai Farmgate',
      detail: 'Farmer C: Murugan S. · Full 1.2 Tonnes Loaded & Sealed!',
      btnText: '📦 Confirm 400 kg Loaded & Collect OTP (3109)',
      stopNum: 3,
      speed: 0,
      dist: 'At Farm C',
      eta: '1.2T Pooled Complete'
    },
    {
      title: 'En Route to Coimbatore APMC Mandi Yard',
      detail: 'NH 544 Highway Corridor · 1.2 Tonnes (48 Crates) Pooled Load',
      btnText: '🛣️ Full Highway Speed to Coimbatore Mandi',
      stopNum: 4,
      speed: 54,
      dist: '18.4 km',
      eta: '28 mins'
    },
    {
      title: 'Arrived at Coimbatore APMC Mandi Gate #2',
      detail: 'Unloading Dock assigned · Handover to Mandi Receiver Desk',
      btnText: '✍️ Verify POD & Collect Receiver OTP (4912)',
      stopNum: 4,
      speed: 0,
      dist: 'At Unloading Dock',
      eta: 'Ready for POD'
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initDriverConsole();
});

function initDriverConsole() {
  updateDutyUI();
  updateMetricsUI();
  renderDriverMissionStep();
  setupDriverSignaturePad();

  // Initialize Leaflet Live GPS Map with Cluster Route
  setTimeout(() => {
    const booking = LOGISTICS_DATA.bookings.find(b => b.trackingId === DRIVER_STATE.activeTripId) || LOGISTICS_DATA.bookings[0];
    if (typeof LogisticsTracking !== 'undefined' && typeof LogisticsTracking.renderLiveMap === 'function') {
      LogisticsTracking.renderLiveMap(booking);
    }
  }, 350);
}

// ----------------------------------------------------
// 1. DUTY STATUS TOGGLE (ONLINE / OFFLINE)
// ----------------------------------------------------
function toggleDriverOnline() {
  DRIVER_STATE.isOnline = !DRIVER_STATE.isOnline;
  updateDutyUI();

  if (DRIVER_STATE.isOnline) {
    showToast('success', '🟢 Driver Mode: ONLINE', 'Receiving farmgate trips and downtime micro-orders.');
  } else {
    showToast('info', '⚪ Driver Mode: OFFLINE', 'Duty paused. You will not receive new trip dispatches.');
  }
}

function updateDutyUI() {
  const dot = document.getElementById('driver-duty-dot');
  const text = document.getElementById('driver-duty-text');
  const btn = document.getElementById('btn-duty-toggle');
  const offersSection = document.getElementById('trip-offers-section');

  if (dot) {
    dot.className = DRIVER_STATE.isOnline ? 'duty-dot online' : 'duty-dot offline';
  }
  if (text) {
    text.innerHTML = DRIVER_STATE.isOnline
      ? '<strong style="color: #15803d;">ONLINE</strong>'
      : '<strong style="color: #64748b;">OFFLINE</strong>';
  }
  if (btn) {
    btn.textContent = DRIVER_STATE.isOnline ? 'Go Offline' : 'Go Online';
    btn.className = DRIVER_STATE.isOnline ? 'btn btn-outline btn-sm' : 'btn btn-primary btn-sm';
    btn.style.opacity = '1';
  }
  if (offersSection) {
    offersSection.style.opacity = DRIVER_STATE.isOnline ? '1' : '0.4';
    offersSection.style.pointerEvents = DRIVER_STATE.isOnline ? 'auto' : 'none';
  }
}

// ----------------------------------------------------
// 2. SHIFT METRICS
// ----------------------------------------------------
function updateMetricsUI() {
  const elEarnings = document.getElementById('stat-driver-earnings');
  const elTrips = document.getElementById('stat-driver-trips');
  const elDist = document.getElementById('stat-driver-dist');
  const elWallet = document.getElementById('wallet-display-amount');

  if (elEarnings) elEarnings.textContent = `₹${DRIVER_STATE.todayEarnings.toLocaleString('en-IN')}`;
  if (elTrips) elTrips.textContent = `${DRIVER_STATE.todayTrips} Trips`;
  if (elDist) elDist.textContent = `${DRIVER_STATE.todayDistanceKm} km`;
  if (elWallet) elWallet.textContent = `₹${DRIVER_STATE.todayEarnings.toLocaleString('en-IN')}`;
}

// ----------------------------------------------------
// 3. TRIP DISPATCH BOARD
// ----------------------------------------------------
function acceptTripOffer(type) {
  showToast('success', '🚀 Trip Accepted!', 'Mission loaded! Multi-stop route navigation active.');
  document.getElementById('active-navigator-section').scrollIntoView({ behavior: 'smooth' });
}

function declineTripOffer(btn) {
  const card = btn.closest('.offer-box');
  if (card) {
    card.style.opacity = '0';
    setTimeout(() => {
      card.remove();
      showToast('info', 'Offer Dismissed', 'Searching for new nearby farmgate loads...');
    }, 250);
  }
}

// ----------------------------------------------------
// 4. SEQUENTIAL MULTI-STOP WORKFLOW
// ----------------------------------------------------
function advanceDriverMission() {
  if (DRIVER_STATE.currentStepIndex >= DRIVER_STATE.steps.length - 1) {
    // Open POD modal on arrival at Mandi
    openPODModal(DRIVER_STATE.activeTripId);
    return;
  }

  DRIVER_STATE.currentStepIndex++;
  renderDriverMissionStep();

  // Advance simulation on Leaflet map
  if (typeof advanceActiveTripSimulation === 'function') {
    advanceActiveTripSimulation();
  }

  const cur = DRIVER_STATE.steps[DRIVER_STATE.currentStepIndex];
  showToast('info', 'Milestone Updated', cur.title);

  // If final step reached, open POD modal automatically
  if (DRIVER_STATE.currentStepIndex === DRIVER_STATE.steps.length - 1) {
    setTimeout(() => {
      openPODModal(DRIVER_STATE.activeTripId);
    }, 600);
  }
}

function renderDriverMissionStep() {
  const cur = DRIVER_STATE.steps[DRIVER_STATE.currentStepIndex];
  if (!cur) return;

  const btnAction = document.getElementById('btn-driver-cta') || document.getElementById('btn-next-leg-action');
  const titleEl = document.getElementById('mission-step-title');
  const detailEl = document.getElementById('mission-step-detail');
  const speedEl = document.getElementById('track-live-speed');
  const distEl = document.getElementById('track-live-dist');
  const etaEl = document.getElementById('track-live-eta');

  if (btnAction) {
    btnAction.innerHTML = `<span>${cur.btnText}</span> ➔`;
    if (DRIVER_STATE.currentStepIndex === DRIVER_STATE.steps.length - 1) {
      btnAction.className = 'driver-action-cta completed';
    } else {
      btnAction.className = 'driver-action-cta';
    }
  }

  if (titleEl) titleEl.textContent = cur.title;
  if (detailEl) detailEl.textContent = cur.detail;
  if (speedEl) speedEl.textContent = `${cur.speed} km/h`;
  if (distEl) distEl.textContent = cur.dist;
  if (etaEl) etaEl.textContent = cur.eta;

  // Update horizontal smart contract milestones (Matching Buyer/Farmer theme)
  for (let m = 1; m <= 4; m++) {
    const msStep = document.getElementById(`ms-step-${m}`);
    const msCircle = document.getElementById(`ms-circle-${m}`);
    if (msStep) {
      if (m < cur.stopNum) {
        msStep.className = 'milestone-step completed';
        if (msCircle) msCircle.textContent = '✓';
      } else if (m === cur.stopNum) {
        msStep.className = 'milestone-step active';
        if (msCircle) msCircle.textContent = `${m === 4 ? '4' : m}`;
      } else {
        msStep.className = 'milestone-step pending';
        if (msCircle) msCircle.textContent = `${m === 4 ? '4' : m}`;
      }
    }
  }

  // Update stop card highlights if present
  for (let s = 1; s <= 4; s++) {
    const card = document.getElementById(`stop-card-${s}`);
    const badge = document.getElementById(`stop-badge-${s}`);
    const statusText = document.getElementById(`stop-status-${s}`);

    if (card && badge && statusText) {
      if (s < cur.stopNum) {
        card.className = 'stop-card-item completed-stop';
        badge.className = 'stop-num-badge completed';
        badge.textContent = '✓';
        statusText.innerHTML = '<span class="badge badge-delivered">Collected ✓</span>';
      } else if (s === cur.stopNum) {
        card.className = 'stop-card-item active-stop';
        badge.className = 'stop-num-badge';
        badge.textContent = `${s === 4 ? '🏁' : s}`;
        statusText.innerHTML = '<span class="badge badge-transit">Current Stop ➔</span>';
      } else {
        card.className = 'stop-card-item';
        badge.className = 'stop-num-badge';
        badge.style.background = '#94a3b8';
        badge.textContent = `${s === 4 ? '🏁' : s}`;
        statusText.innerHTML = '<span class="badge" style="background:#f1f5f9; color:#64748b;">Pending</span>';
      }
    }
  }
}

// ----------------------------------------------------
// 5. SIGNATURE PAD FOR DRIVER HANDOVER
// ----------------------------------------------------
let sigCanvas, sigCtx, isDrawingSig = false;

function setupDriverSignaturePad() {
  sigCanvas = document.getElementById('pod-signature-canvas');
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');

  sigCanvas.width = 460;
  sigCanvas.height = 120;
  sigCtx.strokeStyle = '#0f172a';
  sigCtx.lineWidth = 2.5;
  sigCtx.lineCap = 'round';

  const getPos = (e) => {
    const rect = sigCanvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const start = (e) => {
    isDrawingSig = true;
    const pos = getPos(e);
    sigCtx.beginPath();
    sigCtx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawingSig) return;
    const pos = getPos(e);
    sigCtx.lineTo(pos.x, pos.y);
    sigCtx.stroke();
    if (e.touches) e.preventDefault();
  };

  const stop = () => { isDrawingSig = false; };

  sigCanvas.addEventListener('mousedown', start);
  sigCanvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stop);

  sigCanvas.addEventListener('touchstart', start);
  sigCanvas.addEventListener('touchmove', draw);
  window.addEventListener('touchend', stop);
}

function clearDriverSignature() {
  if (sigCanvas && sigCtx) {
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  }
}

function submitDriverPODVerification() {
  const otpInput = document.getElementById('pod-otp-input');
  const otp = otpInput ? otpInput.value.trim() : '';

  if (otp !== '4912' && otp.length < 4) {
    showToast('danger', 'Invalid OTP', 'Please request the 4-digit OTP from the Mandi Receiver. (Demo OTP: 4912)');
    return;
  }

  // Award ₹1,650 to driver wallet
  DRIVER_STATE.todayEarnings += 1650;
  DRIVER_STATE.todayTrips += 1;
  DRIVER_STATE.todayDistanceKm += 85;
  updateMetricsUI();

  closeModal('modal-pod-verification');

  // Change action button to finished state
  const btnAction = document.getElementById('btn-driver-cta');
  if (btnAction) {
    btnAction.className = 'driver-action-cta completed';
    btnAction.innerHTML = '<span>✅ Trip Delivered · ₹1,650 Added to Wallet</span>';
  }

  showToast('success', '🎉 Delivery Confirmed & Payout Credited!', '₹1,650 credited to your Driver Wallet. Fastag & tolls settled.');
}

// ----------------------------------------------------
// 6. DRIVER WALLET & INSTANT UPI PAYOUT
// ----------------------------------------------------
function requestInstantUpiPayout() {
  const amt = DRIVER_STATE.todayEarnings;
  if (amt <= 0) {
    showToast('info', 'Zero Balance', 'No unsettled balance available.');
    return;
  }

  DRIVER_STATE.todayEarnings = 0;
  updateMetricsUI();

  showToast('success', '⚡ UPI Transfer Initiated!', `₹${amt.toLocaleString('en-IN')} transferred to Karthik Raja (UPI ID: 9842199812@okhdfcbank). UTR: 629108392.`);
}

// ----------------------------------------------------
// 7. MODALS
// ----------------------------------------------------
function openPODModal(trackingId) {
  const otpInput = document.getElementById('pod-otp-input');
  if (otpInput) otpInput.value = '';
  clearDriverSignature();
  openModal('modal-pod-verification');
}

function openDriverSOSModal() {
  openModal('modal-driver-sos');
}

function openDriverFastagModal() {
  showToast('info', 'Fastag Balance', 'NHAI Fastag Balance: ₹1,240. Auto-recharge enabled on HDFC Bank.');
}

// Global UI Bridge Functions
window.openDriverPODModal = openPODModal;
window.advanceDriverTripStage = advanceDriverMission;
window.triggerInstantDriverUPIPayout = requestInstantUpiPayout;
window.openDriverSOSModal = openDriverSOSModal;
