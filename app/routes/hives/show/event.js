import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        var events = this.modelFor('hives.show').hive.get('events');

        var val;
        events.forEach(function(value, key) {
            if (value.Name === params.event_id) {
                val = value;
            }
        });

        return val;
     }
});
