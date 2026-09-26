(() => {
  const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  const nav=qs('.nav'), menu=qs('.menu');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';});}
  const progress=qs('.progress');
  const updateProgress=()=>{if(!progress)return;const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;progress.style.width=(max>0?Math.min(100,(h.scrollTop/max)*100):0)+'%';};
  addEventListener('scroll',updateProgress,{passive:true}); updateProgress();
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});qsa('.reveal').forEach(el=>io.observe(el));}else qsa('.reveal').forEach(el=>el.classList.add('visible'));

  qsa('.think-step').forEach((btn,i)=>btn.addEventListener('click',()=>{const wrap=btn.closest('[data-thinking]');qsa('.think-step',wrap).forEach(b=>b.classList.toggle('active',b===btn));const title=qs('[data-title]',wrap),copy=qs('[data-copy]',wrap),decision=qs('.decision',wrap),count=qs('[data-count]',wrap);if(title) title.textContent=btn.dataset.title||'';if(copy) copy.textContent=btn.dataset.copy||'';if(decision) decision.textContent='“'+(btn.dataset.question||'')+'”';if(count) count.textContent=String(i+1).padStart(2,'0');}));

  qsa('.lens-btn').forEach(btn=>btn.addEventListener('click',()=>{const lens=btn.closest('.lens');qsa('.lens-btn',lens).forEach(b=>b.classList.toggle('active',b===btn));const q=qs('[data-lens-question]',lens),t=qs('[data-lens-title]',lens),c=qs('[data-lens-copy]',lens);if(q)q.textContent='“'+btn.dataset.question+'”';if(t)t.textContent=btn.dataset.title;if(c)c.textContent=btn.dataset.copy;}));

  qsa('.edition-head').forEach(head=>head.addEventListener('click',()=>{const card=head.closest('.edition-card');const was=card.classList.contains('open');qsa('.edition-card').forEach(c=>{c.classList.remove('open');const h=qs('.edition-head',c);if(h)h.setAttribute('aria-expanded','false');});if(!was){card.classList.add('open');head.setAttribute('aria-expanded','true');}}));

  qsa('.finding-btn').forEach((btn,i)=>btn.addEventListener('click',()=>{const ui=btn.closest('.finding-ui');qsa('.finding-btn',ui).forEach(b=>b.classList.toggle('active',b===btn));const h=qs('[data-finding-heading]',ui),t=qs('[data-finding-text]',ui),k=qs('.finding-panel .kicker',ui);if(h)h.textContent=btn.dataset.findingTitle;if(t)t.textContent=btn.dataset.findingCopy;if(k)k.textContent='Finding '+String(i+1).padStart(2,'0');}));

  const form=qs('#application-form');
  if(form){const status=qs('#form-status'), success=qs('#application-success'), submit=qs('button[type="submit"]',form);form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;if(form.website?.value)return;const old=submit.textContent;submit.disabled=true;submit.textContent='Submitting…';if(status){status.textContent='';status.removeAttribute('data-state');}
    try{const payload=Object.fromEntries(new FormData(form).entries());const res=await fetch('/api/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||'Submission failed');form.hidden=true;if(success)success.hidden=false;success?.scrollIntoView({behavior:'smooth',block:'center'});}catch(err){if(status){status.textContent='We could not submit your application. Please try again.';status.dataset.state='error';}submit.disabled=false;submit.textContent=old;}});}
})();
