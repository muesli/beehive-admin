import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	actions: DS.hasMany('action'),
	filters: DS.attr(),
	event: DS.attr(),
	eventBee: function() {
		return this.store.findRecord('bee', this.get('event').Bee);
	}.property('event')
});
