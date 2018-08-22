// Math -----------------------------------------
PI = Math.PI;
PI2 = PI * 2;

sin = Math.sin;
cos = Math.cos;
abs = Math.abs;
rand = Math.random;
floor = Math.floor;
round = Math.round;

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
easeIn = (t)=> t * t * t * t * t
easeOut = (t)=> --t * t * t * t * t + 1
easeInOut = (t)=> t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t
easeBackIn = (t)=> {
  var s = 1.7;
  return (t)*t*((s+1)*t - s);
}
easeBackOut = (t)=> {
  var s = 1.7;
  return --t*t*((s+1)*t+s)+1;
}

// Objects and Arrays -----------------------------
extend = Object.assign;
first = (array)=> array[0]
last = (array)=> array[array.length-1]
keys = Object.keys;
values = Object.values;
flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);


// Rendering -------------------------------------
pxToUnits = (px)=> px/W*2
unitsToPx = (u)=> u*W/2
nToA = (a)=> modulate(round(modulate(a, 0, GUIDES_AMOUNT)), 0, PI2, 0, GUIDES_AMOUNT)
