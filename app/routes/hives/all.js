import Ember from 'ember';

export default Ember.Route.extend(/*AuthenticatedRouteMixin, */{
    model() {
       return Ember.RSVP.hash({
           hives: this.get('store').findAll('hive'),
       });
     },

     setupController(controller, models) {
       controller.set('hives', models.hives);
     }
});
