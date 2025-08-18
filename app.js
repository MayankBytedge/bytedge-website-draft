  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
      // Hide loading overlay quickly
      setTimeout(() => {
          document.getElementById('loadingOverlay').classList.add('hidden');
      }, 500);

      initCustomCursor();
      initNavigation();
      initHeroAnimations();
      initStatsCounter();
      initCarousel();
      initScrollAnimations();
      initChatbot();
      initModal();
      init3DChatbotModel();
  });

    // GSAP Configuration
    gsap.registerPlugin(ScrollTrigger);

    // Global State
    const state = {
        mouseX: 0,
        mouseY: 0,
        cursorX: 0,
        cursorY: 0,
        trailX: 0,
        trailY: 0,
        currentSlide: 0,
        isScrolling: false,
        chatbotOpen: false
    };
  
    // BytEdge Knowledge Base for Chatbot
    const BYTEEDGE_KB = {
        platform: {
            realedge: "RealEdge Connect provides no-code data ingestion across 1000+ industrial protocols, APIs, and legacy systems.",
            predictedge: "PredictEdge Core is our AI modeling engine for predictive maintenance, asset health, optimization, and intelligent alerts.",
            designedge: "DesignEdge Studio is a virtual workspace for digital twins, RUL modeling, and simulation-driven design decisions.",
            agenticai: "AgenticAI Engine enables rapid deployment of conversational AI agents and copilots tailored to your process logic."
        },
        industries: {
            mobility: "For mobility companies, we provide EV battery SoC drift prediction, route failure co-pilots, and predictive maintenance.",
            manufacturing: "In manufacturing, we focus on downtime prevention, process anomaly detection, and optimizing production lines.",
            cpg: "For CPG companies, we offer packaging QC agents, bottling line optimization, and quality control automation.",
            energy: "In energy sector, we provide load forecasting agents, asset maintenance copilots, and grid optimization solutions."
        },
        solutions: [
            "Predictive Maintenance: Reduced breakdowns by 32%, saved ₹48Cr over 2 years",
            "Design Optimization: Cut design cycle by 40% for OEM brake systems, 92% RUL accuracy",
            "Process Efficiency: Boosted packaging line efficiency by 28%, saving ₹1.2Cr annually"
        ]
    };
  // Custom Cursor System
  function initCustomCursor() {
      const cursor = document.getElementById('cursor');
      const trail = document.getElementById('cursorTrail');
      
      if ('ontouchstart' in window) {
          cursor.style.display = 'none';
          trail.style.display = 'none';
          return;
      }

      document.addEventListener('mousemove', (e) => {
          state.mouseX = e.clientX;
          state.mouseY = e.clientY;
      });

      // Hover effects
      const hoverElements = document.querySelectorAll('a, button, .platform-card, .value-prop-item, .industry-card, .chatbot-launcher');
      hoverElements.forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });

      animateCursor();
  }

  function animateCursor() {
      // Smooth cursor movement
      state.cursorX += (state.mouseX - state.cursorX) * 0.2;
      state.cursorY += (state.mouseY - state.cursorY) * 0.2;
      
      // Trail follows cursor with delay
      state.trailX += (state.cursorX - state.trailX) * 0.1;
      state.trailY += (state.cursorY - state.trailY) * 0.1;

      const cursor = document.getElementById('cursor');
      const trail = document.getElementById('cursorTrail');
      
      if (cursor) cursor.style.transform = `translate3d(${state.cursorX}px, ${state.cursorY}px, 0)`;
      if (trail) trail.style.transform = `translate3d(${state.trailX}px, ${state.trailY}px, 0)`;

      requestAnimationFrame(animateCursor);
  }

  // Navigation
  function initNavigation() {
      const navbar = document.getElementById('navbar');
      
      window.addEventListener('scroll', throttle(() => {
          if (window.scrollY > 100) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      }, 16));

      // Smooth scroll for nav links
      document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', (e) => {
              const href = link.getAttribute('href');
              if (href && href.startsWith('#')) {
                  e.preventDefault();
                  const target = document.querySelector(href);
                  if (target) {
                      target.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                      });
                  }
              }
          });
      });
  }

  // Hero Animations
  function initHeroAnimations() {
      gsap.from('.hero-text > *', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
      });

      gsap.from('.hero-3d', {
          x: 50,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out'
      });
  }

  // Stats Counter
  function initStatsCounter() {
      const statNumbers = document.querySelectorAll('.stat-number');
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                  entry.target.classList.add('counted');
                  animateCounter(entry.target);
              }
          });
      }, { threshold: 0.5 });

      statNumbers.forEach(stat => observer.observe(stat));
  }

  function animateCounter(element) {
      const target = parseInt(element.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
          current += increment;
          if (current < target) {
              element.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
          } else {
              element.textContent = target;
          }
      };

      updateCounter();
  }


  // Scroll Animations
  function initScrollAnimations() {
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate');
              }
          });
      }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      });

      animateElements.forEach(el => observer.observe(el));
  }

  // 3D Chatbot Model Initialization
  function initChatbotModel() {
      const chatbotModel = document.getElementById('chatbot-model');
      const fallbackIcon = document.querySelector('.chatbot-fallback-icon');
      
      // Show fallback if model fails to load
      chatbotModel.addEventListener('error', () => {
          chatbotModel.style.display = 'none';
          fallbackIcon.style.display = 'flex';
      });

      // Hide fallback if model loads successfully
      chatbotModel.addEventListener('load', () => {
          fallbackIcon.style.display = 'none';
      });
  }


  // Modal System
  function initModal() {
      const modal = document.getElementById('bookPilotModal');
      const openBtn = document.getElementById('bookPilotBtn');
      const closeBtn = document.getElementById('modalClose');
      const cancelBtn = document.getElementById('cancelBtn');
      const form = document.getElementById('pilotForm');

      function openModal() {
          modal.style.display = 'flex';
          gsap.fromTo(modal.querySelector('.modal-content'),
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
      }

      function closeModal() {
          gsap.to(modal.querySelector('.modal-content'), {
              scale: 0.8,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => modal.style.display = 'none'
          });
      }

      openBtn.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      cancelBtn.addEventListener('click', closeModal);

      modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
      });

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          
          // Create mailto URL
          const subject = encodeURIComponent('Pilot Request - BytEdge.ai');
          const body = encodeURIComponent(`
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}

Source: BytEdge.ai website
          `.trim());
          
          const mailtoURL = `mailto:mayankdivakar2703@gmail.com?subject=${subject}&body=${body}`;
          window.location.href = mailtoURL;
          
          closeModal();
          form.reset();
          
          // Show confirmation
          setTimeout(() => {
              alert('Thank you! Your pilot request has been prepared. Please send the email to complete your request.');
          }, 500);
      });
  }

  // Utility Functions
  function throttle(func, limit) {
      let inThrottle;
      return function() {
          const args = arguments;
          const context = this;
          if (!inThrottle) {
              func.apply(context, args);
              inThrottle = true;
              setTimeout(() => inThrottle = false, limit);
          }
      };
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          if (state.chatbotOpen) {
              document.getElementById('chatbotClose').click();
          }
          document.getElementById('modalClose').click();
      }
  });