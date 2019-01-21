class Player {

    constructor(x, y, width, height, colour) 
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.speed = 5;
    }

    render()
    {
        var canvas = document.getElementById('mycanvas');
       // console.log(canvas);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.rgb(this.colour[0],this.colour[1],this.colour[2]);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    rgb(r, g, b)
  {
    return 'rgb('+this.clamp(Math.round(r),0,255)+', '+this.clamp(Math.round(g),0,255)+', '+this.clamp(Math.round(b),0,255)+')';
  }

  clamp(value, min, max)
  {
    if(max<min) {
      var temp = min;
      min = max;
      max = temp;
    }
    return Math.max(min, Math.min(value, max));
  }

    update()
    {
        console.log("updating");
      if(keyMap[37] === true )
      {
          this.x -= 5;
          console.log("moving");
      }

      if(keyMap[39] === true )
      {
          this.x += 5;
          console.log("moving");
      }

      if(keyMap[38] === true )
      {
          this.y -= 5;
          console.log("moving");
      }

      if(keyMap[40] === true )
      {
          this.y += 5;
          console.log("moving");
      }

      if(keyMap[74] === true )
      {
          this.y -= 20 ;
          console.log("moving");
      }
    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}