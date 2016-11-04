import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    return {
      cuts: this.get('store').peekAll('cut'),
      drawColor: 'black'
    };
  },

  actions: {
    enterEraseMode() {
      this.controller.set('model.drawColor', 'white')
    },

    enterDrawMode() {
      this.controller.set('model.drawColor', 'black')
    },

    play() {
      $('.movie-screen').show();

      // hide .movie-screen if esc is pressed
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          $('.movie-screen').hide();
        }
      });
    }
  }
});
