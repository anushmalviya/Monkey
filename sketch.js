
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var score = 0;
var ground,invisible;
var survivalTime = 0;
var gameState
var PLAY,END;
var end;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  //end = loadImage("sprite_0.png")
 
}



function setup() {
  createCanvas(500,500)
  
  PLAY = 0;
  gameState = PLAY;
  END = 0;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //creating monkey
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(259,352,900,10)
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
   invisible = createSprite(4,352,900,10)
  invisible.x = ground.width/2;
  
}


function draw() {
  background(255)
  
  if(gameState === PLAY){
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if (invisible.x < 0){
      invisible.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
      monkey.velocityY = -12;
    }
  

  score = Math.round(frameCount/3)
  survivalTime = Math.ceil(frameCount/frameRate());
  stroke("black");
  textSize(20);
  fill("black")
  text("Survival Time :" + survivalTime,10,50)
  
  ground.velocityX = -(5 + 2 * score / 100);
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
  }
  
  if(monkey.isTouching(obstacleGroup)){
    GameState = END;
  }
  else if(gameState === END){
    ground.velocityX = 0;
    invisible.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
   Food();
  Obstacle(); 
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.7;
  
  monkey.collide(ground);
  
  
  drawSprites();
  text("SCORE :",200,23)
}
function Food(){
  
  if(frameCount % 80 === 0){
    var banana = createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -(5 + 2 *score/100)
    banana.y = Math.round(random(120,200));
   banana.scale = 0.1;
   
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }
}
function Obstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(500,332,23,32);
    obstacle.velocityX = -(5 + 2 *score/100)
    obstacle.addImage("obstacle",obstacleImage);
     obstacle.scale = 0.11;
    obstacleGroup.setLifetimeEach = 100;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200);
  }  
}






