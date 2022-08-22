/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@keyframes fade-in{\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n\n.imdb_element {\ncolor:#fff;\nline-height:1.3;\nposition:relative;\nfont:'Netflix Sans';\ndisplay:\"inline-block\";\ntext-shadow:0 1px 1px rgba(0,0,0,.7);\nanimation-name: fade-in;\nanimation-duration: 1.5s}\n\n.rt_element {\ncolor:#fff;\nline-height:1.3;\nposition:relative;\nfont:'Netflix Sans';\ndisplay:\"inline-block\";\ntext-shadow:0 1px 1px rgba(0,0,0,.7);\nanimation-name: fade-in;\nanimation-duration: 1.5s}\n\n.separator{\ncolor:#646464;\nposition:relative;\nfont:'Netflix Sans';\ndisplay:\"inline-block\";\nanimation-name: fade-in;\nanimation-duration: 1.5s;\ntop: 2px;\nfont-size: 1.2em;\nmargin-left: 6px;\nmargin-right: 6px;\n}\n\n@media screen and (max-width:499px){.rt_element.old_version, .imdb_element.old_version{font-size:1.8vw}}\n@media screen and (min-width:500px) and (max-width:799px){.rt_element.old_version, .imdb_element.old_version{font-size:1.4vw}}\n@media screen and (min-width:800px) and (max-width:1099px){.rt_element.old_version, .imdb_element.old_version{font-size:1.8vw}}\n@media screen and (min-width:1100px) and (max-width:1399px){.rt_element.old_version, .imdb_element.old_version{font-size: 0.92vw}}\n@media screen and (min-width:1400px){.rt_element.old_version, .imdb_element.old_version{font-size:.76vw}}\n\n.video-meta--bob-overview{\ntext-shadow:0 1px 1px rgba(0,0,0,.7) !important;\nfont-size:.7vw !important}\n\n.donate_element{\ncolor:#fff;\nmargin-left: 12px;\nline-height:1.3;\nposition:relative;\nfont:'Netflix Sans';\nfont-size: 70%;\ndisplay:\"inline-block\";\ntext-shadow:0 1px 1px rgba(0,0,0,.7);\nanimation-name: fade-in;\nanimation-duration: 1.5s;\n-webkit-transform: perspective(1px) translateZ(0);\ntransform: perspective(1px) translateZ(0);\noverflow: hidden;\n-webkit-transition-duration: 0.3s;\ntransition-duration: 0.3s;\n-webkit-transition-property: color, background-color;\ntransition-property: color, background-color;\n-webkit-box-shadow: 0 0 1px;\nbox-shadow: 0 0 1px;\nbackground-color: transparent;\nborder-style: solid;\nborder-width: 1px;\nborder-radius: 8px;\ntext-align: center;\nwidth: 60px !important;\nmax-width: 60px !important;\nheight: 10px !important;\nmax-height: 20px !important;\nmin-height: 20px !important;\n}\n\n.donate_element:hover{\nbackground-color: #E5BD12;\ncolor: white;\ncursor: pointer;\n}\n\n.more_info_content{\n  color: #c5c5c5;\n  font-size: 70%;\n  margin-bottom: 6px;\n}\n\n.more_info{\n  margin-right: 6px;\n  margin-left: 12px;\n  margin-bottom: 6px;\n  top: -1px !important;\n  animation-name: fade-in;\n  animation-duration: 1.5s;\n  top: 2px;\n  font-size: 0.8em;\n  border-radius: 50%;\n  border-width: 2px;\n  color:rgb(255, 255, 255);\n  border: 2px solid;\n  background-color: rgba(42,42,42,.6);\n  border-color: rgba(255,255,255,.5);\n  width: 25px !important;\n  height: 25px !important;\n  min-width: 20px !important;\n  min-height: 20px !important;\n  position: relative;\n}\n\n.more_info:hover{\n  background-color: rgba(197, 197, 197, 0.6);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/main/styles.css
var styles = __webpack_require__(417);
;// CONCATENATED MODULE: ./src/main/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.Z, options);




       /* harmony default export */ const main_styles = (styles/* default */.Z && styles/* default.locals */.Z.locals ? styles/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/main/utils/utils.js
/**
 * get_api_data:
 * The function to do the api data function call
 */
async function get_api_data(title_id, title, clicked) {
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

function get_formatted_ratings(imdb_rating, rt_rating) {
  return { film_imdb_rating: imdb_rating, film_rt_rating: rt_rating };
}

;// CONCATENATED MODULE: ./src/main/netflix/index.js



/**
 * runFunction:
 * The main run function for our APP, gets called after every DOM change.
 */
async function netflix(hidden, color) {
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

function get_title() {
  var previewModal = document.getElementsByClassName("previewModal--boxart")[0];
  return previewModal.alt;
}

function get_title_href() {
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
;// CONCATENATED MODULE: ./src/index.js



// Once we detect a change in the DOM, call the handler, which then calls the function.
$(".netflix-sans-font-loaded").bind("DOMSubtreeModified", HandleDOM_Change);

var src_hidden, color;
setInterval(function CheckSettings() {
  chrome.storage.local.get({ hidden: false }, function (result) {
    src_hidden = result.hidden;
  });

  chrome.storage.local.get({ color: true }, function (result) {
    color = result.color;
  });
}, 300);


var current_target;
var new_target;
function HandleDOM_Change() {
  new_target = document.getElementsByClassName("previewModal--info")[0];
  if (new_target !== current_target && new_target) {
    current_target = new_target;
    netflix(src_hidden, color);
  }
}

// Telemetry data
let last_clicked_title = null;
var old_title_href = document.location.href;
var finished_logging = true;

window.addEventListener("mousedown", function () {
  // get title id from /title/ url of parent node being clicked on.
  try {
    last_clicked_title = get_title_href();
  } catch (TypeError) {
    // They did not click on a title
  }
});

window.onload = function () {
  // Clears storage so we get up to date ratings
  chrome.storage.local.clear();

  // Telemetry reporting
  var bodyList = document.querySelector("body");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(async function () {
      if (old_title_href != document.location.href && finished_logging) {
        finished_logging = false;
        old_title_href = document.location.href;
        if (window.location.href.startsWith("https://www.netflix.com/watch/")) {
          if (last_clicked_title) {
            await get_api_data(last_clicked_title, "", true);
          }
        }
        finished_logging = true;
      }
    });
  });

  var config = {
    childList: true,
    subtree: true,
  };

  observer.observe(bodyList, config);
};

})();

/******/ })()
;