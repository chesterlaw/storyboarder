import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'movie-screen',

  didInsertElement() {
    // hide .movie-screen if esc is pressed
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        $('.movie-screen').hide();
      }
    });
  }
});
