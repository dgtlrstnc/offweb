goReleasedT = false;

GameoverState = {
  enter: ()=> {
    goReleasedT = false;
    // E.pointsCounter.setState('focus');
    // E.mask.setState('small');

    E.bg.setState('full');
    extend(E.squares.p, {c: 1});
    extend(E.logos.p, {c: 1});
    extend(E.pointsCounter.p, {x: 0.01, y: -1, n: clamp(G.points, 0, Infinity), c: 1});
    // E.pointsCounter.setStateI('hidden');
    // E.pointsCounter.setState('focus');

    // extend(E.startBtn.p, {y: 1});
    E.startBtn.setStateI('hidden');
    E.startBtn.setState('normal');
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);

    // E.guides.render(ctx, dt, ms);

    // E.mask.render(ctx, dt, ms);

    E.pointsCounter.render(ctx, dt, ms);
    E.squares.render(ctx, dt, ms);
    E.logos.render(ctx, dt, ms);

    E.startBtn.render(ctx, dt, ms);

    // events ----------------------------------
    goReleasedT = !T[0] || goReleasedT;
    if (goReleasedT && T[0]) {
      var d = unitsToPx(vA.set(T[0]).distanceTo(vB.set(E.startBtn.p)));
      if (d<40) { // TODO
        G.setState('game');
      }
    }
  },

  // leave: ()=> {
  // }
};
