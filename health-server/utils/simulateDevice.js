// backend/utils/simulateDevice.js
export function generateFakeHealthData() {
  return {
    // numeric values (not strings)
    heartRate: Math.round(60 + Math.random() * 40),      // 60–100 bpm
    temperature: +(36 + Math.random()).toFixed(1),       // 36.0–37.0 °C (number)
    oxygenLevel: +(95 + Math.random() * 5).toFixed(1),   // 95.0–100.0 %
    timestamp: new Date().toISOString()
  };
}
