GameState = {
  enter: (ctx)=> {
    startT = performance.now();
    LOG = {text: '', startAt: -1000};
    stateConnected = 0;
    stateCombos = [];
    stateBads = 0;
    statePerfects = [];
    lastBadTapAt = -10000;
    nextBatchIsSpecial = false;
    lastBatchId = 0;
    resetHooks(ctx);
    resetCables(ctx);

    tlE([
      [0,    E.bg,                { _s: 'normal'             }],
      [0,    E.radial,            { _s: 'normal'             }],
      [0,    E.pointsCounter,     { _s: 'normal', c: 0, n:0  }],
      [50,   E.startBtn,          { _s: 'hidden'             }],
      [850,  E.introText,         { v: 0                     }],
      [800,  E.introText2,        { v: 0                     }],
      // [1100, E.squares,           { c: 0                     }],
      // [1100, E.logos,             { c: 0                     }]
    ]);
  },

  loop: (ctx, ms, dt)=> {
    updateLogic(ms);
    PHYS.tick();

    const cameraFx = easeIn(clamp(modulate(t, 1, 0, lastBadTapAt, lastBadTapAt+1000)));
    CAMERA_OFF_X = cameraFx*15*(1+cos(floor(ms/3)*0.2))*sin(floor(ms/3)*0.842);
    CAMERA_OFF_Y = cameraFx*15*(1+sin(floor(ms/3)*0.2))*cos(floor(ms/3)*0.123);

    E.bg.render(ctx, dt, ms);

    setAllE([
      [E.radial,           { fx: (floor((cameraFx*8))%2 == 1) ? 1 : 0 }],
      [E.alert,            { v: (LOG.startAt+500>t), t: LOG.t, n: LOG.n }],
      [E.bigE,             { v: E.radial.p.fx }],
      [E.countDownCounter, { s: 1, v: (COUNTDOWN > 1), n: COUNTDOWN }],
      [E.timer,            { p: clamp((GAME_DURATION+COUNTDOWN_DURATION-t)/GAME_DURATION) }]
    ]);

    E.cables.p = CABLES.filter((c)=>c.active);
    E.cables.render(ctx, dt, ms);
    E.hooks.p = HOOKS.filter((h)=>h.active);
    E.hooks.render(ctx, dt, ms);
    E.radial.render(ctx, dt, ms);
    // E.squares.render(ctx, dt, ms);
    // E.logos.render(ctx, dt, ms);
    E.alert.render(ctx, dt, ms);
    E.bigE.render(ctx, dt, ms);
    G.points = getPoints();
    E.pointsCounter.setNumber(getPoints());
    E.pointsCounter.render(ctx);
    E.countDownCounter.render(ctx);
    E.timer.render(ctx, dt, ms);
  }
};
