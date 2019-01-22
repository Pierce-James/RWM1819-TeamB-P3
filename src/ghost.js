class Ghost
{
  constructor(ghostType, x, y, grid){
    this.moveDistance = 32; //32 pixels per move
    this.moveSpeed = .4; //Moves a cell every .2 seconds
    this.timeTillMove = 0; //Time till the ghost can move cell

    this.moveDirection = new Vector2(1,0);
    this.position = new Vector2(x, y);

    this.gridRef = grid;
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
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#f46842";
    ctx.arc(this.position.x, this.position.y, 16, 0, 2* Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}
