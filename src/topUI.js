class topUI{
    constructor(){
        
    this.uiDivTop = document.createElement('div');
    this.uiDivTop.id = 'Top of UI';
    this.uiDivTop.style.position = 'fixed';
    this.uiDivTop.style.top = '0%';
    this.uiDivTop.style.width = '100%';
    this.uiDivTop.style.height = '10%';
    this.uiDivTop.style.backgroundColor = '#000000';
    document.body.appendChild(this.uiDivTop);

    this.UICanvas = document.createElement('canvas');
    this.UICanvas.id = 'topCanvas';
    this.UICanvas.style.top = this.uiDivTop.style.top;
    this.UICanvas.width = window.innerWidth;
    this.UICanvas.height = window.innerHeight;
    this.uiDivTop.appendChild(this.UICanvas);

    this.score = 0;

        
    //Loading the font for the game
    const font = new FontFace("Joystix", "url(src/ASSETS/Joystix.ttf)");
    document.fonts.add(font);
    document.body.classList.add("Joystix");

    //Will display current score
    //Should display current high score

    }    
    
    draw(){
        var ctx = this.UICanvas.getContext("2d");

        ctx.save(); //Save the ctx
        ctx.fillstyle = "#000000";
        ctx.fillRect(0, 0, this.UICanvas.width, 97);
    
        ctx.textAlign = "center"; //Allign text to draw from its centre
        ctx.fillStyle = "#DDDDDD"; //Set to blue text
        ctx.font = "30px Joystix";
    
    
        ctx.fillText("score", 1280 / 2, 50);
        ctx.fillText("1up", 100, 50);

        var scoreTXT = this.score.toString(10);
        while(scoreTXT.length < 9)
        {
            scoreTXT = '0'+scoreTXT;
        }

        ctx.fillText(scoreTXT, 1280 / 2, 75);
        
        ctx.restore(); //Restore it

    }
}