document.addEventListener('DOMContentLoaded', function () {
  
    //* === HIDE BUTTON === 
    var hideButton = document.getElementById("hide-button");
    hideButton.addEventListener('click', hide, false)
    
    // ? Check if the "hidden" setting is checked.
    chrome.storage.local.get({'hidden' : false}, function(result) {
        hideButton.checked = result.hidden;
    });

    function hide() {
        chrome.storage.local.set({"hidden": hideButton.checked}, function() {});
    }

    //* === COLOR BUTTON === 
    var colorButton = document.getElementById("color-button");
    colorButton.addEventListener('click', color, false)

    // ? Check if the "color" setting is checked.
    chrome.storage.local.get({'color' : true}, function(result) {
        colorButton.checked = result.color;
    });
    
    function color() {
        chrome.storage.local.set({"color": colorButton.checked}, function() {});
    }
    
}, false)