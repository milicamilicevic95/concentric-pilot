exports.handler=async(event)=>{
  if(event.httpMethod!=='POST')return{statusCode:405,body:JSON.stringify({error:'Method not allowed'})};
  try{
    const {firstName,lastName,email,based,navigating}=JSON.parse(event.body||'{}');
    if(!firstName||!lastName||!email||!based||!navigating)return{statusCode:400,body:JSON.stringify({error:'Missing required fields'})};
    const token=process.env.AIRTABLE_PAT;
    const base=process.env.AIRTABLE_BASE_ID||'appDhFT8ijd9EofI4';
    const table=process.env.AIRTABLE_TABLE_ID||'tblAXeR08XGjKsF5y';
    if(!token)return{statusCode:500,body:JSON.stringify({error:'Airtable is not configured'})};
    const submitted=new Date().toISOString();
    const r=await fetch(`https://api.airtable.com/v0/${base}/${table}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({records:[{fields:{'First name':firstName,'Last name':lastName,'Email':email,'Based':based,'Navigating':navigating,'Submitted':submitted}}]})});
    if(!r.ok){const t=await r.text();console.error('Airtable error',r.status,t);return{statusCode:502,body:JSON.stringify({error:'Could not save application'})};}
    return{statusCode:200,body:JSON.stringify({ok:true})};
  }catch(e){console.error(e);return{statusCode:500,body:JSON.stringify({error:'Server error'})};}
};
