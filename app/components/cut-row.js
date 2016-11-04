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
  drawColor: 'black',

  cutNumber: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),

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
      var cutDuration = this.element.querySelector('input.cutDuration').value;
      this.set('cut.duration', cutDuration);
    },

    clearCanvas() {
      if (confirm('Really want to clear?')) {
        this.get('canvasContext').clearRect(0, 0, this.get('w'), this.get('h'));
      }
    }
  },

  didInsertElement() {
    var self = this;
    var canvas = this.element.querySelector('canvas');
    this.set('canvas', canvas);

    var offsetHeight = canvas.offsetHeight;
    var offsetWidth = offsetHeight*this.get('aspectRatio');
    canvas.height = offsetHeight;
    canvas.width = offsetWidth;

    var canvasContext = canvas.getContext('2d')
    this.set('canvasContext', canvasContext);

    this.set('w', canvas.width);
    this.set('h', canvas.height);

    canvasContext.lineWidth = 2;

    this.get('canvas').addEventListener('mousemove', function (e) {
      findxy('move', e)
    }, false);
    this.get('canvas').addEventListener('mousedown', function (e) {
      findxy('down', e)
    }, false);
    this.get('canvas').addEventListener('mouseup', function (e) {
      findxy('up', e)
    }, false);
    this.get('canvas').addEventListener('mouseout', function (e) {
      findxy('out', e)
    }, false);

    function enterEraseMode() {
      self.set('drawColor', 'white');
    }

    function enterDrawMode(obj) {
      self.set('drawColor', 'black');
    }

    function findxy(res, e) {
      var boundingBox = canvas.getBoundingClientRect();

      if (res == 'down') {
        self.set('prevX', self.get('currX'));
        self.set('prevY', self.get('currY'));
        self.set('currX', e.clientX - boundingBox.left);
        self.set('currY', e.clientY - boundingBox.top);

        self.set('flag', true);
        self.set('dot_flag', true);
        if (self.get('dot_flag')) {
          canvasContext.beginPath();
          canvasContext.fillStyle = self.get('drawColor');
          canvasContext.fillRect(self.get('currX'), self.get('currY'), 2, 2);
          canvasContext.closePath();
          self.set('dot_flag', false);
        }
      }
      if (res == 'up' || res == 'out') {
        self.set('flag', false);
      }
      if (res == 'move') {
        if (self.get('flag')) {
          self.set('prevX', self.get('currX'));
          self.set('prevY', self.get('currY'));
          self.set('currX', e.clientX - boundingBox.left);
          self.set('currY', e.clientY - boundingBox.top);
          self.draw();
        }
      }
    }
  }
});
