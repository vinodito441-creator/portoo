const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

function showPage(id){
  pages.forEach(p => p.classList.toggle("active-page", p.id === id));
  navLinks.forEach(b => b.classList.toggle("active", b.dataset.page === id));
  history.replaceState(null, "", "#" + id);
  window.scrollTo({top:0, behavior:"smooth"});
}

navLinks.forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.page)));

document.querySelectorAll("[data-target]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    showPage(el.dataset.target);
  });
});

const words = ["web enthusiast", "creative learner", "gamer & creator"];
let wi = 0, ci = 0, deleting = false;
const typing = document.getElementById("typing");

function type(){
  const word = words[wi];
  typing.textContent = word.slice(0, ci);
  if(!deleting && ci < word.length){ci++; setTimeout(type, 90)}
  else if(!deleting){deleting=true; setTimeout(type, 1100)}
  else if(ci > 0){ci--; setTimeout(type, 45)}
  else{deleting=false; wi=(wi+1)%words.length; setTimeout(type, 250)}
}
type();

document.getElementById("playBtn").addEventListener("click", e => {
  e.currentTarget.textContent = e.currentTarget.textContent === "▶" ? "Ⅱ" : "▶";
});

// starfield
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize(){
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars = Array.from({length: Math.min(180, Math.floor(innerWidth/7))}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    r: Math.random()*1.3+.25, a: Math.random()*.8+.15,
    s: Math.random()*.18+.03
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){
    s.y += s.s;
    if(s.y > innerHeight) s.y = -2;
    ctx.globalAlpha = s.a;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener("resize", resize); resize(); draw();

const initial = location.hash.slice(1);
if(["home","about","portfolio","contact"].includes(initial)) showPage(initial);
