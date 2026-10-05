(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* 1. BILDER: testar flera filändelser och stora/små bokstäver, absolut sökväg */
const exts=['jpg','jpeg','png','webp','avif','JPG','JPEG','PNG','WEBP'];
$$('.ph[data-img]').forEach(el=>{
  const base='/'+el.dataset.img.replace(/^\.?\/?/,'').replace(/\.\w+$/,'');
  const list=exts.map(e=>`${base}.${e}`);
  const tryNext=i=>{
    if(i>=list.length){console.warn('Hittade ingen bild för',base,'– kolla mappnamn/filnamn (Vercel är skiftlägeskänsligt)');return}
    const img=new Image();img.alt=el.textContent.trim();img.loading='lazy';
    img.onload=()=>el.isConnected&&el.replaceWith(img);
    img.onerror=()=>tryNext(i+1);
    img.src=list[i];
  };
  tryNext(0);
});

/* 2. Roterande ord i rubriken */
const h1=$('.hero h1');
if(h1){
  h1.innerHTML=h1.innerHTML.replace('synas.','<span class="rot">synas</span>.');
  const r=$('.rot'),w=['synas','växa','sälja mer','sticka ut','blomstra'];let i=0;
  if(!calm)setInterval(()=>{r.classList.add('out');setTimeout(()=>{i=(i+1)%w.length;r.textContent=w[i];r.classList.remove('out')},300)},2600);
}

/* 3. Klistermärke + tilt på hero-skärmen */
const stage=$('.stage');
if(stage){
  stage.insertAdjacentHTML('afterbegin','<div class="sticker">☕ Svar inom 24 h</div>');
  const b=$('.browser',stage);
  if(!calm)stage.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;b.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*5}deg)`});
  stage.addEventListener('mouseleave',()=>b.style.transform='');
}

/* 4. Rullande textband */
const words=['Snabba hemsidor','Mobilanpassat','Inga krångliga avtal','Personlig kontakt','Fika-vänlig process','Design med själ'];
const row=words.map(t=>`<span>${t}</span><b>✦</b>`).join('');
const tick=document.createElement('div');tick.className='marquee';
tick.innerHTML=`<div>${row}${row}</div>`;
$('.hero')?.after(tick);

/* 5. Emojis i tjänsterna */
['✨','🔧','🚀'].forEach((e,i)=>{const h=$$('.svc h3')[i];if(h)h.insertAdjacentHTML('afterbegin',`<span class="em">${e}</span>`)});

/* 6. Logo-prick som studsar */
$('.logo')?.addEventListener('click',()=>{const d=$('.logo i');d.classList.remove('hop');void d.offsetWidth;d.classList.add('hop')});

/* 7. Scroll-reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.head,.svc,.feature,.pcard,.plan,.step,.q').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});

/* 8. Konfetti när formuläret skickas */
$('#form')?.addEventListener('submit',()=>setTimeout(()=>{
  if(calm||!$('#msg').textContent.startsWith('Tack'))return;
  const c=['#66705a','#f2c94c','#e07a5f','#1d1d1b','#f4f1ea'];
  for(let i=0;i<70;i++){const p=document.createElement('i');p.className='cf';
    p.style.cssText=`left:${Math.random()*100}vw;background:${c[i%5]};animation-duration:${1.6+Math.random()*1.8}s;animation-delay:${Math.random()*.4}s`;
    document.body.appendChild(p);setTimeout(()=>p.remove(),4200)}
},0));
})();