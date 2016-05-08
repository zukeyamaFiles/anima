class OriMath {
  constructor(){

    this.num = 0;
  }
  sin(deg){
    return deg * (180/Math.PI);
  }

  cos(rad){
    return rad * (Math.PI/180);    
  }

  atan(y,x){
    return Math.atan2(y,x);
  }
}




class typing extends OriMath {
  constructor(){

$(".btn").click(function(e){

  e.stopPropagation();

  $("#overlay").addClass("fade");
})



    super();

  
  }

  set(){

    this.time = 0;

    this.tm = $(".t");

    this.timer = setInterval(()=> {
    this.time++;

    },1000);

    
    this.word = $(".word");
    this.label_ = ["css","transform","margin","padding","position","perspectiv","clippath","fontsize","top","display","rotate","fontweight","lingnheight"];
    
    this.label_ =  this.shuffle (this.label_);

    this.label_length = this.label_.length;


    this.wrap_ward(this.label_,this.num);

    this.addEvent();
  }


  action(){

    if(this.label_length -1 < this.num ){

      $("#overlay .btn").text("ステージクリア！");
      $(".time").addClass("visible");
      $(".clearTime").text(this.time);
      $("#overlay").removeClass("fade");

      return false;
    }

    this.wrap_ward(this.label_,this.num);

  }

  wrap_ward(el,num){
    var lang = "";

    this.target_lang = el[num].split("");
    this.lang_length = this.target_lang.length;
    this.target_lang.forEach(function(i,s){
      lang += i.replace(/(\S)/g, '<span class="textSplitLoad'+ s +'">$&</span>'); 

    });
     
    this.word.html(lang);
  }

  animationFrame(){
     window.requestAnimationFrame = (function(){
      return window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame   ||
        window.oRequestAnimationFrame   ||
        window.msRequestAnimationFrame    ||
        function(callback, element){
          window.setTimeout(callback, 1000 / 60);
        };
    })();
     
  }

  shuffle (array){


    var n = array.length, t, i;

    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }

    return array;

  }

  addEvent (){
    var i = 0;

  window.addEventListener("keydown", (evt) =>  {

      
      
      var code = this.target_lang[i].toUpperCase().charCodeAt(0);

          if(code == evt.keyCode) {
            $(".word").find("span").eq(i).css("color","red");
      
        i++;


      }

          if(this.lang_length -1 < i ) {

            $(".word").html("");
            this.num += 1;

        
            i = 0;
            this.action();

          }


  });


  }
}


new typing().set();

