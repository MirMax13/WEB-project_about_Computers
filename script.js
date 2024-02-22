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
  });
