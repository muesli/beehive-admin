import Ember from 'ember';

export default Ember.Route.extend(/*AuthenticatedRouteMixin, */{
    model() {
       return Ember.RSVP.hash({
           hives: this.get('store').findAll('hive'),
           bees: this.get('store').findAll('bee')
       });
     },

     setupController(controller, models) {
       controller.set('hives', models.hives);
       controller.set('bees', models.bees);
     }
});
