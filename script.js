// ===============================
// DragonX Premium V2 Script
// ===============================

// Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
});

// Copy Contract
const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const address = document
      .getElementById("contract-address")
      .innerText.trim();

    navigator.clipboard.writeText(address);

    copyBtn.innerHTML = "✅ Copied!";
    setTimeout(() => {
      copyBtn.innerHTML = "📋 Copy Contract";
    }, 2000);
  });
}

// Smooth Reveal Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 0.8s ease";
  observer.observe(section);
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (window.scrollY > 80) {
    nav.style.background = "rgba(5,5,5,.95)";
    nav.style.boxShadow = "0 0 20px rgba(138,43,226,.4)";
  } else {
    nav.style.background = "rgba(8,8,8,.8)";
    nav.style.boxShadow = "none";
  }
});

// ===============================
// Mobile Menu
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".navbar ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    menuToggle.innerHTML = "✕";
  } else {
    menuToggle.innerHTML = "☰";
  }
});

// Loader
window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

},800);

},1200);

});
