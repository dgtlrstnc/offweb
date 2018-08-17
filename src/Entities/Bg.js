class Bg extends Entity {

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(-W/2, -H/2, W, H);
    ctx.fill();
    this.endRender(ctx);
  }
}
