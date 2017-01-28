import Ember from 'ember';

export default Ember.Controller.extend({
    event: null,
    filters: [],

    isEventSet: Ember.computed('event', function() {
        return this.event != null;
    }),

    actions: {
        pickEvent(event) {
            this.set('event', event);
        },

        addFilter() {
            this.filters.pushObject("");
        },

        deleteFilter(num) {
            this.filters.removeAt(num);
        },

        updateFilter(num, value) {
            this.filters.replace(num, 1, value);
        },

        nextStep() {
            this.transitionToRoute('chains.new.pickbeeaction', this.bee.id, this.event.Name, {queryParams: {filters: this.filters}});
        }
    }
});
