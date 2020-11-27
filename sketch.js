var ball, ball_position;
var database;
var ball_position;

function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball_position=database.ref("ball/position");
    ball_position.on("value",readposition,showError);
}

function draw(){
    background("white");
    if(ball_position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
        
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x':ball_position.x+ x,
        'y':ball_position.y+ y
    }); 
}

function readposition(data){
ball_position=data.val();
console.log(ball_position);
ball.x=ball_position.x;
ball.y=ball_position.y;
}
function showError(){
console.log('error in writing the database');
}
