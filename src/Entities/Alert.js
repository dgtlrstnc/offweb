ALERT_W = 0.7;
ALERT_H = 0.2;

class Alert extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    const w = ALERT_W*W, h = ALERT_H*W;
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.strokeStyle = '#fff'
    ctx.strokeRect(-w/2+5, -h/2+5, w-10, h-10);
    ctx.fillStyle = '#fff';
    ctx.font = '50px DIN Alternate';
    ctx.textAlign= 'center';
    ctx.transform(0.8, 0, -0.5, 1, 0, 0);
    ctx.fillText(this.p.t, 0, 17);
    ctx.transform(1/0.8, 0, 0.5, 1, 0, 0);
    this.endRender(ctx);
  }
}
