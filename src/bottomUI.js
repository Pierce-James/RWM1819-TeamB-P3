class bottomUI{
    constructor(){
        
    this.uiDivBot = document.createElement('div');
    this.uiDivBot.id = 'Bottom of UI';
    this.uiDivBot.style.position = 'fixed';
    this.uiDivBot.style.bottom = '0%';
    this.uiDivBot.style.width = '100%';
    this.uiDivBot.style.height = '10%';
    this.uiDivBot.style.backgroundColor = '#393838';
    document.body.appendChild(this.uiDivBot);

    this.UICanvas = document.createElement('canvas');
    this.UICanvas.id = 'bottomCanvas';
    this.UICanvas.style.top = this.uiDivBot.style.top;
    this.UICanvas.width = window.innerWidth;
    this.UICanvas.height = window.innerHeight;
    this.uiDivBot.appendChild(this.UICanvas);

    //should display pac mans for lives
    //and icons of all the fruit picked up so far
    this.lives = 5;
    this.lifeIcons = [];

    var img = new Image(18166, 3509);
    img.src = "ASSETS/SPRITES/Pacmanfix.png";
    var life1 = new Sprite(50, 20, 3475, 3509, img, 50, 50, false, 1);
    life1.setFrame(3);
    var life2 = new Sprite(100, 20, 3475, 3509, img, 50, 50, false, 1);
    life2.setFrame(3);
    var life3 = new Sprite(150, 20, 3475, 3509, img, 50, 50, false, 1);
    life3.setFrame(3);
    var life4 = new Sprite(200, 20, 3475, 3509, img, 50, 50, false, 1);
    life4.setFrame(3);
    var life5 = new Sprite(250, 20, 3475, 3509, img, 50, 50, false, 1);
    life5.setFrame(3);

    this.lifeIcons.push(life1);
    this.lifeIcons.push(life2);
    this.lifeIcons.push(life3);
    this.lifeIcons.push(life4);
    this.lifeIcons.push(life5);

    }

    draw(){
        this.UICanvas.getContext("2d").clearRect(0, 0, this.UICanvas.width, this.UICanvas.height);
        if(this.lives > 5)
            this.lives = 5;
        for(var i = 0; i < this.lives; i++)
        {
            this.lifeIcons[i].draw(this.UICanvas);
        }
    }
}