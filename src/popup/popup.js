document.addEventListener('DOMContentLoaded', function () {
    //* === HIDE BUTTON === 
    var hideButton = document.getElementById("hide-button");
    hideButton.addEventListener('click', hide, false);
    // ? Check if the "hidden" setting is checked.
    chrome.storage.sync.get({ 'hidden': false }, function (result) {
        hideButton.checked = result.hidden;
    });

    function hide() {
        chrome.storage.sync.set({ "hidden": hideButton.checked });
        chrome.tabs.query({}, function (tabs) {
            for (const tab of tabs) {
                if (isSupportedStreamingSite(tab.url)) {
                    tabsToReload.push(tab.id);
                    refreshButton.style.display = "block";
                }
            }
        });
    }

    //* === COLOR BUTTON === 
    var colorButton = document.getElementById("color-button");
    colorButton.addEventListener('click', color, false)

    // ? Check if the "color" setting is checked.
    chrome.storage.sync.get({ "color": true }, (result) => {
        colorButton.checked = result.color;
    });

    function color() {
        chrome.storage.sync.set({ "color": colorButton.checked });   
    }

}, false)

