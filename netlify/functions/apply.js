exports.handler=async(event)=>{
  if(event.httpMethod!=='POST')return{statusCode:405,body:JSON.stringify({error:'Method not allowed'})};
  try{
    const data=JSON.parse(event.body||'{}');
    const clean=v=>String(v||'').trim();
    const first=clean(data.firstName),last=clean(data.lastName),email=clean(data.email),based=clean(data.based),navigating=clean(data.navigating),bot=clean(data.company);
    if(bot)return{statusCode:200,body:JSON.stringify({ok:true})};
    const allowed=['A significant change in professional direction','Thinking seriously about what comes next','Reconsidering the shape of my professional life','Something I cannot name yet'];
    if(!first||!last||!email||!based||!allowed.includes(navigating))return{statusCode:400,body:JSON.stringify({error:'Please complete all required fields.'})};
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return{statusCode:400,body:JSON.stringify({error:'Please enter a valid email.'})};
    const token=process.env.AIRTABLE_PAT;
    if(!token)return{statusCode:500,body:JSON.stringify({error:'Application service is not configured.'})};
    const base='appDhFT8ijd9EofI4',table='tblAXeR08XGjKsF5y';
    const res=await fetch(`https://api.airtable.com/v0/${base}/${table}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({records:[{fields:{'First name':first,'Last name':last,'Email':email,'Based':based,'Navigating':navigating,'submitted':new Date().toISOString()}}]})});
    if(!res.ok){console.error('Airtable error',res.status,await res.text());return{statusCode:502,body:JSON.stringify({error:'Unable to save application.'})};}
    return{statusCode:200,body:JSON.stringify({ok:true})};
  }catch(err){console.error(err);return{statusCode:500,body:JSON.stringify({error:'Unexpected error.'})};}
};
