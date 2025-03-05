export function setupNavigationHandler() {
    let currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.nav-link');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.menu-toggle');
  
    function updateActiveLinks() {
      menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  
    function toggleMobileMenu() {
      mobileMenu?.classList.toggle('hidden');
    }
  
    // Event Listeners
    menuButton?.addEventListener('click', toggleMobileMenu);
  
    // Update active links on page load
    document.addEventListener('astro:page-load', () => {
      currentPath = window.location.pathname;
      updateActiveLinks();
      // Cerrar menú móvil en cambio de página
      mobileMenu?.classList.add('hidden');
    });
  
    // Initial setup
    updateActiveLinks();
  }