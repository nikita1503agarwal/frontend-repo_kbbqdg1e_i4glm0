/* global gsap, ScrollTrigger */
// Registers GSAP + ScrollTrigger and adds common animations + helpers
(function(){
  if (!window.gsap) return;
  if (gsap && gsap.registerPlugin && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Reveal on scroll utility
  window.initReveal = function(selector = '.reveal'){
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
        once: true
      });
    });
  }

  // Parallax backgrounds
  window.initParallax = function(selector = '[data-parallax]'){
    document.querySelectorAll(selector).forEach((el) => {
      const strength = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      gsap.to(el, {
        yPercent: strength * 20,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scrub: 1
        }
      });
    });
  }

  // Horizontal sections
  window.initHorizontal = function(containerSel = '[data-horizontal]'){
    document.querySelectorAll(containerSel).forEach((wrap) => {
      const track = wrap.querySelector('[data-horizontal-track]');
      if (!track) return;
      const sections = gsap.utils.toArray(track.children);
      const totalWidth = sections.reduce((acc, s) => acc + s.offsetWidth, 0);
      const endX = -(totalWidth - wrap.offsetWidth);

      gsap.to(track, {
        x: endX,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1
        }
      });
    });
  }

  // Magnetic buttons micro-interaction
  window.initMagnetic = function(selector = '[data-magnetic]'){
    document.querySelectorAll(selector).forEach((btn) => {
      const strength = parseFloat(btn.getAttribute('data-magnetic')) || 20;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x/strength, y: y/strength, duration: 0.3, ease: 'power3.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
      });
    });
  }
})();
