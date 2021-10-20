var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(width/2, height/2,width,height);
  tower.addImage("tower",towerImg);
  tower.scale = 3;
  tower.velocityY = 1;

  ghost = createSprite(200,500,10,10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  //spookySound.loop()
  
  
}

function draw() {
  background(0);

  if(gameState === "play" ){

    if(tower.y > 400){
        tower.y = 300
      }

      if(keyDown("up")){
        ghost.velocityY = -3;
      }

      if(keyDown("left")){
        ghost.x-=25
      }

      if(keyDown("right")){
        ghost.x+=25
      }

    ghost.velocityY = ghost.velocityY + 0.3;

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > height){
      gameState = "end"
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    
    spawnDoors();

    drawSprites();
  }

  if(gameState === "end"){
    fill("yellow")
    textSize(50)
    text("GameOver",width/2-200,height/2)

  }
}


function spawnDoors(){
  if(frameCount % 250 == 0){
    var Door = createSprite(Math.round(random(120,width-100)),-50)
    Door.addImage(doorImg)
    Door.velocityY = 1;
    
    ghost.depth = Door.depth
    ghost.depth+=1

    Door.lifetime = height/1;

    doorsGroup.add(Door)

    var climber = createSprite(Door.x,10)
    climber.addImage(climberImg)
    climber.velocityY = 1;
    climber.lifetime = height/1;
    climbersGroup.add(climber)

    var invisibleBlock = createSprite(Door.x,15,climber.width,1)
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = height/1;
    invisibleBlockGroup.add(invisibleBlock)
  }
}