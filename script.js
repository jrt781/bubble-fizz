var app = new Vue({
  el: '#game',
  data: {
    gameOn: false,
    score: 0,
    bubbles: [{x:300,y:100,size:'250',color:'red'},
    {x:700,y:200,size:'150',color:'green'},
    {x:600,y:200,size:'40',color:'blue'},
    {x:375,y:230,size:'97',color:'green'},
    {x:256,y:836,size:'150',color:'cyan'},
            ],
  },
  methods: {
    popBubble: function(index) {
      this.score++;
      this.bubbles.splice(index,1);
      if (this.bubbles.length == 0) {
        this.gameOn = false;
      }
    },
    
    startGame: function() {
      this.bubbles = [];
      for (var i = 0; i < 10; i++) {
        var bubble = {};
        bubble.x = this.getRandom(0, $(window).width());
        bubble.y = this.getRandom(0, $(window).height());
        bubble.size = this.getRandom(10, 250);
        bubble.color = "green";
        this.bubbles.push(bubble);
      }
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