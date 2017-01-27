import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        var actions = this.modelFor('hives.show').hive.get('actions');

        var val;
        actions.forEach(function(value, key) {
            if (value.Name === params.action_id) {
                val = value;
            }
        });

        return val;
     }
});
