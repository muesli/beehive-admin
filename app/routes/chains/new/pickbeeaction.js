import Ember from 'ember';

export default Ember.Route.extend(/*AuthenticatedRouteMixin, */{
    model(params) {
       return Ember.RSVP.hash({
           bees: this.get('store').findAll('bee'),
           beeevent: params.beeevent,
           event: params.event
       });
     },

     setupController(controller, models) {
       controller.set('beeevent', models.beeevent);
       controller.set('event', models.event);
       controller.set('bees', models.bees);
     }
});
