/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var disney_1 = __webpack_require__(831);
var netflix_1 = __webpack_require__(309);
var utils_1 = __webpack_require__(974);
var StreamingSite;
(function (StreamingSite) {
    StreamingSite[StreamingSite["Netflix"] = 0] = "Netflix";
    StreamingSite[StreamingSite["DisneyPlus"] = 1] = "DisneyPlus";
    StreamingSite[StreamingSite["None"] = 2] = "None";
})(StreamingSite || (StreamingSite = {}));
var PageType;
(function (PageType) {
    PageType[PageType["Homepage"] = 0] = "Homepage";
    PageType[PageType["Details"] = 1] = "Details";
    PageType[PageType["Watching"] = 2] = "Watching";
    PageType[PageType["None"] = 3] = "None";
})(PageType || (PageType = {}));
// clear stored ratings 
chrome.storage.local.clear();
var currSite = StreamingSite.None;
var lastViewedTitleHref = null;
window.addEventListener("load", onLoad);
function onLoad(event) {
    // Determine what streaming site we are on
    if (window.location.href.indexOf("https://www.netflix.com/") > -1) {
        currSite = StreamingSite.Netflix;
        window.addEventListener("mousedown", function () {
            if ((0, netflix_1.getTitleHref)()) {
                lastViewedTitleHref = (0, netflix_1.getTitleHref)();
            }
        });
    }
    else if (window.location.href.indexOf("https://www.disneyplus.com/") > -1) {
        currSite = StreamingSite.DisneyPlus;
    }
    // Start observing the DOM for mutations
    var targetNode = document.getRootNode();
    var config = { childList: true, subtree: true };
    var observer = new MutationObserver(onDomChange);
    observer.observe(targetNode, config);
}
// Maxiumum one call per DOM change.
var previousDomChangeType = null;
function onDomChange() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (currSite === StreamingSite.Netflix) {
                if (getPageType() === PageType.Homepage) {
                    (0, netflix_1.onNetflixHomepage)();
                    previousDomChangeType = PageType.Homepage;
                }
                if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
                    previousDomChangeType = PageType.Watching;
                    if (lastViewedTitleHref) {
                        (0, utils_1.getRatings)(lastViewedTitleHref, true);
                    }
                }
            }
            if (currSite === StreamingSite.DisneyPlus) {
                // We can't to disney plus ratings on hover on the main page
                // this is because we don't have access to the link of the show/movie at any point, anywhere on the homepage.
                // the most we can get is the title of the show in the current language, but that could cause issues.
                if (getPageType() === PageType.Homepage && previousDomChangeType != PageType.Homepage) {
                    previousDomChangeType = PageType.Homepage;
                    lastViewedTitleHref = null;
                }
                // We can only load the rating on the details screen.
                if (getPageType() === PageType.Details && lastViewedTitleHref != window.location.href) {
                    previousDomChangeType = PageType.Details;
                    lastViewedTitleHref = window.location.href;
                    (0, disney_1.onDisneyDetailsScreen)();
                }
                if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
                    previousDomChangeType = PageType.Watching;
                    if (lastViewedTitleHref) {
                        (0, utils_1.getRatings)(lastViewedTitleHref, true);
                    }
                }
            }
            return [2 /*return*/];
        });
    });
}
function getPageType() {
    var currPage = PageType.None;
    if (currSite === StreamingSite.Netflix) {
        if (window.location.href.indexOf("browse?jbv") > -1) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("browse") > -1) {
            currPage = PageType.Homepage;
        }
        else if (window.location.href.indexOf("watch") > -1) {
            currPage = PageType.Watching;
        }
        else {
            currPage = PageType.None;
        }
    }
    if (currSite === StreamingSite.DisneyPlus) {
        if (window.location.href.indexOf("home") > -1) {
            currPage = PageType.Homepage;
        }
        else if (window.location.href.indexOf("series") > -1 || window.location.href.indexOf("movie") > -1) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("video") > -1) {
            currPage = PageType.Watching;
        }
        else {
            currPage = PageType.None;
        }
    }
    return currPage;
}


/***/ }),

/***/ 831:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onDisneyDetailsScreen = void 0;
var utils_1 = __webpack_require__(974);
function onDisneyDetailsScreen() {
    return __awaiter(this, void 0, void 0, function () {
        var titleHref, ratings, ratingsElement, attempts, parent_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    titleHref = window.location.href;
                    return [4 /*yield*/, (0, utils_1.getRatings)(titleHref, false)];
                case 1:
                    ratings = _a.sent();
                    ratingsElement = document.createElement("h4");
                    ratingsElement.className = "text-color--primary body-copy body-copy--large margin--left-4";
                    ratingsElement.innerHTML = "IMDb: <span style=\"color:".concat(ratings.imdb_color, "\">").concat(ratings.imdb_rating, "</span> \u00A0 Rotten Tomatoes: <span style=\"color:").concat(ratings.rt_color, "\">").concat(ratings.rt_rating, "</span>");
                    attempts = 0;
                    _a.label = 2;
                case 2:
                    if (false) {}
                    parent_1 = document.getElementsByClassName("button-play");
                    if (!parent_1.length) return [3 /*break*/, 3];
                    parent_1[0].parentElement.appendChild(ratingsElement);
                    return [3 /*break*/, 6];
                case 3:
                    attempts += 1;
                    return [4 /*yield*/, (0, utils_1.delay)(100)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (attempts === 100) {
                        console.error("Failed to get ratings!");
                    }
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.onDisneyDetailsScreen = onDisneyDetailsScreen;


/***/ }),

/***/ 309:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTitleHref = exports.onNetflixHomepage = void 0;
var utils_1 = __webpack_require__(974);
var lastViewedTitleHref = null;
function onNetflixHomepage() {
    return __awaiter(this, void 0, void 0, function () {
        var titleHref;
        return __generator(this, function (_a) {
            titleHref = getTitleHref();
            if (lastViewedTitleHref != titleHref) {
                lastViewedTitleHref = titleHref;
                if (titleHref) {
                    handleTitleCardHover();
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.onNetflixHomepage = onNetflixHomepage;
function handleTitleCardHover() {
    return __awaiter(this, void 0, void 0, function () {
        var parent, titleHref, ratings, ratingsElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parent = document.getElementsByClassName("previewModal--metadatAndControls-container")[0];
                    (0, utils_1.addLoader)(parent);
                    titleHref = getTitleHref();
                    return [4 /*yield*/, (0, utils_1.getRatings)(titleHref, false)];
                case 1:
                    ratings = _a.sent();
                    ratingsElement = document.createElement("span");
                    ratingsElement.className = "previewModal--metadatAndControls-tags-container";
                    ratingsElement.innerHTML =
                        "\n  <div class=\"evidence-tags\">\n    <div class=\"evidence-list\">\n      <div class=\"evidence-item\">\n        <span class=\"evidence-text\">\n          IMDb: <span style=\"color:".concat(ratings.imdb_color, "\">").concat(ratings.imdb_rating, "</span> \n        </span>\n      </div>\n      <div class=\"evidence-item\">\n        <span class=\"evidence-separator\"></span>\n        <span class=\"evidence-text\">\n          Rotten Tomatoes: <span style=\"color:").concat(ratings.rt_color, "\">").concat(ratings.rt_rating, "</span> \n        </span>\n      </div>\n    </div>\n  </div>\n  ");
                    (0, utils_1.removeLoader)(parent);
                    insertBeforeProgressBar(ratingsElement, parent);
                    return [2 /*return*/];
            }
        });
    });
}
function insertBeforeProgressBar(element, parent) {
    var progressBar = parent.getElementsByClassName("previewModal-progress")[0];
    if (progressBar) {
        parent.insertBefore(element, progressBar);
    }
    else
        parent.appendChild(element);
}
function getTitleHref() {
    var previewModal = document.getElementsByClassName("previewModal--info")[0];
    try {
        var titleHref = previewModal.children[0].href;
        return titleHref.slice(0, titleHref.indexOf("/title/") + "/title/".length + 8);
    }
    catch (TypeError) {
        return null;
    }
}
exports.getTitleHref = getTitleHref;


/***/ }),

/***/ 974:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeLoader = exports.addLoader = exports.delay = exports.getRatings = void 0;
function getRatings(titleHref, hasClicked) {
    return __awaiter(this, void 0, void 0, function () {
        var localRating, request, response, _a, request, response, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!hasClicked) return [3 /*break*/, 5];
                    return [4 /*yield*/, checkLocalStorage(titleHref)];
                case 1:
                    localRating = _c.sent();
                    if (localRating) {
                        return [2 /*return*/, localRating];
                    }
                    return [4 /*yield*/, fetch("https://filmtoro.com/api/watch.asp?id=".concat(titleHref, "&api=8mds8d7d55"))];
                case 2:
                    request = _c.sent();
                    _a = formatApiData;
                    return [4 /*yield*/, request.json()];
                case 3:
                    response = _a.apply(void 0, [_c.sent()]);
                    return [4 /*yield*/, addToLocalStorage(titleHref, response)];
                case 4:
                    _c.sent();
                    return [2 /*return*/, response];
                case 5: return [4 /*yield*/, fetch("https://filmtoro.com/api/watch.asp?id=".concat(titleHref, "&api=8mds8d7d55&click=true"))];
                case 6:
                    request = _c.sent();
                    _b = formatApiData;
                    return [4 /*yield*/, request.json()];
                case 7:
                    response = _b.apply(void 0, [_c.sent()]);
                    return [4 /*yield*/, addToLocalStorage(titleHref, response)];
                case 8:
                    _c.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.getRatings = getRatings;
function checkLocalStorage(titleHref) {
    return __awaiter(this, void 0, void 0, function () {
        var localStorage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chrome.storage.local.get(["previous_ratings"])];
                case 1:
                    localStorage = _a.sent();
                    if (!localStorage.previous_ratings) {
                        return [2 /*return*/, null];
                    }
                    else {
                        if (localStorage.previous_ratings[titleHref]) {
                            return [2 /*return*/, localStorage.previous_ratings[titleHref]];
                        }
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function addToLocalStorage(titleHref, rating) {
    return __awaiter(this, void 0, void 0, function () {
        var initial_ratings, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initial_ratings = {};
                    return [4 /*yield*/, chrome.storage.local.get(["previous_ratings"])];
                case 1:
                    result = _a.sent();
                    if (!!result.previous_ratings) return [3 /*break*/, 3];
                    // If we have not stored previous ratings before
                    initial_ratings[titleHref] = rating;
                    return [4 /*yield*/, chrome.storage.local.set({
                            previous_ratings: initial_ratings
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!!(titleHref in result.previous_ratings)) return [3 /*break*/, 5];
                    // If we have stored ratings and it's not already stored
                    result.previous_ratings[titleHref] = rating;
                    return [4 /*yield*/, chrome.storage.local.set({
                            previous_ratings: result.previous_ratings,
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function formatApiData(apiData) {
    var output = { rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF" };
    if (apiData['film_imdb_rating'] > 0) {
        output.imdb_rating = "".concat((apiData['film_imdb_rating'] / 10).toFixed(1));
        if (apiData['film_imdb_rating'] > 83) {
            output.imdb_color = '#2ECC71';
        }
        else if (apiData['film_imdb_rating'] < 70) {
            output.imdb_color = '#C70039';
        }
    }
    if (apiData['film_rt_rating'] > 0) {
        output.rt_rating = "".concat(apiData['film_rt_rating'], "%");
        if (apiData['film_rt_rating'] > 83) {
            output.rt_color = '#2ECC71';
        }
        else if (apiData['film_rt_rating'] < 70) {
            output.rt_color = '#C70039';
        }
    }
    return output;
}
function delay(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
exports.delay = delay;
function addLoader(parent) {
    var loader = document.createElement("div");
    loader.className = "ratings-loader";
    loader.innerHTML = "\n\n  <div class=\"loadingio-spinner-rolling-mhlz99gyu8k\"><div class=\"ldio-ma7aqaeb3ij\">\n  <div></div>\n  </div></div>\n  <style type=\"text/css\">\n  @keyframes ldio-ma7aqaeb3ij {\n    0% { transform: translate(-50%,-50%) rotate(0deg); }\n    100% { transform: translate(-50%,-50%) rotate(360deg); }\n  }\n  .ldio-ma7aqaeb3ij div {\n    position: absolute;\n    width: 120px;\n    height: 120px;\n    border: 10px solid #ffffff;\n    border-top-color: transparent;\n    border-radius: 50%;\n  }\n  .ldio-ma7aqaeb3ij div {\n    animation: ldio-ma7aqaeb3ij 1s linear infinite;\n    top: 100px;\n    left: 100px\n  }\n  .loadingio-spinner-rolling-mhlz99gyu8k {\n    width: 50px;\n    height: 50px;\n    display: inline-block;\n    overflow: hidden;\n  }\n  .ldio-ma7aqaeb3ij {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    transform: translateZ(0) scale(0.25);\n    backface-visibility: hidden;\n    transform-origin: 0 0px; /* see note above */\n  }\n  .ldio-ma7aqaeb3ij div { box-sizing: content-box; }\n\n  .ratings-loader {\n    display: flex;\n    justify-content: center;\n  }\n\n  </style>\n  ";
    parent.appendChild(loader);
}
exports.addLoader = addLoader;
function removeLoader(parent) {
    var loader = parent.getElementsByClassName("ratings-loader")[0];
    parent.removeChild(loader);
}
exports.removeLoader = removeLoader;


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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map