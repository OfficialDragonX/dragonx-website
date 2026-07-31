// ==========================
// Scroll Progress Bar
// ==========================

window.addEventListener("scroll", () => {

const winScroll =
document.body.scrollTop ||
document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled =
(winScroll / height) * 100;

document.getElementById("progress-bar").style.width =
scrolled + "%";

});

// ==========================
// Reveal Animation
// ==========================

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{
threshold:0.15
});

document.querySelectorAll("section,.card,.timeline-item").forEach((el)=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition="all .8s ease";

observer.observe(el);

});

// ==========================
// Navbar Effect
// ==========================

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".navbar");

if(window.scrollY>50){

nav.style.background="rgba(8,8,8,.95)";
nav.style.boxShadow="0 0 25px rgba(138,43,226,.4)";

}else{

nav.style.background="rgba(10,10,10,.85)";
nav.style.boxShadow="none";

}

});

// ==========================
// Floating Logo
// ==========================

const logo=document.querySelector(".hero-logo");

let angle=0;

setInterval(()=>{

angle+=0.03;

logo.style.transform=
`translateY(${Math.sin(angle)*8}px)`;

},30);

// ==========================
// Button Glow
// ==========================

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.boxShadow="0 0 35px rgba(184,77,255,.9)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.boxShadow="";

});

});

console.log("🐉 DragonX Premium Website Loaded");
