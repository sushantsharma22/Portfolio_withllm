// Simple Star Field with Shooting Stars
class SimpleStarField {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.shootingStars = [];
    this.mouse = { x: 0, y: 0 };
    this.mouseTarget = { x: 0, y: 0 };
    this.time = 0;
    this.init();
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
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateStars() {
    this.stars = [];
    
    // Generate lots of stars with different sizes
    const starCount = window.innerWidth < 768 ? 400 : 800;
    
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        originalX: 0,
        originalY: 0,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        parallax: Math.random() * 0.3,
        z: Math.random() * 100 + 10
      });
    }

    // Set original positions
    this.stars.forEach(star => {
      star.originalX = star.x;
      star.originalY = star.y;
    });
  }

  setupEventListeners() {
    // Mouse movement for parallax effect
    document.addEventListener('mousemove', (e) => {
      this.mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.resize();
      this.generateStars();
    });

    // Touch support for mobile
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.mouseTarget.x = (touch.clientX / window.innerWidth - 0.5) * 2;
        this.mouseTarget.y = (touch.clientY / window.innerHeight - 0.5) * 2;
      }
    });
  }

  updateMousePosition() {
    // Smooth mouse following
    this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.02;
    this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.02;
  }

  createShootingStar() {
    // Create shooting stars randomly
    if (Math.random() < 0.003) {
      const side = Math.floor(Math.random() * 4);
      let startX, startY, endX, endY;
      
      switch(side) {
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
      
      this.shootingStars.push({
        x: startX,
        y: startY,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        tail: [],
        brightness: 0.8 + Math.random() * 0.2
      });
    }
  }

  drawStars() {
    this.stars.forEach(star => {
      // Calculate parallax offset
      const parallaxStrength = star.parallax * 15;
      const offsetX = this.mouse.x * parallaxStrength;
      const offsetY = this.mouse.y * parallaxStrength;

      // Update star position with parallax
      star.x = star.originalX + offsetX;
      star.y = star.originalY + offsetY;

      // Wrap around screen
      if (star.originalX > this.canvas.width + 50) star.originalX = -50;
      if (star.originalX < -50) star.originalX = this.canvas.width + 50;
      if (star.originalY > this.canvas.height + 50) star.originalY = -50;
      if (star.originalY < -50) star.originalY = this.canvas.height + 50;

      // 3D perspective
      const perspective = 1000;
      const scale = perspective / (perspective + star.z);
      const screenX = star.x * scale + this.canvas.width / 2 * (1 - scale);
      const screenY = star.y * scale + this.canvas.height / 2 * (1 - scale);
      const screenSize = star.size * scale;

      // Skip if off screen
      if (screenX < -50 || screenX > this.canvas.width + 50 || 
          screenY < -50 || screenY > this.canvas.height + 50) return;

      // Twinkling effect
      star.twinkle += star.twinkleSpeed;
      const twinkleIntensity = Math.sin(star.twinkle) * 0.3 + 0.7;
      const opacity = star.brightness * twinkleIntensity * scale;

      // Get theme-appropriate star color
      const starColor = this.getStarColor();

      // Draw star with theme color
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
      this.ctx.fillStyle = starColor;
      this.ctx.globalAlpha = opacity;
      this.ctx.fill();

      // Add sparkle effect for larger stars
      if (screenSize > 1.5 && star.brightness > 0.6) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = starColor;
        this.ctx.lineWidth = screenSize * 0.2;
        this.ctx.globalAlpha = opacity * 0.5;
        
        const spikeLength = screenSize * 2;
        // Vertical spike
        this.ctx.moveTo(screenX, screenY - spikeLength);
        this.ctx.lineTo(screenX, screenY + spikeLength);
        
        // Horizontal spike
        this.ctx.moveTo(screenX - spikeLength, screenY);
        this.ctx.lineTo(screenX + spikeLength, screenY);
        
        this.ctx.stroke();
      }
      
      this.ctx.globalAlpha = 1;
    });
  }

  drawShootingStars() {
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const shootingStar = this.shootingStars[i];
      
      // Update position
      shootingStar.progress += shootingStar.speed;
      shootingStar.x = shootingStar.startX + (shootingStar.endX - shootingStar.startX) * shootingStar.progress;
      shootingStar.y = shootingStar.startY + (shootingStar.endY - shootingStar.startY) * shootingStar.progress;
      
      // Add to tail
      shootingStar.tail.push({ x: shootingStar.x, y: shootingStar.y });
      if (shootingStar.tail.length > 20) {
        shootingStar.tail.shift();
      }
      
      // Draw tail
      const starColor = this.getStarColor();
      for (let j = 0; j < shootingStar.tail.length; j++) {
        const tailPoint = shootingStar.tail[j];
        const tailOpacity = (j / shootingStar.tail.length) * shootingStar.brightness * 0.8;
        const tailSize = (j / shootingStar.tail.length) * 3;
        
        this.ctx.beginPath();
        this.ctx.arc(tailPoint.x, tailPoint.y, tailSize, 0, Math.PI * 2);
        this.ctx.fillStyle = starColor;
        this.ctx.globalAlpha = tailOpacity;
        this.ctx.fill();
      }
      
      // Draw main shooting star
      this.ctx.beginPath();
      this.ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = starColor;
      this.ctx.globalAlpha = shootingStar.brightness;
      this.ctx.fill();
      
      // Remove if finished
      if (shootingStar.progress >= 1) {
        this.shootingStars.splice(i, 1);
      }
    }
    this.ctx.globalAlpha = 1;
  }

  render() {
    // Clear with black background
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update mouse position
    this.updateMousePosition();

    // Create shooting stars randomly
    this.createShootingStar();

    // Draw all elements
    this.drawStars();
    this.drawShootingStars();

    requestAnimationFrame(() => this.render());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

// Initialize on page load
window.addEventListener('load', () => {
  const starfield = new SimpleStarField();
  
  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        starfield.updateThemeBackground();
      }
    });
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
});

// Expose starfield globally for theme updates
window.starfieldInstance = null;

// Preload any additional resources if needed
window.addEventListener('DOMContentLoaded', () => {
  // Additional initialization if required
});
