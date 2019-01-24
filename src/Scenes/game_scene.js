
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.tileMap = new Tilemap("src/tilemap.json");
    this.player = new Player(32, 32, this.tileMap);
    this.testGhost = new Ghost("Follow", 100, 160, this.tileMap);
    this.isActive = false;
    this.topBar = new topUI();
    this.botBar = new bottomUI();
  }

  start(){
    this.isActive = true;
  }

  
  stop(){
    this.isActive = false;
  }

  update(dt) {
   
    this.testGhost.update(dt);
    this.player.update(dt);

   // if (Collision.CircleVsCircle(this.player.collider, this.testGhost.collider))
   // {
      //Decrement player health
   // }
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
