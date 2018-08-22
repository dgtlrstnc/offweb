goReleasedT = false;

GameoverState = {
  enter: ()=> {
    goReleasedT = false;
    E.pointsCounter.setState('focus');
    E.mask.setState('small');
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);

    E.guides.render(ctx, dt, ms);

    E.mask.render(ctx, dt, ms);

    E.pointsCounter.setNumber(clamp(G.points, 0, Infinity));
    E.pointsCounter.render(ctx);

    // pointer ----------------------------------
    goReleasedT = !T[0] || goReleasedT;
    if (goReleasedT && T[0]) {
      G.setState('game');
    }
  },

  leave: ()=> {
  }
};
