var sword,swordimage1,si2;
var fruitgroup,fruit1,fruit2,fruit3,fruit4;
var score=0;
var microgroup,micro1,micro2;
var gameState = "play";
var restartimage;
var restart;

function preload(){
  swordimage=loadImage("sword.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  micro1=loadImage("alien1.png")
  micro2=loadImage("alien2.png")
  si2=loadImage("gameover.png")
  fruitsound=loadSound("knifeSwooshSound.mp3")
  microsound=loadSound("gameover.mp3")
  restartimage=loadImage("th.jfif")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  sword=createSprite(200,200,20,20)
  sword.addImage(swordimage);
  sword.scale= 0.5;
  sword.debug = false;
  sword.setCollider("rectangle",0,0,80,100)
  restart=createSprite(windowWidth/2,windowHeight/2+50)
  restart.visible=false;
    restart.addImage(restartimage);
    restart.scale=0.5;
  fruitgroup= new Group();
  microgroup= new Group();
}

function draw(){
background("lightgreen");
  
  if(gameState == "play"){
    
    sword.x=mouseX
  sword.y=mouseY
    
    spawnfruits();
  spawnmicro();
    
    if(sword.isTouching(fruitgroup)){
    fruitgroup.destroyEach();
    score++
      fruitsound.play();
  }
    if(sword.isTouching(microgroup)){
      gameState="end";
      microsound.play();
  }
}
  if(gameState =="end"){
    fruitgroup.destroyEach();
    fruitgroup.setVelocityEach(0);
    
    microgroup.destroyEach();
    microgroup.setVelocityEach(0);
    
    sword.x = windowWidth/2;
    sword.y = windowHeight/2;
    sword.addImage(si2);
    sword.scale = 1.4; 
    restart.visible=true;
    if(touches.length>0){
      gameState="play";
      sword.addImage(swordimage);
      score=0
      sword.scale=0.5;
      restart.visible=false;
    }
  }
  drawSprites();
  textSize(25);
  fill("black");
  text("score = "+score, windowWidth/2-50, 40);
}
function spawnfruits(){
  if(frameCount%50==0){
    var fruits=createSprite(windowWidth,random(20,390),20,20)
    
    var position = Math.round(random(1,2)) 
    
    switch(position){
        case 1: fruits.x = 0
        fruits.velocityX=4+score/4;
        break;
        case 2: fruits.x = 410
        fruits.velocityX=-4-score/4;
        break;
        default: break;
    }
    
    var rad = Math.round(random(1,4))
    switch(rad){
        case 1: fruits.addImage(fruit1);
        break;
        case 2: fruits.addImage(fruit2);
        break;
        case 3: fruits.addImage(fruit3);
        break;
        case 4: fruits.addImage(fruit4);
        break;
        default: break;
        
    }
    fruits.scale = 0.16;
    fruits.lifetime=500;
    //fruits.debug = true;
    fruitgroup.add(fruits);
  }
}
function spawnmicro(){
  if(frameCount%160==0){
    var micro=createSprite(windowWidth,random(10,390),20,20)
    
    var position = Math.round(random(1,2))
    switch(position){
        case 1: micro.x = 0
        micro.velocityX=10+score/10;
        break;
        case 2: micro.x = 410
        micro.velocityX=-4-score/10;
        break;
        default: break;
    }
    var rand = Math.round(random(1,2))
    switch(rand){
        case 1: micro.addImage(micro1);
        break;
        case 2: micro.addImage(micro2);
        break;
        default: break;
    }
    micro.scale = 0.8;
    micro.lifetime=500;
    //micro.debug = true;
    micro.setCollider("circle",0,0,24)
    microgroup.add(micro);
  }
}