/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/utils.ts
let critic_fresh_src = chrome.runtime.getURL("critic_fresh.svg");
let critic_rotten_src = chrome.runtime.getURL("critic_rotten.svg");
let audience_fresh_src = chrome.runtime.getURL("audience_fresh.svg");
let audience_rotten_src = chrome.runtime.getURL("audience_rotten.svg");
async function getRatings(params) {
    const { id, episode, api = "8mds8d7d55", click, start, end } = { ...params };
    let colorsEnabled = (await chrome.storage.sync.get({ 'color': true })).color;
    if (!click) {
        const localRating = await checkLocalStorage(id);
        if (localRating) {
            updateLocalRatingColors(localRating, colorsEnabled);
            return localRating;
        }
    }
    const apiUrl = new URL(`https://filmtoro.com/api/watch.asp`);
    apiUrl.searchParams.append('id', id);
    apiUrl.searchParams.append('api', api);
    if (typeof click !== 'undefined')
        apiUrl.searchParams.append('click', click.toString());
    if (typeof episode !== 'undefined')
        apiUrl.searchParams.append('episode', episode);
    if (typeof start !== 'undefined')
        apiUrl.searchParams.append('start', start.toString());
    if (typeof end !== 'undefined')
        apiUrl.searchParams.append('end', end.toString());
    const request = await fetch(apiUrl);
    const response = formatApiData(await request.json(), colorsEnabled);
    await addToLocalStorage(id, response);
    return response;
}
function updateLocalRatingColors(rating, colorsEnabled) {
    if (colorsEnabled) {
        let rt_integer, imdb_integer, rt_audience_integer;
        // Edge case: rating = 100. 
        if (rating.rt_rating.length > 3)
            rt_integer = 100;
        else
            rt_integer = parseInt(rating.rt_rating.slice(0, 2));
        if (rating.rt_audience_rating.length > 3)
            rt_audience_integer = 100;
        else
            rt_audience_integer = parseInt(rating.rt_audience_rating.slice(0, 2));
        imdb_integer = parseInt(rating.imdb_rating.slice(0, 1)) * 10 + parseInt(rating.imdb_rating.slice(2));
        if (!isNaN(rt_integer))
            rating.rt_color = getHexColor(rt_integer);
        if (!isNaN(imdb_integer))
            rating.imdb_color = getHexColor(imdb_integer);
        if (!isNaN(rt_audience_integer))
            rating.rt_audience_color = getHexColor(rt_audience_integer);
    }
    else {
        rating.imdb_color = "#FFF";
        rating.rt_color = "#FFF";
    }
}
async function checkLocalStorage(titleHref) {
    var localStorage = await chrome.storage.local.get(["previous_ratings"]);
    if (!localStorage.previous_ratings) {
        return null;
    }
    else {
        if (localStorage.previous_ratings[titleHref]) {
            return localStorage.previous_ratings[titleHref];
        }
        return null;
    }
}
async function addToLocalStorage(titleHref, rating) {
    const initial_ratings = {};
    var result = await chrome.storage.local.get(["previous_ratings"]);
    if (!result.previous_ratings) {
        // If we have not stored previous ratings before
        initial_ratings[titleHref] = rating;
        await chrome.storage.local.set({
            previous_ratings: initial_ratings
        });
    }
    else if (!(titleHref in result.previous_ratings)) {
        // If we have stored ratings and it's not already stored
        result.previous_ratings[titleHref] = rating;
        await chrome.storage.local.set({
            previous_ratings: result.previous_ratings,
        });
    }
}
function formatApiData(apiData, colorsEnabled) {
    let output = {
        rt_rating: 'N/A', imdb_rating: 'N/A', rt_audience_rating: '',
        imdb_color: "#FFF", rt_color: "#FFF", rt_audience_color: "#FFF",
        rt_critic_icon: '', rt_audience_icon: ''
    };
    if (apiData['film_imdb_rating'] > 0) {
        output.imdb_rating = `${(apiData['film_imdb_rating'] / 10).toFixed(1)}`;
        output.imdb_color = colorsEnabled ? getHexColor(apiData['film_imdb_rating']) : "#FFF";
    }
    if (apiData['film_rt_rating'] > 0) {
        output.rt_rating = `${apiData['film_rt_rating']}%`;
        output.rt_critic_icon = apiData['film_rt_rating'] >= 50 ? critic_fresh_src : critic_rotten_src;
        output.rt_color = colorsEnabled ? getHexColor(apiData['film_rt_rating']) : "#FFF";
    }
    if (apiData['film_rt_audience'] > 0) {
        output.rt_audience_rating = `${apiData['film_rt_audience']}%`;
        output.rt_audience_icon = apiData['film_rt_audience'] >= 50 ? audience_fresh_src : audience_rotten_src;
        output.rt_audience_color = colorsEnabled ? getHexColor(apiData['film_rt_audience']) : "#FFF";
    }
    return output;
}
function getHexColor(rating) {
    // Define the endpoint colors
    const startColor = [237, 38, 48]; // Bright Red (RGB)
    const endColor = [17, 217, 17]; // Bright Green (RGB)
    // Calculate the interpolated color
    const lerpedColor = startColor.map((startValue, index) => {
        const endValue = endColor[index];
        return Math.round(startValue + (endValue - startValue) * (rating / 100));
    });
    // Convert RGB color to hex
    return rgbToHex(lerpedColor);
}
// Helper function to convert RGB color to hex color
function rgbToHex(rgb) {
    return `#${rgb.map(val => {
        const hex = val.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }).join('')}`;
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function addLoader(parent, scale = 1, insertBefore = false) {
    const loader = document.createElement("div");
    loader.className = "ratings-loader";
    loader.innerHTML = `

  <div class="loadingio-spinner-rolling-mhlz99gyu8k"><div class="ldio-ma7aqaeb3ij">
  <div></div>
  </div></div>
  <style type="text/css">
  @keyframes ldio-ma7aqaeb3ij {
    0% { transform: translate(-50%,-50%) rotate(0deg); }
    100% { transform: translate(-50%,-50%) rotate(360deg); }
  }
  .ldio-ma7aqaeb3ij div {
    position: absolute;
    width: 120px;
    height: 120px;
    border: 10px solid #ffffff;
    border-top-color: transparent;
    border-radius: 50%;
  }
  .ldio-ma7aqaeb3ij div {
    animation: ldio-ma7aqaeb3ij 1s linear infinite;
    top: 100px;
    left: 100px
  }
  .loadingio-spinner-rolling-mhlz99gyu8k {
    width: 50px;
    height: 50px;
    display: inline-block;
    overflow: hidden;
  }
  .ldio-ma7aqaeb3ij {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(0.25);
    backface-visibility: hidden;
    transform-origin: 0 0px; /* see note above */
  }
  .ldio-ma7aqaeb3ij div { box-sizing: content-box; }

  .ratings-loader {
    display: flex;
    justify-content: center;
  }

  </style>
  `;
    loader.setAttribute('style', `transform: scale(${scale});`);
    if (insertBefore) {
        parent.insertBefore(loader, parent.children[0]);
    }
    else {
        parent.appendChild(loader);
    }
}
function removeLoader(parent) {
    const loader = parent.getElementsByClassName("ratings-loader")[0];
    parent.removeChild(loader);
}

;// CONCATENATED MODULE: ./src/sites/disney+/index.ts

async function onDisneyDetailsScreen() {
    const titleHref = window.location.href;
    const ratings = await getRatings({ id: titleHref });
    const ratingsElement = document.createElement("h4");
    ratingsElement.className = "text-color--primary body-copy body-copy--large margin--left-4";
    ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    var attempts = 0;
    while (true) {
        // done because of the dynamic page loading taking time
        const parent = document.getElementsByClassName("button-play");
        if (parent.length) {
            parent[0].parentElement.appendChild(ratingsElement);
            break;
        }
        else {
            attempts += 1;
            await delay(100);
        }
        if (attempts === 100) {
            console.error("Failed to get ratings!");
        }
    }
}
async function onDisneyWatchPage(titleHref) {
    const spliceIndex = window.location.href.indexOf("video/") + "video/".length;
    const episodeID = window.location.href.slice(spliceIndex);
    var limit = 0;
    getRatings({ id: titleHref, episode: episodeID, click: true });
    // Waits for the video to load.
    while (!document.getElementsByTagName('video').length || !document.getElementsByClassName('time-remaining-label').length || limit > 50) {
        limit += 1;
        await delay(500);
    }
    var endTime;
    var startTime;
    var durationString;
    startTime = document.getElementsByTagName('video')[0].currentTime;
    durationString = document.getElementsByClassName('time-remaining-label')[0].textContent; // e.g 01:50:01
    var durationSeconds = hmsToSecondsOnly(durationString);
    // While we are still watching the show, update the end time.
    while (window.location.href.indexOf(`video/${episodeID}`) > 0) {
        try {
            if (window.location.href.indexOf(`video/${episodeID}`) > 0) {
                if (!isNaN(document.getElementsByTagName('video')[0].currentTime)) {
                    endTime = document.getElementsByTagName('video')[0].currentTime;
                }
            }
        }
        catch {
            break;
        }
        await delay(10);
    }
    const start = Math.floor((startTime / durationSeconds) * 100);
    const end = Math.floor((endTime / durationSeconds) * 100);
    getRatings({ id: titleHref, episode: episodeID, click: true, start: start, end: end });
}
function hmsToSecondsOnly(str) {
    var part = str.split(':'), seconds = 0, minutes = 1;
    while (part.length > 0) {
        seconds += minutes * parseInt(part.pop(), 10);
        minutes *= 60;
    }
    return seconds;
}

;// CONCATENATED MODULE: ./src/sites/netflix/index.ts

var lastGrabbedRatingsFromTitleCard = null;
var lastViewedTitleHref = null;
async function onNetflixHomepage() {
    const titleHref = getNetflixTitleHref();
    if (lastViewedTitleHref != titleHref) {
        lastViewedTitleHref = titleHref;
        if (titleHref) {
            handleTitleCardHover(lastViewedTitleHref);
        }
    }
}
async function onNetflixDetailsPage() {
    if (lastViewedTitleHref)
        handleShowInformationCard(lastViewedTitleHref);
    else {
        lastViewedTitleHref = getAlternateTitleHref();
        if (lastViewedTitleHref)
            handleShowInformationCard(lastViewedTitleHref);
    }
}
async function onNetflixWatchPage(titleHref) {
    const spliceIndex = window.location.href.indexOf("watch/") + "watch/".length;
    const episodeID = window.location.href.slice(spliceIndex, spliceIndex + 8);
    var limit = 0;
    getRatings({ id: titleHref, episode: episodeID, click: true });
    // Waits for the video to load.
    while (!document.getElementsByTagName('video').length || limit > 50) {
        limit += 1;
        await delay(500);
    }
    var endTime;
    var startTime;
    var duration;
    startTime = document.getElementsByTagName('video')[0].currentTime;
    duration = document.getElementsByTagName('video')[0].duration;
    // While we are still watching the show, update the end time.
    while (window.location.href.indexOf(`watch/${episodeID}`) > 0) {
        try {
            if (window.location.href.indexOf(`watch/${episodeID}`) > 0) {
                if (!isNaN(document.getElementsByTagName('video')[0].currentTime)) {
                    endTime = document.getElementsByTagName('video')[0].currentTime;
                }
            }
        }
        catch {
            break;
        }
        await delay(10);
    }
    const start = Math.floor((startTime / duration) * 100);
    const end = Math.floor((endTime / duration) * 100);
    getRatings({ id: titleHref, episode: episodeID, click: true, start: start, end: end });
}
async function handleShowInformationCard(titleHref) {
    const parent = document.getElementsByClassName("detail-modal-container")[0]; // Info box.
    addLoader(parent, /*number=*/ 1, /*insertBefore=*/ true);
    let ratings;
    if (!lastGrabbedRatingsFromTitleCard || lastGrabbedRatingsFromTitleCard.id != titleHref) {
        ratings = await getRatings({ id: titleHref, click: true });
        lastGrabbedRatingsFromTitleCard = ratings;
        lastGrabbedRatingsFromTitleCard.id = titleHref;
    }
    else {
        // Use cached ratings if we have them.
        ratings = lastGrabbedRatingsFromTitleCard;
    }
    const ratingsElement = document.createElement("span");
    ratingsElement.className = "previewModal--metadatAndControls-tags-container";
    ratingsElement.innerHTML =
        `
  <div class="evidence-tags">
    <div class="evidence-list">
      <div class="evidence-item">
        <span class="evidence-text" style="font-size:20px">
          IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span>
        </span>
      </div>
      <div class="evidence-item">
        <span class="evidence-separator"></span>
        <span class="evidence-text" style="font-size:20px">
          Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>\u00A0<img style="width:15px" src="${ratings.rt_critic_icon}">
          \u00A0<span style="color:${ratings.rt_audience_color}"> ${ratings.rt_audience_rating}\u00A0</span>
          <img style="width:15px" src="${ratings.rt_audience_icon}">
        </span>
        
      </div>
    </div>
  </div>
  `;
    removeLoader(parent);
    parent.insertBefore(ratingsElement, parent.children[0]);
}
async function handleTitleCardHover(titleHref) {
    const parent = document.getElementsByClassName("previewModal--metadatAndControls-container")[0];
    addLoader(parent);
    const ratings = await getRatings({ id: titleHref });
    lastGrabbedRatingsFromTitleCard = ratings;
    lastGrabbedRatingsFromTitleCard.id = titleHref;
    const ratingsElement = document.createElement("span");
    ratingsElement.className = "previewModal--metadatAndControls-tags-container";
    ratingsElement.innerHTML =
        `
  <div class="evidence-tags">
    <div class="evidence-list">
      <div class="evidence-item">
        <span class="evidence-text">
          IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> 
        </span>
      </div>
      <div class="evidence-item">
        <span class="evidence-separator"></span>
        <span class="evidence-text">
          Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>\u00A0<img style="width:13px" src="${ratings.rt_critic_icon}"> 
        </span>
      </div>
    </div>
  </div>
  `;
    removeLoader(parent);
    insertBeforeProgressBar(ratingsElement, parent);
}
function insertBeforeProgressBar(element, parent) {
    const progressBar = parent.getElementsByClassName("previewModal-progress")[0];
    if (progressBar) {
        parent.insertBefore(element, progressBar);
    }
    else
        parent.appendChild(element);
}
function getNetflixTitleHref() {
    var previewModal = document.getElementsByClassName("previewModal--info")[0];
    try {
        const titleHref = previewModal.children[0].href;
        return titleHref.slice(0, titleHref.indexOf("/title/") + "/title/".length + 8);
    }
    catch (TypeError) {
        return null;
    }
}
function getAlternateTitleHref() {
    if (window.location.href.indexOf("title") > -1) {
        return window.location.href;
    }
    else if (window.location.href.indexOf("jbv") > -1) {
        let titleNumber = window.location.href.slice(window.location.href.indexOf("jbv=") + 4);
        return "https://www.netflix.com/title/" + titleNumber;
    }
    return null;
}

;// CONCATENATED MODULE: ./src/sites/hbo/index.ts

var lastHoveredTitleHref = null;
var tilesLoadedOrBeingLoaded = new Set();
var allVisibleTiles = new Set();
function clearAllHBOTiles() {
    tilesLoadedOrBeingLoaded.clear();
    allVisibleTiles.clear();
    lastHoveredTitleHref = null;
}
async function onHBOHomepage() {
    if (window.location.href.indexOf("play.max.com") > -1) {
        handleVisibleTiles();
    }
    else {
        const titleHref = getHBOTitleHref();
        // Makes sure we only load once per element
        if (lastHoveredTitleHref != titleHref) {
            lastHoveredTitleHref = titleHref;
            if (titleHref) {
                hbo_handleTitleCardHover();
            }
        }
    }
}
async function onHBODetailsScreen() {
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
        }
        else {
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
                ratings = {
                    rt_rating: 'N/A', imdb_rating: 'N/A', rt_audience_rating: '',
                    imdb_color: "#FFF", rt_color: "#FFF", rt_audience_color: "#FFF",
                    rt_critic_icon: '', rt_audience_icon: ''
                };
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
            }
            else {
                attempts += 1;
                await delay(100);
            }
            if (attempts === 100) {
                console.error("Failed to get ratings!");
            }
        }
    }
}
async function onHBOWatchPage(titleHref) {
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
        exitPageUrn = window.location.href.slice(window.location.href.indexOf('?exitPageUrn=') + '?exitPageUrn='.length);
    }
    var limit = 0;
    if (titleHref.indexOf('series') == 0) {
        titleHref = "";
    }
    else if (exitPageUrn) {
        titleHref = 'https://play.hbomax.com' + exitPageUrn.replace('series', 'page') + ':type:series';
    }
    getRatings({ id: titleHref, episode: episodeID, click: true });
    await delay(5000);
    // Waits for the video to load.
    while (!document.getElementsByTagName('video').length || limit > 50) {
        limit += 1;
        await delay(500);
    }
    var endTime;
    var startTime;
    var duration;
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
        }
        catch (error) {
            console.log(error);
            break;
        }
        await delay(10);
    }
    var start = Math.floor((startTime / duration) * 100);
    var end = Math.floor((endTime / duration) * 100);
    if (isNaN(start)) {
        console.log('Got NAN for start');
        start = 0;
    }
    if (isNaN(end)) {
        console.log('Got NAN for end');
        end = 0;
    }
    getRatings({ id: titleHref, episode: episodeID, click: true, start: start, end: end });
}
async function hbo_handleTitleCardHover() {
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
        }
        catch (error) {
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
                hoveredTitleCard.appendChild(ratingsElement);
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
    if (allVisibleTiles.size == tilesLoadedOrBeingLoaded.size)
        return;
    for (const tile of allVisibleTiles) {
        let tileElement, tileSection, isTopTen;
        try {
            tileElement = tile;
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
        if (tileElement.getElementsByClassName('ratings').length > 0 ||
            tilesLoadedOrBeingLoaded.has(showName)
            || tileElement.href == null)
            continue;
        // Prevent duplicates being added from other threads.
        tilesLoadedOrBeingLoaded.add(showName);
        // Do not add ratings for channels, or specific episodes.
        if (tileElement.href.indexOf('/channel/') > -1 || tileElement.href.indexOf('/video/watch/') > -1)
            continue;
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
        ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 9px; letter-spacing: 0.5px; line-height: 18px;');
        ratingsElement.style.opacity = '0';
        // Special UI for top ten series/movies section on homepage.
        if (isTopTen) {
            ratingsElement.style.marginLeft = '70px';
            ratingsElement.style.position = 'absolute';
            tileElement.parentElement.parentElement.style.height = '249px';
        }
        // Prevents an edge-case.
        if (tileElement.getElementsByClassName('ratings').length == 0) {
            tileElement.appendChild(ratingsElement);
            fadeIn(ratingsElement, 0.0);
        }
    }
}
function fadeIn(item, i) {
    i += 0.2;
    item.style.opacity = i;
    if (i < 1)
        setTimeout(() => fadeIn(item, i), 50);
}
function getHBOTitleHref() {
    const hoveredTitleCard = Array.from(document.querySelectorAll(":hover")).pop();
    try {
        const titleHref = hoveredTitleCard.closest('a').href;
        return titleHref.slice(0, titleHref.indexOf(":type:"));
    }
    catch (TypeError) {
        return null;
    }
}

;// CONCATENATED MODULE: ./src/index.ts



var StreamingSite;
(function (StreamingSite) {
    StreamingSite[StreamingSite["Netflix"] = 0] = "Netflix";
    StreamingSite[StreamingSite["DisneyPlus"] = 1] = "DisneyPlus";
    StreamingSite[StreamingSite["HBOMax"] = 2] = "HBOMax";
    StreamingSite[StreamingSite["None"] = 3] = "None";
})(StreamingSite || (StreamingSite = {}));
var PageType;
(function (PageType) {
    PageType[PageType["Homepage"] = 0] = "Homepage";
    PageType[PageType["Details"] = 1] = "Details";
    PageType[PageType["Watching"] = 2] = "Watching";
    PageType[PageType["None"] = 3] = "None";
})(PageType || (PageType = {}));
// clear stored ratings 
chrome.storage.local.clear();
var currSite = StreamingSite.None;
var oldHref = document.location.href;
var src_lastViewedTitleHref = null;
window.addEventListener("load", onLoad);
async function onLoad(event) {
    // Check if the extension is enabled.
    if ((await chrome.storage.sync.get({ 'hidden': false })).hidden)
        return;
    // Determine what streaming site we are on
    if (window.location.href.indexOf("netflix.com/") > -1) {
        currSite = StreamingSite.Netflix;
        window.addEventListener("mousedown", function () {
            if (getNetflixTitleHref()) {
                src_lastViewedTitleHref = getNetflixTitleHref();
            }
        });
        if (window.location.href.indexOf("title") > -1) {
            onNetflixDetailsPage();
        }
    }
    else if (window.location.href.indexOf("disneyplus.com/") > -1) {
        currSite = StreamingSite.DisneyPlus;
    }
    else if (window.location.href.indexOf("hbomax.com/") > -1
        || window.location.href.indexOf("play.max.com/") > -1) {
        currSite = StreamingSite.HBOMax;
        window.addEventListener("mousedown", function () {
            if (getHBOTitleHref()) {
                src_lastViewedTitleHref = getHBOTitleHref();
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
        if (getPageType() === PageType.Homepage) {
            onNetflixHomepage();
            previousDomChangeType = PageType.Homepage;
        }
        if (oldHref != document.location.href) {
            oldHref = document.location.href;
            if (getPageType() === PageType.Details) {
                onNetflixDetailsPage();
                previousDomChangeType = PageType.Details;
            }
            if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
                previousDomChangeType = PageType.Watching;
                if (src_lastViewedTitleHref) {
                    onNetflixWatchPage(src_lastViewedTitleHref);
                }
            }
        }
    }
    // ------------------
    if (currSite === StreamingSite.DisneyPlus) {
        // We can't do disney plus ratings on hover on the main page
        // this is because we don't have access to the link of the show/movie at any point, anywhere on the homepage.
        // the most we can get is the title of the show in the current language, but that could cause issues.
        if (getPageType() === PageType.Homepage && previousDomChangeType != PageType.Homepage) {
            previousDomChangeType = PageType.Homepage;
            src_lastViewedTitleHref = null;
        }
        // We can only load the rating on the details screen.
        if (getPageType() === PageType.Details && src_lastViewedTitleHref != window.location.href) {
            previousDomChangeType = PageType.Details;
            src_lastViewedTitleHref = window.location.href;
            onDisneyDetailsScreen();
        }
        if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
            previousDomChangeType = PageType.Watching;
            if (src_lastViewedTitleHref) {
                onDisneyWatchPage(src_lastViewedTitleHref);
            }
        }
    }
    // ------------------
    if (currSite === StreamingSite.HBOMax) {
        if (getPageType() === PageType.Homepage) {
            if (previousDomChangeType != PageType.Homepage || oldHref != window.location.href) {
                clearAllHBOTiles();
            }
            oldHref = window.location.href;
            previousDomChangeType = PageType.Homepage;
            onHBOHomepage();
        }
        if (getPageType() === PageType.Details && (src_lastViewedTitleHref != window.location.href || window.location.href.indexOf("play.max.com") > -1)) {
            if (previousDomChangeType != PageType.Details || oldHref != window.location.href) {
                clearAllHBOTiles();
            }
            oldHref = window.location.href;
            previousDomChangeType = PageType.Details;
            src_lastViewedTitleHref = window.location.href;
            onHBODetailsScreen();
        }
        if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
            previousDomChangeType = PageType.Watching;
            ``;
            onHBOWatchPage(src_lastViewedTitleHref);
        }
    }
}
function getPageType() {
    var currPage = PageType.None;
    if (currSite === StreamingSite.Netflix) {
        if (window.location.href.indexOf("jbv") > -1
            || window.location.href.indexOf("title") > -1) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("watch") > -1) {
            currPage = PageType.Watching;
        }
        else {
            currPage = PageType.Homepage;
        }
    }
    if (currSite === StreamingSite.DisneyPlus) {
        if (window.location.href.indexOf("home") > -1) {
            currPage = PageType.Homepage;
        }
        else if (/.*\/(movies|series)\/.*\/.*/.test(window.location.href)) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("video") > -1) {
            currPage = PageType.Watching;
        }
        else {
            currPage = PageType.None;
        }
    }
    if (currSite === StreamingSite.HBOMax) {
        if (window.location.href.indexOf("player") > -1) {
            currPage = PageType.Watching;
        }
        else if (window.location.href.indexOf(":type:series") > -1
            || window.location.href.indexOf(":type:feature") > -1
            || window.location.href.indexOf("/show/") > -1
            || window.location.href.indexOf("/movie/") > -1
            || window.location.href.indexOf("/mini-series/") > -1
            || window.location.href.indexOf("/standalone/") > -1) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("/page/urn:hbo:page:") > -1
            || window.location.href.indexOf(":collection:") > -1
            || window.location.href.indexOf(":franchise:") > -1
            || window.location.href == "https://play.max.com/"
            || window.location.href == "https://play.max.com/home"
            || window.location.href.indexOf("https://play.max.com/search") > -1
            || window.location.href.indexOf("https://play.max.com/channel") > -1) {
            currPage = PageType.Homepage;
        }
        else {
            currPage = PageType.None;
        }
    }
    return currPage;
}

/******/ })()
;
//# sourceMappingURL=main.js.map