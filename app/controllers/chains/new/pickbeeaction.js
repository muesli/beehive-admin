import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['filters'],
	filters: [],

	action_bees: [],
	actionBees: Ember.computed('bees.@each', 'action_bees', function() {
		var b = this.get('action_bees');
		this.get('bees').forEach(bee => {
			bee.get('namespace').then(namespace => {
				if (namespace.get('actions').length > 0) {
					b.pushObject(bee);
				}
			});
		});
		return b;
	}),

	actions: {
		nextStep(bee) {
			this.transitionToRoute('chains.new.pickaction', this.beeevent, this.event, bee.id, {
				queryParams: {
					filters: this.filters
				}
			});
		}
	}
});
