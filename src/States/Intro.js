
IntroState = {
  enter: ()=> {
    goReleasedT = false;
    setAllE([
      // [E.bg,          { _s: 'full'        }],
      // [E.startBtn,    { _s: 'normal'       }],
      // [E.title,       { c: 0              }],
      [E.introText,   { v: 0              }],
      [E.introText2,  { v: 0              }],
      [E.continueBtn, { v: 0              }],
      // [E.squares,     { c: 0              }],
      // [E.logos,       { c: 0              }],
      [E.radial,      { _s: 'intro'       }],
    ]);
    tlE([
      // [0,    E.bg,           { _s: 'full'   }],
      [0,    E.radial,       { _s: 'out'    }],
      [50,   E.startBtn,     { _s: 'hidden' }],
      [850,  E.introText,    { v: 1         }],
      [800,  E.introText2,   { v: 1         }],
      [850,  E.continueBtn,  { v: 1         }],
      [1100, E.title,        { c: 1         }],
      [1100, E.squares,      { c: 1         }],
      [1100, E.logos,        { c: 1         }]
    ]);
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);
    E.introText.render(ctx);
    E.introText2.render(ctx);
    E.continueBtn.render(ctx, dt, ms);
    E.radial.render(ctx, dt, ms);
    E.startBtn.render(ctx, dt, ms);
    E.title.render(ctx, dt, ms);
    E.squares.render(ctx, dt, ms);
    E.logos.render(ctx, dt, ms);
    // E.glitchPass.render(ctx, dt, ms);

    // events ----------------------------------
    goReleasedT = !T[0] || goReleasedT;
    if (goReleasedT && T[0]) {
      var d = unitsToPx(vA.set(T[0]).distanceTo(vB.set(E.continueBtn.p)));
      if (d<100) { // TODO
        G.setState('tutorial');
      }
    }
  },

  // leave: ()=> {
  // }
};
