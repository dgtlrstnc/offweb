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
    E.squares = new Squares();
    extend(E.squares.p, {y: 1.1, x: -0.73});
    E.logos = new Logos();
    extend(E.logos.p, {y: 1.25, x: 0.8});
    E.startBtn = new Btn();
    // E.mask = new Mask();
    // E.timeCounter = new Counter();
    // E.pointsLogs = new TextE();
    E.pointsCounter = new Counter();
    E.countDownCounter = new Counter();
    extend(E.countDownCounter.p, {y: -0.05, c: 1});
    E.timer = new Timer();
    extend(E.timer.p, {y: -1.3});
    E.guides = new Guides();
    E.hooks = new Pool(Hook, HOOKS_AMOUNT);
    E.cables = new Pool(Cable, HOOKS_AMOUNT);
    E.radial = new Radial();
    E.pointer = new Pointer();
    E.glitchPass = new GlitchPass();
  },
  states: {
    start: StartState,
    game: GameState,
    gameover: GameoverState
  }
});

G.setState('start');
G.start();
