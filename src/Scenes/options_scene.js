class OptionsScene{
    constructor(){
        //Loading the font for the game
        const font = new FontFace("Joystix", "url(src/ASSETS/Joystix.ttf)");
        document.fonts.add(font);
        document.body.classList.add("Joystix");

        this.options = [];
        this.options.push('rebind controls');
        this.options.push("volume : " + audioOptions.volume.toString()+ "%");
        this.options.push("main menu");

        this.buttonIndex = 0;

        //Input variables
        this.keyPressed = false;

        this.enterPressed = false;
        this.wasEnterPressed = false;
        this.changeSceneStr = "this.mManager.setCurrentScene('Game Scene')";
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
        this.isActive = false;

    }

    start(){
        this.isActive = true;
    }

    stop(){
      this.isActive = false;
    }

    //Input handle
    handleInput(input)
    { 
        if(this.isActive === true)
        {
            if(this.enterPressed)
            {
                this.enterPressed = false;
                switch(this.buttonIndex){
                    case 2:
                        return "this.mManager.setCurrentScene('Main Menu')";
                }
            }  
        }

    }

    keyDown(e)
    {
        if(this.isActive === true)
        {
            if(this.keyPressed === false)
            {
          switch(e.code){
                case 'ArrowUp':
                    this.options[this.buttonIndex] = this.options[this.buttonIndex].substr(2)
                    this.buttonIndex--;
                    if(this.buttonIndex < 0)
                        this.buttonIndex = 2;
                    this.options[this.buttonIndex] = '> ' + this.options[this.buttonIndex];
                    this.keyPressed = true;
                    break;
                case 'ArrowDown' :
                    this.options[this.buttonIndex] = this.options[this.buttonIndex].substr(2)
                    this.buttonIndex++;
                    if(this.buttonIndex>=3)
                        this.buttonIndex = 0;
                    this.options[this.buttonIndex] = '> ' + this.options[this.buttonIndex];
                    this.keyPressed = true;
                    break;
                case 'ArrowLeft' :
                    if(this.buttonIndex === 1){
                        audioOptions.volume--;
                        this.options[1] = "> volume : " + audioOptions.volume.toString()+ "%";
                    }
                    this.keyPressed = true;
                    break;
                case 'ArrowRight' :
                    if(this.buttonIndex === 1){
                        audioOptions.volume++;
                        this.options[1] = "> volume : " + audioOptions.volume.toString()+ "%";
                    }
                    this.keyPressed = true;
                    break;
              case 'Enter' :
                    this.enterPressed = false;
                    this.keyPressed = true;
          }  
      }
        }
      

    }
  
    keyUp(e)
    {
        if(this.isActive === true)
        {
            if(this.isActive === true)
            {        
                switch(e.code){
                case 'ArrowUp':
                    this.keyPressed = false;
                    break;
                case 'ArrowDown' :
                    this.keyPressed = false;
                    break;
                case 'ArrowLeft':
                    this.keyPressed = false;
                    break;
                case 'ArrowRight' :
                    this.keyPressed = false;
                    break;
                case 'Enter' :
                    this.enterPressed = true;
                    this.keyPressed = false;
                    break;
                } 
            }
        }

      //this.wasEnterPressed = this.enterPressed; //Set previous*/
    }

    update(dt)
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
  
      ctx.fillText("options", 1280 / 2, 50);

      ctx.font = "30px Joystix";

      ctx.fillText(this.options[0], 1280 / 2, 500);

      ctx.fillText(this.options[1], 1280 / 2, 600);

      ctx.fillText(this.options[2], 1280 / 2, 700);
  
      ctx.restore(); //Restore it
    }
}