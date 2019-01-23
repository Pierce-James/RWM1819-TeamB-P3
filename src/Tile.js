
class Tile{
    constructor(x, y, w, h, type){
        this.x = x;
        this.y =y;
        this.width = w;
        this.height = h;
        this.isCollidable = type;
        this.gridPosition = new Vector2(this.y / this.height, this.x / this.width);
    }

    getRow()
    {
        return this.x / this.width;
    }

    getCol()
    {
        return this.y / this.height;
    }

    render(ctx)
    {
      ctx.save();

      ctx.fillStyle = this.isCollidable ? "#00007D" : "#000000";
      ctx.fillRect(this.x, this.y, this.width, this.height)

      if(this.isCollidable == false)
      {
      ctx.textAlign = "center"; //Allign text to draw from its centre
      ctx.fillStyle = "#ffffff"; //Set to white text
      ctx.font = "8px Joystix";

      //Draw the grids position
      //var gridPos = "(" + this.getCol().toString() + "," + this.getRow().toString() + ")";

      //ctx.fillText(gridPos, this.x + 16, this.y + 16);
    }

      ctx.restore();
    }
}
