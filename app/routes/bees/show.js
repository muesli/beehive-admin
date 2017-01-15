import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
       return Ember.RSVP.hash({
         bee: this.store.findRecord('bee', params.bee_id)
       });
     },

     setupController(controller, models) {
       controller.set('bee', models.bee);
     }
});
