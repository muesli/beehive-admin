import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      showHive(hive) {
          this.transitionToRoute('hives.show.summary', hive.id);
      }
    }
});
