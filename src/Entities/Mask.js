class Mask extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(-W/2, -H/2, W, H);
    ctx.arc(0, 0, W*0.45, 0, -PI2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.arc(0, 0, W*0.45, 0, -PI2, true);
    ctx.stroke();
    this.endRender(ctx);
  }
}
