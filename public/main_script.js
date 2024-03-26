window.addEventListener('DOMContentLoaded', function() {
  const iframe = document.querySelector('iframe');
  
  if (iframe) {
    function resizeIframe() {
      iframe.style.height = `${iframe.offsetWidth / 1.78}px`;
    }
  
    window.addEventListener('resize', resizeIframe);
  
    resizeIframe();
    } else {
      console.error('iframe element not found');
    }
  
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});

