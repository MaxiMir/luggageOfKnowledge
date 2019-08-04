(function (exports,ui_vue,ui_vue_vuex) {
	'use strict';

	ui_vue.Vue.component('partner-application-layout', {
	  methods: {
	    addItem: function addItem() {
	      this.$root.$bitrixApplication.addItem();
	    },
	    removeItem: function removeItem(id) {
	      this.$root.$bitrixApplication.removeItem(id);
	    },
	    removeItems: function removeItems(id) {
	      this.$root.$bitrixApplication.removeItems();
	    }
	  },
	  computed: babelHelpers.objectSpread({
	    localize: function localize() {
	      return ui_vue.Vue.getFilteredPhrases('PARTNER_LIST_');
	    },
	    counter: function counter() {
	      return this.application.counter;
	    }
	  }, ui_vue_vuex.Vuex.mapState({
	    application: function application(state) {
	      return state.application;
	    }
	  })),
	  template: "\n\t\t<div class=\"some-component\">\n\t\t\t<div class=\"partner-application-list-title\">{{localize.PARTNER_LIST_TITLE}}</div>\n\t\t\t<div class=\"partner-application-list-box\">\n\t\t\t\t<transition-group name=\"fade\">\n\t\t\t\t\t<template v-if=\"counter > 0\" v-for=\"item in application.list\">\n\t\t\t\t\t\t<li :key=\"item.id\" @click=\"removeItem(item.id)\">{{item.name}} [X]</li>\n\t\t\t\t\t</template>\n\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t<div>{{localize.PARTNER_LIST_EMPTY}}</div>\n\t\t\t\t\t</template>\n\t\t\t\t</transition-group>\n\t\t\t</div>\n\t\t\t<div class=\"partner-application-list-count\">{{localize.PARTNER_LIST_COUNT}}: {{counter}}</div>\n\t\t\t<button @click=\"addItem\">{{localize.PARTNER_LIST_ADD}}</button>\n\t\t\t<button @click=\"removeItems\">{{localize.PARTNER_LIST_CLEAR}}</button>\n\t\t</div>\n\t"
	});

	var ApplicationModel =
	/*#__PURE__*/
	function (_VuexBuilderModel) {
	  babelHelpers.inherits(ApplicationModel, _VuexBuilderModel);

	  function ApplicationModel() {
	    babelHelpers.classCallCheck(this, ApplicationModel);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(ApplicationModel).apply(this, arguments));
	  }

	  babelHelpers.createClass(ApplicationModel, [{
	    key: "getName",
	    value: function getName() {
	      return 'application';
	    }
	  }, {
	    key: "getState",
	    value: function getState() {
	      return {
	        list: [],
	        counter: 0
	      };
	    }
	  }, {
	    key: "getMutations",
	    value: function getMutations() {
	      var _this = this;

	      return {
	        addListItem: function addListItem(state, payload) {
	          var id = new Date().getTime();
	          var name;

	          if (typeof payload.name !== "undefined" && payload.name.toString().length > 0) {
	            name = payload.name.toString();
	          } else {
	            name = _this.getElementNameDefault().replace('#NUM#', state.counter + 1);
	          }

	          state.list.push({
	            id: id,
	            name: name
	          });
	          state.counter = state.list.length;

	          _this.saveState(state);
	        },
	        removeListItem: function removeListItem(state, payload) {
	          state.list = state.list.filter(function (item) {
	            return item.id !== payload.id;
	          });
	          state.counter = state.list.length;

	          _this.saveState(state);
	        },
	        removeItems: function removeItems(state, payload) {
	          state.list = [];
	          state.counter = 0;

	          _this.saveState(state);
	        }
	      };
	    }
	  }, {
	    key: "getElementNameDefault",
	    value: function getElementNameDefault() {
	      return this.getVariable('default.name', 'Item #NUM#');
	    }
	  }]);
	  return ApplicationModel;
	}(ui_vue_vuex.VuexBuilderModel);

	var Application =
	/*#__PURE__*/
	function () {
	  function Application(rootId) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Application);
	    this.rootNode = document.getElementById(rootId);
	    this.initStore().then(function (result) {
	      return _this.initComponent(result);
	    }).then(function (result) {
	      return _this.initTemplate(result);
	    });
	  }

	  babelHelpers.createClass(Application, [{
	    key: "initStore",
	    value: function initStore() {
	      var variables = {
	        default: {
	          name: BX.message('PARTNER_LIST_ITEM_DEFAULT')
	        }
	      };
	      return new ui_vue_vuex.VuexBuilder().addModel(ApplicationModel.create().setVariables(variables)).setDatabaseConfig({
	        name: 'PartnerApp'
	      }).build();
	    }
	  }, {
	    key: "initComponent",
	    value: function initComponent(result) {
	      this.store = result.store;
	    }
	  }, {
	    key: "initTemplate",
	    value: function initTemplate() {
	      var context = this;
	      this.templateEngine = ui_vue.Vue.create({
	        el: this.rootNode,
	        template: '<partner-application-layout/>',
	        store: this.store,
	        beforeCreate: function beforeCreate() {
	          this.$bitrixApplication = context;
	        }
	      });
	      return new Promise(function (resolve, reject) {
	        return resolve();
	      });
	    }
	  }, {
	    key: "addItem",
	    value: function addItem(text) {
	      if (typeof text === 'undefined') {
	        text = window.prompt(BX.message('PARTNER_LIST_PROMPT'));
	      }

	      this.store.commit('application/addListItem', {
	        name: text
	      });
	    }
	  }, {
	    key: "removeItem",
	    value: function removeItem(id) {
	      this.store.commit('application/removeListItem', {
	        id: id
	      });
	    }
	  }, {
	    key: "removeItems",
	    value: function removeItems() {
	      this.store.commit('application/removeItems');
	    }
	  }]);
	  return Application;
	}();

	exports.Application = Application;

}((this.PartnerPrefix = this.PartnerPrefix || {}),BX,BX));
//# sourceMappingURL=application.bundle.js.map
