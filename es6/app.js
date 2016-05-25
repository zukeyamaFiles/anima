

class typing {

  constructor(){
    if(!this.UA("chrome")) alert("googleChromeを推奨します！")
    this.Timearr = 0;
    this.miss = 0;
    this.num = 0;
    this.sec = 8;
    this.langCount = 0;
    this.sound = this.MP();
    this.win = $(window);
    this.word = $(".word");
    this.word_label = $(".word_label");
    this.overlay = $("#overlay");
    this.start_btn = $(".btn",this.overlay);
    this.innerEl = $(".inner",this.overlay).find("p");
    this.restart = $(".restart");
    this.timeTx = $(".time");
    this.evaluation = $(".evaluation");
    this.missTxt = $(".miss");
    this.timeScore = $(".timeScore");
    this.stageinner = $(".stageinner");
    this.addEvent();
  }

  set(a,b){
    this.PlayBGM(this.sound.BGM);
    this.label_ = b;
    this.label_ =  this.shuffle(this.label_);
    this.label_length = this.label_.length;
    this.word_label.html(this.label_[this.num]);
    this.wrap_ward(a,this.label_[this.num]);
    var typeaction = this.typeAction.bind(this);
    this.win.on("keydown",typeaction);
  }

  restartAction(){
    this.set(this.json,this.jsonKeys);
  }

  action(){
    if(this.label_length -1 < this.num ){
      this.stageinner.hide();
      this.GameClear();
      return false;
    }
    this.wrap_ward(this.json,this.label_[this.num]);
  }

  wrap_ward(el,num){
    var lang = "";
    this.target_lang = el[num].split("");
    this.lang_length = this.target_lang.length;
    this.target_lang.forEach((i,s) => {
      lang += this.replaceWrap(i,s); 
    });
    this.word.html(lang);
    this.word_label.html(num);
  }

  replaceWrap(el,num){
    return el.replace(/(\S)/g, '<span class="textSplitLoad'+ num +'">$&</span>');
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
    this.restart.on("click",(e) => {
      this.langCount = 0;
      this.num = 0;
      this.Timearr = 0;
      this.miss = 0;
      this.stageinner.show();
      this.restartAction();
      this.startAction(e,this.restart);
      this.overlay.on("webkitTransitionEnd transitionend",(e) => {
        this.innerEl.not(".restart").each(function(){
          $(this).text("");
        })

        this.overlay.off("webkitTransitionEnd transitionend");
      });
    });
    this.start_btn.on("click",(e) => {
      this.startAction(e,this.start_btn);
    });

    this.overlay.on("webkitTransitionEnd transitionend",(e) => {
      this.start_btn.hide();
      this.overlay.off("webkitTransitionEnd transitionend");
    });

  }

  typeAction(evt){
      var code = this.char(this.langCount);
      if(code == evt.keyCode) {
        this.PlayBtnBGM(this.sound.btn);
        this.word.find("span").eq(this.langCount).addClass("addColor");
        this.langCount++;
      } else {
          this.PlayBtnBGM(this.sound.can);
          this.miss++;
      }
      if(this.lang_length -1 < this.langCount ) {
        this.word.html("");
        this.num += 1;
        this.langCount = 0;
        this.Timearr += this.overTime;
        this.overTime = this.sec;
        this.action();
      }
  }

  char(ca){
    return this.target_lang[ca].toUpperCase().charCodeAt(0);
  }

  startAction(e,btn){
      e.stopPropagation();
      this.score = Date.now();
      this.PlayBtnBGM(this.MP().start);
      btn.addClass("start");
      setTimeout(() => {
      this.overlay.addClass("fade");
      this.Time("timerTxt",2);
      },3000);
  }

  MP(){
    var MP4 = {
      BGM: new Audio("./audio/BGM.mp3"),
      btn: "./audio/btn.mp3",
      can: "./audio/can.mp3",
      start: "./audio/start.mp3"
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
    var timer,
        s,
        update,
        overTime;

    this.overTime = this.sec;
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
      this.start_btn.text("タイムオーバー");
      this.removeGame();
      this.restart.show();
      $(".overtime").text("タイムオーバー").show();
      this.overlay.find("p").removeClass("start");
      this.overlay.removeClass("fade");
  }

  removeGame(){
    this.sound.BGM.pause();
    this.sound.BGM.currentTime = 0;
    this.win.off("keydown");
  }

  GameClear(){
      this.removeGame();
      clearInterval(this.Gametimer);
      this.word_label.html("");
      this.overlay.find("p").removeClass("start");
      this.start_btn.text("ステージクリア！");
      this.timeTx.addClass("visible");
      this.overlay.removeClass("fade");
      var EvaluationTxt = this.Evaluation(this.Timearr);
      this.evaluation.text(EvaluationTxt);
      this.missTxt.text("タイプミス: "　+　this.miss + " 回");
      this.timeScore.text("クリアータイム: "　+　this.timeCalculation(1) + " 秒");
      this.restart.show();
      this.missTxt.show();
  }

  timeCalculation(num){
    return ((Date.now() - this.score)/1000).toFixed(num);
  }

  Evaluation(val){
    var _val = this.EvaluationNum(val,this.label_.length),
        EvaluationTxt;
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

  EvaluationNum(val,len){
    return Math.floor(val/len);
  }


  getWord(pas){
    var WORD = [];
    var KEYS = [];
    $.ajax({
      url: pas,
      dataType: "json",
      cache: false,
      success: (data, textStatus) => {
      this.json = data.item;
      this.jsonKeys = Object.keys(data.item);
      this.set(this.json,this.jsonKeys);
      },
      error: function(xhr, textStatus, errorThrown){
        alert("読み込みに失敗しました");
      }
    });
  }

  UA(ua){
    var isUA = (function(){
      var ua = navigator.userAgent.toLowerCase(),
          indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;};
      var o = {};
      o.ie      = function(){ return indexOfKey("msie 8"); }
      o.fx      = function(){ return indexOfKey("firefox"); }
      o.chrome  = function(){ return indexOfKey("chrome"); }
      o.opera   = function(){ return indexOfKey("opera"); }
      o.android = function(){ return indexOfKey("android"); }
      o.ipad    = function(){ return indexOfKey("ipad"); }
      o.ipod    = function(){ return indexOfKey("ipod"); }
      o.iphone  = function(){ return indexOfKey("iphone"); }
      return o;
    })();

  return isUA[ua]();

  }

}
new typing().getWord("json/ikimono.json");

