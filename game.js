 var buttonColours = ["red", "blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern = [];
 var started = false;
 var level = 0;

 $(document).on("keypress",function(){
   
  if(!started){

    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
 });

 $(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    // alert(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    // var audio =  new Audio("sounds/" + userChosenColour + ".mp3");
    // audio.play();
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){

          setTimeout(function(){
            nextSequence();
          },1000);

      }
  }else{
    // $("body").css("background","red");
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}


 function nextSequence(){
  userClickedPattern = [];
  level ++;
   $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    // return (buttonColours[randomNumber]);
    var   randomChosenColour = buttonColours[randomNumber];
    // alert(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){

  var audio =  new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);

}


function startOver(){

  level = 0 ;
  gamePattern = [];
  started = false;
}


