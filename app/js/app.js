"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OriMath = function () {
  function OriMath() {
    _classCallCheck(this, OriMath);
  }

  _createClass(OriMath, [{
    key: "sin",
    value: function sin(deg) {
      return deg * (180 / Math.PI);
    }
  }, {
    key: "cos",
    value: function cos(rad) {
      return rad * (Math.PI / 180);
    }
  }, {
    key: "atan",
    value: function atan(y, x) {
      return Math.atan2(y, x);
    }
  }]);

  return OriMath;
}();

var typing = function () {
  function typing() {
    var _this = this;

    _classCallCheck(this, typing);

    $(".restart").on("click", function () {

      _this.restart();
    });
  }

  _createClass(typing, [{
    key: "set",
    value: function set() {
      var _this2 = this;

      this.Timearr = 0;
      this.miss = 0;
      this.num = 0;
      $(".btn").click(function (e) {
        e.stopPropagation();
        _this2.Time("timerTxt", 2);
        _this2.sound = _this2.MP();
        _this2.PlayBGM(_this2.sound.BGM);
        $("#overlay").addClass("fade");
        _this2.addEvent();
      });
      this.word = $(".word");
      this.label_ = ["css", "daiya", "ryby", "scala", "java", "c"];
      this.label_ = this.shuffle(this.label_);
      this.label_length = this.label_.length;
      this.wrap_ward(this.label_, this.num);
    }
  }, {
    key: "restart",
    value: function restart() {
      this.num = 0;
      this.PlayBGM(this.sound.BGM);
      $("#overlay").addClass("fade");
      this.Time("timerTxt", 2);
      this.addEvent();
      this.word = $(".word");
      this.label_ = ["css", "daiya", "ryby", "scala", "java", "c"];
      this.label_ = this.shuffle(this.label_);
      this.label_length = this.label_.length;
      this.wrap_ward(this.label_, this.num);
    }
  }, {
    key: "action",
    value: function action() {
      if (this.label_length - 1 < this.num) {
        this.GameClear();
        return false;
      }
      this.wrap_ward(this.label_, this.num);
    }
  }, {
    key: "wrap_ward",
    value: function wrap_ward(el, num) {
      var lang = "";
      this.target_lang = el[num].split("");
      this.lang_length = this.target_lang.length;
      this.target_lang.forEach(function (i, s) {
        lang += i.replace(/(\S)/g, '<span class="textSplitLoad' + s + '">$&</span>');
      });
      this.word.html(lang);
    }
  }, {
    key: "animationFrame",
    value: function animationFrame() {
      window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
          window.setTimeout(callback, 1000 / 60);
        };
      }();
    }
  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var n = array.length,
          t,
          i;
      while (n) {
        i = Math.floor(Math.random() * n--);
        t = array[n];
        array[n] = array[i];
        array[i] = t;
      }
      return array;
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this3 = this;

      var i = 0;
      $(window).on("keydown", function (evt) {

        var code = _this3.target_lang[i].toUpperCase().charCodeAt(0);
        if (code == evt.keyCode) {
          _this3.PlayBtnBGM(_this3.sound.btn);
          $(".word").find("span").eq(i).css("color", "red");
          i++;
        } else {
          _this3.PlayBtnBGM(_this3.sound.can);
          _this3.miss++;
        }
        if (_this3.lang_length - 1 < i) {
          $(".word").html("");
          _this3.num += 1;
          i = 0;
          _this3.Timearr += _this3.overTime;
          _this3.overTime = 5;
          _this3.action();
        }
      });
    }
  }, {
    key: "MP",
    value: function MP() {
      var MP4 = {
        BGM: new Audio("./audio/test.mp3"),
        btn: "./audio/btn.mp3",
        can: "./audio/can.mp3"
      };
      return MP4;
    }
  }, {
    key: "PlayBGM",
    value: function PlayBGM(val) {
      val.play();
    }
  }, {
    key: "PlayBtnBGM",
    value: function PlayBtnBGM(val) {
      var btn = new Audio(val);
      btn.play();
      btn = null;
    }
  }, {
    key: "Time",
    value: function Time(el, dobble) {
      var _this4 = this;

      var timer, s, update, overTime;

      this.overTime = 5;
      s = Date.now();
      this.Timertxt = document.getElementById(el);
      this.update = function (dobble) {
        _this4.Gametimer = setInterval(function () {
          _this4.overTime = _this4.overTime - 0.01;
          _this4.Timertxt.textContent = _this4.overTime.toFixed(dobble);
          if (_this4.Timertxt.textContent <= 0) {
            clearInterval(_this4.Gametimer);
            _this4.GemeOverTime();
          }
        }, 10);
      };
      this.update(dobble);
    }
  }, {
    key: "parse",
    value: function parse(val) {
      return val.match(/(.*)\.\d/)[1];
    }
  }, {
    key: "GemeOverTime",
    value: function GemeOverTime() {
      $("#overlay .btn").text("タイムオーバー");
      this.removeGame();
      $(".restart").show();
      $("#overlay").removeClass("fade");
    }
  }, {
    key: "removeGame",
    value: function removeGame() {
      this.sound.BGM.pause();
      this.sound.BGM.currentTime = 0;
      $(window).off("keydown");
    }
  }, {
    key: "GameClear",
    value: function GameClear() {
      this.removeGame();
      clearInterval(this.Gametimer);
      $("#overlay .btn").text("ステージクリア！");
      $(".time").addClass("visible");
      $("#overlay").removeClass("fade");
      var EvaluationTxt = this.Evaluation(this.Timearr);
      $(".restart").text(EvaluationTxt + "<br>ミス" + this.miss + "回");
      $(".restart").show();
    }
  }, {
    key: "Evaluation",
    value: function Evaluation(val) {
      var _val = Math.floor(val / this.label_.length);
      var EvaluationTxt;
      switch (_val) {
        case 5:
          EvaluationTxt = "あなたはとても優秀ですね";
          break;
        case 4:
          EvaluationTxt = "優秀ですね";
          break;
        case 3:
          EvaluationTxt = "普通ですね";
          break;
        case 2:
          EvaluationTxt = "遅い優秀ですね";
          break;
        default:
          EvaluationTxt = "ダメダメですね";
          break;
      }

      return EvaluationTxt;
    }
  }]);

  return typing;
}();

new typing().set();