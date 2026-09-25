const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

// Intro: once per browsing session.
const intro=q('[data-intro]');
if(intro && !reduced && !sessionStorage.getItem('concentric-intro')){
  document.body.classList.add('is-intro');
  setTimeout(()=>intro.classList.add('is-leaving'),1250);
  setTimeout(()=>{intro.remove();document.body.classList.remove('is-intro');sessionStorage.setItem('concentric-intro','1')},2000);
}else if(intro){intro.remove();}

const nav=q('.site-nav'),toggle=q('.mobile-toggle');
if(toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';});}

if('IntersectionObserver' in window && !reduced){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.09});
  qa('.reveal').forEach(el=>io.observe(el));
}else qa('.reveal').forEach(el=>el.classList.add('visible'));

const progress=q('.progress');
if(progress){const update=()=>{const d=document.documentElement,max=d.scrollHeight-d.clientHeight;progress.style.width=(max?d.scrollTop/max*100:0)+'%'};addEventListener('scroll',update,{passive:true});update();}

// Hero orbit: auto-cycles; hover/focus/click takes control.
const orbitCopy=q('[data-orbit-copy]');
const orbitLabel=q('[data-orbit-label]');
const orbit=q('.orbit');
const orbitNodes=qa('[data-orbit-node]');
const orbitData=[
  ['A question you have not asked yet.','Question'],
  ['An assumption that may not be fixed.','Challenge'],
  ['A perspective outside your usual circle.','Perspective'],
  ['Relevant experience without a vested interest.','Experience'],
  ['A risk or option you may have overlooked.','Stress-test'],
  ['The same question seen from another angle.','Context']
];
let orbitIndex=-1,orbitTimer;
function setOrbit(i,manual=false){
  if(!orbitCopy||!orbitNodes.length)return;
  orbitIndex=i;
  orbitNodes.forEach((n,j)=>n.setAttribute('aria-pressed',String(j===i)));
  orbitCopy.classList.add('is-changing');
  setTimeout(()=>{orbitCopy.textContent=orbitData[i][0];if(orbitLabel)orbitLabel.textContent=orbitData[i][1];orbitCopy.classList.remove('is-changing')},140);
  if(orbit&&!reduced)orbit.style.transform=`rotate(${i*6}deg)`;
  if(manual)restartOrbit();
}
function restartOrbit(){clearInterval(orbitTimer);if(!reduced)orbitTimer=setInterval(()=>setOrbit((orbitIndex+1)%orbitData.length),3800);}
orbitNodes.forEach((n,i)=>{n.addEventListener('click',()=>setOrbit(i,true));n.addEventListener('mouseenter',()=>setOrbit(i,true));n.addEventListener('focus',()=>setOrbit(i,true));});
if(orbitNodes.length){setOrbit(0);restartOrbit();}

// Council interaction.
const councilData={
 ask:['Ask questions','The other women help surface what may be underneath the decision, not simply react to the version first presented.'],
 challenge:['Challenge assumptions','Useful disagreement matters. A Council can question what is being treated as fixed, inevitable or already decided.'],
 perspective:['Bring perspective','Members bring different professional contexts, experiences and ways of seeing the same problem.'],
 experience:['Share relevant experience','Experience is useful when it illuminates the question rather than becoming a prescription.'],
 stress:['Stress-test the thinking','A plan, decision or interpretation can be tested before it is acted on.'],
 context:['Build context over time','The same six women return each month, so the room develops context that a one-off conversation cannot.']
};
const cp=q('.council-panel'),cpTitle=q('[data-council-title]'),cpBody=q('[data-council-body]'),cSeats=qa('[data-council-seat]');
function setCouncil(btn){
  cSeats.forEach(x=>x.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');
  const d=councilData[btn.dataset.councilSeat];if(!d)return;
  cp?.classList.add('is-changing');
  setTimeout(()=>{cpTitle.textContent=d[0];cpBody.textContent=d[1];cp?.classList.remove('is-changing')},140);
}
cSeats.forEach(b=>{b.addEventListener('click',()=>setCouncil(b));b.addEventListener('mouseenter',()=>setCouncil(b));b.addEventListener('focus',()=>setCouncil(b));});

// Edition tabs: mouse, touch and keyboard.
const editions={
 transition:['Transition','For women making a significant change in professional direction.','Changing roles or sectors, returning after time away, dealing with redundancy, changing how you work or leaving something established.'],
 visibility:['Visibility & Momentum','For women thinking seriously about what comes next.','Greater visibility, responsibility, influence or momentum when the obvious next step is no longer obvious.'],
 recalibration:['Recalibration','For women reconsidering the shape of their professional life.','What stays, what changes, and whether the version of success you were pursuing still fits.']
};
const eTabs=qa('[data-edition]'),ePanel=q('.edition-panel'),et=q('[data-edition-title]'),ed=q('[data-edition-dek]'),eb=q('[data-edition-body]');
function setEdition(btn){
  eTabs.forEach(x=>x.setAttribute('aria-selected','false'));btn.setAttribute('aria-selected','true');
  const d=editions[btn.dataset.edition];if(!d)return;
  ePanel?.classList.add('is-changing');setTimeout(()=>{et.textContent=d[0];ed.textContent=d[1];eb.textContent=d[2];ePanel?.classList.remove('is-changing')},140);
}
eTabs.forEach((b,i)=>{b.addEventListener('click',()=>setEdition(b));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:-1)+eTabs.length)%eTabs.length;eTabs[next].focus();setEdition(eTabs[next]);});});

// Research accordion.
qa('.theme-item button').forEach(b=>b.addEventListener('click',()=>{const item=b.closest('.theme-item'),open=item.classList.contains('open');qa('.theme-item').forEach(i=>{i.classList.remove('open');q('button',i)?.setAttribute('aria-expanded','false')});if(!open){item.classList.add('open');b.setAttribute('aria-expanded','true')}}));

// Application form.
const form=q('[data-application-form]'),status=q('[data-form-status]');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();const btn=q('button[type=submit]',form);status.textContent='Submitting…';status.className='form-status';btn.disabled=true;try{const payload=Object.fromEntries(new FormData(form).entries());const r=await fetch('/.netlify/functions/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'Submission failed');status.className='form-status success';status.textContent='Thank you. Your application has been submitted.';form.reset();}catch(e){status.className='form-status error';status.textContent='We could not submit your application. Please try again.';}finally{btn.disabled=false;}})}
