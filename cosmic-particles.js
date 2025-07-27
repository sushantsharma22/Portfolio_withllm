// Ultra-Advanced 3D Cosmic Particle System
class CosmicParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.wormholes = [];
    this.stars = [];
    this.time = 0;
    this.init();
  }

  init() {
    this.createCanvas();
    this.generateStars();
    this.generateWormholes();
    this.generateParticles();
    this.animate();
    this.handleResize();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cosmic-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-5';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.8';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateStars() {
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2,
        color: this.getCosmicColor(),
        twinklePhase: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.5
      });
    }
  }

  generateWormholes() {
    const wormholeCount = 3;
    for (let i = 0; i < wormholeCount; i++) {
      this.wormholes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 50 + Math.random() * 100,
        rotation: 0,
        speed: 0.01 + Math.random() * 0.02,
        opacity: 0.1 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  generateParticles() {
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
        color: this.getCosmicColor(),
        life: 1,
        decay: 0.005 + Math.random() * 0.01,
        trail: []
      });
    }
  }

  getCosmicColor() {
    const colors = [
      '#06FFA5', // plasma-cyan
      '#EC4899', // cosmic-pink
      '#0EA5E9', // star-blue
      '#8B5CF6', // stardust-gray
      '#10B981', // aurora-green
      '#FFFFFF'  // neutron-white
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  drawStars() {
    this.stars.forEach(star => {
      const screenX = (star.x / (star.z / 1000)) + this.canvas.width / 2;
      const screenY = (star.y / (star.z / 1000)) + this.canvas.height / 2;
      
      if (screenX < 0 || screenX > this.canvas.width || 
          screenY < 0 || screenY > this.canvas.height) return;

      const twinkle = Math.sin(this.time * 0.01 + star.twinklePhase) * 0.5 + 0.5;
      const size = star.size * (1000 / star.z) * (0.5 + twinkle * 0.5);
      
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = twinkle * 0.8;
      this.ctx.fill();
      
      // Star glow
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = twinkle * 0.1;
      this.ctx.fill();
      
      // Move stars
      star.z -= star.speed;
      if (star.z <= 0) {
        star.z = 1000;
        star.x = Math.random() * this.canvas.width;
        star.y = Math.random() * this.canvas.height;
      }
    });
  }

  drawWormholes() {
    this.wormholes.forEach(wormhole => {
      const pulse = Math.sin(this.time * 0.02 + wormhole.pulsePhase) * 0.3 + 0.7;
      const currentRadius = wormhole.radius * pulse;
      
      // Draw wormhole spiral
      const segments = 64;
      this.ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 4 + wormhole.rotation;
        const spiralRadius = currentRadius * (1 - i / segments);
        const x = wormhole.x + Math.cos(angle) * spiralRadius;
        const y = wormhole.y + Math.sin(angle) * spiralRadius;
        
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      
      this.ctx.strokeStyle = '#06FFA5';
      this.ctx.lineWidth = 2;
      this.ctx.globalAlpha = wormhole.opacity * pulse;
      this.ctx.stroke();
      
      // Wormhole center glow
      const gradient = this.ctx.createRadialGradient(
        wormhole.x, wormhole.y, 0,
        wormhole.x, wormhole.y, currentRadius
      );
      gradient.addColorStop(0, 'rgba(6, 255, 165, 0.3)');
      gradient.addColorStop(1, 'rgba(6, 255, 165, 0)');
      
      this.ctx.beginPath();
      this.ctx.arc(wormhole.x, wormhole.y, currentRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      wormhole.rotation += wormhole.speed;
    });
  }

  drawParticles() {
    this.particles.forEach((particle, index) => {
      // Update particle position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z -= particle.vz;
      
      // 3D projection
      const scale = 500 / (500 + particle.z);
      const screenX = particle.x * scale + this.canvas.width / 2;
      const screenY = particle.y * scale + this.canvas.height / 2;
      const screenSize = particle.size * scale;
      
      // Add to trail
      particle.trail.push({ x: screenX, y: screenY, opacity: particle.life });
      if (particle.trail.length > 10) particle.trail.shift();
      
      // Draw particle trail
      this.ctx.beginPath();
      particle.trail.forEach((point, i) => {
        if (i === 0) this.ctx.moveTo(point.x, point.y);
        else this.ctx.lineTo(point.x, point.y);
      });
      this.ctx.strokeStyle = particle.color;
      this.ctx.lineWidth = screenSize * 0.5;
      this.ctx.globalAlpha = particle.life * 0.5;
      this.ctx.stroke();
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.life;
      this.ctx.fill();
      
      // Particle glow
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, screenSize * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.life * 0.3;
      this.ctx.fill();
      
      // Update particle life
      particle.life -= particle.decay;
      
      // Reset particle if dead or out of bounds
      if (particle.life <= 0 || particle.z <= 0) {
        particle.x = (Math.random() - 0.5) * this.canvas.width;
        particle.y = (Math.random() - 0.5) * this.canvas.height;
        particle.z = 500;
        particle.life = 1;
        particle.color = this.getCosmicColor();
        particle.trail = [];
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'lighter';
    
    this.drawStars();
    this.drawWormholes();
    this.drawParticles();
    
    this.time++;
    
    requestAnimationFrame(() => this.animate());
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
}

// Initialize cosmic particle system
document.addEventListener('DOMContentLoaded', () => {
  new CosmicParticleSystem();
});
