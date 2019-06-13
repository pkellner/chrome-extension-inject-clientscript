chrome.browserAction.onClicked.addListener(tab => {
  chrome.browserAction.setTitle({ title: "Hi " + tab.id });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(
      `background.js:tabs[0].id:${tabs[0].id} about to send greeting hello`
    );
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
      response
    ) {
      chrome.browserAction.setTitle({ title: response.farewell });
      console.log(response.farewell);
    });
  });
});

// chrome.tabs.onActivated.addListener(function(activeInfo) {
//   console.log(activeInfo.tabId);
//   chrome.browserAction.setBadgeText({
//     text: ''
//   });
// });

// bug fix for dec tools problem below
// https://stackoverflow.com/questions/28786723/why-doesnt-chrome-tabs-query-return-the-tabs-url-when-called-using-requirejs
// let activeTabId;
//
// chrome.tabs.onActivated.addListener(function(activeInfo) {
//   activeTabId = activeInfo.tabId;
// });
//
// function getActiveTab(callback) {
//   chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
//     var tab = tabs[0];
//
//     if (tab) {
//       callback(tab);
//     } else {
//       chrome.tabs.get(activeTabId, function(tab) {
//         if (tab) {
//           callback(tab);
//         } else {
//           console.log("No active tab identified.");
//         }
//       });
//     }
//   });
// }
//
// const friendlySizeBytes = bytes => {
//   if (!bytes) {
//     return "---";
//   }
//   if (bytes == 0) {
//     return "0.0 B";
//   } else if (bytes < 1000) {
//     // returns 7b
//     return `${bytes}b`;
//   } else if (bytes < 1000000) {
//     // returns 70K
//     return `${(bytes / 1000).toFixed(0)}K`;
//   } else if (bytes < 10000000) {
//     // returns 2.7M
//     return `${(bytes / 1000000).toFixed(1)}M`;
//   } else if (bytes < 1000000000) {
//     // returns 27M
//     return `${(bytes / 1000000).toFixed(0)}M`;
//   } else {
//     // returns >1G
//     return ">1G";
//   }
// };
//
// // bug fix for dec tools problem above
//
// // for debugging purposes, this set the local storage when the
// //  extension loads up. this will come from options later.
// // if (window.localStorage.getItem("pict") === null) {
// //   console.log("setting pict");
// //   console.log("setting pict");
// //   window.localStorage.setItem("pict", "http://localhost:8000/3.jpg");
// // }
//
// // function getNextDataFromLocalStorage() {
// //   var podData;
// //   var localStorageKey = 'NextJSData'; // constants.NASAPOD_KEY;
// //   var data = window.localStorage.getItem(localStorageKey);
// //   return data;
// // }
