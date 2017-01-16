import Ember from 'ember';

export default Ember.Controller.extend({
    options: new Map(),

    actions: {
      updateOption(option, value) {
          this.options.set(option.Name, value);
      },

      startBee() {
          var bee = this.get('bee');
          bee.set('active', true);
          bee.save();
      },

      stopBee() {
          var bee = this.get('bee');
          bee.set('active', false);
          bee.save();
      },

      updateBee() {
          var bee = this.get('bee');
          var opts = bee.get('options');

          this.options.forEach(function(value, key) {
              for (var i = 0; i < opts.length; i++) {
                  let item = opts[i];

                  if (item.Name === key) {
                      Ember.set(item, 'Value', value);
                      alert("Updated " + item.Name + " to " + item.Value);
                  }
              }
          });

          bee.save();
          this.options = new Map();
      }
    }
});
