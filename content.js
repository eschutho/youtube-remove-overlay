// Content script to hide YouTube overlay elements
(function() {
  'use strict';

  // Custom class to add to parent element
  const PARENT_CLASS = 'yt-overlay-hidden';
  const PARENT_SELECTOR = '.html5-video-player';
  const TARGET_CLASS = 'ytp-ce-element-show';

  // Function to add custom class to parent video player element
  function addClassToParent() {
    const videoPlayers = document.querySelectorAll(PARENT_SELECTOR);
    videoPlayers.forEach(player => {
      if (!player.classList.contains(PARENT_CLASS)) {
        player.classList.add(PARENT_CLASS);
      }
    });
  }

  // Function to hide a single element (fallback for inline styles)
  function hideElement(element) {
    element.style.opacity = '0';
    element.style.display = 'none';
    element.style.pointerEvents = 'none';
  }

  // Function to check if an element or its descendants have the target class
  function checkAndHideElements(node) {
    // Check if this is the parent video player element
    if (node.classList && node.classList.contains('html5-video-player')) {
      node.classList.add(PARENT_CLASS);
    }
    
    // Check if the node itself has the target class
    if (node.classList && node.classList.contains(TARGET_CLASS)) {
      hideElement(node);
    }
    
    // Check descendants if node is an element
    if (node.querySelectorAll) {
      // Add class to any video player descendants
      const videoPlayers = node.querySelectorAll(PARENT_SELECTOR);
      videoPlayers.forEach(player => {
        player.classList.add(PARENT_CLASS);
      });
      
      // Hide overlay elements
      const elements = node.querySelectorAll('.' + TARGET_CLASS);
      elements.forEach(element => {
        hideElement(element);
      });
    }
  }

  // Function to hide all existing overlay elements and add parent class
  function initializeHiding() {
    // Add class to parent elements
    addClassToParent();
    
    // Hide any existing overlay elements
    const elements = document.querySelectorAll('.' + TARGET_CLASS);
    elements.forEach(element => {
      hideElement(element);
    });
  }

  // Run immediately to hide any existing elements
  initializeHiding();

  // Use MutationObserver to watch for dynamically added elements
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // Check each added node
      mutation.addedNodes.forEach(function(node) {
        // Only process element nodes (not text nodes, comments, etc.)
        if (node.nodeType === Node.ELEMENT_NODE) {
          checkAndHideElements(node);
        }
      });
      
      // Also watch for class attribute changes on existing elements
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        
        // If it's a video player, ensure our class is added
        if (target.classList && target.classList.contains('html5-video-player')) {
          if (!target.classList.contains(PARENT_CLASS)) {
            target.classList.add(PARENT_CLASS);
          }
        }
        
        // If it's an overlay element, hide it
        if (target.classList && target.classList.contains(TARGET_CLASS)) {
          hideElement(target);
        }
      }
    });
  });

  // Start observing when DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
    });
  }
})();
