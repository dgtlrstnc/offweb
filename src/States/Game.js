var vA = new Vector(), vB = new Vector(), vC = new Vector();

HOOKS = [];
CABLES = [];
COUNTDOWN = 0;
POINTER = {x:0, y:0, state: 'hidden'};
LOG = {text: '', startAt: 0};

t = GAME_DURATION;
stateConnected = 0;
stateCombos = [];
stateBads = 0;
startT = null;
lastIntersect = null;
lastBadTapAt = -1000;

// Hooks -------------------------------------
lastHookId = 0;
badHooksAt = [];
currentCombo = [];
lastComboHookId = null;
function createHook(o) {
  lastHookId++;
  return extend({
    id: lastHookId,
    a: rand()*PI2,
    x: 0,
    y: 0,
    r: modulate(rand(), 0.2, 0.7),
    active: true,
    connected: false,
    missed: false,
    startAt: 0,
    d: 1000+rand()*200,
    state: 'hidden',
    bad: !!badHooks.find((n)=>n===lastHookId)
  }, o);
};
createBatch = {
  arc: (startAt)=> {
    var n = floor(modulate(rand(), 3, 6));
    var r = modulate(rand(), 0.4, 0.7);
    var a = nToA(rand());
    return range(n).map((i)=> {
      return createHook({
        a: a+i*PI*4/GUIDES_AMOUNT,
        r,
        startAt
      });
    });
  },
  line: (startAt)=> {
    var a = nToA(rand());
    return range(4).map((i)=> {
      return createHook({
        a: (i<2) ? a : a+PI,
        r: (i%2) ? 0.3 : 0.6,
        startAt
      });
    });
  },
  polygon: (startAt)=> {
    var n = rand() < 0.5 ? 3 : 6;
    var a = nToA(rand());
    var r = modulate(rand(), 0.3, 0.7);
    return range(n).map((i)=> {
      return createHook({
        a: a+i*PI2/n,
        r,
        startAt
      });
    });

  }
};
function resetHooks(ctx) {
  HOOKS = [];
  lastComboHookId = 0;
  badHooks = range(round(HOOKS_AMOUNT/BAD_HOOKS_FRQ)).map((i)=>round(i*BAD_HOOKS_FRQ+rand()*BAD_HOOKS_FRQ/3));
  badHooks.shift();
  var i = 0;
  var startAt = 3000;
  while (i < HOOKS_AMOUNT) {
    var batch = createBatch[['arc', 'line', 'polygon'][round(rand()*2)]](startAt);
    // var batch = createBatch.polygon(startAt);
    HOOKS = HOOKS.concat(batch);
    i += batch.length;
    startAt += 2000;
  }
  E.hooks.p = HOOKS;
};

// Cables -------------------------------------------
activeCableI = 0;
function resetCables(ctx) {
  activeCableI = 0;
  CABLES = Array(100).fill().map((___, i)=> {
    return {
      p0: {x:0, y:2},
      p1: {x:0, y:2},
      active: false,
      id0: null,
      id1: null,
      state: 'normal'
    };
  });
  CABLES[0].active = true;
  E.cables.entities.forEach(e=>e.reset())
  E.cables.p = CABLES;
  E.cables.render(ctx, 0, 0);
};

// Update ----------------------------------------------
function updateLogic(ms) {
  t = ms - startT;

  // countdown ----------------------------------------
  COUNTDOWN = modulate(t/1000, 4, 1, 0, 3);

  // game over ----------------------------------------
  if (t > GAME_DURATION+3000) {
    return G.setState('gameover');
  }

  // drag active cable --------------------------------
  var CABLE = CABLES[activeCableI];
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
        r = h.currentR = h.r+easeOut(clamp(tt));
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
  var knockedOut = (lastBadTapAt+KNOCKOUT_DURATION >= t);
  var sinceLastIntersect = t - lastIntersect;
  if (!knockedOut) {
    if (T[0]) {
      var dC = vA.set(T[0]).distanceTo(vB.set(0, 0, 0));
      if (dC > 0.25 && dC < ARENA_RADIUS) {
        // find and order hooks by distance to touch
        var dH = HOOKS.map((h, i)=> {
          // index and distance
          return {
            i, d: (h.active && h.state === 'visible' && !h.connected) ? vA.set(h.x, h.y, 0).distanceSquaredTo(vB.set(T[0])) : Infinity,
          };
        }).sort((a, b)=> a.d - b.d );
      }
    }
    if (dH) {
      var d = dH[0].d;
      var closestH = HOOKS[dH[0].i];
      if (d < 0.05 && closestH.state !== 'used' && closestH.state !== 'hidden') {
        if (!closestH.bad) {
          var p = {x: closestH.x, y: closestH.y, z: 0};
          extend(closestH, {
            connected: t,
            state: 'used',
            hitR: closestH.currentR
          });
          stateConnected++;
          currentCombo.push(closestH);
          extend(LOG, {t:'+'+currentCombo.length, startAt: t});
          if (sinceLastIntersect < COMBO_DELTA) {
            extend(CABLE, {
              p1: p,
              id1: closestH.id,
              state: 'connected'
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
          E.cables.entities[activeCableI].reset(p);
          lastIntersect = t;
        } else {
          extend(closestH, {
            connected: t,
            state: 'hidden',
            hitR: closestH.currentR
          });
          E.mask.setState('normal');
          E.mask.setState('bad');
          extend(LOG, {t:'-'+POINTS_BAD, startAt: t});
          knockedOut = true;
          lastBadTapAt = t;
          stateBads++;
          lastIntersect = -10000;
          CABLE.active = false;
        }
      }
    }
  }
  sinceLastIntersect = t - lastIntersect;
  if (sinceLastIntersect > COMBO_DELTA) {
    onComboDone(t, knockedOut);
  }
  if (!T[0]) {
    onComboDone(t, knockedOut);
    lastIntersect = -10000;
    CABLE.active = false;
  }

  // pointer ----------------------------------
  if (T[0]) {
    POINTER.state = 'visible';
    extend(POINTER, T[0]);
  } else {
    POINTER.state = 'hidden';
  }
};
function onComboDone(t, knockedOut) {
  if (!currentCombo.length || lastComboHookId === last(currentCombo).id) return;
  if (currentCombo.length>1 && !knockedOut)
    extend(LOG, {t:'+'+currentCombo.length+'x'+currentCombo.length+'x'+currentCombo.length, startAt: t});
  lastComboHookId = last(currentCombo).id;
  currentCombo.forEach((h)=> h.comboAt = t);
  stateCombos.push(currentCombo.length-1);
  currentCombo = [];
};

// -----------------------------------------------------

GameState = {
  enter: (ctx)=> {
    startT = performance.now();
    E.timeCounter.p.n = GAME_DURATION/1000;
    stateConnected = 0;
    stateCombos = [];
    lastBadTapAt = -10000;
    LOG = {text: '', startAt: 0};
    resetHooks(ctx);
    resetCables(ctx);
    E.pointsCounter.setState('normal');
    E.mask.setState('normal');
  },

  loop: (ctx, ms, dt)=> {
    updateLogic(ms);
    PHYS.tick();
    E.bg.render(ctx, dt, ms);

    E.guides.render(ctx, dt, ms);

    E.cables.p = CABLES.filter((c)=>c.active);
    E.cables.render(ctx, dt, ms);
    E.hooks.p = HOOKS.filter((h)=>h.active);
    E.hooks.render(ctx, dt, ms);

    E.mask.render(ctx, dt, ms);

    extend(E.timeCounter.p, {
      x: -0.7, y: -1.15, v: !(COUNTDOWN > 1),
      n: floor((GAME_DURATION+4000-t)/1000)
    });
    E.timeCounter.render(ctx);

    extend(E.pointsLogs.p, {
      x: 0, y: -1.15, v: (LOG.startAt+1000>t), s: 0.2,
      t: LOG.t
    });
    E.pointsLogs.render(ctx, dt, ms);

    var points = stateConnected + stateCombos.reduce((a, c)=> a+(c*c*c), 0);
    points -= stateBads*POINTS_BAD;
    G.points = points;
    extend(E.pointsCounter.p, {
      x: 0.7, y: -1.15, v: !(COUNTDOWN > 1),
    });
    E.pointsCounter.setNumber(clamp(points, 0, Infinity));
    E.pointsCounter.render(ctx);

    extend(E.countDownCounter.p, {
      x: 0, y: -0.1, s: 1, v: (COUNTDOWN > 1),
      n: COUNTDOWN
    });
    E.countDownCounter.render(ctx);

    extend(E.pointer.p, POINTER);
    E.pointer.setState(POINTER.state);
    E.pointer.render(ctx);
  },

  leave: ()=> {

  }
};
