
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.tileMap = new Tilemap("src/tilemap.json");

    this.player = new Player(32, 32, this.tileMap);
    this.blinkyGhost = new Ghost("Blinky", 384, 416, this.tileMap, new Vector2(25,1)); //Scatters to top right
    this.pinkyGhost = new Ghost("Pinky", 448, 416, this.tileMap, new Vector2(1,1)); //Scatters to top left

    this.topBar = new topUI();
    this.botBar = new bottomUI();
  }

  update(dt) {
   
    if(this.tileMap.isLoaded) //Only update if the tilemap is ready
    {
      this.blinkyGhost.update(dt, this.player.gridPosition);
      this.pinkyGhost.update(dt, this.player.gridPosition);
      this.player.update(dt);

      if (Collision.CircleVsCircle(this.player.collider, this.blinkyGhost.collider))
      {
        //Decrement player health
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
    this.blinkyGhost.draw(ctx);
    this.pinkyGhost.draw(ctx);

    this.topBar.draw();
    this.botBar.draw();
  }
}
