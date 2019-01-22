class Sprite{

    draw(canvas){
            if(this.animating){
                if(this.currentFrame >= this.numFrames-1)
                {
                    this.currentFrame = 0;
                }

                if(Date.now() > this.lastFrame + this.frameTime)
                {
                    this.currentFrame++;
                    this.lastFrame = Date.now();
                }
            }  
            var c = document.getElementById("mycanvas");
            var ctx = c.getContext("2d");
            ctx.drawImage(this.src,(this.w*this.currentFrame),0,this.w,this.h,this.x,this.y, this.dw, this.dh);
        }
    constructor(X = 0, Y = 0, W = 0, H = 0, img = new Image(), animating = false, frames = 1, DW = 50, DH = 50){
        this.x = X;
        this.y = Y;
        this.w = W;
        this.h = H;
        this.dw = DW;
        this.dh = DH;
        this.src = img;
        this.animating = animating;
        this.numFrames = frames;
        this.currentFrame = 0;
        this.lastFrame = Date.now();
        this.frameTime = 100;
        
    }
}