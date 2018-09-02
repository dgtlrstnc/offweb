class BtnOutline extends Entity {
  render(ctx, dt, ms) {
    if (floor(ms/300)%5>3) return;
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.ellipse(0, 0, 40, 25, -PI2*0.03, 0, PI2);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(-10, -10);
    ctx.lineTo(15, 0);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.stroke();
    this.endRender(ctx);
  }
}
