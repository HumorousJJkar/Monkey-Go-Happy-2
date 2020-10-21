var bananaImage, obstacleImage, obstaclegroup, backgroundA,player_running, backImage, ground, player, bananaGroup, Banana, obstacle;

var score = 0;

function preload(){

backImage=loadImage("jungle.jpg");
player_running=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

bananaImage = loadImage("banana.png");

obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
 
    
  backgroundA = createSprite(200,180,400,400);
  ground = createSprite(400,380,800,10);
  ground.velocityX=-4
  ground.visible=false;
  
  bananaGroup = createGroup();
  
  obstacleGroup=createGroup();
  
  player = createSprite(100,370,50,50);
  player.addAnimation("playerrun",player_running);
  player.scale=0.1;
  player.debug=true;
  
  
  backgroundA.addImage("back", backImage);
  backgroundA.x = backgroundA.width/2; 
  
}

function draw() {
  
  backgroundA.velocityX = -3;  
  
  if(backgroundA.x<0){
    
    backgroundA.x = backgroundA.width/2; 
  
  }
  
  if(ground.x<0){
    
    ground.x = ground.width/2; 
  
  }
  
  if(keyDown("space") && player.y >= 329){
    
    player.velocityY=-18;
  }
    
  player.velocityY = player.velocityY + 0.8;
  
  if(obstacleGroup.isTouching(player)){
    player.scale=0.08;
  
  }
  
  if(bananaGroup.isTouching(player)){
    score = score + 2
    bananaGroup.destroyEach();
  }
    

  

    switch(score){
 case 10: player.scale=0.11;
     break;
 case 20: player.scale=0.12;
     break;
 case 30: player.scale=0.13;
    break;
 case 40: player.scale=0.14; 
    break;
 case 50: player.scale=0.15; 
     break;
 case 60: player.scale=0.25;
     break;
 default: break;
    }
    
   player.collide(ground);

  console.log(player.y);
  
  spawnBananas();
  
  spawnObstacles();
  
  drawSprites();
 
  
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score, 200, 50);

 }

function spawnBananas() {
  //write code here to spawn the Bananas
  if (World.frameCount % 80 === 0) {
    Banana = createSprite(400,320,40,10);
    Banana.y = random(120,200);
    Banana.addImage("bananaimg",bananaImage);
    Banana.scale=0.05
    Banana.velocityX = -5;
    
    Banana.debug=true;
     //assign lifetime to the variable
    Banana.lifetime = 134;
    
    //adjust the depth
    Banana.depth = player.depth;
    player.depth = player.depth + 1;
    
    
    //add each Banana to the group
    bananaGroup.add(Banana);
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite(400,342,10,40);
    obstacle.velocityX = -3;
    obstacle.addImage("stone", obstacleImage);
    
    
    obstacle.debug=true;
    //assign scale and lifetime to the obstacle           
    obstacle.scale=0.10;
    obstacle.lifetime = 140;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
  
}
  