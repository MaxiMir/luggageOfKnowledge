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
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
  }, {
    name: 'Средства для красоты и гигиены',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
  }, {
    name: 'Товары для дома и сопутствующие',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
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
        lineNumber: 49,
        columnNumber: 5
      }
    }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
      href: href,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 7
      }
    }, __jsx(IconContainer, {
      className: "d-flex justify-content-center align-items-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }
    }, __jsx(IconComponent, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }
    })), __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 9
      }
    }, name)));
  });
  return __jsx("div", {
    className: "container-fluid",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }
  }, __jsx(LeftMenuStyles, {
    className: "col-3 flex-column justify-content-end align-items-end",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: "/catalog/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 11
    }
  }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"), leftMenuLinks), __jsx(RightMenuStyles, {
    className: "col-9",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 9
    }
  })));
};

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppOpticsIcon.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var AppOpticsIcon = function AppOpticsIcon(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR : _ref$color;
  return __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
    width: "26",
    height: "18",
    viewBoxWidth: "26",
    viewBoxHeight: "18",
    __self: _this,
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
//# sourceMappingURL=index.js.58903f659a82fe09ef2a.hot-update.js.map