class Guides extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = CABLE_THICKNESS;
    times(GUIDES_AMOUNT/2, (i)=> {
      ctx.beginPath();
      var a = i*PI2/GUIDES_AMOUNT;
      ctx.moveTo(unitsToPx(sin(a)), unitsToPx(cos(a)));
      ctx.lineTo(unitsToPx(-sin(a)), unitsToPx(-cos(a)));
      ctx.stroke();
    });
    this.endRender(ctx);
  }
}
