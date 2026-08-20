const BASE_URL = 'https://waste-pickup-scheduler-hgkn.onrender.com';

export async function fetchZones() {
  const res = await fetch(`${BASE_URL}/zones`);
  if (!res.ok) throw new Error('Failed to fetch zones');
  return res.json();
}

export async function fetchPickups(zoneId, days = 14) {
  const res = await fetch(`${BASE_URL}/pickups/${zoneId}?days=${days}`);
  if (!res.ok) throw new Error('Failed to fetch pickups');
  return res.json();
}

export async function searchAddress(query) {
  const mockAddresses = {
    '123 lafia north': 1,
    '456 shabu': 2,
    '789 city centre': 3,
    '10 kwandare': 4,
  };
  const zoneId = mockAddresses[query.toLowerCase()];
  if (zoneId) return { zoneId };
  throw new Error('Address not found');
}

// Fetch all submitted pickup requests
export async function fetchRequests() {
  const res = await fetch(`${BASE_URL}/requests`);
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}