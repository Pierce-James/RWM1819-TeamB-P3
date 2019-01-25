class PauseScene{

    constructor() 
    {
        const font = new FontFace("Joystix", "url(src/ASSETS/Joystix.ttf)");
        document.fonts.add(font);
        document.body.classList.add("Joystix");

        this.pause = [];
        this.pause.push("Continue");
        this.pause.push("Exit");
        
        this.buttonIndex = 0;
        this.buttonReturns = ["this.mManager.setCurrentScene('Game Scene')", "this.mManager.setCurrentScene('Main Menu')"];

        this.exitPressed = false;
       
        document.addEventListener("keyup", this.keyUp.bind(this));
        this.isActive = false;
        this.pause[this.buttonIndex] = '> ' + this.pause[this.buttonIndex];
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    handleInput(input)
    {
       
        if(this.isActive === true)
        {
           if(this.exitPressed)
           {
               this.exitPressed = false;
               return this.buttonReturns[this.buttonIndex];
           }
        }
    }


    keyUp(e) 
    {
        if(this.isActive === true)
        {
          switch(e.code){
                case 'Enter':
                    this.exitPressed = true;
                    break;
                case 'ArrowUp':
                    this.pause[this.buttonIndex] = this.pause[this.buttonIndex].substr(2)
                    this.buttonIndex--;
                    if(this.buttonIndex < 0)
                    {
                        this.buttonIndex = 1;
                      //  ctx.fillText(">", 350, 500);
                    }
                    this.pause[this.buttonIndex] = '> ' + this.pause[this.buttonIndex];
                    break;
                case 'ArrowDown' :
                    this.pause[this.buttonIndex] =  this.pause[this.buttonIndex].substr(2)
                    this.buttonIndex++;
                    if(this.buttonIndex > 1)
                    {
                        this.buttonIndex = 0;
                       // ctx.fillText(">", 350, 600);
                    }
                    this.pause[this.buttonIndex] = '> ' + this.pause[this.buttonIndex];
                    break;
            }
        }
    }

    update() 
    {
      
    }

    draw(ctx)
    {
        ctx.save(); //Save the ctx
      ctx.fillstyle = "#000000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.textAlign = "center"; //Align text to draw from its centre
      ctx.fillStyle = "#FFFFFF"; //Set to blue text
      ctx.font = "60px Joystix";
  
      ctx.fillText("Pause", 1280 / 2, 200);
      ctx.font = "30px Joystix";
      ctx.fillText(this.pause[0], 1280 / 2, 500);
      ctx.fillText(this.pause[1], 1280 / 2, 600);
      
      ctx.restore(); //Restore it
    } 
}