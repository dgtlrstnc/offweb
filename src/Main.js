var TICKER = new Ticker();
PHYS = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);

// Entity instances
E = {};

// Game instance
G = new Game({
  canvas: 'game',
  setup: ()=> {
    E.bg = new Bg();
    E.hooks = new Pool(Hook, 100);
    E.cables = new Pool(Cable, 100);
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
