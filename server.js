require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(88);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(89);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(87);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      if (--inserted[id] <= 0) {
        var elem = document.getElementById(prefix + id);
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && btoa) {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

const port = process.env.PORT || 3000;
/* harmony export (immutable) */ __webpack_exports__["b"] = port;

const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
/* harmony export (immutable) */ __webpack_exports__["e"] = host;


const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
/* harmony export (immutable) */ __webpack_exports__["c"] = databaseUrl;


const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID }

};
/* harmony export (immutable) */ __webpack_exports__["d"] = analytics;


const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = auth;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const sequelize = new __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a(__WEBPACK_IMPORTED_MODULE_1__config__["c" /* databaseUrl */], {
  define: {
    freezeTableName: true
  }
});

/* harmony default export */ __webpack_exports__["a"] = sequelize;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = {
    header: [],
    footer: [],
    sections: [{
        name: 'Video',
        props: {
            url: "https://www.youtube.com/embed/iL3OERBOk74"
        }
    }, {
        name: 'Break',
        props: {
            title: "Intro with count down",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Crowdsale progress",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Percentage raised",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Crowdsale FAQ",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Social",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Why build this",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Intro with video",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Comparison",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Another video",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Video',
        props: {
            url: "https://www.youtube.com/embed/iL3OERBOk74"
        }
    }, {
        name: 'Break',
        props: {
            title: "Chart",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Features",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Whitepaper",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Another video",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Video',
        props: {
            url: "https://www.youtube.com/embed/iL3OERBOk74"
        }
    }, {
        name: 'Break',
        props: {
            title: "Timeline",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Team",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Subscribe",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Signup",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Sponsor",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }]
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_material_ui_styles_MuiThemeProvider__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_material_ui_styles_MuiThemeProvider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles_MuiThemeProvider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Layout_css__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Layout_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Header__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Footer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_sticky__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_sticky___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_sticky__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



// import injectTapEventPlugin from 'react-tap-event-plugin';






// injectTapEventPlugin();

var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_4__Header__["a" /* default */], {});

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_5__Footer__["a" /* default */], {});

function Layout(props) {
  return _jsx(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles_MuiThemeProvider___default.a, {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_react_sticky__["StickyContainer"], {}, void 0, _ref, props.children, _ref2));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Layout_css___default.a)(Layout);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_fetch__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);
/* unused harmony reexport Request */
/* unused harmony reexport Headers */
/* unused harmony reexport Response */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localFetch; });
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





__WEBPACK_IMPORTED_MODULE_1_node_fetch___default.a.Promise = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a;
__WEBPACK_IMPORTED_MODULE_1_node_fetch__["Response"].Promise = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${__WEBPACK_IMPORTED_MODULE_2__config__["e" /* host */]}${url}`;
}

function localFetch(url, options) {
  return __WEBPACK_IMPORTED_MODULE_1_node_fetch___default()(localUrl(url), options);
}



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sequelize__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UserLogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserClaim__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UserProfile__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__UserLogin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__UserClaim__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__UserProfile__["a"]; });
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_2__UserLogin__["a" /* default */], {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_3__UserClaim__["a" /* default */], {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasOne(__WEBPACK_IMPORTED_MODULE_4__UserProfile__["a" /* default */], {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return __WEBPACK_IMPORTED_MODULE_0__sequelize__["a" /* default */].sync(...args);
}

/* harmony default export */ __webpack_exports__["a"] = { sync };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(57);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./ErrorPage.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-sticky");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_jwt__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_graphql__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom_server__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_universal_router__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_universal_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_universal_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pretty_error__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_App__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Html__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__routes_error_ErrorPage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__routes_error_ErrorPage_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__routes_error_ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__routes_error_ErrorPage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__core_passport__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__data_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__data_schema__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__routes__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_json__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__config__ = __webpack_require__(4);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




















 // eslint-disable-line import/no-unresolved


const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_4_express_jwt___default()({
  secret: __WEBPACK_IMPORTED_MODULE_20__config__["a" /* auth */].jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
app.use(__WEBPACK_IMPORTED_MODULE_15__core_passport__["a" /* default */].initialize());

if (false) {
  app.enable('trust proxy');
}
app.get('/login/facebook', __WEBPACK_IMPORTED_MODULE_15__core_passport__["a" /* default */].authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
app.get('/login/facebook/return', __WEBPACK_IMPORTED_MODULE_15__core_passport__["a" /* default */].authenticate('facebook', { failureRedirect: '/login', session: false }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken___default.a.sign(req.user, __WEBPACK_IMPORTED_MODULE_20__config__["a" /* auth */].jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect('/');
});
app.post('/login', (req, res) => {
  console.log('login');
  res.redirect('/about');
});

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', __WEBPACK_IMPORTED_MODULE_5_express_graphql___default()(req => ({
  schema: __WEBPACK_IMPORTED_MODULE_17__data_schema__["a" /* default */],
  graphiql: false,
  rootValue: { request: req },
  pretty: false
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const css = new Set();

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
      const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        insertCss: function (...styles) {
          // eslint-disable-next-line no-underscore-dangle
          styles.forEach(function (style) {
            return css.add(style._getCss());
          });
        }
      };

      const route = yield __WEBPACK_IMPORTED_MODULE_9_universal_router___default.a.resolve(__WEBPACK_IMPORTED_MODULE_18__routes__["a" /* default */], {
        path: req.path,
        query: req.query
      });

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      const data = _extends({}, route);
      data.children = __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToString(_jsx(__WEBPACK_IMPORTED_MODULE_11__components_App__["a" /* default */], {
        context: context
      }, void 0, route.component));
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
      data.scripts = [__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a.vendor.js, __WEBPACK_IMPORTED_MODULE_19__assets_json___default.a.client.js];
      if (__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a[route.chunk]) {
        data.scripts.push(__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a[route.chunk].js);
      }

      const html = __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__components_Html__["a" /* default */], data));
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new __WEBPACK_IMPORTED_MODULE_10_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToStaticMarkup(_jsx(__WEBPACK_IMPORTED_MODULE_12__components_Html__["a" /* default */], {
    title: 'Internal Server Error',
    description: err.message,
    styles: [{ id: 'css', cssText: __WEBPACK_IMPORTED_MODULE_14__routes_error_ErrorPage_css___default.a._getCss() }]
  }, void 0, __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToString(_jsx(__WEBPACK_IMPORTED_MODULE_13__routes_error_ErrorPage__["a" /* ErrorPageWithoutStyle */], {
    error: err
  }))));
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
__WEBPACK_IMPORTED_MODULE_16__data_models__["a" /* default */].sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(__WEBPACK_IMPORTED_MODULE_20__config__["b" /* port */], () => {
    console.log(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_20__config__["b" /* port */]}/`);
  });
});
/* eslint-enable no-console */

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);
  }

}

App.childContextTypes = ContextType;
/* harmony default export */ __webpack_exports__["a"] = App;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_Card__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_Card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_material_ui_Card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Countdown_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Countdown_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






class Countdown extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);

        var curTime = new Date().getTime();
        var _secondsRemaining = (props.dueDate - curTime) / 1000;
        if (_secondsRemaining < 0) _secondsRemaining = 0;

        this.state = {
            secondsRemaining: _secondsRemaining,
            days: 0,
            hours: 0,
            minutes: 0,
            secs: 0
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick(self) {
        try {
            var _secondsRemaining = self.state.secondsRemaining - 1;
            var _days = Math.floor(_secondsRemaining / 86400);
            var _hours = Math.floor(_secondsRemaining % 86400 / 3600);
            var _minutes = Math.floor(_secondsRemaining % 3600 / 60);
            var _secs = Math.floor(_secondsRemaining % 60);

            self.setState({
                secondsRemaining: _secondsRemaining,
                days: _days,
                hours: _hours,
                minutes: _minutes,
                secs: _secs
            });
            if (self.state.secondsRemaining <= 0) {
                clearInterval(self.timerID);
            }
        } catch (e) {}
    }

    render() {
        return _jsx('div', {
            style: { backgroundColor: this.props.bgcolor },
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.root
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.container
        }, void 0, _jsx('row', {}, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.container
        }, void 0, _jsx('h2', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.title
        }, void 0, this.props.title)), _jsx(__WEBPACK_IMPORTED_MODULE_2_material_ui_Card__["Card"], {
            style: { width: 400, margin: 10 }
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2_material_ui_Card__["CardText"], {}, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.container
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.col_xs_3
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerTitle
        }, void 0, this.state.days), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerDesc
        }, void 0, 'days')), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.col_xs_3
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerTitle
        }, void 0, this.state.hours), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerDesc
        }, void 0, 'hours')), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.col_xs_3
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerTitle
        }, void 0, this.state.minutes), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerDesc
        }, void 0, 'mins')), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.col_xs_3
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerTitle
        }, void 0, this.state.secs), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a.bannerDesc
        }, void 0, 'secs'))))))));
    }
}

/* unused harmony default export */ var _unused_webpack_default_export = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Countdown_css___default.a)(Countdown);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_css__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Footer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sn_slack_svg__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sn_slack_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__sn_slack_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sn_twitter_svg__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sn_twitter_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__sn_twitter_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sn_facebook_svg__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sn_facebook_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__sn_facebook_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sn_medium_svg__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sn_medium_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__sn_medium_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sn_reddit_svg__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sn_reddit_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__sn_reddit_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sn_bitcoin_svg__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sn_bitcoin_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__sn_bitcoin_svg__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */













var _ref = _jsx('p', {}, void 0, '\xA9 2017 Blockpass. All rights reserved');

function Footer(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.container
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.center_sm, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.brand,
    href: 'https://blockpass.slack.com/'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.icon,
    src: __WEBPACK_IMPORTED_MODULE_4__sn_slack_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_4__sn_slack_svg___default.a} 2x`,
    alt: 'Slack'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.brand,
    href: 'https://twitter.com/BlockpassOrg'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.icon,
    src: __WEBPACK_IMPORTED_MODULE_5__sn_twitter_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_5__sn_twitter_svg___default.a} 2x`,
    alt: 'twitter'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.brand,
    href: 'https://www.facebook.com/BlockpassOrg-120936415138920/'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.icon,
    src: __WEBPACK_IMPORTED_MODULE_6__sn_facebook_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_6__sn_facebook_svg___default.a} 2x`,
    alt: 'Facebook'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.brand,
    href: 'https://medium.com/@blockpass'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.icon,
    src: __WEBPACK_IMPORTED_MODULE_7__sn_medium_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_7__sn_medium_svg___default.a} 2x`,
    alt: 'Medium'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8)
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.iconDisabled,
    src: __WEBPACK_IMPORTED_MODULE_8__sn_reddit_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_8__sn_reddit_svg___default.a} 2x`,
    alt: 'Coming soon'
  })), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8)
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.iconDisabled,
    src: __WEBPACK_IMPORTED_MODULE_9__sn_bitcoin_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_9__sn_bitcoin_svg___default.a} 2x`,
    alt: 'Coming soon'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.col_xs_8
  }, void 0, _ref))));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a)(Footer);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Header_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blockpass_logo_png__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blockpass_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__blockpass_logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blockpass_logo_2x_png__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blockpass_logo_2x_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__blockpass_logo_2x_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_sticky__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_sticky___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_sticky__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





//import AppBar from 'material-ui/AppBar';




function Header(props) {
  return _jsx(__WEBPACK_IMPORTED_MODULE_6_react_sticky__["Sticky"], {}, void 0, ({ style }) => {
    return _jsx('div', {
      style: style
    }, void 0, _jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.menu
    }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
      className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.brand,
      to: '/'
    }, void 0, _jsx('img', {
      className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.logo,
      src: __WEBPACK_IMPORTED_MODULE_4__blockpass_logo_png___default.a,
      srcSet: `${__WEBPACK_IMPORTED_MODULE_5__blockpass_logo_2x_png___default.a} 2x`,
      alt: 'BlockPass'
    }))));
  });
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Header_css___default.a)(Header);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




var _ref = _jsx('meta', {
  charSet: 'utf-8'
});

var _ref2 = _jsx('meta', {
  httpEquiv: 'x-ua-compatible',
  content: 'ie=edge'
});

var _ref3 = _jsx('meta', {
  name: 'viewport',
  content: 'width=device-width, initial-scale=1'
});

var _ref4 = _jsx('link', {
  rel: 'apple-touch-icon',
  href: 'apple-touch-icon.png'
});

var _ref5 = _jsx('link', {
  rel: 'stylesheet',
  href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
});

var _ref6 = _jsx('script', {
  src: 'https://www.google-analytics.com/analytics.js',
  async: true,
  defer: true
});

function Html(props) {
  const { title, description, styles, scripts, children } = props;
  return _jsx('html', {
    className: 'no-js',
    lang: 'en'
  }, void 0, _jsx('head', {}, void 0, _ref, _ref2, _jsx('title', {}, void 0, title), _jsx('meta', {
    name: 'description',
    content: description
  }), _ref3, _ref4, styles.map(style => _jsx('style', {
    id: style.id,
    dangerouslySetInnerHTML: { __html: style.cssText }
  }, style.id)), _ref5), _jsx('body', {}, void 0, _jsx('div', {
    id: 'app',
    dangerouslySetInnerHTML: { __html: children }
  }), scripts.map(script => _jsx('script', {
    src: script
  }, script)), __WEBPACK_IMPORTED_MODULE_1__config__["d" /* analytics */].google.trackingId && _jsx('script', {
    dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${__WEBPACK_IMPORTED_MODULE_1__config__["d" /* analytics */].google.trackingId}','auto');ga('send','pageview')` }
  }), __WEBPACK_IMPORTED_MODULE_1__config__["d" /* analytics */].google.trackingId && _ref6));
}

Html.defaultProps = {
  styles: [],
  scripts: []
};


/* harmony default export */ __webpack_exports__["a"] = Html;

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_history__ = __webpack_require__(28);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleClick = event => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__core_history__["a" /* default */].push(this.props.to);
    }, _temp;
  }

  render() {
    const _props = this.props,
          { to, children } = _props,
          props = _objectWithoutProperties(_props, ['to', 'children']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      _extends({ href: to }, props, { onClick: this.handleClick }),
      children
    );
  }
}

Link.defaultProps = {
  onClick: null
};
/* harmony default export */ __webpack_exports__["a"] = Link;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Break_css__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Break_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Break_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();





function Break(props) {
  return _jsx('div', {
    style: { backgroundColor: props.bgcolor },
    className: __WEBPACK_IMPORTED_MODULE_2__Break_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Break_css___default.a.container
  }, void 0, _jsx('h1', {
    style: { color: props.textcolor },
    className: __WEBPACK_IMPORTED_MODULE_2__Break_css___default.a.title
  }, void 0, props.title)));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Break_css___default.a)(Break);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Info_css__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Info_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Info_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_fontawesome__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logos_IBL_svg__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logos_IBL_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__logos_IBL_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logos_cot_png__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logos_cot_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__logos_cot_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__logos_coinfirm_png__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__logos_coinfirm_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__logos_coinfirm_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__logos_quanta_png__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__logos_quanta_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__logos_quanta_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__logos_lykke_jpg__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__logos_lykke_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__logos_lykke_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__logos_diacle_png__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__logos_diacle_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__logos_diacle_png__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();














var _ref = _jsx('p', {}, void 0, 'Blockpass is a safe passport for a connected world');

var _ref2 = _jsx('p', {}, void 0, 'Everything will be connected on blockchain.');

var _ref3 = _jsx('p', {}, void 0, 'Individuals, companies, devices and objects.');

var _ref4 = _jsx('p', {}, void 0, 'But we need a way to verify statements made by persons or things.');

var _ref5 = _jsx('p', {}, void 0, 'Blockpass is an on-chain device and human verification oracle.');

var _ref6 = _jsx('p', {}, void 0, 'We are the onchain Oracle for Know Your Client (KYC) and Know Your Device (KYD).');

var _ref7 = _jsx('p', {}, void 0, 'Ask Blockpass if an address has been verified and it will always give an answer.');

var _ref8 = _jsx('p', {}, void 0, 'Customers that want to do KYC download the Blockpass app and do KYC. They are then verified and can access any provider that accepts Blockpass.');

var _ref9 = _jsx('p', {}, void 0, 'For devices we provide a KYD service. If you are manufacturing objects you can register them for the first time on Blockpass. If you want to re-sell an object you can add them to Blockpass and we will verify the object.');

var _ref10 = _jsx('p', {}, void 0, 'Chain of Things');

var _ref11 = _jsx('p', {}, void 0, 'CoT is the founder and has built Blockpass to enable security for the Internet of Things. ');

var _ref12 = _jsx('p', {}, void 0, 'Infinity Blockchain Labs');

var _ref13 = _jsx('p', {}, void 0, 'IBL is the founder. Infinity Blockchain Labs is a visionary R&D company engaged in intermediary and RegTech services employing blockchain technology that focuses on forming alliances with established businesses and regulatory institutions across various industries, as well as providing collaborative incubation for early stage blockchain projects.');

var _ref14 = _jsx('p', {}, void 0, 'Quanta');

var _ref15 = _jsx('p', {}, void 0, 'Quanta is the first to-be regulated Ethereum gambling system. It will integrate Blockpass for its client base');

var _ref16 = _jsx('p', {}, void 0, 'Diacle');

var _ref17 = _jsx('p', {}, void 0, 'Blockchain compliance services for compliant ICOs. All tokens to be issued on Blockpass');

var _ref18 = _jsx('p', {}, void 0, 'Blockpass is a platform. Who said you can\'t innovate with blockchain without compliance. Regtech will enable the next wave of fintech and the safe development of IOT.');

var _ref19 = _jsx('p', {}, void 0, 'Join the Blockpass regtech revolution today.');

var _ref20 = _jsx('p', {}, void 0, 'Blockpass is the missing piece for blockchain to hit the mainstream.');

var _ref21 = _jsx('p', {}, void 0, 'Reduce the costs of compliance for blockchain service providers');

var _ref22 = _jsx('p', {}, void 0, 'Give a safe future for internet of things');

var _ref23 = _jsx('p', {}, void 0, 'Make KYC more convenient for everyone');

var _ref24 = _jsx('p', {}, void 0, 'Let humans, objects and devices interact seamlessly in the Internet of Everything');

var _ref25 = _jsx('p', {}, void 0, 'Make it Blockpass enabled. Only allow purchases from Blockpass users and transfers to and from Blockpass users.');

var _ref26 = _jsx('p', {});

var _ref27 = _jsx('p', {});

var _ref28 = _jsx('p', {});

var _ref29 = _jsx('p', {});

var _ref30 = _jsx('p', {});

var _ref31 = _jsx('p', {});

function Info(props) {
  return _jsx('div', {
    style: { backgroundColor: props.bgcolor },
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.section
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('h1', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.title
  }, void 0, 'What is Blockpass?'))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_md, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.icon,
    name: 'id-card-o',
    size: '4x'
  }), _ref), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.icon,
    name: 'link',
    size: '4x'
  }), _ref2), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.icon,
    name: 'globe',
    size: '4x'
  }), _ref3), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.icon,
    name: 'balance-scale',
    size: '4x'
  }), _ref4)), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('p', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.subtitle
  }, void 0, 'This is the role of Blockpass.'))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_md)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref5), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref6), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref7))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.section
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('h1', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.title
  }, void 0, 'How does it work?'), _ref8, _ref9))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.section
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('h1', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.title
  }, void 0, 'Our Partners'))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_sm, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_sm_3, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.brand,
    href: 'https://www.chainofthings.com/'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.logo,
    src: __WEBPACK_IMPORTED_MODULE_6__logos_cot_png___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_6__logos_cot_png___default.a} 2x`,
    alt: 'Chain of Things'
  })), _ref10, _ref11), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_sm_3, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.brand,
    href: 'http://www.blockchainlabs.asia/'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.logo,
    src: __WEBPACK_IMPORTED_MODULE_5__logos_IBL_svg___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_5__logos_IBL_svg___default.a} 2x`,
    alt: 'Infinity Blockchain Labs'
  })), _ref12, _ref13)), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_sm, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.brand,
    href: 'http://www.quanta.im/'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.logoSmall,
    src: __WEBPACK_IMPORTED_MODULE_8__logos_quanta_png___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_8__logos_quanta_png___default.a} 2x`,
    alt: 'Quanta'
  })), _ref14, _ref15), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_sm_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _jsx('a', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.brand,
    href: 'https://www.site.diacle.com/'
  }, void 0, _jsx('img', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.logoSmall,
    src: __WEBPACK_IMPORTED_MODULE_10__logos_diacle_png___default.a,
    srcSet: `${__WEBPACK_IMPORTED_MODULE_10__logos_diacle_png___default.a} 2x`,
    alt: 'Diacle'
  })), _ref16, _ref17))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.section
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('h1', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.title
  }, void 0, 'Blockpass revolution'), _ref18, _ref19, _ref20, _jsx('p', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.subtitle
  }, void 0, 'Let\'s:'))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_md, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref21), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref22), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref23), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_md_2, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8)
  }, void 0, _ref24)), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('p', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.subtitle
  }, void 0, 'Want to do a safe ICO?'), _ref25))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.section
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.col_xs_8
  }, void 0, _jsx('h1', {
    className: __WEBPACK_IMPORTED_MODULE_2__Info_css___default.a.title
  }), _ref26, _ref27, _ref28, _ref29, _ref30, _ref31))));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Info_css___default.a)(Info);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Intro_css__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Intro_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Intro_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Countdown__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







var _ref = _jsx('br', {});

function Intro(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.row, __WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.center_xs)
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.col_xs_8
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.titleContainer
  }, void 0, _jsx('h1', {
    className: __WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.title
  }, void 0, 'Passport for a connected world'), _jsx('p', {
    className: __WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a.content
  }, void 0, 'A Blockchain Identity Protocol for Internet of Everything', _ref, 'humans, objects & devices')))));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Intro_css___default.a)(Intro);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_Paper__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_Paper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_material_ui_Paper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Team_css__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Team_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Team_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






function Team(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.container
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.col_xs_4
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2_material_ui_Paper___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.avatar,
    zDepth: 1,
    circle: true,
    style: { overflow: 'hidden' }
  }, void 0, _jsx('img', {
    style: { width: '100%', height: 'auto' },
    src: 'http://vignette2.wikia.nocookie.net/main-cast/images/5/5b/Sorry-image-not-available.png/revision/latest?cb=20160625173435'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.col_xs_4
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2_material_ui_Paper___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.avatar,
    zDepth: 1,
    circle: true,
    style: { overflow: 'hidden' }
  }, void 0, _jsx('img', {
    style: { width: '100%', height: 'auto' },
    src: 'http://vignette2.wikia.nocookie.net/main-cast/images/5/5b/Sorry-image-not-available.png/revision/latest?cb=20160625173435'
  }))), _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.col_xs_4
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2_material_ui_Paper___default.a, {
    className: __WEBPACK_IMPORTED_MODULE_3__Team_css___default.a.avatar,
    zDepth: 1,
    circle: true,
    style: { overflow: 'hidden' }
  }, void 0, _jsx('img', {
    style: { width: '100%', height: 'auto' },
    src: 'http://vignette2.wikia.nocookie.net/main-cast/images/5/5b/Sorry-image-not-available.png/revision/latest?cb=20160625173435'
  })))));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Team_css___default.a)(Team);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Video_css__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Video_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Video_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();





function Video(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Video_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__Video_css___default.a.container
  }, void 0, _jsx('row', {}, void 0, _jsx('iframe', {
    className: __WEBPACK_IMPORTED_MODULE_2__Video_css___default.a.videoContainer,
    src: props.url,
    frameBorder: '0',
    allowFullScreen: true
  }))));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Video_css___default.a)(Video);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
/* harmony default export */ __webpack_exports__["a"] = false && __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()();

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_facebook__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */






/**
 * Sign in with Facebook.
 */
__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_facebook__["Strategy"]({
  clientID: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* auth */].facebook.id,
  clientSecret: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* auth */].facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  const fooBar = (() => {
    var _ref = _asyncToGenerator(function* () {
      if (req.user) {
        const userLogin = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */].findOne({
          attributes: ['name', 'key'],
          where: { name: loginName, key: profile.id }
        });
        if (userLogin) {
          // There is already a Facebook account that belongs to you.
          // Sign in with that account or delete it, then link it with your current account.
          done();
        } else {
          const user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
            id: req.user.id,
            email: profile._json.email,
            logins: [{ name: loginName, key: profile.id }],
            claims: [{ type: claimType, value: profile.id }],
            profile: {
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
          }, {
            include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
          });
          done(null, {
            id: user.id,
            email: user.email
          });
        }
      } else {
        const users = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findAll({
          attributes: ['id', 'email'],
          where: { '$logins.name$': loginName, '$logins.key$': profile.id },
          include: [{
            attributes: ['name', 'key'],
            model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */],
            as: 'logins',
            required: true
          }]
        });
        if (users.length) {
          done(null, users[0]);
        } else {
          let user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findOne({ where: { email: profile._json.email } });
          if (user) {
            // There is already an account using this email address. Sign in to
            // that account and link it with Facebook manually from Account Settings.
            done(null);
          } else {
            user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
              email: profile._json.email,
              emailConfirmed: true,
              logins: [{ name: loginName, key: profile.id }],
              claims: [{ type: claimType, value: accessToken }],
              profile: {
                displayName: profile.displayName,
                gender: profile._json.gender,
                picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
              }
            }, {
              include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
            });
            done(null, {
              id: user.id,
              email: user.email
            });
          }
        }
      }
    });

    return function fooBar() {
      return _ref.apply(this, arguments);
    };
  })();

  fooBar().catch(done);
}));

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_0_passport___default.a;

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(5);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const User = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('User', {

  id: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    defaultValue: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUIDV1,
    primaryKey: true
  },

  email: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255),
    validate: { isEmail: true }
  },

  emailConfirmed: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.BOOLEAN,
    defaultValue: false
  }

}, {

  indexes: [{ fields: ['email'] }]

});

/* harmony default export */ __webpack_exports__["a"] = User;

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(5);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserClaim = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserClaim', {

  type: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  },

  value: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  }

});

/* harmony default export */ __webpack_exports__["a"] = UserClaim;

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(5);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserLogin = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserLogin', {

  name: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50),
    primaryKey: true
  },

  key: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100),
    primaryKey: true
  }

});

/* harmony default export */ __webpack_exports__["a"] = UserLogin;

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(5);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserProfile = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserProfile', {

  userId: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    primaryKey: true
  },

  displayName: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  picture: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  },

  gender: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50)
  },

  location: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  website: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  }

});

/* harmony default export */ __webpack_exports__["a"] = UserProfile;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_UserType__ = __webpack_require__(38);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const me = {
  type: __WEBPACK_IMPORTED_MODULE_0__types_UserType__["a" /* default */],
  resolve({ request }) {
    return request.user && {
      id: request.user.id,
      email: request.user.email
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = me;

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__ = __webpack_require__(37);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// React.js News Feed (RSS)
const url = 'https://api.rss2json.com/v1/api.json' + '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const news = {
  type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__["a" /* default */]),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
        lastFetchTime = new Date();
        lastFetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core_fetch__["a" /* default */])(url).then(response => response.json()).then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          return items;
        }).finally(() => {
          lastFetchTask = null;
        });

        if (items.length) {
          return items;
        }

        return lastFetchTask;
      }

    return items;
  }
};

/* harmony default export */ __webpack_exports__["a"] = news;

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queries_me__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_news__ = __webpack_require__(35);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






const schema = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLSchema"]({
  query: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
    name: 'Query',
    fields: {
      me: __WEBPACK_IMPORTED_MODULE_1__queries_me__["a" /* default */],
      news: __WEBPACK_IMPORTED_MODULE_2__queries_news__["a" /* default */]
    }
  })
});

/* harmony default export */ __webpack_exports__["a"] = schema;

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const NewsItemType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'NewsItem',
  fields: {
    title: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    link: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    author: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    pubDate: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    content: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = NewsItemType;

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const UserType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'User',
  fields: {
    id: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLID"]) },
    email: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = UserType;

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_test_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_pre_ico_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_default_js__ = __webpack_require__(40);






var curTime = new Date().getTime();

// Mon, 01 June 2017 00:00:00 GMT
var TIME_TEST_UTC = 1496275200000;
// Thu, 01 Jun 2017 00:00:00 GMT
var TIME_PRE_ICO = 1496275200000;
// Sat, 01 Jul 2017 00:00:00 GMT
var TIME_ICO = 1498867200000;
// Tue, 01 Aug 2017 00:00:00 GMT
var TIME_AFTER_ICO = 1501545600000;

var curConfig;
if (curTime <= TIME_TEST_UTC) curConfig = __WEBPACK_IMPORTED_MODULE_0__config_test_js__["a" /* default */];else if (curTime <= TIME_PRE_ICO) curConfig = __WEBPACK_IMPORTED_MODULE_0__config_test_js__["a" /* default */];else if (curTime <= TIME_PRE_ICO) curConfig = __WEBPACK_IMPORTED_MODULE_0__config_test_js__["a" /* default */];else if (curTime <= TIME_ICO) curConfig = __WEBPACK_IMPORTED_MODULE_0__config_test_js__["a" /* default */];else curConfig = __WEBPACK_IMPORTED_MODULE_2__config_default_js__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = curConfig;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    header: [],
    footer: [],
    sections: [{
        name: 'Video',
        props: {
            url: "https://www.youtube.com/embed/iL3OERBOk74"
        }
    }, {
        name: 'Break',
        props: {
            title: "Intro with count down",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Crowdsale progress",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Percentage raised",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Crowdsale FAQ",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Social",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Why build this",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Intro with video",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Comparison",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Another video",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Video',
        props: {
            url: "https://www.youtube.com/embed/iL3OERBOk74"
        }
    }, {
        name: 'Break',
        props: {
            title: "Chart",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Features",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Whitepaper",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Another video",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Video',
        props: {
            url: "https://www.youtube.com/embed/iL3OERBOk74"
        }
    }, {
        name: 'Break',
        props: {
            title: "Timeline",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Team",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Subscribe",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }, {
        name: 'Break',
        props: {
            title: "Signup",
            bgcolor: "#fffff",
            textcolor: "#666666"
        }
    }, {
        name: 'Break',
        props: {
            title: "Sponsor",
            bgcolor: "#eeeeee",
            textcolor: "#333333"
        }
    }]
};

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    header: [],
    footer: [],
    sections: [{
        name: 'Info',
        props: {
            title: "What is Blockpass",
            bgcolor: "rgba(255,255,255,1)",
            textcolor: "#5CC1B6"
        }
    }]
};

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorPage_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ErrorPage_css__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorPage; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var _ref = _jsx('div', {}, void 0, _jsx('h1', {}, void 0, 'Error'), _jsx('p', {}, void 0, 'Sorry, a critical error occurred on this page.'));

function ErrorPage(props) {
  if (false) {
    const { error } = props;
    return _jsx('div', {}, void 0, _jsx('h1', {}, void 0, error.name), _jsx('p', {}, void 0, error.message), _jsx('pre', {}, void 0, error.stack));
  }

  return _ref;
}


/* unused harmony default export */ var _unused_webpack_default_export = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__ErrorPage_css___default.a)(ErrorPage);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Home_css__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Home_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Section_Break__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Section_Info__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Section_Team__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Section_Video__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Section_Intro__ = __webpack_require__(25);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */











function Home(props) {
  // mapping from string key to real Component class
  var sectionsMap = {
    'Break': __WEBPACK_IMPORTED_MODULE_4__components_Section_Break__["a" /* default */],
    'Video': __WEBPACK_IMPORTED_MODULE_7__components_Section_Video__["a" /* default */],
    'Team': __WEBPACK_IMPORTED_MODULE_6__components_Section_Team__["a" /* default */],
    'Info': __WEBPACK_IMPORTED_MODULE_5__components_Section_Info__["a" /* default */],
    'Intro': __WEBPACK_IMPORTED_MODULE_8__components_Section_Intro__["a" /* default */]
  };

  // section list object
  var sectionList = [];
  // sectionList.push(React.createElement(Countdown, {key:9999, dueDate: 1492387200000, title: 'Count down to ICO start'}));
  // sectionList.push(React.createElement(Countdown, {key:10000, dueDate: 1493596800000, title: 'Count down to ICO end'}));
  sectionList.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_Section_Intro__["a" /* default */], { key: 10000 }));
  __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].sections.forEach((elem, idx) => {
    if (sectionsMap[elem.name] != undefined) {
      elem.props['key'] = idx;
      sectionList.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(sectionsMap[elem.name], elem.props));
    }
  });

  // render function
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_2__Home_css___default.a.root }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_2__Home_css___default.a.container }), sectionList);
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Home_css___default.a)(Home);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Layout__ = __webpack_require__(10);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






/* harmony default export */ __webpack_exports__["default"] = {

  path: '/',

  action() {
    return _asyncToGenerator(function* () {
      const resp = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core_fetch__["a" /* default */])('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: '{news{title,link,content}}'
        }),
        credentials: 'include'
      });
      const { data } = yield resp.json();
      if (!data || !data.news) throw new Error('Failed to load the news feed.');
      return {
        title: 'Blockpass',
        component: _jsx(__WEBPACK_IMPORTED_MODULE_3__components_Layout__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Home__["a" /* default */], {
          news: data.news
        }))
      };
    })();
  }

};

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
/* harmony default export */ __webpack_exports__["a"] = {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [__webpack_require__(44).default,
  // require('./contact').default,
  // require('./login').default,
  // require('./register').default,
  // require('./about').default,
  // require('./privacy').default,
  // require('./admin').default,

  // Wildcard routes, e.g. { path: '*', ... } (must go last)
  __webpack_require__(47).default],

  action({ next }) {
    return _asyncToGenerator(function* () {
      // Execute each child route until one of them return the result
      const route = yield next();

      // Provide default values for title, description etc.
      route.title = `${route.title || 'Blockpass'}`;
      route.description = route.description || '';

      return route;
    })();
  }

};

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFound_css__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFound_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__NotFound_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var _ref = _jsx('p', {}, void 0, 'Sorry, the page you were trying to view does not exist.');

function NotFound(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__NotFound_css___default.a.root
  }, void 0, _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_2__NotFound_css___default.a.container
  }, void 0, _jsx('h1', {}, void 0, props.title), _ref));
}

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__NotFound_css___default.a)(NotFound);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFound__ = __webpack_require__(46);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Page Not Found';

var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2__NotFound__["a" /* default */], {
  title: title
}));

/* harmony default export */ __webpack_exports__["default"] = {

  path: '*',

  action() {
    return {
      title,
      component: _ref,
      status: 404
    };
  }

};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._10qDF{background-color:#e0e0e0}._3U65E{margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.cM-g-{color:#387ef5;font-size:30px}._1gYnw{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:16px;padding-right:1rem;padding-left:16px;padding-left:1rem;-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._1UeE-{color:#387ef5;padding:10px;font-weight:400;font-size:3em;line-height:1em}._1Q-lf,._1UeE-{margin:0;text-align:center}._1Q-lf{padding:0;color:#888;font-size:1.5em}", ""]);

// exports
exports.locals = {
	"root": "_10qDF",
	"container": "_3U65E",
	"title": "cM-g-",
	"col_xs_3": "_1gYnw",
	"bannerTitle": "_1UeE-",
	"bannerDesc": "_1Q-lf"
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._33YLV{margin-right:auto;margin-left:auto;padding-right:32px;padding-right:2rem;padding-left:32px;padding-left:2rem}._30o6_{box-sizing:border-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-ms-flex:0 1 auto;-webkit-box-flex:0;-webkit-flex:0 1 auto;flex:0 1 auto;-ms-flex-direction:row;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-right:-16px;margin-right:-1rem;margin-left:-16px;margin-left:-1rem}._30o6_,._30o6_._3RbbR{-webkit-box-orient:horizontal}._30o6_._3RbbR{-ms-flex-direction:row-reverse;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}._1EJ-x._3RbbR{-ms-flex-direction:column-reverse;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse}._1e6ez,._1EURx,._1sm17,._1sRxS,._1ZwXA,._3kjnm,.C6dR7,.FKu5Q,.MOV6I,.PYk_T,.UXU2r,.XCZIP,.Y_qLB{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:16px;padding-right:1rem;padding-left:16px;padding-left:1rem}._3T9vp{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}.XCZIP{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._3kjnm{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._1e6ez{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}.Y_qLB{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}.MOV6I{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}.PYk_T{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.UXU2r{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}.FKu5Q{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._1sm17{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._1sRxS{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._1EURx{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}.C6dR7{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._1k0Z4{margin-left:8.333%}._26x2b{margin-left:16.667%}._1ylmG{margin-left:25%}._3fi3f{margin-left:33.333%}._35zpn{margin-left:41.667%}._20kzb{margin-left:50%}.fSriu{margin-left:58.333%}.ZYq2D{margin-left:66.667%}._1hxv9{margin-left:75%}._3IRBQ{margin-left:83.333%}._1V7KY{margin-left:91.667%}.qGqBP{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._3ec9C{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}._110EB{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._270Ku{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._33fV1{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._3TCNq{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._1Dw0A{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._3yMG4{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._3npPP{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._1GAU_{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}@media only screen and (min-width:48em){._3dfAC{width:46rem}._1jaOV,._2eIyG,._2L1jz,._2mVMv,._2OQxW,._3-nKS,._3p_1C,._3w3ay,._3WcnQ,.giYr4,.J9C8-,.LsYEp,.QujDF{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}.J9C8-{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._3-nKS{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._2mVMv{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._3WcnQ{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._1jaOV{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._2L1jz{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._3w3ay{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.LsYEp{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}.QujDF{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._2eIyG{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._2OQxW{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._3p_1C{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}.giYr4{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}.pSjeX{margin-left:8.333%}._3MVY8{margin-left:16.667%}._1Xx4w{margin-left:25%}.I8I9u{margin-left:33.333%}._1XhvO{margin-left:41.667%}._24Za8{margin-left:50%}._2hiue{margin-left:58.333%}._1rW4f{margin-left:66.667%}._29gpE{margin-left:75%}._1a6yN{margin-left:83.333%}._30hWd{margin-left:91.667%}.mz5VG{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._2Rh-a{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}._1JJN8{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}.Vd8pW{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._6metd{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._2SgeK{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._1kl5g{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._7yQwv{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._298-B{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._2OBKF{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}@media only screen and (min-width:62em){._3dfAC{width:61rem}._1beKo,._1TpY5,._1ZafI,._2lI5Q,._2WJWD,._2zy4S,._3HGHM,._3Y-3N,._14pnc,._28O0S,._37iOr,._285fo,.ef8pe{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._285fo{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._37iOr{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._1TpY5{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._2lI5Q{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._2WJWD{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._28O0S{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._1ZafI{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.ef8pe{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._3HGHM{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._1beKo{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._2zy4S{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._14pnc{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._3Y-3N{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._3OrYB{margin-left:8.333%}._1E9xs{margin-left:16.667%}._14yHn{margin-left:25%}._3WEhS{margin-left:33.333%}.Qb_9t{margin-left:41.667%}._1IQB0{margin-left:50%}._1R5V4{margin-left:58.333%}.LuB9V{margin-left:66.667%}._3BEXC{margin-left:75%}._3nM4_{margin-left:83.333%}._2MEHl{margin-left:91.667%}._2jS04{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._1NsaV{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}._2OHfx{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._1doua{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._1-NV4{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._1HbUg{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._20MDD{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}.a7EId{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.Qxgcv{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}.cac4d{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}@media only screen and (min-width:75em){._3dfAC{width:71rem}._1lNEB,._1qS1H,._1XDx6,._1xZik,._1yqdn,._2LWed,._2QsCt,._2s9sL,._3Dzy6,._3MDGD,._3ofvi,._3yRIx,._9c-f0{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._1qS1H{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._3Dzy6{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._1lNEB{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._1xZik{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._3ofvi{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._2QsCt{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._3MDGD{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}._1yqdn{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._3yRIx{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._2s9sL{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._1XDx6{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._2LWed{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._9c-f0{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._2WB9d{margin-left:8.333%}._3YyxA{margin-left:16.667%}._1YHlb{margin-left:25%}._1-okV{margin-left:33.333%}.poLNT{margin-left:41.667%}._36fC-{margin-left:50%}._24dWf{margin-left:58.333%}._36NrM{margin-left:66.667%}.uvr4Z{margin-left:75%}._3_l08{margin-left:83.333%}._2WZRN{margin-left:91.667%}.RDBhy{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}.qsH4T{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}.mIqzN{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._1aeTR{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._2XJ-A{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._2jfFS{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.Coe9Q{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._27vBv{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._1PzyN{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}.VZ9iH{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}._1UUMy{background:#222;color:#fff}._3dfAC{margin:0 auto;padding:20px 15px;max-width:1000px;text-align:center}._3ReUN{color:hsla(0,0%,100%,.9)}._2kgOa{padding:15px}.bF0OS{opacity:.8}._38xOA,.bF0OS{-webkit-filter:invert();filter:invert();-o-object-fit:contain;object-fit:contain;width:34px;padding:20px}._38xOA{opacity:.4}._297xE{color:hsla(0,0%,100%,.3)}._3qHjF,._3ReUN{padding:2px 5px;font-size:1em}._2kgOa,._2kgOa:active,._2kgOa:visited{color:hsla(0,0%,100%,.9);text-decoration:none}._2kgOa:hover{color:#fff}", ""]);

// exports
exports.locals = {
	"container_fluid": "_33YLV",
	"row": "_30o6_",
	"reverse": "_3RbbR",
	"col": "_1EJ-x",
	"col-xs": "_1ZwXA",
	"col_xs_1": "XCZIP",
	"col_xs_2": "_3kjnm",
	"col_xs_3": "_1e6ez",
	"col_xs_4": "Y_qLB",
	"col_xs_5": "MOV6I",
	"col_xs_6": "PYk_T",
	"col_xs_7": "UXU2r",
	"col_xs_8": "FKu5Q",
	"col_xs_9": "_1sm17",
	"col_xs_10": "_1sRxS",
	"col_xs_11": "_1EURx",
	"col_xs_12": "C6dR7",
	"col_xs": "_3T9vp",
	"col_xs_offset_1": "_1k0Z4",
	"col_xs_offset_2": "_26x2b",
	"col_xs_offset_3": "_1ylmG",
	"col_xs_offset_4": "_3fi3f",
	"col_xs_offset_5": "_35zpn",
	"col_xs_offset_6": "_20kzb",
	"col_xs_offset_7": "fSriu",
	"col_xs_offset_8": "ZYq2D",
	"col_xs_offset_9": "_1hxv9",
	"col_xs_offset_10": "_3IRBQ",
	"col_xs_offset_11": "_1V7KY",
	"start_xs": "qGqBP",
	"center_xs": "_3ec9C",
	"end_xs": "_110EB",
	"top_xs": "_270Ku",
	"middle_xs": "_33fV1",
	"bottom_xs": "_3TCNq",
	"around_xs": "_1Dw0A",
	"between_xs": "_3yMG4",
	"first_xs": "_3npPP",
	"last_xs": "_1GAU_",
	"container": "_3dfAC",
	"col_sm": "J9C8-",
	"col_sm_1": "_3-nKS",
	"col_sm_2": "_2mVMv",
	"col_sm_3": "_3WcnQ",
	"col_sm_4": "_1jaOV",
	"col_sm_5": "_2L1jz",
	"col_sm_6": "_3w3ay",
	"col_sm_7": "LsYEp",
	"col_sm_8": "QujDF",
	"col_sm_9": "_2eIyG",
	"col_sm_10": "_2OQxW",
	"col_sm_11": "_3p_1C",
	"col_sm_12": "giYr4",
	"col_sm_offset_1": "pSjeX",
	"col_sm_offset_2": "_3MVY8",
	"col_sm_offset_3": "_1Xx4w",
	"col_sm_offset_4": "I8I9u",
	"col_sm_offset_5": "_1XhvO",
	"col_sm_offset_6": "_24Za8",
	"col_sm_offset_7": "_2hiue",
	"col_sm_offset_8": "_1rW4f",
	"col_sm_offset_9": "_29gpE",
	"col_sm_offset_10": "_1a6yN",
	"col_sm_offset_11": "_30hWd",
	"start_sm": "mz5VG",
	"center_sm": "_2Rh-a",
	"end_sm": "_1JJN8",
	"top_sm": "Vd8pW",
	"middle_sm": "_6metd",
	"bottom_sm": "_2SgeK",
	"around_sm": "_1kl5g",
	"between_sm": "_7yQwv",
	"first_sm": "_298-B",
	"last_sm": "_2OBKF",
	"col_md": "_285fo",
	"col_md_1": "_37iOr",
	"col_md_2": "_1TpY5",
	"col_md_3": "_2lI5Q",
	"col_md_4": "_2WJWD",
	"col_md_5": "_28O0S",
	"col_md_6": "_1ZafI",
	"col_md_7": "ef8pe",
	"col_md_8": "_3HGHM",
	"col_md_9": "_1beKo",
	"col_md_10": "_2zy4S",
	"col_md_11": "_14pnc",
	"col_md_12": "_3Y-3N",
	"col_md_offset_1": "_3OrYB",
	"col_md_offset_2": "_1E9xs",
	"col_md_offset_3": "_14yHn",
	"col_md_offset_4": "_3WEhS",
	"col_md_offset_5": "Qb_9t",
	"col_md_offset_6": "_1IQB0",
	"col_md_offset_7": "_1R5V4",
	"col_md_offset_8": "LuB9V",
	"col_md_offset_9": "_3BEXC",
	"col_md_offset_10": "_3nM4_",
	"col_md_offset_11": "_2MEHl",
	"start_md": "_2jS04",
	"center_md": "_1NsaV",
	"end_md": "_2OHfx",
	"top_md": "_1doua",
	"middle_md": "_1-NV4",
	"bottom_md": "_1HbUg",
	"around_md": "_20MDD",
	"between_md": "a7EId",
	"first_md": "Qxgcv",
	"last_md": "cac4d",
	"col_lg": "_1qS1H",
	"col_lg_1": "_3Dzy6",
	"col_lg_2": "_1lNEB",
	"col_lg_3": "_1xZik",
	"col_lg_4": "_3ofvi",
	"col_lg_5": "_2QsCt",
	"col_lg_6": "_3MDGD",
	"col_lg_7": "_1yqdn",
	"col_lg_8": "_3yRIx",
	"col_lg_9": "_2s9sL",
	"col_lg_10": "_1XDx6",
	"col_lg_11": "_2LWed",
	"col_lg_12": "_9c-f0",
	"col_lg_offset_1": "_2WB9d",
	"col_lg_offset_2": "_3YyxA",
	"col_lg_offset_3": "_1YHlb",
	"col_lg_offset_4": "_1-okV",
	"col_lg_offset_5": "poLNT",
	"col_lg_offset_6": "_36fC-",
	"col_lg_offset_7": "_24dWf",
	"col_lg_offset_8": "_36NrM",
	"col_lg_offset_9": "uvr4Z",
	"col_lg_offset_10": "_3_l08",
	"col_lg_offset_11": "_2WZRN",
	"start_lg": "RDBhy",
	"center_lg": "qsH4T",
	"end_lg": "mIqzN",
	"top_lg": "_1aeTR",
	"middle_lg": "_2XJ-A",
	"bottom_lg": "_2jfFS",
	"around_lg": "Coe9Q",
	"between_lg": "_27vBv",
	"first_lg": "_1PzyN",
	"last_lg": "VZ9iH",
	"root": "_1UUMy",
	"text": "_3ReUN",
	"brand": "_2kgOa",
	"icon": "bF0OS",
	"iconDisabled": "_38xOA",
	"spacer": "_297xE",
	"link": "_3qHjF"
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3aTVY{background-color:#387ef5;height:60px;text-align:center}._2jKwz{margin:auto;height:46px;margin-top:8px}", ""]);

// exports
exports.locals = {
	"menu": "_3aTVY",
	"logo": "_2jKwz"
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}[hidden],template{display:none}html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}a{color:#0074c2}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2xpFp{background-color:#e0e0e0}._1OxsA{margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}._2RARx{color:#333}", ""]);

// exports
exports.locals = {
	"root": "_2xpFp",
	"container": "_1OxsA",
	"title": "_2RARx"
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3QYS6{margin-right:auto;margin-left:auto;padding-right:32px;padding-right:2rem;padding-left:32px;padding-left:2rem}._3Kbpn{box-sizing:border-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-ms-flex:0 1 auto;-webkit-box-flex:0;-webkit-flex:0 1 auto;flex:0 1 auto;-ms-flex-direction:row;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-right:-16px;margin-right:-1rem;margin-left:-16px;margin-left:-1rem}._3Kbpn,._3Kbpn._33-MS{-webkit-box-orient:horizontal}._3Kbpn._33-MS{-ms-flex-direction:row-reverse;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}._28U0a._33-MS{-ms-flex-direction:column-reverse;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse}._1dmqy,._1PKbE,._2FNq3,._2Klrb,._2SHMt,._3_Pxr,._3l1yA,._11VR-,._19zjY,._207nf,.cL6lI,.fD31k,.QyhBY{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:16px;padding-right:1rem;padding-left:16px;padding-left:1rem}._3ZR-D{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._3_Pxr{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._1dmqy{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._207nf{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._19zjY{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._1PKbE{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._2SHMt{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.cL6lI{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._2Klrb{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._2FNq3{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}.fD31k{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._3l1yA{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._11VR-{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._14Im-{margin-left:8.333%}._2zmIC{margin-left:16.667%}._72X_{margin-left:25%}._3_TZM{margin-left:33.333%}._3cPtH{margin-left:41.667%}._2I9XN{margin-left:50%}._1cUqg{margin-left:58.333%}._1cG11{margin-left:66.667%}._2uAuq{margin-left:75%}._2BoCj{margin-left:83.333%}._3O-ds{margin-left:91.667%}._1qzsV{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._3rMVb{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}.uBT_H{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._3TrAO{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._2_pfr{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._3qKP0{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.MHwMb{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._1rnKn{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.h7NCN{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}.RMG3A{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}@media only screen and (min-width:48em){._2g6RG{width:46rem}._1QkfQ,._1tso8,._1WP-k,._2_t7_,._2ENQ9,._2iKZi,._3AM7-,._3L_zI,._11Tyr,._14eL2,._38gWY,._61K5,.tVatS{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._1QkfQ{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._3AM7-{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._38gWY{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}.tVatS{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._1tso8{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._1WP-k{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._2ENQ9{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}._3L_zI{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._2iKZi{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._11Tyr{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._61K5{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._2_t7_{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._14eL2{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._32UzZ{margin-left:8.333%}._1Uhwi{margin-left:16.667%}._2yBzk{margin-left:25%}.Qg1S0{margin-left:33.333%}.-GjQZ{margin-left:41.667%}._1f08z{margin-left:50%}._2cYb2{margin-left:58.333%}._3vWPD{margin-left:66.667%}._3Ox4P{margin-left:75%}._2pgf6{margin-left:83.333%}.MAHjW{margin-left:91.667%}._3Vxio{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._1UWfb{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}.cROvx{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._3dVvj{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._3msUX{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._33qF5{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._2OgMa{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}.crnzv{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._3YYgC{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}.EB30w{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}@media only screen and (min-width:62em){._2g6RG{width:61rem}._1ffyI,._1Grzk,._2mK8U,._2pXzd,._2sfCp,._3nSKY,._3WE1j,._13GiB,.cwafT,.e856g,.f_CD0,.nPtlh,.wgj5x{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._3WE1j{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._13GiB{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._3nSKY{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._2pXzd{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._2mK8U{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}.f_CD0{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}.cwafT{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.nPtlh{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._2sfCp{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}.e856g{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._1Grzk{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._1ffyI{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}.wgj5x{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._2oUQw{margin-left:8.333%}._145JY{margin-left:16.667%}._1lGz3{margin-left:25%}.YpvKZ{margin-left:33.333%}._3nLJB{margin-left:41.667%}._39QiK{margin-left:50%}.G2pfA{margin-left:58.333%}._1LL3G{margin-left:66.667%}._2oJvz{margin-left:75%}._3X0pH{margin-left:83.333%}._1Zklg{margin-left:91.667%}._18Izr{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._35XWx{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}.IL_Ok{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._3N99f{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.sdjyc{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._2tVLF{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._2hLlS{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._1d3pO{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._2fBy8{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._1tlU9{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}@media only screen and (min-width:75em){._2g6RG{width:71rem}._1bXxZ,._1T559,._1zj_Z,._2FF6g,._2zMPM,._3-ban,._3gf36,._3rPAv,._19xxx,.JyynW,.mVqJ4,.o8-hr,.v2Rr0{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._1zj_Z{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._2zMPM{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._3rPAv{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._19xxx{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._3-ban{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}.JyynW{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._2FF6g{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.o8-hr{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}.v2Rr0{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._3gf36{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._1bXxZ{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}.mVqJ4{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._1T559{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._3H-qY{margin-left:8.333%}._3ZLxV{margin-left:16.667%}._30JPT{margin-left:25%}._1yBDH{margin-left:33.333%}._3XTN8{margin-left:41.667%}._129jn{margin-left:50%}._1AUgY{margin-left:58.333%}.HO63T{margin-left:66.667%}._1bPRB{margin-left:75%}.UU1rL{margin-left:83.333%}._3jci7{margin-left:91.667%}._3jG5c{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._3IIri{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}._28ttz{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._1Kx78{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._3gIAL{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.BTOK9{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._1hh9N{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._1v0YR{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.O1Qpd{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._3QIPV{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}._3Du6I{color:#387ef5;font-size:40px}._2dhit{color:#444;font-size:30px}._14I4F{color:#444;font-size:60px;font-weight:700;margin:0 0 -20px}._2R-Qe{padding:80px 0}._1H2kv{width:200px;font-size:50px;color:#387ef5;margin-top:30px}._21-eR{width:200px}._21-eR,.UNGtd{height:150px;-o-object-fit:contain;object-fit:contain}.UNGtd{width:150px}._2HiIu{text-align:left}", ""]);

// exports
exports.locals = {
	"container_fluid": "_3QYS6",
	"row": "_3Kbpn",
	"reverse": "_33-MS",
	"col": "_28U0a",
	"col-xs": "QyhBY",
	"col_xs_1": "_3_Pxr",
	"col_xs_2": "_1dmqy",
	"col_xs_3": "_207nf",
	"col_xs_4": "_19zjY",
	"col_xs_5": "_1PKbE",
	"col_xs_6": "_2SHMt",
	"col_xs_7": "cL6lI",
	"col_xs_8": "_2Klrb",
	"col_xs_9": "_2FNq3",
	"col_xs_10": "fD31k",
	"col_xs_11": "_3l1yA",
	"col_xs_12": "_11VR-",
	"col_xs": "_3ZR-D",
	"col_xs_offset_1": "_14Im-",
	"col_xs_offset_2": "_2zmIC",
	"col_xs_offset_3": "_72X_",
	"col_xs_offset_4": "_3_TZM",
	"col_xs_offset_5": "_3cPtH",
	"col_xs_offset_6": "_2I9XN",
	"col_xs_offset_7": "_1cUqg",
	"col_xs_offset_8": "_1cG11",
	"col_xs_offset_9": "_2uAuq",
	"col_xs_offset_10": "_2BoCj",
	"col_xs_offset_11": "_3O-ds",
	"start_xs": "_1qzsV",
	"center_xs": "_3rMVb",
	"end_xs": "uBT_H",
	"top_xs": "_3TrAO",
	"middle_xs": "_2_pfr",
	"bottom_xs": "_3qKP0",
	"around_xs": "MHwMb",
	"between_xs": "_1rnKn",
	"first_xs": "h7NCN",
	"last_xs": "RMG3A",
	"container": "_2g6RG",
	"col_sm": "_1QkfQ",
	"col_sm_1": "_3AM7-",
	"col_sm_2": "_38gWY",
	"col_sm_3": "tVatS",
	"col_sm_4": "_1tso8",
	"col_sm_5": "_1WP-k",
	"col_sm_6": "_2ENQ9",
	"col_sm_7": "_3L_zI",
	"col_sm_8": "_2iKZi",
	"col_sm_9": "_11Tyr",
	"col_sm_10": "_61K5",
	"col_sm_11": "_2_t7_",
	"col_sm_12": "_14eL2",
	"col_sm_offset_1": "_32UzZ",
	"col_sm_offset_2": "_1Uhwi",
	"col_sm_offset_3": "_2yBzk",
	"col_sm_offset_4": "Qg1S0",
	"col_sm_offset_5": "-GjQZ",
	"col_sm_offset_6": "_1f08z",
	"col_sm_offset_7": "_2cYb2",
	"col_sm_offset_8": "_3vWPD",
	"col_sm_offset_9": "_3Ox4P",
	"col_sm_offset_10": "_2pgf6",
	"col_sm_offset_11": "MAHjW",
	"start_sm": "_3Vxio",
	"center_sm": "_1UWfb",
	"end_sm": "cROvx",
	"top_sm": "_3dVvj",
	"middle_sm": "_3msUX",
	"bottom_sm": "_33qF5",
	"around_sm": "_2OgMa",
	"between_sm": "crnzv",
	"first_sm": "_3YYgC",
	"last_sm": "EB30w",
	"col_md": "_3WE1j",
	"col_md_1": "_13GiB",
	"col_md_2": "_3nSKY",
	"col_md_3": "_2pXzd",
	"col_md_4": "_2mK8U",
	"col_md_5": "f_CD0",
	"col_md_6": "cwafT",
	"col_md_7": "nPtlh",
	"col_md_8": "_2sfCp",
	"col_md_9": "e856g",
	"col_md_10": "_1Grzk",
	"col_md_11": "_1ffyI",
	"col_md_12": "wgj5x",
	"col_md_offset_1": "_2oUQw",
	"col_md_offset_2": "_145JY",
	"col_md_offset_3": "_1lGz3",
	"col_md_offset_4": "YpvKZ",
	"col_md_offset_5": "_3nLJB",
	"col_md_offset_6": "_39QiK",
	"col_md_offset_7": "G2pfA",
	"col_md_offset_8": "_1LL3G",
	"col_md_offset_9": "_2oJvz",
	"col_md_offset_10": "_3X0pH",
	"col_md_offset_11": "_1Zklg",
	"start_md": "_18Izr",
	"center_md": "_35XWx",
	"end_md": "IL_Ok",
	"top_md": "_3N99f",
	"middle_md": "sdjyc",
	"bottom_md": "_2tVLF",
	"around_md": "_2hLlS",
	"between_md": "_1d3pO",
	"first_md": "_2fBy8",
	"last_md": "_1tlU9",
	"col_lg": "_1zj_Z",
	"col_lg_1": "_2zMPM",
	"col_lg_2": "_3rPAv",
	"col_lg_3": "_19xxx",
	"col_lg_4": "_3-ban",
	"col_lg_5": "JyynW",
	"col_lg_6": "_2FF6g",
	"col_lg_7": "o8-hr",
	"col_lg_8": "v2Rr0",
	"col_lg_9": "_3gf36",
	"col_lg_10": "_1bXxZ",
	"col_lg_11": "mVqJ4",
	"col_lg_12": "_1T559",
	"col_lg_offset_1": "_3H-qY",
	"col_lg_offset_2": "_3ZLxV",
	"col_lg_offset_3": "_30JPT",
	"col_lg_offset_4": "_1yBDH",
	"col_lg_offset_5": "_3XTN8",
	"col_lg_offset_6": "_129jn",
	"col_lg_offset_7": "_1AUgY",
	"col_lg_offset_8": "HO63T",
	"col_lg_offset_9": "_1bPRB",
	"col_lg_offset_10": "UU1rL",
	"col_lg_offset_11": "_3jci7",
	"start_lg": "_3jG5c",
	"center_lg": "_3IIri",
	"end_lg": "_28ttz",
	"top_lg": "_1Kx78",
	"middle_lg": "_3gIAL",
	"bottom_lg": "BTOK9",
	"around_lg": "_1hh9N",
	"between_lg": "_1v0YR",
	"first_lg": "O1Qpd",
	"last_lg": "_3QIPV",
	"title": "_3Du6I",
	"subtitle": "_2dhit",
	"number": "_14I4F",
	"section": "_2R-Qe",
	"icon": "_1H2kv",
	"logo": "_21-eR",
	"logoSmall": "UNGtd",
	"alignLeft": "_2HiIu"
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1VsAA{margin-right:auto;margin-left:auto;padding-right:32px;padding-right:2rem;padding-left:32px;padding-left:2rem}._2Z6Zl{box-sizing:border-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-ms-flex:0 1 auto;-webkit-box-flex:0;-webkit-flex:0 1 auto;flex:0 1 auto;-ms-flex-direction:row;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-right:-16px;margin-right:-1rem;margin-left:-16px;margin-left:-1rem}._2Z6Zl,._2Z6Zl._1nhnl{-webkit-box-orient:horizontal}._2Z6Zl._1nhnl{-ms-flex-direction:row-reverse;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}._358A0._1nhnl{-ms-flex-direction:column-reverse;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse}._1as0e,._1B1i-,._1of4O,._1Qahl,._1V9eu,._2XSg-,._3ocog,._3s0WR,.HNJOL,.IftiM,.kzFkI,.OLupD,.SREOr{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:16px;padding-right:1rem;padding-left:16px;padding-left:1rem}._1x9Z5{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}.kzFkI{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._1V9eu{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._1Qahl{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._3s0WR{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._1B1i-{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._3ocog{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.SREOr{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._1as0e{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._1of4O{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._2XSg-{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}.OLupD{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}.HNJOL{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}.zWFRz{margin-left:8.333%}._20vSv{margin-left:16.667%}._3tMIg{margin-left:25%}._2jVwh{margin-left:33.333%}._34y18{margin-left:41.667%}._12XGl{margin-left:50%}.r3As-{margin-left:58.333%}._1K3lz{margin-left:66.667%}.NfbZe{margin-left:75%}.w9QoY{margin-left:83.333%}._2GZ1B{margin-left:91.667%}.FXOQ9{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._2O5h-{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}._1mTpZ{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}.zA3x-{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._1jpfq{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.pljgf{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._2iF_P{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}.sF2dJ{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._2XPGS{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._19acc{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}@media only screen and (min-width:48em){.YJjTS{width:46rem}._1GWdv,._2hTOT,._2Vzgb,._2x2pq,._3dJlZ,._3gkw2,._3kBhH,._3n1Gr,._9aYqf,._15CUn,._35r4B,.AxWST,.RlOWO{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._3n1Gr{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._3kBhH{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._35r4B{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._1GWdv{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}.RlOWO{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._9aYqf{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._2hTOT{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}.AxWST{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._3dJlZ{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._2Vzgb{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._15CUn{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._3gkw2{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._2x2pq{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}.HOo8m{margin-left:8.333%}._3xxHE{margin-left:16.667%}._159Kt{margin-left:25%}._2sAAy{margin-left:33.333%}.WL0cd{margin-left:41.667%}._14324{margin-left:50%}._1GmEr{margin-left:58.333%}._3l7DR{margin-left:66.667%}._3WcoG{margin-left:75%}._27mCy{margin-left:83.333%}._38v8t{margin-left:91.667%}.CWmeq{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._2uabp{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}._2G-Qg{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._1HVrl{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.HhgKr{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._1tvbL{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.wDPDg{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._1jt97{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.Uc2VS{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._37Ysl{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}@media only screen and (min-width:62em){.YJjTS{width:61rem}._1Nrk0,._1oPnv,._1UrLP,._2Djki,._2Mi1E,._2z17y,._3mI7Y,._3mohP,._11x3X,._24IM5,._27Xx1,._32zT5,.u1UHh{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._3mI7Y{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._32zT5{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._1oPnv{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}._1Nrk0{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._24IM5{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._27Xx1{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._3mohP{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}._2Djki{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._1UrLP{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}.u1UHh{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._2z17y{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._11x3X{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._2Mi1E{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._3j02b{margin-left:8.333%}.VbL61{margin-left:16.667%}.qc51W{margin-left:25%}.pbsy4{margin-left:33.333%}._1jRnG{margin-left:41.667%}._1-4fZ{margin-left:50%}._3ZL3h{margin-left:58.333%}._2NdTi{margin-left:66.667%}._3ORmZ{margin-left:75%}._38siq{margin-left:83.333%}.z3DYA{margin-left:91.667%}._2Rl1V{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._19MyR{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}.IOJWO{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}._2kG8L{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}._1oOrK{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}._3BEFr{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._1qMBK{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._1kef8{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.YQJXt{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._2Ekrk{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}@media only screen and (min-width:75em){.YJjTS{width:71rem}._1_dDV,._1AaaV,._1o2MM,._1PLjF,._2iBZh,._2mQ3z,._2nzzw,._2SCfE,._3AEAT,._3pkeo,._3rwZA,._16PTk,.LUaw5{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:1rem;padding-left:1rem}._16PTk{-webkit-flex-grow:1;-ms-flex-positive:1;-webkit-box-flex:1;flex-grow:1;-ms-flex-preferred-size:0;-webkit-flex-basis:0;flex-basis:0;max-width:100%}._3pkeo{-ms-flex-preferred-size:8.333%;-webkit-flex-basis:8.333%;flex-basis:8.333%;max-width:8.333%}._3rwZA{-ms-flex-preferred-size:16.667%;-webkit-flex-basis:16.667%;flex-basis:16.667%;max-width:16.667%}.LUaw5{-ms-flex-preferred-size:25%;-webkit-flex-basis:25%;flex-basis:25%;max-width:25%}._1o2MM{-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}._2iBZh{-ms-flex-preferred-size:41.667%;-webkit-flex-basis:41.667%;flex-basis:41.667%;max-width:41.667%}._1PLjF{-ms-flex-preferred-size:50%;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%}._2mQ3z{-ms-flex-preferred-size:58.333%;-webkit-flex-basis:58.333%;flex-basis:58.333%;max-width:58.333%}._2nzzw{-ms-flex-preferred-size:66.667%;-webkit-flex-basis:66.667%;flex-basis:66.667%;max-width:66.667%}._3AEAT{-ms-flex-preferred-size:75%;-webkit-flex-basis:75%;flex-basis:75%;max-width:75%}._1_dDV{-ms-flex-preferred-size:83.333%;-webkit-flex-basis:83.333%;flex-basis:83.333%;max-width:83.333%}._1AaaV{-ms-flex-preferred-size:91.667%;-webkit-flex-basis:91.667%;flex-basis:91.667%;max-width:91.667%}._2SCfE{-ms-flex-preferred-size:100%;-webkit-flex-basis:100%;flex-basis:100%;max-width:100%}._2gggZ{margin-left:8.333%}._1n3wZ{margin-left:16.667%}.kLcKr{margin-left:25%}._2-sA2{margin-left:33.333%}._1ETqh{margin-left:41.667%}._2GEFc{margin-left:50%}._3Ue1n{margin-left:58.333%}._35Dqb{margin-left:66.667%}._13f5D{margin-left:75%}._2Ywm4{margin-left:83.333%}._2rr09{margin-left:91.667%}._2l0B5{-ms-flex-pack:start;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;text-align:start}._2zMt6{-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center}.bQMyx{-ms-flex-pack:end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;text-align:end}.sUVbV{-ms-flex-align:start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.f8eU9{-ms-flex-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.zj6o5{-ms-flex-align:end;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}._106IT{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around}._1ZYbY{-ms-flex-pack:justify;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}._207BW{-ms-flex-order:-1;-webkit-box-ordinal-group:0;-webkit-order:-1;order:-1}._2SfPL{-ms-flex-order:1;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}}.HWjoO{background-color:rgba(0,0,0,.8)}.YJjTS{margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._18KsZ,.YJjTS{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}._18KsZ{margin:200px 0;text-align:center}.HasiM{color:#387ef5;font-size:60px}.OFg3a{color:#999;font-size:30px}@media only screen and (max-width:48em){._18KsZ{margin:100px 0}.HasiM{font-size:40px}}", ""]);

// exports
exports.locals = {
	"container_fluid": "_1VsAA",
	"row": "_2Z6Zl",
	"reverse": "_1nhnl",
	"col": "_358A0",
	"col-xs": "IftiM",
	"col_xs_1": "kzFkI",
	"col_xs_2": "_1V9eu",
	"col_xs_3": "_1Qahl",
	"col_xs_4": "_3s0WR",
	"col_xs_5": "_1B1i-",
	"col_xs_6": "_3ocog",
	"col_xs_7": "SREOr",
	"col_xs_8": "_1as0e",
	"col_xs_9": "_1of4O",
	"col_xs_10": "_2XSg-",
	"col_xs_11": "OLupD",
	"col_xs_12": "HNJOL",
	"col_xs": "_1x9Z5",
	"col_xs_offset_1": "zWFRz",
	"col_xs_offset_2": "_20vSv",
	"col_xs_offset_3": "_3tMIg",
	"col_xs_offset_4": "_2jVwh",
	"col_xs_offset_5": "_34y18",
	"col_xs_offset_6": "_12XGl",
	"col_xs_offset_7": "r3As-",
	"col_xs_offset_8": "_1K3lz",
	"col_xs_offset_9": "NfbZe",
	"col_xs_offset_10": "w9QoY",
	"col_xs_offset_11": "_2GZ1B",
	"start_xs": "FXOQ9",
	"center_xs": "_2O5h-",
	"end_xs": "_1mTpZ",
	"top_xs": "zA3x-",
	"middle_xs": "_1jpfq",
	"bottom_xs": "pljgf",
	"around_xs": "_2iF_P",
	"between_xs": "sF2dJ",
	"first_xs": "_2XPGS",
	"last_xs": "_19acc",
	"container": "YJjTS",
	"col_sm": "_3n1Gr",
	"col_sm_1": "_3kBhH",
	"col_sm_2": "_35r4B",
	"col_sm_3": "_1GWdv",
	"col_sm_4": "RlOWO",
	"col_sm_5": "_9aYqf",
	"col_sm_6": "_2hTOT",
	"col_sm_7": "AxWST",
	"col_sm_8": "_3dJlZ",
	"col_sm_9": "_2Vzgb",
	"col_sm_10": "_15CUn",
	"col_sm_11": "_3gkw2",
	"col_sm_12": "_2x2pq",
	"col_sm_offset_1": "HOo8m",
	"col_sm_offset_2": "_3xxHE",
	"col_sm_offset_3": "_159Kt",
	"col_sm_offset_4": "_2sAAy",
	"col_sm_offset_5": "WL0cd",
	"col_sm_offset_6": "_14324",
	"col_sm_offset_7": "_1GmEr",
	"col_sm_offset_8": "_3l7DR",
	"col_sm_offset_9": "_3WcoG",
	"col_sm_offset_10": "_27mCy",
	"col_sm_offset_11": "_38v8t",
	"start_sm": "CWmeq",
	"center_sm": "_2uabp",
	"end_sm": "_2G-Qg",
	"top_sm": "_1HVrl",
	"middle_sm": "HhgKr",
	"bottom_sm": "_1tvbL",
	"around_sm": "wDPDg",
	"between_sm": "_1jt97",
	"first_sm": "Uc2VS",
	"last_sm": "_37Ysl",
	"col_md": "_3mI7Y",
	"col_md_1": "_32zT5",
	"col_md_2": "_1oPnv",
	"col_md_3": "_1Nrk0",
	"col_md_4": "_24IM5",
	"col_md_5": "_27Xx1",
	"col_md_6": "_3mohP",
	"col_md_7": "_2Djki",
	"col_md_8": "_1UrLP",
	"col_md_9": "u1UHh",
	"col_md_10": "_2z17y",
	"col_md_11": "_11x3X",
	"col_md_12": "_2Mi1E",
	"col_md_offset_1": "_3j02b",
	"col_md_offset_2": "VbL61",
	"col_md_offset_3": "qc51W",
	"col_md_offset_4": "pbsy4",
	"col_md_offset_5": "_1jRnG",
	"col_md_offset_6": "_1-4fZ",
	"col_md_offset_7": "_3ZL3h",
	"col_md_offset_8": "_2NdTi",
	"col_md_offset_9": "_3ORmZ",
	"col_md_offset_10": "_38siq",
	"col_md_offset_11": "z3DYA",
	"start_md": "_2Rl1V",
	"center_md": "_19MyR",
	"end_md": "IOJWO",
	"top_md": "_2kG8L",
	"middle_md": "_1oOrK",
	"bottom_md": "_3BEFr",
	"around_md": "_1qMBK",
	"between_md": "_1kef8",
	"first_md": "YQJXt",
	"last_md": "_2Ekrk",
	"col_lg": "_16PTk",
	"col_lg_1": "_3pkeo",
	"col_lg_2": "_3rwZA",
	"col_lg_3": "LUaw5",
	"col_lg_4": "_1o2MM",
	"col_lg_5": "_2iBZh",
	"col_lg_6": "_1PLjF",
	"col_lg_7": "_2mQ3z",
	"col_lg_8": "_2nzzw",
	"col_lg_9": "_3AEAT",
	"col_lg_10": "_1_dDV",
	"col_lg_11": "_1AaaV",
	"col_lg_12": "_2SCfE",
	"col_lg_offset_1": "_2gggZ",
	"col_lg_offset_2": "_1n3wZ",
	"col_lg_offset_3": "kLcKr",
	"col_lg_offset_4": "_2-sA2",
	"col_lg_offset_5": "_1ETqh",
	"col_lg_offset_6": "_2GEFc",
	"col_lg_offset_7": "_3Ue1n",
	"col_lg_offset_8": "_35Dqb",
	"col_lg_offset_9": "_13f5D",
	"col_lg_offset_10": "_2Ywm4",
	"col_lg_offset_11": "_2rr09",
	"start_lg": "_2l0B5",
	"center_lg": "_2zMt6",
	"end_lg": "bQMyx",
	"top_lg": "sUVbV",
	"middle_lg": "f8eU9",
	"bottom_lg": "zj6o5",
	"around_lg": "_106IT",
	"between_lg": "_1ZYbY",
	"first_lg": "_207BW",
	"last_lg": "_2SfPL",
	"root": "HWjoO",
	"titleContainer": "_18KsZ",
	"title": "HasiM",
	"content": "OFg3a"
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2g8zS{background-color:#e0e0e0}._1OjFz{margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}._1xAh2{color:#333}._3dbq6{height:120px;width:120px;margin:20;text-align:\"center\";display:\"inline-block\"}._2IWB9{box-sizing:border-box;-ms-flex:0 0 auto;-webkit-box-flex:0;-webkit-flex:0 0 auto;flex:0 0 auto;padding-right:16px;padding-right:1rem;padding-left:16px;padding-left:1rem;-ms-flex-preferred-size:33.333%;-webkit-flex-basis:33.333%;flex-basis:33.333%;max-width:33.333%}", ""]);

// exports
exports.locals = {
	"root": "_2g8zS",
	"container": "_1OjFz",
	"title": "_1xAh2",
	"avatar": "_3dbq6",
	"col_xs_4": "_2IWB9"
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3byKY{background-color:#000}.XRixF{margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}._1sYth{background-color:#000;width:640px;height:480px}", ""]);

// exports
exports.locals = {
	"root": "_3byKY",
	"container": "XRixF",
	"videoContainer": "_1sYth"
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;padding:2em}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1avl7{background-image:url(" + __webpack_require__(74) + ");background-position:50%;background-size:cover;background-attachment:fixed}._3YPN-{margin:0 auto}.-EKGZ{margin:0 0 32px;margin:0 0 2rem}._3GwAp{font-size:24px;font-size:1.5rem}._107uo h1,._107uo h2,._107uo h3,._107uo h4,._107uo h5,._107uo h6{font-size:18px;font-size:1.125rem}._107uo pre{white-space:pre-wrap;font-size:14px;font-size:.875rem}._107uo img{max-width:100%}", ""]);

// exports
exports.locals = {
	"root": "_1avl7",
	"container": "_3YPN-",
	"newsItem": "-EKGZ",
	"newsTitle": "_3GwAp",
	"newsDesc": "_107uo"
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3_3g8{padding-left:20px;padding-right:20px}._3FKMx{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);

// exports
exports.locals = {
	"root": "_3_3g8",
	"container": "_3FKMx"
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e29ae16b.svg";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aca872fd.svg";

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ded0f4bb.svg";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4f1d21ae.svg";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f98d6237.svg";

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f14bedbf.svg";

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f6227708.png";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f6227708.png";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b414b1fc.svg";

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0ad5eb26.png";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "798c8c27.png";

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "915602de.png";

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b90bd7c7.jpg";

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5f3a46e5.png";

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "88ae42a9.jpg";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(48);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Countdown.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Countdown.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(49);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Footer.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Footer.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(50);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Header.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Header.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(51);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Layout.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Layout.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(52);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Break.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Break.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(53);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Info.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Info.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(54);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Intro.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Intro.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(55);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Team.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Team.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(56);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Video.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Video.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(58);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Home.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./Home.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(59);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./NotFound.css", function() {
        content = require("!!./../../../node_modules/css-loader/index.js??ref--1-1!./../../../node_modules/postcss-loader/index.js??ref--1-2!./NotFound.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Card");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Paper");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);
module.exports = __webpack_require__(15);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map