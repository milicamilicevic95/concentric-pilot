const AIRTABLE_URL='https://api.airtable.com/v0/appDhFT8ijd9EofI4/tblAXeR08XGjKsF5y';
const reply=(statusCode,payload)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(payload)});
exports.handler=async(event)=>{
  if(event.httpMethod!=='POST') return reply(405,{error:'Method not allowed.'});
  try{
    const type=(event.headers['content-type']||event.headers['Content-Type']||'').toLowerCase();
    let p={};
    if(type.includes('application/json')) p=JSON.parse(event.body||'{}');
    else p=Object.fromEntries(new URLSearchParams(event.body||''));
    if(p.company) return reply(200,{ok:true});
    const clean=v=>String(v||'').trim().slice(0,500);
    const firstName=clean(p.firstName),lastName=clean(p.lastName),email=clean(p.email),based=clean(p.based),navigating=clean(p.navigating);
    if(!firstName||!lastName||!email||!based||!navigating) return reply(400,{error:'Please complete every field.'});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400,{error:'Please enter a valid email address.'});
    const token=process.env.AIRTABLE_PAT;
    if(!token) return reply(503,{error:'Applications are temporarily unavailable. Please try again shortly.'});
    const fields={'First name':firstName,'Last name':lastName,'Email':email,'Based':based,'Navigating':navigating,'Submitted':new Date().toISOString()};
    const r=await fetch(AIRTABLE_URL,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({records:[{fields}],typecast:true})});
    if(!r.ok){const detail=await r.text();console.error('Airtable submission failed',r.status,detail);return reply(502,{error:'We could not submit your application. Please try again.'});}
    return reply(200,{ok:true});
  }catch(err){console.error(err);return reply(500,{error:'Something went wrong. Please try again.'});}
};
