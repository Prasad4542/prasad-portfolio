const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const typing = document.getElementById("typing");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const roles = [
  "Java Full Stack Developer",
  "Spring Boot Developer",
  "Backend Developer",
  "Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!deleting) {
    typing.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typing.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();

function updatePageUI() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollTop > 20);

  const sections = document.querySelectorAll("main section[id]");
  let current = "home";

  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 180) current = section.id;
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updatePageUI, { passive: true });
updatePageUI();

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.remove();
      }, 800);
    }, 1000);
  }
});

/* =====================================================
   3D HERO MOUSE PARALLAX
   ===================================================== */

const heroVisual = document.querySelector(".hero-visual");
const photoFrame = document.querySelector(".photo-frame");

if (heroVisual && photoFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

  heroVisual.addEventListener("mousemove", (e) => {

    const rect = heroVisual.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = y * -8;
    const rotateY = x * 10;

    photoFrame.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    photoFrame.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
}
