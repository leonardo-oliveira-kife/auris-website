(function () {
  var CONSENT_KEY = 'auris_cookie_consent';

  // Substitua pelo Measurement ID real da conta Google Analytics do cliente
  // (formato G-XXXXXXXXXX). Enquanto for o placeholder abaixo, o gtag.js
  // simplesmente não vai reportar nada de útil, mas o banner e a lógica de
  // consentimento já funcionam normalmente.
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

  function loadGoogleAnalytics() {
    if (window.__auris_ga_loaded) return;
    window.__auris_ga_loaded = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    // anonymize_ip reduz a granularidade do dado de localização coletado.
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* localStorage indisponível: segue sem persistir */ }
  }

  function buildBanner() {
    var existing = document.querySelector('.cookie-banner');
    if (existing) existing.remove();

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p class="cookie-banner__text">' +
        'Usamos cookies para entender como você usa o site (Google Analytics) e ' +
        'melhorar sua experiência. Você pode aceitar ou recusar a qualquer momento. ' +
        'Saiba mais na <a href="privacidade.html">Política de Privacidade</a>.' +
      '</p>' +
      '<div class="cookie-banner__actions">' +
        '<button type="button" class="btn btn--secondary cookie-banner__reject">Recusar</button>' +
        '<button type="button" class="btn btn--primary cookie-banner__accept">Aceitar</button>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('.cookie-banner__accept').addEventListener('click', function () {
      setConsent('granted');
      loadGoogleAnalytics();
      banner.remove();
    });
    banner.querySelector('.cookie-banner__reject').addEventListener('click', function () {
      setConsent('denied');
      banner.remove();
    });
  }

  function init() {
    var consent = getConsent();
    if (consent === 'granted') {
      loadGoogleAnalytics();
      return;
    }
    if (consent === 'denied') {
      return;
    }
    buildBanner();
  }

  // Exposto para o link "Preferências de cookies" no rodapé, caso o
  // visitante queira revisar/trocar a escolha feita anteriormente.
  window.aurisReopenCookieBanner = buildBanner;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
