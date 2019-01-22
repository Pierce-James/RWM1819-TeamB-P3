
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.

    this.testGhost = new Ghost("Follow");
  }

  update(dt) {
    //Update game objects, pass dt to time related objects (things that move)

    this.testGhost.update(dt);
  }

  draw(ctx) {
    //Draw using ctx
    this.testGhost.draw(ctx);
  }
}
