document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
    });
  }

  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  // Function to handle scroll animations and active nav links
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class for fade-in animation
        entry.target.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));

        // Update nav link active state
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      } else {
        // Optionally remove visible class when out of view
        entry.target.querySelectorAll('.fade-in').forEach(el => el.classList.remove('visible'));
      }
    });
  }, { threshold: 0.3 }); // Adjust threshold as needed

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Global Particle Background (Cosmic Starfield with Black Hole, Pulsars, Supernovas, and Nebulae)
  const globalParticleContainer = document.getElementById('global-particle-container');
  if (globalParticleContainer) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    globalParticleContainer.appendChild(canvas);

    let particles = [];
    const numParticles = 5000; // Vastly increased particle count

    let blackHole = { x: canvas.width / 2, y: canvas.height / 2, radius: 50, eventHorizon: 100 };
    let pulsars = [
      { x: canvas.width * 0.2, y: canvas.height * 0.8, radius: 10, pulse: 0, maxPulse: 20, color: 'rgba(255, 0, 0, 0.8)' }, // Red pulsar
      { x: canvas.width * 0.7, y: canvas.height * 0.3, radius: 12, pulse: 0, maxPulse: 25, color: 'rgba(0, 0, 255, 0.8)' },  // Blue pulsar
      { x: canvas.width * 0.1, y: canvas.height * 0.1, radius: 8, pulse: 0, maxPulse: 15, color: 'rgba(255, 165, 0, 0.7)' }, // Orange pulsar
      { x: canvas.width * 0.9, y: canvas.height * 0.9, radius: 15, pulse: 0, maxPulse: 30, color: 'rgba(0, 255, 255, 0.7)' },  // Cyan pulsar
      { x: canvas.width * 0.4, y: canvas.height * 0.6, radius: 11, pulse: 0, maxPulse: 22, color: 'rgba(255, 0, 255, 0.7)' }, // Magenta pulsar
      { x: canvas.width * 0.6, y: canvas.height * 0.15, radius: 9, pulse: 0, maxPulse: 18, color: 'rgba(0, 255, 0, 0.7)' }   // Green pulsar
    ];
    let supernovas = [];
    let nebulae = [];

    function resizeCanvas() {
      canvas.width = globalParticleContainer.offsetWidth;
      canvas.height = globalParticleContainer.offsetHeight;
      // Recenter black hole and pulsars on resize
      blackHole.x = canvas.width / 2;
      blackHole.y = canvas.height / 2;
      pulsars[0].x = canvas.width * 0.2;
      pulsars[0].y = canvas.height * 0.8;
      pulsars[1].x = canvas.width * 0.7;
      pulsars[1].y = canvas.height * 0.3;
      pulsars[2].x = canvas.width * 0.1;
      pulsars[2].y = canvas.height * 0.1;
      pulsars[3].x = canvas.width * 0.9;
      pulsars[3].y = canvas.height * 0.9;
      pulsars[4].x = canvas.width * 0.4;
      pulsars[4].y = canvas.height * 0.6;
      pulsars[5].x = canvas.width * 0.6;
      pulsars[5].y = canvas.height * 0.15;

      // Reinitialize nebulae on resize
      initNebulae();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2; // Depth for parallax effect
        this.size = Math.random() * 1.2 + 0.3; // Varying sizes
        this.speedX = (Math.random() - 0.5) * 0.05; // Very subtle movement
        this.speedY = (Math.random() - 0.5) * 0.05;
        const starColors = ['255, 255, 255', '200, 220, 255', '255, 200, 200', '200, 255, 200']; // White, blue-white, red-white, green-white
        const randomStarColor = starColors[Math.floor(Math.random() * starColors.length)];
        this.color = `rgba(${randomStarColor}, ${Math.random() * 0.8 + 0.2})`; // Varying opacity for twinkle
      }

      update() {
        this.x += this.speedX * this.z;
        this.y += this.speedY * this.z;

        // Gravity effect towards black hole
        const dx_bh = blackHole.x - this.x;
        const dy_bh = blackHole.y - this.y;
        const dist_bh = Math.sqrt(dx_bh * dx_bh + dy_bh * dy_bh);
        if (dist_bh < blackHole.eventHorizon) {
          const angle = Math.atan2(dy_bh, dx_bh);
          this.x += Math.cos(angle) * (blackHole.eventHorizon - dist_bh) * 0.01;
          this.y += Math.sin(angle) * (blackHole.eventHorizon - dist_bh) * 0.01;
          if (dist_bh < blackHole.radius) { // If inside black hole, reset
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 2;
          }
        }

        // Wrap particles around the screen with depth consideration
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.z = Math.random() * 2;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2); // Size scales with depth
        ctx.fill();
      }
    }

    class Supernova {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.maxRadius = Math.random() * 100 + 50;
        this.opacity = 1;
        this.color = color;
        this.speed = Math.random() * 2 + 1;
      }

      update() {
        this.radius += this.speed;
        this.opacity -= 0.01;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = this.radius / 2;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Nebula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 300 + 200; // Large size
        this.opacity = Math.random() * 0.05 + 0.01; // Very subtle opacity
        const nebulaColors = ['100, 0, 150', '0, 100, 150', '150, 50, 0']; // Purple, blue, orange
        const randomNebulaColor = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
        this.color = `rgba(${randomNebulaColor}, ${this.opacity})`;
        this.speedX = (Math.random() - 0.5) * 0.01; // Very slow drift
        this.speedY = (Math.random() - 0.5) * 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color.replace(/\d\.\d+/, '0.5'));
        gradient.addColorStop(1, this.color.replace(/\d\.\d+/, '0'));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function initNebulae() {
      nebulae = [];
      const numNebulae = 8; // Increased number of nebula layers
      for (let i = 0; i < numNebulae; i++) {
        nebulae.push(new Nebula());
      }
    }

    function drawBlackHole() {
      // Accretion Disk (simulated)
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.eventHorizon * 0.8, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(blackHole.x, blackHole.y, blackHole.radius, blackHole.x, blackHole.y, blackHole.eventHorizon * 0.8);
      gradient.addColorStop(0, 'rgba(255, 100, 0, 0.5)');
      gradient.addColorStop(0.5, 'rgba(160, 32, 240, 0.3)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Event Horizon
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.eventHorizon, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(160, 32, 240, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner Black Hole
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

    function drawPulsars() {
      pulsars.forEach(p => {
        p.pulse = (p.pulse + 0.1) % (p.maxPulse * 2); // Simple pulse animation
        const currentRadius = p.radius + Math.sin(p.pulse) * (p.maxPulse / 2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color.replace(/\d\.\d/, '1'); // Full opacity for shadow
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Pulsar beams (simple simulation)
        ctx.strokeStyle = p.color.replace(/\d\.\d/, '0.5');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.cos(p.pulse * 0.1) * 200, p.y + Math.sin(p.pulse * 0.1) * 200);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(p.pulse * 0.1) * 200, p.y - Math.sin(p.pulse * 0.1) * 200);
        ctx.stroke();
      });
    }

    function drawSupernovas() {
      for (let i = supernovas.length - 1; i >= 0; i--) {
        supernovas[i].update();
        supernovas[i].draw();
        if (supernovas[i].opacity <= 0) {
          supernovas.splice(i, 1);
        }
      }
    }

    function drawNebulae() {
      nebulae.forEach(n => {
        n.update();
        n.draw();
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebulae(); // Draw nebulae first, as background elements
      drawBlackHole();
      drawPulsars();
      drawSupernovas();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    initNebulae();
    animateParticles();

    // Mouse interaction for particles (subtle parallax)
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      particles.forEach(p => {
        const parallaxX = (mouseX - canvas.width / 2) * 0.005 * p.z;
        const parallaxY = (mouseY - canvas.height / 2) * 0.005 * p.z;
        p.x += parallaxX;
        p.y += parallaxY;
      });
    });

    // Periodically add supernovas
    setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const colors = ['255, 100, 0', '0, 200, 255', '255, 255, 0']; // Red, Blue, Yellow
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      supernovas.push(new Supernova(x, y, randomColor));
    }, 5000); // Every 5 seconds
  }

  // Animated text reveal for About Me section
  const animatedText = document.querySelector('.animated-text');
  if (animatedText) {
    const text = animatedText.textContent;
    animatedText.textContent = ''; // Clear text
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        animatedText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 20); // Typing speed
      }
    }
    // Trigger when about section is visible
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          aboutObserver.unobserve(animatedText); // Stop observing once animated
        }
      });
    }, { threshold: 0.5 });
    aboutObserver.observe(animatedText);
  }

  // Project Detail Modal
  const projectModal = document.getElementById('project-modal');
  const closeButton = document.querySelector('.close-button');
  const projectCards = document.querySelectorAll('.project-card');

  const projectDetails = {
    "livesolve3d": {
      title: "LiveSolve3D: AI-Powered 3D Sudoku Wizard (2024)",
      tech: "Python, OpenCV, Keras, TensorFlow, NumPy, Multi-threading, Pandas, Human Computer Interaction",
      description: "Created a Vision Based AI Sudoku solver with 99%-digit recognition accuracy, solving puzzles in under 3 seconds. Simulated 3D transformations for live solution overlay using OpenCV and TensorFlow.",
      link: "#"
    },
    "model-accelerator": {
      title: "Model Accelerator: Optimized Inference Pipeline (2024)",
      tech: "Python, C++, ONNX Runtime, OpenCV, PyTorch, Python, TensorFlow, CMake, SQL, GPUs",
      description: "Achieved a 50% reduction in inference time and improved model efficiency by implementing optimizations and parallel preprocessing images using ONNX Runtime and OpenCV.",
      link: "#"
    },
    "termai-infinity": {
      title: "TermAI Infinity: Advanced LLM Workflow Engine (2024)",
      tech: "Python, LangChain, Transformers, Chroma, Chain-of-Thought Reasoning, Summarization, SQL, Generative AI, RAG, GPUs",
      description: "Built a fully offline, modular LLM suite enabling multi-step reasoning, retrieval-augmented Q&A, chunk-based summarization, and iterative refinement, ensuring complete data privacy without external APIs.",
      link: "#"
    },
    "smartpay-upi": {
      title: "SmartPay-UPI: QR-Based Payment System (2025)",
      tech: "Python, Blockchain, OpenCV, QR Code APIs, SMTP, bcrypt, SQL, JSON, CSV",
      description: "Developed a secure payment platform featuring QR code transactions, automated email notifications, CSV/JSON-based data management, role-based access, and blockchain-backed security for enhanced scalability and reliability.",
      link: "#"
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId;
      const details = projectDetails[projectId];

      if (details) {
        document.getElementById('modal-project-title').textContent = details.title;
        document.getElementById('modal-project-tech').textContent = details.tech;
        document.getElementById('modal-project-description').textContent = details.description;
        document.getElementById('modal-project-link').href = details.link;
        projectModal.style.display = 'flex'; // Use flex to center content
      }
    });
  });

  closeButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      projectModal.style.display = 'none';
    }
  });

  // Contact form real-time validation (basic example)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.style.borderColor = '#a020f0'; // Accent color for valid
          input.style.boxShadow = '0 0 8px rgba(160, 32, 240, 0.5)';
        } else {
          input.style.borderColor = '#ff0000'; // Red for invalid
          input.style.boxShadow = '0 0 8px rgba(255, 0, 0, 0.5)';
        }
      });
    });
  }
});