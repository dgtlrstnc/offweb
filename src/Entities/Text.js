glyphSize = [80, 160];
glyphsImg = document.getElementById('font');
charsOrder = ['x', '+', '-'];

// TODO
roundRect = (ctx, x, y, w, h, r)=> {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y,   x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x,   y+h, r);
  ctx.arcTo(x,   y+h, x,   y,   r);
  ctx.arcTo(x,   y,   x+w, y,   r);
  ctx.closePath()
}

class TextE extends Entity {
  constructor() {
    super({s: 'normal'});
    this.p.t = 0;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    if (!this.p.t) return;
    var t = this.p.t.split('');
    var size = [t.length*glyphSize[0], glyphSize[1]];
    var boxSize = [
      size[0]+60,
      size[1]+20
    ];
    ctx.fillStyle = 'white';
    roundRect(ctx, -boxSize[0]/2, -boxSize[1]/2, boxSize[0], boxSize[1], 10);
    ctx.fill();
    ctx.globalCompositeOperation = 'difference';
    t.forEach((char, i)=> {
      var charI = charsOrder.indexOf(char);
      var sx = ((charI === -1) ? ~~char : 10+charI) * glyphSize[0];
      var dx = modulate(i, -size[0]/2, size[0]/2, 0, t.length);
      ctx.drawImage(glyphsImg,
        sx, 1, glyphSize[0], glyphSize[1],
        dx, -glyphSize[1]/2, glyphSize[0], glyphSize[1]
      );
    });
    ctx.globalCompositeOperation = 'source-over';
    this.endRender(ctx);
  }
}
