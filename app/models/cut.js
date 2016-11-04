import DS from 'ember-data';

export default DS.Model.extend({
  visual: DS.attr(),
  duration: DS.attr('number', {defaultValue: 1}),
});
