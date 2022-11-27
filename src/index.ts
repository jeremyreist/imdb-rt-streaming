import { onDisneyDetailsScreen, onDisneyWatchPage } from "./sites/disney+";
import { getNetflixTitleHref, onNetflixHomepage, onNetflixWatchPage } from "./sites/netflix";
import { getHBOTitleHref, onHBOHomepage, onHBOWatchPage } from "./sites/hbo";
import { getRatings } from "./utils/utils";

enum StreamingSite {
  Netflix,
  DisneyPlus,
  HBOMax,
  None,
}

enum PageType {
  Homepage,
  Details,
  Watching,
  None,
}

// clear stored ratings 
chrome.storage.local.clear();

var currSite = StreamingSite.None;
var lastViewedTitleHref = null;
window.addEventListener("load", onLoad);

function onLoad(event: Event) {
  // Determine what streaming site we are on
  if (window.location.href.indexOf("netflix.com/") > -1) {
    currSite = StreamingSite.Netflix;

    window.addEventListener("mousedown", function () {
      if (getNetflixTitleHref()){
        lastViewedTitleHref = getNetflixTitleHref();
      }
    });

  } else if (window.location.href.indexOf("disneyplus.com/") > -1) {
    currSite = StreamingSite.DisneyPlus;

  } else if (window.location.href.indexOf("hbomax.com/") > -1) {
    currSite = StreamingSite.HBOMax;
    window.addEventListener("mousedown", function () {
      if (getHBOTitleHref()){
        lastViewedTitleHref = getHBOTitleHref();
      }
    });
  }

  // Start observing the DOM for mutations
  const targetNode = document.getRootNode();
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(onDomChange);
  observer.observe(targetNode, config);
}

// Maxiumum one call per DOM change.
var previousDomChangeType = null; 

async function onDomChange() {
  if (currSite === StreamingSite.Netflix) {
    if (getPageType() === PageType.Homepage){
      onNetflixHomepage();
      previousDomChangeType = PageType.Homepage
    }

    if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching){
      previousDomChangeType = PageType.Watching
      if (lastViewedTitleHref){
        onNetflixWatchPage(lastViewedTitleHref);
      }
    }
  }

  // ------------------

  if (currSite === StreamingSite.DisneyPlus) {
    // We can't do disney plus ratings on hover on the main page
    // this is because we don't have access to the link of the show/movie at any point, anywhere on the homepage.
    // the most we can get is the title of the show in the current language, but that could cause issues.
    if (getPageType() === PageType.Homepage && previousDomChangeType != PageType.Homepage){
      previousDomChangeType = PageType.Homepage
      lastViewedTitleHref = null;
    }

    // We can only load the rating on the details screen.
    if (getPageType() === PageType.Details && lastViewedTitleHref != window.location.href){
      previousDomChangeType = PageType.Details
      lastViewedTitleHref = window.location.href;
      onDisneyDetailsScreen();
    }

    if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching){
      previousDomChangeType = PageType.Watching
      if (lastViewedTitleHref){
        onDisneyWatchPage(lastViewedTitleHref);
      }
    }
  }

  // ------------------

  if (currSite === StreamingSite.HBOMax) {
    if (getPageType() === PageType.Homepage){
      previousDomChangeType = PageType.Homepage;
      onHBOHomepage();
    }

    if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching){
      previousDomChangeType = PageType.Watching;
      onHBOWatchPage(window.location.href); 
    }
  }
}

function getPageType(): PageType{
  var currPage = PageType.None

  if (currSite === StreamingSite.Netflix){
    if (window.location.href.indexOf("browse?jbv") > -1){
      currPage = PageType.Details
    } else if (window.location.href.indexOf("watch") > -1){
      currPage = PageType.Watching
    } else {
      currPage = PageType.Homepage
    }
  }

  if (currSite === StreamingSite.DisneyPlus){
    if (window.location.href.indexOf("home") > -1){
      currPage = PageType.Homepage
    } else if (/.*\/(movies|series)\/.*\/.*/.test(window.location.href)){
      currPage = PageType.Details 
    } else if (window.location.href.indexOf("video") > -1){
      currPage = PageType.Watching
    } else {
      currPage = PageType.None
    }
  }

  if (currSite === StreamingSite.HBOMax){
    if (window.location.href.indexOf("player") > -1){
      currPage = PageType.Watching
    } else if ( window.location.href.indexOf(":type:series") > -1
        ||  window.location.href.indexOf(":type:feature") > -1){
      currPage = PageType.Details
    } else if (  window.location.href.indexOf("/page/urn:hbo:page:") > -1
        ||       window.location.href.indexOf(":collection:") > -1
        ||       window.location.href.indexOf(":franchise:") > -1 ){
      currPage = PageType.Homepage
    } else {
      currPage = PageType.None
    }
  }
  return currPage
}