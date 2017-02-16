import Ember from 'ember';

export default Ember.Controller.extend({
	event_bees: [],
	eventBees: Ember.computed('bees.@each', 'event_bees', function() {
		var b = this.get('event_bees');
		this.get('bees').forEach(bee => {
			bee.get('namespace').then(namespace => {
				if (namespace.get('events').length > 0) {
					b.pushObject(bee);
				}
			});
		});
		return b;
	}),

	actions: {
		nextStep(bee) {
			this.transitionToRoute('chains.new.pickevent', bee.id);
		}
	}
});
