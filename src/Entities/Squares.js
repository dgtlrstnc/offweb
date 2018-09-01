SQUARES_SIZE = 24;
SQUARES_R = SQUARES_SIZE*0.85/2;
SQUARES_GUTTER = 4;
SQUARES_COLUMNS = 2;
SQUARES_ROWS = 3;
SQUARES_W = SQUARES_SIZE * SQUARES_COLUMNS + (SQUARES_COLUMNS-1) * SQUARES_GUTTER;
SQUARES_H = SQUARES_SIZE * SQUARES_ROWS + (SQUARES_ROWS-1) * SQUARES_GUTTER;

class Squares extends Entity {
  constructor() {
    super();
    this.p.c = 0;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    var i = floor(ms/1000);
    times(SQUARES_ROWS, (row)=> {
      times(SQUARES_COLUMNS, (col)=> this.drawSquare(ctx, row, col, i++));
    });
    this.endRender(ctx);
  }

  drawSquare(ctx, row, col, i) {
    var x = modulate(col, -SQUARES_W/2, SQUARES_W/2, 0, SQUARES_COLUMNS),
        y = modulate(row, -SQUARES_H/2, SQUARES_H/2, 0, SQUARES_ROWS),
        r = floor(sin(i))*(PI2/4);

    ctx.fillStyle = (this.p.c === 0) ? COLOR_BLACK : COLOR_LIGHTGRAY;
    ctx.translate(x, y);
    ctx.rotate(r);
    ctx.fillRect(-SQUARES_SIZE/2, -SQUARES_SIZE/2, SQUARES_SIZE, SQUARES_SIZE);
    ctx.fillStyle = (this.p.c === 0) ? COLOR_LIGHTGRAY : COLOR_BLACK;
    this[[
      'drawCircle',
      'drawHalfCircles',
      'drawTriangle',
      'drawTriangles',
    ][i%4]](ctx);
    ctx.rotate(-r);
    ctx.translate(-x, -y);
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, SQUARES_R, 0, PI2);
    ctx.fill();
  }

  drawHalfCircles(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, SQUARES_R, 0, PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -SQUARES_R, SQUARES_R, 0, PI);
    ctx.fill();
  }

  drawTriangle(ctx) {
    ctx.beginPath();
    ctx.moveTo(SQUARES_R, -SQUARES_R);
    ctx.lineTo(SQUARES_R, SQUARES_R);
    ctx.lineTo(-SQUARES_R, SQUARES_R);
    ctx.closePath();
    ctx.fill();
  }

  drawTriangles(ctx) {
    times(4, (i)=> {
      var t = [i%2, floor(i/2)].map((v)=>-SQUARES_R/2+v*SQUARES_R);
      ctx.translate(t[0], t[1]);
      ctx.beginPath();
      ctx.moveTo(SQUARES_R/2, -SQUARES_R/2);
      ctx.lineTo(SQUARES_R/2, SQUARES_R/2);
      ctx.lineTo(-SQUARES_R/2, SQUARES_R/2);
      ctx.closePath();
      ctx.fill();
      ctx.translate(-t[0], -t[1]);
    });
  }
}
