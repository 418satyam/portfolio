const projects = [
  {
    id: 'rock,paper,sessior',
    title: 'rock,paper,sessior',
    desc: 'Python projects and scripts collection',
    tech: ['Python'],
    repo: 'https://github.com/418satyam/rock-paper-sessior'
  },
  {
    id: 'To-Do-List',
    title: 'To-Do-List',
    desc: 'Python projects and scripts collection',
    tech: ['Python'],
    repo: 'https://github.com/418satyam/To-Do-List'
  },
  
  {
    id: 'calculater',
    title: 'calculater',
    desc: 'CSS experiment and UI practice.',
    tech: ['CSS'],
    repo: 'https://github.com/418satyam/calculater'
  },
  {
    id: 'codsoft',
    title: 'codsoft',
    desc: 'Python projects and scripts collection.',
    tech: ['Python'],
    repo: 'https://github.com/418satyam/codsoft'
  },
  {
    id: 'RAHA',
    title: 'RAHA',
    desc: 'TypeScript project: RAHA app work in progress.',
    tech: ['TypeScript'],
    repo: 'https://github.com/418satyam/RAHA'
  }
];

const projectsGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLinks = document.getElementById('modalLinks');
const modalClose = document.getElementById('modalClose');

function renderProjects() {
  projectsGrid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <div class="p-title">${escapeHtml(p.title)}</div>
      <div class="p-meta">${escapeHtml(p.desc)}</div>
      <div class="p-actions">
        <div class="p-tag">${p.tech.join(', ')}</div>
      </div>
    `;
    card.addEventListener('click', () => openModal(p));
    projectsGrid.appendChild(card);
  });
  revealOnScroll(); 
}

function openModal(p) {
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalLinks.innerHTML = `<a class="btn" href="${p.repo}" target="_blank">View Repo</a>`;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
}

function escapeHtml(str){ return String(str).replace(/[&<>"']/g, s=>({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[s])); }

const typewriterPhrases = [
  'I build responsive web apps.',
  'Open to internships.'
];
const twEl = document.getElementById('typewriter');
let twIndex = 0, twChar = 0, typing=true;
function typeLoop(){
  const phrase = typewriterPhrases[twIndex];
  if(typing){
    twChar++;
    twEl.textContent = phrase.slice(0, twChar);
    if(twChar === phrase.length) { typing=false; setTimeout(typeLoop,1200); }
    else setTimeout(typeLoop,60);
  } else {
    twChar--;
    twEl.textContent = phrase.slice(0, twChar);
    if(twChar === 0) { typing=true; twIndex = (twIndex+1)%typewriterPhrases.length; setTimeout(typeLoop,300); }
    else setTimeout(typeLoop,30);
  }
}
typeLoop();

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(!target) return;
    window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
  });
});

const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', ()=>{
  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('cmessage').value.trim();
  if(!name || !email || !message){ alert('Please fill all fields'); return; }
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  window.location.href = `mailto:bhandisatyam@gmail.com?subject=${subject}&body=${body}`;
});

function revealOnScroll(){
  const reveals = document.querySelectorAll('.reveal');
  const windowH = window.innerHeight;
  reveals.forEach(el=>{
    const rect = el.getBoundingClientRect();
    if(rect.top < windowH - 80) el.classList.add('show');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', ()=>{ renderProjects(); revealOnScroll(); document.getElementById('year').textContent = new Date().getFullYear(); });

let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  const st = window.scrollY;
  if(st > lastScroll && st > 120){ navbar.classList.add('scrolled'); }
  else { navbar.classList.remove('scrolled'); }
  lastScroll = st;
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
const particles = [];
const PCOUNT = Math.round((W*H)/90000);
for(let i=0;i<PCOUNT;i++){ particles.push(randomParticle()); }
function randomParticle(){
  return {
    x: Math.random()*W,
    y: Math.random()*H,
    r: 1+Math.random()*2,
    vx: (Math.random()-0.5)*0.2,
    vy: (Math.random()-0.5)*0.2,
    hue: 180 + Math.random()*120
  };
}
function updateParticles(){
  ctx.clearRect(0,0,W,H);
  for(let p of particles){
    p.x += p.vx;
    p.y += p.vy;
    if(p.x<0) p.x = W;
    if(p.x>W) p.x = 0;
    if(p.y<0) p.y = H;
    if(p.y>H) p.y = 0;
    ctx.beginPath();
    const g = ctx.createRadialGradient(p.x,p.y,p.r,p.x,p.y,p.r*8);
    g.addColorStop(0, `hsla(${p.hue},90%,60%,0.08)`);
    g.addColorStop(1, `hsla(${p.hue},90%,60%,0)`);
    ctx.fillStyle = g;
    ctx.fillRect(p.x - p.r*6, p.y - p.r*6, p.r*12, p.r*12);
  }
  requestAnimationFrame(updateParticles);
}
window.addEventListener('resize', ()=>{
  W = canvas.width = innerWidth; H = canvas.height = innerHeight;
});
updateParticles();