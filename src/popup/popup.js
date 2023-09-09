document.addEventListener('DOMContentLoaded', function () {
    var tabsToReload = [];
    //* === REFRESH BUTTON ===
    var refreshButton = document.getElementById("refresh-page-button");
    refreshButton.addEventListener("click", function () {
        for (tab of tabsToReload)
            chrome.tabs.reload(tab);
        window.close();
    });
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

function isSupportedStreamingSite(url) {
    return url.indexOf("netflix.com") > -1 ||
        url.indexOf("disneyplus.com") > -1 ||
        url.indexOf("hbomax.com") > -1 ||
        url.indexOf("play.max.com") > -1;
}
//TODO: REMAKE POPUP FOLLOW THIS STYLE GUIDE https://github.com/features