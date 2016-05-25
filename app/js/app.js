"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typing = function () {
  function typing() {
    _classCallCheck(this, typing);

    if (!this.UA("chrome")) alert("googleChromeを推奨します！");
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
    this.start_btn = $(".btn", this.overlay);
    this.innerEl = $(".inner", this.overlay).find("p");
    this.restart = $(".restart");
    this.timeTx = $(".time");
    this.evaluation = $(".evaluation");
    this.missTxt = $(".miss");
    this.timeScore = $(".timeScore");
    this.stageinner = $(".stageinner");
    this.addEvent();
  }

  _createClass(typing, [{
    key: "set",
    value: function set(a, b) {
      this.PlayBGM(this.sound.BGM);
      this.label_ = b;
      this.label_ = this.shuffle(this.label_);
      this.label_length = this.label_.length;
      this.word_label.html(this.label_[this.num]);
      this.wrap_ward(a, this.label_[this.num]);
      var typeaction = this.typeAction.bind(this);
      this.win.on("keydown", typeaction);
    }
  }, {
    key: "restartAction",
    value: function restartAction() {
      this.set(this.json, this.jsonKeys);
    }
  }, {
    key: "action",
    value: function action() {
      if (this.label_length - 1 < this.num) {
        this.stageinner.hide();
        this.GameClear();
        return false;
      }
      this.wrap_ward(this.json, this.label_[this.num]);
    }
  }, {
    key: "wrap_ward",
    value: function wrap_ward(el, num) {
      var _this = this;

      var lang = "";
      this.target_lang = el[num].split("");
      this.lang_length = this.target_lang.length;
      this.target_lang.forEach(function (i, s) {
        lang += _this.replaceWrap(i, s);
      });
      this.word.html(lang);
      this.word_label.html(num);
    }
  }, {
    key: "replaceWrap",
    value: function replaceWrap(el, num) {
      return el.replace(/(\S)/g, '<span class="textSplitLoad' + num + '">$&</span>');
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
      var _this2 = this;

      this.restart.on("click", function (e) {
        _this2.langCount = 0;
        _this2.num = 0;
        _this2.Timearr = 0;
        _this2.miss = 0;
        _this2.stageinner.show();
        _this2.restartAction();
        _this2.startAction(e, _this2.restart);
        _this2.overlay.on("webkitTransitionEnd transitionend", function (e) {
          _this2.innerEl.not(".restart").each(function () {
            $(this).text("");
          });

          _this2.overlay.off("webkitTransitionEnd transitionend");
        });
      });
      this.start_btn.on("click", function (e) {
        _this2.startAction(e, _this2.start_btn);
      });

      this.overlay.on("webkitTransitionEnd transitionend", function (e) {
        _this2.start_btn.hide();
        _this2.overlay.off("webkitTransitionEnd transitionend");
      });
    }
  }, {
    key: "typeAction",
    value: function typeAction(evt) {
      var code = this.char(this.langCount);
      if (code == evt.keyCode) {
        this.PlayBtnBGM(this.sound.btn);
        this.word.find("span").eq(this.langCount).addClass("addColor");
        this.langCount++;
      } else {
        this.PlayBtnBGM(this.sound.can);
        this.miss++;
      }
      if (this.lang_length - 1 < this.langCount) {
        this.word.html("");
        this.num += 1;
        this.langCount = 0;
        this.Timearr += this.overTime;
        this.overTime = this.sec;
        this.action();
      }
    }
  }, {
    key: "char",
    value: function char(ca) {
      return this.target_lang[ca].toUpperCase().charCodeAt(0);
    }
  }, {
    key: "startAction",
    value: function startAction(e, btn) {
      var _this3 = this;

      e.stopPropagation();
      this.score = Date.now();
      this.PlayBtnBGM(this.MP().start);
      btn.addClass("start");
      setTimeout(function () {
        _this3.overlay.addClass("fade");
        _this3.Time("timerTxt", 2);
      }, 3000);
    }
  }, {
    key: "MP",
    value: function MP() {
      var MP4 = {
        BGM: new Audio("./audio/BGM.mp3"),
        btn: "./audio/btn.mp3",
        can: "./audio/can.mp3",
        start: "./audio/start.mp3"
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

      this.overTime = this.sec;
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
      this.start_btn.text("タイムオーバー");
      this.removeGame();
      this.restart.show();
      $(".overtime").text("タイムオーバー").show();
      this.overlay.find("p").removeClass("start");
      this.overlay.removeClass("fade");
    }
  }, {
    key: "removeGame",
    value: function removeGame() {
      this.sound.BGM.pause();
      this.sound.BGM.currentTime = 0;
      this.win.off("keydown");
    }
  }, {
    key: "GameClear",
    value: function GameClear() {
      this.removeGame();
      clearInterval(this.Gametimer);
      this.word_label.html("");
      this.overlay.find("p").removeClass("start");
      this.start_btn.text("ステージクリア！");
      this.timeTx.addClass("visible");
      this.overlay.removeClass("fade");
      var EvaluationTxt = this.Evaluation(this.Timearr);
      this.evaluation.text(EvaluationTxt);
      this.missTxt.text("タイプミス: " + this.miss + " 回");
      this.timeScore.text("クリアータイム: " + this.timeCalculation(1) + " 秒");
      this.restart.show();
      this.missTxt.show();
    }
  }, {
    key: "timeCalculation",
    value: function timeCalculation(num) {
      return ((Date.now() - this.score) / 1000).toFixed(num);
    }
  }, {
    key: "Evaluation",
    value: function Evaluation(val) {
      var _val = this.EvaluationNum(val, this.label_.length),
          EvaluationTxt;
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
  }, {
    key: "EvaluationNum",
    value: function EvaluationNum(val, len) {
      return Math.floor(val / len);
    }
  }, {
    key: "getWord",
    value: function getWord(pas) {
      var _this5 = this;

      var WORD = [];
      var KEYS = [];
      $.ajax({
        url: pas,
        dataType: "json",
        cache: false,
        success: function success(data, textStatus) {
          _this5.json = data.item;
          _this5.jsonKeys = Object.keys(data.item);
          _this5.set(_this5.json, _this5.jsonKeys);
        },
        error: function error(xhr, textStatus, errorThrown) {
          alert("読み込みに失敗しました");
        }
      });
    }
  }, {
    key: "UA",
    value: function UA(ua) {
      var isUA = function () {
        var ua = navigator.userAgent.toLowerCase(),
            indexOfKey = function indexOfKey(key) {
          return ua.indexOf(key) != -1 ? true : false;
        };
        var o = {};
        o.ie = function () {
          return indexOfKey("msie 8");
        };
        o.fx = function () {
          return indexOfKey("firefox");
        };
        o.chrome = function () {
          return indexOfKey("chrome");
        };
        o.opera = function () {
          return indexOfKey("opera");
        };
        o.android = function () {
          return indexOfKey("android");
        };
        o.ipad = function () {
          return indexOfKey("ipad");
        };
        o.ipod = function () {
          return indexOfKey("ipod");
        };
        o.iphone = function () {
          return indexOfKey("iphone");
        };
        return o;
      }();

      return isUA[ua]();
    }
  }]);

  return typing;
}();

new typing().getWord("json/ikimono.json");