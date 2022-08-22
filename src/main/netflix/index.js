import "../styles.css";
import { get_api_data, get_formatted_ratings } from "../utils/utils"

/**
 * runFunction:
 * The main run function for our APP, gets called after every DOM change.
 */
export async function netflix(hidden, color) {
  var previewModal = document.getElementsByClassName(
    "focus-trap-wrapper previewModal--wrapper mini-modal"
  )[0];

  if (previewModal != undefined) {
    // title for omdb | title_href for filmtoro API
    const title = get_title();
    const title_href = get_title_href();

    // Get API data, and change HTML. Destination is the card we want to append too.
    const api_data = await get_data(title_href, title);
    const destination = "previewModal--metadatAndControls mini-modal";
    change_html(api_data, previewModal, destination, hidden, color);
  }
}

export function get_title() {
  var previewModal = document.getElementsByClassName("previewModal--boxart")[0];
  return previewModal.alt;
}

export function get_title_href() {
  var previewModal = document.getElementsByClassName("previewModal--info")[0];
  const title_href = previewModal.children[0].href;
  return title_href.slice(
    0,
    title_href.indexOf("/title/") + "/title/".length + 8
  );
}

/**
 * get_data:
 * The function to get the ratings data. Handles locally soted data aswell.
 */
async function get_data(title_id, title) {
  var data;
  const initial_ratings = {};
  var result = await chrome.storage.local.get(["previous_ratings"]);

  if (!result.previous_ratings) {
    // If we have not made the previous ratings data
    data = await get_api_data(title_id, title, false);
    initial_ratings[title_id] = get_formatted_ratings(
      data.film_imdb_rating,
      data.film_rt_rating
    );
    await chrome.storage.local.set({ previous_ratings: initial_ratings });
    return data;
  } else if (!(title_id in result.previous_ratings)) {
    data = await get_api_data(title_id, title, false);
    result.previous_ratings[title_id] = get_formatted_ratings(
      data.film_imdb_rating,
      data.film_rt_rating
    );
    await chrome.storage.local.set({
      previous_ratings: result.previous_ratings,
    });
    return data;
  }
  return result.previous_ratings[title_id];
}

/**
 * change_html:
 *  Changes the HTML to actually display the ratings.
 *  e: The main title card element
 *  data: The API data we recieved
 *  destination: The class name of the element which we want to append the ratings too.
 */

function change_html(data, e, destination, hidden, color) {
  if (!hidden) {
    var imdb_rating = data["film_imdb_rating"];
    var rt_rating = data["film_rt_rating"];
    var imdb_color = ' color = "white"',
      rt_color = ' color = "white"';

    if (imdb_rating === 0 || imdb_rating === undefined) {
      imdb_rating = "N/A";
    }
    if (rt_rating === 0 || rt_rating === undefined) {
      rt_rating = "N/A";
    }

    //? Add color to the ratings.

    if (color) {
      //? If user does want color on ratings.
      if (imdb_rating > 83) {
        imdb_color = ' color = "#2ECC71"';
      }
      if (imdb_rating < 70) {
        imdb_color = ' color = "#C70039"';
      }

      if (rt_rating > 85) {
        rt_color = ' color = "#2ECC71"';
      }
      if (rt_rating < 70) {
        rt_color = ' color = "#C70039"';
      }
    } else {
      //? If user does not want color on ratings.
      imdb_color = ' color = "#fff"';
      rt_color = ' color = "#fff"';
    }

    var main_card = e.getElementsByClassName(destination);
    //? The Seperator: •
    var seperator = $(document.createElement("span"));
    seperator.addClass("separator").html("\u2022");

    //? The 2nd Seperator: •
    var seperator2 = $(document.createElement("span"));
    seperator2.addClass("evidence-separator").html("\u2022");

    //? The IMDb Rating:
    var imdb_element = $(document.createElement("span"));

    if (imdb_rating !== "N/A" && imdb_rating !== "NA") {
      imdb_element
        .addClass("imdb_element")
        .html(
          "IMDb: <font" +
            imdb_color +
            ">" +
            imdb_rating.toString()[0] +
            "." +
            imdb_rating.toString()[1] +
            "</font>"
        );
    } else {
      if (imdb_rating === "NA") {
        imdb_rating = "N/A";
      }
      imdb_element
        .addClass("imdb_element")
        .html("IMDb: <font" + imdb_color + ">" + imdb_rating + "</font>");
    }

    //? The RT Rating:
    var rt_element = $(document.createElement("span"));
    if (rt_rating !== "N/A") {
      rt_element
        .addClass("rt_element")
        .html(
          "Rotten Tomatoes: <font" + rt_color + ">" + rt_rating + "%</font>"
        );
    } else {
      rt_element
        .addClass("rt_element")
        .html(
          "Rotten Tomatoes: <font" + rt_color + ">" + rt_rating + "</font>"
        );
    }

    //? The main ratings DIV
    var ratings = $(document.createElement("div"));
    ratings.append(imdb_element);
    ratings.append(seperator);
    ratings.append(rt_element);

    //? Add ratings to the element.
    if ($(main_card).find(".imdb_element").length === 0) {
      $(main_card).append(ratings);
      //? Fot the more info button
      $(document).ready(function () {
        $(".more_info_content").hide();
        $(".more_info").on("click", function () {
          var txt = $(".more_info_content").is(":visible") ? "?" : "X";
          $(".more_info").text(txt);
          $(this).next(".more_info_content").slideToggle(200);
        });
      });
    }
  }
}