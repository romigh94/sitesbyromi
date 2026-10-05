const header=document.querySelector('header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>8),{passive:true});

const burger=document.getElementById('burger'),links=document.getElementById('links');
burger.addEventListener('click',()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
links.addEventListener('click',e=>{if(e.target.tagName==='A'){links.classList.remove('open');burger.setAttribute('aria-expanded',false)}});

const note=document.getElementById('note');
document.querySelectorAll('.switch button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.switch button').forEach(x=>x.classList.toggle('on',x===b));
  const m=b.dataset.mode==='monthly';
  document.querySelectorAll('.price').forEach(p=>{
    const v=m?p.dataset.month:p.dataset.once;
    p.querySelector('.n').textContent=v;
    p.querySelector('.u').textContent=v==='Offert'?'':(m?'kr/mån':'kr');
  });
  note.textContent=m?'Fördelat på 12 månader, inklusive hosting och support. Pris per månad är ett exempel – justera efter dina villkor.':'Engångspris för hela projektet. Hosting och domän tillkommer.';
}));
document.querySelectorAll('[data-plan]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('p').value=a.dataset.plan}));

document.querySelectorAll('.q button').forEach(b=>b.addEventListener('click',()=>{
  const q=b.parentElement,o=q.classList.toggle('open');b.setAttribute('aria-expanded',o);
}));

document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target,msg=document.getElementById('msg');
  if(!f.namn.value.trim()||!/^\S+@\S+\.\S+$/.test(f.epost.value)||!f.meddelande.value.trim()){
    msg.style.color='#a33';msg.textContent='Fyll i namn, giltig e-postadress och en kort beskrivning.';return;
  }
  msg.style.color='';msg.textContent='Tack! Din förfrågan är skickad. Jag återkommer så snart jag kan.';f.reset();
});