import { disneyMouseOut, disneyMouseOver } from "./sites/disney+";

enum StreamingSite {
    Netflix,
    DisneyPlus,
    None
}

var currSite = StreamingSite.None

window.addEventListener("load", onLoad);

function onLoad(event: Event) {
    // Determine what streaming site we are on
    if (window.location.href.indexOf("https://www.netflix.com/") > -1) {
        currSite = StreamingSite.Netflix
    } else if (window.location.href.indexOf("https://www.disneyplus.com/") > -1) {
        currSite = StreamingSite.DisneyPlus
    }

    const targetNode = document.getRootNode();
    const config = { childList: true, subtree: true };
    const observer = new MutationObserver(onDomChange);
    observer.observe(targetNode, config);
}

// Add an event listener to every title card, onmouseover load the ratings , options = once
function onDomChange(mutationList, observer){
    if (currSite === StreamingSite.Netflix){
        // do netflix trigger
    }

    if (currSite === StreamingSite.DisneyPlus){
        // We can't to disney plus ratings on dom change
        // this is because we don't have access to the link of the show/movie at any point, anywhere on the homepage.
        // the most we can get is the title of the show in the current language, but that could cause issues.
        // therefore we can only load the rating on the details screen.
    }

};