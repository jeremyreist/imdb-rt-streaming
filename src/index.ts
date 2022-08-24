import { onDisneyDetailsScreen } from "./sites/disney+";

enum StreamingSite {
  Netflix,
  DisneyPlus,
  None,
}

enum PageType {
  Homepage,
  Details,
  None,
}

var currSite = StreamingSite.None;
window.addEventListener("load", onLoad);

function onLoad(event: Event) {
  // Determine what streaming site we are on
  if (window.location.href.indexOf("https://www.netflix.com/") > -1) {
    currSite = StreamingSite.Netflix;
  } else if (window.location.href.indexOf("https://www.disneyplus.com/") > -1) {
    currSite = StreamingSite.DisneyPlus;
  }
  // Start observing the DOM for mutations
  const targetNode = document.getRootNode();
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(onDomChange);
  observer.observe(targetNode, config);
}

var hasLoadedDetails = false;
function onDomChange(mutationList, observer) {
  if (currSite === StreamingSite.Netflix) {
    // do netflix trigger
  }

  if (currSite === StreamingSite.DisneyPlus) {
    // We can't to disney plus ratings on hover on the main page
    // this is because we don't have access to the link of the show/movie at any point, anywhere on the homepage.
    // the most we can get is the title of the show in the current language, but that could cause issues.

    // We can only load the rating on the details screen.
    if (getPageType() === PageType.Details && !hasLoadedDetails){
      onDisneyDetailsScreen();
      hasLoadedDetails = true
    }

    if (getPageType() === PageType.Homepage){
      hasLoadedDetails = false
    }
  }
}

function getPageType(): PageType{
  var currPage = PageType.None

  if (currSite = StreamingSite.DisneyPlus){
    if (window.location.href.indexOf("home") > -1){
      currPage = PageType.Homepage
    } else if (window.location.href.indexOf("series") > -1 || window.location.href.indexOf("movie") > -1 ){
      currPage = PageType.Details
    } else {
      currPage = PageType.None
    }
  }

  return currPage
}