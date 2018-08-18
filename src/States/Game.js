var vA = new Vector(), vB = new Vector(), vC = new Vector();

HOOKS = [];
CABLES = [];

var activeCableI = 0;
var startT = null;
var currentScreenI = 0;

resetCables = (ctx)=> {
  activeCableI = 0;
  CABLES = Array(100).fill().map((___, i)=> {
    return {
      p0: {x:0, y:2},
      p1: {x:0, y:2},
      active: false,
      id0: null,
      id1: null
    };
  });
  CABLES[0].active = true;
  E.cables.p = CABLES;
  E.cables.render(ctx, 0, 0);
};
resetHooks = (ctx)=> {
  var n = 100;
  HOOKS = Array(n).fill().map((_, i)=> {
    return {
      id: i+1,
      a: i*PI*0.8234,
      x: 0,
      y: 0,
      r: modulate(rand(), 0.2, 0.8),
      active: true,
      used: false,
      missed: false,
      startAt: easeOut(i/n)*10000,
      d: 1000+rand()*200,
      state: 'hidden',
    };
  });
  E.hooks.p = HOOKS;
  E.hooks.render(ctx, 0, 0);
};
updateLogic = (ms)=> {
  var CABLE = CABLES[activeCableI];
  // drag active cable --------------------------------
  if (T[0]) {
    E.cables.p[activeCableI].p1 = T[0];
  } else {
    E.cables.p[activeCableI].p1 = E.cables.p[activeCableI].p0;
  }
  // update hook positions ----------------------------
  var t = ms - startT;
  HOOKS.forEach((h)=> {
    var tt = modulate(t, 0, 1, h.startAt, h.startAt + h.d)
    if (tt < 0){
      h.active = false;
    } else {
      extend(h, {active: true, state: 'visible'});
    }
    h.x = h.r*easeOut(clamp(tt))*sin(h.a);
    h.y = h.r*easeOut(clamp(tt))*cos(h.a);
    if (tt > 1.5) {
      if (!h.used) {
        h.missed = true;
      }
      tt -= 1.5;
      h.x = (h.r+(3-h.id/100)*easeOut(clamp(tt)))*sin(h.a);
      h.y = (h.r+(3-h.id/100)*easeOut(clamp(tt)))*cos(h.a);
    }
  });
  // update cable anchors ----------------------------
  CABLES.forEach((c)=> {
    if (c.id0) {
      var {x, y} = HOOKS.find((h)=> h.id === c.id0);
      extend(c, {p0: {x, y}});
    }
    if (c.id1) {
      var {x, y} = HOOKS.find((h)=> h.id === c.id1);
      extend(c, {p1: {x, y}});
    }
  });
  // handle intersections ----------------------------
  if (T[0]) {
    // find and order hooks by distance to touch
    var dH = HOOKS.map((h, i)=> {
      // index and distance
      return {
        i, d: (h.active && h.state === 'visible' && !h.used) ? vA.set(h.x, h.y, 0).distanceSquaredTo(vB.set(T[0])) : Infinity,
      };
    }).sort((a, b)=> a.d - b.d );
  }
  if (dH) {
    var d = dH[0].d;
    var closestH = HOOKS[dH[0].i];
    if (d < 0.05 && closestH.state !== 'used') {
      closestH.used = true;
      closestH.state = 'used';
      var p = {x: closestH.x, y: closestH.y, z: 0};
      extend(CABLE, {
        p1: p,
        id1: closestH.id
      });
      activeCableI++;
      CABLE = CABLES[activeCableI];
      extend(CABLE, {
        active: true,
        p0: p,
        p1: p,
        id0: closestH.id
      });
      E.cables.entities[activeCableI].resetAt(p);
    }
  }
}

GameState = {
  enter: (ctx)=> {
    startT = performance.now();
    resetHooks(ctx);
    resetCables(ctx);
  },

  loop: (ctx, ms, dt)=> {
    updateLogic(ms);
    PHYS.tick();
    E.bg.render(ctx, dt, ms);
    E.cables.p = CABLES.filter((c)=>c.active);
    E.cables.render(ctx, dt, ms);
    E.hooks.p = HOOKS.filter((h)=>h.active);
    E.hooks.render(ctx, dt, ms);
  },

  leave: ()=> {

  }
};
