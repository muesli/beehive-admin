import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	namespace: DS.belongsTo('hive'),
	description: DS.attr('string'),
	lastevent: DS.attr('isodate'),
	lastaction: DS.attr('isodate'),
	active: DS.attr('boolean'),
	options: DS.attr()
});
