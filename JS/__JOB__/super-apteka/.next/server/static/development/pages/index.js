module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Navigation/Footer/Footer.js":
/*!************************************************!*\
  !*** ./components/Navigation/Footer/Footer.js ***!
  \************************************************/
/*! exports provided: Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Footer/Footer.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const Footer = () => {
  return __jsx("footer", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./components/Navigation/Header/Header.js":
/*!************************************************!*\
  !*** ./components/Navigation/Header/Header.js ***!
  \************************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HeaderTopBar_HeaderTopBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderTopBar/HeaderTopBar */ "./components/Navigation/Header/HeaderTopBar/HeaderTopBar.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/Header.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const Header = () => {
  return __jsx("header", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, __jsx(_HeaderTopBar_HeaderTopBar__WEBPACK_IMPORTED_MODULE_1__["HeaderTopBar"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }), __jsx("nav", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./components/Navigation/Header/HeaderTopBar/HeaderTopBar.js":
/*!*******************************************************************!*\
  !*** ./components/Navigation/Header/HeaderTopBar/HeaderTopBar.js ***!
  \*******************************************************************/
/*! exports provided: HeaderTopBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderTopBar", function() { return HeaderTopBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_AppPhone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/AppPhone */ "./components/UI/AppPhone.js");
/* harmony import */ var _UI_Icons_AppPhoneIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Icons/AppPhoneIcon */ "./components/UI/Icons/AppPhoneIcon.js");
/* harmony import */ var _UI_Icons_AppLocationIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Icons/AppLocationIcon */ "./components/UI/Icons/AppLocationIcon.js");
/* harmony import */ var _UI_Icons_AppChevron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../UI/Icons/AppChevron */ "./components/UI/Icons/AppChevron.js");
/* harmony import */ var _UI_AppLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../UI/AppLink */ "./components/UI/AppLink.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderTopBar/HeaderTopBar.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








const HeaderTopBarStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderTopBar__HeaderTopBarStyles",
  componentId: "sc-84qcod-0"
})(["background-color:", ";padding-top:14px;padding-bottom:10px;"], _theme__WEBPACK_IMPORTED_MODULE_7__["THEME"].BACKGROUND_COLOR);
const LabelStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.span.withConfig({
  displayName: "HeaderTopBar__LabelStyles",
  componentId: "sc-84qcod-1"
})(["color:", ";margin-right:5px;font-weight:bold;font-size:9px;line-height:13px;text-transform:uppercase;"], _theme__WEBPACK_IMPORTED_MODULE_7__["THEME"].LABEL_FONT_COLOR);
const SpanLinkStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.span.withConfig({
  displayName: "HeaderTopBar__SpanLinkStyles",
  componentId: "sc-84qcod-2"
})(["margin-right:5px"]);
const HeaderTopBar = () => {
  return __jsx(HeaderTopBarStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col d-flex justify-content-between",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 11
    }
  }, __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, __jsx(_UI_Icons_AppPhoneIcon__WEBPACK_IMPORTED_MODULE_3__["AppPhoneIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 15
    }
  }), __jsx(_UI_AppPhone__WEBPACK_IMPORTED_MODULE_2__["AppPhone"], {
    phone: "+7 (495) 122-22-82",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  })), __jsx("div", {
    className: "region",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 13
    }
  }, __jsx(LabelStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 15
    }
  }, "\u0440\u0435\u0433\u0438\u043E\u043D"), __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_6__["AppLink"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 15
    }
  }, __jsx(SpanLinkStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 17
    }
  }, "\u041C\u043E\u0441\u043A\u0432\u0430"), __jsx(_UI_Icons_AppChevron__WEBPACK_IMPORTED_MODULE_5__["AppChevron"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }))), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 13
    }
  }, __jsx(LabelStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 15
    }
  }, "\u0430\u043F\u0442\u0435\u043A\u0430"), __jsx(_UI_Icons_AppLocationIcon__WEBPACK_IMPORTED_MODULE_4__["AppLocationIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 15
    }
  }), __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_6__["AppLink"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 15
    }
  }, __jsx(SpanLinkStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 17
    }
  }, "\u0421\u0443\u043C\u0441\u043A\u0430\u044F \u0443\u043B\u0438\u0446\u0430, 2/12"), __jsx(_UI_Icons_AppChevron__WEBPACK_IMPORTED_MODULE_5__["AppChevron"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 17
    }
  })))), __jsx("div", {
    className: "col d-flex justify-content-end",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 11
    }
  }, __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 13
    }
  }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F"), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 13
    }
  }, "\u0412\u043E\u0439\u0442\u0438")))));
};

/***/ }),

/***/ "./components/UI/AppLink.js":
/*!**********************************!*\
  !*** ./components/UI/AppLink.js ***!
  \**********************************/
/*! exports provided: AppLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppLink", function() { return AppLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/AppLink.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const StyledLink = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.a.withConfig({
  displayName: "AppLink__StyledLink",
  componentId: "sc-1yt1140-0"
})(["cursor:pointer;color:", ";:hover{color:", ";text-decoration:none;}"], _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR, _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR);
const AppLink = (_ref) => {
  let {
    children
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return __jsx(StyledLink, _extends({}, rest, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 3
    }
  }), children);
};

/***/ }),

/***/ "./components/UI/AppPhone.js":
/*!***********************************!*\
  !*** ./components/UI/AppPhone.js ***!
  \***********************************/
/*! exports provided: AppPhone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPhone", function() { return AppPhone; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppLink */ "./components/UI/AppLink.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/AppPhone.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const AppPhone = ({
  phone
}) => __jsx(_AppLink__WEBPACK_IMPORTED_MODULE_1__["AppLink"], {
  href: `tel:${phone}`,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 3
  }
}, phone);

/***/ }),

/***/ "./components/UI/Icons/AppChevron.js":
/*!*******************************************!*\
  !*** ./components/UI/Icons/AppChevron.js ***!
  \*******************************************/
/*! exports provided: AppChevron */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppChevron", function() { return AppChevron; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppChevron.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppChevron = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  userHeight: "8",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  d: "M0.5 0.5L4.5 5.5L8.5 0.5",
  stroke: color,
  strokeLinecap: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppIconContainer.js":
/*!*************************************************!*\
  !*** ./components/UI/Icons/AppIconContainer.js ***!
  \*************************************************/
/*! exports provided: AppIconContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppIconContainer", function() { return AppIconContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppIconContainer.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const AppIconContainerStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.svg.withConfig({
  displayName: "AppIconContainer__AppIconContainerStyles",
  componentId: "sc-16i2rmc-0"
})(["margin-right:5px"]);
const AppIconContainer = ({
  children,
  userWidth = 12,
  userHeight = 15
}) => __jsx(AppIconContainerStyles, {
  width: "12",
  height: "12",
  viewBox: `0 0 ${userWidth} ${userHeight}`,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  preserveAspectRatio: "xMidYMid meet",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 3
  }
}, children);

/***/ }),

/***/ "./components/UI/Icons/AppLocationIcon.js":
/*!************************************************!*\
  !*** ./components/UI/Icons/AppLocationIcon.js ***!
  \************************************************/
/*! exports provided: AppLocationIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppLocationIcon", function() { return AppLocationIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppLocationIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppLocationIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].MAIN_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M5 14C5 14 10 9 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 9 5 14 5 14ZM5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppPhoneIcon.js":
/*!*********************************************!*\
  !*** ./components/UI/Icons/AppPhoneIcon.js ***!
  \*********************************************/
/*! exports provided: AppPhoneIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPhoneIcon", function() { return AppPhoneIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppPhoneIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppPhoneIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].MAIN_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  d: "M9.45194 11.5024C9.40193 11.5024 9.35192 11.5024 9.30191 11.5024C7.70158 11.3023 6.10125 10.7522 4.75098 9.90203C3.50072 9.10187 2.40049 8.00164 1.60033 6.75139C0.700144 5.40111 0.150031 3.80078 0 2.20045C0 1.80037 0.100021 1.40029 0.350072 1.10023C0.600123 0.800164 0.950195 0.600123 1.35028 0.550113C1.40029 0.550113 1.4503 0.550113 1.50031 0.550113H3.00062C3.75077 0.550113 4.4009 1.10023 4.50092 1.85038C4.55093 2.30047 4.65095 2.75056 4.80099 3.15065C5.00103 3.70076 4.851 4.30088 4.45091 4.75098L4.10084 5.10105C4.70097 6.00123 5.45112 6.8014 6.40131 7.40152L6.75139 7.05145C7.15147 6.65137 7.8016 6.50134 8.35171 6.70138C8.7518 6.85141 9.20189 6.95143 9.65198 7.00144C10.4021 7.10146 10.9522 7.75159 10.9522 8.50175V10.0021C10.9522 10.4021 10.8022 10.8022 10.5022 11.0523C10.2021 11.3023 9.85202 11.5024 9.45194 11.5024ZM3.00062 1.55032H1.50031C1.35028 1.55032 1.20025 1.65034 1.10023 1.75036C1.05022 1.85038 1.00021 1.9504 1.00021 2.10043C1.15024 3.55073 1.65034 4.95102 2.4505 6.20127C3.20066 7.35151 4.15085 8.35172 5.30109 9.05186C6.55134 9.85202 7.95163 10.3521 9.40193 10.5022C9.60197 10.5022 9.70199 10.4521 9.80201 10.3521C9.90203 10.2521 9.95204 10.1521 9.95204 10.0021V8.50175C9.95204 8.25169 9.752 8.05165 9.50195 8.00164C9.00185 7.95163 8.50175 7.8016 8.00164 7.60156C7.8016 7.55155 7.60156 7.55155 7.45153 7.70158L6.8014 8.35172C6.65137 8.50175 6.40131 8.55176 6.20127 8.45174C4.851 7.70158 3.75077 6.60136 3.00062 5.25108C2.95061 5.05104 3.00062 4.80099 3.15065 4.65096L3.80078 4.00082C3.9008 3.9008 3.95081 3.65075 3.9008 3.50072C3.70076 3.00062 3.60074 2.50051 3.50072 2.00041C3.50072 1.75036 3.25067 1.55032 3.00062 1.55032ZM8.95184 5.05104C8.70179 5.05104 8.50175 4.90101 8.45174 4.65096C8.3017 3.85079 7.65157 3.25067 6.85141 3.05063C6.60136 3.00062 6.40131 2.75056 6.45132 2.4505C6.50133 2.20045 6.75139 2.00041 7.05145 2.05042C8.25169 2.30047 9.20189 3.20066 9.40193 4.4009C9.45194 4.65096 9.30191 4.95102 9.00185 5.00103C9.00185 5.00103 9.00185 5.05104 8.95184 5.05104ZM10.9522 5.00103C10.7022 5.00103 10.5022 4.80099 10.4521 4.55093C10.2521 2.70055 8.80181 1.25026 6.90142 1.00021C6.65137 0.950195 6.45132 0.700144 6.45132 0.450092C6.45132 0.200041 6.75139 0 7.00144 0C9.35192 0.250051 11.1523 2.05042 11.4023 4.4009C11.4524 4.65096 11.2523 4.90101 10.9522 4.95102C11.0023 5.00103 10.9522 5.00103 10.9522 5.00103Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./layout/MainLayout.js":
/*!******************************!*\
  !*** ./layout/MainLayout.js ***!
  \******************************/
/*! exports provided: MainLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainLayout", function() { return MainLayout; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Navigation_Header_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Navigation/Header/Header */ "./components/Navigation/Header/Header.js");
/* harmony import */ var _components_Navigation_Footer_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Navigation/Footer/Footer */ "./components/Navigation/Footer/Footer.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/layout/MainLayout.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




const MainLayout = ({
  children,
  title
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, __jsx("title", {
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, title), __jsx("meta", {
    charSet: "utf-8",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "viewport",
    content: "initial-scale=1.0, width=device-width",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }), __jsx("script", {
    src: "https://code.jquery.com/jquery-3.4.1.slim.min.js",
    integrity: "sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n",
    crossOrigin: "anonymous",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }), __jsx("script", {
    src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    integrity: "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo",
    crossOrigin: "anonymous",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 9
    }
  }), __jsx("link", {
    rel: "stylesheet",
    href: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
    integrity: "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh",
    crossOrigin: "anonymous",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }), __jsx("script", {
    src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
    integrity: "sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6",
    crossOrigin: "anonymous",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  })), __jsx(_components_Navigation_Header_Header__WEBPACK_IMPORTED_MODULE_3__["Header"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }), __jsx("main", {
    role: "main",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }, children), __jsx(_components_Navigation_Footer_Footer__WEBPACK_IMPORTED_MODULE_4__["Footer"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1776405742",
    __self: undefined
  }, "@font-face{font-family:'Circe';src:url('/fonts/Circe-Light.eot');src:url('/fonts/Circe-Light.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Light.woff2') format('woff2'), url('/fonts/Circe-Light.woff') format('woff'), url('/fonts/Circe-Light.ttf') format('truetype');font-weight:300;font-style:normal;}@font-face{font-family:'Circe Extra';src:url('/fonts/Circe-ExtraBold.eot');src:url('/fonts/Circe-ExtraBold.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-ExtraBold.woff2') format('woff2'), url('/fonts/Circe-ExtraBold.woff') format('woff'), url('/fonts/Circe-ExtraBold.ttf') format('truetype');font-weight:800;font-style:normal;}@font-face{font-family:'Circe';src:url('/fonts/Circe-Thin.eot');src:url('/fonts/Circe-Thin.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Thin.woff2') format('woff2'), url('/fonts/Circe-Thin.woff') format('woff'), url('/fonts/Circe-Thin.ttf') format('truetype');font-weight:100;font-style:normal;}@font-face{font-family:'Circe';src:url('/fonts/Circe-Regular.eot');src:url('/fonts/Circe-Regular.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Regular.woff2') format('woff2'), url('/fonts/Circe-Regular.woff') format('woff'), url('/fonts/Circe-Regular.ttf') format('truetype');font-weight:normal;font-style:normal;}@font-face{font-family:'Circe';src:url('/fonts/Circe-Bold.eot');src:url('/fonts/Circe-Bold.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Bold.woff2') format('woff2'), url('/fonts/Circe-Bold.woff') format('woff'), url('/fonts/Circe-Bold.ttf') format('truetype');font-weight:bold;font-style:normal;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWtzaW1taW5jZW5rby9QaHBzdG9ybVByb2plY3RzL3NsaW0ueHBweC9yL0tOT1dMRURHRS9KUy9fX0pPQl9fL3N1cGVyLWFwdGVrYS9sYXlvdXQvTWFpbkxheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Q21CLEFBRytCLEFBV00sQUFXTixBQVdBLEFBV0Esb0JBM0NjLEFBc0JELEFBV0csQUFXSCxNQWpDSywyQkFlYSxBQXNCQSxDQTVDQyxFQWlDRSxRQXRCRSx3TUFZeEMsQUFzQkMsS0E1Q0QsVUFpQ0csQ0FWRCxDQXNCQSxJQTVDQSxVQVVGLEdBYWxCLEFBVW9CLENBWXBCLElBNUNBLFFBVW9CLEtBdUJwQixhQXRCQSIsImZpbGUiOiIvVXNlcnMvbWFrc2ltbWluY2Vua28vUGhwc3Rvcm1Qcm9qZWN0cy9zbGltLnhwcHgvci9LTk9XTEVER0UvSlMvX19KT0JfXy9zdXBlci1hcHRla2EvbGF5b3V0L01haW5MYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmltcG9ydCB7IEhlYWRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9IZWFkZXIvSGVhZGVyJ1xuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9OYXZpZ2F0aW9uL0Zvb3Rlci9Gb290ZXInXG5cbmV4cG9ydCBjb25zdCBNYWluTGF5b3V0ID0gKHsgY2hpbGRyZW4sIHRpdGxlIH0pID0+IHtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPnsgdGl0bGUgfTwvdGl0bGU+XG4gICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cImluaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGhcIi8+XG5cbiAgICAgICAgPHNjcmlwdFxuICAgICAgICAgIHNyYz1cImh0dHBzOi8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0zLjQuMS5zbGltLm1pbi5qc1wiXG4gICAgICAgICAgaW50ZWdyaXR5PVwic2hhMzg0LUo2cWE0ODQ5YmxFMitwb1Q0V255S2h2NXZaRjVTclBvMGlFandCdktVN2ltR0ZBVjB3d2oxeVlmb1JTSm9aK25cIlxuICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDxzY3JpcHRcbiAgICAgICAgICBzcmM9XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3BvcHBlci5qc0AxLjE2LjAvZGlzdC91bWQvcG9wcGVyLm1pbi5qc1wiXG4gICAgICAgICAgaW50ZWdyaXR5PVwic2hhMzg0LVE2RTlSSHZiSXlaRkpvZnQrMm1KYkhhRVdsZGx2STlJT1l5NW4zelY5enpUdG1JM1Vrc2RRUlZ2b3hNZm9vQW9cIlxuICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCI+PC9zY3JpcHQ+XG5cbiAgICAgICAgPGxpbmtcbiAgICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdGFja3BhdGguYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvNC40LjEvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCJcbiAgICAgICAgICBpbnRlZ3JpdHk9XCJzaGEzODQtVmtvbzh4NENHc08zK0hoeHY4VC9RNVBhWHRrS3R1NnVnNVRPZU5WNmdCaUZlV1BHRk45TXVoT2YyM1E5SWZqaFwiXG4gICAgICAgICAgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIlxuICAgICAgICAvPlxuICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgc3JjPVwiaHR0cHM6Ly9zdGFja3BhdGguYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvNC40LjEvanMvYm9vdHN0cmFwLm1pbi5qc1wiXG4gICAgICAgICAgaW50ZWdyaXR5PVwic2hhMzg0LXdmU0RGMkU1MFkyRDF1VWRqME8zdU1CSm5qdVVENEloN1l3YVlkMWlxZmt0ajBVb2Q4R0NFeGwzT2c4aWZ3QjZcIlxuICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCJcbiAgICAgICAgPjwvc2NyaXB0PlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8SGVhZGVyIC8+XG5cbiAgICAgIDxtYWluIHJvbGU9XCJtYWluXCI+XG4gICAgICAgIHsgY2hpbGRyZW4gfVxuICAgICAgPC9tYWluPlxuXG4gICAgICA8Rm9vdGVyIC8+XG5cbiAgICAgIDxzdHlsZSBqc3g+eyBgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnQ2lyY2UnO1xuICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2UtTGlnaHQuZW90Jyk7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1MaWdodC5lb3Q/I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1MaWdodC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtTGlnaHQud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1MaWdodC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIH1cblxuICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ0NpcmNlIEV4dHJhJztcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLUV4dHJhQm9sZC5lb3QnKTtcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLUV4dHJhQm9sZC5lb3Q/I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1FeHRyYUJvbGQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLUV4dHJhQm9sZC53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLUV4dHJhQm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIH1cblxuICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ0NpcmNlJztcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLVRoaW4uZW90Jyk7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1UaGluLmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLVRoaW4ud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLVRoaW4ud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1UaGluLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcbiAgICAgICAgICBmb250LXdlaWdodDogMTAwO1xuICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnQ2lyY2UnO1xuICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2UtUmVndWxhci5lb3QnKTtcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLVJlZ3VsYXIuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtUmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtUmVndWxhci53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLVJlZ3VsYXIudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdDaXJjZSc7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1Cb2xkLmVvdCcpO1xuICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2UtQm9sZC5lb3Q/I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1Cb2xkLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1Cb2xkLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtQm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICB9XG4gICAgICBgIH08L3N0eWxlPlxuICAgIDwvPlxuICApXG59XG4iXX0= */\n/*@ sourceURL=/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/layout/MainLayout.js */"));
};

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: getStaticProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return getStaticProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/MainLayout */ "./layout/MainLayout.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const indexPage = ({
  post
}) => __jsx(_layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__["MainLayout"], {
  title: post.title,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 3
  }
});

async function getStaticProps() {
  const res = await isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default()('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();
  return {
    props: {
      post
    }
  };
}
/* harmony default export */ __webpack_exports__["default"] = (indexPage);

/***/ }),

/***/ "./theme.js":
/*!******************!*\
  !*** ./theme.js ***!
  \******************/
/*! exports provided: THEME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THEME", function() { return THEME; });
const THEME = {
  FONT_COLOR: '#3C3E3F',
  LABEL_FONT_COLOR: '#B8BFC9',
  BACKGROUND_COLOR: '#F7F8FA',
  MAIN_COLOR: '#60D67A'
};

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map