"use strict";

// NAV INTERSECTION OBSERVER

const navChange = document.querySelector(".hero");

const navObserver = new IntersectionObserver(
  function (enttry) {
    const [enter] = enttry;
    if (!enter.isIntersecting) {
      document.body.classList.add("NavStick");
    } else {
      document.body.classList.remove("NavStick");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

navObserver.observe(navChange);

// NAV STICKY
const nav = document.querySelector(".nav");
const btnNav = document.querySelector(".navToggle");

btnNav.addEventListener("click", function () {
  nav.classList.toggle("sticky");
});

const navs = document.querySelectorAll(".navLInk");

navs.forEach((button) => {
  button.addEventListener("click", function () {
    nav.classList.remove("sticky");
  });
});

// ACTIVE SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navLInk");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// PORTFOLIO TAB COMPONENT
const tabButtons = document.querySelectorAll(".ptTab");
const tabContents = document.querySelectorAll(".pt");

tabButtons.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    // Remove active class from all tab buttons
    tabButtons.forEach((btn) => btn.classList.remove("ptActive"));

    // Remove active class from all tab contents
    tabContents.forEach((content) => content.classList.remove("ptActiveTab"));

    // Add active class to the clicked tab
    tab.classList.add("ptActive");

    // Show corresponding content
    const targetContent = document.querySelector(
      `.pt[data-content="${target}"]`
    );
    if (targetContent) {
      targetContent.classList.add("ptActiveTab");
    }
  });
});

// IMAGE GALLERY FULL VIEW
const gallery = document.getElementById("fullscreenGallery");
const galleryImg = document.getElementById("fullscreenImage");
const closeBtn = document.getElementById("closeGallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Gather all images that have icons (same structure as in .ptHover)
const hoverBlocks = document.querySelectorAll(".ptHover");
const images = Array.from(hoverBlocks).map((block) =>
  block.querySelector("img")
);
let currentIndex = 0;

function showImage(index) {
  if (index >= 0 && index < images.length) {
    galleryImg.src = images[index].src;
    currentIndex = index;
    gallery.style.display = "flex";
  }
}

// Open gallery when icon is clicked
const icons = document.querySelectorAll(".hoverText ion-icon");
icons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    showImage(index);
  });
});

// Close button
closeBtn.addEventListener("click", () => {
  gallery.style.display = "none";
  galleryImg.src = "";
});

// Background click closes gallery
gallery.addEventListener("click", (e) => {
  if (e.target === gallery) {
    gallery.style.display = "none";
    galleryImg.src = "";
  }
});

// Navigation buttons
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  let newIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(newIndex);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  let newIndex = (currentIndex + 1) % images.length;
  showImage(newIndex);
});

// ANIMATE ON SCROLL
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        // Optionally: remove observer after first trigger
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the element is visible
  }
);

// Select all elements to animate
const animatedElements = document.querySelectorAll(".animate-on-scroll");
animatedElements.forEach((el) => observer.observe(el));


