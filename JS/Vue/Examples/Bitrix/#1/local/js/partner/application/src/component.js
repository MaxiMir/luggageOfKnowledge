import {Vue} from 'ui.vue';
import {Vuex} from "ui.vue.vuex";

Vue.component('partner-application-layout',
{
	methods:
	{
		addItem()
		{
			this.$root.$bitrixApplication.addItem();
		},

		removeItem(id)
		{
			this.$root.$bitrixApplication.removeItem(id);
		},

		removeItems(id)
		{
			this.$root.$bitrixApplication.removeItems();
		}
	},

	computed:
	{
		localize()
		{
			return Vue.getFilteredPhrases('PARTNER_LIST_');
		},

		counter()
		{
			return this.application.counter;
		},

		...Vuex.mapState({
			application: state => state.application,
		})
	},

	template: `
		<div class="some-component">
			<div class="partner-application-list-title">{{localize.PARTNER_LIST_TITLE}}</div>
			<div class="partner-application-list-box">
				<transition-group name="fade">
					<template v-if="counter > 0" v-for="item in application.list">
						<li :key="item.id" @click="removeItem(item.id)">{{item.name}} [X]</li>
					</template>
					<template v-else>
						<div>{{localize.PARTNER_LIST_EMPTY}}</div>
					</template>
				</transition-group>
			</div>
			<div class="partner-application-list-count">{{localize.PARTNER_LIST_COUNT}}: {{counter}}</div>
			<button @click="addItem">{{localize.PARTNER_LIST_ADD}}</button>
			<button @click="removeItems">{{localize.PARTNER_LIST_CLEAR}}</button>
		</div>
	`,

});