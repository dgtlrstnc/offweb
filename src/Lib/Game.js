W = H = null;

class Game {
  constructor(options) {
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
    // var dpi = devicePixelRatio || 1;
    // W = window.innerWidth * dpi;
    // H = window.innerHeight * dpi;
    extend(this.canvas, {
      width: W,
      height: H
    });
    if (W>500) {
      // this.canvas.style.display = 'none';
      this.ctx.beginPath();
      this.ctx.fillStyle = COLOR_BLACK;
      this.ctx.rect(0, 0, W, H);
      this.ctx.fill();
      this.ctx.canvas.style.letterSpacing = '1.5px';
      this.ctx.fillStyle = '#fff';
      this.ctx.font = 22 + 'px DIN Alternate';
      this.ctx.textAlign= 'center';
      this.ctx.fillText('OPEN IN MOBILE', W/2, H/2);
      this.setState = ()=>{};
      TICKER.stop();
    }
    // extend(this.canvas.style, {
    //   width: W / dpi + 'px',
    //   height: H / dpi + 'px'
    // });
  }
}
