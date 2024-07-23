(function() {
  const invertStyles = `
    html, article {
      background-color: #fff !important;
    }
    html.dark-mode-inverted {
      filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(85%);
      -webkit-filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(85%);
    }
    body {
      background-color: #fff !important;
    }
    html.dark-mode-inverted img,
    html.dark-mode-inverted video,
    html.dark-mode-inverted iframe,
    html.dark-mode-inverted canvas,
    html.dark-mode-inverted [style*="background-image"] {
      filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(85%);
      -webkit-filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(85%);
    }
    html.dark-mode-inverted .no-invert {
      filter: none !important;
      -webkit-filter: none !important;
    }
  `;

  function isAlreadyDarkMode() {
    const bodyColor = window.getComputedStyle(document.body).backgroundColor;
    const isDarkColor = (color) => {
      const rgb = color.match(/\d+/g);
      if (rgb) {
        const [r, g, b] = rgb.map(Number);
        return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
      }
      return false;
    };
    return isDarkColor(bodyColor);
  }

  function createStyleElement(styles) {
    const style = document.createElement('style');
    style.id = 'dark-mode-style';
    style.textContent = styles;
    return style;
  }

  function appendStyle(style) {
    const targets = [document.head, document.documentElement, document.body];
    for (const target of targets) {
      try {
        if (target) {
          target.appendChild(style);
          break;
        }
      } catch (error) {
        console.error("Failed to inject style into", target, error);
      }
    }
  }

  function applyInversion() {
    if (isAlreadyDarkMode()) {
      console.log("Site appears to be in dark mode already. Not inverting.");
      return;
    }

    const style = createStyleElement(invertStyles);
    appendStyle(style);
    document.documentElement.classList.add('dark-mode-inverted');

    document.querySelectorAll('.stock-chart, .crypto-chart, .price-graph').forEach(el => el.classList.add('no-invert'));

    // Apply styles to shadow DOM elements
    document.querySelectorAll('*').forEach(el => {
      if (el.shadowRoot) {
        appendStyleToShadowRoot(el.shadowRoot, style);
      }
    });
  }

  function appendStyleToShadowRoot(shadowRoot, style) {
    const shadowStyle = style.cloneNode(true);
    shadowRoot.appendChild(shadowStyle);
  }

  function removeInversion() {
    const style = document.getElementById('dark-mode-style');
    if (style) {
      style.remove();
    }
    document.documentElement.classList.remove('dark-mode-inverted');
    document.querySelectorAll('.no-invert').forEach(el => el.classList.remove('no-invert'));
  }

  function toggleDarkMode() {
    chrome.storage.sync.get('darkModeEnabled', function(data) {
      if (data.darkModeEnabled) {
        applyInversion();
      } else {
        removeInversion();
      }
    });
  }

  function onMutation(mutations) {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        chrome.storage.sync.get('darkModeEnabled', function(data) {
          if (data.darkModeEnabled) {
            applyInversion();
          }
        });
      }
    });
  }

  // Initial check on page load
  toggleDarkMode();

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === "toggleDarkMode") {
      toggleDarkMode();
    }
  });

  // Observe for dynamically added content
  const observer = new MutationObserver(onMutation);
  observer.observe(document.body, { childList: true, subtree: true });

  // Re-apply dark mode on window resize and scroll events
  window.addEventListener('resize', toggleDarkMode);
  window.addEventListener('scroll', toggleDarkMode);

  // Optional: Periodically check and apply dark mode
  // setInterval(toggleDarkMode, 5000);

})();