import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize: function (serialized) {
        // default date in Go
        if (serialized === '0001-01-01T00:00:00Z') {
            return undefined;
        }

        return new Date(Ember.Date.parse(serialized));
    },

    serialize: function(date) {
        if (date instanceof Date) {
            return date.toISOString();
        } else {
            return undefined;
        }
    }
});
