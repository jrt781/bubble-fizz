var app = new Vue({
  el: '#game',
  data: {
    gameOn: false,
    bubbles: [],
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00",
             "#FF00FF", "#00FFFF", "#FF4488", "#00CC66",
             "#6600CC", "#44FF88", "#4488FF", "#FFAA22"],
    timer: 0,
    interval: 0,
    score: 0,
    bestScore: 0,
    scoreYet: false,
    gameDone: false,
    buttonBackgroundColor: "black",
    buttonTextColor: "white",
    tooltipBackgroundColor: "black",
    tooltipTextColor: "white",
  },
  created() {
    window.addEventListener('keyup', this.backToHomeScreen);
    
    var random_number = Math.floor(Math.random() * this.colors.length);
    var random_color = this.colors[random_number];
    this.buttonBackgroundColor = random_color;
    if (random_number % 2 == 0) {
      this.buttonTextColor = "white";
    } else {
      this.buttonTextColor = "black";
    }
    
    var random_number2 = Math.floor(Math.random() * this.colors.length);
    while (random_number2 == random_number) {
      random_number2 = Math.floor(Math.random() * this.colors.length);
    }
    var random_color2 = this.colors[random_number2];
    this.tooltipBackgroundColor = random_color2;
    if (random_number2 % 2 == 0) {
      this.tooltipTextColor = "white";
    } else {
      this.tooltipTextColor = "black";
    }
    
  },
  methods: {
    backToHomeScreen: function(event) {
      if (event.which == 32 && this.gameDone) {
        this.gameDone = false;
        this.gameOn = false;
        
        var random_number = Math.floor(Math.random() * this.colors.length);
        var random_color = this.colors[random_number];
        this.buttonBackgroundColor = random_color;
        if (random_number % 2 == 0) {
          this.buttonTextColor = "white";
        } else {
          this.buttonTextColor = "black";
        }
        
        var random_number2 = Math.floor(Math.random() * this.colors.length);
        while (random_number2 == random_number) {
          random_number2 = Math.floor(Math.random() * this.colors.length);
        }
        var random_color2 = this.colors[random_number2];
        this.tooltipBackgroundColor = random_color2;
        if (random_number2 % 2 == 0) {
          this.tooltipTextColor = "white";
        } else {
          this.tooltipTextColor = "black";
        }
      }
    },
    
    popBubble: function(index) {
      if (this.timer > 0) {
        var bubble = this.bubbles[index];
        var points = 250 / bubble.size;
        this.score += points;
        this.score = parseFloat(this.score.toFixed(2));
        bubble.size = this.getRandom(25, 250);
        bubble.x = this.getRandom(0, $(window).width()-bubble.size);
        bubble.y = this.getRandom(0, $(window).height()-bubble.size);
        bubble.color = this.colors[this.getRandom(1, 12)];
      }
    },
    
    startGame: function() {
      this.bubbles = [];
      this.score = 0;
      for (var i = 0; i < 10; i++) {
        var bubble = {};
        bubble.size = this.getRandom(25, 250);
        bubble.x = this.getRandom(0, $(window).width()-bubble.size);
        bubble.y = this.getRandom(0, $(window).height()-bubble.size);
        bubble.color = this.colors[this.getRandom(1, 12)];
        this.bubbles.push(bubble);
      }
      var startTime = new Date().getTime();
      var v = this;
      this.timer = 15;
      this.interval = setInterval(function () {
        v.timer -= 0.1;
        if (v.timer <= 0) {
          v.timer = 0;
          clearInterval(v.interval);
          v.bestScore = Math.max(v.bestScore, v.score);
          v.scoreYet = true;
          v.gameDone = true;
        }
        v.timer = v.timer.toFixed(1);
      }, 100);
      this.gameOn = true;
    },

    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
  }
});