class OriMath {
  constructor(){

    
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




class typing {
  constructor(){
    
    $(".restart").on("click",() => {

      this.restart();


    });

  }

  set(){
    this.Timearr = 0;
    this.miss = 0;
  this.num = 0;
  $(".btn").click((e) => {
    e.stopPropagation();
    this.Time("timerTxt",2);
    this.sound = this.MP();
    this.PlayBGM(this.sound.BGM);
    $("#overlay").addClass("fade");
    this.addEvent();
  })
    this.word = $(".word");
    this.label_ = ["css","daiya","ryby","scala","java","c"];
    this.label_ =  this.shuffle (this.label_);
    this.label_length = this.label_.length;
    this.wrap_ward(this.label_,this.num);
  }

  restart(){
    this.num = 0;
    this.PlayBGM(this.sound.BGM);
    $("#overlay").addClass("fade");
    this.Time("timerTxt",2);
    this.addEvent();
    this.word = $(".word");
    this.label_ = ["css","daiya","ryby","scala","java","c"];
    this.label_ =  this.shuffle (this.label_);
    this.label_length = this.label_.length;
    this.wrap_ward(this.label_,this.num);   
  }

  action(){
    if(this.label_length -1 < this.num ){
      this.GameClear();
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
    $(window).on("keydown",(evt) => {

      var code = this.target_lang[i].toUpperCase().charCodeAt(0);
      if(code == evt.keyCode) {
        this.PlayBtnBGM(this.sound.btn);
        $(".word").find("span").eq(i).css("color","red");
        i++;
      } else {
          this.PlayBtnBGM(this.sound.can);
          this.miss++;
      }
      if(this.lang_length -1 < i ) {
        $(".word").html("");
        this.num += 1;
        i = 0;
        this.Timearr += this.overTime;
        this.overTime = 5;
        this.action();
      }
    })
  }

  MP(){
    var MP4 = {
      BGM: new Audio("./audio/test.mp3"),
      btn: "./audio/btn.mp3",
      can: "./audio/can.mp3"
    };
    return MP4;
  }

  PlayBGM(val){
    val.play();
  }

  PlayBtnBGM(val){
    var btn = new Audio(val);
    btn.play();
    btn = null;
  }

  Time(el,dobble){
    var timer,s,update,overTime;

    this.overTime = 5;
    s = Date.now();
    this.Timertxt = document.getElementById(el);
    this.update = (dobble) => {
      this.Gametimer = setInterval(() => {
      this.overTime = this.overTime - 0.01;
        this.Timertxt.textContent = this.overTime.toFixed(dobble);
        if(this.Timertxt.textContent <= 0 ) {
          clearInterval(this.Gametimer);
          this.GemeOverTime();
        } 
      },10);
    }
    this.update(dobble);
  }

  parse(val){
    return val.match(/(.*)\.\d/)[1];
  }

  GemeOverTime(){
      $("#overlay .btn").text("タイムオーバー");
      this.removeGame();
      $(".restart").show();
      $("#overlay").removeClass("fade");
  }

  removeGame(){
    this.sound.BGM.pause();
    this.sound.BGM.currentTime = 0;
    $(window).off("keydown");
  }

  GameClear(){
      this.removeGame();
      clearInterval(this.Gametimer);
      $("#overlay .btn").text("ステージクリア！");
      $(".time").addClass("visible");
      $("#overlay").removeClass("fade");
      var EvaluationTxt = this.Evaluation(this.Timearr);
      $(".restart").text(EvaluationTxt　+　"<br>ミス"　+　this.miss + "回");
      $(".restart").show();
  }


  Evaluation(val){
    var _val = Math.floor(val/this.label_.length)
    var EvaluationTxt;
  switch(_val){
    case 5:
      EvaluationTxt = "あなたはとても優秀ですね"
      break;
    case 4:
      EvaluationTxt = "優秀ですね"
      break;
    case 3:
      EvaluationTxt = "普通ですね"
      break;
    case 2:
      EvaluationTxt = "遅い優秀ですね"
      break;
    default:
      EvaluationTxt = "ダメダメですね"
      break;
  }


  return EvaluationTxt;

  }

}

new typing().set();
