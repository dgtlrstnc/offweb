SQUARES_SIZE = 24;
SQUARES_R = SQUARES_SIZE*0.85/2;
SQUARES_GUTTER = 4;
SQUARES_COLUMNS = 2;
SQUARES_ROWS = 3;
SQUARES_W = SQUARES_SIZE * SQUARES_COLUMNS + (SQUARES_COLUMNS-1) * SQUARES_GUTTER;
SQUARES_H = SQUARES_SIZE * SQUARES_ROWS + (SQUARES_ROWS-1) * SQUARES_GUTTER;

class Squares extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    times(SQUARES_ROWS, (row)=> {
      times(SQUARES_COLUMNS, (col)=> this.drawSquare(ctx, row, col));
    });
    this.endRender(ctx);
  }

  drawSquare(ctx, row, col) {
    var x = modulate(col, -SQUARES_W/2, SQUARES_W/2, 0, SQUARES_COLUMNS),
        y = modulate(row, -SQUARES_H/2, SQUARES_H/2, 0, SQUARES_ROWS);

    ctx.fillStyle = COLOR_BLACK;
    ctx.translate(x, y);
    ctx.fillRect(-SQUARES_SIZE/2, -SQUARES_SIZE/2, SQUARES_SIZE, SQUARES_SIZE);
    ctx.fillStyle = COLOR_LIGHTGRAY;
    this[['drawCircle', 'drawHalfCircles', 'drawTriangle'][row]](ctx);
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
}
