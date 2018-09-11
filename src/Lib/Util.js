// Math -----------------------------------------
PI = Math.PI;
PI2 = PI * 2;

sin = Math.sin;
cos = Math.cos;
abs = Math.abs;
rand = Math.random;
floor = Math.floor;
round = Math.round;
ceil = Math.ceil;
min = Math.min;
max = Math.max;

clamp = (val, min = 0, max = 1)=> {
     if (val < min) return min;
     if (val > max) return max;
     return val;
};
normalize = (val, start, end)=> {
   var length = end - start;
   var n = val - start;
   n = n / length;
   return n;
};
modulate = (val, start, end, originStart = 0, originEnd = 1)=> {
  val = normalize(val, originStart, originEnd);
  var length = end - start;
  var m = val * length + start;
  return m;
};
times = (n, cb)=> {
   Array(n).fill().forEach((_, i)=>cb(i));
};
range = (n)=> {
   return Array(n).fill().map((_, i)=>i);
};
mapN = (n, cb)=> {
   return range(n).map(cb)
};
easeIn = (t)=>  t * t * t
easeOut = (t)=> {
  var f = t - 1.0
  return f * f * f + 1.0
}
easeInOut = (t)=> {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}
// easeBackIn = (t)=> {
//   var s = 1.7;
//   return (t)*t*((s+1)*t - s);
// }
// easeBackOut = (t)=> {
//   var s = 1.7;
//   return --t*t*((s+1)*t+s)+1;
// }

// Objects and Arrays -----------------------------
extend = Object.assign;
first = (array)=> array[0]
last = (array)=> array[array.length-1]
keys = Object.keys;
values = Object.values;
// flatten = list => list.reduce(
//     (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
// );


// Rendering -------------------------------------
pxToUnits = (px)=> px/W*2
unitsToPx = (u)=> u*W/2
nToA = (a)=> modulate(round(modulate(a, 0, GUIDES_AMOUNT)), 0, PI2, 0, GUIDES_AMOUNT)


// Entities ---------------------------------------
// sugar setter for several entity props
setAllE = (entities)=> {
  entities.forEach((e)=> {
    extend(e[0].p, e[1]);
    var state = e[1]._s;
    if (state) e[0].setState(state);
  });
};
// sugar to render several entities
renderAllE = (ctx, dt, ms)=> {
  // TODO
};
// --
tlEStartAt = 0;
tlETriggers = [];
_updateTlE = (ms)=> {
  var t = ms - tlEStartAt;
  var remainT = [];
  var trigger;
  while(trigger = tlETriggers.pop()) {
    if (trigger[0] < t) {
      extend(trigger[1].p, trigger[2]);
      var state = trigger[2]._s;
      if (state) trigger[1].setState(state);

    } else {
      remainT.push(trigger);
    }
  }
  tlETriggers = remainT;
  if (!remainT.length) TICKER.remove(_updateTlE);
}
// create a timeline of entity setters
tlE = (triggers)=> {
  tlETriggers = triggers;
  tlEStartAt = performance.now();
  TICKER.add(_updateTlE);
}
