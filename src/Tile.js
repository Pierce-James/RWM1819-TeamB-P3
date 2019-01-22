
class Tile{
    constructor(x, y, w, h, type){
        this.x = x;
        this.y =y;
        this.width = w;
        this.height = h;
        this.isCollidable = type;
    }

    getRow()
    {
        return this.x / this.width; 
    }

    getCol()
    {
        return this.y / this.height;
    }

    render()
    {
        let canvas = document.getElementById("mycanvas");
        let ctx = canvas.getContext("2d");
        if (this.isCollidable)
        {
            ctx.fillStyle = "#00007D";
        }
        else{
            ctx.fillStyle = "#000000";
        }

        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.stroke();
    }
}