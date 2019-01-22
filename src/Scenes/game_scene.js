
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.player = new Player();

    this.testGhost = new Ghost("Follow");
  }

  update(dt) {
    //Update game objects, pass dt to time related objects (things that move)
    //for (var btn = 0; btn < lis.length; btn++)
    //{
      //  console.log(this.gamePad);
    //    if(this.gamePad.isButtonPressed(lis[btn]))
    //    {
    //        console.log(lis[btn], "Pressed");
    //    }
   // }
   

    this.testGhost.update(dt);
  }

  draw(ctx) {
    //Draw using ctx
    this.player.render(ctx);
    this.testGhost.draw(ctx);
  }
}