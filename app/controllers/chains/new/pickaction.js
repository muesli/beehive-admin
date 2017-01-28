import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['filters'],
    filters: [],

    action: null,
    name: "",
    description: "",
    options: new Map(),

    errorMessage: "",

    isActionSet: Ember.computed('action', function() {
        return this.action != "";
    }),

    reset() {
        this.set('name', "");
        this.set('description', "");
        this.set('options', new Map());
    },

    actions: {
        updateOption(option, value) {
            this.options.set(option.Name, value);
        },

        pickAction(action) {
            this.set('action', action);
        },

        createChain() {
            this.set('errorMessage', '');

            const name = this.get('name');
            const description = this.get('description');
            const action = this.get('action');
            const event = this.get('event');
            this.store.findRecord('bee', this.get('beeevent')).then( (beeevent) => {
                this.store.findRecord('bee', this.get('beeaction')).then( (beeaction) => {

                        var opts = action.Options;

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

                        const newevent = {Bee: beeevent.get('name'), Name: event}
                        const chain = this.store.createRecord('chain', {name: name, description: description, event: newevent, filters: this.filters});
                        const newAction = this.store.createRecord('action', {
                            bee: beeaction,
                            name: action.Name,
                            options: opts
                        });
                        newAction.save().then( (newac) => {
                            chain.get('actions').addObject(newac);
                            chain.save().then(
                                chain => {
                                    this.reset();
                                    this.transitionToRoute('chains.show.summary', chain.id);
                                },
                                error => {
                                  this.set('errorMessage', `Failed creating chain: ` + error.errors[0].detail);
                                }
                            );
                        });

                });
            });
        }
    }
});
