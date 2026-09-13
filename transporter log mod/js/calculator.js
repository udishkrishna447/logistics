/**
 * AgriNex Logistics Module - Cost & Fare Calculation Engine
 * 
 * Formula:
 * Total logistics cost = Base fare + Distance charge + Loading charge + Unloading charge + Toll + Waiting charge
 * 
 * Metric breakdowns:
 * - Cost per Kilogram (₹/kg) = Total / (Quantity in Tonnes * 1000)
 * - Cost per Quintal (₹/quintal) = Total / (Quantity in Tonnes * 10)
 */

var LogisticsCalculator = {
  /**
   * Calculate full breakdown for a trip
   */
  calculateFare: function(params) {
    const baseFare = Number(params.baseFare) || 0;
    const distanceKm = Number(params.distanceKm) || 0;
    const ratePerKm = Number(params.ratePerKm) || 0;
    const quantityTons = Number(params.quantityTons) || 1;
    const loadingRatePerTon = Number(params.loadingRatePerTon) || 0;
    const unloadingRatePerTon = Number(params.unloadingRatePerTon) || 0;
    const tollCharge = Number(params.tollCharge) || 0;
    const waitingHours = Number(params.waitingHours) || 0;
    const waitingRatePerHour = Number(params.waitingRatePerHour) || 150;

    const distanceCharge = distanceKm * ratePerKm;
    const loadingCharge = quantityTons * loadingRatePerTon;
    const unloadingCharge = quantityTons * unloadingRatePerTon;
    const waitingCharge = waitingHours * waitingRatePerHour;

    const totalCost = baseFare + distanceCharge + loadingCharge + unloadingCharge + tollCharge + waitingCharge;

    const totalKg = quantityTons * 1000;
    const totalQuintals = quantityTons * 10;

    const costPerKg = totalKg > 0 ? (totalCost / totalKg) : 0;
    const costPerQuintal = totalQuintals > 0 ? (totalCost / totalQuintals) : 0;

    return {
      baseFare,
      distanceKm,
      ratePerKm,
      distanceCharge,
      quantityTons,
      loadingRatePerTon,
      loadingCharge,
      unloadingRatePerTon,
      unloadingCharge,
      tollCharge,
      waitingHours,
      waitingCharge,
      totalCost,
      costPerKg: Number(costPerKg.toFixed(2)),
      costPerQuintal: Number(costPerQuintal.toFixed(2))
    };
  },

  /**
   * Calculate shared load cost pooling for FPOs
   * Distributes a shared vehicle cost proportionally according to each farmer's load tonnage.
   * Example: 3 farmers with 3t, 4t, and 5t in a 12t vehicle.
   */
  calculateSharedPool: function(farmerLots, totalTripCost) {
    const totalWeight = farmerLots.reduce((sum, lot) => sum + Number(lot.weightTons), 0);
    
    return farmerLots.map(lot => {
      const shareRatio = totalWeight > 0 ? (Number(lot.weightTons) / totalWeight) : 0;
      const farmerCost = totalTripCost * shareRatio;
      const farmerKg = Number(lot.weightTons) * 1000;
      const perKg = farmerKg > 0 ? (farmerCost / farmerKg) : 0;
      const perQuintal = perKg * 100;

      return {
        farmerName: lot.farmerName,
        village: lot.village,
        weightTons: Number(lot.weightTons),
        sharePercent: (shareRatio * 100).toFixed(1),
        allocatedCost: Math.round(farmerCost),
        costPerKg: Number(perKg.toFixed(2)),
        costPerQuintal: Number(perQuintal.toFixed(2))
      };
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = LogisticsCalculator;
}

