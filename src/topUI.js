class topUI{
    constructor(){
        
    this.uiDivTop = document.createElement('div');
    this.uiDivTop.id = 'Top of UI';
    this.uiDivTop.style.position = 'fixed';
    this.uiDivTop.style.top = '0%';
    this.uiDivTop.style.width = '100%';
    this.uiDivTop.style.height = '10%';
    this.uiDivTop.style.backgroundColor = '#393838';
    document.body.appendChild(this.uiDivTop);

    this.UICanvas = document.createElement('canvas');
    this.UICanvas.id = 'topCanvas';
    this.UICanvas.style.top = this.uiDivTop.style.top;
    this.UICanvas.width = window.innerWidth;
    this.UICanvas.height = window.innerHeight;
    this.uiDivTop.appendChild(this.UICanvas);

    //Will display current score
    //Should display current high score

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