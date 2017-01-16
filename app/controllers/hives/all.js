import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        startBee(id) {
            this.store.findRecord('bee', id).then(function (bee) {
                bee.set('active', true);
                bee.save();
            });
        },

        stopBee(id) {
            this.store.findRecord('bee', id).then(function (bee) {
                bee.set('active', false);
                bee.save();
            });
        }
    }
});
