class Fruit
{
    constructor(X, Y, fruitType){
        this.x = X;
        this.y = Y;
        this.type = fruitType;
        this.value = 100;
        
        var img = new Image(256, 32);
        switch(fruitType){
            case 'cherry':
                this.value = 100;
                img.src = "ASSETS/SPRITES/Cherry_72.png";
                break;
            case 'strawberry':
                this.value = 300;
                img.src = "ASSETS/SPRITES/Strawberry_72.png";
                break;
            case 'orange':
                this.value = 500;
                img.src = "ASSETS/SPRITES/Orange_72.png";
                break;
            case 'apple':
                this.value = 700;
                img.src = "ASSETS/SPRITES/Apple_72.png";
                break;
            case 'melon':
                this.value = 1000;
                img.src = "ASSETS/SPRITES/Melon_72.png";
                break;
            case 'galaxian':
                this.value = 2000;
                img.src = "ASSETS/SPRITES/Galaxian_Boss_72.png";
                break;
            case 'bell':
                this.value = 3000;
                img.src = "ASSETS/SPRITES/Bell_72.png";
                break;
            case 'key':
                this.value = 5000;
                img.src = "ASSETS/SPRITES/Key_72.png";
                break;
        }
        this.spr = new Sprite(this.x, this.y, 32, 32, img, 32, 32);

    }

    draw(x = this.x, y = this.y, canvas = document.getElementById("mycanvas"))
    {
        this.spr.draw(x, y, canvas);
    }
}