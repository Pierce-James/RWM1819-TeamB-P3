class Sprite{

    draw(canvas){
        if(this.animating){
            if(this.currentFrame >= numFrames)
                this.currentFrame = 0;

            this.currentFrame++;
        }
        ctx.drawImage(this.src,(this.src.width*this.currentFrame),0,this.src.width,this.src.height,this.x,this.y);

    }
    constructor(X = 0, Y = 0, img = new Image(), animating = false, frames = 1){
        this.x = X;
        this.y = Y;
        this.src = img;
        this.animating = animating;
        this.numFrames = frames;
        this.currentFrame = 0;

        //needs a time delay or something maybe probably
        
    }
}