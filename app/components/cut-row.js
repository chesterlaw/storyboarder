import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'cut-row',

  cutNumber: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),

  actions: {
    updateCutDuration() {
      var cutDuration = this.element.querySelector('input.cutDuration').value;
      this.set('cut.duration', cutDuration);
    },

    clearCanvas() {
      if (confirm('Really want to clear?')) {
        this.get('canvasContext').clearRect(0, 0, this.get('w'), this.get('h'));
        // document.getElementById('canvasimg').style.display = 'none';
      }
    }
  },

  didInsertElement() {
    var aspectRatio = 1.33333333;
    var flag = false;
    var prevX = 0;
    var currX = 0;
    var prevY = 0;
    var currY = 0;
    var dot_flag = false;
    var drawColor = 'black';
    var canvas = this.element.querySelector('canvas');

    var offsetHeight = canvas.offsetHeight;
    var offsetWidth = offsetHeight*aspectRatio;
    canvas.height = offsetHeight;
    canvas.width = offsetWidth;

    var canvasContext = canvas.getContext('2d')
    this.set('canvasContext', canvasContext);

    this.set('w', canvas.width);
    this.set('h', canvas.height);

    canvasContext.lineWidth = 2;

    canvas.addEventListener('mousemove', function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener('mousedown', function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener('mouseup', function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener('mouseout', function (e) {
        findxy('out', e)
    }, false);

    function enterEraseMode() {
      drawColor = 'white';
    }

    function enterDrawMode(obj) {
      drawColor = 'black';
    }

    function draw() {
      canvasContext.beginPath();
      canvasContext.moveTo(prevX, prevY);
      canvasContext.lineTo(currX, currY);
      canvasContext.strokeStyle = drawColor;
      canvasContext.stroke();
      canvasContext.closePath();
    }

    function save() {
      var dataURL = canvas.toDataURL();
      document.getElementById('canvasimg').src = dataURL;
      document.getElementById('canvasimg').style.display = 'inline';
    }

    function findxy(res, e) {
      var boundingBox = canvas.getBoundingClientRect();

      if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - boundingBox.left;
        currY = e.clientY - boundingBox.top;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
          canvasContext.beginPath();
          canvasContext.fillStyle = drawColor;
          canvasContext.fillRect(currX, currY, 2, 2);
          canvasContext.closePath();
          dot_flag = false;
        }
      }
      if (res == 'up' || res == 'out') {
          flag = false;
      }
      if (res == 'move') {
        if (flag) {
          prevX = currX;
          prevY = currY;
          currX = e.clientX - boundingBox.left;
          currY = e.clientY - boundingBox.top;
          draw();
        }
      }
    }
  }
});
