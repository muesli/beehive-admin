import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
       return Ember.RSVP.hash({
         chain: this.store.findRecord('chain', params.chain_id)
       });
     },

     setupController(controller, models) {
       controller.set('chain', models.chain);
     }
});
