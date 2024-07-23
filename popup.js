// popup.js
document.addEventListener('DOMContentLoaded', function() {
    var darkModeToggle = document.getElementById('darkModeToggle');
  
    // Load the current state of the dark mode
    chrome.storage.sync.get('darkModeEnabled', function(data) {
      darkModeToggle.checked = data.darkModeEnabled;
    });
  
    // Save the state when the toggle is clicked
    darkModeToggle.addEventListener('change', function() {
      chrome.storage.sync.set({darkModeEnabled: this.checked}, function() {
        // Notify the background script to update all tabs
        chrome.runtime.sendMessage({action: "updateDarkMode"});
      });
    });
  });