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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

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
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/layout/MainLayout.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

 // import { FixedMenu } from '../components/Navigation/FixedMenu'

const MainLayout = ({
  children,
  title
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }, __jsx("title", {
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  }, title), __jsx("meta", {
    charSet: "utf-8",
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  }), __jsx("meta", {
    name: "viewport",
    content: "initial-scale=1.0, width=device-width",
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  })), __jsx("header", {
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }, __jsx("nav", {
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, "NAVIGATION")), __jsx("main", {
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, children), __jsx("footer", {
    className: "jsx-1489812740",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, "FOOTER"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1489812740",
    __self: undefined
  }, "@font-face{font-family:'Circle';font-style:normal;src:url('/fonts/Circle-Regular.ttf');src:url('/fonts/Circle-Bold.ttf');src:url('/fonts/Circle-Black.ttf');src:url('/fonts/Circle-ExtraLight.ttf');}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWtzaW1taW5jZW5rby9QaHBzdG9ybVByb2plY3RzL3NsaW0ueHBweC9yL0tOT1dMRURHRS9KUy9fX0pPQl9fL3N1cGVyLWFwdGVrYS9sYXlvdXQvTWFpbkxheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0Qm1CLEFBR2dDLHFCQUNELGtCQUNtQixxQ0FDSCxrQ0FDQyxtQ0FDSyx3Q0FDNUMiLCJmaWxlIjoiL1VzZXJzL21ha3NpbW1pbmNlbmtvL1BocHN0b3JtUHJvamVjdHMvc2xpbS54cHB4L3IvS05PV0xFREdFL0pTL19fSk9CX18vc3VwZXItYXB0ZWthL2xheW91dC9NYWluTGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuLy8gaW1wb3J0IHsgRml4ZWRNZW51IH0gZnJvbSAnLi4vY29tcG9uZW50cy9OYXZpZ2F0aW9uL0ZpeGVkTWVudSdcblxuZXhwb3J0IGNvbnN0IE1haW5MYXlvdXQgPSAoeyBjaGlsZHJlbiwgdGl0bGUgfSkgPT4ge1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+eyB0aXRsZSB9PC90aXRsZT5cbiAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwiaW5pdGlhbC1zY2FsZT0xLjAsIHdpZHRoPWRldmljZS13aWR0aFwiLz5cbiAgICAgIDwvSGVhZD5cblxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgey8qPEZpeGVkTWVudS8+Ki8gfVxuXG4gICAgICAgIDxuYXY+XG4gICAgICAgICAgTkFWSUdBVElPTlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvaGVhZGVyPlxuXG4gICAgICA8bWFpbj5cbiAgICAgICAgeyBjaGlsZHJlbiB9XG4gICAgICA8L21haW4+XG5cbiAgICAgIDxmb290ZXI+Rk9PVEVSPC9mb290ZXI+XG5cbiAgICAgIDxzdHlsZSBqc3g+eyBgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnQ2lyY2xlJztcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2xlLVJlZ3VsYXIudHRmJyk7XG4gICAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNsZS1Cb2xkLnR0ZicpO1xuICAgICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjbGUtQmxhY2sudHRmJyk7XG4gICAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNsZS1FeHRyYUxpZ2h0LnR0ZicpO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC8+XG4gIClcbn1cbiJdfQ== */\n/*@ sourceURL=/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/layout/MainLayout.js */"));
};

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_MainLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/MainLayout */ "./layout/MainLayout.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const indexPage = () => __jsx(_layout_MainLayout__WEBPACK_IMPORTED_MODULE_1__["MainLayout"], {
  title: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 3
  }
}, __jsx("p", {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 5
  }
}, "CONTENT"));

/* harmony default export */ __webpack_exports__["default"] = (indexPage);

/***/ }),

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/pages/index.js */"./pages/index.js");


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