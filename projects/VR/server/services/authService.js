import fetch from 'node-fetch';

const F1TV_BASE = process.env.F1TV_BASE || 'https://api.formula1.com'; // placeholder base

export async function f1tvLogin({ email, password }) {
  // NOTE: F1 TV auth details are not public. You must supply the correct endpoints
  // and required headers in environment variables. This is a placeholder structure.
  const loginUrl = process.env.F1TV_LOGIN_URL || `${F1TV_BASE}/identity/oauth/token`; // placeholder

  const body = {
    grant_type: 'password',
    username: email,
    password,
    client_id: process.env.F1TV_CLIENT_ID,
    audience: process.env.F1TV_AUDIENCE,
    scope: 'openid profile offline_access'
  };

  const resp = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'VR MultiViewer/1.0',
      ...(process.env.F1TV_EXTRA_HEADERS ? JSON.parse(process.env.F1TV_EXTRA_HEADERS) : {})
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Login failed: ${resp.status} ${text}`);
  }
  const data = await resp.json();

  // Map to a stable shape
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;

  // Optional: fetch profile
  let profile = null;
  try {
    if (accessToken && process.env.F1TV_PROFILE_URL) {
      const p = await fetch(process.env.F1TV_PROFILE_URL, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (p.ok) profile = await p.json();
    }
  } catch {}

  return { accessToken, refreshToken, profile };
}
