import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'cut-row',

  cutNumber: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),
  didInsertElement() {
    var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false,
        drawColor = 'black',
        canvas = this.element.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height;

    ctx.lineWidth = 2;

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
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = drawColor;
      ctx.stroke();
      ctx.closePath();
    }

    function clearCanvas() {
      if (confirm('Really want to clear?')) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById('canvasimg').style.display = 'none';
      }
    }

    function save() {
      var dataURL = canvas.toDataURL();
      document.getElementById('canvasimg').src = dataURL;
      document.getElementById('canvasimg').style.display = 'inline';
    }

    function findxy(res, e) {
      if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
          ctx.beginPath();
          ctx.fillStyle = drawColor;
          ctx.fillRect(currX, currY, 2, 2);
          ctx.closePath();
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
          currX = e.clientX - canvas.offsetLeft;
          currY = e.clientY - canvas.offsetTop;
          draw();
        }
      }
    }
  }
});
