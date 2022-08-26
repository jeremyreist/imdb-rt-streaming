import { delay, getRatings } from "../../utils/utils"

export async function onDisneyDetailsScreen(){
    const titleHref = window.location.href;
    const ratings = await getRatings(titleHref, false);

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