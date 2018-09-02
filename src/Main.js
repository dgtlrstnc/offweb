TICKER = new Ticker();
PHYS = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);

// Entities
E = {};

// Game instance
G = new Game({
  canvas: 'game',
  setup: ()=> {
    E.bg = new Bg();
    E.title = new Title();
    extend(E.title.p, {y: -1.1, x: 0, s: 0.28});
    E.squares = new Squares();
    extend(E.squares.p, {y: 1.1, x: -0.73});
    E.logos = new Logos();
    extend(E.logos.p, {y: 1.25, x: 0.8});
    E.startBtn = new Btn();
    E.continueBtn = new BtnOutline();
    extend(E.continueBtn.p, {y: 0.75});
    E.introText = new TextBox();
    extend(E.introText.p, {y: -0.6, t: INTRO_TEXT_1});
    E.introText2 = new TextBox();
    extend(E.introText2.p, {y: -0.1, t: INTRO_TEXT_2});
    // E.mask = new Mask();
    // E.timeCounter = new Counter();
    // E.pointsLogs = new TextE();

    E.pointsCounter = new Counter();
    extend(E.pointsCounter.p, {s: 0.55});
    E.countDownCounter = new Counter();
    extend(E.countDownCounter.p, {y: -0.05, c: 1});
    E.timer = new Timer();
    extend(E.timer.p, {y: -1.45});
    // E.guides = new Guides();
    E.hooks = new Pool(Hook, HOOKS_AMOUNT);
    E.cables = new Pool(Cable, HOOKS_AMOUNT);
    E.radial = new Radial();
    E.pointer = new Pointer();
    E.highscore = new TextBox();
    extend(E.highscore.p, { y: -0.65 });
    E.glitchPass = new GlitchPass();
  },
  states: {
    start: StartState,
    intro: IntroState,
    game: GameState,
    gameover: GameoverState
  }
});

G.setState('start');
G.start();
