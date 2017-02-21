import Ember from 'ember';

export default Ember.Controller.extend({
	name: "",
	description: "",
	options: new Map(),

	errorMessage: "",

	needsOAuth2Login: Ember.computed('hive', function() {
		var hive = this.get('hive');
		var opts = hive.get('options');

		for (var i = 0; i < opts.length; i++) {
			let item = opts[i];

			if (item.Type.startsWith('oauth2:')) {
				return true;
			}
		}

		return false;
	}),
	oauth2URL: Ember.computed('options', function() {
		var hive = this.get('hive');
		var opts = hive.get('options');

		for (var i = 0; i < opts.length; i++) {
			let item = opts[i];

			if (item.Type.startsWith('oauth2:')) {
				let url = item.Type.split("oauth2:").pop();

				while (url.indexOf("__client_id__") >= 0) {
					url = url.replace("__client_id__", this.options.get("client_id"));
				}
				while (url.indexOf("__client_secret__") >= 0) {
					url = url.replace("__client_secret__", this.options.get("client_secret"));
				}

				return url;
			}
		}
	}),
	isOauth2Valid: Ember.computed('options', function() {
		let id = this.options.get("client_id");
		let secret = this.options.get("client_secret");

		return id != undefined && id.length > 0 &&
			secret != undefined && secret.length > 0;
	}),
	isOauth2Disabled: Ember.computed.not('isOauth2Valid'),

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
					this.reset();
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
