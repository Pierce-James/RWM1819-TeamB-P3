
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.player = new Player();
    this.tileMap = new Tilemap("src/tilemap.json");
    this.testGhost = new Ghost("Follow", 100, 160, this.tileMap);

    this.topBar = new topUI();
    this.botBar = new bottomUI();


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

  handleInput(input)
  {
    this.player.handleInput(input);
  }

  draw(ctx) {
    //Draw using ctx
    this.tileMap.render(ctx);
    this.player.render(ctx);
    this.testGhost.draw(ctx);

    this.topBar.draw();
    this.botBar.draw();
  }
}
