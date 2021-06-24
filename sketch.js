var ball;
var database;
var position;

function setup(){
    database= firebase.database()

    createCanvas(500,500)
    ball = createSprite(250,250,10,10)
    ball.shapeColor="red";
    var ballpos=database.ref('ball/position')
    ballpos.on("value", readPosition,showError)
    

}

function draw(){
    background("white")
if(position!==undefined){
 if(keyDown("left")){
     changePosition(-1,0)
 }
 else if(keyDown("right")){
     changePosition(1,0)
 }
 else if(keyDown("up")){
     changePosition(0,-1)
 }
 else if(keyDown("down")){
     changePosition(0,1)
 }

 drawSprites();
}
}

function changePosition(x,y){
 database.ref('ball/position').set({
     'x':position.x + x,
     'y':position.y + y
 })
}

function readPosition(data){
 position= data.val()
 ball.x= position.x;
 ball.y= position.y;
}

function showError(){
    console.log("error in writing to the database")
}
