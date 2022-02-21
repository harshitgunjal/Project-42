var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaimg
var END =0;
var PLAY =1;
var gameState = PLAY;
var stone,stoneimg,gameover,gameoverimg,restart,restartimg;
var bananagroup,stonegroup;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaimg=loadImage("banana.png");
stoneimg=loadImage("stone.png");
gameoverimg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  bananagroup=new Group();
  stonegroup=new Group();
  gameover=createSprite(400,200);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  gameover.visible=false;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    backgr.velocityX=-4;
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  

    if (bananagroup.isTouching(player)){
      score=score+1;
      
        }
      spawnbananas();
      spawnstone();
      if(stonegroup.isTouching(player)){
        gameState=END;
      }
  }
  if(gameState===END){
    ground.velocityX=0;
    backgr.velocityX=0;
    player.velocityY=0;

    bananagroup.setVelocityXEach(0);
    stonegroup.setVelocityXEach(0);
    gameover.visible=true;
    bananagroup.setLifetimeEach(-1)
    stonegroup.setLifetimeEach(-1)

  }
 
  player.collide(ground);

  drawSprites();
  textSize(20);
  fill("white");
  text("Score: "+score,500,30);
}
function spawnbananas(){
  if(frameCount%80===0){
    banana=createSprite(600,150,50,50);
banana.addImage(bananaimg);
banana.y=Math.round(random(60,120));
banana.velocityX=-5,
banana.scale=0.09;
banana.lifetime=200;
bananagroup.add(banana);
  }
}
function spawnstone(){
  if(frameCount%150===0){
    stone=createSprite(600,340,50,50);
stone.addImage(stoneimg);
stone.scale=0.3;
stone.velocityX=-5;
stone.lifetime=200;
stonegroup.add(stone);
  }
}