document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 2000);
    });
  }

  // Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Intersection Observer for sections
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
      }
    });
  }, { threshold: 0.3 });

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Neural Network Background Animation
  createNeuralNetwork();

  // Hero animations
  initHeroAnimations();

  // Skills animation
  initSkillsAnimation();

  // Stats counter animation
  initStatsCounter();

  // Typing animation for quantum titles
  initQuantumTitles();

  // AI Assistant
  initAIAssistant();

  // Holographic Terminal
  initHolographicTerminal();

  // Contact form
  initContactForm();

  // Theme switcher (bonus feature)
  initThemeSwitcher();

  // Matrix rain effect
  createMatrixRain();

  // Particle cursor trail
  initParticleCursor();

  // Project modals
  initProjectModals();
});

// Neural Network Background
function createNeuralNetwork() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const neuralBg = document.getElementById('neural-network-bg');
  
  if (!neuralBg) return;
  
  neuralBg.appendChild(canvas);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';

  const nodes = [];
  const nodeCount = 50;
  const maxDistance = 150;

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    nodes.forEach((node, i) => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(108, 92, 231, 0.6)';
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - node.x;
        const dy = nodes[j].y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Hero Animations
function initHeroAnimations() {
  // Glitch effect for name
  const glitchText = document.querySelector('.glitch-text');
  if (glitchText) {
    setInterval(() => {
      glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        glitchText.style.transform = 'translate(0, 0)';
      }, 100);
    }, 3000);
  }
}

// Quantum Titles Animation
function initQuantumTitles() {
  const titles = document.querySelectorAll('.title-item');
  if (titles.length === 0) return;

  let currentIndex = 0;

  function showNextTitle() {
    titles.forEach(title => title.classList.remove('active'));
    titles[currentIndex].classList.add('active');
    currentIndex = (currentIndex + 1) % titles.length;
  }

  // Initial display
  showNextTitle();
  
  // Rotate titles every 2 seconds
  setInterval(showNextTitle, 2000);
}

// Skills Animation
function initSkillsAnimation() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Set initial widths immediately
  skillBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-progress');
    bar.style.width = `${targetWidth}%`;
  });
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.getAttribute('data-progress');
        
        setTimeout(() => {
          progressBar.style.width = `${targetWidth}%`;
        }, 500);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

// Stats Counter Animation
function initStatsCounter() {
  const statsNumbers = document.querySelectorAll('.stat-number');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
      }
    });
  }, { threshold: 0.5 });

  statsNumbers.forEach(stat => statsObserver.observe(stat));
}

// AI Assistant
function initAIAssistant() {
  const aiAssistant = document.getElementById('ai-assistant');
  const aiAvatar = document.querySelector('.ai-avatar');
  const chatBubble = document.querySelector('.ai-chat-bubble');

  if (!aiAssistant || !aiAvatar) return;

  const responses = [
    "I'm ARIA, your AI guide! Ask me about Sushant's expertise in Machine Learning!",
    "Sushant specializes in LLMs, Computer Vision, and Neural Network Architecture!",
    "Want to know about his projects? Check out SmartPay UPI, PropertyInsight, and EdgeAI Optimizer!",
    "Sushant has experience with PyTorch, TensorFlow, and HuggingFace Transformers!",
    "He's available for full-time opportunities starting Fall 2025!"
  ];

  let responseIndex = 0;

  aiAvatar.addEventListener('click', () => {
    if (chatBubble) {
      chatBubble.querySelector('p').textContent = responses[responseIndex];
      responseIndex = (responseIndex + 1) % responses.length;
      
      // Trigger chat bubble animation
      chatBubble.style.opacity = '1';
      chatBubble.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        chatBubble.style.opacity = '0';
        chatBubble.style.transform = 'translateY(20px)';
      }, 4000);
    }
  });
}

// Holographic Terminal
function initHolographicTerminal() {
  const terminal = document.getElementById('holo-terminal');
  const closeBtn = document.querySelector('.terminal-close');
  
  if (!terminal) return;

  // Show terminal on page load after delay
  setTimeout(() => {
    terminal.style.display = 'block';
    setTimeout(() => {
      terminal.style.opacity = '1';
    }, 100);
  }, 3000);

  // Close terminal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      terminal.style.opacity = '0';
      setTimeout(() => {
        terminal.style.display = 'none';
      }, 300);
    });
  }

  // Auto-close after 10 seconds
  setTimeout(() => {
    if (terminal.style.display !== 'none') {
      terminal.style.opacity = '0';
      setTimeout(() => {
        terminal.style.display = 'none';
      }, 300);
    }
  }, 10000);
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = 'linear-gradient(45deg, #00b894, #00d4ff)';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// Theme Switcher
function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) return;

  const themes = [
    {
      name: 'quantum',
      colors: {
        '--accent-purple': '#6c5ce7',
        '--accent-cyan': '#00d4ff',
        '--accent-pink': '#fd79a8'
      }
    },
    {
      name: 'cyber',
      colors: {
        '--accent-purple': '#ff006e',
        '--accent-cyan': '#00f5ff',
        '--accent-pink': '#ffbe0b'
      }
    },
    {
      name: 'matrix',
      colors: {
        '--accent-purple': '#39ff14',
        '--accent-cyan': '#00ff41',
        '--accent-pink': '#008f11'
      }
    }
  ];

  let currentTheme = 0;

  themeToggle.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    
    Object.entries(theme.colors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  });
}

// Matrix Rain Effect
function createMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const charArray = chars.split('');
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Particle Cursor Trail
function initParticleCursor() {
  const particles = [];
  const particleCount = 15;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsl(${Math.random() * 60 + 240}, 100%, 70%)`;
      this.life = 30;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size *= 0.96;
      this.life--;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.life / 30;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Project Modals
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close');
  const projectBtns = document.querySelectorAll('.view-project-btn');

  if (!modal || !modalBody) return;

  const projectData = {
    'smartpay-upi': {
      title: 'SmartPay UPI: QR-based Payment System',
      description: 'Cutting-edge payment system designed for the Canadian market with blockchain-based transaction integrity, QR code functionality, and advanced fraud detection.',
      features: [
        'Unique QR-based payments linked to user accounts',
        'Blockchain-based transaction integrity with tamper detection',
        'Role-based access control with bcrypt password hashing',
        'Admin dashboard for transaction monitoring',
        'Automated email notifications and password reset',
        'Real-time fraud detection with configurable limits',
        'Budget tracking and bill management system'
      ],
      tech: ['Python', 'Blockchain', 'OpenCV', 'QR Code APIs', 'SMTP', 'bcrypt', 'CSV/JSON'],
      metrics: {
        'Security Level': '99.9%',
        'Transaction Speed': '< 1s',
        'Fraud Detection': 'Real-time',
        'Admin Features': 'Full Dashboard'
      },
      github: 'https://github.com/sushantsharma22/SmartPay-UPI.git'
    },
    'property-finder': {
      title: 'PropertyInsight: Real Estate E-Commerce',
      description: 'Advanced real estate platform with efficient data structures, web scraping automation, and intelligent property ranking using advanced algorithms.',
      features: [
        'AVL Trees for real-time autocomplete suggestions',
        'Web scraping from Remax and Zolo using Selenium',
        'Boyer-Moore string search for property filtering',
        'Trie-based spell checker for accurate searches',
        'Advanced filtering by price, city, province, bedrooms/bathrooms',
        'Inverted indexing for keyword-based property ranking',
        'Multi-threading for parallel data processing'
      ],
      tech: ['Java', 'Selenium', 'OpenCSV', 'Apache Commons CSV', 'AVL Trees', 'Tries', 'Boyer-Moore Algorithm'],
      metrics: {
        'Efficiency Boost': '30%',
        'Data Processing': 'Real-time',
        'Search Accuracy': '95%',
        'Latency Reduction': '40%'
      },
      github: 'https://github.com/sushantsharma22/Property-Finder.git'
    },
    'edgeai-optimizer': {
      title: 'EdgeAIOptimizer: High Performance ONNX Inference',
      description: 'Robust C++ engine for executing ONNX-based AI models on edge devices with advanced optimization techniques for resource-constrained environments.',
      features: [
        'ONNX Runtime integration for model execution',
        'Quantization and operator fusion optimizations',
        'Custom preprocessing pipeline with OpenCV',
        'Graph-level optimizations for 3x speed improvement',
        'Modular architecture for extensibility',
        'Edge deployment optimization',
        'CUDA acceleration support'
      ],
      tech: ['C++', 'ONNX Runtime', 'OpenCV', 'PyTorch', 'CUDA', 'CMake'],
      metrics: {
        'Speed Improvement': '3x',
        'Model Size Reduction': '50%',
        'Accuracy Retention': '99%',
        'Memory Footprint': '-60%'
      },
      github: 'https://github.com/sushantsharma22/EdgeAIOptimizer.git'
    },
    'termai-infinity': {
      title: 'TermAI Infinity: Offline Advanced LLM Toolkit',
      description: 'Comprehensive offline LLM toolkit with modular components for text generation, RAG, multi-step reasoning, and customizable workflows.',
      features: [
        'Advanced local LLM capabilities without internet',
        'Retrieval-Augmented Generation (RAG) pipeline',
        'Multi-step reasoning with chain-of-thought',
        'Text summarization and iterative refinement',
        'Chroma vector stores for context-aware answers',
        'Modular components: Summarizer, Refiner, MultiStepReasoner',
        'Command-line interface for diverse use cases'
      ],
      tech: ['Python', 'Transformers', 'Hugging Face', 'LangChain', 'PyTorch', 'Chroma', 'Local LLMs'],
      metrics: {
        'Processing Mode': 'Offline',
        'Modularity': 'Full',
        'Response Quality': '95%',
        'Context Awareness': 'High'
      },
      github: 'https://github.com/sushantsharma22/TermAI-Infinity-.git'
    },
    'intellicity-architecture': {
      title: 'IntelliCity: Scalable Big Data Architecture',
      description: 'Distributed data pipelines for smart city IoT analytics with Zstandard compression, deployed on Kubernetes for high scalability and reliability.',
      features: [
        'Apache NiFi, Kafka, and Spark for data streaming',
        'Zstandard compression for 30% efficiency improvement',
        'Kubernetes and Docker deployment for scalability',
        'Real-time IoT data processing for smart cities',
        'Distributed architecture for high-volume data handling',
        'Resource optimization by 40%',
        'Team collaboration and leadership'
      ],
      tech: ['Shell', 'Python', 'Apache NiFi', 'Kafka', 'Spark', 'HDFS', 'Zstandard', 'Docker', 'Kubernetes'],
      metrics: {
        'Latency Reduction': '30%',
        'Resource Utilization': '+40%',
        'Scalability': 'Kubernetes',
        'Team Size': '4 members'
      },
      github: 'https://github.com/sushantsharma22/IntelliCity-Architecture.git'
    },
    'image-restoration': {
      title: 'Efficient Image Restoration for Noisy Data',
      description: 'Custom UNet-based architecture for image denoising and super-resolution with PyTorch quantization for optimized edge deployment.',
      features: [
        'Custom UNet architecture for denoising and super-resolution',
        'PyTorch dynamic quantization for edge deployment',
        'End-to-end training and evaluation workflow',
        'Automated performance analysis and benchmarking',
        'Modular dataset handling for scalability',
        'Real-time inference optimization',
        'NVIDIA CUDA acceleration support'
      ],
      tech: ['Python', 'PyTorch', 'OpenCV', 'Skimage', 'PIL', 'NVIDIA CUDA', 'TorchQuantization'],
      metrics: {
        'Architecture': 'Custom UNet',
        'Deployment': 'Edge Optimized',
        'Performance': 'SOTA',
        'Inference Speed': 'Real-time'
      },
      github: 'https://github.com/sushantsharma22/Efficient-Image-Restoration.git'
    }
  };

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const project = projectData[projectId];

      if (project) {
        modalBody.innerHTML = `
          <h2>${project.title}</h2>
          <p class="project-modal-description">${project.description}</p>
          
          <div class="modal-metrics">
            ${Object.entries(project.metrics).map(([key, value]) => `
              <div class="metric-item">
                <span class="metric-label">${key}</span>
                <span class="metric-value">${value}</span>
              </div>
            `).join('')}
          </div>

          <h3>Key Features</h3>
          <ul class="features-list">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>

          <h3>Technologies Used</h3>
          <div class="tech-tags">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>

          ${project.github ? `
          <div class="project-links">
            <a href="${project.github}" target="_blank" class="btn-primary">
              <i class="fab fa-github"></i> View on GitHub
            </a>
          </div>
          ` : ''}
        `;

        modal.style.display = 'block';
        setTimeout(() => {
          modal.style.opacity = '1';
        }, 10);
      }
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    });
  }

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  });
}

// Add smooth scrolling behavior
function smoothScrollTo(target) {
  const targetPosition = target.offsetTop - 80;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events with passive listeners
let ticking = false;

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Handle minimal scroll-based animations here if needed
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Add loading state management
class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
  }

  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.updateUI();
  }

  updateUI() {
    const hasLoading = Array.from(this.loadingStates.values()).some(state => state);
    document.body.classList.toggle('loading', hasLoading);
  }
}

const loadingManager = new LoadingManager();

// Project hover optimization with performance improvements
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const certItems = document.querySelectorAll('.cert-item');
  
  function optimizeElement(element) {
    let isHovering = false;
    let hoverTimeout = null;
    
    const handleMouseEnter = () => {
      if (!isHovering) {
        isHovering = true;
        element.style.willChange = 'transform';
        
        // Clear any pending timeout
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
      }
    };
    
    const handleMouseLeave = () => {
      if (isHovering) {
        isHovering = false;
        
        // Delay will-change reset to allow animation to complete
        hoverTimeout = setTimeout(() => {
          if (!isHovering) {
            element.style.willChange = 'auto';
          }
        }, 300);
      }
    };
    
    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  }
  
  // Optimize project cards
  projectCards.forEach(optimizeElement);
  
  // Optimize certificate items
  certItems.forEach(optimizeElement);
  
  // Performance: Ultra-smooth scroll with 3D optimization
  let isScrolling = false;
  let scrollTimeout = null;
  let ticking = false;
  
  const handleScrollPerformance = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (!isScrolling) {
          isScrolling = true;
          document.body.classList.add('is-scrolling');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          document.body.classList.remove('is-scrolling');
        }, 100);
        
        ticking = false;
      });
      ticking = true;
    }
  };
  
  // Use passive listeners for maximum performance
  window.addEventListener('scroll', handleScrollPerformance, { 
    passive: true,
    capture: false 
  });
  
  // Optimize 3D transforms for project cards
  const optimizeProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      // Ensure GPU acceleration
      card.style.transform = 'translateZ(0)';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
      
      // Minimal hover optimization
      let hoverTimeout = null;
      
      card.addEventListener('mouseenter', () => {
        if (!isScrolling) {
          card.style.willChange = 'transform, box-shadow';
        }
        clearTimeout(hoverTimeout);
      }, { passive: true });
      
      card.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          card.style.willChange = 'auto';
        }, 200);
      }, { passive: true });
    });
  };
  
  // Initialize optimizations
  optimizeProjectCards();
});

// Export for use in other modules
window.portfolioUtils = {
  smoothScrollTo,
  debounce,
  loadingManager
};
