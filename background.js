chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "processNextJs1" }, function(
      response
    ) {
      // for now, nothing to do here.  just sending message and return will
      //   come frm a sendMessage in inject-script.js
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  const badgeText = request.version && request.version !== -1 ? request.version : "oops";
  chrome.browserAction.setBadgeText({
    text: badgeText.toString(),
    tabId: sender.tab.id
  });
});

// bug fix for dec tools problem below
// https://stackoverflow.com/questions/28786723/why-doesnt-chrome-tabs-query-return-the-tabs-url-when-called-using-requirejs
let activeTabId;

chrome.tabs.onActivated.addListener(function(activeInfo) {
  activeTabId = activeInfo.tabId;
});

function getActiveTab(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    var tab = tabs[0];

    if (tab) {
      callback(tab);
    } else {
      chrome.tabs.get(activeTabId, function(tab) {
        if (tab) {
          callback(tab);
        } else {
          console.log("No active tab identified.");
        }
      });
    }
  });
}
