StartState = {
  enter: ()=> {
    setAllE([
      [E.startBtn,   {y: 0}],
      [E.squares,    {c: 0}],
      // [E.logos,      {c: 0}]
    ])
    E.radial.setStateI('out');
    E.radial.setState('intro');
    E.startBtn.setStateI('hidden');
    E.startBtn.setState('normal');
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);
    E.radial.render(ctx, dt, ms);
    E.title.render(ctx, dt, ms);
    E.squares.render(ctx, dt, ms);
    // E.logos.render(ctx, dt, ms);
    E.startBtn.render(ctx, dt, ms);

    // events ----------------------------------
    goReleasedT = !T[0] || goReleasedT;
    if (goReleasedT && T[0]) {
      var d = unitsToPx(vA.set(T[0]).distanceTo(vB.set(E.startBtn.p)));
      if (d<40) { // TODO
        G.setState('intro');
      }
    }
  }
};
