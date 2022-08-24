/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        var titleHref, ratings, header, attempts, playButtonElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    titleHref = window.location.href;
                    return [4 /*yield*/, (0, utils_1.getRatings)(titleHref, false)];
                case 1:
                    ratings = _a.sent();
                    console.log(ratings);
                    header = document.createElement("h4");
                    header.className = "text-color--primary body-copy body-copy--large margin--left-4";
                    header.innerHTML = "IMDb: <span style=\"color:".concat(ratings.imdb_color, "\">").concat(ratings.imdb_rating, "</span> \u00A0 Rotten Tomatoes: <span style=\"color:").concat(ratings.rt_color, "\">").concat(ratings.rt_rating, "</span>");
                    attempts = 0;
                    _a.label = 2;
                case 2:
                    if (false) {}
                    playButtonElement = document.getElementsByClassName("button-play");
                    if (!playButtonElement.length) return [3 /*break*/, 3];
                    playButtonElement[0].parentElement.appendChild(header);
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
exports.delay = exports.getRatings = void 0;
function getRatings(titleHref, hasClicked) {
    return __awaiter(this, void 0, void 0, function () {
        var request, _a, request, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!hasClicked) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch("https://filmtoro.com/api/watch.asp?id=".concat(titleHref, "&api=8mds8d7d55"))];
                case 1:
                    request = _c.sent();
                    _a = formatApiData;
                    return [4 /*yield*/, request.json()];
                case 2: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                case 3: return [4 /*yield*/, fetch("https://filmtoro.com/api/watch.asp?id=".concat(titleHref, "&api=8mds8d7d55&click=true"))];
                case 4:
                    request = _c.sent();
                    _b = formatApiData;
                    return [4 /*yield*/, request.json()];
                case 5: return [2 /*return*/, _b.apply(void 0, [_c.sent()])];
            }
        });
    });
}
exports.getRatings = getRatings;
function formatApiData(apiData) {
    var output = { rt_rating: 'N/A', imdb_rating: 'N/A', imdb_color: "#FFF", rt_color: "#FFF" };
    if (apiData['film_imdb_rating'] > 0) {
        output.imdb_rating = "".concat(apiData['film_imdb_rating'] / 10);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var disney_1 = __webpack_require__(831);
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
    PageType[PageType["None"] = 2] = "None";
})(PageType || (PageType = {}));
var currSite = StreamingSite.None;
window.addEventListener("load", onLoad);
function onLoad(event) {
    // Determine what streaming site we are on
    if (window.location.href.indexOf("https://www.netflix.com/") > -1) {
        currSite = StreamingSite.Netflix;
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
var hasLoadedDetails = false;
function onDomChange(mutationList, observer) {
    if (currSite === StreamingSite.Netflix) {
        // do netflix trigger
    }
    if (currSite === StreamingSite.DisneyPlus) {
        // We can't to disney plus ratings on hover on the main page
        // this is because we don't have access to the link of the show/movie at any point, anywhere on the homepage.
        // the most we can get is the title of the show in the current language, but that could cause issues.
        // We can only load the rating on the details screen.
        if (getPageType() === PageType.Details && !hasLoadedDetails) {
            (0, disney_1.onDisneyDetailsScreen)();
            hasLoadedDetails = true;
        }
        if (getPageType() === PageType.Homepage) {
            hasLoadedDetails = false;
        }
    }
}
function getPageType() {
    var currPage = PageType.None;
    if (currSite = StreamingSite.DisneyPlus) {
        if (window.location.href.indexOf("home") > -1) {
            currPage = PageType.Homepage;
        }
        else if (window.location.href.indexOf("series") > -1 || window.location.href.indexOf("movie") > -1) {
            currPage = PageType.Details;
        }
        else {
            currPage = PageType.None;
        }
    }
    return currPage;
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map