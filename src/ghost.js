class Ghost
{
  constructor(ghostType, x, y, grid){
    this.moveDistance = 32; //32 pixels per move
    this.moveSpeed = .3; //Moves a cell every .3 seconds
    this.timeTillMove = 0; //Time till the ghost can move cell

    this.moveDirection = new Vector2(1,0);
    this.position = new Vector2(x, y);

    this.gridRef = grid;
    var img = new Image(256, 32);
    img.src = "ASSETS/SPRITES/Red_ghost_72.png";
    this.spr = new Sprite(this.position.x, this.position.y, 32, 32, img, 32, 32, true, 4);
    var eyeImg = new Image(256, 32);
    eyeImg.src = "ASSETS/SPRITES/Eyes_72.png";
    this.eyes = new Sprite(this.position.x, this.position.y, 32, 32, eyeImg, 32, 32, false, 4);

    this.ghostType = ghostType;
  }

  update(dt){
    this.checkIfGhostMoved(dt); //Check if the ghost has moved
  }

  checkIfGhostMoved(dt){

    this.timeTillMove += dt;

    if(this.timeTillMove >= this.moveSpeed)
    {
      this.timeTillMove = 0;
      //Add our movement to the ghost
      this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
    }
  }


  draw(ctx){
    this.spr.draw(this.position.x, this.position.y);
    this.eyes.draw(this.position.x, this.position.y);
  }
}
