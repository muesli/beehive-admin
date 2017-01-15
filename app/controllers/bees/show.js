import Ember from 'ember';

export default Ember.Controller.extend({
    options: new Map(),

    actions: {
      updateOption(option, value) {
          this.options.set(option.Name, value);
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
      }
    }
});
