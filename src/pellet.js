class Pellet
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = 10;

        var img = new Image(500,500);
        img.src = "ASSETS/SPRITES/Pellet_72.png";

        this.pellet = new Sprite(this.x, this.y, 32,32, img, 32, 32);
    }

    draw(x = this.x, y= this.y, canvas = document.getElementById("mycanvas"))
    {
        this.pellet.draw(x,y, canvas);
    }

}