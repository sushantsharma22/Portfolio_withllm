document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio Loading - Mobile Optimized Version');
  
  // ==========================================
  // PERFORMANCE MONITORING & MOBILE DETECTION
  // ==========================================
  
  const startTime = performance.now();
  const deviceInfo = {
    isMobile: window.innerWidth < 768,
    isLowEnd: navigator.hardwareConcurrency < 4,
    isVeryLowEnd: navigator.hardwareConcurrency < 2 || window.innerWidth < 480,
    cores: navigator.hardwareConcurrency,
    screenWidth: window.innerWidth,
    userAgent: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
  };
  
  console.log('📱 Device Info:', deviceInfo);
  
  // AGGRESSIVE MOBILE OPTIMIZATIONS
  if (deviceInfo.isMobile || deviceInfo.isLowEnd) {
    console.log('🔧 Applying mobile optimizations...');
    
    // Disable heavy animations on mobile
    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.animation = 'fadeInMobile 0.3s ease-out forwards';
    });
    
    // Reduce scroll listeners
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    window.onscroll = function() {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        if (originalScrollHandler) originalScrollHandler();
        scrollTimeout = null;
      }, 16); // 60fps max
    };
  }
  
  // Measure initial load performance
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
  });
  
  // ==========================================
  // ULTRA-LIGHTWEIGHT STARFIELD (MOBILE OPTIMIZED)
  // ==========================================
  
  const starfieldCanvas = document.getElementById('starfield-canvas');
  if (starfieldCanvas && !deviceInfo.isVeryLowEnd) {
    const ctx = starfieldCanvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let animationId;
    let lastFrameTime = 0;
    const targetFPS = deviceInfo.isMobile ? 20 : 30; // Even lower FPS for mobile
    const frameInterval = 1000 / targetFPS;

    // Initialize starfield with fewer stars
    function initStarfield() {
      starfieldCanvas.width = window.innerWidth;
      starfieldCanvas.height = window.innerHeight;
      
      stars = [];
      shootingStars = [];
      
      // Drastically reduce stars for mobile
      const numStars = deviceInfo.isVeryLowEnd ? 30 : 
                       deviceInfo.isMobile ? 50 : 80;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * starfieldCanvas.width,
          y: Math.random() * starfieldCanvas.height,
          size: Math.random() * 1 + 0.5,
          alpha: Math.random() * 0.4 + 0.6,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.01 + 0.003, // Much slower twinkling
        });
      }
    }

    // Create shooting star (much less frequent for mobile)
    function createShootingStar() {
      if (deviceInfo.isMobile && shootingStars.length > 1) return; // Limit shooting stars on mobile
      
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      
      switch(side) {
        case 0: // Top
          x = Math.random() * starfieldCanvas.width;
          y = -50;
          vx = (Math.random() - 0.5) * 1.5;
          vy = Math.random() * 1.5 + 0.8;
          break;
        case 1: // Right
          x = starfieldCanvas.width + 50;
          y = Math.random() * starfieldCanvas.height;
          vx = -(Math.random() * 1.5 + 0.8);
          vy = (Math.random() - 0.5) * 1.5;
          break;
        case 2: // Bottom
          x = Math.random() * starfieldCanvas.width;
          y = starfieldCanvas.height + 50;
          vx = (Math.random() - 0.5) * 1.5;
          vy = -(Math.random() * 1.5 + 0.8);
          break;
        case 3: // Left
          x = -50;
          y = Math.random() * starfieldCanvas.height;
          vx = Math.random() * 1.5 + 0.8;
          vy = (Math.random() - 0.5) * 1.5;
          break;
      }
      
      shootingStars.push({
        x, y, vx, vy,
        length: deviceInfo.isMobile ? 20 : 30, // Shorter trails on mobile
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
        trail: []
      });
    }

    // Update stars (ultra-lightweight)
    function updateStars() {
      // Update twinkling (skip some frames on mobile)
      const skipFrames = deviceInfo.isMobile ? Math.random() < 0.7 : true;
      if (skipFrames) {
        stars.forEach(star => {
          star.twinkle += star.twinkleSpeed;
          star.alpha = Math.sin(star.twinkle) * 0.2 + 0.8;
        });
      }
      
      // Update shooting stars
      shootingStars.forEach((shootingStar, index) => {
        // Add current position to trail (less frequently on mobile)
        if (!deviceInfo.isMobile || Math.random() < 0.8) {
          shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y });
        }
        
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
      
      // Create shooting stars much less frequently on mobile
      const shootingStarChance = deviceInfo.isMobile ? 0.0005 : 0.001;
      if (Math.random() < shootingStarChance) {
        createShootingStar();
      }
    }

    // Render everything (ultra-optimized for mobile)
    function renderStars() {
      ctx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
      
      // Render twinkling stars (simplified on mobile)
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Skip glow effect on mobile for performance
        if (!deviceInfo.isMobile && star.size > 1) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Render shooting stars (simplified)
      shootingStars.forEach(shootingStar => {
        if (shootingStar.trail.length > 1) {
          // Simplified trail rendering for mobile
          if (deviceInfo.isMobile) {
            // Simple line instead of gradient
            ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(shootingStar.trail[0].x, shootingStar.trail[0].y);
            ctx.lineTo(shootingStar.x, shootingStar.y);
            ctx.stroke();
          } else {
            // Full trail for desktop
            ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(shootingStar.trail[0].x, shootingStar.trail[0].y);
            
            for (let i = 1; i < shootingStar.trail.length; i++) {
              ctx.lineTo(shootingStar.trail[i].x, shootingStar.trail[i].y);
            }
            ctx.stroke();
          }
        }
        
        // Shooting star head (simplified on mobile)
        ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, deviceInfo.isMobile ? 1 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Frame rate limited animation loop
    function animateStarfield(currentTime) {
      if (currentTime - lastFrameTime >= frameInterval) {
        updateStars();
        renderStars();
        lastFrameTime = currentTime;
      }
      animationId = requestAnimationFrame(animateStarfield);
    }

    // Initialize and start
    initStarfield();
    animateStarfield(0);

    // Resize handler with debouncing
    window.addEventListener('resize', () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(initStarfield, 250);
    });
  } else if (deviceInfo.isVeryLowEnd) {
    // Disable starfield completely on very low-end devices
    console.log('🚫 Starfield disabled for very low-end device');
  }
  // ==========================================
  // MOBILE-OPTIMIZED SCROLL PERFORMANCE
  // ==========================================
  
  function optimizeForDevice() {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4;
    const isVeryLowEnd = navigator.hardwareConcurrency < 2 || window.innerWidth < 480;
    
    console.log('🔧 Device optimization:', { isMobile, isLowEnd, isVeryLowEnd, cores: navigator.hardwareConcurrency });
    
    if (isMobile || isLowEnd) {
      // Disable ALL heavy background animations
      const neuralBg = document.getElementById('neural-network-bg');
      const quantumField = document.getElementById('quantum-field');
      const matrixCanvas = document.getElementById('matrix-canvas');
      
      if (neuralBg) neuralBg.style.display = 'none';
      if (quantumField) quantumField.style.display = 'none';
      if (matrixCanvas) matrixCanvas.style.display = 'none';
      
      // Remove ALL particle effects
      const particles = document.querySelectorAll('.particle, .quantum-particle, .ai-particle');
      particles.forEach(p => p.remove());
      
      // Disable AI particles creation
      const particleContainer = document.querySelector('.ai-particles');
      if (particleContainer) particleContainer.remove();
      
      // Simplify animations
      document.documentElement.style.setProperty('--animation-duration', '1s');
      document.documentElement.style.setProperty('--transition-duration', '0.2s');
      
      console.log('🔧 Heavy animations disabled for mobile/low-end device');
    }
    
    if (isVeryLowEnd) {
      // Disable even more animations for very low-end devices
      const glitchElements = document.querySelectorAll('.glitch-text');
      glitchElements.forEach(el => {
        el.style.animation = 'none';
        el.style.textShadow = 'none';
      });
      
      // Disable title switching animation
      const titles = document.querySelectorAll('.title-item');
      titles.forEach((title, index) => {
        if (index !== 0) title.style.display = 'none';
      });
      
      console.log('🔧 Ultra-lightweight mode enabled for very low-end device');
    }
  }
  // ==========================================
  // SERVICE WORKER REGISTRATION FOR PERFORMANCE
  // ==========================================
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('❌ Service Worker registration failed:', error);
        });
    });
  }

  // Initialize optimization immediately
  optimizeForDevice();

  // ==========================================
  // LIGHTWEIGHT HEADER SCROLL - THROTTLED
  // ==========================================
  
  // ==========================================
  // UNIFIED SCROLL PERFORMANCE OPTIMIZATION
  // ==========================================
  
  let headerScrollTimeout;
  let isScrolling = false;
  let scrollTimeout;
  const header = document.querySelector('.futuristic-header');
  
  function handleOptimizedScroll() {
    if (isScrolling) return;
    isScrolling = true;
    
    requestAnimationFrame(() => {
      // Header scroll logic
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      
      // Add any other scroll-based logic here
      isScrolling = false;
    });
  }
  
  // ==========================================
  // IMAGE LAZY LOADING FOR MOBILE PERFORMANCE
  // ==========================================
  
  if (deviceInfo.isMobile) {
    // Add intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px' // Load images 50px before they come into view
    });
    
    // Observe all project images
    document.querySelectorAll('.project-image img').forEach(img => {
      if (img.src && img.src.includes('unsplash')) {
        // Convert to smaller mobile-optimized URLs
        const mobileUrl = img.src.replace('w=400&h=250', 'w=300&h=200&q=60');
        img.dataset.src = mobileUrl;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect width="100%25" height="100%25" fill="%23000013"/%3E%3C/svg%3E';
        imageObserver.observe(img);
      }
    });
  }
  
  // Use passive listeners for better scroll performance on mobile
  const scrollOptions = deviceInfo.isMobile ? { passive: true } : {};
  window.addEventListener('scroll', handleOptimizedScroll, scrollOptions);
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateHeaderScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

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
  // COLOR VARIANT SWITCHER SYSTEM (COSMIC THEME BASE)
  // ==========================================
  
  const themeToggle = document.getElementById('theme-toggle');
  const colorVariants = ['default', 'blue-variant', 'purple-variant', 'green-variant', 'red-variant'];
  const variantNames = ['Cosmic Default', 'Cosmic Blue', 'Cosmic Purple', 'Cosmic Green', 'Cosmic Pink'];
  const variantIcons = ['🌌', '💙', '💜', '💚', '💖'];
  
  let currentVariantIndex = 0;
  
  // Load saved variant from localStorage
  const savedVariant = localStorage.getItem('portfolio-color-variant');
  if (savedVariant) {
    const variantIndex = colorVariants.indexOf(savedVariant);
    if (variantIndex !== -1) {
      currentVariantIndex = variantIndex;
      if (savedVariant !== 'default') {
        document.body.classList.add(savedVariant);
      }
    }
  }
  
  // Update theme button icon
  function updateVariantIcon() {
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        // Update icon to represent current variant
        icon.className = 'fas fa-palette';
        themeToggle.setAttribute('title', `Current: ${variantNames[currentVariantIndex]} - Click to change colors`);
        
        // Add variant indicator with emoji
        let indicator = themeToggle.querySelector('.theme-indicator');
        if (!indicator) {
          indicator = document.createElement('span');
          indicator.className = 'theme-indicator';
          indicator.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 12px;
            background: var(--glass-cosmic);
            border: 1px solid var(--glass-border-cosmic);
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
          `;
          themeToggle.appendChild(indicator);
        }
        indicator.textContent = variantIcons[currentVariantIndex];
      }
    }
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Remove current variant
      if (currentVariantIndex !== 0) {
        document.body.classList.remove(colorVariants[currentVariantIndex]);
      }
      
      // Move to next variant
      currentVariantIndex = (currentVariantIndex + 1) % colorVariants.length;
      
      // Apply new variant
      if (currentVariantIndex !== 0) {
        document.body.classList.add(colorVariants[currentVariantIndex]);
      }
      
      // Save variant preference
      localStorage.setItem('portfolio-color-variant', colorVariants[currentVariantIndex]);
      
      // Update icon
      updateVariantIcon();
      
      // Show variant change notification
      showVariantNotification();
      
      console.log(`🎨 Color variant changed to: ${variantNames[currentVariantIndex]}`);
    });
    
    // Initialize icon
    updateVariantIcon();
  }
  
  // Variant change notification
  function showVariantNotification() {
    let notification = document.querySelector('.theme-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'theme-notification';
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-cosmic);
        border: 1px solid var(--glass-border-cosmic);
        border-radius: 15px;
        padding: 15px 20px;
        color: var(--neutron-white);
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 500;
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      `;
      document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">${variantIcons[currentVariantIndex]}</span>
        <div>
          <div style="font-size: 14px; opacity: 0.8;">Color Changed</div>
          <div style="font-size: 16px; font-weight: 600;">${variantNames[currentVariantIndex]}</div>
        </div>
      </div>
    `;
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
    }, 3000);
  }

  // ==========================================
  // SIMPLIFIED TITLE SYSTEM (PERFORMANCE FOCUSED)
  // ==========================================
  
  // Simplified title rotation with minimal animation
  const titles = document.querySelectorAll('.title-item');
  let currentTitle = 0;
  
  if (titles.length > 0) {
    // Initialize - show only first title
    titles.forEach((title, index) => {
      if (index !== 0) {
        title.style.display = 'none';
      } else {
        title.classList.add('active');
      }
    });
    
    function switchTitle() {
      // Hide current title
      titles[currentTitle].style.display = 'none';
      titles[currentTitle].classList.remove('active');
      
      // Show next title
      currentTitle = (currentTitle + 1) % titles.length;
      titles[currentTitle].style.display = 'block';
      titles[currentTitle].classList.add('active');
    }
    
    // Switch every 4 seconds - less frequent for better performance
    setInterval(switchTitle, 4000);
    console.log('✅ Simplified title system initialized');
  }
  
  // ==========================================
  // MOBILE-OPTIMIZED AI PARTICLES (DISABLED ON MOBILE)
  // ==========================================
  
  function createAIParticles() {
    // Skip particles entirely on mobile
    if (window.innerWidth < 768 || navigator.hardwareConcurrency < 4) {
      console.log('🔧 AI particles disabled for mobile/low-end device');
      return;
    }
    
    const heroSection = document.querySelector('#hero');
    const glitchText = document.querySelector('.glitch-text');
    
    if (!heroSection || !glitchText) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ai-particles';
    particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    heroSection.appendChild(particleContainer);
    
    // Create fewer floating AI particles for performance
    for (let i = 0; i < 8; i++) { // Reduced from 20 to 8
      createAIParticle(particleContainer);
    }
  }
  
  function createAIParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'ai-particle';
    
    // Random starting position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 2 + 1; // Smaller particles
    const duration = Math.random() * 15 + 8; // Shorter duration
    
    particle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, var(--plasma-cyan), transparent);
      border-radius: 50%;
      opacity: ${Math.random() * 0.6 + 0.2};
      animation: floatAI ${duration}s linear infinite;
      box-shadow: 0 0 5px var(--plasma-cyan);
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
        createAIParticle(container);
      }
    }, duration * 1000);
  }
  
  // Initialize AI particles
  createAIParticles();

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
  // SIMPLIFIED SCROLL ANIMATIONS
  // ==========================================
  
  // Simple show/hide without heavy transitions
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.visibility = 'visible';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.visibility = 'hidden';
    fadeObserver.observe(element);
  });

  // ==========================================
  // SIMPLIFIED SKILL BAR ANIMATIONS
  // ==========================================
  
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        // Instant animation for performance
        setTimeout(() => {
          bar.style.width = progress + '%';
        }, index * 20); // Minimal delay
      }
    });
  }
  
  // Observe skills section for skill bar animation
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
  }
  
  // Fallback: animate skill bars after page load if not triggered by observer
  setTimeout(() => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const hasAnimated = Array.from(skillBars).some(bar => 
      parseInt(bar.style.width) > 0
    );
    
    if (!hasAnimated && skillBars.length > 0) {
      console.log('🔧 Triggering skill bar animation fallback');
      animateSkillBars();
    }
  }, 3000);

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
  // AI ASSISTANT (THOUGHT BUBBLES)
  // ==========================================
  
  const aiAssistant = document.getElementById('ai-assistant');
  if (aiAssistant) {
    const thoughtMessages = [
      "Hey there! I'm RON, Sushant's AI assistant. I know everything about his amazing work and achievements.",
      "Did you know Sushant has 25+ GitHub repositories? Each one showcases his incredible coding skills!",
      "He's explored over 100 technologies! From Python and AI to advanced transformer architectures.",
      "His EdgeBEV-Transformer project is mind-blowing - real-time AI for autonomous vehicles on edge devices!",
      "Sushant saved ₹8,00,000 annually by replacing consultants with his custom ML analytics. Impressive!",
      "He's available for full-time opportunities starting May 2025 at University of Windsor. Perfect timing!",
      "His expertise spans Machine Learning, Computer Vision, NLP, and cutting-edge AI research.",
      "Check out his PyTorch and TensorFlow projects - they're absolutely brilliant!",
      "He's published research on sentiment analysis and organized 50+ coding events with 200+ participants.",
      "From Django web apps to NVIDIA DeepStream - Sushant's portfolio is incredibly diverse!",
      "His multimodal AI systems and neural network architectures are truly next-level stuff.",
      "Want to know more? I've got tons of insights about his projects and achievements!"
    ];
    
    let thoughtIndex = 0;
    let isExpanded = false;
    const chatBubble = document.getElementById('ai-chat');
    
    if (chatBubble) {
      // Remove hover effects - no preview message
      aiAssistant.addEventListener('mouseenter', () => {
        if (!isExpanded) {
          aiAssistant.style.filter = 'brightness(1.2)';
        }
      });
      
      aiAssistant.addEventListener('mouseleave', () => {
        if (!isExpanded) {
          aiAssistant.style.filter = 'brightness(1)';
        }
      });
      
      // Click handler - show thought bubbles
      aiAssistant.addEventListener('click', (e) => {
        if (!isExpanded) {
          // First click - show welcome thought
          isExpanded = true;
          aiAssistant.classList.add('expanded');
          
          // Show typing indicator briefly
          chatBubble.innerHTML = `
            <div class="ai-typing">
              RON thinking
              <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
              </div>
            </div>
          `;
          
          // Show first thought after brief delay
          setTimeout(() => {
            showThought(thoughtMessages[0]);
            thoughtIndex = 1;
          }, 1000);
          
        } else {
          // Show next thought
          const thought = thoughtMessages[thoughtIndex];
          showThought(thought);
          thoughtIndex = (thoughtIndex + 1) % thoughtMessages.length;
        }
        
        // Add visual feedback
        aiAssistant.style.transform = 'scale(1.05)';
        setTimeout(() => {
          aiAssistant.style.transform = 'scale(1)';
        }, 150);
      });
      
      // Click outside to collapse
      document.addEventListener('click', (e) => {
        if (!aiAssistant.contains(e.target) && isExpanded) {
          isExpanded = false;
          thoughtIndex = 0;
          aiAssistant.classList.remove('expanded');
          chatBubble.innerHTML = '';
        }
      });
      
      // Function to show a thought bubble
      function showThought(message) {
        chatBubble.innerHTML = `<p class="ai-thought"></p>`;
        const thoughtElement = chatBubble.querySelector('.ai-thought');
        
        // Typing effect for the thought
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < message.length) {
            thoughtElement.textContent = thoughtElement.textContent.replace('💭 ', '') + message.charAt(i);
            // Re-add the thought emoji
            thoughtElement.textContent = '💭 ' + thoughtElement.textContent.replace('💭 ', '');
            i++;
          } else {
            clearInterval(typeInterval);
          }
        }, 25);
      }
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
