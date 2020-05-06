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
/* harmony import */ var _UI_Icons_Catalog_AppNonCommodityItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../UI/Icons/Catalog/AppNonCommodityItems */ "./components/UI/Icons/Catalog/AppNonCommodityItems.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/Navigation/Header/HeaderMainNav/HeaderMainNav.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







var LeftMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuStyles",
  componentId: "sc-1plnt9j-0"
})(["padding:15px;background-color:", ";"], _theme__WEBPACK_IMPORTED_MODULE_6__["THEME"].BACKGROUND_COLOR);
var RightMenuStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__RightMenuStyles",
  componentId: "sc-1plnt9j-1"
})([""]);
var LeftMenuLinkContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "HeaderMainNav__LeftMenuLinkContainer",
  componentId: "sc-1plnt9j-2"
})(["width:200px;min-height:60px;padding:0 15px;&:hover{background-color:", ";color:", ";}"], _theme__WEBPACK_IMPORTED_MODULE_6__["THEME"].WHITE_COLOR, _theme__WEBPACK_IMPORTED_MODULE_6__["THEME"].MAIN_COLOR);
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
    IconComponent: _UI_Icons_Catalog_AppNonCommodityItems__WEBPACK_IMPORTED_MODULE_5__["AppNonCommodityItemsIcon"]
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
        lineNumber: 48,
        columnNumber: 5
      }
    }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
      href: href,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 7
      }
    }, __jsx(IconContainer, {
      className: "d-flex justify-content-center align-items-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }
    }, __jsx(IconComponent, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 11
      }
    })), __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }
    }, name)));
  });
  return __jsx("div", {
    className: "container-fluid",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }
  }, __jsx(LeftMenuStyles, {
    className: "col-3 flex-column justify-content-end align-items-end",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }
  }, __jsx(_UI_AppRouterLink__WEBPACK_IMPORTED_MODULE_2__["AppRouterLink"], {
    href: "/catalog/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 11
    }
  }, "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"), leftMenuLinks), __jsx(RightMenuStyles, {
    className: "col-9",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 9
    }
  })));
};

/***/ }),

/***/ "./components/UI/Icons/Catalog/AppNonCommodityItems.js":
/*!*************************************************************!*\
  !*** ./components/UI/Icons/Catalog/AppNonCommodityItems.js ***!
  \*************************************************************/
/*! exports provided: AppNonCommodityItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNonCommodityItems", function() { return AppNonCommodityItems; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppIconContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppIconContainer */ "./components/UI/Icons/AppIconContainer.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../theme */ "./theme.js");
var _this = undefined,
    _jsxFileName = "/Users/maksimmincenko/PhpstormProjects/slim.xppx/r/KNOWLEDGE/JS/__JOB__/super-apteka/components/UI/Icons/Catalog/AppNonCommodityItems.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var AppNonCommodityItems = function AppNonCommodityItems(_ref) {
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
    d: "M0 12.635C0 5.81412 5.82493 0 12.635 0C19.4552 0 25.27 5.8234 25.27 12.635C25.27 19.4559 19.4451 25.27 12.635 25.27C5.81481 25.27 0 19.4466 0 12.635ZM0.987109 12.635C0.987109 18.9488 6.3212 24.2829 12.635 24.2829C18.9488 24.2829 24.2829 18.9488 24.2829 12.635C24.2829 6.3212 18.9488 0.987109 12.635 0.987109C6.3212 0.987109 0.987109 6.3212 0.987109 12.635ZM6.07068 4.59011C6.07068 4.31767 6.29179 4.09656 6.56423 4.09656C6.83668 4.09656 7.05779 4.31767 7.05779 4.59011C7.05779 4.86255 6.83668 5.08367 6.56423 5.08367C6.29179 5.08367 6.07068 4.86255 6.07068 4.59011ZM12.635 2.12231C11.0524 2.12231 9.37831 2.48755 8.04191 3.12438C7.79587 3.24165 7.69139 3.5362 7.80866 3.78224C7.92588 4.02827 8.22033 4.13286 8.46652 4.01549C9.67489 3.43966 11.1943 3.10942 12.635 3.10942C17.7984 3.10942 22.1606 7.47161 22.1606 12.635C22.1606 17.7984 17.7984 22.1606 12.635 22.1606C7.47161 22.1606 3.10942 17.7984 3.10942 12.635C3.10942 10.2765 3.97467 7.95194 5.48337 6.25727C5.66465 6.05367 5.64654 5.7417 5.44295 5.56047C5.23931 5.37913 4.92743 5.39744 4.74615 5.60089C3.07863 7.47393 2.12231 10.0377 2.12231 12.635C2.12231 18.3468 6.91488 23.1477 12.635 23.1477C18.3468 23.1477 23.1477 18.3552 23.1477 12.635C23.1477 6.92322 18.3552 2.12231 12.635 2.12231ZM15.1027 10.1672H18.5576C18.8302 10.1672 19.0512 10.3882 19.0512 10.6607V14.6092C19.0512 14.8817 18.8302 15.1027 18.5576 15.1027H15.1027V18.5576C15.1027 18.8302 14.8817 19.0512 14.6092 19.0512H10.6607C10.3882 19.0512 10.1672 18.8302 10.1672 18.5576V15.1027H6.7123C6.43976 15.1027 6.21875 14.8817 6.21875 14.6092V10.6607C6.21875 10.3882 6.43976 10.1672 6.7123 10.1672H10.1672V6.7123C10.1672 6.43976 10.3882 6.21875 10.6607 6.21875H14.6092C14.8817 6.21875 15.1027 6.43976 15.1027 6.7123V10.1672ZM14.6092 14.1156H18.0641V11.1543H14.6092C14.3366 11.1543 14.1156 10.9333 14.1156 10.6607V7.20586H11.1543V10.6607C11.1543 10.9333 10.9333 11.1543 10.6607 11.1543H7.20586V14.1156H10.6607C10.9333 14.1156 11.1543 14.3366 11.1543 14.6092V18.0641H14.1156V14.6092C14.1156 14.3366 14.3366 14.1156 14.6092 14.1156Z",
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
//# sourceMappingURL=index.js.f76ddd1d2b5a083c4ea9.hot-update.js.map
