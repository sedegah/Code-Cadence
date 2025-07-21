import "./index.css";

// DOM Elements
const toggleButton = document.getElementById("theme-toggle-btn") as HTMLButtonElement;
const mobileMenuButton = document.querySelector(".mobile-menu-btn") as HTMLButtonElement;
const navList = document.querySelector(".nav-list") as HTMLUListElement;
const navLinks = document.querySelectorAll(".nav-link") as NodeListOf<HTMLAnchorElement>;
const contactForm = document.getElementById("contact-form") as HTMLFormElement;
const heroTitle = document.getElementById("hero-title") as HTMLHeadingElement;
const heroSubtitle = document.getElementById("hero-subtitle") as HTMLParagraphElement;
const scrollToTopBtn = document.getElementById("scroll-to-top") as HTMLButtonElement;

// Theme Toggle Functionality
function initTheme() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  navList.classList.toggle("active");
  
  const spans = mobileMenuButton.querySelectorAll("span");
  spans[0].style.transform = navList.classList.contains("active") 
    ? "translateY(9px) rotate(45deg)" 
    : "translateY(0) rotate(0)";
    
  spans[1].style.opacity = navList.classList.contains("active") ? "0" : "1";
  
  spans[2].style.transform = navList.classList.contains("active") 
    ? "translateY(-9px) rotate(-45deg)" 
    : "translateY(0) rotate(0)";
}

// Smooth Scrolling
function smoothScroll(e: Event) {
  e.preventDefault();
  
  const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href")!;
  const targetElement = document.querySelector(targetId) as HTMLElement;
  const headerOffset = 70;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
  
  if (navList.classList.contains("active")) {
    toggleMobileMenu();
  }
}

// Form Submission
function handleFormSubmit(e: Event) {
  e.preventDefault();
  const formData = new FormData(contactForm);
  
  // We'd normally send this data to a server, but for now just log it
  console.log("Form submitted with data:", {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  });
  
  // Show success message
  alert("Thanks for your message! We'll get back to you soon.");
  contactForm.reset();
}

// Scroll Animation
function animateOnScroll() {
  const elements = document.querySelectorAll(".section-header, .project-card, .competency-card, .tech-category, .contact-info, .contact-form");
  
  elements.forEach(element => {
    const position = element.getBoundingClientRect();
    
    // If element is in viewport
    if (position.top < window.innerHeight * 0.9) {
      (element as HTMLElement).style.opacity = "1";
      (element as HTMLElement).style.transform = "translateY(0)";
    }
  });
}

// Typewriter effect
function typeWriter(element: HTMLElement, text: string, speed: number, callback?: () => void) {
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      if (callback) callback();
    }
  }, speed);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme();
  
  // Set initial styles for scroll animations
  const animatedElements = document.querySelectorAll(".section-header, .project-card, .competency-card, .tech-category, .contact-info, .contact-form");
  animatedElements.forEach(element => {
    (element as HTMLElement).style.opacity = "0";
    (element as HTMLElement).style.transform = "translateY(20px)";
    (element as HTMLElement).style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  
  // Event listeners
  toggleButton?.addEventListener("click", toggleTheme);
  mobileMenuButton?.addEventListener("click", toggleMobileMenu);
  
  navLinks.forEach(link => {
    link.addEventListener("click", smoothScroll);
  });
  
  contactForm?.addEventListener("submit", handleFormSubmit);
  
  // Scroll animation
  window.addEventListener("scroll", () => {
    animateOnScroll();
    
    // Handle scroll to top button visibility
    if (scrollToTopBtn) {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });
  
  // Scroll to top button click handler
  scrollToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  animateOnScroll(); // Run once on page load
  
  // Start typewriter effect
  if (heroTitle && heroSubtitle) {
    const titleText = "Building Digital Excellence";
    const subtitleText = "We craft innovative software solutions tailored to your business needs.";
    
    setTimeout(() => {
      typeWriter(heroTitle, titleText, 100, () => {
        setTimeout(() => {
          typeWriter(heroSubtitle, subtitleText, 50);
        }, 500);
      });
    }, 500);
  }
});
