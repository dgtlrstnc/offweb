StartState = {
  enter: ()=> {
    extend(E.startBtn.p, {y: 0});
    extend(E.title.p, {y: -1.1, x: 0, s: 0.28});
    extend(E.squares.p, {y: 1.1, x: -0.73});
    extend(E.logos.p, {y: 1.25, x: 0.8});
    E.startBtn.setStateI('hidden');
    E.startBtn.setState('normal');
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);
    E.radial.render(ctx, dt, ms);
    E.title.render(ctx, dt, ms);
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
