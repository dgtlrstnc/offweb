var spriteImg = document.getElementById('sprite');

TITLE_W = 1040,
TITLE_H = 230;

BIG_E_S = 600;

class Sprite extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    // ctx.fillStyle = 'red';
    // ctx.fillRect(-TITLE_W/2, -TITLE_H/2, TITLE_W, TITLE_H);
    if (this.p.c === 1) ctx.globalCompositeOperation = 'xor';
    if (this.p.id === 'title') {
      ctx.drawImage(spriteImg,
        0, 180, TITLE_W, TITLE_H,
        -TITLE_W/2, -TITLE_H/2, TITLE_W, TITLE_H
      );
    }
    if (this.p.id === 'bigE') {
      var s = W/(BIG_E_S*1.1);
      ctx.scale(s, s);
      ctx.drawImage(spriteImg,
        0, 710, BIG_E_S, BIG_E_S,
        -BIG_E_S/2+20, -BIG_E_S/2, BIG_E_S, BIG_E_S
      );
      ctx.scale(-s, -s);
    }
    ctx.globalCompositeOperation = 'source-over';
    this.endRender(ctx);
  }
}
