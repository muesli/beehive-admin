import Ember from 'ember';

export default Ember.Route.extend( /*AuthenticatedRouteMixin, */ {
	model() {
		return Ember.RSVP.hash({
			logs: this.get('store').findAll('log'),
		});
	},

	setupController(controller, models) {
		controller.set('logs', models.logs);
	}
});
