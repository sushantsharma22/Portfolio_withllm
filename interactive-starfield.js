// Lightweight Star Field - Mobile Optimized
class SimpleStarField {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.shootingStars = [];
    this.mouse = { x: 0, y: 0 };
    this.mouseTarget = { x: 0, y: 0 };
    this.time = 0;
    this.isMobile = window.innerWidth < 768 || navigator.hardwareConcurrency < 4;
    this.isLowPerformance = navigator.hardwareConcurrency < 2 || window.innerWidth < 480;
    
    // Skip heavy animations on low-end devices
    if (this.isLowPerformance) {
      this.createStaticBackground();
      return;
    }
    
    this.init();
  }

  createStaticBackground() {
    // Create a simple CSS background for very low-end devices
    const bg = document.createElement('div');
    bg.id = 'simple-cosmic-bg';
    bg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -7;
      background: linear-gradient(135deg, #000013, #0B0C2A, #1E1B4B);
      pointer-events: none;
    `;
    document.body.appendChild(bg);
    console.log('🔧 Using static background for low-performance device');
    return;
  }

  init() {
    this.createCanvas();
    this.generateStars();
    this.setupEventListeners();
    this.render();
  }

  createCanvas() {
    // Remove existing canvas if any
    const existingCanvas = document.getElementById('star-field-canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'star-field-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-7';
    this.canvas.style.pointerEvents = 'none';
    this.updateThemeBackground();
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  updateThemeBackground() {
    // Always keep the cosmic background - only vary the star colors
    this.canvas.style.background = 'linear-gradient(135deg, #000013, #0B0C2A, #1E1B4B)';
  }

  getStarColor() {
    // Return star color based on color variant
    if (document.body.classList.contains('blue-variant')) {
      return '#4fc3f7';
    } else if (document.body.classList.contains('purple-variant')) {
      return '#ce93d8';
    } else if (document.body.classList.contains('green-variant')) {
      return '#81c784';
    } else if (document.body.classList.contains('red-variant')) {
      return '#f48fb1';
    } else {
      // Default cosmic color
      return '#06FFA5';
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateStars();
  }

  generateStars() {
    this.stars = [];
    // Drastically reduce stars for mobile
    let numStars;
    if (this.isMobile) {
      numStars = Math.min(50, Math.floor((this.canvas.width * this.canvas.height) / 20000)); // Much fewer stars
    } else {
      numStars = Math.min(120, Math.floor((this.canvas.width * this.canvas.height) / 10000));
    }
    
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        originalX: 0,
        originalY: 0,
        size: Math.random() * 1.5 + 0.5, // Smaller stars
        opacity: Math.random() * 0.6 + 0.4,
        speed: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.01 + 0.005 // Slower twinkle
      });
    }

    // Store original positions
    this.stars.forEach(star => {
      star.originalX = star.x;
      star.originalY = star.y;
    });
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resize());
    
    // Reduce mouse tracking frequency on mobile
    if (!this.isMobile) {
      document.addEventListener('mousemove', (e) => {
        this.mouseTarget.x = e.clientX;
        this.mouseTarget.y = e.clientY;
      });
    }

    // Reduce shooting star frequency drastically on mobile
    const shootingStarInterval = this.isMobile ? 8000 : 3000; // Much less frequent on mobile
    setInterval(() => {
      if (Math.random() < (this.isMobile ? 0.1 : 0.3)) { // Much lower chance on mobile
        this.createShootingStar();
      }
    }, shootingStarInterval);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      this.updateThemeBackground();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  updateMousePosition() {
    // Skip mouse effects on mobile
    if (this.isMobile) return;
    
    this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.03; // Slower response
    this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.03;
  }

  createShootingStar() {
    const side = Math.floor(Math.random() * 4);
    let startX, startY, endX, endY;

    switch (side) {
      case 0: // Top
        startX = Math.random() * this.canvas.width;
        startY = -50;
        endX = startX + (Math.random() - 0.5) * 400;
        endY = this.canvas.height + 50;
        break;
      case 1: // Right
        startX = this.canvas.width + 50;
        startY = Math.random() * this.canvas.height;
        endX = -50;
        endY = startY + (Math.random() - 0.5) * 400;
        break;
      case 2: // Bottom
        startX = Math.random() * this.canvas.width;
        startY = this.canvas.height + 50;
        endX = startX + (Math.random() - 0.5) * 400;
        endY = -50;
        break;
      case 3: // Left
        startX = -50;
        startY = Math.random() * this.canvas.height;
        endX = this.canvas.width + 50;
        endY = startY + (Math.random() - 0.5) * 400;
        break;
    }

    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    const duration = distance / (200 + Math.random() * 300);

    this.shootingStars.push({
      x: startX,
      y: startY,
      startX,
      startY,
      endX,
      endY,
      progress: 0,
      duration,
      opacity: 1,
      size: Math.random() * 2 + 1,
      trail: []
    });
  }

  drawStars() {
    const starColor = this.getStarColor();
    
    this.stars.forEach(star => {
      // Simplified mouse parallax effect (skip on mobile)
      if (!this.isMobile) {
        const dx = this.mouse.x - this.canvas.width / 2;
        const dy = this.mouse.y - this.canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.sqrt((this.canvas.width / 2) ** 2 + (this.canvas.height / 2) ** 2);
        const influence = Math.max(0, 1 - distance / maxDistance) * 0.0001; // Reduced influence

        star.x = star.originalX + dx * influence * (star.size + 1);
        star.y = star.originalY + dy * influence * (star.size + 1);
      }

      // Simplified twinkle effect
      star.twinkle += star.twinkleSpeed;
      const twinkleOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinkle));

      // Draw star with theme color (simplified)
      this.ctx.globalAlpha = twinkleOpacity;
      this.ctx.fillStyle = starColor;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Skip glow effect on mobile for performance
      if (!this.isMobile && star.size > 1.2) {
        this.ctx.globalAlpha = twinkleOpacity * 0.2;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
    
    this.ctx.globalAlpha = 1;
  }

  drawShootingStars() {
    // Skip shooting stars on very low-end devices
    if (this.isLowPerformance) return;
    
    const starColor = this.getStarColor();
    
    this.shootingStars = this.shootingStars.filter(star => {
      star.progress += 1 / star.duration;
      
      if (star.progress >= 1) return false;

      // Update position
      star.x = star.startX + (star.endX - star.startX) * star.progress;
      star.y = star.startY + (star.endY - star.startY) * star.progress;

      // Simplified trail (shorter on mobile)
      star.trail.push({ x: star.x, y: star.y });
      const maxTrail = this.isMobile ? 8 : 12; // Shorter trail on mobile
      if (star.trail.length > maxTrail) {
        star.trail.shift();
      }

      // Fade out towards the end
      star.opacity = Math.max(0, 1 - star.progress);

      // Simplified trail drawing
      this.ctx.strokeStyle = starColor;
      this.ctx.lineWidth = this.isMobile ? star.size * 0.5 : star.size;
      this.ctx.lineCap = 'round';

      // Draw trail with reduced complexity
      if (star.trail.length > 1) {
        this.ctx.globalAlpha = star.opacity * 0.6;
        this.ctx.beginPath();
        this.ctx.moveTo(star.trail[0].x, star.trail[0].y);
        for (let i = 1; i < star.trail.length; i++) {
          this.ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        this.ctx.stroke();
      }

      // Draw head (simplified)
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = starColor;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      return true;
    });
    
    this.ctx.globalAlpha = 1;
  }

  render() {
    // Use lower frame rate on mobile
    const targetFPS = this.isMobile ? 30 : 60;
    const frameDelay = 1000 / targetFPS;
    
    if (!this.lastFrameTime) this.lastFrameTime = 0;
    const currentTime = performance.now();
    
    if (currentTime - this.lastFrameTime >= frameDelay) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.updateMousePosition();
      this.drawStars();
      this.drawShootingStars();
      
      this.time += 0.016;
      this.lastFrameTime = currentTime;
    }
    
    requestAnimationFrame(() => this.render());
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SimpleStarField();
});
