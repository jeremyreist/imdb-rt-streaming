import { Rating, addLoader, delay, getRatings, removeLoader } from "../../utils/utils"

var lastGrabbedRatingsFromTitleCard = null;
var lastViewedTitleHref = null;
export async function onNetflixHomepage() {
  const titleHref = getNetflixTitleHref()
  if (lastViewedTitleHref != titleHref) {
    lastViewedTitleHref = titleHref;
    if (titleHref) {
      handleTitleCardHover(lastViewedTitleHref)
    }
  }
}

export async function onNetflixDetailsPage() {
  if (lastViewedTitleHref)
    handleShowInformationCard(lastViewedTitleHref);
  else {
    lastViewedTitleHref = getAlternateTitleHref();
    if (lastViewedTitleHref)
      handleShowInformationCard(lastViewedTitleHref);
  }
}

export function onNetflixWatchPage() {
  const sliceIndex = window.location.href.indexOf("watch/") + "watch/".length;
  const episodeID = window.location.href.slice(sliceIndex, sliceIndex + 8);

  const start = 0;
  const end = 1;

  getRatings({ id: window.location.href, episode: episodeID, click: true, start: start, end: end });
}

async function handleShowInformationCard(titleHref: string) {
  const parent = document.getElementsByClassName("detail-modal-container")[0]; // Info box.
  addLoader(parent, /*number=*/1, /*insertBefore=*/true);
  let ratings: Rating;
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

async function handleTitleCardHover(titleHref: string) {
  const parent = document.getElementsByClassName("previewModal--metadatAndControls-container")[0]
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

function insertBeforeProgressBar(element: Element, parent: Element) {
  const progressBar = parent.getElementsByClassName("previewModal-progress")[0];
  if (progressBar) {
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

export function getAlternateTitleHref(): string | null {
  if (window.location.href.indexOf("title") > -1) {
    return window.location.href;
  }
  else if (window.location.href.indexOf("jbv") > -1) {
    let titleNumber = window.location.href.slice(window.location.href.indexOf("jbv=") + 4);
    return "https://www.netflix.com/title/" + titleNumber;
  }
  return null;
}