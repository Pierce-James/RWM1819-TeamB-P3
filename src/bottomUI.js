class bottomUI{
    constructor(){
        
    this.uiDivBot = document.createElement('div');
    this.uiDivBot.id = 'Bottom of UI';
    this.uiDivBot.style.position = 'fixed';
    this.uiDivBot.style.bottom = '0%';
    this.uiDivBot.style.width = '100%';
    this.uiDivBot.style.height = '7%';
    this.uiDivBot.style.backgroundColor = '#000000';
    document.body.appendChild(this.uiDivBot);

    this.UICanvas = document.createElement('canvas');
    this.UICanvas.id = 'bottomCanvas';
    this.UICanvas.style.top = this.uiDivBot.style.top;
    //this.UICanvas.width = document.getElementById('mycanvas').offsetWidth;
    this.UICanvas.width = 725;
    this.UICanvas.height = window.innerHeight;
    this.uiDivBot.appendChild(this.UICanvas);

    //should display pac mans for lives
    //and icons of all the fruit picked up so far
    this.lives = 3;
    this.lifeIcons = [];

    var img = new Image(256, 32);
    img.src = "ASSETS/SPRITES/Pacman72.png";
    var life1 = new Sprite(50, 0, 32, 32, img, 50, 50, false, 1);
    life1.setFrame(3);
    var life2 = new Sprite(100, 0, 32, 32, img, 50, 50, false, 1);
    life2.setFrame(3);
    var life3 = new Sprite(150, 0, 32, 32, img, 50, 50, false, 1);
    life3.setFrame(3);
    var life4 = new Sprite(200, 0, 32, 32, img, 50, 50, false, 1);
    life4.setFrame(3);
    var life5 = new Sprite(250, 0, 32, 32, img, 50, 50, false, 1);
    life5.setFrame(3);

    this.lifeIcons.push(life1);
    this.lifeIcons.push(life2);
    this.lifeIcons.push(life3);
    this.lifeIcons.push(life4);
    this.lifeIcons.push(life5);

    this.fruits = [];
    this.fruits.push(new Fruit(1,2));
    }

    draw(){
        this.UICanvas.getContext("2d").clearRect(0, 0, this.UICanvas.width, this.UICanvas.height);
        if(this.lives > 5)
            this.lives = 5;
        for(var i = 0; i < this.lives; i++)
        {
            this.lifeIcons[i].draw(undefined, undefined, this.UICanvas);
        }

        var rightSide = this.UICanvas.width;
        for(var j = 0; j < this.fruits.length; j++)
        {
            rightSide-=50;
            this.fruits[j].draw(rightSide, 0, this.UICanvas);
        }
    }

    updateLives(lives){
        this.lives = lives;
    }
    updateFruits(collectedFruits){
        //add fruits to the list here
    }
}