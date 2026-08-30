/**
 * Health check controller for IA-Care
 */
export function getHealthStatus() {
  return {
    service: 'IA-Care',
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
}

export function checkLiveness() {
  return true;
}

export function checkReadiness() {
  return true;
}
