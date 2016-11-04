import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'cut-row',
  prevX: 0,
  currX: 0,
  prevY: 0,
  currY: 0,
  aspectRatio: 1.33333333,
  flag: false,
  dot_flag: false,

  didInsertElement() {
    this.set('canvas', this.element.querySelector('canvas'));
    var offsetHeight = this.get('canvas').offsetHeight;
    var offsetWidth = offsetHeight*this.get('aspectRatio');
    this.get('canvas').height = offsetHeight;
    this.get('canvas').width = offsetWidth;

    this.set('w', this.get('canvas').width);
    this.set('h', this.get('canvas').height);

    this.get('canvas').addEventListener('mousemove', function (e) {
      this.findxy('move', e)
    }.bind(this), false);
    this.get('canvas').addEventListener('mousedown', function (e) {
      this.findxy('down', e)
    }.bind(this), false);
    this.get('canvas').addEventListener('mouseup', function (e) {
      this.findxy('up', e)
    }.bind(this), false);
    this.get('canvas').addEventListener('mouseout', function (e) {
      this.findxy('out', e)
    }.bind(this), false);

    this.set('canvasContext', this.get('canvas').getContext('2d'));
    this.get('canvasContext').lineWidth = 2;
  },

  cutNumber: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),

  updateVisual: Ember.computed('playTimestamp', function() {
    Ember.run.later(function() {
      this.set('cut.visual', this.get('canvas').toDataURL());
    }.bind(this));
    return 1;
  }),

  init() {
    this._super(...arguments);
    this.get('resizeService').on('didResize', event => {
      this.recalculateCanvasSize();
    }.bind(this));
  },

  recalculateCanvasSize() {
    // TODO: recalculate canvas size on screen resize.
    var offsetHeight = this.get('canvas').offsetHeight;
    var offsetWidth = offsetHeight*this.get('aspectRatio');

    screen.height;
    screen.width;
    // this.get('canvas').height = offsetHeight;
    // this.get('canvas').width = offsetWidth;

    this.set('w', this.get('canvas').width);
    this.set('h', this.get('canvas').height);
  },

  findxy(res, e) {
    var boundingBox = this.get('canvas').getBoundingClientRect();

    if (res == 'down') {
      this.set('prevX', this.get('currX'));
      this.set('prevY', this.get('currY'));
      this.set('currX', e.clientX - boundingBox.left);
      this.set('currY', e.clientY - boundingBox.top);

      this.set('flag', true);
      this.set('dot_flag', true);
      if (this.get('dot_flag')) {
        this.get('canvasContext').beginPath();
        this.get('canvasContext').fillStyle = this.get('drawColor');
        this.get('canvasContext').fillRect(this.get('currX'), this.get('currY'), 2, 2);
        this.get('canvasContext').closePath();
        this.set('dot_flag', false);
      }
    }
    if (res == 'up' || res == 'out') {
      this.set('flag', false);
    }
    if (res == 'move') {
      if (this.get('flag')) {
        this.set('prevX', this.get('currX'));
        this.set('prevY', this.get('currY'));
        this.set('currX', e.clientX - boundingBox.left);
        this.set('currY', e.clientY - boundingBox.top);
        this.draw();
      }
    }
  },

  draw() {
    this.get('canvasContext').beginPath();
    this.get('canvasContext').moveTo(this.get('prevX'), this.get('prevY'));
    this.get('canvasContext').lineTo(this.get('currX'), this.get('currY'));
    this.get('canvasContext').strokeStyle = this.get('drawColor');
    this.get('canvasContext').stroke();
    this.get('canvasContext').closePath();
  },

  actions: {
    updateCutDuration() {
      var cutDuration = this.element.querySelector('input.cut-duration').value;
      this.set('cut.duration', cutDuration);
    },

    clearCanvas() {
      if (confirm('Really want to clear?')) {
        this.get('canvasContext').clearRect(0, 0, this.get('w'), this.get('h'));
      }
    }
  }
});
