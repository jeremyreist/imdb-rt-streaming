/**
 * get_api_data:
 * The function to do the api data function call
 */
export async function get_api_data(title_id, title, clicked) {
  var request = null;

  if (!clicked) {
    request = await fetch(
      `https://filmtoro.com/api/watch.asp?id=${title_id}&api=8mds8d7d55`
    );
  } else {
    request = await fetch(
      `https://filmtoro.com/api/watch.asp?id=${title_id}&api=8mds8d7d55&click=true`
    );
  }

  const data = await request.json();
  var imdb_rating = data.film_imdb_rating;
  var rt_rating = data.film_rt_rating;

  if (!imdb_rating && !rt_rating && !clicked) {
    const omdb_request = await fetch(
      `https://www.omdbapi.com/?t=${encodeURI(title)}&apikey=daf5c972`
    );
    const omdb_data = await omdb_request.json();
    imdb_rating = omdb_data.imdbRating;
    if (imdb_rating)
      imdb_rating = imdb_rating.slice(0, 1) + imdb_rating.slice(2);

    rt_rating = omdb_data.Ratings?.[1]?.Value;
    if (rt_rating) rt_rating = rt_rating.slice(0, 2);
    return get_formatted_ratings(imdb_rating, rt_rating);
  }

  return data;
}

export function get_formatted_ratings(imdb_rating, rt_rating) {
  return { film_imdb_rating: imdb_rating, film_rt_rating: rt_rating };
}
