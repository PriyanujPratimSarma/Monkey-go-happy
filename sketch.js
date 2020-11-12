var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var score;
var play = 1;
var over = 0;
var gameState = play;
var cImage;
var gameover;
var gImg;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  cImage = loadAnimation("sprite_0.png");
  gImg = loadImage("gameoverimg.jpg");
 
}



function setup() {
  createCanvas(600, 400);
  gameover = createSprite(300, 200);
  gameover.addImage(gImg);
  gameover.visible = false;
  gameover.scale = 0.5;
  
  ground = createSprite(300, 360, 600, 16);

  monkey = createSprite(80, 325, 20, 20);
  monkey.addAnimation("runner",monkey_running);
  monkey.addAnimation("collided",cImage);
  monkey.scale = 0.1;
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  score = 0;
}



function draw() {
  background(0, 150, 180);
  ground.shapeColor = ("brown");
  fill(0, 255, 50);
  rect(0, 368, 600, 32);
  if(keyDown("space")&&monkey.y>321){
    monkey.velocityY = -14;
  }
  monkey.velocityY = monkey.velocityY+1;
  monkey.collide(ground);
  spawnObstacles();
  obstacleGroup.depth = ground.depth;
  ground.depth = obstacleGroup.depth+1;
  FoodGroup.depth = gameover.depth;
  gameover.depth = FoodGroup.depth+1;
  
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }
  spawnBananas();
  if(monkey.isTouching(obstacleGroup)){
    gameState = over;
  }
  
  if(gameState === over){
    FoodGroup.setVelocityEach(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collided",cImage);
    monkey.velocityY = 0;
    gameover.visible = true;
  }
  drawSprites();
  textSize(35);
  text("Score: "+ score, 420, 80);
  
}
function spawnBananas(){
  if(frameCount%70 === 0){
    banana = createSprite(625,random(200, 280), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -(10+score/100);
    banana.lifetime = 62;
    FoodGroup.add(banana);
    banana.debug = true;
    banana.setCollider("circle", 0, 0, 2);
  }
 }

function spawnObstacles(){
  if(frameCount%60===0){
    obstacle = createSprite(620, 335, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(10+score);
    obstacle.lifetime = 64;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 20);
  }
}



