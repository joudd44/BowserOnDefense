/*
 * TODO:  Zombie   
 * needs to know where Bowser is so he can chase him. 
 *   Need some kind of slowness response for when bowser jumps, keep moving
 *   only to turn around when bowser lands?  
 * When to turn around
 * 
 * TODO: Bowser
 * Jump over Zombie
 * fireball from mouth needs fixing. 
 * run away direction needs to adjust based on where zombie is
 * fireball shooting needs to be adjusted to properly shoot fireballs at zombie(s)
 * 
 * 
 * TODO: Create init()
 * If i make an init method that has all the globals in it to start the game, then 
 * I could easily have values reset during the game, such as x location for bowser. 
 * 
 * NOTES:
 * If zombie gest close, jump or go around it then run to other side
 * Random bowser "catch breath". Meaning bowser has to stop to catch his breath from 
 * all the crazy zombie avoiding he is doing. 
 * 
 * 
 * 
 * 
 * 
 */



// Globals
var AM = new AssetManager();
var bowserLocationX = 512;
var bowserLocationY = 390;
var background;
var leftStartingX = 50;
var rightStartingX = 974;
var movingRight = true;
var movingLeft = false;
var fireShot;
var ZombieOnRight = false;
var castleLeftSide = 128;
var castleRightSide = 896;
var fireballAmmoReady; 
var gameString = "";
var local = true;
var LoadSave = false;

/*
 * 		//These get the entire object with values. 	
		for(var i in this.game.entities) {
			//These get the entire object with values. 
			//console.log(this.game.entities[i]);
			//These get the actual name of the object of the entity.
			//console.log(this.game.entities[i].constructor.name);
		}
 */


/**
 * Creates a Zombie that will go after bowser. 
 */
function Zombie(game, x, y) {
    this.animation = new ZombieAnimation("why do i need this?", 100, 73, 0.35, 11, true, true);
    var amIonFire = this.BowserFire;
    var rightZombies = new Array();
    var leftZombies = new Array();
    var hitme = false;
    var bowserLocation = bowserLocationX;
    if(LoadSave)
    {
    	this.setLocation()
    }
    else
    {
    	this.x = leftStartingX;
        this.y = 375;
    }
    
    this.game = game;
    this.ctx = game.ctx;
    console.log("Zombie Created.");
    this.moreZombies();
}

/**
 * Call the animation to move the zombie sprite on the gameboard. 
 */
Zombie.prototype.draw = function () {

		this.whereIsBowser();
		if(movingRight)
		{
			this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		}
		else
	    {
			this.animation.drawFrame(this.game.clockTick, this.ctx, this.x-1, this.y-1);
	    }
}

/**
 * Update the location of the zombie on the gameboard. 
 */
Zombie.prototype.update = function() 
{
	if (this.fireHitMe())
	{
		if(this.x >= castleRightSide)
		{
			//Bowsers back is against a wall! what will he do???
		}
		else
		{
			this.x += .04;
			var timer = setInterval(this.hitme = false, 2000);
		}

		
	}
	else
	{
		if(this.x >= castleRightSide)
		{
			
		}
		else
		{
			this.x += 1;
		}
	}		
	Entity.prototype.update.call(this);
	
}

/**
 * This function will check to see if a collision has happened between the fire and the zombie. 
 */
Zombie.prototype.fireHitMe = function(){
	
	for(var i in this.game.entities) 
	{
		if(this.game.entities[i].constructor.name === "BowserFire" &&  
		   this.x >= this.game.entities[i].x) //TODO: need this to work of zombie is from right to left too. 
		{
			//console.log("Zombie Hit with Fire");
			this.hitme = true;
		}
	}
	
	return this.hitme;
		
}

Zombie.prototype.whereIsBowser = function()
{
	//TODO: need to make Zombie go after bowser on the x axis. 
}

/**
 * Creates more zombies on the game.  Not in use. 
 */
Zombie.prototype.moreZombies = function(){
	
	var moreZombiess = Math.floor(Math.random() * (4 - 1)) + 1;
	var ZombiesOnRight = Math.random() >= 0.5;

	if (ZombiesOnRight)
	{
		//TODO: make new zombie(s) on the right
	}
	else 
	{
		//TODO: make new zombie(s) on the left
	}

}

Zombie.prototype.setLocation = function(x,y)
{
	this.x = x;
	this.y = y;
}


//End Zombie


/**
 * Create the Zombie animation object for the game. 
 */
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
}


/**
 * Animates sprite on the gameboard by checking for clock ticks to update sprite on gameboard. 
 * @param tick
 * @param ctx
 * @param x
 * @param y
 */
ZombieAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    
    var xindex = 0;
    var yindex = 0;
    //this is doing the total count of what is on the screen for the number of differnt views of the animation
    if (frame > 12) {
        frame =  - frame;
    }
    // Modular should be the number of frames per row in the sprite ???
    xindex = frame % 11;
    yindex = Math.floor(frame / 11);
    
    	ctx.drawImage(background,0,0);
    	
    	if(movingRight)
    	{
    		ctx.drawImage(AM.getAsset("./img/z1.png"),
    			    xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    x, y,
                    this.frameWidth,
                    this.frameHeight);        	
    	}
    	else
    	{
    		ctx.drawImage(AM.getAsset("./img/z2.png"),
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
// End ZombieAnimation


//Begin Bowser
function Bowser(game) {
    //this.animation = new BowserAnimation("why do i need this?", 100, 73, 0.4, 11, true, true);
    this.x = 512;
    this.y = bowserLocationY;
    this.game = game;
    this.ctx = game.ctx;
    this.ZombieOnRight = ZombieOnRight;
    var zombieLocation = leftStartingX;
    var fire = false;
    console.log("Bowser Created.");
    
}

Bowser.prototype.draw = function () {
	
	//Check to see where the Zombie is on the gameboard. 
	this.whereIsZombie();
	
	if(ZombieOnRight)
	{
		//If shooting, face the zombie, then turn and run. 
		if (this.readyToFire())
		{
			console.log("fire everything.")
		}
		this.ctx.drawImage(AM.getAsset("./img/bowserLookingLeft.png"), this.x, this.y );	
	}
	else
	{
		this.ctx.drawImage(AM.getAsset("./img/bowserLookingRight.png"), this.x, this.y );
	}
	
}

Bowser.prototype.update = function() 
{
	if(ZombieOnRight)
	{
		//TODO: make this dynamic to the direction Bowser is pointing. 
		if(this.x >= castleLeftSide)
		{
			//Bowsers back is against a wall! what will he do???
			ZombieOnRight = true;
		}
		else
		{
			this.x -= 1;
		}
	}
	else
	{
		if(this.x >= castleRightSide)
		{
			//Bowsers back is against a wall! what will he do???
		}
		else
		{
			this.x += 1;
		}
		
		//TODO: make this dynamic to the direction Bowser is pointing.

	}

	Entity.prototype.update.call(this);
}

Bowser.prototype.getBowserLocation = function()
{
	bowserLocationX = this.x;
	return this.x;
}

Bowser.prototype.whereIsZombie = function()
{
	//This makes bowser know where the zombie is. 
	for(var i in this.game.entities) {
		if(this.game.entities[i].constructor.name === "Zombie")
		{
			this.zombieLocation = this.game.entities[i].x;
		}
	}

	//Set bowser to look the correct way for shooting.
	if(this.zombieLocation > this.x)
	{
		ZombieOnRight = true;
	}
	else 
	{
		ZombieOnRight = false;
	}
		
}

Bowser.prototype.readyToFire = function()
{
	// This will tell bowser to face the correct way when shooting fire at zombie. 
	for(var i in this.game.entities) {
		if(this.game.entities[i].constructor.name === "BowserFire")
		{
			 this.fire = this.game.entities[i].fireballAmmoReady;
		}
	}
	return this.fire;
}

//End Bowser

/**
 * Bowser spits fire at zombies this is his ammo. 
 */
function BowserFire(game) {
    this.animation = new BowserFireAnimation("why do i need this?", 100, 73, 0.35, 1, true, true);
    fireballShootOffsetX = 15;
    fireballShootOffsetY = 10;
    this.x = this.bowserMouthLocation();
    this.y = bowserLocationY + fireballShootOffsetY;
    this.timer = new Timer();
    this.game = game;
    this.ctx = game.ctx;
    this.fireShot = true;
    var needAnotherFireBall = false;
    this.fireballAmmoReady = false;
    var hitZombie = false;
    this.ZombieOnRight = ZombieOnRight;
    console.log("BowserFire Created.");
    this.bLocation = new Bowser(game);
    
}

BowserFire.prototype.bowserMouthLocation = function()
{
	return this.bLocation.getBowserLocation() + fireballShootOffsetX;
}

BowserFire.prototype.draw = function () 
{
	this.removeFire();
		
	if(this.ZombieOnRight)
	{
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
	else
    {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x-1, this.y-1);
    }

}

BowserFire.prototype.moreFireAmmo = function()
{
	//This is taking 3 seconds before another BowserFire can be created. 
	setInterval(this.game.addEntity(new BowserFire(this.game)), 3000);
	
	for(var i in this.game.entities) {
		if(this.game.entities[i].constructor.name === "Bowser")
		{
			console.log("shooting from bowser");
			console.log("this.game.entities[i].x : "+ this.game.entities[i].x);
			console.log("this.x : " + this.x);
			this.x = this.game.entities[i].x;
			console.log("After setting to Bowser this.x : " + this.x);
		}
		
	}	
}

BowserFire.prototype.moreFireBallShooting = function()
{
	this.game.addEntity(new BowserFire(this.game));
	for(var i in this.game.entities) {
		console.log(this.game.entities[i]);
	}
 
	this.fireballAmmoReady = false;
}

/**
 * This method of the bowserfire will control the speed of the bowser fire shot. 
 */
BowserFire.prototype.update = function() 
{	
	
	
	if(this.ZombieOnRight)
	{
		//TODO: make this dynamic to the direction Bowser is pointing. 
		this.x += 2;
		if(this.x === bowserLocationX)
		{
			movingRight = false;
		}
	}
	else
	{
		//TODO: make this dynamic to the direction Bowser is pointing.
		this.x -= 2;
		if(this.x === bowserLocationX)
		{
			movingRight = true;
		}
	}
	Entity.prototype.update.call(this);
}

BowserFire.prototype.removeFire = function()
{
	for(var i = 0; i < this.game.entities.length; i++)
	{
		if(this.game.entities[i].x <= -50 || this.game.entities[i].x > 1024+50)
		{
			console.log("Removing from Game: " + this.game.entities[i].x);
			this.game.entities[i].removeFromWorld = true;
			this.moreFireAmmo();
		}
	}	
}

//End BowserFire

/**
 * This is the animation of shooting the bowser fire. 
 */
function BowserFireAnimation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

BowserFireAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    
    var xindex = 0;
    var yindex = 0;
    
	if(movingRight)
	{
		ctx.drawImage(AM.getAsset("./img/fireball.png"),
			    xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                this.frameWidth, this.frameHeight,
                x, y,
                this.frameWidth,
                this.frameHeight);        	
	}
  	
}


BowserFireAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

BowserFireAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
// End BowserFireAnimation



AM.queueDownload("./img/bowserToRight.png");
AM.queueDownload("./img/bowserToLeft.png");
AM.queueDownload("./img/fireball.png");
AM.queueDownload("./img/z1.png");
AM.queueDownload("./img/z2.png");
AM.queueDownload("./img/bowserLookingLeft.png");
AM.queueDownload("./img/bowserLookingRight.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("bowserWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    canvas.width = 1024;
    canvas.height = 491;

    background = new Image();
    background.src = "./img/bowser_background.png";

    background.onload = function()
    {
    	ctx.drawImage(background,0,0);
    }
    
    gameEngine.addEntity(new Zombie(gameEngine));
    gameEngine.addEntity(new Bowser(gameEngine));
    gameEngine.addEntity(new BowserFire(gameEngine));
    document.getElementById("SaveGame").onclick = function(){save(gameEngine);}
    document.getElementById("LoadGame").onclick = function(){load(gameEngine);}
    
   	//gameEngine.addEntity(new BowserLeft(gameEngine, AM.getAsset("./img/bowserToLeft.png")));
   	//gameEngine.addEntity(new BowserFireSpit(gameEngine, AM.getAsset("./img/fireball.png")));
});