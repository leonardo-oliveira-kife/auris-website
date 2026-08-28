(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = !nav.hidden;
    nav.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
