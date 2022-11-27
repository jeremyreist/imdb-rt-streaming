import { addLoader, delay, getRatings, removeLoader } from "../../utils/utils"

var lastViewedTitleHref = null;
export async function onNetflixHomepage(){
  const titleHref = getNetflixTitleHref()
  if (lastViewedTitleHref != titleHref) {
    lastViewedTitleHref = titleHref;
    if (titleHref){
      handleTitleCardHover()
    }
  }
}
 
export async function onNetflixWatchPage(titleHref: string){
  const spliceIndex = window.location.href.indexOf("watch/") + "watch/".length;
  const episodeID = window.location.href.slice(spliceIndex, spliceIndex + 8);
  var limit = 0;

  getRatings({id: titleHref, episode: episodeID, click: true});

  // Waits for the video to load.
  while (!document.getElementsByTagName('video').length || limit > 50){
    limit += 1;
    await delay(500);
  }
  var endTime: number
  var startTime: number
  var duration: number;

  startTime = document.getElementsByTagName('video')[0].currentTime;
  duration = document.getElementsByTagName('video')[0].duration;

  // While we are still watching the show, update the end time.
  while (window.location.href.indexOf(`watch/${episodeID}`) > 0){
    try {
      if (window.location.href.indexOf(`watch/${episodeID}`) > 0){
        if (!isNaN(document.getElementsByTagName('video')[0].currentTime)){
          endTime = document.getElementsByTagName('video')[0].currentTime;
        }
      }
    } catch {
      break;
    }
    await delay(10);
  }

  const start = Math.floor((startTime / duration)*100);
  const end = Math.floor((endTime / duration)*100);

  getRatings({id: titleHref, episode: episodeID, click: true, start: start, end: end});

}

async function handleTitleCardHover() {
  const parent = document.getElementsByClassName("previewModal--metadatAndControls-container")[0]
  addLoader(parent);

  const titleHref = getNetflixTitleHref();
  const ratings = await getRatings({id: titleHref});

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
          Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span> 
        </span>
      </div>
    </div>
  </div>
  `;
  
  removeLoader(parent);
  insertBeforeProgressBar(ratingsElement, parent);
}

function insertBeforeProgressBar(element: Element, parent: Element){
  const progressBar = parent.getElementsByClassName("previewModal-progress")[0];
  if (progressBar){
    parent.insertBefore(element, progressBar);
  }
 else parent.appendChild(element);
}


export function getNetflixTitleHref(): string | null {
  var previewModal = document.getElementsByClassName("previewModal--info")[0];
  try {
    const titleHref = (previewModal.children[0] as HTMLLinkElement).href;
    return titleHref.slice(
      0,
      titleHref.indexOf("/title/") + "/title/".length + 8
    );
  } catch (TypeError) {
    return null
  }
}

