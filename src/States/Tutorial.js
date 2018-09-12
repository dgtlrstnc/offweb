TutorialState = {
  enter: ()=> {
    goReleasedT = false;
    setAllE([
      [E.tutorialText1,      { v: 0              }],
      [E.tutorialText2,      { v: 0              }],
      [E.tutorialText3,      { v: 0              }],
      [E.tutorialHook1,      { v: 0              }],
      [E.tutorialHook2,      { v: 0              }],
      [E.tutorialHook3,      { v: 0              }],
      [E.tutorialCables,     { v: 0              }],
      [E.tutorialBad1,       { v: 0              }],
      [E.tutorialBad2,       { v: 0              }],
      [E.tutorialSpecial,    { v: 0              }],
      [E.continueBtn,        { v: 0              }],
    ]);

    tlE([
      // [0,    E.bg,           { _s: 'full'   }],
      [0,     E.radial,          { _s: 'out'    }],
      [0,     E.startBtn,        { _s: 'hidden' }],
      [0,     E.introText,       { v: 1         }],
      [0,     E.introText2,      { v: 1         }],
      [0,     E.title,           { c: 1         }],
      [0,     E.squares,         { c: 1         }],
      // [0,     E.logos,           { c: 1         }],
      [400,   E.tutorialText1,   { v: 1         }],
      [500,   E.tutorialHook1,   { v: 1         }],
      [500,   E.tutorialHook2,   { v: 1         }],
      [500,   E.tutorialHook3,   { v: 1         }],
      [500,   E.tutorialCables,  { v: 1         }],
      [600,   E.tutorialText2,   { v: 1         }],
      [700,   E.tutorialBad1,    { v: 1         }],
      [700,   E.tutorialBad2,    { v: 1         }],
      [800,   E.tutorialText3,   { v: 1         }],
      [900,   E.tutorialSpecial, { v: 1         }],
      [1000,  E.continueBtn,     { v: 1         }]
    ]);
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);
    E.tutorialText1.render(ctx);
    E.tutorialText2.render(ctx);
    E.tutorialText3.render(ctx);

    E.tutorialHook1.render(ctx, dt, ms);
    E.tutorialHook2.render(ctx, dt, ms);
    E.tutorialHook3.render(ctx, dt, ms);
    E.tutorialCables.render(ctx, dt, ms);
    E.tutorialBad1.render(ctx, dt, ms);
    E.tutorialBad2.render(ctx, dt, ms);
    E.tutorialSpecial.render(ctx, dt, ms);

    E.continueBtn.render(ctx, dt, ms);
    E.radial.render(ctx, dt, ms);
    E.title.render(ctx, dt, ms);
    E.squares.render(ctx, dt, ms);
    // E.logos.render(ctx, dt, ms);


    // events ----------------------------------
    goReleasedT = !T[0] || goReleasedT;
    if (goReleasedT && T[0]) {
      var d = unitsToPx(vA.set(T[0]).distanceTo(vB.set(E.continueBtn.p)));
      if (d<100) { // TODO
        G.setState('game');
      }
    }
  }
};
