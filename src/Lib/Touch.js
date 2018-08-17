T = [];

var canvas = document.getElementById('game');

var handleTouch = (e)=> {
  e.preventDefault();
  var ts = Array.prototype.slice.call(e.touches);
  ts.forEach((t)=> {
    T[0] = {
      x: pxToUnits(t.clientX - W/2),
      y: pxToUnits(t.clientY - H/2),
      z: 0
    };
  });
};
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', ()=> {
  T = [];
});
