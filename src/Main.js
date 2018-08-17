var TICKER = new Ticker();
var PHYS_GRAVITY = 0.003;
var PHYS_DRAG = 0.2;
var SPRING_STRENGTH = 0.2;
var SPRING_DAMPING = 0.01;
PHYS = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);

// Entity instances
E = {};

// Game instance
G = new Game({
  canvas: 'game',
  setup: ()=> {
    E.bg = new Bg();
    E.hooks = new Pool(Hook, 30);
    E.cables = new Pool(Cable, 30);
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
