import { netflix, get_title_href } from "./main/netflix";
import { get_api_data } from "./main/utils/utils"

// Once we detect a change in the DOM, call the handler, which then calls the function.
$(".netflix-sans-font-loaded").bind("DOMSubtreeModified", HandleDOM_Change);

var hidden, color;
setInterval(function CheckSettings() {
  chrome.storage.local.get({ hidden: false }, function (result) {
    hidden = result.hidden;
  });

  chrome.storage.local.get({ color: true }, function (result) {
    color = result.color;
  });
}, 300);


var current_target;
var new_target;
function HandleDOM_Change() {
  new_target = document.getElementsByClassName("previewModal--info")[0];
  if (new_target !== current_target && new_target) {
    current_target = new_target;
    netflix(hidden, color);
  }
}

// Telemetry data
let last_clicked_title = null;
var old_title_href = document.location.href;
var finished_logging = true;

window.addEventListener("mousedown", function () {
  // get title id from /title/ url of parent node being clicked on.
  try {
    last_clicked_title = get_title_href();
  } catch (TypeError) {
    // They did not click on a title
  }
});

window.onload = function () {
  // Clears storage so we get up to date ratings
  chrome.storage.local.clear();

  // Telemetry reporting
  var bodyList = document.querySelector("body");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(async function () {
      if (old_title_href != document.location.href && finished_logging) {
        finished_logging = false;
        old_title_href = document.location.href;
        if (window.location.href.startsWith("https://www.netflix.com/watch/")) {
          if (last_clicked_title) {
            await get_api_data(last_clicked_title, "", true);
          }
        }
        finished_logging = true;
      }
    });
  });

  var config = {
    childList: true,
    subtree: true,
  };

  observer.observe(bodyList, config);
};
