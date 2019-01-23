
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
   
    this.testGhost.update(dt);
    this.player.update(dt);

    if (Collision.CircleVsCircle(this.player.collider, this.testGhost.collider) === true)
    { 
      //Check if player has powerup
      //Kill either ghost or player
      if (this.player.isPoweredUp)
      {
        //this.testGhost.die();
      }
      else
      {
        this.lives--;
        //Respawn;
      }
    }
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
