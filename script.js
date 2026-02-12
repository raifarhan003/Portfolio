/* script.js - Consolidated Logic */

document.addEventListener('DOMContentLoaded', () => {
   console.log("SYSTEM: INITIALIZING...");

   // =========================================
   // 1. PROJECT DATA & MODAL LOGIC (glow_logic.js)
   // =========================================
   const projectData = [
      {
         id: 0,
         title: "SKILL MAP",
         desc: "Focus on Automated Task Allocation and Resource Balancing. An AI-powered backend system designed to automatically analyze software tasks and assign them to developers based on real-time availability and skill-sets.",
         highlights: [
            "Automated task analysis using NLP",
            "Real-time developer availability tracking",
            "Skill-gap analysis",
            "Resource Balancing Algorithm"
         ],
         tech: ["Python", "Django", "AI/ML", "PostgreSQL", "React"]
      },
      {
         id: 1,
         title: "AI HOLOGRAPHIC SYS",
         desc: "Focus on Content Generation Logic and System Architecture. Designing data flows for interactive holographic displays to enable real-time interaction with 3D projections.",
         highlights: [
            "Real-time 3D content generation",
            "System Architecture Design",
            "Voice-command integration",
            "Low-latency data transmission"
         ],
         tech: ["Python", "System Arch", "AI", "Holography", "C++"]
      },
      {
         id: 2,
         title: "TEXT-TO-HANDWRITING",
         desc: "Focus on Deep Learning and TensorFlow. A deep learning model built to convert digital text into high-fidelity human handwriting, trained on diverse datasets.",
         highlights: [
            "Deep Learning model implementation",
            "TensorFlow model training",
            "Custom dataset preprocessing",
            "High-fidelity output generation"
         ],
         tech: ["TensorFlow", "Deep Learning", "Python", "OCR", "OpenCV"]
      }
   ];

   const modalOverlay = document.getElementById('project-modal');
   const closeModalBtn = document.getElementById('close-modal');
   const modalTitle = document.getElementById('modal-title');
   const modalDesc = document.getElementById('modal-desc');
   const modalHighlightsList = document.getElementById('modal-highlights-list');
   const modalTechTags = document.getElementById('modal-tech-tags');
   const projectRows = document.querySelectorAll('.project-row');

   function openModal(projectId) {
      const project = projectData.find(p => p.id === parseInt(projectId));
      if (!project) return;

      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;

      modalHighlightsList.innerHTML = '';
      project.highlights.forEach(h => {
         const li = document.createElement('li');
         li.textContent = h;
         modalHighlightsList.appendChild(li);
      });

      modalTechTags.innerHTML = '';
      project.tech.forEach(t => {
         const span = document.createElement('span');
         span.textContent = t;
         span.className = 'skill-tag';
         // Ensure variable is set for the tag style to pick up color
         span.style.setProperty('--card-color', 'var(--color-primary)');
         modalTechTags.appendChild(span);
      });

      modalOverlay.classList.remove('hidden');
   }

   function closeModal() {
      modalOverlay.classList.add('hidden');
   }

   if (projectRows.length > 0) {
      projectRows.forEach(row => {
         // Click listener
         row.addEventListener('click', () => {
            const id = row.getAttribute('data-id');
            openModal(id);
         });

         // Glow Dot Logic
         const dot = row.querySelector('.glow-dot');
         if (dot) {
            row.addEventListener('mousemove', (e) => {
               const rect = row.getBoundingClientRect();
               const x = e.clientX - rect.left;
               const y = e.clientY - rect.top;
               dot.style.left = `${x}px`;
               dot.style.top = `${y}px`;
            });
         }
      });
   }

   if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
   if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
         if (e.target === modalOverlay) closeModal();
      });
   }

   // =========================================
   // 2. CORE ANIMATIONS (neo_logic.js)
   // =========================================

   // --- Typewriter Effect ---
   const typewriterElement = document.getElementById('typewriter-text');
   if (typewriterElement) {
      const phrases = ["Lead Developer", "AI Automation Specialist", "System Logic Architect"];
      const typeSpeed = 100;
      const backSpeed = 50;
      const loopDelay = 1500;

      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
         const currentPhrase = phrases[phraseIndex];

         if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
         } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
         }

         let delay = typeSpeed;

         if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = loopDelay;
         } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
         } else if (isDeleting) {
            delay = backSpeed;
         }

         setTimeout(type, delay);
      }
      type();
   }

   // --- Scroll Observer (Fade Up) ---
   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('visible');
         }
      });
   }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

   document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

   // --- Magnetic Effect ---
   const magnets = document.querySelectorAll('.btn-primary, .btn-submit, .nav-link, .btn-resume');
   magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
         const rect = btn.getBoundingClientRect();
         const x = e.clientX - rect.left - rect.width / 2;
         const y = e.clientY - rect.top - rect.height / 2;
         btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
         btn.style.transform = 'translate(0px, 0px)';
      });
   });

   // --- Cursor Logic ---
   const cursorDot = document.querySelector('.cursor-dot');
   const cursorOutline = document.querySelector('.cursor-outline');

   if (cursorDot && cursorOutline) {
      window.addEventListener('mousemove', (e) => {
         const posX = e.clientX;
         const posY = e.clientY;

         cursorDot.style.left = `${posX}px`;
         cursorDot.style.top = `${posY}px`;

         cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
         }, { duration: 500, fill: "forwards" });
      });
   }

   const hoverTargets = document.querySelectorAll('a, button, .project-row, .arsenal-card, .contact-box, input, textarea');
   hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
   });

   console.log("SYSTEM: ONLINE");
});
