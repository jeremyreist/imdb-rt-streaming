import { delay, getRatings } from "../../utils/utils"

export async function onDisneyDetailsScreen(){
    const titleHref = window.location.href;
    const ratings = await getRatings({id: titleHref});

    const ratingsElement = document.createElement("h4");
    ratingsElement.className = "text-color--primary body-copy body-copy--large margin--left-4";
    ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    
    var attempts = 0;
    while (true){
        // done because of the dynamic page loading taking time
        const parent = document.getElementsByClassName("button-play");
        if (parent.length){
            parent[0].parentElement.appendChild(ratingsElement)
            break;
        } else {
            attempts += 1;
            await delay(100);
        }
        if (attempts === 100){
            console.error("Failed to get ratings!")
        }
    }

}

export async function onDisneyWatchPage(titleHref: string){
    const spliceIndex = window.location.href.indexOf("video/") + "video/".length;
    const episodeID = window.location.href.slice(spliceIndex);
    var limit = 0;
  
    getRatings({id: titleHref, episode: episodeID, click: true});
  
    // Waits for the video to load.
    while (!document.getElementsByTagName('video').length || !document.getElementsByClassName('time-remaining-label').length || limit > 50){
      limit += 1;
      await delay(500);
    }
    var endTime: number
    var startTime: number
    var durationString: string;
  
    startTime = document.getElementsByTagName('video')[0].currentTime;
    durationString = document.getElementsByClassName('time-remaining-label')[0].textContent; // e.g 01:50:01
    var durationSeconds = hmsToSecondsOnly(durationString);
    
    // While we are still watching the show, update the end time.
    while (window.location.href.indexOf(`video/${episodeID}`) > 0){
      try {
        if (window.location.href.indexOf(`video/${episodeID}`) > 0){
          if (!isNaN(document.getElementsByTagName('video')[0].currentTime)){
            endTime = document.getElementsByTagName('video')[0].currentTime;
          }
        }
      } catch {
        break;
      }
      await delay(10);
    }

    const start = Math.floor((startTime / durationSeconds)*100);
    const end = Math.floor((endTime / durationSeconds)*100);

    getRatings({id: titleHref, episode: episodeID, click: true, start: start, end: end});
  
  }

function hmsToSecondsOnly(str: string) {
    var part = str.split(':'),
        seconds = 0, minutes = 1;

    while (part.length > 0) {
        seconds += minutes * parseInt(part.pop(), 10);
        minutes *= 60;
    }

    return seconds;
}