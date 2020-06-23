var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var evtFired = false;
var clicks = 0;
var timer;


// Detect keypress and start game by triggering nextSequence

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    level = 1;
  }
})

// Detect mouseclick and start handleClick

$(".btn").click(handleClick);

// play sound for both nextSequence and handleClick

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// flash colours for handleClick

function flashColour(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}

//  generate colour, store colour in gamePattern, fade button colors, trigger playSound, waitForClick

function nextSequence() {
  clicks = 0;
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log("GamePattern nextSequence: " + gamePattern);
  waitForClick();
}

// store chosen colour in userClickedPattern, trigger playSound, trigger flashColour

function handleClick(event) {
  if (started === true) {
    clicks = 1;
    evtFired === true;
    clearTimeout(timer);
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    flashColour(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log("Click detected. Level: " + level);
    checkAnswer();
  }

  function checkAnswer() {
    // 1. check if userClickedPattern.length = gamePattern.length
    if (userClickedPattern.length === gamePattern.length) {
      // 2. If yes: compare userClickedPattern to gamePattern
      var userArray = userClickedPattern.toString();
      var gameArray = gamePattern.toString();
      if (userArray !== gameArray) {
        // If false: game over.
        gameOver();
      } else {
        //If true (arrays are equal): nextSequence
        userClickedPattern = [];
        clicks = 0;
        // start new sequence
        setTimeout(function() {
          nextSequence();
        }, 1500);
      }
    } else {
      // UserClickedPattern < gamePattern. Compare userClickedPattern[click-1] to gamePattern[click-1]
      if (userClickedPattern[clicks - 1] !== gamePattern[clicks - 1]) {
        gameOver();
      }else{
        waitForClick();
      }
    }
  }
}

// Stop game if user doesn't click within time

function waitForClick() {
  timer = setTimeout(function() {
    console.log("Game over because of timeout. Level: " + level);
    gameOver();
  }, 3000);
}


// Game Over

function gameOver() {
  $("h1").text("Game over! Refresh to play again.");
  var wrong = "wrong";
  playSound(wrong);
  userClickedPattern = [];
  level = 0;
  clicks = 0;
  var started = false;
}








// Let nextSequence show every color of the pattern so far (option for easier game):
// gamePattern.forEach((color, i) => {
//   setTimeout(() => {
//     $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
//     playSound(color);
//   }, i * 1000);
