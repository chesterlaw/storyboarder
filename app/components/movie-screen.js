import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'movie-screen',

  didInsertElement() {
    var height = 300;
    var width = height*this.get('aspectRatio');

    $(this.element).find('.movie-screen__img')
                     .css('width', width)
                     .css('height', height)
                     .css('margin-left', -width/2)
                     .css('margin-top', -height/2);


    // hide .movie-screen if esc is pressed
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        $('.movie-screen').hide();
      }
    });
  }
});
