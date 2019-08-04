import './component';
import './component.css';

import {Vue} from 'ui.vue';
import {VuexBuilder} from "ui.vue.vuex";
import {ApplicationModel} from './model';

export class Application
{
	constructor(rootId)
	{
		this.rootNode = document.getElementById(rootId);

		this.initStore()
			.then(result => this.initComponent(result))
			.then(result => this.initTemplate(result))
		;
	}

	initStore()
	{
		const variables = {
			default: {
				name: BX.message('PARTNER_LIST_ITEM_DEFAULT')
			}
		};

		return new VuexBuilder()
			.addModel(ApplicationModel.create().setVariables(variables))
			.setDatabaseConfig({
				name: 'PartnerApp',
			})
		.build();
	}

	initComponent(result)
	{
		this.store = result.store;
	}

	initTemplate()
	{
		const context = this;

		this.templateEngine = Vue.create({
			el: this.rootNode,
			template: '<partner-application-layout/>',
			store: this.store,
			beforeCreate()
			{
				this.$bitrixApplication = context;
			},
		});

		return new Promise((resolve, reject) => resolve());
	}

	addItem(text)
	{
		if (typeof text === 'undefined')
		{
			text = window.prompt(
				BX.message('PARTNER_LIST_PROMPT')
			);
		}

		this.store.commit('application/addListItem', {name: text});
	}

	removeItem(id)
	{
		this.store.commit('application/removeListItem', {id});
	}

	removeItems()
	{
		this.store.commit('application/removeItems');
	}
}