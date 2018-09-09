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
statePerfects = 0;
stateHighscore = 0;
startT = null;
lastIntersect = null;
lastBadTapAt = -1000;
nextBatchIsSpecial = false;

// Hooks -------------------------------------
lastHookId = 0;
badHooksAt = [];
specialHookAt = 0;
currentCombo = [];
lastComboHookId = null;
function createHook(o) {
  lastHookId++;
  return extend({
    id: lastHookId,
    batchId: lastBatchId,
    a: nToA(rand()),
    x: 0,
    y: 0,
    r: modulate(rand(), 0.2, 0.7),
    currentR: 0,
    active: true,
    connected: false,
    missed: false,
    startAt: 0,
    d: 1000+rand()*200,
    state: 'hidden',
    bad: !!badHooks.find((n)=>n===lastHookId)&&!o.special,
    special: false,
    eased: true
  }, o);
};
createHooksBatch = {
  arc: (startAt)=> {
    var n = floor(modulate(rand(), 3, 6));
    var r = modulate(rand(), 0.4, 0.7);
    var a = nToA(rand());
    return mapN(n, (i)=> {
      return createHook({
        a: a+i*PI*4/GUIDES_AMOUNT,
        r,
        startAt
      });
    });
  },
  // line: (startAt)=> {
  //   var a = nToA(rand());
  //   return range(4).map((i)=> {
  //     return createHook({
  //       a: (i<2) ? a : a+PI,
  //       r: (i%2) ? 0.3 : 0.6,
  //       startAt
  //     });
  //   });
  // },
  polygon: (startAt)=> {
    var n = rand() < 0.5 ? 3 : 6;
    var a = nToA(rand());
    var r = modulate(rand(), 0.3, 0.7);
    return mapN(n, (i)=> {
      return createHook({
        a: a+i*PI2/n,
        r,
        startAt
      });
    });
  },
  weird: (startAt)=> {
    var n = 3;
    var a = nToA(rand());
    return mapN(n, (i)=> {
      return createHook({
        a: a+i*PI2/n,
        r: 0.4,
        startAt
      });
    }).concat(mapN(n, (i)=> {
      return createHook({
        a: PI2/GUIDES_AMOUNT+a+i*PI2*2/GUIDES_AMOUNT,
        r: 0.7,
        startAt
      });
    }));
  },
  weirdStar: (startAt)=> {
    var n = 3;
    var a = nToA(rand());
    return mapN(n, (i)=> {
      return createHook({
        a: a+i*PI2/n,
        r: 0.4,
        startAt
      });
    }).concat(mapN(n, (i)=> {
      return createHook({
        a: (PI2/GUIDES_AMOUNT)+a+i*PI2/n,
        r: 0.7,
        startAt
      });
    }));
  },
  triangle: (startAt)=> {
    var n = 3;
    var a = nToA(rand());
    return mapN(n, (i)=> {
      return createHook({
        a: a+i*PI2/n,
        r: 0.4,
        startAt
      });
    }).concat(mapN(n, (i)=> {
      return createHook({
        a: (PI2*3/GUIDES_AMOUNT)+a+i*PI2/n,
        r: 0.7,
        startAt
      });
    }));
  },
  star: (startAt)=> {
    var n = 6;
    var a = nToA(rand());
    return mapN(n, (i)=> {
      return createHook({
        a: a+i*PI2/n,
        r: 0.4,
        startAt
      });
    }).concat(mapN(n, (i)=> {
      return createHook({
        a: (PI2*2/GUIDES_AMOUNT)+a+i*PI2/n,
        r: 0.7,
        startAt
      });
    }));
  },
  doubleArc: (startAt)=> {
    var a = nToA(rand());
    return mapN(3, (i)=> {
      return createHook({
        a: a+i*PI2*2/GUIDES_AMOUNT,
        r: 0.4,
        startAt
      });
    }).concat(mapN(3, (i)=> {
      return createHook({
        a: PI+a+i*PI2*2/GUIDES_AMOUNT,
        r: 0.7,
        startAt
      });
    }));
  },
  special: (startAt)=> {
    var a = nToA(rand());
    var n = GUIDES_AMOUNT;
    return range(n).map((i)=> {
      return createHook({
        a: a+i*PI2/n,
        startAt: startAt+20*i,
        d: 8000,
        eased: false,
        bad: false
      });
    });
  }
};
function resetHooks() {
  HOOKS = [];
  lastHookId = 0;
  lastBatchId = 0;
  lastComboHookId = 0;
  badHooks = range(round(HOOKS_AMOUNT/BAD_HOOKS_FRQ)).map((i)=>round(i*BAD_HOOKS_FRQ+rand()*BAD_HOOKS_FRQ/3));
  badHooks.shift();
  specialHookAt = modulate(rand(), GAME_DURATION*0.3, GAME_DURATION*0.7);
  // specialHookAt = 5000;
  E.hooks.p = HOOKS;
};
function addHooksBatch() {
  lastBatchId++;
  var batch = createHooksBatch[
    keys(createHooksBatch)[round(rand()*(keys(createHooksBatch).length-2))]
  ](t+500);
  // var batch = createHooksBatch.special(t+500);
  HOOKS = HOOKS.concat(batch);
}
function addSpecialHooksBatch() {
  lastBatchId++;
  var batch = createHooksBatch.special(t+500);
  HOOKS = HOOKS.concat(batch);
}
function getVisibleHooks() {
  return HOOKS.filter((h)=> h.currentR < ARENA_RADIUS + 0.1);
}

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
  // CABLES[0].active = true;
  E.cables.entities.forEach(e=>e.reset())
  E.cables.p = CABLES;
  E.cables.render(ctx, 0, 0);
};

// Update ----------------------------------------------
function updateLogic(ms) {
  t = ms - startT;
  const timeDone = t > GAME_DURATION+COUNTDOWN_DURATION;

  // countdown ----------------------------------------
  COUNTDOWN = modulate(t, 4, 1, 0, COUNTDOWN_DURATION);

  // game over ----------------------------------------
  // if (timeDone) {
  //   extend(LOG, {t:'TIME UP', startAt: t});
  // }
  if (t > GAME_DURATION+COUNTDOWN_DURATION+2000) {
    return G.setState('gameover');
  }

  // batch done  ------------------------------------
  if(getVisibleHooks().length === 0) {
    const lastBatch = HOOKS.filter((h)=> h.batchId === lastBatchId && !h.bad && !h.special);
    const lastBatchMissed = lastBatch.filter((h)=> !h.connected)
    if (!lastBatchMissed.length && t > COUNTDOWN_DURATION + 1000) {
      // extend(LOG, {t:'PERFECT', startAt: t});
      extend(LOG, {t:'P', startAt: t});
      statePerfects++;
    }
    if (t > COUNTDOWN_DURATION && t < GAME_DURATION+COUNTDOWN_DURATION) {
      if (nextBatchIsSpecial) {
        addSpecialHooksBatch();
        nextBatchIsSpecial = false;
      } else {
        addHooksBatch();
      }
    }
  }

  // special Hook -------------------------------------
  if (specialHookAt < t) {
    HOOKS.push(createHook({
      special: true,
      startAt: t,
      eased: false,
      d: SPECIAL_HOOK_DURATION
    }));
    specialHookAt = Infinity;
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
      } else {
        if (h.eased) {
          if (tt <= 1) {
            extend(h, {active: true, state: 'visible'});
            r = h.currentR = h.r*easeOut(clamp(tt));
          } else if (tt > HOOKS_PAUSE) {
            tt -= HOOKS_PAUSE;
            r = h.currentR = h.r+easeOut(clamp(tt));
          }
        } else {
            extend(h, {active: true, state: 'visible'});
            r = h.currentR = 2*easeOut(clamp(tt));
        }
      }
    } else if (h.connected && h.comboAt) {
      var delay = 100;
      tt = modulate(t, 0, 1, h.comboAt + delay, h.comboAt + h.d + delay);
      r = h.currentR = h.hitR+(2)*easeOut(clamp(tt));
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
  if (!knockedOut && !timeDone) {
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
    if (dH&&dH[0]) {
      var d = dH[0].d;
      var closestH = HOOKS[dH[0].i];
      if (d < 0.05 && closestH.state !== 'used' && closestH.state !== 'hidden') {
        if (!closestH.bad) {
          var p = {x: closestH.x, y: closestH.y, z: 0};
          extend(closestH, {
            connected: t,
            state: 'used',
            hitR: closestH.currentR,
          });
          stateConnected++;
          currentCombo.push(closestH);
          // extend(LOG, {t:'COMBO '+currentCombo.length, startAt: t});
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
          if (closestH.special) {
            nextBatchIsSpecial = true;
            // E.mask.setState('normal');
            // E.mask.setState('special');
          }
        } else {
          extend(closestH, {
            connected: t,
            state: 'hidden',
            hitR: closestH.currentR,
            currentR: 3
          });
          // extend(LOG, {t:'!!!', startAt: t});
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
    extend(LOG, {t:'COMBO', n: currentCombo.length, startAt: t});
  CABLES[activeCableI].active = false;
  lastComboHookId = last(currentCombo).id;
  currentCombo.forEach((h)=> h.comboAt = t);
  stateCombos.push(currentCombo.length-1);
  currentCombo = [];
};

// Points -----------------------------------
function getPoints() {
  var points = stateConnected + stateCombos.reduce((a, c)=> a+(c*c), 0);
  points -= stateBads*POINTS_BAD;
  points += statePerfects*POINTS_PERF;
  return clamp(points, 0, Infinity);
}
