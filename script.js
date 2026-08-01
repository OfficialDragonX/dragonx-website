// Scroll Progress Bar

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
    const address = document.getElementById("contract-address").innerText;

    navigator.clipboard.writeText(address);

    copyBtn.innerHTML = "✅ Copied!";

    setTimeout(() => {
      copyBtn.innerHTML = "📋 Copy Contract";
    }, 2000);
  });
}

// Floating Logo

const logo = document.querySelector(".hero-logo");

if (logo) {
  let direction = 1;

  setInterval(() => {
    logo.style.transform = `translateY(${direction * 8}px)`;

    direction *= -1;
  }, 2000);
}
