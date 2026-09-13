# AgriNex Logistics & Cold-Chain Module

## 1. Overview & Vision
The **AgriNex Logistics Module** is an integrated farm-to-buyer logistics engine built to empower smallholder farmers and Farmer Producer Organisations (FPOs). It optimizes the movement of produce from the farmgate or rural collection centers to mandi yards, food processors, modern retail, and scientific warehouses at the right time, lowest cost, and optimal freshness.

For perishable commodities (e.g. tomatoes, leafy vegetables, fruits, dairy), seamless transport with protective packaging and cold-chain integrity is critical to avoid post-harvest food loss.

---

## 2. Multi-Stakeholder Roles & Permissions
The module supports 6 key actors with tailored operational interfaces:

| Role | Core Capabilities |
| :--- | :--- |
| **Farmer** | Creates farmgate pickup requests, compares transport quotes (total & ₹/kg), tracks live vehicle location, inspects proof-of-delivery (POD) receipts, rates drivers. |
| **FPO (Producer Org)** | Pools smallholder lots into full truckloads (FTL), plans multi-village collection routes, approves shared loads, and splits costs proportionally. |
| **Buyer / Processor** | Receives advance delivery dispatch notices, tracks incoming trucks, inspects produce at gate, enters OTP/scans QR to confirm delivery. |
| **Transporter Fleet** | Broadcasts available trucks, accepts loads, assigns verified drivers, updates transit milestones, receives automated trip payouts. |
| **Warehouse / Cold Store**| Lists storage capacity, tariffs (₹/ton/month), issues digital warehouse receipts (WDRA compliant), manages stock-in/stock-out. |
| **Administrator** | Verifies transport permits, driver licenses, monitors delays, handles disputes, reviews post-harvest loss reports. |

---

## 3. Pickup Request Creation
A farmer or FPO can generate a standard pickup request capturing:
- **Lot Reference**: System-linked unique identifier (`LOT-TOM-0914`).
- **Crop & Variety**: Crop name and grade specifications (e.g., *Roma Hybrid Tomato, Grade A*).
- **Quantity & Packaging Units**: Tonnage and physical containers (e.g., *10 Tonnes, 400 Plastic Crates*).
- **Pickup & Delivery Nodes**: Geocoded addresses and distance in kilometers.
- **Time Window**: Guaranteed pickup slot (e.g., *14 Sep, 06:00 AM – 08:00 AM*).
- **Vehicle Type**: Selected vehicle class (Ventilated, Reefer, Covered Heavy).
- **Quality & Temperature**: Target temperature, crate stacking limits, tarpaulin requirements.
- **Loading Assistance**: On-site farm labor requirement for loading/unloading.

---

## 4. Mathematical Fare Calculation Engine
Before booking, the system calculates transparent, itemized quotes using the standard freight equation:

$$\text{Total logistics cost} = \text{Base fare} + \text{Distance charge} + \text{Loading charge} + \text{Unloading charge} + \text{Toll} + \text{Waiting charge}$$

Where:
- $\text{Distance charge} = \text{Trip Distance (km)} \times \text{Rate per km}$
- $\text{Loading charge} = \text{Produce Quantity (Tonnes)} \times \text{Loading Rate per Ton}$
- $\text{Unloading charge} = \text{Produce Quantity (Tonnes)} \times \text{Unloading Rate per Ton}$
- $\text{Waiting charge} = \text{Waiting Duration (Hours)} \times \text{Hourly Waiting Rate}$

### Unit Rates Breakdown
- **Cost per Kilogram**: $\text{Cost}_{\text{kg}} = \frac{\text{Total Logistics Cost}}{\text{Quantity (Tonnes)} \times 1000}$
- **Cost per Quintal**: $\text{Cost}_{\text{quintal}} = \frac{\text{Total Logistics Cost}}{\text{Quantity (Tonnes)} \times 10}$

---

## 5. FPO Shared Transport & Load Pooling
Smallholder farmers rarely produce enough volume individually to fill a commercial truck. AgriNex features automated **load pooling**:
1. Groups nearby farmers travelling along identical trade corridors.
2. Formulates consolidated pickup routes (e.g., *Village A $\rightarrow$ Village B $\rightarrow$ Village C $\rightarrow$ Processor Warehouse*).
3. Allocates logistics costs strictly proportional to tonnage:

$$\text{Farmer Share (₹)} = \text{Total Truck Fare} \times \left( \frac{\text{Farmer Lot Weight (Tons)}}{\text{Total Consolidated Weight (Tons)}} \right)$$

*Example*: Three farmers with 3t, 4t, and 5t onions in nearby villages share a 12-tonne truck (₹9,020 fare), achieving ₹0.75/kg transport cost vs ₹1.30/kg for individual small trips (saving 42%).

---

## 6. Crop-Appropriate Vehicle Recommendations (FAO Standard)
The platform guides users to vehicle choices that prevent deterioration during transit:

| Commodity Category | Recommended Vehicle & Packaging | Temperature / Care Requirements |
| :--- | :--- | :--- |
| **Perishable Vegetables** (Tomatoes, Greens) | Ventilated body truck with rigid plastic crates | $12^\circ\text{C} - 15^\circ\text{C}$; max 3-tier stacking; shade protection |
| **Semi-Perishable** (Onions, Potatoes) | Open / curtain ventilated truck with dry pallets | Ambient dry; mesh/jute bags; moisture barrier |
| **Grains & Cereals** (Paddy, Wheat, Maize) | Covered 10-wheeler truck with waterproof tarpaulins | Ambient; dry vehicle floor; strict rain protection |
| **High Perishable / Dairy** | Insulated refrigerated reefer ($2^\circ\text{C} - 4^\circ\text{C}$) | Continuous temperature logging; food-grade interior |
| **Delicate Fruit** (Mango, Papaya, Banana) | Air-suspension vehicle, corrugated cushioned cartons | Low-stacking; minimal shock; gentle loading |

---

## 7. Storage Discovery & Digital Warehouse Receipts (DWR)
Integrated storage locator for nearby cold storage and dry warehouses:
- Lists registered capacity, ambient temperature range, and tariffs ($₹/\text{ton}/\text{month}$).
- Integrated with **WDRA** (Warehouse Development and Regulatory Authority) and **e-NAM** platforms.
- Provides immediate digital booking confirmation and intake scheduling.

---

## 8. Real-Time Shipment Tracking & POD Milestone Lifecycle
The shipment lifecycle tracks 7 verified stages:
```
[1. Booking Requested] ➔ [2. Vehicle Assigned] ➔ [3. Arrived at Farm] 
➔ [4. Loaded & Weighed] ➔ [5. Vehicle Departed] ➔ [6. In Transit (GPS)] 
➔ [7. Delivered & POD Verified]
```

### Digital Proof of Delivery (POD)
- Secure 4-digit OTP shared with the authorized receiver.
- Quantity verification (tonnage and crates counted at destination).
- Produce arrival condition grading (Fresh / Minor Loss / Rejected).
- Automatic unlock of escrow payment settlement upon verification.

---

## 9. Exception & Delay Management
The module handles real-world transport failures:
- **Grievance Logging**: Vehicle breakdown, extreme weather, driver unreachable, quantity dispute.
- **Automated Replacement**: Instant dispatch of backup vehicle for perishable loads.
- **Escalation**: Direct alerts to FPO desk and administrator.

---

## 10. Low-Connectivity Architecture
To ensure accessibility in remote rural locations:
- Minimal bandwidth usage with lightweight assets.
- SMS and WhatsApp fallback notifications.
- Offline data entry with synchronization upon signal detection.
- Simple, high-contrast visual cues and numerical OTP confirmation.

---

---

## 11. Code Structure
```
logistics/
├── index.html            # Main responsive dashboard, modals, and role views
├── README.md             # Comprehensive architecture documentation
├── css/
│   ├── variables.css     # Design tokens (AgriNex green, transport amber, cold cyan)
│   ├── components.css    # Reusable UI controls, timeline stepper, buttons, cards
│   └── logistics.css     # Layout styles, Leaflet map, radar pulse, cluster flows
└── js/
    ├── data.js           # Transporters, crops, clusterDemo (1.2T), coldStorageState
    ├── calculator.js     # Freight formula and shared pool math engine
    ├── tracking.js       # Real Leaflet GPS engine, road waypoints, radar pulse, POD
    ├── i18n.js           # Complete Multilingual Engine (English, हिन्दी, தமிழ் - 263 keys)
    └── logistics.js      # App controller, cluster dispatch, cold storage simulator, toast
```

---

## 12. Advanced Features
- **Shared On-Demand Agricultural Logistics**: Complete AI matching pipeline, pooling smallholder loads into a 1.2 Tonne cluster (Farmer A 350kg + Farmer B 450kg + Farmer C 400kg) saving 54% freight cost.
- **Cold Storage Branch**: Automated decision tree to safeguard perishable produce against farmgate delays and distress selling (+21 days shelf life).
- **Google Maps / Swiggy-Style Live GPS**: Real interactive Leaflet map with authentic road curves, multi-stop numbered pins (`①`, `②`, `③`, `🏁`), and expanding radar wave beacon.
- **Quick-Gig Fleet**: Integrates idle Swiggy/Zomato riders and empty backhaul trucks for low-cost farm deliveries during food order downtime.
- **100% Multilingual**: Native dynamic language toggle for English, हिन्दी, and தமிழ் with zero missing translation keys.
