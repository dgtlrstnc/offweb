class Pointer extends Entity {
  constructor(r = 10) {
    super({s: 'hidden'});
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.strokeStyle = COLOR_RED;
    ctx.lineWidth = 4;
    ctx.arc(0, 0, 40, 0, PI2);
    ctx.stroke();
    this.endRender(ctx);
  }

  states() {
    return {
      hidden: {s: 0, o: 0},
      visible: {s: 1, o: 1}
    };
  }

  animations() {
    return {
      'hidden→visible': {_d: 300, _e: 'out'},
      'visible→hidden': {_d: 300, _e: 'out'}
    };
  }
}
