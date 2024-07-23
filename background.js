// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateDarkMode") {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, {action: "toggleDarkMode"});
      });
    });
  }
});