export interface Rating {
  rt_rating: string;
  rt_color: string;
  imdb_rating: string;
  imdb_color: string;
}

export async function getRatings(titleHref: string, hasClicked: boolean): Promise<Rating> {
  if (!hasClicked) {
    const request = await fetch(`https://filmtoro.com/api/watch.asp?id=${titleHref}&api=8mds8d7d55`);
    return formatApiData(await request.json())
  } else {
    const request = await fetch(`https://filmtoro.com/api/watch.asp?id=${titleHref}&api=8mds8d7d55&click=true`);
    return formatApiData(await request.json())
  }
}

function formatApiData(apiData: any): Rating {
  let output = {rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF"}
  if (apiData['film_imdb_rating'] > 0){
    output.imdb_rating = `${apiData['film_imdb_rating']/10}`
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