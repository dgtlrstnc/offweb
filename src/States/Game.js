var vA = new Vector(), vB = new Vector(), vC = new Vector();

SCREENS = [];
CABLES = [];

var activeCableI = 0;
var startT = null;
var currentScreenI = 0;

resetCables = (ctx)=> {
  activeCableI = 0;
  CABLES = Array(100).fill().map((___, i)=> {
    return { p0: {x:0, y:2}, p1: {x:0, y:2}, active: false };
  });
  CABLES[0].active = true;
  E.cables.p = CABLES;
  E.cables.render(ctx, 0, 0);
};
resetScreens = (ctx)=> {
  SCREENS = [];
};
addScreen = (ctx, startAt = 1)=> {
  var n = 10;
  SCREENS.push({
    HOOKS: Array(n).fill().map((_, i)=> {
      return {
        x: sin(i*123.123) * 0.8,
        y: startAt-i/n*2,
        active: true,
        used: false,
        missed: false,
        showAt: rand()*300,
        hideAt: 1300 + rand()*500,
        state: 'hidden',
      };
    })
  });
  startT = performance.now();
};
updateLogic = (ms)=> {
  var SCREEN = SCREENS[currentScreenI];
  var CABLE = CABLES[activeCableI];
  // drag active cable
  if (T[0]) {
    E.cables.p[activeCableI].p1 = T[0];
  } else {
    E.cables.p[activeCableI].p1 = E.cables.p[activeCableI].p0;
  }
  // Show/hide hooks
  var t = ms - startT;
  SCREEN.HOOKS.forEach((h)=> {
    if (h.showAt < t && h.hideAt > t && h.state !== 'visible') {
      h.state = 'visible';
    }
    if (h.hideAt < t && !h.used) {
      h.state = 'hidden';
      h.missed = true;
    }
  });
  if (T[0]) {
    // find and order hooks by distance to touch
    var dH = SCREEN.HOOKS.map((h, i)=> {
      return {
        i, x: h.x, y: h.y,
        d: (h.active && h.state === 'visible' && !h.used) ? vA.set(h.x, h.y, 0).distanceSquaredTo(vB.set(T[0])) : Infinity,
      };// index and distance
    }).sort((a, b)=> a.d - b.d );
  }
  // handle intersections
  if (dH) {
    var closestH = dH[0];
    if (closestH.d < 0.05) {
      SCREEN.HOOKS[closestH.i].used = true;
      var p = {x: closestH.x, y: closestH.y, z: 0};
      CABLE.p1 = p;
      activeCableI++;
      CABLE = CABLES[activeCableI];
      extend(CABLE, {active: true, p0: p, p1: p});
      E.cables.entities[activeCableI].resetAt(p);
    }
  }
  // screens handling
  var aliveHooks = SCREEN.HOOKS.filter((h)=> !h.used && !h.missed);
  if (aliveHooks.length === 0) {
  }
}

GameState = {
  enter: (ctx)=> {
    resetScreens(ctx);
    addScreen(ctx);
    resetCables(ctx);
  },

  loop: (ctx, ms, dt)=> {
    updateLogic(ms);
    PHYS.tick();
    E.bg.render(ctx, dt, ms);
    E.cables.p = CABLES.filter((c)=>c.active);
    E.cables.render(ctx, dt, ms);
    E.hooks.p = flatten(SCREENS.map((s)=>s.HOOKS)).filter((h)=>h.active);
    E.hooks.render(ctx, dt, ms);
  },

  leave: ()=> {

  }
};
