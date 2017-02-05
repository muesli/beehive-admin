import Ember from 'ember';

export default Ember.Controller.extend({
	event: null,
	filters: [],

	isEventSet: Ember.computed('event', function() {
		return this.event != null;
	}),

	filterExamples: Ember.computed('event.Options', function() {
		var examples = [];
		var opts = this.event.Options;

		opts.forEach(function(value) {
			switch (value.Type) {
				case "string":
					examples.push({
						"Filter": "{{test eq ." + value.Name + " \"example\"}}",
						"Description": "Matches when <b>" + value.Name + "</b> equals <i>example</i>"
					});
					examples.push({
						"Filter": "{{test HasPrefix ." + value.Name + " \"somePrefix\"}}",
						"Description": "Matches when <b>" + value.Name + "</b> starts with <i>somePrefix</i>"
					});
					examples.push({
						"Filter": "{{test Contains ." + value.Name + " \"example\"}}",
						"Description": "Matches when <b>" + value.Name + "</b> contanins <i>example</i>"
					});
					break;
				case "bool":
					examples.push({
						"Filter": "{{test eq ." + value.Name + " true}}",
						"Description": "Matches when <b>" + value.Name + "</b> is <i>true</i>"
					});
					break;
			}
		});

		return examples;
	}),

	actions: {
		pickEvent(event) {
			this.set('event', event);
		},

		addFilter() {
			this.filters.pushObject("");
		},

		deleteFilter(num) {
			this.filters.removeAt(num);
		},

		updateFilter(num, value) {
			this.filters.replace(num, 1, value);
		},

		nextStep() {
			this.transitionToRoute('chains.new.pickbeeaction', this.bee.id, this.event.Name, {
				queryParams: {
					filters: this.filters
				}
			});
		}
	}
});
