document.addEventListener('DOMContentLoaded', function () {

    //* === HIDE BUTTON === 
    var hideButton = document.getElementById("hide-button");
    hideButton.addEventListener('click', hide, false);
    // ? Check if the "hidden" setting is checked.
    chrome.storage.local.get({ 'hidden': false }, function (result) {
        hideButton.checked = result.hidden;
    });

    function hide() {
        chrome.storage.local.set({ "hidden": hideButton.checked }, function () { });
    }

    //* === COLOR BUTTON === 
    var colorButton = document.getElementById("color-button");
    colorButton.addEventListener('click', color, false)

    // ? Check if the "color" setting is checked.
    // Use localStorage to save the values across browser sessions
    // and use chrome.storage.local so that the values can be accessed in TypeScript files.
    currentValue = localStorage.getItem('color');
    if (!currentValue) {
        currentValue = 'true';
        localStorage.setItem('color', currentValue);
    }
    chrome.storage.local.set({ "color": currentValue == 'true' ? true : false });
    colorButton.checked = (currentValue == 'true');

    function color() {
        localStorage.setItem('color', colorButton.checked ? 'true' : 'false');
        chrome.storage.local.set({ "color": colorButton.checked }, function () { });
    }
}, false);

//TODO: REMAKE POPUP FOLLOW THIS STYLE GUIDE https://github.com/features