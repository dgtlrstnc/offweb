class TutorialCables extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.strokeStyle = COLOR_PURPLE;
    ctx.lineWidth = CABLE_THICKNESS;
    ctx.beginPath();
    ctx.arc(unitsToPx(-0.3/2), 0, unitsToPx(0.3/2), PI*0.2, PI*0.8, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(unitsToPx(0.3/2), 0, unitsToPx(0.3/2), PI*0.2, PI*0.8, false);
    ctx.stroke();
    this.endRender(ctx);
  }
}
