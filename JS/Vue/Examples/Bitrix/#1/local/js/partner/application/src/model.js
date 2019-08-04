import {VuexBuilderModel} from 'ui.vue.vuex';

export class ApplicationModel extends VuexBuilderModel
{
	getName()
	{
		return 'application';
	}

	getState()
	{
		return {
			list: [],
			counter: 0
		}
	}

	getMutations()
	{
		return {

			addListItem: (state, payload) =>
			{
				const id = new Date().getTime();
				let name;

				if (typeof payload.name !== "undefined" && payload.name.toString().length > 0)
				{
					name = payload.name.toString();
				}
				else
				{
					name = this.getElementNameDefault().replace('#NUM#', state.counter + 1);
				}

				state.list.push({id, name});
				state.counter = state.list.length;

				this.saveState(state);
			},

			removeListItem: (state, payload) =>
			{
				state.list = state.list.filter((item) => {
					return item.id !== payload.id;
				});
				state.counter = state.list.length;

				this.saveState(state);
			},

			removeItems: (state, payload) =>
			{
				state.list = [];
				state.counter = 0;

				this.saveState(state);
			}
		}
	}

	getElementNameDefault()
	{
		return this.getVariable('default.name', 'Item #NUM#');
	}
}