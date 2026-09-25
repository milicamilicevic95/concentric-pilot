const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
const nav=q('.site-nav'),toggle=q('.mobile-toggle');
if(toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';});}
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});qa('.reveal').forEach(el=>io.observe(el));}else qa('.reveal').forEach(el=>el.classList.add('visible'));
// Hero council: each seat explains the role of another perspective.
const seatCopy={
  question:['Ask the question','What is the real decision underneath the one you are describing?'],
  assumption:['Challenge an assumption','What are you treating as fixed that may not be?'],
  perspective:['Bring another perspective','How would this look from outside your company, sector or usual circle?'],
  experience:['Share relevant experience','What happened when someone else faced a similar trade-off?'],
  stress:['Stress-test the thinking','What would need to be true for this plan to hold up?']
};
const core=q('[data-council-core]');
qa('[data-seat]').forEach(btn=>btn.addEventListener('click',()=>{qa('[data-seat]').forEach(b=>b.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');const d=seatCopy[btn.dataset.seat];if(core&&d)core.innerHTML=`<small>${d[0]}</small><strong>${d[1]}</strong>`;}));
// Fit explorer
const fitData={
 transition:{title:'Transition',body:'For a significant change in professional direction — changing roles or sectors, returning after time away, dealing with redundancy, or leaving something established.',price:'$75/month founding rate'},
 visibility:{title:'Visibility & Momentum',body:'For thinking seriously about what comes next — greater visibility, responsibility, influence, or momentum when the obvious next step is no longer obvious.',price:'$100/month founding rate'},
 recalibration:{title:'Recalibration',body:'For reconsidering the shape of your professional life — what stays, what changes, and whether the version of success you were pursuing still fits.',price:'$100/month founding rate'},
 unnamed:{title:'Something you cannot name yet',body:'You do not need to have a neat label for the question. Placement starts with what is unresolved, not with choosing the perfect category.',price:'Placement conversation first'}
};
const fitTitle=q('[data-fit-title]'),fitBody=q('[data-fit-body]'),fitPrice=q('[data-fit-price]');
qa('[data-fit]').forEach(btn=>btn.addEventListener('click',()=>{qa('[data-fit]').forEach(b=>b.setAttribute('aria-selected','false'));btn.setAttribute('aria-selected','true');const d=fitData[btn.dataset.fit];if(d){fitTitle.textContent=d.title;fitBody.textContent=d.body;fitPrice.textContent=d.price;}}));
// Evidence theme explorer
const evidenceData={
 direction:['Direction uncertainty','Women questioning whether their current professional path was still the right one. The report describes uncertainty as a recurring theme rather than evidence of professional failure.'],
 isolation:['Professional isolation','Respondents described solving professional problems independently and lacking peer relationships able to provide substantive support at the relevant level of experience.'],
 access:['Access gaps','Some respondents had professional contacts but still lacked access to opportunities, introductions, advocacy or rooms they could not enter alone.'],
 recalibration:['Professional recalibration','Women described reconsidering work after burnout, depletion, an unsustainable role, or a significant change in circumstance.']
};
const evTitle=q('[data-evidence-title]'),evBody=q('[data-evidence-body]');
qa('[data-evidence]').forEach(btn=>btn.addEventListener('click',()=>{qa('[data-evidence]').forEach(b=>b.setAttribute('aria-selected','false'));btn.setAttribute('aria-selected','true');const d=evidenceData[btn.dataset.evidence];if(d){evTitle.textContent=d[0];evBody.textContent=d[1];}}));
// Apply form -> Netlify Function -> Airtable
const form=q('[data-application-form]'),status=q('[data-form-status]');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();status.className='form-status';status.textContent='Submitting…';const button=q('button[type=submit]',form);button.disabled=true;const fd=new FormData(form);const payload=Object.fromEntries(fd.entries());try{const r=await fetch('/.netlify/functions/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'Something went wrong.');status.className='form-status success';status.textContent='Thank you. Your application has been submitted.';form.reset();}catch(err){status.className='form-status error';status.textContent='We could not submit your application. Please try again.';}finally{button.disabled=false;}})}
