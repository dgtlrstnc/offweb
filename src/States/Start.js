StartState = {
  enter: ()=> {
  },

  loop: (ctx, ms, dt)=> {
    E.bg.render(ctx, dt, ms);
  },

  leave: ()=> {
  }
};
