import DS from 'ember-data';

export default DS.Model.extend({
    bee: DS.belongsTo('bee'),
    name: DS.attr('string'),
    options: DS.attr()
});
