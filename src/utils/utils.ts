export interface Rating {
  rt_rating: string;
  rt_color: string;
  imdb_rating: string;
  imdb_color: string;
}

export async function getRatings(titleHref: string, hasClicked: boolean): Promise<Rating> {
  if (!hasClicked) {
    const localRating = await checkLocalStorage(titleHref);
    if (localRating){
      return localRating
    }

    const request = await fetch(`https://filmtoro.com/api/watch.asp?id=${titleHref}&api=8mds8d7d55`);
    const response = formatApiData(await request.json())
    await addToLocalStorage(titleHref, response);
    return response
  } else {
    const request = await fetch(`https://filmtoro.com/api/watch.asp?id=${titleHref}&api=8mds8d7d55&click=true`);
    const response = formatApiData(await request.json())
    await addToLocalStorage(titleHref, response);
    return response
  }
}

async function checkLocalStorage(titleHref: string): Promise<Rating | null> {
  var localStorage = await chrome.storage.local.get(["previous_ratings"]);
  if (!localStorage.previous_ratings) {
    return null
  } else {
    if (localStorage.previous_ratings[titleHref]){
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

function formatApiData(apiData: any): Rating {
  let output = {rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF"}
  if (apiData['film_imdb_rating'] > 0){
    output.imdb_rating = `${(apiData['film_imdb_rating']/10).toFixed(1)}`
    if (apiData['film_imdb_rating'] > 83) {
      output.imdb_color = '#2ECC71';
    } else if (apiData['film_imdb_rating'] < 70) {
      output.imdb_color = '#C70039';
    }
  }
  if (apiData['film_rt_rating'] > 0){
    output.rt_rating = `${apiData['film_rt_rating']}%`
    if (apiData['film_rt_rating'] > 83) {
      output.rt_color = '#2ECC71';
    } else if (apiData['film_rt_rating'] < 70) {
      output.rt_color = '#C70039';
    }
  }
  return output
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function addLoader(parent: Element) {
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

  parent.appendChild(loader);
}

export function removeLoader(parent: Element){
  const loader = parent.getElementsByClassName("ratings-loader")[0];
  parent.removeChild(loader);
}