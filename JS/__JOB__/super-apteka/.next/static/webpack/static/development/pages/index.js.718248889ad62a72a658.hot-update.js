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
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderMainNav/HeaderMainNav.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var LeftMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuStyles",
  componentId: "sc-1plnt9j-0"
})(["padding:15px;background-color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_5__["THEME"].BACKGROUND_COLOR);
var RightMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__RightMenuStyles",
  componentId: "sc-1plnt9j-1"
})([""]);
var LeftMenuLinkContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuLinkContainer",
  componentId: "sc-1plnt9j-2"
})(["width:200px;min-height:60px;padding:0 15px;&:hover{background-color:", ";color:", ";}"], _theme__WEBPACK_IMPORTED_MODULE_5__["THEME"].WHITE_COLOR, _theme__WEBPACK_IMPORTED_MODULE_5__["THEME"].MAIN_COLOR);
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
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
  }, {
    name: 'Оптика',
    href: '#????',
    IconComponent: _UI_Icons_Catalog_AppMedicinesIcon__WEBPACK_IMPORTED_MODULE_3__["AppMedicinesIcon"]
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
        lineNumber: 47,
        columnNumber: 5
      }
    }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
      href: href,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 7
      }
    }, __jsx(IconContainer, {
      className: "d-flex justify-content-center align-items-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }
    }, __jsx(IconComponent, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }
    })), __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 9
      }
    }, name)));
  });
  return __jsx("div", {
    className: "container-fluid",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, __jsx(LeftMenuStyles, {
    className: "col-3 flex-column justify-content-end align-items-end",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: "/catalog/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 11
    }
  }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"), leftMenuLinks), __jsx(RightMenuStyles, {
    className: "col-9",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 9
    }
  })));
};

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppMedicalEquipment.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var AppMedicalEquipment = function AppMedicalEquipment(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? _theme__WEBPACK_IMPORTED_MODULE_2__["THEME"].LEFT_MENU_ICON_COLOR : _ref$color;
  return __jsx(_AppIconContainer__WEBPACK_IMPORTED_MODULE_1__["AppIconContainer"], {
    width: "19",
    height: "26",
    viewBoxWidth: "19",
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
    d: "M3.4551 0H17.2755C18.092 0 18.7563 0.664268 18.7563 1.48076V24.778C18.7563 25.0506 18.5352 25.2716 18.2627 25.2716H16.2883C16.0158 25.2716 15.7948 25.0506 15.7948 24.778V20.7306H14.314C14.0414 20.7306 13.8204 20.5096 13.8204 20.237V19.2499C13.8204 18.9773 14.0414 18.7563 14.314 18.7563C14.5866 18.7563 14.8076 18.9773 14.8076 19.2499V19.7434H15.7948V2.96152H7.89738V3.94869H10.3653C11.7261 3.94869 12.8332 5.0558 12.8332 6.41662V17.2755C12.8332 18.6363 11.7261 19.7434 10.3653 19.7434H8.39096V20.237C8.39096 21.0535 7.7267 21.7178 6.91021 21.7178V24.778C6.91021 25.0506 6.68918 25.2716 6.41662 25.2716C6.14406 25.2716 5.92303 25.0506 5.92303 24.778V21.7178C5.10654 21.7178 4.44228 21.0535 4.44228 20.237V19.7434H2.46793C1.10711 19.7434 0 18.6363 0 17.2755V6.41662C0 5.0558 1.10711 3.94869 2.46793 3.94869H4.93586V2.96152H2.46793C2.19537 2.96152 1.97434 2.74054 1.97434 2.46793V1.48076C1.97434 0.664268 2.63861 0 3.4551 0ZM6.91021 20.7306C7.18237 20.7306 7.40379 20.5092 7.40379 20.237V19.7434H5.42945V20.237C5.42945 20.5092 5.65087 20.7306 5.92303 20.7306H6.91021ZM4.93586 18.7563H7.89738V18.2627C7.89738 17.9905 7.67595 17.7691 7.40379 17.7691H5.42945C5.15728 17.7691 4.93586 17.9905 4.93586 18.2627V18.7563ZM10.3653 10.8589H11.8461V9.87172H0.987172V17.2755C0.987172 18.092 1.65144 18.7563 2.46793 18.7563H3.94869V18.2627C3.94869 17.4462 4.61296 16.7819 5.42945 16.7819H7.40379C8.22028 16.7819 8.88455 17.4462 8.88455 18.2627V18.7563H10.3653C11.1818 18.7563 11.8461 18.092 11.8461 17.2755V15.7948H10.3653C10.0927 15.7948 9.87172 15.5738 9.87172 15.3012C9.87172 15.0286 10.0927 14.8076 10.3653 14.8076H11.8461V13.8204H11.3525C11.0799 13.8204 10.8589 13.5994 10.8589 13.3268C10.8589 13.0542 11.0799 12.8332 11.3525 12.8332H11.8461V11.8461H10.3653C10.0927 11.8461 9.87172 11.6251 9.87172 11.3525C9.87172 11.0799 10.0927 10.8589 10.3653 10.8589ZM11.8461 6.41662C11.8461 5.60013 11.1818 4.93586 10.3653 4.93586H2.46793C1.65144 4.93586 0.987172 5.60013 0.987172 6.41662V8.88455H11.8461V7.89738H10.3653C10.0927 7.89738 9.87172 7.6764 9.87172 7.40379C9.87172 7.13118 10.0927 6.91021 10.3653 6.91021H11.8461V6.41662ZM5.92303 2.96152V3.94869H6.91021V2.96152H5.92303ZM2.96152 1.97434H15.7948V0.987172H3.4551C3.18294 0.987172 2.96152 1.2086 2.96152 1.48076V1.97434ZM16.7819 0.987172V24.2844H17.7691V1.48076C17.7691 1.2086 17.5477 0.987172 17.2755 0.987172H16.7819ZM7.89746 7.40386C7.89746 7.1314 8.11859 6.91028 8.39105 6.91028C8.66351 6.91028 8.88463 7.1314 8.88463 7.40386C8.88463 7.67632 8.66351 7.89745 8.39105 7.89745C8.11859 7.89745 7.89746 7.67632 7.89746 7.40386Z",
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
//# sourceMappingURL=index.js.718248889ad62a72a658.hot-update.js.map