class Pellet
{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.value = 10;

        var img = new Image(500,500);
        img.src = "ASSETS/SPRITES/Pellets_72.png";

        this.pellet = new Sprite(this.x, this.y, 32,32, img, 32, 32);
        
    }

    draw(ctx)
    {
        //ctx.save();
        
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        this.pellet.draw();
        ctx.fillStyle = "green";
      //  ctx.fillRect(this.x, this.y, this.width, this.height)
       // ctx.restore();
    }

}