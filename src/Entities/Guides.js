class Guides extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    times(GUIDES_AMOUNT*3, (i)=> {
      ctx.beginPath();
      var a = i*PI2/(GUIDES_AMOUNT*3);
      ctx.moveTo(unitsToPx(2*sin(a)), unitsToPx(2*cos(a)));
      ctx.lineTo(unitsToPx(-2*sin(a)), unitsToPx(-2*cos(a)));
      ctx.stroke();
    });
    times(GUIDES_AMOUNT/2, (i)=> {
      ctx.beginPath();
      var a = i*PI2/GUIDES_AMOUNT;
      ctx.moveTo(unitsToPx(2*sin(a)), unitsToPx(2*cos(a)));
      ctx.lineTo(unitsToPx(-2*sin(a)), unitsToPx(-2*cos(a)));
      ctx.stroke();
    });
    this.endRender(ctx);
  }
}
