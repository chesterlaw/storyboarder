import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    return {
      cuts: this.get('store').peekAll('cut'),
      drawColor: 'black',
      playTimestamp: Date.now()
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
      this.controller.set('model.playTimestamp', Date.now());
      $('.movie-screen').show();
      $('.movie-screen__img').show();

      var durations = [];
      this.get('store').peekAll('cut').forEach(function(item) {
        durations.push(item.get('duration')*1000);
      });

      setTimeout(function() {
        $('.movie-screen .movie-screen__img:visible:nth-child(1)').hide();
      }, durations[0])

      setTimeout(function() {
        $('.movie-screen .movie-screen__img:visible:nth-child(2)').hide();
      }, durations[0]+durations[1])

      setTimeout(function() {
        $('.movie-screen .movie-screen__img:visible:nth-child(3)').hide();
      }, durations[0]+durations[1]+durations[2])

      // hide .movie-screen if esc is pressed
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          $('.movie-screen').hide();
        }
      });
    }
  }
});
