import Ember from 'ember';

export default Ember.Route.extend(/*AuthenticatedRouteMixin, */{
    model(params) {
       return Ember.RSVP.hash({
           bee: this.store.findRecord('bee', params.beeaction),
           beeevent: params.beeevent,
           event: params.event,
           beeaction: params.beeaction,
       });
     },

     setupController(controller, models) {
       controller.set('beeevent', models.beeevent);
       controller.set('event', models.event);
       controller.set('beeaction', models.beeaction);
       controller.set('bee', models.bee);
       controller.set('action', '');
     }
});
