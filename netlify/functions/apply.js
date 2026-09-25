const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appDhFT8ijd9EofI4';
const TABLE_ID = process.env.AIRTABLE_TABLE_ID || 'tblAXeR08XGjKsF5y';
const PAT = process.env.AIRTABLE_PAT;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return {statusCode:405, body:JSON.stringify({error:'Method not allowed'})};
  if (!PAT) return {statusCode:500, body:JSON.stringify({error:'Application service is not configured'})};
  let data;
  try { data = JSON.parse(event.body || '{}'); } catch { return {statusCode:400, body:JSON.stringify({error:'Invalid request'})}; }

  const clean = (v, max=300) => typeof v === 'string' ? v.trim().slice(0,max) : '';
  const firstName = clean(data.firstName,80);
  const lastName = clean(data.lastName,80);
  const email = clean(data.email,160);
  const based = clean(data.based,160);
  const navigating = clean(data.navigating,180);
  const allowed = new Set([
    'A significant change in professional direction',
    'Thinking seriously about what comes next',
    'Reconsidering the shape of my professional life',
    'Something I cannot name yet'
  ]);
  if (!firstName || !lastName || !email || !based || !allowed.has(navigating) || !/^\S+@\S+\.\S+$/.test(email)) {
    return {statusCode:400, body:JSON.stringify({error:'Please complete all required fields'})};
  }

  const fields = {
    'First name': firstName,
    'Last name': lastName,
    'Email': email,
    'Based': based,
    'Navigating': navigating,
    'Submitted': new Date().toISOString()
  };

  try {
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method:'POST',
      headers:{'Authorization':`Bearer ${PAT}`,'Content-Type':'application/json'},
      body:JSON.stringify({records:[{fields}], typecast:true})
    });
    if (!response.ok) {
      const err = await response.text();
      console.error('Airtable error', response.status, err.slice(0,500));
      return {statusCode:502, body:JSON.stringify({error:'Could not save application'})};
    }
    return {statusCode:200, body:JSON.stringify({ok:true})};
  } catch (err) {
    console.error('Application error', err);
    return {statusCode:500, body:JSON.stringify({error:'Could not save application'})};
  }
};
