var centerP = null;

class Cable extends Entity {
  constructor() {
    super();
    this.p.p0 = {x: -0.4, y: 0};
    this.p.p1 = {x:  0.4, y: -0.5};
    this.p.c = 1;
    if (!centerP) {
      centerP = PHYS.makeParticle(0, 0, 0, 0);
      centerP.makeFixed();
    }
    this.setupPhysics();
  }

  setupPhysics() {
    var n = 6, p0 = this.p.p0, p1 = this.p.p1, prev = null;

    this.points = Array(n).fill().map((_, i)=> {
      var p = PHYS.makeParticle(1.5, 0, 0, 0);
      // PHYS.makeSpring(p, centerP, PHYS_GRAVITY, 0.1, 0); // ???
      if (i > 0) {
				PHYS.makeSpring(prev, p, SPRING_STRENGTH, SPRING_DAMPING, 0);
			}
      prev = p;
      return p;
    });

    first(this.points).makeFixed();

    this.target = PHYS.makeParticle(1.5, 0, 0, 0);
		PHYS.makeSpring(last(this.points), this.target, SPRING_STRENGTH*10, 3, 0);
    this.target.makeFixed();
  }

  reset(at) {
    if (!at) at = {x: 0, y: 1};
    this.p.p0 = {x: at.x, y: at.y};
    this.p.p1 = {x: at.x, y: at.y};
    [this.target].concat(this.points).forEach((p)=> {
      p.reset();
      extend(p.pos, at);
    });
  }

  updatePhysics() {
    extend(first(this.points).pos, this.p.p0);
    extend(this.target.pos, this.p.p1);
  }

  render(ctx, dt, ms) {
    if (!this.p.active) return;
    this.updatePhysics();
    var ps = this.points.map((p)=>p.pos);
    this.beginRender(ctx);
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(0, 0%, ' + this.p.c * 100 + '%)';
    ctx.lineWidth = CABLE_THICKNESS;
    ctx.lineCap = 'round';
    ctx.moveTo(ps[0].x*W/2, ps[0].y*W/2);
    ps.forEach((p, i) => {
      var next = ps[i + 1];
      if (i < ps.length - 2) {
        var c = (p.x + next.x)/2;
        var d = (p.y + next.y)/2;
        ctx.quadraticCurveTo(p.x*W/2, p.y*W/2, c*W/2, d*W/2);
      } else if (i === ps.length - 2) {
        ctx.quadraticCurveTo(p.x*W/2, p.y*W/2, next.x*W/2, next.y*W/2);
      }
    });
    ctx.stroke();
    this.endRender(ctx);
  }

  states() {
    return {
      normal: {c: 1},
      connected: {c: 0.2}
    };
  }

  animations() {
    return {
      'normal→connected': {_d: 500, c: [0, 1, 'in']}
    };
  }
}
