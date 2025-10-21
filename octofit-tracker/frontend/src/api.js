// Shared API helper to fetch data that may be paginated or a plain array
export async function fetchEndpoint(endpoint) {
  console.log('[API] Fetching', endpoint);
  const res = await fetch(endpoint);
  const json = await res.json();
  const items = Array.isArray(json) ? json : json.results || [];
  console.log('[API] Raw response', json);
  console.log('[API] Normalized items length', items.length);
  return { raw: json, items };
}
