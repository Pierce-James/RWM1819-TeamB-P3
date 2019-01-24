
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.tileMap = new Tilemap("src/tilemap.json");

    this.player = new Player(448, 640, this.tileMap);
    this.isActive = false;
    this.blinkyGhost = new Ghost("Blinky", 384, 416, this.tileMap, new Vector2(26,1)); //Scatters to top right
    this.pinkyGhost = new Ghost("Pinky", 448, 416, this.tileMap, new Vector2(1,1)); //Scatters to top left
    this.clydeGhost = new Ghost("Clyde", 448, 384, this.tileMap, new Vector2(1,29)); //Scatters to bottom left
    this.inkyGhost = new Ghost("Inky", 448, 384, this.tileMap, new Vector2(26,29)); //Scatters to bottom right
    this.inkyGhost.blinkyRef = this.blinkyGhost; //Set the reference to the blinky ghost
    this.ghosts = [this.blinkyGhost, this.clydeGhost, this.inkyGhost, this.pinkyGhost];

    this.topBar = new topUI();
    this.botBar = new bottomUI();

    audioOptions.manager.loadSoundFile('gameSceneMusic', "ASSETS/AUDIO/Waka.mp3");
    audioOptions.manager.loadSoundFile('eatFruit', "ASSETS/AUDIO/Fruit.mp3");
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

      //Only update the ghosts if the player has no lives left
      if(this.player.lives > 0)
      {
        for(let ghost of this.ghosts)
        {
          ghost.update(dt, this.player);
        }
      }
      
      this.player.update(dt);

      //Only check for collisions if the player has lives
      if(this.player.lives > 0)
      {
        for(let ghost of this.ghosts)
        {
          if (Collision.CircleVsCircle(this.player.collider, ghost.collider))
          {
            if (this.player.isPoweredUp)
            {
              this.topBar.score += this.player.eatGhost();
              ghost.die();
              audioOptions.manager.playAudio('killGhost', false, audioOptions.volume/100);
            }
            else
            {
              audioOptions.manager.playAudio('killPacMan', false, audioOptions.volume/100);
              this.player.lives--;
              this.player.spawnPlayer();
              this.botBar.lives--;
            }
          }
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
    for(let ghost of this.ghosts)
    {
      ghost.draw(ctx);
    }

    this.player.render(ctx);

    this.topBar.draw();
    this.botBar.draw();
  }
}
