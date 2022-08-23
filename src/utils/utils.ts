/**
 * get_api_data:
 * The function to do the api data function call
 */
export async function get_api_data(title_id, clicked) {
  var request;
  if (!clicked) {
    request = await fetch(
      `https://filmtoro.com/api/watch.asp?id=${title_id}&api=8mds8d7d55`
    );
  } else {
    request = await fetch(
      `https://filmtoro.com/api/watch.asp?id=${title_id}&api=8mds8d7d55&click=true`
    );
  }

  return await request.json();
}

export function get_formatted_ratings(imdb_rating, rt_rating) {
  return { film_imdb_rating: imdb_rating, film_rt_rating: rt_rating };
}
