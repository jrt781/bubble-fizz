var app = new Vue({
  el: '#game',
  data: {
    gameOn: false,
    bubbles: [],
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00",
             "#FF00FF", "#00FFFF", "#FF4488", "#00CC66",
             "#6600CC", "#44FF88", "#4488FF", "#FFAA22"],
    timerDisplay: 0,
    timer: 0,
    interval: 0,
    score: 0,
    bestScore: 0,
    gameDone: false,
    gameType: "bubbles"
  },
  
  created() {
    window.addEventListener('keyup', this.backToHomeScreen)
  },
  
  methods: {
    backToHomeScreen: function(event) {
      if (event.which == 32 && this.gameDone) {
        this.gameDone = false;
        this.gameOn = false;
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
        bubble.dx = this.getRandomFloat(-5, 5);
        bubble.dy = this.getRandomFloat(-5, 5);
        bubble.color = this.colors[this.getRandom(1, 12)];
      }
    },
    
    startBubbles: function(gameType) {
      this.gameType = gameType;
      this.bubbles = [];
      this.score = 0;
      for (var i = 0; i < 10; i++) {
        var bubble = {};
        bubble.size = this.getRandom(25, 250);
        bubble.x = this.getRandom(0, $(window).width()-bubble.size);
        bubble.y = this.getRandom(0, $(window).height()-bubble.size);
        bubble.dx = this.getRandomFloat(-3, 3);
        bubble.dy = this.getRandomFloat(-3, 3);
        bubble.color = this.colors[this.getRandom(1, 12)];
        this.bubbles.push(bubble);
      }
      var startTime = new Date().getTime();
      var v = this;
      this.timer = 15;
      this.interval = setInterval(function () {
        v.timer -= 0.015;
        
        if (v.gameType == "fizz") {
          for (var i = 0; i < v.bubbles.length; i++) {
            v.bubbles[i].x += v.bubbles[i].dx;
            v.bubbles[i].y += v.bubbles[i].dy;
            if (v.bubbles[i].x > $(window).width()-bubble.size) {
              v.bubbles[i].dx *= -1;
            }
            if (v.bubbles[i].x < 0) {
              v.bubbles[i].dx *= -1;
            }
            if (v.bubbles[i].y > $(window).height()-bubble.size) {
              v.bubbles[i].dy *= -1;
            }
            if (v.bubbles[i].y < 0) {
              v.bubbles[i].dy *= -1;
            }
          }
        }
        
        if (v.timer <= 0) {
          v.timer = 0;
          clearInterval(v.interval);
          v.bestScore = Math.max(v.bestScore, v.score);
          v.gameDone = true;
        }
        v.timerDisplay = v.timer.toFixed(1);
      }, 10);
      this.gameOn = true;
    },

    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },

    getRandomFloat: function(min, max) {
      return Math.random() * (max - min + 1) + min; //The maximum and minimum are inclusive 
    },
  }
});