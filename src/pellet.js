class Pellet
{
    constructor(pos) {
        this.position = new Vector2(pos.x, pos.y);
        this.gridPosition = new Vector2(pos.x / 32, pos.y / 32);
        this.value = 10;

        var img = new Image(10,10);
        img.src = "ASSETS/SPRITES/Pellets_72.png";

        this.pellet = new Sprite(this.position.x + 11, this.position.y + 11, 10, 10, img, 10, 10);
        this.pickedUp = false;

        this.isSuperPellet = false;
    }

    reset()
    {
        this.pickedUp = false;
    }

    pickUp()
    {
        this.pickedUp = true;
    }

    draw(ctx)
    {
        ctx.save();
        if(this.pickedUp === false)
        {
            this.pellet.draw();
        }
        ctx.fillStyle = "black";
      //  ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore();
    
    }

}