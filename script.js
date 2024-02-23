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

window.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item a');
  
  function resizeMenuItems() {
    const screenWidth = window.innerWidth;
    const width = Math.max(5, screenWidth);
  
    for (const menuItem of menuItems) {
      menuItem.style.width = `${width*0.889}px`;
    }
  }
  
  window.addEventListener('resize', resizeMenuItems);
  resizeMenuItems();
});