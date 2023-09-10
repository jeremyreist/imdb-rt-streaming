import { addLoader, delay, getRatings, removeLoader } from "../../utils/utils"

var lastHoveredTitleHref = null;
var tilesLoadedOrBeingLoaded = new Set();
var allVisibleTiles = new Set();

export function clearAllHBOTiles() {
  tilesLoadedOrBeingLoaded.clear();
  allVisibleTiles.clear();
  lastHoveredTitleHref = null;
}

export async function onHBOHomepage() {
  if (window.location.href.indexOf("play.max.com") > -1) {
    handleVisibleTiles();
  }
  else {
    const titleHref = getHBOTitleHref()
    // Makes sure we only load once per element
    if (lastHoveredTitleHref != titleHref) {
      lastHoveredTitleHref = titleHref;
      if (titleHref) {
        handleTitleCardHover()
      }
    }
  }
}

export async function onHBODetailsScreen() {
  if (window.location.href.indexOf("play.max.com") > -1) {
    let metaElement = document.querySelector('meta[property="og:url"]');
    let showName = document.getElementsByTagName('title')[0].innerHTML;
    let i = 0;
    // Wait a max of 10s for title-containing element to appear.
    while ((!metaElement || showName == "Max" || showName == "Home • Max") && i < 1000) {
      await delay(10);
      metaElement = document.querySelector('meta[property="og:url"]');
      showName = document.getElementsByTagName('title')[0].innerHTML;
      i++;
    }
    let titleHref;
    if (metaElement) {
      titleHref = metaElement.getAttribute('content');
    } else {
      console.log('Error: play link not found.');
      return;
    }

    showName = showName.slice(0, showName.indexOf(" • Max"));
    if (!tilesLoadedOrBeingLoaded.has(showName)) {
      tilesLoadedOrBeingLoaded.add(showName);
      let ratings;
      try {
        ratings = await getRatings({ id: titleHref });
      }
      catch (error) {
        console.log("Error getting ratings for: " + titleHref);
        console.log(error);
        ratings = { rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFFFFF", rt_color: "#FFFFFF" };
      }

      const ratingsElement = document.createElement("h2");
      ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
      ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>
      \u00A0<img style="width:15px" src="${ratings.rt_critic_icon}">\u00A0<span style="color:${ratings.rt_audience_color}"> ${ratings.rt_audience_rating}\u00A0</span><img style="width:15px" src="${ratings.rt_audience_icon}">`;
      ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 14px; letter-spacing: 0.5px; line-height: 18px; padding-left:20px; margin-top:30px');
      ratingsElement.style.opacity = '0';
      while (document.getElementsByClassName("StyledButtonRowWrapper-Beam-Web-Ent__sc-1kctvbk-0 bZyQWW").length <= 0) {
        await delay(10);
      }
      const parent = document.getElementsByClassName("StyledButtonRowWrapper-Beam-Web-Ent__sc-1kctvbk-0 bZyQWW")[0];
      if (parent.getElementsByClassName("ratings").length == 0) {
        parent.children[1].appendChild(ratingsElement);
        fadeIn(ratingsElement, 0.0);
      }
    }
    handleVisibleTiles();
  }
  else {
    const titleHref = window.location.href.slice(0, window.location.href.indexOf(":type:"));
    const ratings = await getRatings({ id: titleHref });
    const ratingsElement = document.createElement("h2");
    ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
    ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 14px; letter-spacing: 0.5px; line-height: 18px; padding-left:20px');

    var attempts = 0;
    while (true) {
      await delay(1000);
      // done because of the dynamic page loading taking time
      const buttonContainers = document.getElementsByClassName('css-175oi2r r-1awozwy r-18u37iz r-1mnahxq');
      if (buttonContainers.length) { // If we have results from the query selector
        for (let index = 0; index < buttonContainers.length; index++) {
          if (getComputedStyle(buttonContainers[index]).display == 'flex') {
            buttonContainers[index].appendChild(ratingsElement);
            fadeIn(ratingsElement, 0.1);
          }
        }
        break;
      } else {
        attempts += 1;
        await delay(100);
      }
      if (attempts === 100) {
        console.error("Failed to get ratings!")
      }
    }
  }
}

export async function onHBOWatchPage(titleHref: string) {

  if (titleHref.indexOf("?exitPageUrn") > 0) {
    titleHref = titleHref.slice(0, titleHref.indexOf("?exitPageUrn"));
  }

  var spliceIndex = window.location.href.indexOf(":episode:") + ":episode:".length;
  if (spliceIndex == 8) {
    spliceIndex = window.location.href.indexOf(":feature:") + ":feature:".length;
  }
  // 21 is length of ID
  const episodeID = window.location.href.slice(spliceIndex, spliceIndex + 21);

  var exitPageUrn = null;
  if (window.location.href.indexOf('?exitPageUrn=') > 0 && window.location.href.indexOf('episode') > 0) {
    exitPageUrn = window.location.href.slice(window.location.href.indexOf('?exitPageUrn=') + '?exitPageUrn='.length)
  }


  var limit = 0;
  if (titleHref.indexOf('series') == 0) {
    titleHref = ""
  } else if (exitPageUrn) {
    titleHref = 'https://play.hbomax.com' + exitPageUrn.replace('series', 'page') + ':type:series'
  }
  getRatings({ id: titleHref, episode: episodeID, click: true });

  await delay(5000);

  // Waits for the video to load.
  while (!document.getElementsByTagName('video').length || limit > 50) {
    limit += 1;
    await delay(500);
  }
  var endTime: number
  var startTime: number
  var duration: number;

  startTime = document.getElementsByTagName('video')[0].currentTime;
  duration = document.getElementsByTagName('video')[0].duration;

  // While we are still watching the show, update the end time.
  while (window.location.href.indexOf(episodeID) > 0) {
    try {
      if (window.location.href.indexOf(episodeID) > 0) {
        if (!isNaN(document.getElementsByTagName('video')[0].currentTime)) {
          endTime = document.getElementsByTagName('video')[0].currentTime;
        }
      }
    } catch (error) {
      console.log(error)
      break;
    }
    await delay(10);
  }
  var start = Math.floor((startTime / duration) * 100);
  var end = Math.floor((endTime / duration) * 100);

  if (isNaN(start)) {
    console.log('Got NAN for start')
    start = 0;
  }

  if (isNaN(end)) {
    console.log('Got NAN for end')
    end = 0;
  }

  getRatings({ id: titleHref, episode: episodeID, click: true, start: start, end: end });

}

async function handleTitleCardHover() {
  const hoveredTitleCard = Array.from(document.querySelectorAll(":hover")).pop().closest('a');
  // ensures we only load the rating once per title card
  if (hoveredTitleCard.parentElement.querySelectorAll(".ratings-loader,.ratings").length == 0
    && hoveredTitleCard.href.includes(':type:')
    && !(hoveredTitleCard.href.includes('episode'))) {
    addLoader(hoveredTitleCard.children[0].children[0], 0.75);
    var ratings = { rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF" };
    const titleHref = getHBOTitleHref();

    try {
      ratings = await getRatings({ id: titleHref });
    } catch (error) {
      console.log(error);
    }

    // Select class name based on existing elements.
    const ratingsElement = document.createElement("h2");
    ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
    ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 12px; letter-spacing: 0.5px; line-height: 18px;');
    removeLoader(hoveredTitleCard.children[0].children[0]);
    // Insert ratings element if not a trailer
    if (!hoveredTitleCard.href.includes('extra')) {
      var inserted = false;

      for (let index = 0; index < hoveredTitleCard.children.length; index++) {
        if (hoveredTitleCard.children[index].getAttribute('data-testid') == 'attribution-text'
          || hoveredTitleCard.children[index].getAttribute('data-testid') == 'tile-details-container') {
          hoveredTitleCard.insertBefore(ratingsElement, hoveredTitleCard.children[index]);
          inserted = true;
        }
      }
      if (!inserted) {
        hoveredTitleCard.appendChild(ratingsElement)
      }

      fadeIn(ratingsElement, 0.1);
    }
  }
}

async function handleVisibleTiles() {
  // Select only visible tiles.
  let tiles = document.querySelectorAll('.StyledTileLink-Beam-Web-Ent__sc-ljn9vj-25.cWVPKn.skipNavFocusable[data-first-visible="true"]');
  for (let i = 0; i < tiles.length; i++) {
    allVisibleTiles.add(tiles[i]);
  }

  if (allVisibleTiles.size == tilesLoadedOrBeingLoaded.size) return;
  for (const tile of allVisibleTiles) {
    let tileElement, tileSection, isTopTen: boolean;
    try {
      tileElement = (tile as HTMLLinkElement);
    }
    catch (error) {
      console.log("Encountered an error processing tile: " + tile);
      console.log(error);
    }
    try {
      // The row of tiles containing this tile.
      tileSection = tileElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      isTopTen = tileSection.getAttribute("data-testid") == "home-page-rail-top-10-movies_numberedRail"
        || tileSection.getAttribute("data-testid") == "home-page-rail-top-10-series_numberedRail";
    }
    catch (error) {
      // Don't do anything, since this can actually be expected behavior in certain cases
      // such as in the search page where there are no tile sections.
    }

    // If the current tile already has ratings or is currently being processed, or is null, skip.
    let showName = tileElement.getAttribute("aria-label");
    if (tileElement.getElementsByTagName('h2').length > 0 ||
      tilesLoadedOrBeingLoaded.has(showName)
      || tileElement.href == null) continue;

    // Prevent duplicates being added from other threads.
    tilesLoadedOrBeingLoaded.add(showName);
    let ratings;
    try {
      ratings = await getRatings({ id: tileElement.href });
    }
    catch (error) {
      console.log("Error getting ratings for: " + tileElement.href);
      console.log(error);
      ratings = { rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFFFFF", rt_color: "#FFFFFF" };
    }

    const ratingsElement = document.createElement("h2");
    ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
    ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span>\u00A0Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 10px; letter-spacing: 0.5px; line-height: 18px;');
    ratingsElement.style.opacity = '0';
    // Special UI for top ten series/movies section on homepage.
    if (isTopTen) {
      ratingsElement.style.marginLeft = '80px';
      ratingsElement.style.position = 'absolute';
      tileElement.parentElement.parentElement.style.height = '249px';
    }
    tileElement.appendChild(ratingsElement);
    fadeIn(ratingsElement, 0.0);
  }
}

function fadeIn(item, i) {
  i += 0.2;
  item.style.opacity = i;
  if (i < 1)
    setTimeout(() => fadeIn(item, i), 50);
}

export function getHBOTitleHref(): string | null {
  const hoveredTitleCard = Array.from(document.querySelectorAll(":hover")).pop();
  try {
    const titleHref = hoveredTitleCard.closest('a').href;
    return titleHref.slice(
      0,
      titleHref.indexOf(":type:")
    );
  } catch (TypeError) {
    return null
  }
}

