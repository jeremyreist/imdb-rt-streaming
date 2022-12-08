import { addLoader, delay, getRatings, removeLoader } from "../../utils/utils"

var lastHoveredTitleHfref = null;
export async function onHBOHomepage(){
  const titleHref = getHBOTitleHref()
  // Makes sure we only load once per element
  if (lastHoveredTitleHfref != titleHref) {
    lastHoveredTitleHfref = titleHref;
    if (titleHref){
      handleTitleCardHover()
    }
  }
}

export async function onHBODetailsScreen() {
  const titleHref = window.location.href.slice(0, window.location.href.indexOf(":type:"));
  const ratings = await getRatings({id: titleHref});

  const ratingsElement = document.createElement("h2");
  ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
  ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
  ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 14px; letter-spacing: 0.5px; line-height: 18px; padding-left:20px');
 
  var attempts = 0;
  while (true){
      await delay(1000);
      // done because of the dynamic page loading taking time
      const buttonContainers = document.getElementsByClassName('css-175oi2r r-1awozwy r-18u37iz r-1mnahxq');
      if (buttonContainers.length){ // If we have results from the query selector
          for (let index = 0; index < buttonContainers.length; index++) {
            if (getComputedStyle(buttonContainers[index]).display == 'flex'){
              buttonContainers[index].appendChild(ratingsElement);
              fadeIn(ratingsElement,0.1);
            }
          }
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
 
export async function onHBOWatchPage(titleHref: string){

  if (titleHref.indexOf("?exitPageUrn") > 0){
    titleHref = titleHref.slice(0,titleHref.indexOf("?exitPageUrn"));
  }

  var spliceIndex = window.location.href.indexOf(":episode:") + ":episode:".length;
  if (spliceIndex == 8){
    spliceIndex = window.location.href.indexOf(":feature:") + ":feature:".length;
  }
  // 21 is length of ID
  const episodeID = window.location.href.slice(spliceIndex, spliceIndex + 21);
  
  var exitPageUrn = null;
  if (window.location.href.indexOf('?exitPageUrn=') > 0 && window.location.href.indexOf('episode') > 0 ){
    exitPageUrn = window.location.href.slice(window.location.href.indexOf('?exitPageUrn=') + '?exitPageUrn='.length)
  }


  var limit = 0;
  if (titleHref.indexOf('series') == 0){
    titleHref = ""
  } else if (exitPageUrn){
    titleHref = 'https://play.hbomax.com' + exitPageUrn.replace('series', 'page') + ':type:series'
  } 
  getRatings({id: titleHref, episode: episodeID, click: true});

  await delay(5000);

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
  while (window.location.href.indexOf(episodeID) > 0){
    try {
      if (window.location.href.indexOf(episodeID) > 0){
        if (!isNaN(document.getElementsByTagName('video')[0].currentTime)){
          endTime = document.getElementsByTagName('video')[0].currentTime;
        }
      }
    } catch (error){
      console.log(error)
      break;
    }
    await delay(10);
  }
  var start = Math.floor((startTime / duration)*100);
  var end = Math.floor((endTime / duration)*100);

  if (isNaN(start)){
    console.log('Got NAN for start')
    start = 0;
  }

  if (isNaN(end)){
    console.log('Got NAN for end')
    end = 0;
  }
  
  getRatings({id: titleHref, episode: episodeID, click: true, start: start, end: end});

}

async function handleTitleCardHover() {
  const hoveredTitleCard = Array.from(document.querySelectorAll( ":hover" )).pop().closest('a');
  // ensures we only load the rating once per title card
  if (hoveredTitleCard.parentElement.querySelectorAll(".ratings-loader,.ratings").length == 0
  && hoveredTitleCard.href.includes(':type:')
  && !(hoveredTitleCard.href.includes('episode'))) {
    addLoader(hoveredTitleCard.children[0].children[0], 0.75);
    var ratings = {rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF"};
    const titleHref = getHBOTitleHref();

    try{
      ratings = await getRatings({id: titleHref}); 
    } catch (error){
      console.log(error);
    }

    // Select class name based on existing elements.
    const ratingsElement = document.createElement("h2");
    ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
    ratingsElement.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 12px; letter-spacing: 0.5px; line-height: 18px;');
    removeLoader(hoveredTitleCard.children[0].children[0]);
    // Insert ratings element if not a trailer
    if (!hoveredTitleCard.href.includes('extra')){
      var inserted = false;

      for (let index = 0; index < hoveredTitleCard.children.length; index++) {
        if (hoveredTitleCard.children[index].getAttribute('data-testid') == 'attribution-text'
          || hoveredTitleCard.children[index].getAttribute('data-testid') == 'tile-details-container'){
          hoveredTitleCard.insertBefore(ratingsElement, hoveredTitleCard.children[index]);
          inserted = true;
        }
      }
      if (!inserted){
        hoveredTitleCard.appendChild(ratingsElement)
      }

      fadeIn(ratingsElement,0.1);
    }
  }
}

function fadeIn(item, i){
  i += 0.2;
  item.style.opacity = i;
  if (i< 1)
  setTimeout(()=> fadeIn(item,i), 50);
  }

export function getHBOTitleHref(): string | null {
  const hoveredTitleCard = Array.from(document.querySelectorAll( ":hover" )).pop();
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

