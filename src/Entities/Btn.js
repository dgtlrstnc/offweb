class Btn extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.fillStyle = COLOR_PURPLE;
    ctx.arc(0, 0, 40, 0, PI2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = COLOR_WHITE;
    ctx.moveTo(-15, -20);
    ctx.lineTo(25, 0);
    ctx.lineTo(-15, 20);
    ctx.fill();
    this.endRender(ctx);
  }

  states() {
    return {
      hidden: {s:0},
      normal: {s:1},
    };
  }

  animations() {
    return {
      'hidden→normal':  {_d: 2000, _e: 'out'},
      'normal→hidden':  {_d: 2000, _e: 'out'}
    };
  }
}
