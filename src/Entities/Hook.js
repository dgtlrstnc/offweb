class Hook extends Entity {
  constructor(r = 10) {
    super({s: 'hidden'});
    this.r = r;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.fillStyle = '#666';
    ctx.arc(0, 0, this.r, 0, PI2);
    ctx.fill();
    this.endRender(ctx);
  }

  states() {
    return {
      hidden: {s: 0, c: 0},
      visible: {s: 1, c: 1},
      used: {s: 1, c: 0.5}
    };
  }

  animations() {
    return {
      'hidden→visible': {_d: 500, s: [0, 1, 'in'], c: [0, 1, 'in']},
      'visible→used':   {_d: 500, s: [0, 1, 'in'], c: [0, 1, 'in']}
    };
  }
}
