var playing = false;
var score;
var trialsLeft;
var step;
var action; // use by setInterval function
var fruits = [
  "apple",
  "cherries",
  "gouava",
  "graphs",
  "mango",
  "orange",
  "peach",
  "pineapple",
];

$(function () {
  // click on start button
  $("#startreset").click(function () {
    // are we playing?
    if (playing == true) {
      // reload page
      location.reload();
    } else {
      // we are not playing
      playing = true; //    game initiated

      // set score to 0
      score = 0;
      $("#scorevalue").html(score);

      //   show trailsleft
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();

      // hide game over box
      $("#gameOver").hide();

      // change a button text to reset game
      $("#startreset").html("Reset Game");

      // start sending fruits
      startAction();
    }
  });
  $("#fruit1").mouseover(function () {
    score++;
    $("#scorevalue").html(score); // update score
    $("#slicesound")[0].play(); //  play sound
    // stop fruit
    clearInterval(action);

    // hide fruit
    $("#fruit1").hide("explode", 500); // slice fruit

    // send new fruit
    setTimeout(startAction, 500);
  });

  // slice a fruit
  // play sound
  // explode fruit
  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img src="heart.jpg" class="life">');
    }
  }
  // start sending fruits
  function startAction() {
    // generate a fruit
    $("#fruit1").show();
    chooseFruit(); //  choose a random fruit
    $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -50 });
    //  random position

    // generate a random step
    step = 1 + Math.round(5 * Math.random());
    // change step

    //  move fruit down by one step every 10ms
    action = setInterval(function () {
      // move fruit by one step
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      // check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //  check if we have trials left
        if (trialsLeft > 1) {
          // generate a fruit
          $("#fruit1").show();
          chooseFruit(); //  choose a random fruit
          $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -50 });
          //  random position

          // generate a random step
          step = 1 + Math.round(5 * Math.random()); // change step
          // reduce  trials  by one
          trialsLeft--;

          // populate trialsleft box
          addHearts();
        } else {
          //  game over
          playing = false; //  we are not playing anymore
          $("#startreset").html("Start Game");
          // change button to Start Game
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p> <p>Your score is " + score + "</p>"
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }
  //  generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(7 * Math.random())] + ".jpg"
    );
  }
  //  stop  dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
