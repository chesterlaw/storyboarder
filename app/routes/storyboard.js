import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    this.get('store').createRecord('cut');
    return {
      cuts: this.get('store').peekAll('cut'),
      drawColor: 'black',
      playTimestamp: Date.now(),
      aspectRatio: 1.3333333333333
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

      $('.movie-screen__img').css('z-index', '-1');
      $('.movie-screen .movie-screen__img:visible:nth-child(1)').css('z-index', '1');

      var durations = [];
      this.get('store').peekAll('cut').forEach(function(item) {
        if (durations.length === 0) {
          durations.push(item.get('duration')*1000);
        } else {
          durations.push(item.get('duration')*1000 + durations[durations.length-1]);
        }
      });

      function doTimeout(i) {
        setTimeout(function() {
          $(`.movie-screen .movie-screen__img:visible:nth-child(${i+1})`).hide();
          $(`.movie-screen .movie-screen__img:visible:nth-child(${i+2})`).css('z-index', '1');
        }, durations[i])
      }

      for (var i=0; i < durations.length; i += 1) {
        doTimeout(i)
      }

      // hide .movie-screen if esc is pressed
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          $('.movie-screen').hide();
        }
      });
    }
  }
});
