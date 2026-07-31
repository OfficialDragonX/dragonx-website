// ==========================
// DragonX Premium V3
// ==========================

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;

  const bar = document.getElementById("progress-bar");

  if (bar) {
    bar.style.width = progress + "%";
  }
});

// Reveal Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll("section,.card,.timeline-item")
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// Navbar Glow
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.style.boxShadow =
      "0 0 25px rgba(138,43,226,.45)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// Floating Logo
const logo = document.querySelector(".hero-logo");

if (logo) {
  let t = 0;

  setInterval(() => {
    t += 0.03;

    logo.style.transform =
      `translateY(${Math.sin(t) * 10}px)`;
  }, 30);
}

console.log("🐉 DragonX Premium Website Loaded");
