var app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
    ratings: {},
  },
  created: function() {
    this.xkcd();
  },
  computed: {
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    },
    averageRating: function() {
      if (!(this.number in this.ratings))
        return "Not yet rated. Be the first!";
      var average = this.ratings[this.number].sum/this.ratings[this.number].number;
      var roundedAverage = average.toFixed(1);
      return roundedAverage;
    }
  },
  watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
	      this.max = value;
      } else {
	      this.xkcd();
      }
    },
  },
  methods: {
    xkcd: function() {
      this.loading = true;
      fetch('https://xkcd.now.sh/' + this.number).then(response => {
        return response.json();
      }).then(json => {
        this.current = json;
        this.loading = false;
        this.number = json.num;
        console.log(json);
        return true;
      }).catch(err => {
        this.number = this.max;
      });
    },
    previousComic: function() {
      this.number = this.current.num - 1;
    },
    nextComic: function() {
      this.number = this.current.num + 1;
    },
    firstComic: function() {
      this.number = 1;
    },
    lastComic: function() {
      this.number = this.max;
    },
    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
    randomComic: function() {
      this.number = this.getRandom(1, this.max);
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
    setRating: function(rating){
      if (!(this.number in this.ratings))
        Vue.set(this.ratings,this.number,{sum:0,number:0});
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].number += 1;
    }
  }
});

Vue.component('star-rating', VueStarRating.default);