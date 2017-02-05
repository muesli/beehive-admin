import Ember from 'ember';

export default Ember.Controller.extend({
	name: "",
	description: "",
	options: new Map(),

	errorMessage: "",

	isValid: Ember.computed('name', 'description', 'options', function() {
		const opts = this.hive.get('options');
		const options = this.options;

		if (opts.some(value => {
				if (value.Mandatory) {
					if (!options.has(value.Name) || options.get(value.Name).length === 0) {
						return true;
					}
				}
			})) {
			return false;
		}

		return this.name.length > 0 && this.description.length > 0;
	}),
	isDisabled: Ember.computed.not('isValid'),

	actions: {
		updateOption(option, value) {
			this.options.set(option.Name, value);
			this.notifyPropertyChange('options');
		},

		createBee() {
			var hive = this.get('hive');
			var opts = hive.get('options');

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

			const bee = this.store.createRecord('bee', {
				namespace: hive,
				name: this.name,
				description: this.description,
				options: opts
			});
			bee.save().then(
				(bee) => {
					this.options = new Map();
					this.transitionToRoute('bees.show', bee.id);
				},
				error => {
					bee.rollbackAttributes();
					this.set('errorMessage', `Failed creating Bee: ` + error.errors[0].detail);
				}
			);
		}
	}
});
