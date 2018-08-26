TICKER = new Ticker();
PHYS = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);

// Entities
E = {};

// Game instance
G = new Game({
  canvas: 'game',
  setup: ()=> {
    E.bg = new Bg();
    E.startBtn = new Btn();
    E.mask = new Mask();
    E.timeCounter = new Counter();
    E.pointsLogs = new TextE();
    E.pointsCounter = new Counter();
    E.countDownCounter = new Counter();
    E.guides = new Guides();
    E.hooks = new Pool(Hook, 100);
    E.cables = new Pool(Cable, 100);
    E.pointer = new Pointer();
  },
  states: {
    start: StartState,
    game: GameState,
    gameover: GameoverState
  }
});

G.setState('start');
G.start();
