import { delay, getRatings } from "../../utils/utils"

export async function onDisneyDetailsScreen(){
    const titleHref = window.location.href;
    const ratings = await getRatings(titleHref, false);
    console.log(ratings);
    const header = document.createElement("h4");
    header.className = "text-color--primary body-copy body-copy--large margin--left-4";
    header.innerHTML = `IMDb: <span style="color:${ratings.imdb_color}">${ratings.imdb_rating}</span> \u00A0 Rotten Tomatoes: <span style="color:${ratings.rt_color}">${ratings.rt_rating}</span>`;
    var attempts = 0;
    while (true){
        // done because of the dynamic page loading taking time
        const playButtonElement = document.getElementsByClassName("button-play");
        if (playButtonElement.length){
            playButtonElement[0].parentElement.appendChild(header)
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