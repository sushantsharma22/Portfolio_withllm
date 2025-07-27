document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio Loading - Interactive Starfield Version');
  
  // ==========================================
  // INTERACTIVE STARFIELD WITH MOUSE MOVEMENT & SHOOTING STARS
  // ==========================================
  
  const starfieldCanvas = document.getElementById('starfield-canvas');
  if (starfieldCanvas) {
    const ctx = starfieldCanvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId;
    let isPaused = false;

    // Initialize starfield
    function initStarfield() {
      starfieldCanvas.width = window.innerWidth;
      starfieldCanvas.height = window.innerHeight;
      
      stars = [];
      shootingStars = [];
      
      // Create regular stars
      const isMobile = window.innerWidth < 768;
      const numStars = isMobile ? 150 : 200;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * starfieldCanvas.width,
          y: Math.random() * starfieldCanvas.height,
          originalX: 0,
          originalY: 0,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.5,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          mouseInfluence: Math.random() * 0.0003 + 0.0001
        });
        
        // Store original positions
        stars[i].originalX = stars[i].x;
        stars[i].originalY = stars[i].y;
      }
    }

    // Create shooting star
    function createShootingStar() {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      
      switch(side) {
        case 0: // Top
          x = Math.random() * starfieldCanvas.width;
          y = -50;
          vx = (Math.random() - 0.5) * 4;
          vy = Math.random() * 3 + 2;
          break;
        case 1: // Right
          x = starfieldCanvas.width + 50;
          y = Math.random() * starfieldCanvas.height;
          vx = -(Math.random() * 3 + 2);
          vy = (Math.random() - 0.5) * 4;
          break;
        case 2: // Bottom
          x = Math.random() * starfieldCanvas.width;
          y = starfieldCanvas.height + 50;
          vx = (Math.random() - 0.5) * 4;
          vy = -(Math.random() * 3 + 2);
          break;
        case 3: // Left
          x = -50;
          y = Math.random() * starfieldCanvas.height;
          vx = Math.random() * 3 + 2;
          vy = (Math.random() - 0.5) * 4;
          break;
      }
      
      shootingStars.push({
        x, y, vx, vy,
        length: Math.random() * 60 + 20,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01,
        trail: []
      });
    }

    // Update stars based on mouse position
    function updateStars() {
      stars.forEach(star => {
        // Mouse influence - stars move away from cursor
        const dx = star.originalX - mouse.x;
        const dy = star.originalY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const influence = (maxDistance - distance) / maxDistance;
          star.x = star.originalX + dx * influence * star.mouseInfluence * 100;
          star.y = star.originalY + dy * influence * star.mouseInfluence * 100;
        } else {
          // Slowly return to original position
          star.x += (star.originalX - star.x) * 0.02;
          star.y += (star.originalY - star.y) * 0.02;
        }
        
        // Twinkling effect
        star.twinkle += star.twinkleSpeed;
        star.alpha = Math.sin(star.twinkle) * 0.3 + 0.7;
      });
      
      // Update shooting stars
      shootingStars.forEach((shootingStar, index) => {
        // Add current position to trail
        shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y, alpha: shootingStar.alpha });
        
        // Limit trail length
        if (shootingStar.trail.length > shootingStar.length) {
          shootingStar.trail.shift();
        }
        
        // Update position
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        
        // Fade out
        shootingStar.alpha -= shootingStar.decay;
        
        // Remove if faded or off screen
        if (shootingStar.alpha <= 0 || 
            shootingStar.x < -100 || shootingStar.x > starfieldCanvas.width + 100 ||
            shootingStar.y < -100 || shootingStar.y > starfieldCanvas.height + 100) {
          shootingStars.splice(index, 1);
        }
      });
      
      // Randomly create shooting stars
      if (Math.random() < 0.005) { // 0.5% chance per frame
        createShootingStar();
      }
    }

    // Render everything
    function renderStars() {
      ctx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
      
      // Render regular stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Render shooting stars
      shootingStars.forEach(shootingStar => {
        if (shootingStar.trail.length > 1) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          
          // Draw trail
          ctx.beginPath();
          shootingStar.trail.forEach((point, index) => {
            const trailAlpha = (index / shootingStar.trail.length) * shootingStar.alpha;
            ctx.globalAlpha = trailAlpha;
            
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
          ctx.globalAlpha = 1;
          
          // Draw bright head
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow to head
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // Animation loop
    function animateStarfield() {
      if (!isPaused) {
        updateStars();
        renderStars();
      }
      animationId = requestAnimationFrame(animateStarfield);
    }

    // Mouse tracking
    let mouseTimeout;
    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Create particle effect at mouse position occasionally
      if (Math.random() < 0.02) {
        stars.push({
          x: mouse.x + (Math.random() - 0.5) * 20,
          y: mouse.y + (Math.random() - 0.5) * 20,
          originalX: mouse.x + (Math.random() - 0.5) * 20,
          originalY: mouse.y + (Math.random() - 0.5) * 20,
          size: Math.random() * 1 + 0.5,
          alpha: 1,
          twinkle: 0,
          twinkleSpeed: 0.1,
          mouseInfluence: 0,
          temporary: true,
          life: 60 // frames
        });
      }
      
      // Remove temporary stars after their life expires
      stars = stars.filter(star => {
        if (star.temporary) {
          star.life--;
          star.alpha = star.life / 60;
          return star.life > 0;
        }
        return true;
      });
    });

    // Pause during scroll for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      isPaused = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isPaused = false;
      }, 100);
    }, { passive: true });

    // Initialize and start animation
    initStarfield();
    animateStarfield();

    // Resize handler
    window.addEventListener('resize', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        initStarfield();
      }, 250);
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
