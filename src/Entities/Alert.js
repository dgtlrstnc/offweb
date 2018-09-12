ALERT_W = 0.8;
ALERT_H = 0.2;

COMB_W = 580;
COMB_H = 140;

PERF_W = 815;
PERF_H = 140;

spriteImg = document.getElementById('sprite');

class Alert extends Entity {
  render(ctx, dt, ms) {
    if (!this.p.t) return;
    this.beginRender(ctx);
    const w = ALERT_W*W, h = ALERT_H*W;
    // box
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(-w/2+5, -h/2+5, w-10, h-10);

    // text
    ctx.fillStyle = '#fff';
    ctx.font = '24px DIN Alternate';
    ctx.textAlign= 'left';

    if (this.p.t[0] === 'C' || this.p.t[0] === 'P') {
      if (this.p.t[0] === 'C') {
        ctx.scale(0.3, 0.3);
        ctx.drawImage(spriteImg,
          0, 420, COMB_W, COMB_H,
          -COMB_W/2-80, -COMB_H/2-2, COMB_W, COMB_H
        );
        ctx.scale(1/0.3, 1/0.3);
        // cross
        ctx.beginPath();
        ctx.moveTo(W*0.18, -5);
        ctx.lineTo(W*0.18+10, 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(W*0.18+10, -5);
        ctx.lineTo(W*0.18, 5);
        ctx.stroke();
        //
        ctx.fillText(this.p.n, W*0.24, 9);
      } else {
        ctx.scale(0.3, 0.3);
        ctx.drawImage(spriteImg,
          0, 560, PERF_W, PERF_H,
          -PERF_W/2, -PERF_H/2, PERF_W, PERF_H
        );
        ctx.scale(1/0.3, 1/0.3);
      }
    } else {
      ctx.fillText(this.p.t, 0, 17);
    }
    this.endRender(ctx);
  }
}
