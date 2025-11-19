// Shared UI behaviors (nav toggle, current link highlighting)
(function(){
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
  }

  // Active link
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('[data-nav] a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('text-white');
    } else {
      a.classList.add('text-gray-400');
    }
  });
})();
