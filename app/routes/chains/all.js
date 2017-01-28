import Ember from 'ember';

export default Ember.Route.extend(/*AuthenticatedRouteMixin, */{
    model() {
       return Ember.RSVP.hash({
           chains: this.get('store').findAll('chain'),
       });
     },

     setupController(controller, models) {
       controller.set('chains', models.chains);
     }
});
