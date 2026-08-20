const BASE_URL = import.meta.env.VITE_API_URL || '';

// ========== ZONES ==========
export async function fetchZones() {
  const res = await fetch(`${BASE_URL}/api/zones`);
  if (!res.ok) throw new Error('Failed to fetch zones');
  return res.json();
}

export async function fetchZoneById(id) {
  const res = await fetch(`${BASE_URL}/api/zones/${id}`);
  if (!res.ok) throw new Error('Failed to fetch zone');
  return res.json();
}

// ========== PICKUPS ==========
export async function fetchPickups(zoneId, days = 14) {
  const res = await fetch(`${BASE_URL}/api/pickups/${zoneId}?days=${days}`);
  if (!res.ok) throw new Error('Failed to fetch pickups');
  return res.json();
}

// ========== REQUESTS ==========
export async function fetchRequests() {
  const res = await fetch(`${BASE_URL}/api/requests`);
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

export async function createRequest(requestData) {
  const res = await fetch(`${BASE_URL}/api/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });
  if (!res.ok) throw new Error('Failed to create request');
  return res.json();
}

export async function updateRequestStatus(id, status) {
  const res = await fetch(`${BASE_URL}/api/requests/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update request');
  return res.json();
}

export async function deleteRequest(id) {
  const res = await fetch(`${BASE_URL}/api/requests/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete request');
  return res.json();
}

// ========== ADDRESS SEARCH (Mock) ==========
export async function searchAddress(query) {
  const mockAddresses = {
    '123 lafia north': 1,
    '456 shabu': 2,
    '789 city centre': 3,
    '10 kwandare': 4,
  };
  const zoneId = mockAddresses[query.toLowerCase()];
  if (zoneId) return { zoneId };
  throw new Error('Address not found. Try "123 lafia north", "456 shabu", or "789 city centre"');
}