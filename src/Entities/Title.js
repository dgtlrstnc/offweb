var spriteImg = document.getElementById('sprite');

TITLE_W = 1040,
TITLE_H = 230;

class Title extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    // ctx.fillStyle = 'red';
    // ctx.fillRect(-TITLE_W/2, -TITLE_H/2, TITLE_W, TITLE_H);
    if (this.p.c === 1) ctx.globalCompositeOperation = 'xor';
    ctx.drawImage(spriteImg,
      0, 180, TITLE_W, TITLE_H,
      -TITLE_W/2, -TITLE_H/2, TITLE_W, TITLE_H
    );
    ctx.globalCompositeOperation = 'source-over';
    this.endRender(ctx);
  }
}
