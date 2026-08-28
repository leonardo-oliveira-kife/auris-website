(function () {
  document.body.classList.remove('no-js');

  var prefersReducedMotionForBars = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Barras do "Painel da operação": crescem em stagger quando a seção entra na tela.
  // Implementado sem GSAP (IntersectionObserver + transição CSS de width).
  var dashboardBars = document.querySelectorAll('.dashboard-bar__fill');
  var barsContainer = document.querySelector('.dashboard-card__bars');

  if (dashboardBars.length && barsContainer) {
    function runBarsStagger() {
      dashboardBars.forEach(function (bar, index) {
        var delay = prefersReducedMotionForBars ? 0 : index * 150;
        setTimeout(function () {
          bar.style.width = bar.dataset.width || '0';
        }, delay);
      });
    }

    if ('IntersectionObserver' in window) {
      var barsObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runBarsStagger();
          observer.disconnect();
        });
      }, { threshold: 0.4 });
      barsObserver.observe(barsContainer);
    } else {
      runBarsStagger();
    }
  }

  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('[data-reveal], [data-hero-media], [data-hero-tag], [data-hero-sla]', { opacity: 1, y: 0 });
    return;
  }

  gsap.set('[data-reveal]', { opacity: 0, y: 24 });

  // Hero: a foto aparece primeiro, depois cada badge em sequência (stagger
  // com mais espaçamento entre os passos do que o padrão do site).
  var heroMedia = document.querySelector('[data-hero-media]');
  var heroTag = document.querySelector('[data-hero-tag]');
  var heroSla = document.querySelector('[data-hero-sla]');

  if (heroMedia && heroTag && heroSla) {
    gsap.set([heroMedia, heroTag, heroSla], { opacity: 0, y: 20 });

    gsap.timeline({ delay: 0.15 })
      .to(heroMedia, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      .to(heroTag, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.1')
      .to(heroSla, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.35');
  }

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    var items = group.children;
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Contador dos números do "Painel da operação" (SLA/Casos/Resposta média).
  // O valor final já está no HTML — só interpretamos o texto (95% / 128 / 4h12)
  // e animamos de 0 até ele quando o card entra na tela.
  document.querySelectorAll('.dashboard-card__stat-value').forEach(function (el) {
    var finalText = el.textContent.trim();
    var percentMatch = finalText.match(/^(\d+)%$/);
    var hoursMatch = finalText.match(/^(\d+)h(\d+)$/);
    var plainMatch = finalText.match(/^(\d+)$/);

    var scrollTriggerConfig = { trigger: el, start: 'top 85%', once: true };

    if (percentMatch) {
      var pCounter = { value: 0 };
      gsap.to(pCounter, {
        value: parseInt(percentMatch[1], 10),
        duration: 1.2,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerConfig,
        onUpdate: function () { el.textContent = Math.round(pCounter.value) + '%'; }
      });
    } else if (hoursMatch) {
      var hCounter = { h: 0, m: 0 };
      gsap.to(hCounter, {
        h: parseInt(hoursMatch[1], 10),
        m: parseInt(hoursMatch[2], 10),
        duration: 1.2,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerConfig,
        onUpdate: function () { el.textContent = Math.round(hCounter.h) + 'h' + Math.round(hCounter.m); }
      });
    } else if (plainMatch) {
      var nCounter = { value: 0 };
      gsap.to(nCounter, {
        value: parseInt(plainMatch[1], 10),
        duration: 1.2,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerConfig,
        onUpdate: function () { el.textContent = Math.round(nCounter.value); }
      });
    }
  });
})();
