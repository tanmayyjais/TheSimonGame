
var buttonCol = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level=0;
var gameStarted = false;
$(document).on("keydown", function(){
    if(!gameStarted)
    {
        $("#level-title").text("Level " + level);
        nextSeq();
        gameStarted = true;
    }
});

function nextSeq(){
    userPattern = [];
    level++;
    var ran = Math.floor(Math.random()*4);
    var ranColor = buttonCol[ran];
    gamePattern.push(ranColor);
    $("#" + ranColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(ranColor);
    animatePress(ranColor);
    $("#level-title").text("Level " + level);
}

function restart(){
    level=0;
    userPattern = [];
    gamePattern = [];
    gameStarted=false;
}

function checkPattern(currentLevel){
    if(gamePattern[currentLevel]  === userPattern[currentLevel])
    {
        console.log("Success!");
        if(userPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        restart();
    }
}

$(".btn").on("click", function(event){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);  
    playSound(userColor);
    animatePress(userColor);
    checkPattern(userPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout( function(){$("#"+currentColor).removeClass("pressed");}, 100);
}