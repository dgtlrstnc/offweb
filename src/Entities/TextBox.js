// https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';
  words.forEach((w, n)=> {
    var testLine = line + w + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else line = testLine;
  });
  ctx.fillText(line, x, y);
}

class TextBox extends Entity {
  constructor() {
    super();
    this.p.t = '';
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    ctx.canvas.style.letterSpacing = '1.5px';
    ctx.fillStyle = '#fff';
    ctx.font = '13px DIN Alternate';
    ctx.textAlign= 'center';
    wrapText(ctx, this.p.t, 0, 0, W*0.9, 20);
    this.endRender(ctx);
  }
}
