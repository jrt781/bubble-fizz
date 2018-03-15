var app = new Vue({
  el: '#game',
  data: {
    gameOn: false,
    bubbles: [],
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00",
             "#FF00FF", "#00FFFF", "#FF4488", "#00CC66",
             "#6600CC", "#44FF88", "#4488FF", "#FFAA22"],
    randomWords: ['try', 'gorgeous', 'company', 'command', 'hydrant', 'nation', 'pigs', 'fallacious', 'salt', 'mailbox', 'military', 'brake', 'alike', 'object', 'high-pitched', 'rhythm', 'cycle', 'wistful', 'tart', 'vase', 'remain', 'committee', 'bat', 'divide', 'value', 'team', 'alive', 'church', 'cheat', 'play', 'carpenter', 'part', 'competition', 'coach', 'connection', 'nutty', 'clean', 'bright', 'knowledge', 'thinkable', 'new', 'knock', 'mindless', 'industrious', 'brick', 'typical', 'wing', 'meaty', 'late', 'route', 'sable', 'normal', 'aunt', 'dare', 'plantation', 'straight', 'ablaze', 'self', 'spot', 'pickle', 'damage', 'fail', 'wild', 'experience', 'recognise', 'poke', 'scarce', 'knot', 'sail', 'disgusted', 'digestion', 'warm', 'structure', 'understood', 'available', 'fork', 'itchy', 'languid', 'hurry', 'needless', 'misty', 'sign', 'tongue', 'hover', 'temper', 'motionless', 'bee', 'house', 'decision', 'cows', 'handy', 'reading', 'squeamish', 'admire', 'permissible', 'pear', 'birds', 'acid', 'possible', 'hesitant', 'adjoining', 'harm', 'slow', 'addition', 'coherent', 'fretful', 'bawdy', 'heartbreaking', 'chew', 'big', 'scrawny', 'sugar', 'back', 'push', 'toothsome', 'slope', 'slap', 'kick', 'fetch', 'mitten', 'jewel', 'pinch', 'consist', 'spiders', 'used', 'blood', 'regret', 'oafish', 'naive', 'wind', 'attack', 'rich', 'fang', 'uneven', 'wrench', 'vegetable', 'tight', 'ossified', 'songs', 'swim', 'orange', 'motion', 'supreme', 'like', 'disastrous', 'depressed', 'chubby', 'note', 'rock', 'marry', 'pour', 'smelly', 'explain', 'interfere', 'humor', 'deeply', 'rainstorm', 'crime', 'blushing', 'feeling', 'smoggy', 'move', 'wall', 'train', 'thoughtful', 'shrug', 'shaky', 'mushy', 'debonair', 'middle', 'abnormal', 'shop', 'hurried', 'forgetful', 'attack', 'defeated', 'shut', 'heavenly', 'remove', 'boorish', 'frequent', 'card', 'fine', 'orange', 'well-made', 'awesome', 'approval', 'street', 'dizzy', 'collar', 'yielding', 'bent', 'cushion', 'habitual', 'zonked', 'better', 'fit', 'hand', 'glue', 'nappy'],
    timerDisplay: 0,
    timer: 0,
    interval: 0,
    score: 0,
    gameDone: false,
    gameType: "bubbles",
    topten: [],
    url: 'http://localhost:3000', // 'http://localhost:3000', 'http://159.89.34.246:3000'
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
    
    showPopup: function(id) {
      if (id == "topten") {
        axios.get(this.url + "/api/scores/" + this.gameType).then(response => {
          this.topten = response.data;
          return true;
        }).catch(err => {
          console.log("error getting topten");
        });
      }
      var popup = document.getElementById(id);
      popup.style.display = "block";
      var backdrop = document.getElementById("backdrop");
      backdrop.style.display = "block";
      var exit = document.getElementById("exitPopup");
      exit.style.display = "block";
      exit.onclick = "closePopup(id);"
    },
    
    popBubble: function(index) {
      if (this.timer > 0) {
        var bubble = this.bubbles[index];
        var impactx = bubble.x + bubble.size/2.0;
        var impacty = bubble.y + bubble.size/2.0;
        var points = 250 / bubble.size + Math.sqrt(Math.pow(bubble.dx, 2) + Math.pow(bubble.dy, 2));
        this.score += points;
        this.score = parseFloat(this.score.toFixed(2));
        bubble.size = this.getRandom(25, 250);
        bubble.x = this.getRandom(0, $(window).width()-bubble.size);
        bubble.y = this.getRandom(0, $(window).height()-bubble.size);
        bubble.dx = 0;
        bubble.dy = 0;
        if (this.gameType == "fizz") {
          bubble.dx = this.getRandomFloat(-3, 3);
          bubble.dy = this.getRandomFloat(-3, 3);
        }
        if (this.gameType == "impact") {
          var screenWidth = $(window).width()-bubble.size;
          var screenHeight = $(window).height()-bubble.size;
          for (var i = 0; i < this.bubbles.length; i++) {
            this.bubbles[i].dx = screenWidth/(this.bubbles[i].x - impactx);
            this.bubbles[i].dy = screenHeight/(this.bubbles[i].y - impacty);
            if (this.bubbles[i].dx > 5) {
              this.bubbles[i].dx = 5;
            }
            if (this.bubbles[i].dx < -5) {
              this.bubbles[i].dx = -5;
            }
            if (this.bubbles[i].dy > 5) {
              this.bubbles[i].dy = 5;
            }
            if (this.bubbles[i].dy < -5) {
              this.bubbles[i].dy = -5;
            }
            this.bubbles[i].d2x = (this.bubbles[i].dx > 0) ? -0.1 : 0.1;
            this.bubbles[i].d2y = (this.bubbles[i].dy > 0) ? -0.1 : 0.1;
          }
        }
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
        bubble.dx = 0;
        bubble.dy = 0;
        bubble.d2x = 0;
        bubble.d2y = 0;
        if (this.gameType == "fizz") {
          bubble.dx = this.getRandomFloat(-3, 3);
          bubble.dy = this.getRandomFloat(-3, 3);
        }
        bubble.color = this.colors[this.getRandom(1, 12)];
        this.bubbles.push(bubble);
      }
      var startTime = new Date().getTime();
      var v = this;
      this.timer = 15;
      this.interval = setInterval(function () {
        // Timer
        v.timer -= 0.015;
        
        // End game: out of time
        if (v.timer <= 0) {
          v.timer = 0;
          clearInterval(v.interval);
          v.gameDone = true;
          
          // Check high scores
          axios.get(v.url + "/api/scores/" + v.gameType).then(response => {
            console.log("a");
            var topten = response.data;
            if (topten.length == 0 || topten[topten.length-1].score < v.score || topten.length < 10) {
              console.log("b");
              var playerName = "";
              var default1 = v.randomWords[v.getRandom(0,v.randomWords.length-1)];
              var default2 = v.randomWords[v.getRandom(0,v.randomWords.length-1)];
              while (playerName == "") {
                playerName = prompt("Congrats! You made the top ten! Please enter in a name to go on the scoreboard:", default1 + " " + default2);
              }
              axios.post(v.url + "/api/scores/" + v.gameType, {
              	name: playerName,
              	score: v.score
              }).then(response => {
              	return true;
              }).catch(err => {
                console.log("error2");
              });
            }
            return true;
          }).catch(err => {
            console.log("error1");
          });
        }
        
        // Update display
        v.timerDisplay = v.timer.toFixed(1);
        
        // Motion
        for (var i = 0; i < v.bubbles.length; i++) {
          var olddxsign = v.bubbles[i].dx/Math.abs(v.bubbles[i].dx);
          var olddysign = v.bubbles[i].dy/Math.abs(v.bubbles[i].dy);
          v.bubbles[i].dx += v.bubbles[i].d2x;
          v.bubbles[i].dy += v.bubbles[i].d2y;
          var newdxsign = v.bubbles[i].dx/Math.abs(v.bubbles[i].dx);
          var newdysign = v.bubbles[i].dy/Math.abs(v.bubbles[i].dy);
          if (olddxsign != newdxsign) {
            v.bubbles[i].dx = 0;
            v.bubbles[i].d2x = 0;
          }
          if (olddysign != newdysign) {
            v.bubbles[i].dy = 0;
            v.bubbles[i].d2y = 0;
          }
          
          v.bubbles[i].x += v.bubbles[i].dx;
          v.bubbles[i].y += v.bubbles[i].dy;
          if (v.bubbles[i].x > $(window).width()-v.bubbles[i].size) {
            v.bubbles[i].x = $(window).width()-v.bubbles[i].size-1;
            v.bubbles[i].dx *= -1;
            v.bubbles[i].d2x *= -1;
          }
          if (v.bubbles[i].x < 0) {
            v.bubbles[i].x = 1;
            v.bubbles[i].dx *= -1;
            v.bubbles[i].d2x *= -1;
          }
          if (v.bubbles[i].y > $(window).height()-v.bubbles[i].size) {
            v.bubbles[i].y = $(window).height()-v.bubbles[i].size-1;
            v.bubbles[i].dy *= -1;
            v.bubbles[i].d2y *= -1;
          }
          if (v.bubbles[i].y < 0) {
            v.bubbles[i].y = 1;
            v.bubbles[i].dy *= -1;
            v.bubbles[i].d2y *= -1;
          }
        }
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