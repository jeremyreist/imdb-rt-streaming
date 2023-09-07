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
var hbo_1 = __webpack_require__(891);
var StreamingSite;
(function (StreamingSite) {
    StreamingSite[StreamingSite["Netflix"] = 0] = "Netflix";
    StreamingSite[StreamingSite["DisneyPlus"] = 1] = "DisneyPlus";
    StreamingSite[StreamingSite["HBOMax"] = 2] = "HBOMax";
    StreamingSite[StreamingSite["None"] = 3] = "None";
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
var oldHref = document.location.href;
var lastViewedTitleHref = null;
window.addEventListener("load", onLoad);
function onLoad(event) {
    // Determine what streaming site we are on
    if (window.location.href.indexOf("netflix.com/") > -1) {
        currSite = StreamingSite.Netflix;
        window.addEventListener("mousedown", function () {
            if ((0, netflix_1.getNetflixTitleHref)()) {
                lastViewedTitleHref = (0, netflix_1.getNetflixTitleHref)();
            }
        });
        if (window.location.href.indexOf("title") > -1) {
            (0, netflix_1.onNetflixDetailsPage)();
        }
    }
    else if (window.location.href.indexOf("disneyplus.com/") > -1) {
        currSite = StreamingSite.DisneyPlus;
    }
    else if (window.location.href.indexOf("hbomax.com/") > -1) {
        currSite = StreamingSite.HBOMax;
        window.addEventListener("mousedown", function () {
            if ((0, hbo_1.getHBOTitleHref)()) {
                lastViewedTitleHref = (0, hbo_1.getHBOTitleHref)();
            }
        });
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
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    if (getPageType() === PageType.Details) {
                        (0, netflix_1.onNetflixDetailsPage)();
                        previousDomChangeType = PageType.Details;
                    }
                    if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
                        previousDomChangeType = PageType.Watching;
                        if (lastViewedTitleHref) {
                            (0, netflix_1.onNetflixWatchPage)(lastViewedTitleHref);
                        }
                    }
                }
            }
            // ------------------
            if (currSite === StreamingSite.DisneyPlus) {
                // We can't do disney plus ratings on hover on the main page
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
                        (0, disney_1.onDisneyWatchPage)(lastViewedTitleHref);
                    }
                }
            }
            // ------------------
            if (currSite === StreamingSite.HBOMax) {
                if (getPageType() === PageType.Homepage) {
                    previousDomChangeType = PageType.Homepage;
                    (0, hbo_1.onHBOHomepage)();
                }
                if (getPageType() === PageType.Details && lastViewedTitleHref != window.location.href) {
                    previousDomChangeType = PageType.Details;
                    lastViewedTitleHref = window.location.href;
                    (0, hbo_1.onHBODetailsScreen)();
                }
                if (getPageType() === PageType.Watching && previousDomChangeType != PageType.Watching) {
                    previousDomChangeType = PageType.Watching;
                    "";
                    (0, hbo_1.onHBOWatchPage)(lastViewedTitleHref);
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
        else if (window.location.href.indexOf("watch") > -1) {
            currPage = PageType.Watching;
        }
        else {
            currPage = PageType.Homepage;
        }
    }
    if (currSite === StreamingSite.DisneyPlus) {
        if (window.location.href.indexOf("home") > -1) {
            currPage = PageType.Homepage;
        }
        else if (/.*\/(movies|series)\/.*\/.*/.test(window.location.href)) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("video") > -1) {
            currPage = PageType.Watching;
        }
        else {
            currPage = PageType.None;
        }
    }
    if (currSite === StreamingSite.HBOMax) {
        if (window.location.href.indexOf("player") > -1) {
            currPage = PageType.Watching;
        }
        else if (window.location.href.indexOf(":type:series") > -1
            || window.location.href.indexOf(":type:feature") > -1) {
            currPage = PageType.Details;
        }
        else if (window.location.href.indexOf("/page/urn:hbo:page:") > -1
            || window.location.href.indexOf(":collection:") > -1
            || window.location.href.indexOf(":franchise:") > -1) {
            currPage = PageType.Homepage;
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
exports.onDisneyWatchPage = exports.onDisneyDetailsScreen = void 0;
var utils_1 = __webpack_require__(974);
function onDisneyDetailsScreen() {
    return __awaiter(this, void 0, void 0, function () {
        var titleHref, ratings, ratingsElement, attempts, parent_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    titleHref = window.location.href;
                    return [4 /*yield*/, (0, utils_1.getRatings)({ id: titleHref })];
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
function onDisneyWatchPage(titleHref) {
    return __awaiter(this, void 0, void 0, function () {
        var spliceIndex, episodeID, limit, endTime, startTime, durationString, durationSeconds, start, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spliceIndex = window.location.href.indexOf("video/") + "video/".length;
                    episodeID = window.location.href.slice(spliceIndex);
                    limit = 0;
                    (0, utils_1.getRatings)({ id: titleHref, episode: episodeID, click: true });
                    _a.label = 1;
                case 1:
                    if (!(!document.getElementsByTagName('video').length || !document.getElementsByClassName('time-remaining-label').length || limit > 50)) return [3 /*break*/, 3];
                    limit += 1;
                    return [4 /*yield*/, (0, utils_1.delay)(500)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3:
                    startTime = document.getElementsByTagName('video')[0].currentTime;
                    durationString = document.getElementsByClassName('time-remaining-label')[0].textContent; // e.g 01:50:01
                    durationSeconds = hmsToSecondsOnly(durationString);
                    _a.label = 4;
                case 4:
                    if (!(window.location.href.indexOf("video/".concat(episodeID)) > 0)) return [3 /*break*/, 6];
                    try {
                        if (window.location.href.indexOf("video/".concat(episodeID)) > 0) {
                            if (!isNaN(document.getElementsByTagName('video')[0].currentTime)) {
                                endTime = document.getElementsByTagName('video')[0].currentTime;
                            }
                        }
                    }
                    catch (_b) {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, (0, utils_1.delay)(10)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 6:
                    start = Math.floor((startTime / durationSeconds) * 100);
                    end = Math.floor((endTime / durationSeconds) * 100);
                    (0, utils_1.getRatings)({ id: titleHref, episode: episodeID, click: true, start: start, end: end });
                    return [2 /*return*/];
            }
        });
    });
}
exports.onDisneyWatchPage = onDisneyWatchPage;
function hmsToSecondsOnly(str) {
    var part = str.split(':'), seconds = 0, minutes = 1;
    while (part.length > 0) {
        seconds += minutes * parseInt(part.pop(), 10);
        minutes *= 60;
    }
    return seconds;
}


/***/ }),

/***/ 891:
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
exports.getHBOTitleHref = exports.onHBOWatchPage = exports.onHBODetailsScreen = exports.onHBOHomepage = void 0;
var utils_1 = __webpack_require__(974);
var lastHoveredTitleHfref = null;
function onHBOHomepage() {
    return __awaiter(this, void 0, void 0, function () {
        var titleHref;
        return __generator(this, function (_a) {
            titleHref = getHBOTitleHref();
            // Makes sure we only load once per element
            if (lastHoveredTitleHfref != titleHref) {
                lastHoveredTitleHfref = titleHref;
                if (titleHref) {
                    handleTitleCardHover();
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.onHBOHomepage = onHBOHomepage;
function onHBODetailsScreen() {
    return __awaiter(this, void 0, void 0, function () {
        var titleHref, ratings, ratingsElement, attempts, buttonContainers, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    titleHref = window.location.href.slice(0, window.location.href.indexOf(":type:"));
                    return [4 /*yield*/, (0, utils_1.getRatings)({ id: titleHref })];
                case 1:
                    ratings = _a.sent();
                    ratingsElement = document.createElement("h2");
                    ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
                    ratingsElement.innerHTML = "IMDb: <span style=\"color:".concat(ratings.imdb_color, "\">").concat(ratings.imdb_rating, "</span> \u00A0 Rotten Tomatoes: <span style=\"color:").concat(ratings.rt_color, "\">").concat(ratings.rt_rating, "</span>");
                    ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 14px; letter-spacing: 0.5px; line-height: 18px; padding-left:20px');
                    attempts = 0;
                    _a.label = 2;
                case 2:
                    if (false) {}
                    return [4 /*yield*/, (0, utils_1.delay)(1000)];
                case 3:
                    _a.sent();
                    buttonContainers = document.getElementsByClassName('css-175oi2r r-1awozwy r-18u37iz r-1mnahxq');
                    if (!buttonContainers.length) return [3 /*break*/, 4];
                    for (index = 0; index < buttonContainers.length; index++) {
                        if (getComputedStyle(buttonContainers[index]).display == 'flex') {
                            buttonContainers[index].appendChild(ratingsElement);
                            fadeIn(ratingsElement, 0.1);
                        }
                    }
                    return [3 /*break*/, 7];
                case 4:
                    attempts += 1;
                    return [4 /*yield*/, (0, utils_1.delay)(100)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (attempts === 100) {
                        console.error("Failed to get ratings!");
                    }
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.onHBODetailsScreen = onHBODetailsScreen;
function onHBOWatchPage(titleHref) {
    return __awaiter(this, void 0, void 0, function () {
        var spliceIndex, episodeID, exitPageUrn, limit, endTime, startTime, duration, start, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (titleHref.indexOf("?exitPageUrn") > 0) {
                        titleHref = titleHref.slice(0, titleHref.indexOf("?exitPageUrn"));
                    }
                    spliceIndex = window.location.href.indexOf(":episode:") + ":episode:".length;
                    if (spliceIndex == 8) {
                        spliceIndex = window.location.href.indexOf(":feature:") + ":feature:".length;
                    }
                    episodeID = window.location.href.slice(spliceIndex, spliceIndex + 21);
                    exitPageUrn = null;
                    if (window.location.href.indexOf('?exitPageUrn=') > 0 && window.location.href.indexOf('episode') > 0) {
                        exitPageUrn = window.location.href.slice(window.location.href.indexOf('?exitPageUrn=') + '?exitPageUrn='.length);
                    }
                    limit = 0;
                    if (titleHref.indexOf('series') == 0) {
                        titleHref = "";
                    }
                    else if (exitPageUrn) {
                        titleHref = 'https://play.hbomax.com' + exitPageUrn.replace('series', 'page') + ':type:series';
                    }
                    (0, utils_1.getRatings)({ id: titleHref, episode: episodeID, click: true });
                    return [4 /*yield*/, (0, utils_1.delay)(5000)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(!document.getElementsByTagName('video').length || limit > 50)) return [3 /*break*/, 4];
                    limit += 1;
                    return [4 /*yield*/, (0, utils_1.delay)(500)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4:
                    startTime = document.getElementsByTagName('video')[0].currentTime;
                    duration = document.getElementsByTagName('video')[0].duration;
                    _a.label = 5;
                case 5:
                    if (!(window.location.href.indexOf(episodeID) > 0)) return [3 /*break*/, 7];
                    try {
                        if (window.location.href.indexOf(episodeID) > 0) {
                            if (!isNaN(document.getElementsByTagName('video')[0].currentTime)) {
                                endTime = document.getElementsByTagName('video')[0].currentTime;
                            }
                        }
                    }
                    catch (error) {
                        console.log(error);
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, (0, utils_1.delay)(10)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 7:
                    start = Math.floor((startTime / duration) * 100);
                    end = Math.floor((endTime / duration) * 100);
                    if (isNaN(start)) {
                        console.log('Got NAN for start');
                        start = 0;
                    }
                    if (isNaN(end)) {
                        console.log('Got NAN for end');
                        end = 0;
                    }
                    (0, utils_1.getRatings)({ id: titleHref, episode: episodeID, click: true, start: start, end: end });
                    return [2 /*return*/];
            }
        });
    });
}
exports.onHBOWatchPage = onHBOWatchPage;
function handleTitleCardHover() {
    return __awaiter(this, void 0, void 0, function () {
        var hoveredTitleCard, ratings, titleHref, error_1, ratingsElement, inserted, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hoveredTitleCard = Array.from(document.querySelectorAll(":hover")).pop().closest('a');
                    if (!(hoveredTitleCard.parentElement.querySelectorAll(".ratings-loader,.ratings").length == 0
                        && hoveredTitleCard.href.includes(':type:')
                        && !(hoveredTitleCard.href.includes('episode')))) return [3 /*break*/, 5];
                    (0, utils_1.addLoader)(hoveredTitleCard.children[0].children[0], 0.75);
                    ratings = { rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF" };
                    titleHref = getHBOTitleHref();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, utils_1.getRatings)({ id: titleHref })];
                case 2:
                    ratings = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    ratingsElement = document.createElement("h2");
                    ratingsElement.className = "ratings css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a";
                    ratingsElement.innerHTML = "IMDb: <span style=\"color:".concat(ratings.imdb_color, "\">").concat(ratings.imdb_rating, "</span> \u00A0 Rotten Tomatoes: <span style=\"color:").concat(ratings.rt_color, "\">").concat(ratings.rt_rating, "</span>");
                    ratingsElement.setAttribute('style', 'color: rgba(255, 255, 255, 0.7); font-family: StreetLCG2; font-weight: 400; font-style: normal; font-size: 12px; letter-spacing: 0.5px; line-height: 18px;');
                    (0, utils_1.removeLoader)(hoveredTitleCard.children[0].children[0]);
                    // Insert ratings element if not a trailer
                    if (!hoveredTitleCard.href.includes('extra')) {
                        inserted = false;
                        for (index = 0; index < hoveredTitleCard.children.length; index++) {
                            if (hoveredTitleCard.children[index].getAttribute('data-testid') == 'attribution-text'
                                || hoveredTitleCard.children[index].getAttribute('data-testid') == 'tile-details-container') {
                                hoveredTitleCard.insertBefore(ratingsElement, hoveredTitleCard.children[index]);
                                inserted = true;
                            }
                        }
                        if (!inserted) {
                            hoveredTitleCard.appendChild(ratingsElement);
                        }
                        fadeIn(ratingsElement, 0.1);
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fadeIn(item, i) {
    i += 0.2;
    item.style.opacity = i;
    if (i < 1)
        setTimeout(function () { return fadeIn(item, i); }, 50);
}
function getHBOTitleHref() {
    var hoveredTitleCard = Array.from(document.querySelectorAll(":hover")).pop();
    try {
        var titleHref = hoveredTitleCard.closest('a').href;
        return titleHref.slice(0, titleHref.indexOf(":type:"));
    }
    catch (TypeError) {
        return null;
    }
}
exports.getHBOTitleHref = getHBOTitleHref;


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
exports.getAlternateTitleHref = exports.getNetflixTitleHref = exports.onNetflixWatchPage = exports.onNetflixDetailsPage = exports.onNetflixHomepage = void 0;
var utils_1 = __webpack_require__(974);
var lastGrabbedRatingsFromTitleCard = null;
var lastViewedTitleHref = null;
function onNetflixHomepage() {
    return __awaiter(this, void 0, void 0, function () {
        var titleHref;
        return __generator(this, function (_a) {
            titleHref = getNetflixTitleHref();
            if (lastViewedTitleHref != titleHref) {
                lastViewedTitleHref = titleHref;
                if (titleHref) {
                    handleTitleCardHover(lastViewedTitleHref);
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.onNetflixHomepage = onNetflixHomepage;
function onNetflixDetailsPage() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (lastViewedTitleHref)
                handleShowInformationCard(lastViewedTitleHref);
            else {
                lastViewedTitleHref = getAlternateTitleHref();
                if (lastViewedTitleHref)
                    handleShowInformationCard(lastViewedTitleHref);
            }
            return [2 /*return*/];
        });
    });
}
exports.onNetflixDetailsPage = onNetflixDetailsPage;
function onNetflixWatchPage(titleHref) {
    return __awaiter(this, void 0, void 0, function () {
        var spliceIndex, episodeID, limit, endTime, startTime, duration, start, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spliceIndex = window.location.href.indexOf("watch/") + "watch/".length;
                    episodeID = window.location.href.slice(spliceIndex, spliceIndex + 8);
                    limit = 0;
                    (0, utils_1.getRatings)({ id: titleHref, episode: episodeID, click: true });
                    _a.label = 1;
                case 1:
                    if (!(!document.getElementsByTagName('video').length || limit > 50)) return [3 /*break*/, 3];
                    limit += 1;
                    return [4 /*yield*/, (0, utils_1.delay)(500)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3:
                    startTime = document.getElementsByTagName('video')[0].currentTime;
                    duration = document.getElementsByTagName('video')[0].duration;
                    _a.label = 4;
                case 4:
                    if (!(window.location.href.indexOf("watch/".concat(episodeID)) > 0)) return [3 /*break*/, 6];
                    try {
                        if (window.location.href.indexOf("watch/".concat(episodeID)) > 0) {
                            if (!isNaN(document.getElementsByTagName('video')[0].currentTime)) {
                                endTime = document.getElementsByTagName('video')[0].currentTime;
                            }
                        }
                    }
                    catch (_b) {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, (0, utils_1.delay)(10)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 6:
                    start = Math.floor((startTime / duration) * 100);
                    end = Math.floor((endTime / duration) * 100);
                    (0, utils_1.getRatings)({ id: titleHref, episode: episodeID, click: true, start: start, end: end });
                    return [2 /*return*/];
            }
        });
    });
}
exports.onNetflixWatchPage = onNetflixWatchPage;
function handleShowInformationCard(titleHref) {
    return __awaiter(this, void 0, void 0, function () {
        var parent, ratings, ratingsElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parent = document.getElementsByClassName("detail-modal-container")[0];
                    (0, utils_1.addLoader)(parent, /*number=*/ 1, /*insertBefore=*/ true);
                    if (!(!lastGrabbedRatingsFromTitleCard || lastGrabbedRatingsFromTitleCard.id != titleHref)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, utils_1.getRatings)({ id: titleHref, click: true })];
                case 1:
                    ratings = _a.sent();
                    lastGrabbedRatingsFromTitleCard = ratings;
                    lastGrabbedRatingsFromTitleCard.id = titleHref;
                    return [3 /*break*/, 3];
                case 2:
                    // Use cached ratings if we have them.
                    ratings = lastGrabbedRatingsFromTitleCard;
                    _a.label = 3;
                case 3:
                    ratingsElement = document.createElement("span");
                    ratingsElement.className = "previewModal--metadatAndControls-tags-container";
                    ratingsElement.innerHTML =
                        "\n  <div class=\"evidence-tags\">\n    <div class=\"evidence-list\">\n      <div class=\"evidence-item\">\n        <span class=\"evidence-text\" style=\"font-size:20px\">\n          IMDb: <span style=\"color:".concat(ratings.imdb_color, "\">").concat(ratings.imdb_rating, "</span> \n        </span>\n      </div>\n      <div class=\"evidence-item\">\n        <span class=\"evidence-separator\"></span>\n        <span class=\"evidence-text\" style=\"font-size:20px\">\n          Rotten Tomatoes: <span style=\"color:").concat(ratings.rt_color, "\">").concat(ratings.rt_rating, "</span> \n        </span>\n      </div>\n    </div>\n  </div>\n  ");
                    (0, utils_1.removeLoader)(parent);
                    parent.insertBefore(ratingsElement, parent.children[0]);
                    return [2 /*return*/];
            }
        });
    });
}
function handleTitleCardHover(titleHref) {
    return __awaiter(this, void 0, void 0, function () {
        var parent, ratings, ratingsElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parent = document.getElementsByClassName("previewModal--metadatAndControls-container")[0];
                    (0, utils_1.addLoader)(parent);
                    return [4 /*yield*/, (0, utils_1.getRatings)({ id: titleHref })];
                case 1:
                    ratings = _a.sent();
                    lastGrabbedRatingsFromTitleCard = ratings;
                    lastGrabbedRatingsFromTitleCard.id = titleHref;
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
function getNetflixTitleHref() {
    var previewModal = document.getElementsByClassName("previewModal--info")[0];
    try {
        var titleHref = previewModal.children[0].href;
        return titleHref.slice(0, titleHref.indexOf("/title/") + "/title/".length + 8);
    }
    catch (TypeError) {
        return null;
    }
}
exports.getNetflixTitleHref = getNetflixTitleHref;
function getAlternateTitleHref() {
    if (window.location.href.indexOf("title") == -1)
        return null;
    try {
        var linkElements = document.querySelectorAll("link[rel='alternate']");
        var link = linkElements[0].href;
        if (!link)
            return null;
        return "https://" + link.slice(link.indexOf("www.netflix"));
    }
    catch (TypeError) {
        return null;
    }
}
exports.getAlternateTitleHref = getAlternateTitleHref;


/***/ }),

/***/ 974:
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function getRatings(params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, episode, _b, api, click, start, end, localRating, apiUrl, request, response, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = __assign({}, params), id = _a.id, episode = _a.episode, _b = _a.api, api = _b === void 0 ? "8mds8d7d55" : _b, click = _a.click, start = _a.start, end = _a.end;
                    if (!!click) return [3 /*break*/, 2];
                    return [4 /*yield*/, checkLocalStorage(id)];
                case 1:
                    localRating = _d.sent();
                    if (localRating) {
                        return [2 /*return*/, localRating];
                    }
                    _d.label = 2;
                case 2:
                    apiUrl = new URL("https://filmtoro.com/api/watch.asp");
                    apiUrl.searchParams.append('id', id);
                    apiUrl.searchParams.append('api', api);
                    if (typeof click !== 'undefined')
                        apiUrl.searchParams.append('click', click.toString());
                    if (typeof episode !== 'undefined')
                        apiUrl.searchParams.append('episode', episode);
                    if (typeof start !== 'undefined')
                        apiUrl.searchParams.append('start', start.toString());
                    if (typeof end !== 'undefined')
                        apiUrl.searchParams.append('end', end.toString());
                    return [4 /*yield*/, fetch(apiUrl)];
                case 3:
                    request = _d.sent();
                    _c = formatApiData;
                    return [4 /*yield*/, request.json()];
                case 4:
                    response = _c.apply(void 0, [_d.sent()]);
                    return [4 /*yield*/, addToLocalStorage(id, response)];
                case 5:
                    _d.sent();
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
function addLoader(parent, scale, insertBefore) {
    if (scale === void 0) { scale = 1; }
    if (insertBefore === void 0) { insertBefore = false; }
    var loader = document.createElement("div");
    loader.className = "ratings-loader";
    loader.innerHTML = "\n\n  <div class=\"loadingio-spinner-rolling-mhlz99gyu8k\"><div class=\"ldio-ma7aqaeb3ij\">\n  <div></div>\n  </div></div>\n  <style type=\"text/css\">\n  @keyframes ldio-ma7aqaeb3ij {\n    0% { transform: translate(-50%,-50%) rotate(0deg); }\n    100% { transform: translate(-50%,-50%) rotate(360deg); }\n  }\n  .ldio-ma7aqaeb3ij div {\n    position: absolute;\n    width: 120px;\n    height: 120px;\n    border: 10px solid #ffffff;\n    border-top-color: transparent;\n    border-radius: 50%;\n  }\n  .ldio-ma7aqaeb3ij div {\n    animation: ldio-ma7aqaeb3ij 1s linear infinite;\n    top: 100px;\n    left: 100px\n  }\n  .loadingio-spinner-rolling-mhlz99gyu8k {\n    width: 50px;\n    height: 50px;\n    display: inline-block;\n    overflow: hidden;\n  }\n  .ldio-ma7aqaeb3ij {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    transform: translateZ(0) scale(0.25);\n    backface-visibility: hidden;\n    transform-origin: 0 0px; /* see note above */\n  }\n  .ldio-ma7aqaeb3ij div { box-sizing: content-box; }\n\n  .ratings-loader {\n    display: flex;\n    justify-content: center;\n  }\n\n  </style>\n  ";
    loader.setAttribute('style', "transform: scale(".concat(scale, ");"));
    if (insertBefore) {
        parent.insertBefore(loader, parent.children[0]);
    }
    else {
        parent.appendChild(loader);
    }
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