
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.player = new Player();
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
   
  }

  draw(ctx) {
    //Draw using ctx
    this.player.render(ctx);
  }
}
