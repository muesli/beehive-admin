import Ember from 'ember';

export default Ember.Route.extend( /*AuthenticatedRouteMixin, */ {
	model() {
		return Ember.RSVP.hash({
			bees: this.get('store').findAll('bee')
		});
	},

	setupController(controller, models) {
		controller.set('bees', models.bees);
	}
});
