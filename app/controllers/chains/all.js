import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      deleteChain(chain) {
          var r = confirm("Do you really want to delete Chain '" + chain.get('name') + "'");

          if (r) {
              chain.destroyRecord();
          }
      },
    }
});
