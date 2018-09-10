GameState = {
  enter: (ctx)=> {
    startT = performance.now();
    // E.timeCounter.p.n = GAME_DURATION/1000;
    LOG = {text: '', startAt: -1000};
    stateConnected = 0;
    stateCombos = [];
    stateBads = 0;
    statePerfects = 0;
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
      [1100, E.squares,           { c: 0                     }],
      [1100, E.logos,             { c: 0                     }]
    ]);

    // E.bg.setState('normal');
    // E.radial.setState('out');
    // extend(E.pointsCounter.p, {c: 0});
    // E.pointsCounter.setState('normal');
    // extend(E.squares.p, {c: 0});
    // extend(E.logos.p, {c: 0});
  },

  loop: (ctx, ms, dt)=> {
    updateLogic(ms);
    PHYS.tick();
    E.bg.render(ctx, dt, ms);

    const cameraFx = easeIn(clamp(modulate(t, 1, 0, lastBadTapAt, lastBadTapAt+1000)));
    CAMERA_OFF_X = cameraFx*15*(1+cos(floor(ms/3)*0.2))*sin(floor(ms/3)*0.842);
    CAMERA_OFF_Y = cameraFx*15*(1+sin(floor(ms/3)*0.2))*cos(floor(ms/3)*0.123);
    E.radial.p.fx = (floor((cameraFx*8))%2 == 1) ? 1 : 0;

    // E.guides.render(ctx, dt, ms);

    E.cables.p = CABLES.filter((c)=>c.active);
    E.cables.render(ctx, dt, ms);
    E.hooks.p = HOOKS.filter((h)=>h.active);
    E.hooks.render(ctx, dt, ms);

    // E.mask.render(ctx, dt, ms);
    E.radial.render(ctx, dt, ms);
    E.squares.render(ctx, dt, ms);
    E.logos.render(ctx, dt, ms);

    // extend(E.timeCounter.p, {
    //   x: -0.7, y: -1.15, v: !(COUNTDOWN > 1),
    //   n: ceil((GAME_DURATION+COUNTDOWN_DURATION-t)/1000)
    // });
    // E.timeCounter.render(ctx);

    extend(E.alert.p, {
      v: (LOG.startAt+500>t), t: LOG.t, n: LOG.n
    });
    E.alert.render(ctx, dt, ms);

    extend(E.bigE.p, {
      v: E.radial.p.fx
    });
    E.bigE.render(ctx, dt, ms);

    G.points = getPoints();
    // extend(E.pointsCounter.p, {v: !(COUNTDOWN > 1)});
    E.pointsCounter.setNumber(getPoints());
    E.pointsCounter.render(ctx);

    extend(E.countDownCounter.p, {
      s: 1, v: (COUNTDOWN > 1),
      n: COUNTDOWN
    });
    E.countDownCounter.render(ctx);

    extend(E.timer.p, {
      p: clamp((GAME_DURATION+COUNTDOWN_DURATION-t)/GAME_DURATION)
    })
    E.timer.render(ctx, dt, ms);

    // E.glitchPass.render(ctx, dt, ms);

    extend(E.pointer.p, POINTER);
    E.pointer.setState(POINTER.state);
    E.pointer.render(ctx);

  },

  // leave: ()=> {
  //
  // }
};
