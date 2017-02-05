import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['filters'],
	filters: [],

	action: null,
	name: "",
	description: "",
	options: new Map(),

	errorMessage: "",

	isValid: Ember.computed('name', 'description', 'options', function() {
		const opts = this.action.Options;
		const options = this.options;

		if (opts.some(value => {
				if (value.Mandatory) {
					if (!options.has(value.Name) || options.get(value.Name).length == 0) {
						return true;
					}
				}
			})) return false;

		return this.name.length > 0 && this.description.length > 0;
	}),
	isDisabled: Ember.computed.not('isValid'),

	isActionSet: Ember.computed('action', function() {
		return this.action != null;
	}),

	reset() {
		this.set('name', "");
		this.set('description', "");
		this.set('options', new Map());
	},

	actions: {
		updateOption(option, value) {
			this.options.set(option.Name, value);
			this.notifyPropertyChange('options');
		},

		pickAction(action) {
			this.set('action', action);
		},

		createChain() {
			this.set('errorMessage', '');

			const name = this.get('name');
			const description = this.get('description');
			const action = this.get('action');
			const event = this.get('event');
			this.store.findRecord('bee', this.get('beeevent')).then((beeevent) => {
				this.store.findRecord('bee', this.get('beeaction')).then((beeaction) => {

					var opts = action.Options;

					this.options.forEach(function(value, key) {
						for (var i = 0; i < opts.length; i++) {
							let item = opts[i];

							if (item.Name === key) {
								if (item.Type === '[]string') {
									var os = [value];
									Ember.set(item, 'Value', os);
								} else {
									Ember.set(item, 'Value', value);
								}
							}
						}
					});

					const newevent = {
						Bee: beeevent.get('name'),
						Name: event
					};
					const chain = this.store.createRecord('chain', {
						name: name,
						description: description,
						event: newevent,
						filters: this.filters
					});
					const newAction = this.store.createRecord('action', {
						bee: beeaction,
						name: action.Name,
						options: opts
					});
					newAction.save().then((newac) => {
						chain.get('actions').addObject(newac);
						chain.save().then(
							chain => {
								this.reset();
								this.transitionToRoute('chains.show.summary', chain.id);
							},
							error => {
								chain.rollbackAttributes();
								this.set('errorMessage', `Failed creating Chain: ` + error.errors[0].detail);
							}
						);
					});

				});
			});
		}
	}
});
