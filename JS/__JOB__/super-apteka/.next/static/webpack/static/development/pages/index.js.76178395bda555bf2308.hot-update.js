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
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
/* harmony import */ var _UI_Icons_Catalog_AppFoodIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppFoodIcon */ "./components/UI/Icons/Catalog/AppFoodIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppBeautyAndHygieneProductsIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon */ "./components/UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon.js");
/* harmony import */ var _UI_Icons_Catalog_AppHouseholdProductsIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppHouseholdProductsIcon */ "./components/UI/Icons/Catalog/AppHouseholdProductsIcon.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderMainNav/HeaderMainNav.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











var LeftMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuStyles",
  componentId: "sc-1plnt9j-0"
})(["padding:15px;background-color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_7__["THEME"].BACKGROUND_COLOR);
var RightMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__RightMenuStyles",
  componentId: "sc-1plnt9j-1"
})([""]);
var LeftMenuLinkContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuLinkContainer",
  componentId: "sc-1plnt9j-2"
})(["width:200px;min-height:60px;padding:0 15px;&:hover{background-color:", ";color:", ";}"], _theme__WEBPACK_IMPORTED_MODULE_7__["THEME"].WHITE_COLOR, _theme__WEBPACK_IMPORTED_MODULE_7__["THEME"].MAIN_COLOR);
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
    IconComponent: _UI_Icons_Catalog_AppFoodIcon__WEBPACK_IMPORTED_MODULE_8__["AppFoodIcon"]
  }, {
    name: 'Средства для красоты и гигиены',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppBeautyAndHygieneProductsIcon__WEBPACK_IMPORTED_MODULE_9__["AppBeautyAndHygieneProductsIcon"]
  }, {
    name: 'Товары для дома и сопутствующие',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppHouseholdProductsIcon__WEBPACK_IMPORTED_MODULE_10__["AppHouseholdProductsIcon"]
  }, {
    name: 'Товары для матери и ребенка',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
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
        lineNumber: 52,
        columnNumber: 5
      }
    }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
      href: href,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 7
      }
    }, __jsx(IconContainer, {
      className: "d-flex justify-content-center align-items-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 9
      }
    }, __jsx(IconComponent, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }
    })), __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }
    }, name)));
  });
  return __jsx("div", {
    className: "container-fluid",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }
  }, __jsx(LeftMenuStyles, {
    className: "col-3 flex-column justify-content-end align-items-end",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 9
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: "/catalog/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 11
    }
  }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"), leftMenuLinks), __jsx(RightMenuStyles, {
    className: "col-9",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 9
    }
  })));
};

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppHouseholdProductsIcon.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var AppHouseholdProductsIcon = function AppHouseholdProductsIcon(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR : _ref$color;
  return __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
    width: "26",
    height: "26",
    viewBoxWidth: "26",
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
    d: "M3.4551 0H21.8165C23.7217 0 25.2716 1.54996 25.2716 3.4551V21.8165C25.2716 23.7217 23.7217 25.2716 21.8165 25.2716H3.4551C1.54996 25.2716 0 23.7217 0 21.8165V3.4551C0 1.54996 1.54996 0 3.4551 0ZM21.8165 24.2844C23.1773 24.2844 24.2844 23.1773 24.2844 21.8165V3.4551C24.2844 2.09429 23.1773 0.987172 21.8165 0.987172H3.4551C2.09429 0.987172 0.987172 2.09429 0.987172 3.4551V21.8165C0.987172 23.1773 2.09429 24.2844 3.4551 24.2844H21.8165ZM12.1422 22.8035C12.1422 22.5311 12.3633 22.3099 12.6358 22.3099C12.9083 22.3099 13.1294 22.5311 13.1294 22.8035C13.1294 23.076 12.9083 23.2971 12.6358 23.2971C12.3633 23.2971 12.1422 23.076 12.1422 22.8035ZM21.8165 1.97424H19.546C19.2735 1.97424 19.0524 2.19522 19.0524 2.46783V8.53894C19.0524 9.35543 18.3882 10.0197 17.5717 10.0197H7.69996C6.88347 10.0197 6.21921 9.35543 6.21921 8.53894V2.46783C6.21921 2.19522 5.99818 1.97424 5.72562 1.97424H3.45512C2.63863 1.97424 1.97437 2.63851 1.97437 3.455V21.8164C1.97437 22.6329 2.63863 23.2972 3.45512 23.2972H10.6615C10.934 23.2972 11.1551 23.0762 11.1551 22.8036C11.1551 22.531 10.934 22.31 10.6615 22.31H3.45512C3.18296 22.31 2.96154 22.0886 2.96154 21.8164V3.455C2.96154 3.18284 3.18296 2.96142 3.45512 2.96142H5.23203V8.53894C5.23203 9.89976 6.33915 11.0069 7.69996 11.0069H17.5717C18.9325 11.0069 20.0396 9.89976 20.0396 8.53894V2.96142H21.8165C22.0887 2.96142 22.3101 3.18284 22.3101 3.455V21.8164C22.3101 22.0886 22.0887 22.31 21.8165 22.31H14.6102C14.3376 22.31 14.1166 22.531 14.1166 22.8036C14.1166 23.0762 14.3376 23.2972 14.6102 23.2972H21.8165C22.633 23.2972 23.2973 22.6329 23.2973 21.8164V3.455C23.2973 2.63851 22.633 1.97424 21.8165 1.97424ZM7.70001 1.97424H17.5717C17.8443 1.97424 18.0653 2.19522 18.0653 2.46783V8.53894C18.0653 8.81155 17.8443 9.03252 17.5717 9.03252H7.70001C7.42745 9.03252 7.20642 8.81155 7.20642 8.53894V2.46783C7.20642 2.19522 7.42745 1.97424 7.70001 1.97424ZM13.1295 8.04535H17.0781V7.3911C16.0594 5.94371 14.4098 5.08384 12.6359 5.08384C10.8619 5.08384 9.21235 5.94371 8.19359 7.3911V8.04535H12.1423V6.56459C12.1423 6.29199 12.3633 6.07101 12.6359 6.07101C12.9084 6.07101 13.1295 6.29199 13.1295 6.56459V8.04535ZM12.6359 4.09666C14.3128 4.09666 15.8957 4.74677 17.0781 5.88221V2.96142H8.19359V5.88221C9.37603 4.74677 10.9589 4.09666 12.6359 4.09666ZM8.73246 12.1422H8.68705C7.32623 12.1422 6.21912 13.2493 6.21912 14.6101V19.3486C6.21912 19.8757 6.42455 20.3714 6.79755 20.7445C7.1705 21.1175 7.66626 21.3229 8.19346 21.3229C9.28211 21.3229 10.1678 20.4372 10.1678 19.3486V18.9024C10.1678 17.5951 10.544 16.7001 10.8207 16.0418C10.9005 15.8519 10.9721 15.6816 11.0239 15.5269C11.671 13.9091 10.48 12.1422 8.73246 12.1422ZM9.90921 15.6626L9.90921 15.6626C9.61469 16.3642 9.18063 17.3981 9.18063 18.9024V19.3486C9.18063 19.8929 8.73779 20.3357 8.19346 20.3357C7.92998 20.3357 7.68215 20.233 7.49558 20.0465C7.30905 19.8599 7.20629 19.612 7.20629 19.3486V14.6101C7.20629 13.7937 7.87056 13.1294 8.68705 13.1294H8.73246C9.77531 13.1294 10.4991 14.1807 10.1073 15.1602C10.0594 15.3048 9.9895 15.4714 9.90921 15.6626ZM16.5391 12.1422H16.5845C17.9453 12.1422 19.0524 13.2493 19.0524 14.6101V19.3486C19.0524 19.8757 18.847 20.3714 18.474 20.7445C18.101 21.1175 17.6053 21.3229 17.0781 21.3229C15.9894 21.3229 15.1037 20.4372 15.1037 19.3486V18.9024C15.1037 17.5899 14.7234 16.6873 14.4476 16.0325C14.3686 15.8449 14.2981 15.6777 14.2476 15.527C13.5998 13.9071 14.7939 12.1422 16.5391 12.1422ZM17.7759 20.0465C17.9625 19.8599 18.0652 19.612 18.0652 19.3486V14.6101C18.0652 13.7937 17.401 13.1294 16.5845 13.1294H16.5391C15.4859 13.1294 14.7761 14.1898 15.1642 15.1603C15.2105 15.2999 15.2789 15.4625 15.358 15.6505C15.6511 16.3473 16.0909 17.3925 16.0909 18.9024V19.3486C16.0909 19.8929 16.5337 20.3357 17.0781 20.3357C17.3415 20.3357 17.5894 20.233 17.7759 20.0465Z",
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
//# sourceMappingURL=index.js.76178395bda555bf2308.hot-update.js.map