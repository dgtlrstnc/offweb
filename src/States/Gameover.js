goReleasedT = false;

GameoverState = {
  enter: ()=> {
    goReleasedT = false;
    stateHighscore = max(clamp(G.points, 0, Infinity), stateHighscore);

    E.bg.setState('full');
    extend(E.squares.p, {c: 1});
    extend(E.logos.p, {c: 1});
    extend(E.pointsCounter.p, {n: clamp(G.points, 0, Infinity), c: 1});
    E.hooks.entities.forEach((h)=> {
    });
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);

    HOOKS.forEach((h)=> {
      if (h.bad) h.active = false;
      // if (h.special) h.active = false;
      if (!h.connected) h.active = false;
      const targetR = 0.1 + 2*(h.id/HOOKS.length);
      const r = h.currentR -= (h.currentR-targetR)*dt/500;
      extend(h, {
        x: r*1*sin(h.a),
        y: r*cos(h.a),
        s: 0.6
      });
    });
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

    PHYS.tick();
    E.cables.p = CABLES.filter((c)=>c.active);
    E.cables.render(ctx, dt, ms);
    E.hooks.p = HOOKS.filter((h)=>h.active);
    E.hooks.render(ctx, dt, ms);

    E.pointsCounter.render(ctx, dt, ms);
    extend(E.highscore.p, { t: 'HIGHSCORE: ' + stateHighscore });
    E.highscore.render(ctx, dt, ms);
    E.squares.render(ctx, dt, ms);
    E.logos.render(ctx, dt, ms);

    E.continueBtn.render(ctx, dt, ms);

    // events ----------------------------------
    goReleasedT = !T[0] || goReleasedT;
    if (goReleasedT && T[0]) {
      var d = unitsToPx(vA.set(T[0]).distanceTo(vB.set(E.continueBtn.p)));
      if (d<40) { // TODO
        G.setState('game');
      }
    }
  },

  // leave: ()=> {
  // }
};
