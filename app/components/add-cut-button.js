import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'add-cut-button',
  tagName: 'button',
  store: Ember.inject.service(),

  click() {
    this.get('store').createRecord('cut', {
    });
  }
});
