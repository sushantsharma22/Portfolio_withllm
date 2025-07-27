// 3D Interactive Star Field with Mouse Parallax
class InteractiveStarField {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.mouse = { x: 0, y: 0 };
    this.mouseTarget = { x: 0, y: 0 };
    this.time = 0;
    this.layers = [
      { count: 100, speed: 0.5, size: 1, depth: 100 },
      { count: 80, speed: 0.8, size: 2, depth: 50 },
      { count: 60, speed: 1.2, size: 3, depth: 25 },
      { count: 40, speed: 1.8, size: 4, depth: 10 }
    ];
    this.init();
  }

  init() {
    this.createCanvas();
    this.generateStars();
    this.setupEventListeners();
    this.animate();
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
    this.canvas.style.opacity = '0.9';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateStars() {
    this.stars = [];
    
    this.layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        this.stars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          z: Math.random() * layer.depth + layerIndex * 25,
          originalX: 0,
          originalY: 0,
          size: layer.size * (0.5 + Math.random() * 0.5),
          speed: layer.speed,
          layer: layerIndex,
          twinkle: Math.random() * Math.PI * 2,
          color: this.getStarColor(),
          brightness: 0.3 + Math.random() * 0.7
        });
      }
    });

    // Set original positions
    this.stars.forEach(star => {
      star.originalX = star.x;
      star.originalY = star.y;
    });
  }

  getStarColor() {
    const colors = [
      '#FFFFFF', // white
      '#06FFA5', // plasma-cyan
      '#0EA5E9', // star-blue
      '#8B5CF6', // stardust-gray
      '#EC4899', // cosmic-pink
      '#FFF700', // yellow
      '#FF6B6B'  // coral
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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

  drawStars() {
    this.stars.forEach(star => {
      // Calculate parallax offset based on mouse and layer depth
      const parallaxStrength = 30 / (star.layer + 1);
      const offsetX = this.mouse.x * parallaxStrength;
      const offsetY = this.mouse.y * parallaxStrength;

      // Update star position with parallax
      star.x = star.originalX + offsetX;
      star.y = star.originalY + offsetY;

      // Move stars slowly
      star.originalX += star.speed * 0.1;
      star.originalY += Math.sin(this.time * 0.001 + star.x * 0.001) * 0.2;

      // Wrap around screen
      if (star.originalX > this.canvas.width + 100) {
        star.originalX = -100;
        star.originalY = Math.random() * this.canvas.height;
      }

      // 3D perspective calculation
      const perspective = 1000;
      const scale = perspective / (perspective + star.z);
      const screenX = star.x * scale + this.canvas.width / 2 * (1 - scale);
      const screenY = star.y * scale + this.canvas.height / 2 * (1 - scale);
      const screenSize = star.size * scale;

      // Skip if off screen
      if (screenX < -50 || screenX > this.canvas.width + 50 || 
          screenY < -50 || screenY > this.canvas.height + 50) return;

      // Twinkling effect
      star.twinkle += 0.02;
      const twinkleIntensity = Math.sin(star.twinkle) * 0.3 + 0.7;
      const opacity = star.brightness * twinkleIntensity * scale;

      // Draw star glow
      const glowSize = screenSize * 3;
      const glowGradient = this.ctx.createRadialGradient(
        screenX, screenY, 0,
        screenX, screenY, glowSize
      );
      glowGradient.addColorStop(0, star.color + Math.floor(opacity * 0.3 * 255).toString(16).padStart(2, '0'));
      glowGradient.addColorStop(1, 'transparent');

      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2);
      this.ctx.fillStyle = glowGradient;
      this.ctx.fill();

      // Draw star core
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = opacity;
      this.ctx.fill();

      // Draw star spikes for brighter stars
      if (star.brightness > 0.7 && screenSize > 2) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = star.color;
        this.ctx.lineWidth = screenSize * 0.3;
        this.ctx.globalAlpha = opacity * 0.8;
        
        // Vertical spike
        this.ctx.moveTo(screenX, screenY - screenSize * 2);
        this.ctx.lineTo(screenX, screenY + screenSize * 2);
        
        // Horizontal spike
        this.ctx.moveTo(screenX - screenSize * 2, screenY);
        this.ctx.lineTo(screenX + screenSize * 2, screenY);
        
        this.ctx.stroke();
      }
    });
  }

  drawConnections() {
    // Draw subtle connections between nearby stars for depth
    for (let i = 0; i < this.stars.length; i += 3) {
      const star1 = this.stars[i];
      const star2 = this.stars[i + 1] || this.stars[0];
      
      if (star1.layer === star2.layer) {
        const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
        
        if (distance < 150) {
          const opacity = (150 - distance) / 150 * 0.1;
          
          this.ctx.beginPath();
          this.ctx.moveTo(star1.x, star1.y);
          this.ctx.lineTo(star2.x, star2.y);
          this.ctx.strokeStyle = `rgba(6, 255, 165, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateMousePosition();
    this.drawConnections();
    this.drawStars();
    
    this.time++;
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the interactive star field
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    new InteractiveStarField();
  }, 100);
});
