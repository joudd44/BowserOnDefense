// Globals
var AM = new AssetManager();
var background;
var startingX = 480;
var startingY = 380;
var movingRight = true;
var movingLeft = false;

AM.queueDownload("./img/bowserToRight.png");
AM.queueDownload("./img/bowserToLeft.png");
AM.queueDownload("./img/bowserLookingLeft.png");
AM.queueDownload("./img/bowserLookingRight.png");
AM.queueDownload("./img/fireball.png");
AM.queueDownload("./img/zombie_walking_to_right.png");
AM.queueDownload("./img/zombie_dying_to_right.png");
AM.queueDownload("./img/zombie_walking_to_left.png");
AM.queueDownload("./img/zombie_dying_to_left.png");


//Begin Animation 
function BowserAnimation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    var count = 0;
}

BowserAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    //this is doing the total count of what is on the screen for the number of differnt views of the animation

    // Modular should be the number of frames per row in the sprite ???
    xindex = frame % 8;
    yindex = Math.floor(frame / 8);

    this.count += this.tick;

    
    	ctx.drawImage(background,0,0);
    	if(1)
    	{
    		ctx.drawImage(AM.getAsset("./img/bowserToRight.png"),
    			    this.frameWidth, this.frameHeight,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x, y,
                    this.frameWidth,
                    this.frameHeight);
        	
    	}
    	else 
    	{   		
    		ctx.drawImage(AM.getAsset("./img/bowserToLeft.png"),
                    xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x, y,
                    this.frameWidth,
                    this.frameHeight);
    	}
    	
}


BowserAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

BowserAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
// End Animation


function BowserOnDefense(game) {
    this.animation = new BowserAnimation(AM.getAsset("./img/bowserLookingRight.png"), 64, 78, 0.05, 16, true, true);
    this.x = startingX;
    this.y = startingY;
    this.game = game;
    this.ctx = game.ctx;
    console.log("boswer created.");
    
}

BowserOnDefense.prototype.draw = function () {
	if(movingRight)
	{
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
	else
    {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x-1, this.y-1);
    }
}

BowserOnDefense.prototype.update = function() 
{
	Entity.prototype.update.call(this);
	
}
//End BowserOnDefense

function ZombieOnAttack(game) {
    this.animation = new ZombieAnimation(AM.getAsset("./img/zombie_walking_to_right.png"), 48, 90, 0.05, 12, true, true);
    this.x = 256;
    this.y = startingY;
    this.game = game;
    this.ctx = game.ctx;
    console.log("zombie Created.");
    
}

ZombieOnAttack.prototype.draw = function () {
	if(movingRight)
	{
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
	else
    {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x-1, this.y-1);
    }
}

ZombieOnAttack.prototype.update = function() 
{
	Entity.prototype.update.call(this);
	
}
//End BowserOnDefense

function ZombieAnimation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    var count = 0;
}

ZombieAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    //this is doing the total count of what is on the screen for the number of differnt views of the animation

    // Modular should be the number of frames per row in the sprite ???
    xindex = frame % 12;
    yindex = Math.floor(frame / 12);

    this.count += this.tick;

    
    	ctx.drawImage(background,0,0);
    	if(movingRight)
    	{
    		ctx.drawImage(AM.getAsset("./img/zombie_walking_to_right.png"),
    			    xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x, y,
                    this.frameWidth,
                    this.frameHeight);
        	
    	}
    	else 
    	{   		
    		ctx.drawImage(AM.getAsset("./img/zombie_walking_to_left.png"),
                    xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x, y,
                    this.frameWidth,
                    this.frameHeight);
    	}
    	
}


ZombieAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

ZombieAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
// End Animation


AM.downloadAll(function () {
    var canvas = document.getElementById("bowserDefense");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();

    
    gameEngine.init(ctx);
    gameEngine.start();

    canvas.width = 1024;     
    canvas.height = 491;

    background = new Image();
    background.src = "./img/bowser_background.png";
    
    gameEngine.addEntity(new BowserOnDefense(gameEngine));
    gameEngine.addEntity(new ZombieOnAttack(gameEngine));
    


});