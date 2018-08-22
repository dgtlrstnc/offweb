TICKER = new Ticker();
PHYS = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);

// Entities
E = {};

// Game instance
G = new Game({
  canvas: 'game',
  setup: ()=> {
    E.bg = new Bg();
    E.mask = new Mask();
    E.pointsCounter = new Counter();
    E.timeCounter = new Counter();
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

G.start();

document.querySelector('.quit').addEventListener('click', (e)=> {
  G.setState(G.state === 'start' ? 'game' : 'start');
});
