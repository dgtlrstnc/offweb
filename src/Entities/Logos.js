LOGOS_AMOUNT = 3;
LOGOS_SW = 45; // single widht
LOGOS_SH = 25; // single height
LOGOS_GUTTER = 5;
LOGOS_W = LOGOS_SW * LOGOS_AMOUNT + (LOGOS_AMOUNT-1) * LOGOS_GUTTER;

class Logos extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    times(LOGOS_AMOUNT, (i)=> this.drawLogo(ctx, i));
    this.endRender(ctx);
  }

  drawLogo(ctx, i) {
    var x = modulate(i, -LOGOS_W/2, LOGOS_W/2, 0, LOGOS_AMOUNT);

    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    ctx.ellipse(x-LOGOS_SW/2, -LOGOS_SH/2, LOGOS_SW/2, LOGOS_SH/2, -PI2*0.03, 0, PI2);
    ctx.stroke();
  }
}
