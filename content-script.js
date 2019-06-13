chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  // if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
  document.addEventListener("jquery-version", onVersionRecieved, {
    once: true
  });

  function onVersionRecieved(event) {
    if (event.detail) {
      //alert(`content-scriptx: Return From inject-script ${event.detail}`);
      console.log(`content-scriptx: Return From inject-script ${event.detail}`);
    } else {
      //alert(`content-scriptx: Return From inject-script  no event.detail`);
      console.log(
        `content-scriptx: Return From inject-script  no event.detail`
      );
    }

    if (request.greeting == "hello")
      sendResponse({ farewell: "goodbye " + event.detail });
  }

  const versionScript = document.createElement("script");
  versionScript.src = chrome.runtime.getURL("inject-script.js");
  versionScript.onload = function autoUnload() {
    this.remove;
  };
  document.body.appendChild(versionScript);
});

// https://developer.chrome.com/extensions/content_scripts#host-page-communication
window.addEventListener(
  "message",
  function(event) {

    // We only accept messages from ourselves
    if (event.source != window) return;


    if (event.data.type && event.data.type == "FROM_PAGE") {
      console.log("Content script received: " + event.data.text);
      debugger;
      chrome.runtime.sendMessage({greeting: `test from content-script:${event.data.text}`}, function(response) {
        debugger;
        console.log(response.farewell);
      });

    }
  },
  false
);

// document.addEventListener("jquery-version", onVersionRecieved, { once: true });
//
// function onVersionRecieved(event) {
//   if (event.detail) {
//     alert(`content-script: Return From inject-script ${event.detail}`);
//   } else {
//     alert(`content-script: Return From inject-script  no event.detail`);
//   }
// }
//
// const versionScript = document.createElement("script");
// versionScript.src = chrome.runtime.getURL("inject-script.js");
// versionScript.onload = function autoUnload() {
//   this.remove;
// };
// document.body.appendChild(versionScript);
