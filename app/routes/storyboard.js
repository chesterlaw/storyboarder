import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    return this.get('store').peekAll('cut');
  }
});
