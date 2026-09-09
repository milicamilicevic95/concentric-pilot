// Netlify serverless function — receives the Concentric application and writes a row to Airtable.
// The Airtable token never reaches the browser; it lives only in Netlify's environment variables.
//
// Set these in Netlify › Site configuration › Environment variables:
//   AIRTABLE_TOKEN   Personal access token with data.records:write on the base
//   AIRTABLE_BASE    Base id, looks like appXXXXXXXXXXXXXX
//   AIRTABLE_TABLE   Table name, e.g. Applications
//
// Expected Airtable fields (create these columns, names must match exactly):
//   First name        single line text
//   Last name         single line text
//   Email             email
//   Based             single line text
//   Navigating        single select — options below
//   Submitted         created time (or date)
//
// Navigating select options:
//   A significant change in professional direction
//   Thinking seriously about what comes next
//   Reconsidering the shape of my professional life
//   Something I cannot name yet

const NAVIGATING = {
  transition: 'A significant change in professional direction',
  visibility: 'Thinking seriously about what comes next',
  recalibration: 'Reconsidering the shape of my professional life',
  unsure: 'Something I cannot name yet'
};

export default async (request) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const { AIRTABLE_TOKEN, AIRTABLE_BASE, AIRTABLE_TABLE } = process.env;
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE || !AIRTABLE_TABLE) {
    console.error('Missing Airtable environment variables');
    return json({ error: 'Server not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);
  const location = str(body.location);
  const navigating = str(body.navigating);

  if (!firstName || !lastName || !email || !location || !navigating) {
    return json({ error: 'Please complete every field.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json({ error: 'That email address does not look right.' }, 400);
  }
  if (!NAVIGATING[navigating]) {
    return json({ error: 'Invalid selection.' }, 400);
  }
  // Honeypot: real applicants never fill this.
  if (str(body.company)) {
    return json({ ok: true });
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typecast: true,
        records: [
          {
            fields: {
              'First name': firstName,
              'Last name': lastName,
              Email: email,
              Based: location,
              Navigating: NAVIGATING[navigating]
            }
          }
        ]
      })
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error('Airtable error', res.status, detail);
    return json({ error: 'We could not record your application. Please email us instead.' }, 502);
  }

  return json({ ok: true });
};

function str(v) {
  return typeof v === 'string' ? v.trim().slice(0, 500) : '';
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const config = { path: '/api/apply' };
