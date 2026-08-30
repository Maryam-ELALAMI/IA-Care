/**
 * Health check controller for IA-Care
 */
function getHealthStatus() {
  return {
    service: 'IA-Care',
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
}

module.exports = { getHealthStatus };
