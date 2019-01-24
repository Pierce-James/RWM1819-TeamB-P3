
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.tileMap = new Tilemap("src/tilemap.json");

    this.player = new Player(32, 32, this.tileMap);
    this.isActive = false;
    this.blinkyGhost = new Ghost("Blinky", 384, 416, this.tileMap, new Vector2(26,1)); //Scatters to top right
    this.pinkyGhost = new Ghost("Pinky", 448, 416, this.tileMap, new Vector2(1,1)); //Scatters to top left
    this.clydeGhost = new Ghost("Clyde", 448, 384, this.tileMap, new Vector2(1,29)); //Scatters to bottom left
    this.inkyGhost = new Ghost("Inky", 448, 384, this.tileMap, new Vector2(26,29)); //Scatters to bottom right
    this.inkyGhost.blinkyRef = this.blinkyGhost; //Set the reference to the blinky ghost

    this.topBar = new topUI();
    this.botBar = new bottomUI();

    audioOptions.manager.loadSoundFile('gameSceneMusic', "ASSETS/AUDIO/Waka.mp3");
    audioOptions.manager.loadSoundFile('eatFruit', "ASSETS/AUDIO/Waka.mp3");
    audioOptions.manager.loadSoundFile('killGhost', "ASSETS/AUDIO/GhostDeath.mp3");
    audioOptions.manager.loadSoundFile('killPacMan', "ASSETS/AUDIO/Death.mp3");
  }
  

  start(){
    this.isActive = true;
    audioOptions.manager.playAudio('gameSceneMusic', true, audioOptions.volume/100);
  }

  
  stop(){
    this.isActive = false;
    audioOptions.manager.stopAudio();
  }

  update(dt) {
   
    if(this.tileMap.isLoaded) //Only update if the tilemap is ready
    {
      this.blinkyGhost.update(dt, this.player);
      this.pinkyGhost.update(dt, this.player);
      this.clydeGhost.update(dt, this.player)
      this.inkyGhost.update(dt, this.player);


      this.player.update(dt);

      if (Collision.CircleVsCircle(this.player.collider, this.blinkyGhost.collider))
      {
        if (this.player.isPoweredUp)
        {
          this.blinkyGhost.alive = false;
        }
        else
        {
          this.player.lives--;
        }
      }

      if (Collision.CircleVsCircle(this.player.collider, this.pinkyGhost.collider))
      {
        if (this.player.isPoweredUp)
        {
          this.pinkyGhost.alive = false;
        }
        else
        {
          this.player.lives--;
        }
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
    this.clydeGhost.draw(ctx);
    this.inkyGhost.draw(ctx);

    this.topBar.draw();
    this.botBar.draw();
  }
}
