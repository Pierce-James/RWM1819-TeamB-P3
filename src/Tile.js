
class Tile{
    constructor(x, y, w, h, id){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.ID = id;
        this.images = [];
        this.loadImages();

        this.isCollidable = (this.ID !== 0 && this.ID !== 99 && this.ID !== 98 && this.ID !== 97 && this.ID !== -1) ? true : false;
        this.isPickup = (this.ID === 0 || this.ID === 97 || this.ID === 99) ? true : false;
        this.isGate = this.ID === 98 ? true : false;
        this.previous = undefined;
        this.cost = 0;
        this.isVisisted = false;
        this.gridPosition = new Vector2(this.x / this.width, this.y / this.height);
    }

    getRow()
    {
        return this.x / this.width;
    }

    getCol()
    {
        return this.y / this.height;
    }

    loadImages()
    {
        for (let i = 0; i < 18; i++)
        {
            this.images.push(new Image());
        }

        this.images[0].src = "./ASSETS/SPRITES/tile_1.png";
        this.images[1].src = "./ASSETS/SPRITES/tile_2.png";
        this.images[2].src = "./ASSETS/SPRITES/tile_3.png";
        this.images[3].src = "./ASSETS/SPRITES/tile_4.png";
        this.images[4].src = "./ASSETS/SPRITES/tile_5.png";
        this.images[5].src = "./ASSETS/SPRITES/tile_6.png";
        this.images[6].src = "./ASSETS/SPRITES/tile_7.png";
        this.images[7].src = "./ASSETS/SPRITES/tile_8.png";
        this.images[8].src = "./ASSETS/SPRITES/tile_9.png";
        this.images[9].src = "./ASSETS/SPRITES/tile_10.png";
        this.images[10].src = "./ASSETS/SPRITES/tile_11.png";
        this.images[11].src = "./ASSETS/SPRITES/tile_12.png";
        this.images[12].src = "./ASSETS/SPRITES/tile_13.png";
        this.images[13].src = "./ASSETS/SPRITES/tile_14.png";
        this.images[14].src = "./ASSETS/SPRITES/tile_15.png";
        this.images[15].src = "./ASSETS/SPRITES/tile_16.png";
        this.images[16].src = "./ASSETS/SPRITES/tile_17.png";
    }

    render(ctx)
    {
      ctx.save();

      if (this.ID === -1 || this.ID === 98 || this.ID === 17)
      {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
      else if(this.ID === 99)
      {
        //Draw super pellet
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
      else if (this.ID === 97)
      {
        //Draw fruit
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
      else if (this.ID === 0)
      {
        //Draw pellet
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, this.width, this.height)
      }
      else{
        ctx.drawImage(this.images[this.ID - 1], this.x, this.y);
      }





    //   if(this.isCollidable === false)
    //   {
    //   ctx.textAlign = "center"; //Allign text to draw from its centre
    //   ctx.fillStyle = "#ffffff"; //Set to white text
    //   ctx.font = "8px Joystix";

    //   //Draw the grids position
    //    var gridPos = "(" + this.getCol().toString() + "," + this.getRow().toString() + ")";

    //    ctx.fillText(gridPos, this.x + 16, this.y + 16);
    //  }

      ctx.restore();
    }
}