class Pool {
  constructor(Class, count) {
    this.entities = Array(count).fill().map(()=> new Class);
    this._count = count;
    this.reset();
  }

  reset() {
    this.p = Array(this._count).fill().map(()=> {
      return { x: 0, y: 0, r: 0, s: 0 };
    });
  }

  render(ctx, dt, ms) {
    this.entities.forEach((e, i)=> {
      var p = this.p[i];
      Object.assign(e.p, p);
      if (p && p.state) {
        e.setState(p.state);
      }
      e.render(ctx, dt, ms);
    });
  }
}
