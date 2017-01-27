import Ember from 'ember';

export default Ember.Controller.extend({
    name: "",
    description: "",
    options: new Map(),

    isValid: Ember.computed('name', 'description', function() {
        return this.name.length > 0 && this.description.length > 0;
    }),
    isDisabled: Ember.computed.not('isValid'),

    actions: {
      updateOption(option, value) {
          this.options.set(option.Name, value);
      },

      createBee() {
          var hive = this.get('hive');
          var opts = hive.get('options');

          this.options.forEach(function(value, key) {
              for (var i = 0; i < opts.length; i++) {
                  let item = opts[i];

                  if (item.Name === key) {
                      if (item.Type === '[]string') {
                          var os = [value];
                          Ember.set(item, 'Value', os);
                      } else {
                          Ember.set(item, 'Value', value);
                      }
                  }
              }
          });

          const bee = this.store.createRecord('bee', {namespace: hive, name: this.name, description: this.description, options: opts});
          bee.save().then(
              (bee) => {
                  this.options = new Map();
                  this.transitionToRoute('bees.show', bee.id);
              },
              error => {
                  alert(error);
              }
          );
      }
    }
});
