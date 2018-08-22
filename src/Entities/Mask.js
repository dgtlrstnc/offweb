class Mask extends Entity {
  constructor() {
    super({s: 'normal'});
    this.p.b = 0;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    // overlay with circle hole
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(-W/2, -H/2, W, H);
    ctx.arc(0, 0, W*0.45, 0, -PI2, true);
    ctx.fill();
    // circle border
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.arc(0, 0, W*0.45, 0, -PI2, true);
    ctx.stroke();
    // fx
    ctx.beginPath();
    if (this.p.b<1 && this.p.b>0) {
      ctx.strokeStyle = COLOR_RED;
      ctx.lineWidth = clamp((1-this.p.b)*200, 0, Infinity);
      ctx.arc(0, 0, this.p.b*W*0.6, 0, -PI2, true);
      ctx.stroke();
    }
    //
    this.endRender(ctx);
  }

  states() {
    return {
      normal: {b: 0},
      bad: {b: 1},
    };
  }

  animations() {
    return {
      'normal→bad': {_d: 4000, b: [0, 1, 'out']}
    };
  }
}
