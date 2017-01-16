import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
       return Ember.RSVP.hash({
         hive: this.store.findRecord('hive', params.hive_id)
       });
     },

     setupController(controller, models) {
       controller.set('hive', models.hive);
     }
});
