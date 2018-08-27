W = null; H = null;

class Game {
  constructor(options = {}) {
    this.render = this.render.bind(this);

    this.setup = options.setup;
    this.states = options.states;
    this.canvas = document.getElementById(options.canvas);
    this.ctx = this.canvas.getContext('2d');

    TICKER.add(this.render);

    this.setup();
    this.resize();
  }

  render(dt, ms) {
    this.states[this.state].loop(this.ctx, dt, ms);
  }

  destroy() {
    TICKER.stop();
  }

  start() {
    TICKER.start();
  }

  setState(state) {
    // if (this.state) this.states[this.state].leave(this.ctx);
    this.state = state;
    this.states[this.state].enter(this.ctx);
  }

  resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    this.canvas.width = W;
    this.canvas.height = H;
  }
}
