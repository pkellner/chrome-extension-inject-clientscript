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
      alert(`content-scriptx: Return From inject-script ${event.detail}`);
    } else {
      alert(`content-scriptx: Return From inject-script  no event.detail`);
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
