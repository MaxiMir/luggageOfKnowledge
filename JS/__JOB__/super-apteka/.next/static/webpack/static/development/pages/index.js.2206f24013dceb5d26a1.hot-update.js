webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Navigation/Header/HeaderMainNav/HeaderMainNav.js":
/*!*********************************************************************!*\
  !*** ./components/Navigation/Header/HeaderMainNav/HeaderMainNav.js ***!
  \*********************************************************************/
/*! exports provided: HeaderMainNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderMainNav", function() { return HeaderMainNav; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
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
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderMainNav/HeaderMainNav.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;












var LeftMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuStyles",
  componentId: "sc-1plnt9j-0"
})(["padding:15px;background-color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_11__["THEME"].BACKGROUND_COLOR);
var RightMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__RightMenuStyles",
  componentId: "sc-1plnt9j-1"
})([""]);
var LeftMenuLinkContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuLinkContainer",
  componentId: "sc-1plnt9j-2"
})(["width:200px;min-height:60px;padding:0 15px;&:hover{background-color:", ";color:", ";}"], _theme__WEBPACK_IMPORTED_MODULE_11__["THEME"].WHITE_COLOR, _theme__WEBPACK_IMPORTED_MODULE_11__["THEME"].MAIN_COLOR);
var IconContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__IconContainer",
  componentId: "sc-1plnt9j-3"
})(["width:44px;"]);
var HeaderMainNav = function HeaderMainNav() {
  var leftMenuLinksData = [{
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
  var leftMenuLinks = leftMenuLinksData.map(function (_ref, id) {
    var name = _ref.name,
        href = _ref.href,
        IconComponent = _ref.IconComponent;
    return __jsx(LeftMenuLinkContainer, {
      key: id,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 5
      }
    }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
      href: href,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 7
      }
    }, __jsx(IconContainer, {
      className: "d-flex justify-content-center align-items-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }
    }, __jsx(IconComponent, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 11
      }
    })), __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }
    }, name)));
  });
  return __jsx("div", {
    className: "container-fluid",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }, __jsx(LeftMenuStyles, {
    className: "col-3 flex-column justify-content-end align-items-end",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 9
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: "/catalog/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 11
    }
  }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"), leftMenuLinks), __jsx(RightMenuStyles, {
    className: "col-9",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 9
    }
  })));
};

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppProductsForMotherAndBabyIcon.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var AppProductsForMotherAndBabyIcon = function AppProductsForMotherAndBabyIcon(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR : _ref$color;
  return __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
    width: "13",
    height: "26",
    viewBoxWidth: "13",
    viewBoxHeight: "26",
    __self: _this,
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
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }));
};

/***/ })

})
//# sourceMappingURL=index.js.2206f24013dceb5d26a1.hot-update.js.map