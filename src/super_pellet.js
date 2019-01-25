class SuperPellet
{
    constructor(pos) {
        this.position = new Vector2(pos.x, pos.y);
        this.gridPosition = new Vector2(pos.x / 32, pos.y / 32);
        this.value = 50;
        this.pickedUp = false;

        var img = new Image(40,20);
        img.src = "ASSETS/SPRITES/Super_Pellets_72.png";

        this.pellet = new Sprite(this.position.x + 6, this.position.y + 6, 20, 20, img, 20, 20, true, 2, 500);
        this.isSuperPellet = true;
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
        //Only draw the super pellet if it isnt picked up
        if(this.pickedUp === false)
        {
            this.pellet.draw();
        }
    }
}