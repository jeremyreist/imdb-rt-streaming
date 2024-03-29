export interface Rating {
  rt_rating: string;
  rt_audience_rating: string;
  rt_color: string;
  rt_audience_color: string;
  rt_critic_icon : string;
  rt_audience_icon: string;
  imdb_rating: string;
  imdb_color: string;
}

export interface ApiParams {
  id: string;
  episode?: string;
  api?: string;
  click?: boolean;
  start?: number;
  end?: number;
}

let critic_fresh_src = chrome.runtime.getURL("critic_fresh.svg");
let critic_rotten_src = chrome.runtime.getURL("critic_rotten.svg");
let audience_fresh_src = chrome.runtime.getURL("audience_fresh.svg");
let audience_rotten_src = chrome.runtime.getURL("audience_rotten.svg");

export async function getRatings(params: ApiParams): Promise<Rating> {
  const { id, episode, api = "8mds8d7d55", click, start, end } = { ...params }
  let colorsEnabled = (await chrome.storage.sync.get({ 'color': true })).color;
  if (!click) {
    const localRating = await checkLocalStorage(id);
    if (localRating) {
      updateLocalRatingColors(localRating, colorsEnabled);
      return localRating
    }
  }

  const apiUrl = new URL(`https://filmtoro.com/api/watch.asp`);
  apiUrl.searchParams.append('id', id);
  apiUrl.searchParams.append('api', api);

  if (typeof click !== 'undefined') apiUrl.searchParams.append('click', click.toString());
  if (typeof episode !== 'undefined') apiUrl.searchParams.append('episode', episode);
  if (typeof start !== 'undefined') apiUrl.searchParams.append('start', start.toString());
  if (typeof end !== 'undefined') apiUrl.searchParams.append('end', end.toString());

  const request = await fetch(apiUrl);
  const response = formatApiData(await request.json(), colorsEnabled)
  await addToLocalStorage(id, response);
  return response
}

function updateLocalRatingColors(rating, colorsEnabled) {
  if (colorsEnabled) {
    let rt_integer, imdb_integer, rt_audience_integer;
    // Edge case: rating = 100. 
    if(rating.rt_rating.length > 3) rt_integer = 100;
    else rt_integer = parseInt(rating.rt_rating.slice(0, 2));
    if(rating.rt_audience_rating.length > 3) rt_audience_integer = 100;
    else rt_audience_integer = parseInt(rating.rt_audience_rating.slice(0, 2));
    imdb_integer = parseInt(rating.imdb_rating.slice(0, 1)) * 10 + parseInt(rating.imdb_rating.slice(2));

    if(!isNaN(rt_integer))
      rating.rt_color = getHexColor(rt_integer);
    if(!isNaN(imdb_integer))
      rating.imdb_color = getHexColor(imdb_integer);
    if(!isNaN(rt_audience_integer))
      rating.rt_audience_color = getHexColor(rt_audience_integer);
  }
  else {
    rating.imdb_color = "#FFF";
    rating.rt_color = "#FFF";
  }
}

async function checkLocalStorage(titleHref: string): Promise<Rating | null> {
  var localStorage = await chrome.storage.local.get(["previous_ratings"]);
  if (!localStorage.previous_ratings) {
    return null
  } else {
    if (localStorage.previous_ratings[titleHref]) {
      return localStorage.previous_ratings[titleHref]
    }
    return null
  }
}

async function addToLocalStorage(titleHref: string, rating: Rating) {
  const initial_ratings = {};
  var result = await chrome.storage.local.get(["previous_ratings"]);

  if (!result.previous_ratings) {
    // If we have not stored previous ratings before
    initial_ratings[titleHref] = rating;
    await chrome.storage.local.set({
      previous_ratings: initial_ratings
    });
  } else if (!(titleHref in result.previous_ratings)) {
    // If we have stored ratings and it's not already stored
    result.previous_ratings[titleHref] = rating;
    await chrome.storage.local.set({
      previous_ratings: result.previous_ratings,
    });
  }
}

function formatApiData(apiData: any, colorsEnabled): Rating {
  let output = {
    rt_rating: 'N/A', imdb_rating: 'N/A', rt_audience_rating: '',
    imdb_color: "#FFF", rt_color: "#FFF", rt_audience_color: "#FFF",
    rt_critic_icon: '', rt_audience_icon: ''
  }
  if (apiData['film_imdb_rating'] > 0) {
    output.imdb_rating = `${(apiData['film_imdb_rating'] / 10).toFixed(1)}`;
    output.imdb_color = colorsEnabled ? getHexColor(apiData['film_imdb_rating']) : "#FFF";
  }
  if (apiData['film_rt_rating'] > 0) {
    output.rt_rating = `${apiData['film_rt_rating']}%`;
    output.rt_critic_icon = apiData['film_rt_rating'] >= 50 ?  critic_fresh_src : critic_rotten_src;
    output.rt_color = colorsEnabled ? getHexColor(apiData['film_rt_rating']) : "#FFF";
  }
  if (apiData['film_rt_audience'] > 0) {
    output.rt_audience_rating = `${apiData['film_rt_audience']}%`;
    output.rt_audience_icon = apiData['film_rt_audience'] >= 50 ?  audience_fresh_src : audience_rotten_src;
    output.rt_audience_color = colorsEnabled ? getHexColor(apiData['film_rt_audience']) : "#FFF";
  }
  return output
}

function getHexColor(rating) {
  // Define the endpoint colors
  const startColor = [237, 38, 48]; // Bright Red (RGB)
  const endColor = [17, 217, 17];  // Bright Green (RGB)

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

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function addLoader(parent: Element, scale: number = 1, insertBefore: boolean = false) {
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
  loader.setAttribute('style', `transform: scale(${scale});`)
  if (insertBefore) {
    parent.insertBefore(loader, parent.children[0]);
  } else {
    parent.appendChild(loader);
  }
}

export function removeLoader(parent: Element) {
  const loader = parent.getElementsByClassName("ratings-loader")[0];
  parent.removeChild(loader);
}