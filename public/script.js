var app = new Vue({
  el: '#game',
  data: {
    gameOn: false,
    bubbles: [],
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00",
             "#FF00FF", "#00FFFF", "#FF4488", "#00CC66",
             "#6600CC", "#44FF88", "#4488FF", "#FFAA22"],
    randomAdjectives: ['aback', 'abhorrent', 'abject', 'able', 'abrasive', 'absorbed', 'acceptable', 'accessible', 'addicted', 'adorable', 'adventurous', 'ajar', 'apathetic', 'auspicious', 'aware', 'awful', 'belligerent', 'beneficial', 'blushing', 'breakable', 'bright', 'calculating', 'calm', 'ceaseless', 'charming', 'cheap', 'clever', 'cloistered', 'closed', 'coherent', 'common', 'cool', 'cooperative', 'crabby', 'crazy', 'curly', 'cut', 'cute', 'damaged', 'damaging', 'dazzling', 'deadpan', 'dear', 'defeated', 'delicious', 'deranged', 'determined', 'direful', 'disillusioned', 'drab', 'dusty', 'educated', 'elastic', 'elated', 'elite', 'empty', 'entertaining', 'equal', 'exuberant', 'fair', 'faithful', 'far-flung', 'faulty', 'festive', 'fine', 'five', 'fixed', 'flagrant', 'fluffy', 'foamy', 'foregoing', 'four', 'free', 'fretful', 'future', 'futuristic', 'gamy', 'gaudy', 'gleaming', 'groovy', 'grotesque', 'gullible', 'hallowed', 'handsomely', 'harsh', 'heartbreaking', 'helpless', 'high', 'hissing', 'hospitable', 'hot', 'humdrum', 'hurried', 'ill', 'illustrious', 'immense', 'important', 'impossible', 'industrious', 'innate', 'internal', 'jazzy', 'jealous', 'juicy', 'jumbled', 'kaput', 'kindhearted', 'lackadaisical', 'lame', 'lamentable', 'languid', 'lavish', 'lethal', 'lovely', 'lucky', 'luxuriant', 'majestic', 'makeshift', 'mammoth', 'maniacal', 'married', 'marvelous', 'meek', 'melodic', 'melted', 'miscreant', 'mixed', 'modern', 'motionless', 'mountainous', 'muddled', 'mundane', 'mysterious', 'narrow', 'near', 'needless', 'new', 'noiseless', 'noxious', 'opposite', 'organic', 'painful', 'paltry', 'penitent', 'perpetual', 'phobic', 'piquant', 'plain', 'plastic', 'powerful', 'precious', 'present', 'prickly', 'private', 'protective', 'purple', 'quiet', 'rabid', 'racial', 'rambunctious', 'rebel', 'regular', 'resolute', 'responsible', 'round', 'sable', 'satisfying', 'scandalous', 'sedate', 'separate', 'shaggy', 'shiny', 'shut', 'sick', 'simple', 'simplistic', 'sincere', 'sleepy', 'small', 'smelly', 'smiling', 'snobbish', 'somber', 'sparkling', 'spooky', 'spotless', 'spotted', 'squalid', 'square', 'squeamish', 'stale', 'steep', 'stereotyped', 'stiff', 'stimulating', 'sudden', 'talented', 'tangy', 'tasteful', 'tasteless', 'tearful', 'teeny', 'teeny-tiny', 'tense', 'terrific', 'tested', 'tight', 'tough', 'tranquil', 'trashy', 'tricky', 'truculent', 'two', 'typical', 'ugly', 'unable', 'unarmed', 'uninterested', 'unknown', 'unsightly', 'unwritten', 'uppity', 'upset', 'uptight', 'utopian', 'uttermost', 'vague', 'vast', 'verdant', 'victorious', 'vigorous', 'violet', 'voiceless', 'watery', 'wealthy', 'weary', 'whispering', 'wholesale', 'willing', 'wise', 'wonderful', 'yellow', 'zippy'],
    randomNouns: ['actor', 'amount', 'ants', 'arch', 'army', 'attraction', 'aunt', 'bat', 'bear', 'beds', 'bee', 'believe', 'bird', 'birds', 'birth', 'blood', 'blow', 'bone', 'book', 'boundary', 'box', 'boy', 'brake', 'bucket', 'bushes', 'button', 'cakes', 'caption', 'carpenter', 'carriage', 'cart', 'cellar', 'cheese', 'chess', 'chickens', 'children', 'circle', 'coal', 'coat', 'cobweb', 'color', 'committee', 'competition', 'connection', 'copper', 'country', 'cover', 'crate', 'crayon', 'crime', 'crowd', 'cushion', 'daughter', 'day', 'degree', 'dime', 'dirt', 'discovery', 'dog', 'doll', 'dolls', 'drink', 'driving', 'earthquake', 'effect', 'elbow', 'error', 'example', 'existence', 'expert', 'fang', 'feeling', 'finger', 'finger', 'fireman', 'flock', 'flower', 'fly', 'food', 'fork', 'frame', 'friction', 'friend', 'front', 'fuel', 'gate', 'glove', 'government', 'grade', 'grandfather', 'grass', 'growth', 'haircut', 'hand', 'harmony', 'hate', 'head', 'history', 'holiday', 'hope', 'horse', 'hospital', 'hour', 'houses', 'hydrant', 'income', 'instrument', 'iron', 'kettle', 'kiss', 'knee', 'ladybug', 'lake', 'lamp', 'language', 'level', 'lock', 'lumber', 'magic', 'marble', 'mask', 'meal', 'mice', 'mind', 'minister', 'minute', 'mist', 'mom', 'monkey', 'month', 'motion', 'muscle', 'name', 'needle', 'noise', 'north', 'nose', 'oatmeal', 'ocean', 'orange', 'order', 'oven', 'pancake', 'partner', 'passenger', 'pear', 'pencil', 'pickle', 'pig', 'pigs', 'place', 'plane', 'plants', 'plastic', 'plate', 'point', 'poison', 'pollution', 'position', 'power', 'price', 'property', 'pull', 'quarter', 'queen', 'quiet', 'railway', 'rain', 'range', 'ray', 'reading', 'representative', 'rest', 'rice', 'robin', 'rule', 'run', 'scale', 'scarf', 'scent', 'seat', 'self', 'sheep', 'shelf', 'shop', 'sidewalk', 'silk', 'sink', 'sisters', 'skin', 'sleep', 'smell', 'smoke', 'sneeze', 'soap', 'songs', 'soup', 'space', 'spiders', 'sponge', 'spoon', 'spot', 'square', 'stage', 'steel', 'stem', 'sticks', 'stomach', 'stove', 'stream', 'street', 'suit', 'tank', 'teaching', 'tendency', 'test', 'things', 'thrill', 'thumb', 'touch', 'toy', 'trade', 'tramp', 'transport', 'treatment', 'tree', 'trousers', 'truck', 'tub', 'twig', 'twist', 'underwear', 'vacation', 'vase', 'vegetable', 'vein', 'vest', 'volleyball', 'wax', 'wheel', 'wind', 'winter', 'wood', 'word', 'work', 'wrench', 'writing', 'yak', 'yarn', 'zebra'],
    timerDisplay: 0,
    timer: 0,
    interval: 0,
    score: 0,
    gameDone: false,
    gameType: "bubbles",
    topten: [],
    url: 'http://159.89.34.246:3001', // 'http://localhost:3001', 'http://159.89.34.246:3001'
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
              var defaultAdjective = v.randomAdjectives[v.getRandom(0,v.randomAdjectives.length-1)];
              var defaultNoun = v.randomNouns[v.getRandom(0,v.randomNouns.length-1)];
              while (playerName == "") {
                playerName = prompt("Congrats! You made the top ten! Please enter in a name to go on the scoreboard:", defaultAdjective + " " + defaultNoun);
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