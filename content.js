// Content script to hide YouTube overlay elements
(function() {
  'use strict';

  // Function to hide elements with the specified class
  function hideOverlayElements() {
    const elements = document.querySelectorAll('.ytp-ce-element-show');
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.display = 'none';
    });
  }

  // Run immediately
  hideOverlayElements();

  // Use MutationObserver to watch for dynamically added elements
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        hideOverlayElements();
      }
    });
  });

  // Start observing when DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
})();
