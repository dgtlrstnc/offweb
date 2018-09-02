class Bg extends Entity {
  constructor() {
    super({s: 'normal'});
    this.p.rad = 1;
  }

  states() {
    return {
      normal:   {rad: 1},
      full:     {rad: 3},
    };
  }

  animations() {
    return {
      'normal→full':   {_d: 4000, rad: [0, 1, 'out']},
      'full→normal':   {_d: 2000, rad: [0, 1, 'out']}
    };
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.fillStyle = COLOR_BLACK;
    ctx.rect(-W/2, -H*0.7, W, H*1.4);
    ctx.fill();

    this.drawGuides(ctx);
    this.drawMask(ctx);

    this.endRender(ctx);
  }

  drawGuides(ctx) {
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    times(GUIDES_AMOUNT*3, (i)=> {
      ctx.beginPath();
      var a = i*PI2/(GUIDES_AMOUNT*3);
      ctx.moveTo(unitsToPx(2*sin(a)), unitsToPx(2*cos(a)));
      ctx.lineTo(unitsToPx(-2*sin(a)), unitsToPx(-2*cos(a)));
      ctx.stroke();
    });
  }

  drawMask(ctx) {
    // overlay with circle hole
    ctx.beginPath();
    ctx.fillStyle = COLOR_BLACK;
    ctx.rect(-W/2, -H*0.7, W, H*1.4);
    ctx.arc(0, 0, W/2*ARENA_RADIUS*this.p.rad, 0, -PI2, true);
    ctx.fill();
    // circle border
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.arc(0, 0, W/2*ARENA_RADIUS*this.p.rad, 0, -PI2);
    ctx.stroke();

    // small circle
    ctx.beginPath();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1.5;
    ctx.arc(0, 0, W/2*ARENA_RADIUS*0.2, 0, -PI2);
    ctx.fill();
    ctx.stroke();
  }
}
