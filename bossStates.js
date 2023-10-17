const MOVING = "MOVE";
const SHOOTING = "SHOOT";
const DYING = "DIE";

const states = {
  MOVING: 0,
  SHOOTING: 1,
  DYING: 2,
};

class State {
  constructor(state, game, frameOrder, numberOfFrames, appearance) {
    this.state = state;
    this.game = game;
    this.frameOrder = frameOrder;
    this.numberOfFrames = numberOfFrames;
    const { w, h, y } = appearance.frames[state].frame;
    this.dimensions = {
      width: w / this.numberOfFrames,
      height: h,
      offsetY: y,
    };
  }
  enter() {
    //console.log("enter", this.state, this.dimensions);
    this.game.boss.frameX = 0;
    this.game.boss.frameY = this.frameOrder - 1;
    this.game.boss.maxFrame = this.numberOfFrames - 1;
    this.game.boss.width = this.dimensions.width;
    this.game.boss.height = this.dimensions.height;
    this.game.boss.offsetY = this.dimensions.offsetY;
  }
  getDimensions() {
    return this.dimensions;
  }
}

class Moving extends State {
  constructor(game, appearance) {
    super(MOVING, game, 2, 19, appearance);
  }
  enter() {
    super.enter();
  }
  next() {}
}

class Shooting extends State {
  constructor(game, appearance) {
    super(SHOOTING, game, 3, 14, appearance);
  }
  enter() {
    super.enter();
  }
  next() {
    this.game.boss.setState(states.MOVING);
  }
}

class Dying extends State {
  constructor(game, appearance) {
    super(DYING, game, 5, 20, appearance);
  }
  enter() {
    super.enter();
  }
  next() {
    this.game.boss.dead = true;
    this.game.boss.markedForDeletion = true;
    setTimeout(() => {
      this.game.success = true;
      this.game.gameOver = true;
    }, 750);
  }
}

export { states, Moving, Shooting, Dying };

// const IDLE = "IDLE";
// const MOVING = "MOVE";
// const THREATENING = "THREATEN";
// const SHOOTING = "SHOOT";
// const DYING = "DIE";

// const states = {
//   IDLE: 0,
//   MOVING: 1,
//   THREATENING: 2,
//   SHOOTING: 3,
//   DYING: 4,
// };

// class State {
//   constructor(state, game, frameOrder, numberOfFrames, appearance) {
//     this.state = state;
//     this.game = game;
//     this.frameOrder = frameOrder;
//     this.numberOfFrames = numberOfFrames;
//     const { w, h, y } = appearance.frames[state].frame;
//     this.dimensions = {
//       width: w / this.numberOfFrames,
//       height: h,
//       offsetY: y,
//     };
//   }
//   enter() {
//     //console.log("enter", this.state, this.dimensions);
//     this.game.boss.frameX = 0;
//     this.game.boss.frameY = this.frameOrder - 1;
//     this.game.boss.maxFrame = this.numberOfFrames - 1;
//     this.game.boss.width = this.dimensions.width;
//     this.game.boss.height = this.dimensions.height;
//     this.game.boss.offsetY = this.dimensions.offsetY;
//   }
//   getDimensions() {
//     return this.dimensions;
//   }
// }

// class Idle extends State {
//   constructor(game, appearance) {
//     super(IDLE, game, 1, 13, appearance);
//   }
//   enter() {
//     super.enter();
//   }
//   next() {}
// }

// class Moving extends State {
//   constructor(game, appearance) {
//     super(MOVING, game, 2, 19, appearance);
//   }
//   enter() {
//     super.enter();
//   }
//   next() {}
// }

// class Threatening extends State {
//   constructor(game, appearance) {
//     super(THREATENING, game, 3, 14, appearance);
//   }
//   enter() {
//     super.enter();
//   }
//   next() {
//     this.game.boss.setState(states.SHOOTING);
//   }
// }

// class Shooting extends State {
//   constructor(game, appearance) {
//     super(SHOOTING, game, 3, 14, appearance);
//     //super(SHOOTING, game, 4, 6, appearance);
//   }
//   enter() {
//     super.enter();
//   }
//   next() {
//     this.game.boss.setState(states.MOVING);
//   }
// }

// class Dying extends State {
//   constructor(game, appearance) {
//     super(DYING, game, 5, 20, appearance);
//   }
//   enter() {
//     super.enter();
//   }
//   next() {
//     this.game.boss.dead = true;
//     this.game.boss.markedForDeletion = true;
//     setTimeout(() => {
//       this.game.success = true;
//       this.game.gameOver = true;
//     }, 750);
//   }
// }

// export { states, Idle, Moving, Threatening, Shooting, Dying };
