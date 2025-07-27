document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio Loading - Optimized Version');
  
  // ==========================================
  // PERFORMANCE-OPTIMIZED STARFIELD
  // ==========================================
  
  const starfieldCanvas = document.getElementById('starfield-canvas');
  if (starfieldCanvas) {
    const ctx = starfieldCanvas.getContext('2d');
    let stars = [];
    let mouse = { x: 0, y: 0 };
    let animationId;
    let isPaused = false;

    // Initialize with minimal stars for performance
    function initStarfield() {
      starfieldCanvas.width = window.innerWidth;
      starfieldCanvas.height = window.innerHeight;
      
      stars = [];
      // Drastically reduce stars based on device capability
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency < 4; // Check CPU cores
      
      let numStars = 25; // Base amount
      if (!isMobile && !isLowEnd) numStars = 40;
      if (window.innerWidth > 1920) numStars = 60;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * starfieldCanvas.width,
          y: Math.random() * starfieldCanvas.height,
          size: Math.random() * 1 + 0.5,
          alpha: Math.random() * 0.5 + 0.5,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.005 + 0.002
        });
      }
    }

    // Simplified update function
    function updateStars() {
      stars.forEach(star => {
        star.twinkle += star.twinkleSpeed;
        star.alpha = Math.sin(star.twinkle) * 0.3 + 0.7;
      });
    }

    // Simplified render function
    function renderStars() {
      ctx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
      
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Ultra-low FPS animation (15 FPS max)
    let lastFrameTime = 0;
    const frameInterval = 67; // ~15 FPS

    function animateStarfield(currentTime) {
      if (!isPaused && currentTime - lastFrameTime >= frameInterval) {
        updateStars();
        renderStars();
        lastFrameTime = currentTime;
      }
      animationId = requestAnimationFrame(animateStarfield);
    }

    // Pause during scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      isPaused = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isPaused = false;
      }, 100);
    }, { passive: true });

    // Initialize starfield
    initStarfield();
    animateStarfield(performance.now());

    // Resize handler
    window.addEventListener('resize', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(initStarfield, 250);
    });
  }

  // ==========================================
  // DISABLE HEAVY ANIMATIONS ON MOBILE/LOW-END
  // ==========================================
  
  function optimizeForDevice() {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4;
    
    if (isMobile || isLowEnd) {
      // Disable heavy background animations
      const neuralBg = document.getElementById('neural-network-bg');
      const quantumField = document.getElementById('quantum-field');
      const matrixCanvas = document.getElementById('matrix-canvas');
      
      if (neuralBg) neuralBg.style.display = 'none';
      if (quantumField) quantumField.style.display = 'none';
      if (matrixCanvas) matrixCanvas.style.display = 'none';
      
      // Reduce particle effects
      const particles = document.querySelectorAll('.particle, .quantum-particle');
      particles.forEach(p => p.style.display = 'none');
      
      console.log('🔧 Heavy animations disabled for performance');
    }
  }
  
  optimizeForDevice();

  // ==========================================
  // LIGHTWEIGHT HEADER SCROLL
  // ==========================================
  
  let headerScrollTimeout;
  const header = document.querySelector('.futuristic-header');
  
  function updateHeaderScroll() {
    clearTimeout(headerScrollTimeout);
    headerScrollTimeout = setTimeout(() => {
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, 10);
  }
  
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });

  // ==========================================
  // BULLETPROOF NAVIGATION - CLEAN VERSION
  // ==========================================
  
  function initNavigation() {
    console.log('🧭 Initializing Navigation...');
    
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(`Found ${navLinks.length} navigation links`);
    
    if (navLinks.length === 0) {
      console.warn('⚠️ No navigation links found, retrying...');
      setTimeout(initNavigation, 500);
      return;
    }
    
    navLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      const targetSection = document.querySelector(href);
      
      if (!targetSection) {
        console.warn(`⚠️ Section ${href} not found`);
        return;
      }
      
      // Single, reliable click handler
      link.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log(`🎯 Navigating to ${href}`);
        
        // Update active states
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Calculate scroll position
        const headerHeight = header ? header.offsetHeight : 80;
        const targetRect = targetSection.getBoundingClientRect();
        const scrollPosition = window.pageYOffset + targetRect.top - headerHeight;
        
        // Smooth scroll
        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
        
      }, { passive: false });
      
      // Ensure clickability
      link.style.cursor = 'pointer';
      link.style.pointerEvents = 'auto';
    });
    
    console.log('✅ Navigation initialized successfully');
  }
  
  // Initialize navigation
  setTimeout(initNavigation, 100);

  // ==========================================
  // PRELOADER
  // ==========================================
  
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        console.log('✅ Preloader hidden');
      }, 1500); // Reduced time
    });
  }

  // ==========================================
  // THEME SWITCHER
  // ==========================================
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      console.log('🎨 Theme toggled');
    });
  }

  // ==========================================
  // HERO ANIMATIONS (OPTIMIZED)
  // ==========================================
  
  // Quantum titles rotation (simplified)
  const titles = document.querySelectorAll('.title-item');
  let currentTitle = 0;
  
  if (titles.length > 0) {
    setInterval(() => {
      titles[currentTitle].classList.remove('active');
      currentTitle = (currentTitle + 1) % titles.length;
      titles[currentTitle].classList.add('active');
    }, 3000);
  }

  // Stats counter (performance optimized)
  const statNumbers = document.querySelectorAll('.stat-number');
  const observerOptions = { threshold: 0.5 };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 1500;
        const increment = target / (duration / 50);
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString();
            clearInterval(counter);
          } else {
            entry.target.textContent = Math.floor(current).toLocaleString();
          }
        }, 50);
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });

  // ==========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ==========================================
  
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // ==========================================
  // PROJECT MODAL (SIMPLIFIED)
  // ==========================================
  
  const modal = document.getElementById('project-modal');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');
  const closeModal = document.querySelector('.modal .close');
  
  if (modal && closeModal) {
    viewProjectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const projectId = btn.dataset.project;
        console.log(`📋 Opening project: ${projectId}`);
        modal.style.display = 'block';
        // Add project-specific content here
      });
    });
    
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // ==========================================
  // CONTACT FORM
  // ==========================================
  
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('📧 Contact form submitted');
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // ==========================================
  // AI ASSISTANT (SIMPLIFIED)
  // ==========================================
  
  const aiAssistant = document.getElementById('ai-assistant');
  if (aiAssistant) {
    const responses = [
      "Hi! I'm ARIA, Sushant's AI guide. His portfolio showcases 25+ GitHub repositories!",
      "Sushant specializes in Machine Learning, AI, and has explored 100+ technologies!",
      "Check out his EdgeBEV-Transformer project - it's cutting-edge autonomous vehicle AI!",
      "He's available for internship opportunities starting May 2025 at University of Windsor!"
    ];
    
    let responseIndex = 0;
    const chatBubble = document.getElementById('ai-chat');
    
    if (chatBubble) {
      aiAssistant.addEventListener('click', () => {
        chatBubble.querySelector('p').textContent = responses[responseIndex];
        responseIndex = (responseIndex + 1) % responses.length;
      });
    }
  }

  console.log('✅ Portfolio fully loaded and optimized!');
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

// Monitor performance and adjust if needed
let performanceCheckInterval;

function checkPerformance() {
  const startTime = performance.now();
  
  setTimeout(() => {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    if (responseTime > 50) { // If lag detected
      console.warn('⚠️ Performance issue detected, disabling heavy animations');
      
      // Disable starfield if performance is poor
      const starfieldCanvas = document.getElementById('starfield-canvas');
      if (starfieldCanvas) {
        starfieldCanvas.style.display = 'none';
      }
    }
  }, 0);
}

// Check performance every 5 seconds
performanceCheckInterval = setInterval(checkPerformance, 5000);

// Stop monitoring after 30 seconds
setTimeout(() => {
  clearInterval(performanceCheckInterval);
  console.log('🔧 Performance monitoring stopped');
}, 30000);
