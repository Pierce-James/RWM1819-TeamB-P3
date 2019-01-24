
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
        for (let i = 0; i < 25; i++)
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
        this.images[17].src = "./ASSETS/SPRITES/tile_18.png";
        this.images[18].src = "./ASSETS/SPRITES/tile_19.png";
        this.images[19].src = "./ASSETS/SPRITES/tile_20.png";
        this.images[20].src = "./ASSETS/SPRITES/tile_21.png";
        this.images[21].src = "./ASSETS/SPRITES/tile_22.png";
        this.images[22].src = "./ASSETS/SPRITES/tile_23.png";
        this.images[23].src = "./ASSETS/SPRITES/tile_24.png";
        this.images[24].src = "./ASSETS/SPRITES/tile_25.png";
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
        ctx.save();
        //Draw super pellet
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore();
      }
      else if (this.ID === 97)
      {
        //Draw fruit
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
      else if (this.ID === 0)
      {
      }
      else{
        ctx.drawImage(this.images[this.ID - 1], this.x, this.y);
      }
      ctx.restore();
    }
}