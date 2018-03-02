var app = new Vue({
  el: '#game',
  data: {
    gameOn: false,
    score: 0,
    bubbles: [],
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00",
             "#FF00FF", "#00FFFF", "#FF4488", "#00CC66",
             "#6600CC", "#44FF88", "#4488FF", "#FFAA22"],
    timer: 0,
    interval: 0,
    bestTime: 0,
    bestTimeYet: false,
  },
  methods: {
    popBubble: function(index) {
      this.score++;
      this.bubbles.splice(index,1);
      if (this.bubbles.length == 0) {
        this.gameOn = false;
        clearInterval(this.interval);
        if (this.bestTimeYet == false) {
          this.bestTime = this.timer;
        }
        this.bestTime = Math.min(this.bestTime, this.timer);
        this.bestTimeYet = true;
        
      }
    },
    
    startGame: function() {
      this.bubbles = [];
      for (var i = 0; i < 10; i++) {
        var bubble = {};
        bubble.size = this.getRandom(10, 250);
        bubble.x = this.getRandom(0, $(window).width()-bubble.size);
        bubble.y = this.getRandom(0, $(window).height()-bubble.size);
        bubble.color = this.colors[this.getRandom(1, 12)];
        this.bubbles.push(bubble);
      }
      var startTime = new Date().getTime();
      var v = this;
      this.interval = setInterval(function () {
        v.timer = (((new Date().getTime())-startTime)/1000).toFixed(1);
      }, 100);
      this.gameOn = true;
    },

    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
    
    addComment: function() {
      if (!(this.number in this.comments)) {
	      Vue.set(app.comments, this.number, new Array);
      }
      var currentTime = Date();
      var d = new Date();
      var n = d.toLocaleString();
      this.comments[this.number].push({author:this.addedName,text:this.addedComment,date:n});
      this.addedName = '';
      this.addedComment = '';
    },
  }
});