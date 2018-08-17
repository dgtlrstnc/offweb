class Ticker {
  constructor() {
    this.start = this.start.bind(this);
    this.loop = this.loop.bind(this);
    this.ticks = [];
    this.last_ms = 0;
    this.last_real_ms = 0;
    this.playing = false;
  }

  add(tick) {
    this.ticks.push(tick);
  }

  remove(tick) {
    this.ticks.remove(tick);
  }

  loop(ms) {
    if (!this.playing) return;

    ms = ms || 0;
    var dt = ms - this.last_real_ms;
    this.last_real_ms = ms;
    this.last_ms += dt;

    this.ticks.forEach((tick)=> {
      tick(this.last_ms, dt);
    });

    requestAnimationFrame(this.loop);
  }

  start() {
    this.playing = true;
    this.loop();
  }

  stop() {
    this.playing = false;
  }
}
