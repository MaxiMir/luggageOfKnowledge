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

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "./components/Basket/BasketWidget/BasketWidget.js":
/*!********************************************************!*\
  !*** ./components/Basket/BasketWidget/BasketWidget.js ***!
  \********************************************************/
/*! exports provided: BasketWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketWidget", function() { return BasketWidget; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_Icons_AppBasketicon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../UI/Icons/AppBasketicon */ "./components/UI/Icons/AppBasketicon.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Basket/BasketWidget/BasketWidget.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const BasketWidgetContainerStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "BasketWidget__BasketWidgetContainerStyles",
  componentId: "xt2zlp-0"
})(["width:200px;height:56px;padding:12px 33px 10px 34px;border:2px solid #DADFE6;box-sizing:border-box;border-radius:10px;cursor:pointer;"]);
const BasketCountContainerStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "BasketWidget__BasketCountContainerStyles",
  componentId: "xt2zlp-1"
})(["width:34px;height:34px;border-radius:50%;background-color:", ";font-size:18px;font-weight:bold;color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_3__["THEME"].MAIN_COLOR, _theme__WEBPACK_IMPORTED_MODULE_3__["THEME"].WHITE_COLOR);
const BasketWidget = () => {
  const basketCount = 12;
  return __jsx(BasketWidgetContainerStyles, {
    className: "d-flex justify-content-between align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 5
    }
  }, __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, "\u041A\u043E\u0440\u0437\u0438\u043D\u0430"), __jsx(_UI_Icons_AppBasketicon__WEBPACK_IMPORTED_MODULE_2__["AppBasketIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }), __jsx(BasketCountContainerStyles, {
    className: "d-flex justify-content-center align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }, basketCount));
};

/***/ }),

/***/ "./components/Catalog/CatalogSearch/CatalogSearch.js":
/*!***********************************************************!*\
  !*** ./components/Catalog/CatalogSearch/CatalogSearch.js ***!
  \***********************************************************/
/*! exports provided: CatalogSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogSearch", function() { return CatalogSearch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CatalogSearchInput_CatalogSearchInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CatalogSearchInput/CatalogSearchInput */ "./components/Catalog/CatalogSearch/CatalogSearchInput/CatalogSearchInput.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Catalog/CatalogSearch/CatalogSearch.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const CatalogSearch = () => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_CatalogSearchInput_CatalogSearchInput__WEBPACK_IMPORTED_MODULE_1__["CatalogSearchInput"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./components/Catalog/CatalogSearch/CatalogSearchInput/CatalogSearchInput.js":
/*!***********************************************************************************!*\
  !*** ./components/Catalog/CatalogSearch/CatalogSearchInput/CatalogSearchInput.js ***!
  \***********************************************************************************/
/*! exports provided: CatalogSearchInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogSearchInput", function() { return CatalogSearchInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
/* harmony import */ var _UI_AppLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/AppLink */ "./components/UI/AppLink.js");
/* harmony import */ var _UI_Icons_AppSearchIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Icons/AppSearchIcon */ "./components/UI/Icons/AppSearchIcon.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Catalog/CatalogSearch/CatalogSearchInput/CatalogSearchInput.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const InputStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.input.withConfig({
  displayName: "CatalogSearchInput__InputStyles",
  componentId: "sc-17ulwnr-0"
})(["padding:20px 12px;border:2px solid ", ";border-radius:10px;font-size:16px;line-height:24px;color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].MAIN_COLOR, _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LABEL_FONT_COLOR);
const SearchIconContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "CatalogSearchInput__SearchIconContainer",
  componentId: "sc-17ulwnr-1"
})(["width:86px;height:44px;background-color:", ";border-radius:0px 10px 10px 0px;"], _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].MAIN_COLOR);
const CatalogSearchInput = () => {
  return __jsx("div", {
    className: "input-group",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, __jsx(InputStyles, {
    type: "text",
    className: "form-control",
    placeholder: "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E, \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u043C\u0443 \u0432\u0435\u0449\u0435\u0441\u0442\u0432\u0443 \u0438\u043B\u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E",
    "aria-label": "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E, \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u043C\u0443 \u0432\u0435\u0449\u0435\u0441\u0442\u0432\u0443 \u0438\u043B\u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E",
    "aria-describedby": "searchSubmit",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), __jsx(SearchIconContainer, {
    className: "input-group-append d-flex justify-content-center align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_3__["AppLink"], {
    id: "searchSubmit",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 9
    }
  }, __jsx(_UI_Icons_AppSearchIcon__WEBPACK_IMPORTED_MODULE_4__["AppSearchIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 11
    }
  }))));
};

/***/ }),

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
/* harmony import */ var _HeaderMiddleBar_HeaderMiddleBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HeaderMiddleBar/HeaderMiddleBar */ "./components/Navigation/Header/HeaderMiddleBar/HeaderMiddleBar.js");
/* harmony import */ var _HeaderBottomBar_HeaderBottomBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeaderBottomBar/HeaderBottomBar */ "./components/Navigation/Header/HeaderBottomBar/HeaderBottomBar.js");
/* harmony import */ var _HeaderMainNav_HeaderMainNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HeaderMainNav/HeaderMainNav */ "./components/Navigation/Header/HeaderMainNav/HeaderMainNav.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/Header.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const Header = () => {
  return __jsx("header", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 5
    }
  }, __jsx(_HeaderTopBar_HeaderTopBar__WEBPACK_IMPORTED_MODULE_1__["HeaderTopBar"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }), __jsx(_HeaderMiddleBar_HeaderMiddleBar__WEBPACK_IMPORTED_MODULE_2__["HeaderMiddleBar"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }), __jsx(_HeaderBottomBar_HeaderBottomBar__WEBPACK_IMPORTED_MODULE_3__["HeaderBottomBar"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }), __jsx(_HeaderMainNav_HeaderMainNav__WEBPACK_IMPORTED_MODULE_4__["HeaderMainNav"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./components/Navigation/Header/HeaderBottomBar/HeaderBottomBar.js":
/*!*************************************************************************!*\
  !*** ./components/Navigation/Header/HeaderBottomBar/HeaderBottomBar.js ***!
  \*************************************************************************/
/*! exports provided: HeaderBottomBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderBottomBar", function() { return HeaderBottomBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Catalog_CatalogSearch_CatalogSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Catalog/CatalogSearch/CatalogSearch */ "./components/Catalog/CatalogSearch/CatalogSearch.js");
/* harmony import */ var _UI_Icons_AppBurgerIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Icons/AppBurgerIcon */ "./components/UI/Icons/AppBurgerIcon.js");
/* harmony import */ var _UI_AppLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/AppLink */ "./components/UI/AppLink.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
/* harmony import */ var _UI_Icons_AppCloseIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../UI/Icons/AppCloseIcon */ "./components/UI/Icons/AppCloseIcon.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderBottomBar/HeaderBottomBar.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const HeaderBottomBarStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderBottomBar__HeaderBottomBarStyles",
  componentId: "sc-19780bz-0"
})(["padding-bottom:15px;"]);
const AppLinkContainerStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderBottomBar__AppLinkContainerStyles",
  componentId: "sc-19780bz-1"
})(["width:129px;height:45px;margin-right:20px;background:linear-gradient(270deg,#37BBEB 5.81%,#37BBEB 97.67%);color:", ";border-radius:10px;"], _theme__WEBPACK_IMPORTED_MODULE_5__["THEME"].WHITE_COLOR);
const HeaderBottomBar = () => {
  const {
    0: isOpenedMenu,
    1: setIsOpenedMenu
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const menuBtnHandler = () => {
    setIsOpenedMenu(!isOpenedMenu);
  };

  const MenuIcon = isOpenedMenu ? _UI_Icons_AppCloseIcon__WEBPACK_IMPORTED_MODULE_6__["AppCloseIcon"] : _UI_Icons_AppBurgerIcon__WEBPACK_IMPORTED_MODULE_3__["AppBurgerIcon"];
  return __jsx(HeaderBottomBarStyles, {
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
    className: "row align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, __jsx(AppLinkContainerStyles, {
    className: "d-flex justify-content-center align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 11
    }
  }, __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_4__["AppLink"], {
    "data-toggle": "modal",
    "data-target": ".header-modal-menu",
    onClick: menuBtnHandler,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, __jsx(MenuIcon, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 15
    }
  }), "\u041A\u0430\u0442\u0430\u043B\u043E\u0433")), __jsx("div", {
    className: "flex-grow-1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 11
    }
  }, __jsx(_Catalog_CatalogSearch_CatalogSearch__WEBPACK_IMPORTED_MODULE_2__["CatalogSearch"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  })))));
};

/***/ }),

/***/ "./components/Navigation/Header/HeaderMainNav/HeaderMainNav.js":
/*!*********************************************************************!*\
  !*** ./components/Navigation/Header/HeaderMainNav/HeaderMainNav.js ***!
  \*********************************************************************/
/*! exports provided: HeaderMainNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderMainNav", function() { return HeaderMainNav; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/AppRouterLink */ "./components/UI/AppRouterLink.js");
/* harmony import */ var _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppMedicinesIcon */ "./components/UI/Icons/Catalog/AppMedicinesIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppMedicalEquipment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppMedicalEquipment */ "./components/UI/Icons/Catalog/AppMedicalEquipment.js");
/* harmony import */ var _UI_Icons_Catalog_AppNonCommodityItemsIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppNonCommodityItemsIcon */ "./components/UI/Icons/Catalog/AppNonCommodityItemsIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppOpticsIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppOpticsIcon */ "./components/UI/Icons/Catalog/AppOpticsIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppFoodIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppFoodIcon */ "./components/UI/Icons/Catalog/AppFoodIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppBeautyAndHygieneProductsIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon */ "./components/UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppHouseholdProductsIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppHouseholdProductsIcon */ "./components/UI/Icons/Catalog/AppHouseholdProductsIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppProductsForMotherAndBabyIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppProductsForMotherAndBabyIcon */ "./components/UI/Icons/Catalog/AppProductsForMotherAndBabyIcon.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderMainNav/HeaderMainNav.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;












const LeftMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderMainNav__LeftMenuStyles",
  componentId: "sc-1plnt9j-0"
})(["padding:15px;background-color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_11__["THEME"].BACKGROUND_COLOR);
const RightMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderMainNav__RightMenuStyles",
  componentId: "sc-1plnt9j-1"
})(["padding:15px;"]);
const LeftMenuLinkContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderMainNav__LeftMenuLinkContainer",
  componentId: "sc-1plnt9j-2"
})(["width:200px;min-height:60px;padding:0 15px;transition:all 0.5s ease;&:hover{background-color:", ";color:", ";}"], _theme__WEBPACK_IMPORTED_MODULE_11__["THEME"].WHITE_COLOR, _theme__WEBPACK_IMPORTED_MODULE_11__["THEME"].MAIN_COLOR);
const IconContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderMainNav__IconContainer",
  componentId: "sc-1plnt9j-3"
})(["width:44px;"]);
const HeaderMainNav = () => {
  const leftMenuLinksData = [{
    name: 'Лекарственные и профилактические средства',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
  }, {
    name: 'Медицинская техника и изделия',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppMedicalEquipment__WEBPACK_IMPORTED_MODULE_4__["AppMedicalEquipment"]
  }, {
    name: 'Нетоварные позиции',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppNonCommodityItemsIcon__WEBPACK_IMPORTED_MODULE_5__["AppNonCommodityItemsIcon"]
  }, {
    name: 'Оптика',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppOpticsIcon__WEBPACK_IMPORTED_MODULE_6__["AppOpticsIcon"]
  }, {
    name: 'Продукты питания',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppFoodIcon__WEBPACK_IMPORTED_MODULE_7__["AppFoodIcon"]
  }, {
    name: 'Средства для красоты и гигиены',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppBeautyAndHygieneProductsIcon__WEBPACK_IMPORTED_MODULE_8__["AppBeautyAndHygieneProductsIcon"]
  }, {
    name: 'Товары для дома и сопутствующие',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppHouseholdProductsIcon__WEBPACK_IMPORTED_MODULE_9__["AppHouseholdProductsIcon"]
  }, {
    name: 'Товары для матери и ребенка',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppProductsForMotherAndBabyIcon__WEBPACK_IMPORTED_MODULE_10__["AppProductsForMotherAndBabyIcon"]
  }];
  const leftMenuLinks = leftMenuLinksData.map(({
    name,
    href,
    IconComponent
  }, id) => __jsx(LeftMenuLinkContainer, {
    key: id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 5
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: href,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }
  }, __jsx(IconContainer, {
    className: "d-flex justify-content-center align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }
  }, __jsx(IconComponent, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 11
    }
  })), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 9
    }
  }, name))));
  return __jsx("div", {
    className: "container-fluid",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }
  }, __jsx(LeftMenuStyles, {
    className: "col-3 flex-column justify-content-end align-items-end",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 9
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: "/catalog/",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 11
    }
  }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"), leftMenuLinks), __jsx(RightMenuStyles, {
    className: "col-9",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 9
    }
  })));
};

/***/ }),

/***/ "./components/Navigation/Header/HeaderMiddleBar/HeaderMiddleBar.js":
/*!*************************************************************************!*\
  !*** ./components/Navigation/Header/HeaderMiddleBar/HeaderMiddleBar.js ***!
  \*************************************************************************/
/*! exports provided: HeaderMiddleBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderMiddleBar", function() { return HeaderMiddleBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Basket_BasketWidget_BasketWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Basket/BasketWidget/BasketWidget */ "./components/Basket/BasketWidget/BasketWidget.js");
/* harmony import */ var _UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/AppRouterLink */ "./components/UI/AppRouterLink.js");
/* harmony import */ var _UI_Icons_AppLogoIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Icons/AppLogoIcon */ "./components/UI/Icons/AppLogoIcon.js");
/* harmony import */ var _UI_Icons_AppPercentIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../UI/Icons/AppPercentIcon */ "./components/UI/Icons/AppPercentIcon.js");
/* harmony import */ var _UI_Icons_AppStarIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../UI/Icons/AppStarIcon */ "./components/UI/Icons/AppStarIcon.js");
/* harmony import */ var _UI_Icons_AppBonusIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../UI/Icons/AppBonusIcon */ "./components/UI/Icons/AppBonusIcon.js");
/* harmony import */ var _UI_Icons_AppGoodsOnOrderIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../UI/Icons/AppGoodsOnOrderIcon */ "./components/UI/Icons/AppGoodsOnOrderIcon.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderMiddleBar/HeaderMiddleBar.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









const HeaderMainNavStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderMiddleBar__HeaderMainNavStyles",
  componentId: "sc-1innwr1-0"
})(["padding-bottom:15px;"]);
const HeaderMiddleBar = () => {
  const navLinksData = [{
    name: 'Акции',
    href: '/stock/',
    IconComponent: _UI_Icons_AppPercentIcon__WEBPACK_IMPORTED_MODULE_5__["AppPercentIcon"]
  }, {
    name: 'Наш выбор',
    href: '/catalog/nash-vibor/',
    IconComponent: _UI_Icons_AppStarIcon__WEBPACK_IMPORTED_MODULE_6__["AppStarIcon"]
  }, {
    name: 'Бонусы',
    href: '/super/',
    IconComponent: _UI_Icons_AppBonusIcon__WEBPACK_IMPORTED_MODULE_7__["AppBonusIcon"]
  }, {
    name: 'Товары под заказ',
    href: '#???',
    IconComponent: _UI_Icons_AppGoodsOnOrderIcon__WEBPACK_IMPORTED_MODULE_8__["AppGoodsOnOrderIcon"]
  }];
  const navLinks = navLinksData.map(({
    name,
    href,
    IconComponent
  }, id) => __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_3__["AppRouterLink"], {
    href: href,
    key: id,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, __jsx(IconComponent, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), name));
  return __jsx(HeaderMainNavStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col-3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 11
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_3__["AppRouterLink"], {
    href: "/",
    title: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 13
    }
  }, __jsx(_UI_Icons_AppLogoIcon__WEBPACK_IMPORTED_MODULE_4__["AppLogoIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 15
    }
  }))), __jsx("div", {
    className: "col-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "d-flex align-items-center justify-content-between h-100",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 13
    }
  }, navLinks)), __jsx("div", {
    className: "col-3 d-flex justify-content-end",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 11
    }
  }, __jsx(_Basket_BasketWidget_BasketWidget__WEBPACK_IMPORTED_MODULE_2__["BasketWidget"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 13
    }
  })))));
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
/* harmony import */ var _UI_Icons_AppLocationIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Icons/AppLocationIcon */ "./components/UI/Icons/AppLocationIcon.js");
/* harmony import */ var _UI_Icons_AppChevronIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Icons/AppChevronIcon */ "./components/UI/Icons/AppChevronIcon.js");
/* harmony import */ var _UI_Icons_AppCrossIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../UI/Icons/AppCrossIcon */ "./components/UI/Icons/AppCrossIcon.js");
/* harmony import */ var _UI_Icons_AppEnterIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../UI/Icons/AppEnterIcon */ "./components/UI/Icons/AppEnterIcon.js");
/* harmony import */ var _UI_AppLink__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../UI/AppLink */ "./components/UI/AppLink.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderTopBar/HeaderTopBar.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









const HeaderTopBarStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "HeaderTopBar__HeaderTopBarStyles",
  componentId: "sc-84qcod-0"
})(["background-color:", ";padding-top:14px;padding-bottom:10px;margin-bottom:15px;"], _theme__WEBPACK_IMPORTED_MODULE_8__["THEME"].BACKGROUND_COLOR);
const LabelStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.span.withConfig({
  displayName: "HeaderTopBar__LabelStyles",
  componentId: "sc-84qcod-1"
})(["color:", ";margin-right:10px;font-weight:bold;font-size:9px;line-height:13px;text-transform:uppercase;"], _theme__WEBPACK_IMPORTED_MODULE_8__["THEME"].LABEL_FONT_COLOR);
const SpanLinkStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.span.withConfig({
  displayName: "HeaderTopBar__SpanLinkStyles",
  componentId: "sc-84qcod-2"
})(["margin-right:5px"]);
const HeaderTopBar = () => {
  return __jsx(HeaderTopBarStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col d-flex justify-content-between",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "d-flex align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 13
    }
  }, __jsx(_UI_AppPhone__WEBPACK_IMPORTED_MODULE_2__["AppPhone"], {
    phone: "+7 (495) 122-22-82",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  })), __jsx("div", {
    className: "d-flex align-items-center",
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
  }, "\u0440\u0435\u0433\u0438\u043E\u043D"), __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_7__["AppLink"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 15
    }
  }, __jsx(_UI_Icons_AppLocationIcon__WEBPACK_IMPORTED_MODULE_3__["AppLocationIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 17
    }
  }), __jsx(SpanLinkStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 17
    }
  }, "\u041C\u043E\u0441\u043A\u0432\u0430"), __jsx(_UI_Icons_AppChevronIcon__WEBPACK_IMPORTED_MODULE_4__["AppChevronIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "d-flex align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, __jsx(LabelStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 15
    }
  }, "\u0430\u043F\u0442\u0435\u043A\u0430"), __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_7__["AppLink"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 15
    }
  }, __jsx(_UI_Icons_AppCrossIcon__WEBPACK_IMPORTED_MODULE_5__["AppCrossIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 17
    }
  }), __jsx(SpanLinkStyles, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 17
    }
  }, "\u0421\u0443\u043C\u0441\u043A\u0430\u044F \u0443\u043B\u0438\u0446\u0430, 2/12"), __jsx(_UI_Icons_AppChevronIcon__WEBPACK_IMPORTED_MODULE_4__["AppChevronIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  })))), __jsx("div", {
    className: "col d-flex justify-content-end",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "d-flex align-items-center mr-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 13
    }
  }, __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_7__["AppLink"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 15
    }
  }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F")), __jsx("div", {
    className: "d-flex align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 13
    }
  }, __jsx(_UI_AppLink__WEBPACK_IMPORTED_MODULE_7__["AppLink"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 15
    }
  }, __jsx(_UI_Icons_AppEnterIcon__WEBPACK_IMPORTED_MODULE_6__["AppEnterIcon"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }), "\u0412\u043E\u0439\u0442\u0438"))))));
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
/* harmony import */ var _StyledNativeComponents_StyledLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StyledNativeComponents/StyledLink */ "./components/UI/StyledNativeComponents/StyledLink.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/AppLink.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const AppLink = (_ref) => {
  let {
    children
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return __jsx(_StyledNativeComponents_StyledLink__WEBPACK_IMPORTED_MODULE_1__["StyledLink"], _extends({
    className: "d-flex align-items-center"
  }, rest, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
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
/* harmony import */ var _Icons_AppPhoneIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icons/AppPhoneIcon */ "./components/UI/Icons/AppPhoneIcon.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/AppPhone.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppPhone = ({
  phone,
  withIcon = true
}) => __jsx(_AppLink__WEBPACK_IMPORTED_MODULE_1__["AppLink"], {
  href: `tel:${phone}`,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, withIcon && __jsx(_Icons_AppPhoneIcon__WEBPACK_IMPORTED_MODULE_2__["AppPhoneIcon"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 19
  }
}), phone);

/***/ }),

/***/ "./components/UI/AppRouterLink.js":
/*!****************************************!*\
  !*** ./components/UI/AppRouterLink.js ***!
  \****************************************/
/*! exports provided: AppRouterLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRouterLink", function() { return AppRouterLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _StyledNativeComponents_StyledLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StyledNativeComponents/StyledLink */ "./components/UI/StyledNativeComponents/StyledLink.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/AppRouterLink.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const AppRouterLink = (_ref) => {
  let {
    href,
    children
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["href", "children"]);

  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: href,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, __jsx(_StyledNativeComponents_StyledLink__WEBPACK_IMPORTED_MODULE_2__["StyledLink"], _extends({}, rest, {
    className: "d-flex align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }), children));
};

/***/ }),

/***/ "./components/UI/Icons/AppBasketicon.js":
/*!**********************************************!*\
  !*** ./components/UI/Icons/AppBasketicon.js ***!
  \**********************************************/
/*! exports provided: AppBasketIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBasketIcon", function() { return AppBasketIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppBasketicon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppBasketIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "20",
  height: "22",
  viewBoxWidth: "20",
  viewBoxHeight: "22",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M3.2 0.4C3.38885 0.148194 3.68524 0 4 0H16C16.3148 0 16.6111 0.148194 16.8 0.4L19.8 4.4C19.9298 4.5731 20 4.78363 20 5V19C20 19.7957 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7957 22 17 22H3C2.20435 22 1.44129 21.6839 0.87868 21.1213C0.31607 20.5587 0 19.7957 0 19V5C0 4.78363 0.0701779 4.5731 0.2 4.4L3.2 0.4ZM4.5 2L2 5.33333V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V5.33333L15.5 2H4.5Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M0 5C0 4.44772 0.447715 4 1 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }
}), __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M6 8C6.55228 8 7 8.44771 7 9C7 9.79565 7.31607 10.5587 7.87868 11.1213C8.44129 11.6839 9.20435 12 10 12C10.7956 12 11.5587 11.6839 12.1213 11.1213C12.6839 10.5587 13 9.79565 13 9C13 8.44771 13.4477 8 14 8C14.5523 8 15 8.44771 15 9C15 10.3261 14.4732 11.5979 13.5355 12.5355C12.5979 13.4732 11.3261 14 10 14C8.67392 14 7.40215 13.4732 6.46447 12.5355C5.52678 11.5979 5 10.3261 5 9C5 8.44771 5.44772 8 6 8Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppBonusIcon.js":
/*!*********************************************!*\
  !*** ./components/UI/Icons/AppBonusIcon.js ***!
  \*********************************************/
/*! exports provided: AppBonusIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBonusIcon", function() { return AppBonusIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppBonusIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppBonusIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "21",
  height: "15",
  viewBoxWidth: "21",
  viewBoxHeight: "15",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("rect", {
  x: "1",
  y: "1",
  width: "19",
  height: "13",
  rx: "2",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("path", {
  d: "M1 6H20",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppBurgerIcon.js":
/*!**********************************************!*\
  !*** ./components/UI/Icons/AppBurgerIcon.js ***!
  \**********************************************/
/*! exports provided: AppBurgerIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBurgerIcon", function() { return AppBurgerIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppBurgerIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppBurgerIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].WHITE_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "13",
  height: "13",
  viewBoxWidth: "13",
  viewBoxHeight: "13",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("rect", {
  y: "0.0412598",
  width: "15",
  height: "2",
  rx: "1",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("rect", {
  y: "5.04126",
  width: "15",
  height: "2",
  rx: "1",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }
}), __jsx("rect", {
  y: "10.0413",
  width: "15",
  height: "2",
  rx: "1",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 27,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppChevronIcon.js":
/*!***********************************************!*\
  !*** ./components/UI/Icons/AppChevronIcon.js ***!
  \***********************************************/
/*! exports provided: AppChevronIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppChevronIcon", function() { return AppChevronIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppChevronIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppChevronIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "8",
  height: "5",
  viewBoxWidth: "8",
  viewBoxHeight: "6",
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
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppCloseIcon.js":
/*!*********************************************!*\
  !*** ./components/UI/Icons/AppCloseIcon.js ***!
  \*********************************************/
/*! exports provided: AppCloseIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppCloseIcon", function() { return AppCloseIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppCloseIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppCloseIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].WHITE_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "13",
  height: "13",
  viewBoxWidth: "13",
  viewBoxHeight: "13",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("rect", {
  x: "1.90393",
  width: "15",
  height: "2",
  rx: "1",
  transform: "rotate(45 1.90393 0)",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("rect", {
  width: "15",
  height: "2",
  rx: "1",
  transform: "matrix(-0.707107 0.707107 0.707107 0.707107 11.0964 0)",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppCrossIcon.js":
/*!*********************************************!*\
  !*** ./components/UI/Icons/AppCrossIcon.js ***!
  \*********************************************/
/*! exports provided: AppCrossIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppCrossIcon", function() { return AppCrossIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppCrossIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppCrossIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].MAIN_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "14",
  height: "14",
  viewBoxWidth: "14",
  viewBoxHeight: "14",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 5
  }
}, __jsx("rect", {
  y: "5",
  width: "14",
  height: "4",
  rx: "1",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 7
  }
}), __jsx("rect", {
  x: "5",
  y: "14",
  width: "14",
  height: "4",
  rx: "1",
  transform: "rotate(-90 5 14)",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 7
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppEnterIcon.js":
/*!*********************************************!*\
  !*** ./components/UI/Icons/AppEnterIcon.js ***!
  \*********************************************/
/*! exports provided: AppEnterIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppEnterIcon", function() { return AppEnterIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppEnterIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppEnterIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].MAIN_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "10",
  height: "10",
  viewBoxWidth: "10",
  viewBoxHeight: "10",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M6 0.5C6 0.223858 6.22386 0 6.5 0H8.5C8.89782 0 9.27936 0.158035 9.56066 0.43934C9.84196 0.720644 10 1.10217 10 1.5V8.5C10 8.89783 9.84196 9.27936 9.56066 9.56066C9.27936 9.84196 8.89783 10 8.5 10H6.5C6.22386 10 6 9.77614 6 9.5C6 9.22386 6.22386 9 6.5 9H8.5C8.63261 9 8.75978 8.94732 8.85355 8.85355C8.94732 8.75978 9 8.63261 9 8.5V1.5C9 1.36739 8.94732 1.24021 8.85355 1.14645C8.75978 1.05268 8.63261 1 8.5 1H6.5C6.22386 1 6 0.776142 6 0.5Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M3.64645 2.14645C3.84171 1.95118 4.15829 1.95118 4.35355 2.14645L6.85355 4.64645C7.04882 4.84171 7.04882 5.15829 6.85355 5.35355L4.35355 7.85355C4.15829 8.04882 3.84171 8.04882 3.64645 7.85355C3.45118 7.65829 3.45118 7.34171 3.64645 7.14645L5.79289 5L3.64645 2.85355C3.45118 2.65829 3.45118 2.34171 3.64645 2.14645Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }
}), __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M0 5C0 4.72386 0.223858 4.5 0.5 4.5H6.5C6.77614 4.5 7 4.72386 7 5C7 5.27614 6.77614 5.5 6.5 5.5H0.5C0.223858 5.5 0 5.27614 0 5Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppGoodsOnOrderIcon.js":
/*!****************************************************!*\
  !*** ./components/UI/Icons/AppGoodsOnOrderIcon.js ***!
  \****************************************************/
/*! exports provided: AppGoodsOnOrderIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppGoodsOnOrderIcon", function() { return AppGoodsOnOrderIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppGoodsOnOrderIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppGoodsOnOrderIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "24",
  height: "24",
  viewBoxWidth: "24",
  viewBoxHeight: "24",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  d: "M1 5L12 9.34483V23L1 18.6552V5Z",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("path", {
  d: "M1 5L12 1L23 5L12 9.5L1 5Z",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }
}), __jsx("path", {
  d: "M23 5L12 9.34483V23L23 18.6552V5Z",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }
}), __jsx("path", {
  d: "M16.1119 7.92164L17.0336 8.30969L17.8097 6.46642L16.8881 6.07836L16.1119 7.92164ZM6.61194 3.92164L16.1119 7.92164L16.8881 6.07836L7.38806 2.07836L6.61194 3.92164Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 35,
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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const AppIconContainerStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.svg.withConfig({
  displayName: "AppIconContainer__AppIconContainerStyles",
  componentId: "sc-16i2rmc-0"
})(["margin-right:5px"]);
const AppIconContainer = (_ref) => {
  let {
    children
  } = _ref,
      settings = _objectWithoutProperties(_ref, ["children"]);

  const {
    width = 12,
    height = 12,
    viewBoxX = 0,
    viewBoxY = 0,
    viewBoxWidth = 12,
    viewBoxHeight = 12
  } = settings;
  return __jsx(AppIconContainerStyles, {
    width: width,
    height: height,
    viewBox: `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    preserveAspectRatio: "xMidYMid meet",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, children);
};

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
  width: "10",
  height: "14",
  viewBoxWidth: "10",
  viewBoxHeight: "14",
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
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppLogoIcon.js":
/*!********************************************!*\
  !*** ./components/UI/Icons/AppLogoIcon.js ***!
  \********************************************/
/*! exports provided: AppLogoIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppLogoIcon", function() { return AppLogoIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppLogoIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const AppLogoIcon = () => {
  return __jsx("svg", {
    width: "215",
    height: "46",
    viewBox: "0 0 215 46",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 5
    }
  }, __jsx("path", {
    d: "M54.6811 29.2641C54.6811 30.3135 53.7393 30.9324 52.5284 30.9324C51.9365 30.9324 51.2907 30.7709 50.5911 30.4749C49.9184 30.1789 49.3802 29.8022 49.0304 29.3986L47.8195 30.9324C48.1155 31.3898 48.7075 31.8203 49.5685 32.224C50.4565 32.6276 51.3445 32.8159 52.2863 32.8159C53.6048 32.8159 54.7349 32.5199 55.6229 31.9011C56.5108 31.2822 56.9683 30.3673 56.9683 29.1564C56.9683 24.9319 50.4296 26.0889 50.4296 23.5595C50.4296 22.7254 51.183 22.0527 52.367 22.0527C53.524 22.0527 54.5196 22.4563 55.4076 23.2367L56.4301 21.5953C55.4345 20.6535 54.0622 20.1691 52.2594 20.1691C49.8107 20.1691 48.1424 21.5145 48.1424 23.5865C48.1424 27.9994 54.6811 26.8423 54.6811 29.2641Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M68.5842 20.4382V28.995C67.8038 30.0444 66.4315 30.7978 65.113 30.7978C63.0411 30.7978 61.9917 29.587 61.9917 27.1652V20.4382H59.839V27.6496C59.839 31.0938 61.5073 32.8159 64.3058 32.8159C66.1086 32.8159 67.6424 31.928 68.5842 30.8247V32.5469H70.7368V20.4382H68.5842Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M76.7922 37.9285V31.9818C77.6263 32.5469 78.7834 32.8159 80.2095 32.8159C82.0662 32.8159 83.5999 32.1971 84.757 30.9593C85.914 29.7215 86.506 28.1608 86.506 26.3042C86.506 24.5013 85.9948 23.0214 84.9723 21.8912C83.9767 20.7342 82.6043 20.1691 80.9091 20.1691C79.2677 20.1691 77.6532 20.8687 76.7922 21.8643V20.4382H74.6395V37.9285H76.7922ZM80.2902 22.1872C82.7389 22.1872 84.2188 23.8824 84.2188 26.3849C84.2188 28.9681 82.5774 30.7978 80.0212 30.7978C78.8103 30.7978 77.734 30.4749 76.7922 29.856V23.8555C77.6802 22.7523 78.8641 22.1872 80.2902 22.1872Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M99.1438 29.5331C98.2558 30.3673 97.018 30.7978 95.4305 30.7978C93.0356 30.7978 91.3942 29.4255 91.2059 27.1652H100.516C100.597 26.7616 100.651 26.2773 100.651 25.7122C100.651 24.0708 100.112 22.7523 99.0362 21.7298C97.9598 20.6804 96.6144 20.1691 95.0268 20.1691C93.0895 20.1691 91.5557 20.7611 90.4525 21.972C89.3492 23.1559 88.7842 24.6628 88.7842 26.4925C88.7842 28.403 89.3761 29.9368 90.5601 31.0938C91.7441 32.2509 93.3047 32.8159 95.269 32.8159C97.1257 32.8159 98.6594 32.2778 99.8165 31.2284L99.1438 29.5331ZM94.9192 22.1872C96.9911 22.1872 98.3096 23.3981 98.4173 25.4162H91.0714C91.3135 23.5057 92.7666 22.1872 94.9192 22.1872Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M105.724 32.5469V23.9632C106.316 22.8061 107.15 22.2411 108.253 22.2411C108.818 22.2411 109.383 22.4025 109.894 22.6985L110.648 20.6804C110.244 20.3844 109.598 20.2229 108.764 20.2229C107.473 20.2229 106.45 20.7611 105.724 21.8643V20.4382H103.571V32.5469H105.724Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M113.361 22.9945C114.491 22.4025 115.595 22.1065 116.698 22.1065C118.931 22.1065 119.443 23.3443 119.443 25.9275C118.716 25.4162 117.72 25.1471 116.429 25.1471C113.738 25.1471 111.854 26.6002 111.854 28.995C111.854 31.2822 113.334 32.7352 115.568 32.7352C117.209 32.7352 118.501 32.1432 119.443 30.9862V32.5469H121.488V25.1202C121.488 21.8105 120.169 20.1691 116.832 20.1691C115.326 20.1691 113.98 20.5458 112.796 21.2724L113.361 22.9945ZM116.321 30.7978C114.949 30.7978 114.142 30.0713 114.142 28.8874C114.142 27.5958 115.299 26.8962 116.725 26.8962C117.774 26.8962 118.689 27.1652 119.443 27.7034V29.2372C118.555 30.2866 117.532 30.7978 116.321 30.7978Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M127.245 37.9285V31.9818C128.079 32.5469 129.236 32.8159 130.662 32.8159C132.519 32.8159 134.053 32.1971 135.21 30.9593C136.367 29.7215 136.959 28.1608 136.959 26.3042C136.959 24.5013 136.447 23.0214 135.425 21.8912C134.429 20.7342 133.057 20.1691 131.362 20.1691C129.72 20.1691 128.106 20.8687 127.245 21.8643V20.4382H125.092V37.9285H127.245ZM130.743 22.1872C133.192 22.1872 134.672 23.8824 134.672 26.3849C134.672 28.9681 133.03 30.7978 130.474 30.7978C129.263 30.7978 128.187 30.4749 127.245 29.856V23.8555C128.133 22.7523 129.317 22.1872 130.743 22.1872Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M140.502 22.4563V27.9456C140.502 31.1476 141.605 32.7621 144.269 32.7621C145.533 32.7621 146.556 32.4123 147.39 31.7396L146.69 30.0713C146.098 30.5287 145.48 30.744 144.807 30.744C143.381 30.744 142.654 29.7484 142.654 27.7303V22.4563H146.556V20.4382H142.654V17.0747H140.502V20.4382H138.241V22.4563H140.502Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M159.556 29.5331C158.668 30.3673 157.43 30.7978 155.842 30.7978C153.447 30.7978 151.806 29.4255 151.618 27.1652H160.928C161.009 26.7616 161.062 26.2773 161.062 25.7122C161.062 24.0708 160.524 22.7523 159.448 21.7298C158.372 20.6804 157.026 20.1691 155.439 20.1691C153.501 20.1691 151.968 20.7611 150.864 21.972C149.761 23.1559 149.196 24.6628 149.196 26.4925C149.196 28.403 149.788 29.9368 150.972 31.0938C152.156 32.2509 153.717 32.8159 155.681 32.8159C157.538 32.8159 159.071 32.2778 160.228 31.2284L159.556 29.5331ZM155.331 22.1872C157.403 22.1872 158.721 23.3981 158.829 25.4162H151.483C151.725 23.5057 153.178 22.1872 155.331 22.1872Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M171.598 20.4382L166.593 26.2235L172.055 32.5469H174.988L169.203 26.062L174.342 20.4382H171.598ZM166.135 32.5469V13.7112H163.983V32.5469H166.135Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M177.846 22.9945C178.976 22.4025 180.08 22.1065 181.183 22.1065C183.416 22.1065 183.927 23.3443 183.927 25.9275C183.201 25.4162 182.205 25.1471 180.914 25.1471C178.223 25.1471 176.339 26.6002 176.339 28.995C176.339 31.2822 177.819 32.7352 180.053 32.7352C181.694 32.7352 182.986 32.1432 183.927 30.9862V32.5469H185.972V25.1202C185.972 21.8105 184.654 20.1691 181.317 20.1691C179.811 20.1691 178.465 20.5458 177.281 21.2724L177.846 22.9945ZM180.806 30.7978C179.434 30.7978 178.627 30.0713 178.627 28.8874C178.627 27.5958 179.784 26.8962 181.21 26.8962C182.259 26.8962 183.174 27.1652 183.927 27.7034V29.2372C183.039 30.2866 182.017 30.7978 180.806 30.7978Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M188.985 31.0938C188.985 31.928 189.631 32.6276 190.519 32.6276C191.353 32.6276 191.945 31.928 191.945 31.0938C191.945 30.3673 191.299 29.6677 190.519 29.6677C189.631 29.6677 188.985 30.3404 188.985 31.0938Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M197.379 32.5469V23.9632C197.971 22.8061 198.806 22.2411 199.909 22.2411C200.474 22.2411 201.039 22.4025 201.55 22.6985L202.304 20.6804C201.9 20.3844 201.254 20.2229 200.42 20.2229C199.128 20.2229 198.106 20.7611 197.379 21.8643V20.4382H195.227V32.5469H197.379Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M212.847 20.4382V28.995C212.067 30.0444 210.695 30.7978 209.376 30.7978C207.304 30.7978 206.255 29.587 206.255 27.1652V20.4382H204.102V27.6496C204.102 31.0938 205.771 32.8159 208.569 32.8159C210.372 32.8159 211.906 31.928 212.847 30.8247V32.5469H215V20.4382H212.847Z",
    fill: _theme__WEBPACK_IMPORTED_MODULE_1__["THEME"].FONT_COLOR,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M16.5803 8.04126L0 43.5641H4.83356L11.0723 30.1483L22.1417 30.1868L28.3121 43.5641H33.1546L16.5803 8.04126ZM12.3617 26.2645L16.5803 17.3542L20.8137 26.2674L12.3617 26.2645Z",
    fill: "#37BBEB",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }), __jsx("path", {
    d: "M7.63881 21.8568C6.65133 20.9872 6.08141 19.7552 6.06669 18.4582C6.07003 15.9917 8.12173 13.9935 10.6526 13.9918C11.621 13.9924 12.564 14.2939 13.3446 14.8526L15.2536 10.8535C13.8623 10.0451 12.2724 9.61891 10.6526 9.62012C5.64572 9.62501 1.58766 13.5786 1.58097 18.4582C1.52842 20.6965 2.40367 22.8611 4.00896 24.4626L13.7361 33.7858C15.0508 34.9578 15.5494 36.7662 15.0144 38.4226C14.4794 40.0789 13.0078 41.2829 11.2413 41.5096C9.47479 41.7363 7.73359 40.9446 6.77687 39.4797L6.64333 39.2726L4.5583 43.6207C7.2118 45.9833 11.0471 46.5943 14.3345 45.1782C17.6218 43.7622 19.7398 40.5866 19.7332 37.0838C19.7777 34.8299 18.8921 32.6528 17.2749 31.0409L7.63881 21.8568Z",
    fill: "#60D67A",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./components/UI/Icons/AppPercentIcon.js":
/*!***********************************************!*\
  !*** ./components/UI/Icons/AppPercentIcon.js ***!
  \***********************************************/
/*! exports provided: AppPercentIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPercentIcon", function() { return AppPercentIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppPercentIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppPercentIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "20",
  height: "20",
  viewBoxWidth: "20",
  viewBoxHeight: "20",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("circle", {
  cx: "5",
  cy: "5",
  r: "4",
  stroke: color,
  strokeWidth: "2",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}), __jsx("path", {
  d: "M19 15.0001C19 17.2092 17.2091 19.0001 15 19.0001C12.7909 19.0001 11 17.2092 11 15.0001C11 12.791 12.7909 11.0001 15 11.0001C17.2091 11.0001 19 12.791 19 15.0001Z",
  stroke: color,
  strokeWidth: "2",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }
}), __jsx("path", {
  d: "M18.7071 2.70711C19.0976 2.31658 19.0976 1.68342 18.7071 1.29289C18.3166 0.902369 17.6834 0.902369 17.2929 1.29289L18.7071 2.70711ZM1.29289 17.2929C0.902369 17.6834 0.902369 18.3166 1.29289 18.7071C1.68342 19.0976 2.31658 19.0976 2.70711 18.7071L1.29289 17.2929ZM17.2929 1.29289L1.29289 17.2929L2.70711 18.7071L18.7071 2.70711L17.2929 1.29289Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 26,
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
  width: "11.5",
  height: "11.5",
  viewBoxWidth: "11.5",
  viewBoxHeight: "11.5",
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
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppSearchIcon.js":
/*!**********************************************!*\
  !*** ./components/UI/Icons/AppSearchIcon.js ***!
  \**********************************************/
/*! exports provided: AppSearchIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSearchIcon", function() { return AppSearchIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppSearchIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppSearchIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].WHITE_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "23",
  height: "23",
  viewBoxWidth: "23",
  viewBoxHeight: "23",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  d: "M17.5337 16.0018L22.1736 20.6407L20.6407 22.1736L16.0018 17.5337C14.2758 18.9173 12.1289 19.6699 9.91675 19.6667C4.53475 19.6667 0.166748 15.2987 0.166748 9.91675C0.166748 4.53475 4.53475 0.166748 9.91675 0.166748C15.2987 0.166748 19.6667 4.53475 19.6667 9.91675C19.6699 12.1289 18.9173 14.2758 17.5337 16.0018ZM15.3605 15.198C16.7354 13.7841 17.5032 11.8889 17.5001 9.91675C17.5001 5.72641 14.106 2.33341 9.91675 2.33341C5.72641 2.33341 2.33341 5.72641 2.33341 9.91675C2.33341 14.106 5.72641 17.5001 9.91675 17.5001C11.8889 17.5032 13.7841 16.7354 15.198 15.3605L15.3605 15.198Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/AppStarIcon.js":
/*!********************************************!*\
  !*** ./components/UI/Icons/AppStarIcon.js ***!
  \********************************************/
/*! exports provided: AppStarIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppStarIcon", function() { return AppStarIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/AppStarIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppStarIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "20",
  height: "20",
  viewBoxWidth: "22",
  viewBoxHeight: "22",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  d: "M10.0617 2.54623C10.3831 1.67394 11.6169 1.67394 11.9383 2.54623L13.7028 7.33427C13.8427 7.71403 14.1978 7.97199 14.6022 7.98773L19.7011 8.18623C20.63 8.2224 21.0113 9.39575 20.281 9.97102L16.2726 13.1287C15.9546 13.3791 15.819 13.7965 15.929 14.186L17.3159 19.0967C17.5686 19.9914 16.5705 20.7165 15.7977 20.1998L11.5559 17.3633C11.2194 17.1383 10.7806 17.1383 10.4441 17.3633L6.20233 20.1998C5.42955 20.7165 4.43144 19.9914 4.6841 19.0967L6.07097 14.186C6.18097 13.7965 6.04535 13.3791 5.72743 13.1287L1.71898 9.97101C0.988709 9.39574 1.36995 8.2224 2.29889 8.18623L7.39782 7.98773C7.80224 7.97199 8.15729 7.71403 8.29724 7.33427L10.0617 2.54623Z",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon.js":
/*!************************************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon.js ***!
  \************************************************************************/
/*! exports provided: AppBeautyAndHygieneProductsIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBeautyAndHygieneProductsIcon", function() { return AppBeautyAndHygieneProductsIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppBeautyAndHygieneProductsIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "26",
  height: "26",
  viewBoxWidth: "26",
  viewBoxHeight: "26",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M24.8822 14.5491C24.6069 15.4232 24.278 16.4679 24.278 17.2521C24.278 17.9655 24.5483 18.7097 24.8058 19.4187C24.9352 19.775 25.0614 20.1224 25.1485 20.4526C25.7588 22.7675 24.0115 25.2107 21.3206 25.2322L17.7317 25.2317C16.8666 25.2317 15.9473 24.9179 15.2284 24.3185C14.7686 24.8908 14.0692 25.2367 13.3084 25.2367H2.46453C1.10558 25.2367 0 24.1311 0 22.7721V11.6325V11.3368C0 9.05735 1.72829 7.17422 3.94331 6.92817V6.40773C3.94331 5.59238 4.60664 4.92905 5.42199 4.92905H6.40778V2.95742H4.43615C4.16394 2.95742 3.94326 2.73674 3.94326 2.46452V1.47873C3.94326 0.66333 4.60659 0 5.42195 0H10.351C10.9936 0 11.5414 0.412144 11.7449 0.98584H14.2942C14.4249 0.98584 14.5503 1.03781 14.6427 1.13021L15.6285 2.116C15.821 2.3085 15.821 2.6206 15.6285 2.8131C15.5323 2.90934 15.4061 2.95747 15.28 2.95747C15.1539 2.95747 15.0277 2.90934 14.9315 2.8131L14.0901 1.97168H11.8297V2.46457C11.8297 2.73679 11.609 2.95747 11.3368 2.95747H9.36516V4.92915H10.3509C11.1664 4.92915 11.8297 5.59248 11.8297 6.40783V6.92936C12.675 7.02437 13.4826 7.36065 14.144 7.90167C14.7103 8.36495 15.1518 8.96249 15.4311 9.63026C16.0883 9.14862 16.8799 8.88425 17.7254 8.87335L17.7318 8.8733H21.3763L21.3827 8.87335C23.9644 8.90666 25.7707 11.3111 25.1484 13.6628C25.0805 13.9193 24.9851 14.2223 24.8822 14.5491L24.8822 14.5491ZM4.92905 1.47878V1.97168H6.90063H8.87226H10.8439V1.47878C10.8439 1.20702 10.6228 0.985889 10.351 0.985889H5.42195C5.15018 0.985889 4.92905 1.20702 4.92905 1.47878ZM8.37937 4.9291V2.95747H7.39358V4.9291H8.37937ZM5.42195 5.91494C5.15018 5.91494 4.92905 6.13607 4.92905 6.40783V6.90073H10.8438V6.40783C10.8438 6.13607 10.6227 5.91494 10.3509 5.91494H8.87226H6.90063H5.42195ZM5.91484 12.1254H0.98579V20.0119H14.0936C14.1586 19.8166 14.2305 19.618 14.3031 19.4174L14.3031 19.4174L14.3032 19.4174C14.5619 18.7027 14.83 17.9621 14.83 17.2521C14.83 16.4679 14.501 15.423 14.2258 14.549C14.1228 14.2222 14.0275 13.9192 13.9596 13.6627C13.8257 13.1573 13.8014 12.6307 13.8848 12.1206H9.85805C9.58584 12.1206 9.36516 11.9048 9.36516 11.6326C9.36516 11.3604 9.58584 11.1397 9.85805 11.1397H14.1895C14.3137 10.8723 14.4691 10.62 14.6535 10.385C14.2343 8.92433 12.8756 7.88652 11.3367 7.88652H4.43611C2.59982 7.88652 1.09438 9.32858 0.991812 11.1396H5.91484C6.18705 11.1396 6.40774 11.3603 6.40774 11.6325C6.40774 11.9048 6.18705 12.1254 5.91484 12.1254ZM2.46453 24.2509H13.3084C13.8151 24.2509 14.2759 23.9948 14.5456 23.5815C14.0063 22.8221 13.7637 21.9015 13.8596 20.9977H0.98584V22.7722C0.98584 23.5876 1.64917 24.2509 2.46453 24.2509ZM17.7874 24.2514L21.3699 24.251C23.2982 24.226 24.6535 22.4424 24.1952 20.704C24.1197 20.4177 24.005 20.1022 23.8824 19.7649L23.8824 19.7648L23.8824 19.7647C23.6071 19.0075 23.2921 18.1409 23.2921 17.2522C23.2921 16.313 23.6526 15.1701 23.9403 14.2582C24.0401 13.9418 24.1311 13.6532 24.1953 13.4106C24.6545 11.6752 23.2996 9.88085 21.3728 9.8542H17.7351C15.8207 9.88061 14.4496 11.6624 14.9126 13.4104C14.9767 13.6528 15.0676 13.9409 15.1673 14.2568L15.1673 14.2571L15.1673 14.2571C15.4551 15.1692 15.8158 16.3126 15.8158 17.2521C15.8158 18.1388 15.5005 19.0072 15.2254 19.7651C15.1123 20.0767 15.0059 20.3697 14.9311 20.6375C14.4242 22.4461 15.8206 24.2263 17.7381 24.251L17.7874 24.2514ZM7.39368 11.6324C7.39368 11.3604 7.61451 11.1395 7.88657 11.1395C8.15864 11.1395 8.37947 11.3604 8.37947 11.6324C8.37947 11.9045 8.15864 12.1253 7.88657 12.1253C7.61451 12.1253 7.39368 11.9045 7.39368 11.6324ZM23.0708 13.6936L23.0708 13.6935L23.0708 13.6935C23.1478 13.4651 23.2096 13.2816 23.2423 13.1582C23.5472 12.0049 22.5992 10.8609 21.3828 10.8448L21.3762 10.8447H17.7574L17.7512 10.8448C16.4528 10.8611 15.5723 12.0483 15.8658 13.1587C15.9006 13.2895 15.9645 13.4793 16.0433 13.7132L16.0433 13.7132C16.3265 14.5537 16.8016 15.9636 16.8016 17.2515C16.8016 18.5181 16.3606 19.6448 16.0762 20.3713L16.0762 20.3713C15.9813 20.6136 15.9039 20.8114 15.8661 20.955C15.5825 22.0288 16.4005 23.2428 17.7811 23.2604L17.7874 23.2604H17.788H17.7937L21.3568 23.2599C22.6544 23.2436 23.5348 22.0617 23.2423 20.9556C23.1992 20.7919 23.1158 20.5805 23.0158 20.3272C22.7293 19.6008 22.3068 18.5297 22.3068 17.2515C22.3068 15.9604 22.7897 14.5277 23.0708 13.6936ZM21.3426 22.2792L17.7909 22.2796C17.0813 22.269 16.6947 21.6784 16.8194 21.2063C16.8467 21.1027 16.9099 20.9432 16.9916 20.7369C17.2767 20.0173 17.7875 18.7277 17.7875 17.2515C17.7875 15.7918 17.271 14.2668 16.9833 13.417C16.9089 13.1974 16.8498 13.0229 16.8188 12.9062C16.689 12.4153 17.116 11.8354 17.7607 11.8256H21.3727C21.9497 11.8351 22.4274 12.3837 22.2893 12.9061C22.2569 13.0286 22.1958 13.2088 22.1194 13.4341C21.83 14.2876 21.3211 15.7885 21.3211 17.2515C21.3211 18.7281 21.8237 19.996 22.1107 20.7201C22.1946 20.9318 22.2601 21.097 22.2893 21.2074C22.4164 21.6883 22.0049 22.2708 21.3426 22.2792ZM4.92908 16.0685C4.92908 14.4378 6.25579 13.1111 7.8865 13.1111C9.51721 13.1111 10.8439 14.4377 10.8439 16.0685C10.8439 17.6992 9.51721 19.0259 7.8865 19.0259C6.25579 19.0259 4.92908 17.6992 4.92908 16.0685ZM5.91487 16.0685C5.91487 17.1556 6.79932 18.0401 7.8865 18.0401C8.97362 18.0401 9.85808 17.1556 9.85813 16.0685C9.85813 14.9813 8.97367 14.0968 7.8865 14.0968C6.79932 14.0968 5.91487 14.9813 5.91487 16.0685Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppFoodIcon.js":
/*!****************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppFoodIcon.js ***!
  \****************************************************/
/*! exports provided: AppFoodIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppFoodIcon", function() { return AppFoodIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppFoodIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppFoodIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "26",
  height: "23",
  viewBoxWidth: "26",
  viewBoxHeight: "23",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M21.5293 11.2135C21.3825 10.6867 21.1063 10.0812 20.7841 9.37499C19.8771 7.38671 18.6057 4.5996 18.8295 0.520585C18.837 0.385244 18.7883 0.252765 18.6951 0.154246C18.6019 0.0557752 18.4723 0 18.3367 0H6.93483C6.79924 0 6.66957 0.0557752 6.57638 0.154246C6.48319 0.252716 6.43458 0.385195 6.44198 0.520585C6.66579 4.60013 5.38498 7.4072 4.47535 9.40076C4.15808 10.0961 3.88597 10.6925 3.73861 11.2093C2.70825 14.813 4.38911 19.4675 6.74425 22.5133C6.83774 22.6342 6.98191 22.705 7.13473 22.705H18.1373C18.29 22.705 18.4342 22.6342 18.5277 22.5134C20.7693 19.6153 22.5248 14.7702 21.5293 11.2135ZM6.14218 8.10335C7.06765 5.75931 7.50625 3.36789 7.44825 0.987222H17.8231C17.7652 3.36695 18.2036 5.75788 19.1288 8.10222C19.168 8.20153 19.209 8.30167 19.2515 8.40296C17.2207 9.36501 14.9437 9.87172 12.6357 9.87172C10.3278 9.87172 8.05068 9.36501 6.01986 8.40296C6.06187 8.30266 6.10279 8.20301 6.14218 8.10335ZM12.1422 21.7178H7.3794C4.83704 18.3192 4.07834 14.4625 4.56458 11.9934C6.74894 12.832 8.83943 14.462 10.8254 16.0104L10.8254 16.0104C11.2696 16.3567 11.7086 16.699 12.1422 17.0274V21.7178ZM4.83121 11.0387C4.99755 10.5787 5.20466 10.1504 5.4361 9.67256C5.49459 9.55188 5.55407 9.42888 5.61414 9.30291C7.77229 10.3221 10.1886 10.8589 12.6357 10.8589C15.0828 10.8589 17.4991 10.3221 19.6572 9.30296C19.7171 9.42853 19.7763 9.55109 19.8345 9.67133C20.0663 10.1499 20.2735 10.5789 20.4381 11.0394C18.077 11.9281 15.8297 13.6802 13.7982 15.264L13.7981 15.2641C13.4022 15.5727 13.0145 15.875 12.6357 16.1633C12.2548 15.8734 11.8654 15.5699 11.4682 15.2602L11.4682 15.2602C9.43314 13.6738 7.19235 11.927 4.83121 11.0387ZM17.8917 21.7178H13.1293V17.0274C13.5653 16.6971 14.0055 16.354 14.4501 16.0075L14.4501 16.0075C16.4419 14.4551 18.5213 12.8343 20.699 11.9964C21.2859 15.1157 19.7555 19.199 17.8917 21.7178ZM16.5844 2.96155C16.3119 2.96155 16.0908 3.18267 16.0908 3.45513C16.0908 3.72759 16.3119 3.94872 16.5844 3.94872C16.8569 3.94872 17.078 3.72759 17.078 3.45513C17.078 3.18267 16.8569 2.96155 16.5844 2.96155ZM17.2521 5.31716C17.3938 5.97506 17.5751 6.64283 17.791 7.30202C17.8758 7.5611 17.7346 7.83988 17.4755 7.92473C17.2159 8.00972 16.9375 7.86792 16.8528 7.60928C16.6263 6.91761 16.436 6.21638 16.2871 5.52501C16.2296 5.25852 16.3991 4.99598 16.6656 4.93858C16.932 4.88103 17.1947 5.05072 17.2521 5.31716ZM24.778 3.94877H21.7248L22.8565 2.81702C23.0493 2.62428 23.0493 2.31174 22.8565 2.11894C22.6638 1.92615 22.3512 1.9262 22.1585 2.11894L20.1841 4.09329C19.9914 4.28603 19.9914 4.59857 20.1841 4.79137L22.1585 6.76571C22.3512 6.95846 22.6637 6.95846 22.8565 6.76571C23.0493 6.57297 23.0493 6.26043 22.8565 6.06763L21.7248 4.93594H24.778C25.0506 4.93594 25.2716 4.71496 25.2716 4.44235C25.2716 4.16974 25.0506 3.94877 24.778 3.94877ZM3.11315 2.11892L5.08749 4.09327C5.28024 4.28606 5.28024 4.5986 5.08749 4.79135L3.11315 6.76569C2.92035 6.95844 2.60781 6.95844 2.41507 6.76569C2.22232 6.5729 2.22232 6.26036 2.41507 6.06761L3.54681 4.93587H0.493586C0.220979 4.93587 0 4.71489 0 4.44228C0 4.16968 0.220979 3.9487 0.493586 3.9487H3.54681L2.41507 2.817C2.22232 2.62421 2.22227 2.31167 2.41507 2.11892C2.60786 1.92618 2.9204 1.92618 3.11315 2.11892Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppHouseholdProductsIcon.js":
/*!*****************************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppHouseholdProductsIcon.js ***!
  \*****************************************************************/
/*! exports provided: AppHouseholdProductsIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHouseholdProductsIcon", function() { return AppHouseholdProductsIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppHouseholdProductsIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppHouseholdProductsIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "26",
  height: "26",
  viewBoxWidth: "26",
  viewBoxHeight: "26",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M3.4551 0H21.8165C23.7217 0 25.2716 1.54996 25.2716 3.4551V21.8165C25.2716 23.7217 23.7217 25.2716 21.8165 25.2716H3.4551C1.54996 25.2716 0 23.7217 0 21.8165V3.4551C0 1.54996 1.54996 0 3.4551 0ZM21.8165 24.2844C23.1773 24.2844 24.2844 23.1773 24.2844 21.8165V3.4551C24.2844 2.09429 23.1773 0.987172 21.8165 0.987172H3.4551C2.09429 0.987172 0.987172 2.09429 0.987172 3.4551V21.8165C0.987172 23.1773 2.09429 24.2844 3.4551 24.2844H21.8165ZM12.1422 22.8035C12.1422 22.5311 12.3633 22.3099 12.6358 22.3099C12.9083 22.3099 13.1294 22.5311 13.1294 22.8035C13.1294 23.076 12.9083 23.2971 12.6358 23.2971C12.3633 23.2971 12.1422 23.076 12.1422 22.8035ZM21.8165 1.97424H19.546C19.2735 1.97424 19.0524 2.19522 19.0524 2.46783V8.53894C19.0524 9.35543 18.3882 10.0197 17.5717 10.0197H7.69996C6.88347 10.0197 6.21921 9.35543 6.21921 8.53894V2.46783C6.21921 2.19522 5.99818 1.97424 5.72562 1.97424H3.45512C2.63863 1.97424 1.97437 2.63851 1.97437 3.455V21.8164C1.97437 22.6329 2.63863 23.2972 3.45512 23.2972H10.6615C10.934 23.2972 11.1551 23.0762 11.1551 22.8036C11.1551 22.531 10.934 22.31 10.6615 22.31H3.45512C3.18296 22.31 2.96154 22.0886 2.96154 21.8164V3.455C2.96154 3.18284 3.18296 2.96142 3.45512 2.96142H5.23203V8.53894C5.23203 9.89976 6.33915 11.0069 7.69996 11.0069H17.5717C18.9325 11.0069 20.0396 9.89976 20.0396 8.53894V2.96142H21.8165C22.0887 2.96142 22.3101 3.18284 22.3101 3.455V21.8164C22.3101 22.0886 22.0887 22.31 21.8165 22.31H14.6102C14.3376 22.31 14.1166 22.531 14.1166 22.8036C14.1166 23.0762 14.3376 23.2972 14.6102 23.2972H21.8165C22.633 23.2972 23.2973 22.6329 23.2973 21.8164V3.455C23.2973 2.63851 22.633 1.97424 21.8165 1.97424ZM7.70001 1.97424H17.5717C17.8443 1.97424 18.0653 2.19522 18.0653 2.46783V8.53894C18.0653 8.81155 17.8443 9.03252 17.5717 9.03252H7.70001C7.42745 9.03252 7.20642 8.81155 7.20642 8.53894V2.46783C7.20642 2.19522 7.42745 1.97424 7.70001 1.97424ZM13.1295 8.04535H17.0781V7.3911C16.0594 5.94371 14.4098 5.08384 12.6359 5.08384C10.8619 5.08384 9.21235 5.94371 8.19359 7.3911V8.04535H12.1423V6.56459C12.1423 6.29199 12.3633 6.07101 12.6359 6.07101C12.9084 6.07101 13.1295 6.29199 13.1295 6.56459V8.04535ZM12.6359 4.09666C14.3128 4.09666 15.8957 4.74677 17.0781 5.88221V2.96142H8.19359V5.88221C9.37603 4.74677 10.9589 4.09666 12.6359 4.09666ZM8.73246 12.1422H8.68705C7.32623 12.1422 6.21912 13.2493 6.21912 14.6101V19.3486C6.21912 19.8757 6.42455 20.3714 6.79755 20.7445C7.1705 21.1175 7.66626 21.3229 8.19346 21.3229C9.28211 21.3229 10.1678 20.4372 10.1678 19.3486V18.9024C10.1678 17.5951 10.544 16.7001 10.8207 16.0418C10.9005 15.8519 10.9721 15.6816 11.0239 15.5269C11.671 13.9091 10.48 12.1422 8.73246 12.1422ZM9.90921 15.6626L9.90921 15.6626C9.61469 16.3642 9.18063 17.3981 9.18063 18.9024V19.3486C9.18063 19.8929 8.73779 20.3357 8.19346 20.3357C7.92998 20.3357 7.68215 20.233 7.49558 20.0465C7.30905 19.8599 7.20629 19.612 7.20629 19.3486V14.6101C7.20629 13.7937 7.87056 13.1294 8.68705 13.1294H8.73246C9.77531 13.1294 10.4991 14.1807 10.1073 15.1602C10.0594 15.3048 9.9895 15.4714 9.90921 15.6626ZM16.5391 12.1422H16.5845C17.9453 12.1422 19.0524 13.2493 19.0524 14.6101V19.3486C19.0524 19.8757 18.847 20.3714 18.474 20.7445C18.101 21.1175 17.6053 21.3229 17.0781 21.3229C15.9894 21.3229 15.1037 20.4372 15.1037 19.3486V18.9024C15.1037 17.5899 14.7234 16.6873 14.4476 16.0325C14.3686 15.8449 14.2981 15.6777 14.2476 15.527C13.5998 13.9071 14.7939 12.1422 16.5391 12.1422ZM17.7759 20.0465C17.9625 19.8599 18.0652 19.612 18.0652 19.3486V14.6101C18.0652 13.7937 17.401 13.1294 16.5845 13.1294H16.5391C15.4859 13.1294 14.7761 14.1898 15.1642 15.1603C15.2105 15.2999 15.2789 15.4625 15.358 15.6505C15.6511 16.3473 16.0909 17.3925 16.0909 18.9024V19.3486C16.0909 19.8929 16.5337 20.3357 17.0781 20.3357C17.3415 20.3357 17.5894 20.233 17.7759 20.0465Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppMedicalEquipment.js":
/*!************************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppMedicalEquipment.js ***!
  \************************************************************/
/*! exports provided: AppMedicalEquipment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMedicalEquipment", function() { return AppMedicalEquipment; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppMedicalEquipment.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppMedicalEquipment = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "19",
  height: "26",
  viewBoxWidth: "19",
  viewBoxHeight: "26",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M3.4551 0H17.2755C18.092 0 18.7563 0.664268 18.7563 1.48076V24.778C18.7563 25.0506 18.5352 25.2716 18.2627 25.2716H16.2883C16.0158 25.2716 15.7948 25.0506 15.7948 24.778V20.7306H14.314C14.0414 20.7306 13.8204 20.5096 13.8204 20.237V19.2499C13.8204 18.9773 14.0414 18.7563 14.314 18.7563C14.5866 18.7563 14.8076 18.9773 14.8076 19.2499V19.7434H15.7948V2.96152H7.89738V3.94869H10.3653C11.7261 3.94869 12.8332 5.0558 12.8332 6.41662V17.2755C12.8332 18.6363 11.7261 19.7434 10.3653 19.7434H8.39096V20.237C8.39096 21.0535 7.7267 21.7178 6.91021 21.7178V24.778C6.91021 25.0506 6.68918 25.2716 6.41662 25.2716C6.14406 25.2716 5.92303 25.0506 5.92303 24.778V21.7178C5.10654 21.7178 4.44228 21.0535 4.44228 20.237V19.7434H2.46793C1.10711 19.7434 0 18.6363 0 17.2755V6.41662C0 5.0558 1.10711 3.94869 2.46793 3.94869H4.93586V2.96152H2.46793C2.19537 2.96152 1.97434 2.74054 1.97434 2.46793V1.48076C1.97434 0.664268 2.63861 0 3.4551 0ZM6.91021 20.7306C7.18237 20.7306 7.40379 20.5092 7.40379 20.237V19.7434H5.42945V20.237C5.42945 20.5092 5.65087 20.7306 5.92303 20.7306H6.91021ZM4.93586 18.7563H7.89738V18.2627C7.89738 17.9905 7.67595 17.7691 7.40379 17.7691H5.42945C5.15728 17.7691 4.93586 17.9905 4.93586 18.2627V18.7563ZM10.3653 10.8589H11.8461V9.87172H0.987172V17.2755C0.987172 18.092 1.65144 18.7563 2.46793 18.7563H3.94869V18.2627C3.94869 17.4462 4.61296 16.7819 5.42945 16.7819H7.40379C8.22028 16.7819 8.88455 17.4462 8.88455 18.2627V18.7563H10.3653C11.1818 18.7563 11.8461 18.092 11.8461 17.2755V15.7948H10.3653C10.0927 15.7948 9.87172 15.5738 9.87172 15.3012C9.87172 15.0286 10.0927 14.8076 10.3653 14.8076H11.8461V13.8204H11.3525C11.0799 13.8204 10.8589 13.5994 10.8589 13.3268C10.8589 13.0542 11.0799 12.8332 11.3525 12.8332H11.8461V11.8461H10.3653C10.0927 11.8461 9.87172 11.6251 9.87172 11.3525C9.87172 11.0799 10.0927 10.8589 10.3653 10.8589ZM11.8461 6.41662C11.8461 5.60013 11.1818 4.93586 10.3653 4.93586H2.46793C1.65144 4.93586 0.987172 5.60013 0.987172 6.41662V8.88455H11.8461V7.89738H10.3653C10.0927 7.89738 9.87172 7.6764 9.87172 7.40379C9.87172 7.13118 10.0927 6.91021 10.3653 6.91021H11.8461V6.41662ZM5.92303 2.96152V3.94869H6.91021V2.96152H5.92303ZM2.96152 1.97434H15.7948V0.987172H3.4551C3.18294 0.987172 2.96152 1.2086 2.96152 1.48076V1.97434ZM16.7819 0.987172V24.2844H17.7691V1.48076C17.7691 1.2086 17.5477 0.987172 17.2755 0.987172H16.7819ZM7.89746 7.40386C7.89746 7.1314 8.11859 6.91028 8.39105 6.91028C8.66351 6.91028 8.88463 7.1314 8.88463 7.40386C8.88463 7.67632 8.66351 7.89745 8.39105 7.89745C8.11859 7.89745 7.89746 7.67632 7.89746 7.40386Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppMedicinesIcon.js":
/*!*********************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppMedicinesIcon.js ***!
  \*********************************************************/
/*! exports provided: AppMedicinesIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMedicinesIcon", function() { return AppMedicinesIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppMedicinesIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppMedicinesIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "26",
  height: "26",
  viewBoxWidth: "26",
  viewBoxHeight: "26",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M24.548 7.70387L17.5679 0.723869C16.6035 -0.241191 15.0426 -0.241339 14.0775 0.723721L0.723721 14.0775C-0.240845 15.0421 -0.241635 16.603 0.723721 17.5677L7.70382 24.5477C8.66814 25.5126 10.2291 25.5129 11.1942 24.5478L24.5479 11.1941C25.5125 10.2294 25.5133 8.66858 24.548 7.70387ZM23.8499 10.496L10.4961 23.8499C9.91735 24.4287 8.98112 24.4294 8.40209 23.85L1.4217 16.8696C0.842724 16.291 0.842576 15.3546 1.4218 14.7756L14.7755 1.42175C15.3545 0.842774 16.2907 0.842329 16.8697 1.42175L23.85 8.40205C24.429 8.98058 24.4291 9.91696 23.8499 10.496ZM18.8165 5.75729C19.009 5.5643 19.3214 5.5643 19.5144 5.75729C19.7074 5.95028 19.7074 6.26273 19.5144 6.45522C19.3214 6.64817 19.009 6.64817 18.8165 6.45522C18.6235 6.26273 18.6235 5.95028 18.8165 5.75729ZM5.75827 18.8155C5.95077 18.6225 6.2637 18.6225 6.4562 18.8155C6.64919 19.008 6.64919 19.3209 6.4562 19.5134C6.2637 19.7064 5.95077 19.7064 5.75827 19.5134C5.56528 19.3209 5.56528 19.008 5.75827 18.8155ZM19.1654 8.20029C19.9351 7.43059 21.1877 7.43064 21.9576 8.20039C22.729 8.97186 22.7289 10.2209 21.9576 10.9922V10.9922C21.1857 11.7641 19.9371 11.7641 19.1653 10.9922C18.3932 10.2208 18.3937 8.97137 19.1654 8.20029ZM19.8632 10.294C20.2496 10.6805 20.8736 10.6802 21.2596 10.2942C21.6451 9.90869 21.6451 9.28396 21.2596 8.89847C20.8746 8.51352 20.2483 8.51347 19.8633 8.89847C19.4772 9.28425 19.4775 9.90864 19.8632 10.294ZM18.3194 11.8386C17.5495 11.0688 16.297 11.0688 15.5273 11.8385C14.7554 12.6097 14.7551 13.8589 15.5273 14.6311C16.297 15.4002 17.5494 15.4002 18.3192 14.6311L18.3195 14.6307C19.0889 13.8606 19.0889 12.6081 18.3194 11.8386ZM17.6214 13.9329C17.2363 14.3176 16.61 14.3175 16.2252 13.9329C15.8393 13.5471 15.8389 12.9225 16.2252 12.5366C16.6102 12.1516 17.2364 12.1517 17.6214 12.5366C18.0061 12.9213 18.0061 13.5477 17.6214 13.9329ZM11.8396 15.5261C12.6111 14.7539 13.8603 14.7547 14.6318 15.5261C15.401 16.296 15.401 17.5485 14.632 18.3182L14.6317 18.3186C13.8616 19.0879 12.6092 19.088 11.8396 18.3184C11.0698 17.5486 11.0698 16.296 11.8396 15.5261ZM12.5376 17.6203C12.9223 18.0051 13.5485 18.0051 13.9337 17.6205C14.3184 17.2355 14.3184 16.609 13.9337 16.2239C13.5472 15.8375 12.9226 15.8388 12.5378 16.2239C12.1527 16.609 12.1527 17.2354 12.5376 17.6203ZM10.9933 19.1645C10.2222 18.3927 8.97285 18.3923 8.20137 19.1643C7.43157 19.9342 7.43157 21.1868 8.20137 21.9566C8.97107 22.7263 10.2234 22.7263 10.9932 21.9566V21.9566C11.763 21.1868 11.763 19.9342 10.9933 19.1645ZM10.2952 21.2586C9.91036 21.6434 9.28425 21.6434 8.89945 21.2586C8.5145 20.8736 8.5145 20.2473 8.8996 19.8622C9.28509 19.4764 9.90938 19.4762 10.2952 19.8623C10.6801 20.2473 10.6801 20.8737 10.2952 21.2586ZM14.2794 3.31403C15.0491 2.54418 16.3015 2.54433 17.0712 3.31398C17.841 4.08378 17.841 5.3363 17.0714 6.10615C16.2999 6.87817 15.0507 6.87817 14.2792 6.10615C13.5096 5.33645 13.5096 4.08388 14.2794 3.31403ZM16.373 5.40846L16.3731 5.40832C16.7581 5.02337 16.7581 4.39701 16.3731 4.01206C15.9883 3.62721 15.3623 3.62721 14.9774 4.01206C14.5925 4.39696 14.5925 5.02337 14.9774 5.40837C15.3632 5.7944 15.9875 5.79425 16.373 5.40846ZM13.433 6.95214C12.6635 6.18264 11.411 6.18254 10.6406 6.95234C9.87156 7.72208 9.87156 8.97456 10.6408 9.74445C11.4125 10.5161 12.6616 10.5165 13.4332 9.74431C14.2028 8.97446 14.2028 7.72193 13.433 6.95214ZM12.735 9.04642L12.7349 9.04657C12.35 9.43172 11.7254 9.433 11.3389 9.04662C10.9542 8.66158 10.9542 8.03507 11.3386 7.65032C11.7234 7.26581 12.35 7.26502 12.735 7.65017C13.1199 8.03512 13.1199 8.66148 12.735 9.04642ZM6.95311 10.6399C7.72316 9.87039 8.97558 9.87044 9.74538 10.6395C10.5176 11.4118 10.5172 12.661 9.74538 13.4322C8.97548 14.202 7.72301 14.2017 6.95326 13.432C6.18376 12.6625 6.18371 11.41 6.95311 10.6399ZM9.04755 12.734L9.0477 12.7338C9.43393 12.3479 9.43319 11.7233 9.04755 11.3377C8.66255 10.953 8.03594 10.9534 7.65114 11.3379C7.26659 11.7228 7.26649 12.3493 7.65134 12.734C8.03629 13.1189 8.6626 13.1189 9.04755 12.734ZM6.10737 14.2785C5.33555 13.5065 4.08697 13.5065 3.3151 14.2784C2.54378 15.0497 2.54368 16.2987 3.3151 17.0702C4.08485 17.8398 5.33733 17.8401 6.10722 17.0703C6.87894 16.2993 6.87949 15.0498 6.10737 14.2785ZM5.40949 16.372L5.40934 16.3722C5.02439 16.7571 4.39803 16.7571 4.01308 16.3722C3.62759 15.9867 3.6275 15.362 4.01308 14.9764C4.39902 14.5905 5.02311 14.5902 5.40949 14.9766C5.79528 15.362 5.79528 15.9865 5.40949 16.372ZM17.42 7.15352C17.6127 6.96082 17.9253 6.96092 18.118 7.15352C18.3108 7.34631 18.3108 7.65885 18.118 7.8516L7.85213 18.1171C7.65938 18.3098 7.34689 18.3098 7.1541 18.1171C6.9613 17.9243 6.96135 17.6117 7.1541 17.419L17.42 7.15352Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppNonCommodityItemsIcon.js":
/*!*****************************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppNonCommodityItemsIcon.js ***!
  \*****************************************************************/
/*! exports provided: AppNonCommodityItemsIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNonCommodityItemsIcon", function() { return AppNonCommodityItemsIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppNonCommodityItemsIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppNonCommodityItemsIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "26",
  height: "26",
  viewBoxWidth: "26",
  viewBoxHeight: "26",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M0 12.635C0 5.81412 5.82493 0 12.635 0C19.4552 0 25.27 5.8234 25.27 12.635C25.27 19.4559 19.4451 25.27 12.635 25.27C5.81481 25.27 0 19.4466 0 12.635ZM0.987109 12.635C0.987109 18.9488 6.3212 24.2829 12.635 24.2829C18.9488 24.2829 24.2829 18.9488 24.2829 12.635C24.2829 6.3212 18.9488 0.987109 12.635 0.987109C6.3212 0.987109 0.987109 6.3212 0.987109 12.635ZM6.07068 4.59011C6.07068 4.31767 6.29179 4.09656 6.56423 4.09656C6.83668 4.09656 7.05779 4.31767 7.05779 4.59011C7.05779 4.86255 6.83668 5.08367 6.56423 5.08367C6.29179 5.08367 6.07068 4.86255 6.07068 4.59011ZM12.635 2.12231C11.0524 2.12231 9.37831 2.48755 8.04191 3.12438C7.79587 3.24165 7.69139 3.5362 7.80866 3.78224C7.92588 4.02827 8.22033 4.13286 8.46652 4.01549C9.67489 3.43966 11.1943 3.10942 12.635 3.10942C17.7984 3.10942 22.1606 7.47161 22.1606 12.635C22.1606 17.7984 17.7984 22.1606 12.635 22.1606C7.47161 22.1606 3.10942 17.7984 3.10942 12.635C3.10942 10.2765 3.97467 7.95194 5.48337 6.25727C5.66465 6.05367 5.64654 5.7417 5.44295 5.56047C5.23931 5.37913 4.92743 5.39744 4.74615 5.60089C3.07863 7.47393 2.12231 10.0377 2.12231 12.635C2.12231 18.3468 6.91488 23.1477 12.635 23.1477C18.3468 23.1477 23.1477 18.3552 23.1477 12.635C23.1477 6.92322 18.3552 2.12231 12.635 2.12231ZM15.1027 10.1672H18.5576C18.8302 10.1672 19.0512 10.3882 19.0512 10.6607V14.6092C19.0512 14.8817 18.8302 15.1027 18.5576 15.1027H15.1027V18.5576C15.1027 18.8302 14.8817 19.0512 14.6092 19.0512H10.6607C10.3882 19.0512 10.1672 18.8302 10.1672 18.5576V15.1027H6.7123C6.43976 15.1027 6.21875 14.8817 6.21875 14.6092V10.6607C6.21875 10.3882 6.43976 10.1672 6.7123 10.1672H10.1672V6.7123C10.1672 6.43976 10.3882 6.21875 10.6607 6.21875H14.6092C14.8817 6.21875 15.1027 6.43976 15.1027 6.7123V10.1672ZM14.6092 14.1156H18.0641V11.1543H14.6092C14.3366 11.1543 14.1156 10.9333 14.1156 10.6607V7.20586H11.1543V10.6607C11.1543 10.9333 10.9333 11.1543 10.6607 11.1543H7.20586V14.1156H10.6607C10.9333 14.1156 11.1543 14.3366 11.1543 14.6092V18.0641H14.1156V14.6092C14.1156 14.3366 14.3366 14.1156 14.6092 14.1156Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppOpticsIcon.js":
/*!******************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppOpticsIcon.js ***!
  \******************************************************/
/*! exports provided: AppOpticsIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppOpticsIcon", function() { return AppOpticsIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppOpticsIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppOpticsIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "26",
  height: "18",
  viewBoxWidth: "26",
  viewBoxHeight: "18",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12.635 0C12.3624 0 12.1415 0.220964 12.1415 0.493555V3.45488C12.1415 3.72747 12.3624 3.94844 12.635 3.94844C12.9076 3.94844 13.1286 3.72747 13.1286 3.45488V0.493555C13.1286 0.220964 12.9076 0 12.635 0ZM11.0494 7.73474C11.5498 7.51481 12.0832 7.40332 12.6349 7.40332C14.8121 7.40332 16.5834 9.17459 16.5834 11.3518C16.5834 13.5289 14.8121 15.3002 12.6349 15.3002C10.4578 15.3002 8.6865 13.5289 8.6865 11.3518C8.6865 11.3272 8.68655 11.3032 8.68714 11.2786C8.69346 11.0061 8.91906 10.7898 9.192 10.7967C9.46449 10.803 9.68027 11.029 9.67395 11.3015C9.6736 11.3167 9.6736 11.3316 9.67361 11.3468V11.3518C9.67361 12.9846 11.0021 14.3131 12.6349 14.3131C14.2678 14.3131 15.5963 12.9846 15.5963 11.3518C15.5963 9.71888 14.2678 8.39043 12.6349 8.39043C12.2208 8.39043 11.821 8.47389 11.4467 8.63844C11.1971 8.74806 10.9059 8.63474 10.7962 8.3852C10.6865 8.13566 10.7999 7.84446 11.0494 7.73474ZM10.0225 9.02853C9.83004 8.83554 9.51713 8.83554 9.32464 9.02853C9.13166 9.22101 9.13166 9.53393 9.32464 9.72642C9.51713 9.9194 9.83004 9.9194 10.0225 9.72642C10.2155 9.53393 10.2155 9.22101 10.0225 9.02853ZM12.6349 9.87109C11.8185 9.87109 11.1543 10.5353 11.1543 11.3518C11.1543 12.1682 11.8185 12.8324 12.6349 12.8324C13.4514 12.8324 14.1156 12.1682 14.1156 11.3518C14.1156 10.5353 13.4514 9.87109 12.6349 9.87109ZM12.6349 11.8453C12.3628 11.8453 12.1414 11.6239 12.1414 11.3518C12.1414 11.0796 12.3628 10.8582 12.6349 10.8582C12.9071 10.8582 13.1285 11.0796 13.1285 11.3518C13.1285 11.6239 12.9071 11.8453 12.6349 11.8453ZM5.02737 1.56545L7.12103 3.6591C7.31377 3.85189 7.31377 4.1644 7.12103 4.35714C6.9283 4.54992 6.61573 4.54987 6.423 4.35714L4.32934 2.26348C4.13661 2.0707 4.13661 1.75818 4.32934 1.56545C4.52212 1.37272 4.83464 1.37272 5.02737 1.56545ZM20.9406 1.56545C20.7479 1.37272 20.4353 1.37272 20.2426 1.56545L18.1489 3.6591C17.9562 3.85184 17.9562 4.16436 18.1489 4.35714C18.3416 4.54987 18.6542 4.54992 18.8469 4.35714L20.9406 2.26348C21.1333 2.07075 21.1333 1.75823 20.9406 1.56545ZM12.635 4.93555C17.3556 4.93555 22.011 7.88656 25.1463 11.4362C25.3268 11.6404 25.3074 11.9524 25.1031 12.1328C24.8982 12.3138 24.5863 12.2933 24.4065 12.0896C24.3013 11.9706 24.1936 11.8519 24.0844 11.734C21.6455 15.419 17.2244 17.768 12.635 17.768C8.04555 17.768 3.62439 15.419 1.18549 11.734C1.07636 11.8519 0.96862 11.9705 0.863444 12.0896C0.68305 12.2939 0.371123 12.3133 0.166791 12.1328C-0.0374909 11.9524 -0.0568383 11.6405 0.123605 11.4362C3.25832 7.8873 7.91367 4.93555 12.635 4.93555ZM1.89083 11.0073C4.12258 14.5264 8.29588 16.7809 12.635 16.7809C16.9741 16.7809 21.1474 14.5264 23.3791 11.0072C21.6207 9.28421 17.5577 5.92266 12.635 5.92266C7.7123 5.92266 3.64926 9.28421 1.89083 11.0073Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppProductsForMotherAndBabyIcon.js":
/*!************************************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppProductsForMotherAndBabyIcon.js ***!
  \************************************************************************/
/*! exports provided: AppProductsForMotherAndBabyIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppProductsForMotherAndBabyIcon", function() { return AppProductsForMotherAndBabyIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppProductsForMotherAndBabyIcon.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const AppProductsForMotherAndBabyIcon = ({
  color = _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR
}) => __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
  width: "13",
  height: "26",
  viewBoxWidth: "13",
  viewBoxHeight: "26",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 3
  }
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10.8589 11.3525V11.8957C11.984 12.1249 12.8332 13.1222 12.8332 14.314V22.8037C12.8332 24.1645 11.7261 25.2716 10.3653 25.2716H2.46793C1.10711 25.2716 0 24.1645 0 22.8037V14.314C0 13.1222 0.849264 12.125 1.97434 11.8957V11.3525C1.97434 10.709 2.38703 10.1604 2.96152 9.95662V8.88455H2.4087C1.59221 8.88455 0.927942 8.22028 0.927942 7.40379C0.927942 6.58557 1.59068 5.92303 2.4087 5.92303H3.1552C3.59094 5.10827 4.02287 4.54455 4.34682 4.12248C4.74465 3.60417 4.93586 3.34187 4.93586 3.04641V1.48076C4.93586 0.664268 5.60013 0 6.41662 0C7.23311 0 7.89738 0.664268 7.89738 1.48076V3.04641C7.89738 3.34187 8.08859 3.60417 8.48642 4.12248C8.81036 4.54455 9.2423 5.10822 9.67804 5.92303H10.3653C11.1818 5.92303 11.8461 6.5873 11.8461 7.40379C11.8461 8.22191 11.1834 8.88455 10.3653 8.88455H9.87172V9.95662C10.4462 10.1604 10.8589 10.709 10.8589 11.3525ZM5.92303 3.04641C5.92303 3.69015 5.57303 4.14617 5.12994 4.72347C4.8826 5.04578 4.59287 5.42367 4.29035 5.92308H8.54284C8.24037 5.42372 7.95064 5.04583 7.7033 4.72352L7.70324 4.72345C7.26018 4.14613 6.91021 3.69012 6.91021 3.04641V1.48076C6.91021 1.2086 6.68878 0.987172 6.41662 0.987172C6.14446 0.987172 5.92303 1.2086 5.92303 1.48076V3.04641ZM1.91511 7.40379C1.91511 7.67596 2.13654 7.89738 2.4087 7.89738H10.3653C10.6378 7.89738 10.8589 7.67625 10.8589 7.40379C10.8589 7.13163 10.6375 6.91021 10.3653 6.91021H2.4087C2.13619 6.91021 1.91511 7.13128 1.91511 7.40379ZM8.88455 9.87172V8.88455H3.94869V9.87172H8.88455ZM8.39096 22.3101H11.8461V14.314C11.8461 13.4975 11.1818 12.8332 10.3653 12.8332C10.0927 12.8332 9.87172 12.6122 9.87172 12.3397V11.3525C9.87172 11.0803 9.6503 10.8589 9.37814 10.8589H3.4551C3.18294 10.8589 2.96152 11.0803 2.96152 11.3525V12.3397C2.96152 12.6122 2.74054 12.8332 2.46793 12.8332C1.65144 12.8332 0.987172 13.4975 0.987172 14.314V22.3101H4.44228C4.71488 22.3101 4.93586 22.5311 4.93586 22.8037C4.93586 23.0762 4.71488 23.2973 4.44228 23.2973H1.07207C1.27582 23.8717 1.82449 24.2844 2.46793 24.2844H10.3653C11.0087 24.2844 11.5574 23.8668 11.7612 23.2923H8.39096C8.11841 23.2923 7.89738 23.0762 7.89738 22.8037C7.89738 22.5311 8.11841 22.3101 8.39096 22.3101ZM6.41665 13.623C4.51151 13.623 2.96155 15.173 2.96155 17.0781C2.96155 18.9833 4.51151 20.5333 6.41665 20.5333C8.32179 20.5333 9.87175 18.9833 9.87175 17.0781C9.87175 15.173 8.32179 13.623 6.41665 13.623ZM6.41665 19.5461C5.05583 19.5461 3.94872 18.439 3.94872 17.0781C3.94872 15.7173 5.05583 14.6102 6.41665 14.6102C7.77747 14.6102 8.88458 15.7173 8.88458 17.0781C8.88458 18.439 7.77747 19.5461 6.41665 19.5461ZM6.41656 22.3101C6.1441 22.3101 5.92297 22.5312 5.92297 22.8036C5.92297 23.0761 6.1441 23.2972 6.41656 23.2972C6.68902 23.2972 6.91015 23.0761 6.91015 22.8036C6.91015 22.5312 6.68902 22.3101 6.41656 22.3101Z",
  fill: color,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./components/UI/StyledNativeComponents/StyledLink.js":
/*!************************************************************!*\
  !*** ./components/UI/StyledNativeComponents/StyledLink.js ***!
  \************************************************************/
/*! exports provided: StyledLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledLink", function() { return StyledLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./theme.js");



const StyledLink = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.a.withConfig({
  displayName: "StyledLink",
  componentId: "sc-1mkwfjv-0"
})(["cursor:pointer;color:", ";&:hover{color:", ";text-decoration:none;}"], _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR, _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].FONT_COLOR);

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
  }), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
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
      lineNumber: 18,
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
      lineNumber: 22,
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
      lineNumber: 27,
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
      lineNumber: 33,
      columnNumber: 9
    }
  })), __jsx(_components_Navigation_Header_Header__WEBPACK_IMPORTED_MODULE_3__["Header"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }), __jsx("main", {
    role: "main",
    className: "jsx-1776405742",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }
  }, children), __jsx(_components_Navigation_Footer_Footer__WEBPACK_IMPORTED_MODULE_4__["Footer"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1776405742",
    __self: undefined
  }, "@font-face{font-family:'Circe';src:url('/fonts/Circe-Light.eot');src:url('/fonts/Circe-Light.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Light.woff2') format('woff2'), url('/fonts/Circe-Light.woff') format('woff'), url('/fonts/Circe-Light.ttf') format('truetype');font-weight:300;font-style:normal;}@font-face{font-family:'Circe Extra';src:url('/fonts/Circe-ExtraBold.eot');src:url('/fonts/Circe-ExtraBold.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-ExtraBold.woff2') format('woff2'), url('/fonts/Circe-ExtraBold.woff') format('woff'), url('/fonts/Circe-ExtraBold.ttf') format('truetype');font-weight:800;font-style:normal;}@font-face{font-family:'Circe';src:url('/fonts/Circe-Thin.eot');src:url('/fonts/Circe-Thin.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Thin.woff2') format('woff2'), url('/fonts/Circe-Thin.woff') format('woff'), url('/fonts/Circe-Thin.ttf') format('truetype');font-weight:100;font-style:normal;}@font-face{font-family:'Circe';src:url('/fonts/Circe-Regular.eot');src:url('/fonts/Circe-Regular.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Regular.woff2') format('woff2'), url('/fonts/Circe-Regular.woff') format('woff'), url('/fonts/Circe-Regular.ttf') format('truetype');font-weight:normal;font-style:normal;}@font-face{font-family:'Circe';src:url('/fonts/Circe-Bold.eot');src:url('/fonts/Circe-Bold.eot?#iefix') format('embedded-opentype'), url('/fonts/Circe-Bold.woff2') format('woff2'), url('/fonts/Circe-Bold.woff') format('woff'), url('/fonts/Circe-Bold.ttf') format('truetype');font-weight:bold;font-style:normal;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWtzaW1taW5jZW5rby9QaHBzdG9ybVByb2plY3RzL3NsaW0ueHBweC9yL0tOT1dMRURHRS9KUy9fX0pPQl9fL3N1cGVyLWFwdGVrYS9sYXlvdXQvTWFpbkxheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQ21CLEFBRytCLEFBV00sQUFXTixBQVdBLEFBV0Esb0JBM0NjLEFBc0JELEFBV0csQUFXSCxNQWpDSywyQkFlYSxBQXNCQSxDQTVDQyxFQWlDRSxRQXRCRSx3TUFZeEMsQUFzQkMsS0E1Q0QsVUFpQ0csQ0FWRCxDQXNCQSxJQTVDQSxVQVVGLEdBYWxCLEFBVW9CLENBWXBCLElBNUNBLFFBVW9CLEtBdUJwQixhQXRCQSIsImZpbGUiOiIvVXNlcnMvbWFrc2ltbWluY2Vua28vUGhwc3Rvcm1Qcm9qZWN0cy9zbGltLnhwcHgvci9LTk9XTEVER0UvSlMvX19KT0JfXy9zdXBlci1hcHRla2EvbGF5b3V0L01haW5MYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmltcG9ydCB7IEhlYWRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9IZWFkZXIvSGVhZGVyJ1xuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9OYXZpZ2F0aW9uL0Zvb3Rlci9Gb290ZXInXG5cbmV4cG9ydCBjb25zdCBNYWluTGF5b3V0ID0gKHsgY2hpbGRyZW4sIHRpdGxlIH0pID0+IHtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPnsgdGl0bGUgfTwvdGl0bGU+XG4gICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cImluaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGhcIi8+XG5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuXG4gICAgICAgIDxzY3JpcHRcbiAgICAgICAgICBzcmM9XCJodHRwczovL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy40LjEuc2xpbS5taW4uanNcIlxuICAgICAgICAgIGludGVncml0eT1cInNoYTM4NC1KNnFhNDg0OWJsRTIrcG9UNFdueUtodjV2WkY1U3JQbzBpRWp3QnZLVTdpbUdGQVYwd3dqMXlZZm9SU0pvWituXCJcbiAgICAgICAgICBjcm9zc09yaWdpbj1cImFub255bW91c1wiPjwvc2NyaXB0PlxuICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgc3JjPVwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9wb3BwZXIuanNAMS4xNi4wL2Rpc3QvdW1kL3BvcHBlci5taW4uanNcIlxuICAgICAgICAgIGludGVncml0eT1cInNoYTM4NC1RNkU5Ukh2Ykl5WkZKb2Z0KzJtSmJIYUVXbGRsdkk5SU9ZeTVuM3pWOXp6VHRtSTNVa3NkUVJWdm94TWZvb0FvXCJcbiAgICAgICAgICBjcm9zc09yaWdpbj1cImFub255bW91c1wiPjwvc2NyaXB0PlxuXG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vc3RhY2twYXRoLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuNC4xL2Nzcy9ib290c3RyYXAubWluLmNzc1wiXG4gICAgICAgICAgaW50ZWdyaXR5PVwic2hhMzg0LVZrb284eDRDR3NPMytIaHh2OFQvUTVQYVh0a0t0dTZ1ZzVUT2VOVjZnQmlGZVdQR0ZOOU11aE9mMjNROUlmamhcIlxuICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHNjcmlwdFxuICAgICAgICAgIHNyYz1cImh0dHBzOi8vc3RhY2twYXRoLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuNC4xL2pzL2Jvb3RzdHJhcC5taW4uanNcIlxuICAgICAgICAgIGludGVncml0eT1cInNoYTM4NC13ZlNERjJFNTBZMkQxdVVkajBPM3VNQkpuanVVRDRJaDdZd2FZZDFpcWZrdGowVW9kOEdDRXhsM09nOGlmd0I2XCJcbiAgICAgICAgICBjcm9zc09yaWdpbj1cImFub255bW91c1wiXG4gICAgICAgID48L3NjcmlwdD5cbiAgICAgIDwvSGVhZD5cblxuICAgICAgPEhlYWRlciAvPlxuXG4gICAgICA8bWFpbiByb2xlPVwibWFpblwiPlxuICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgIDwvbWFpbj5cblxuICAgICAgPEZvb3RlciAvPlxuXG4gICAgICA8c3R5bGUganN4PnsgYFxuICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ0NpcmNlJztcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLUxpZ2h0LmVvdCcpO1xuICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2UtTGlnaHQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtTGlnaHQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLUxpZ2h0LndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtTGlnaHQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdDaXJjZSBFeHRyYSc7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1FeHRyYUJvbGQuZW90Jyk7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1FeHRyYUJvbGQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtRXh0cmFCb2xkLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1FeHRyYUJvbGQud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1FeHRyYUJvbGQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdDaXJjZSc7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1UaGluLmVvdCcpO1xuICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2UtVGhpbi5lb3Q/I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1UaGluLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1UaGluLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtVGhpbi50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIH1cblxuICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ0NpcmNlJztcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLVJlZ3VsYXIuZW90Jyk7XG4gICAgICAgICAgc3JjOiB1cmwoJy9mb250cy9DaXJjZS1SZWd1bGFyLmVvdD8jaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLVJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLVJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgICAgICB1cmwoJy9mb250cy9DaXJjZS1SZWd1bGFyLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcbiAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnQ2lyY2UnO1xuICAgICAgICAgIHNyYzogdXJsKCcvZm9udHMvQ2lyY2UtQm9sZC5lb3QnKTtcbiAgICAgICAgICBzcmM6IHVybCgnL2ZvbnRzL0NpcmNlLUJvbGQuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtQm9sZC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICAgICAgdXJsKCcvZm9udHMvQ2lyY2UtQm9sZC53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgICAgIHVybCgnL2ZvbnRzL0NpcmNlLUJvbGQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgfVxuICAgICAgYCB9PC9zdHlsZT5cbiAgICA8Lz5cbiAgKVxufVxuIl19 */\n/*@ sourceURL=/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/layout/MainLayout.js */"));
};

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

var _router2 = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: (0, _router2.addBasePath)(formatUrl(href)),
        as: asHref ? (0, _router2.addBasePath)(formatUrl(asHref)) : asHref
      };
    });

    this.linkClicked = e => {
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    var resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      var isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "../next-server/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

const basePath =  false || '';

function addBasePath(path) {
  return path.indexOf(basePath) !== 0 ? basePath + path : path;
}

exports.addBasePath = addBasePath;

function delBasePath(path) {
  return path.indexOf(basePath) === 0 ? path.substr(basePath.length) || '/' : path;
}

exports.delBasePath = delBasePath;

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch(utils_1.formatWithValidation({
      pathname: addBasePath( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${delBasePath(pathname)}.json`),
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && url_1.parse(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = url_1.parse(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      let url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as;
      url = addBasePath(url);
      as = addBasePath(as); // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, as, options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, as, options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo);

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      const route = delBasePath(toRoute(pathname));
      Promise.all([this.pageLoader.prefetchData(url, delBasePath(asPath)), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    route = delBasePath(route);
    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = escapeRegex(normalizedRoute.replace(/\/$/, '') || '/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  let namedParameterizedRoute; // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    namedParameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
      const isCatchAll = /^(\\\.){3}/.test($1);
      const key = $1 // Un-escape key
      .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '');
      return isCatchAll ? `/(?<${escapeRegex(key)}>.+?)` : `/(?<${escapeRegex(key)}>[^/]+?)`;
    });
  }

  return Object.assign({
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  }, namedParameterizedRoute ? {
    namedRegex: `^${namedParameterizedRoute}(?:/)?$`
  } : {});
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


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
  albums
}) => __jsx(_layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__["MainLayout"], {
  title: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 3
  }
}, __jsx("div", {
  className: "container",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 5
  }
}, __jsx("div", {
  className: "row",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 7
  }
}, __jsx("div", {
  className: "d-flex flex-wrap justify-content-between mt-4",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 9
  }
}, albums.map(album => __jsx("div", {
  className: "card text-white bg-primary mb-3",
  style: {
    width: '18rem'
  },
  key: album.id,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 13
  }
}, __jsx("img", {
  className: "card-img-top",
  src: album.url,
  alt: "Card image cap",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 15
  }
}), __jsx("div", {
  className: "card-body",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 15
  }
}, __jsx("p", {
  className: "card-text",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 17
  }
}, album.title))))))));

async function getStaticProps() {
  const res = await isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default()('https://jsonplaceholder.typicode.com/albums/1/photos');
  const albums = await res.json();
  return {
    props: {
      albums
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
  BACKGROUND_COLOR: '#F7F8FA',
  MAIN_COLOR: '#60D67A',
  WHITE_COLOR: '#FFFFFF',
  FONT_COLOR: '#3C3E3F',
  LABEL_FONT_COLOR: '#B8BFC9',
  LEFT_MENU_ICON_COLOR: '#9399A1'
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

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

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

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map