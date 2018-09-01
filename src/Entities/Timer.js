class Timer extends Entity {
  constructor() {
    super();
    this.p.p = 1; //progress
  }

  render(ctx, dt, ms) {
    if (this.p.p < 0.25 && floor(ms/100)%2) return;
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.strokeStyle = COLOR_BLACK;
    ctx.lineWidth = 2;
    var w = W*0.95;
    ctx.moveTo(-w/2+20, 0);
    ctx.lineTo(modulate(this.p.p, -w/2+20, w/2), 0);
    ctx.stroke();
    ctx.fillStyle = COLOR_BLACK;
    ctx.font = '16px DIN Alternate';
    var t = '' + ceil(this.p.p*GAME_DURATION/1000);
    if (t.length === 1) t = '0'+t;
    ctx.fillText(t, -w/2, 5);
    this.endRender(ctx);
  }
}
