import Ember from 'ember';

export default Ember.Route.extend( /*AuthenticatedRouteMixin, */ {
	model(params) {
		return Ember.RSVP.hash({
			beeaction: this.store.findRecord('bee', params.beeaction),
			beeevent: this.store.findRecord('bee', params.beeevent),
			event: params.event,
		});
	},

	setupController(controller, models) {
		controller.set('beeevent', models.beeevent);
		controller.set('beeaction', models.beeaction);

		models.beeevent.get('namespace').then((eventhive) => {
			for (var i = 0; i < eventhive.get('events').length; i++) {
				if (eventhive.get('events')[i].Name === models.event) {
					controller.set('event', eventhive.get('events')[i]);
					break;
				}
			}
		});

		controller.set('action', null);
	}
});
