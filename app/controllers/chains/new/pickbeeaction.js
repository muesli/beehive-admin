import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['filters'],
    filters: [],

    actions: {
      nextStep(bee) {
          this.transitionToRoute('chains.new.pickaction', this.beeevent, this.event, bee.id, {queryParams: {filters: this.filters}});
      },
    }
});
