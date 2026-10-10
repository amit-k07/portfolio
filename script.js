
const body = document.body;
const portraitStage = document.getElementById("portraitStage");
const portrait = document.getElementById("portrait");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

document.getElementById("year").textContent =
  new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

themeToggle.addEventListener("click", () => {
  const isLight = body.classList.toggle("light-mode");

  themeIcon.textContent = isLight ? "☾" : "☼";
  themeLabel.textContent = isLight ? "Dark Mode" : "Light Mode";
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

const canUseFinePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

if (canUseFinePointer.matches && portraitStage && portrait) {
  portraitStage.addEventListener("pointermove", event => {
    const rect = portraitStage.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    portrait.style.animation = "none";
    portrait.style.transform =
      `translateY(-4px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });

  portraitStage.addEventListener("pointerleave", () => {
    portrait.style.transform = "";
    portrait.style.animation = "";
  });
}

const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll("a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navItems.forEach(link => {
        const active = link.getAttribute("href") ===
          `#${entry.target.id}`;

        link.classList.toggle("active", active);
      });
    });
  }, {
    rootMargin: "-25% 0px -60% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));
}
