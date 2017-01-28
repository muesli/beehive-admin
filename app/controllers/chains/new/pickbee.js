import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      nextStep(bee) {
          this.transitionToRoute('chains.new.pickevent', bee.id);
      },
    }
});
