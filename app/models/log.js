import DS from 'ember-data';

export default DS.Model.extend({
	bee: DS.belongsTo('bee'),
	level: DS.attr('number'),
    message: DS.attr('string'),
	timestamp: DS.attr('isodate')
});
