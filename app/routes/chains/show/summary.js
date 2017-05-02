import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			chain: this.modelFor('chains.show').chain,
		});
	},

	setupController(controller, models) {
		controller.set('chain', models.chain);
	}
});
