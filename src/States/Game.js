var vA = new Vector(), vB = new Vector(), vC = new Vector();

HOOKS = [];
CABLES = [];

stateConnected = 0;
stateCombos = [];
activeCableI = 0;
startT = null;
lastIntersect = null;
currentCombo = [];

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
  HOOKS = Array(HOOKS_AMOUNT).fill().map((_, i)=> {
    return {
      id: i+1,
      a: rand()*PI2,
      x: 0,
      y: 0,
      r: modulate(rand(), 0.5, 0.8),
      active: true,
      connected: false,
      missed: false,
      startAt: (i/HOOKS_AMOUNT)*10000,
      d: 1000+rand()*200,
      state: 'hidden',
    };
  });
  E.hooks.p = HOOKS;
};
updateLogic = (ms)=> {
  var CABLE = CABLES[activeCableI];
  var t = ms - startT;
  // drag active cable --------------------------------
  if (CABLE.active) {
    if (T[0]) {
      E.cables.p[activeCableI].p1 = T[0];
    } else {
      E.cables.p[activeCableI].p1 = E.cables.p[activeCableI].p0;
    }
  }
  // update hook positions ----------------------------
  HOOKS.forEach((h)=> {
    var tt = modulate(t, 0, 1, h.startAt, h.startAt + h.d)
    var r = null;
    if (!h.connected) {
      if (tt < 0){
        h.active = false;
      } else  if (tt <= 1) {
        extend(h, {active: true, state: 'visible'});
        r = h.currentR = h.r*easeOut(clamp(tt));
      } else if (tt > HOOKS_PAUSE) {
        tt -= HOOKS_PAUSE;
        r = h.currentR = h.r+(3-h.id/100)*easeOut(clamp(tt));
      }
    } else if (h.connected && h.comboAt) {
      var delay = 100;
      tt = modulate(t, 0, 1, h.comboAt + delay, h.comboAt + h.d + delay);
      r = h.hitR+(2)*easeOut(clamp(tt));
    }
    if (r !== null) {
      h.x = r*sin(h.a);
      h.y = r*cos(h.a);
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
  var sinceLastIntersect = t - lastIntersect;
  if (T[0]) {
    // find and order hooks by distance to touch
    var dH = HOOKS.map((h, i)=> {
      // index and distance
      return {
        i, d: (h.active && h.state === 'visible' && !h.connected) ? vA.set(h.x, h.y, 0).distanceSquaredTo(vB.set(T[0])) : Infinity,
      };
    }).sort((a, b)=> a.d - b.d );
  }
  if (dH) {
    var d = dH[0].d;
    var closestH = HOOKS[dH[0].i];
    if (d < 0.05 && closestH.state !== 'used') {
      var p = {x: closestH.x, y: closestH.y, z: 0};
      extend(closestH, {
        connected: t,
        state: 'used',
        hitR: closestH.currentR
      });
      stateConnected++;
      currentCombo.push(closestH);
      if (sinceLastIntersect < COMBO_DELTA) {
        extend(CABLE, {
          p1: p,
          id1: closestH.id
        });
        activeCableI++;
      }
      CABLE = CABLES[activeCableI];
      extend(CABLE, {
        active: true,
        p0: p,
        p1: p,
        id0: closestH.id
      });
      E.cables.entities[activeCableI].resetAt(p);
      lastIntersect = t;
    }
  }
  sinceLastIntersect = t - lastIntersect;
  if (sinceLastIntersect > COMBO_DELTA) {
    onComboDone(t);
  }
  if (!T[0]) {
    onComboDone(t);
    lastIntersect = -10000;
    CABLE.active = false;
  }
};
onComboDone = (t)=> {
  currentCombo.forEach((h)=> h.comboAt = t);
  currentCombo = [];
};

GameState = {
  enter: (ctx)=> {
    startT = performance.now();
    stateConnected = 0;
    stateCombos = [];
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

    E.mask.render(ctx, dt, ms);

    var points = stateConnected;
    // extend(E.pointsCounter.p, {n: points, s:0.5, x: 0, y: -pxToUnits(H/2)+0.1 });
    extend(E.pointsCounter.p, {n: points, s:0.5, x: 0, y: -1.3 });
    E.pointsCounter.render(ctx);
  },

  leave: ()=> {

  }
};
