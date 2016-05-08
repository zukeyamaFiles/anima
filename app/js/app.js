"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OriMath = function () {
  function OriMath() {
    _classCallCheck(this, OriMath);

    this.num = 0;
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

var typing = function (_OriMath) {
  _inherits(typing, _OriMath);

  function typing() {
    _classCallCheck(this, typing);

    $(".btn").click(function (e) {

      e.stopPropagation();

      $("#overlay").addClass("fade");
    });

    return _possibleConstructorReturn(this, Object.getPrototypeOf(typing).call(this));
  }

  _createClass(typing, [{
    key: "set",
    value: function set() {
      var _this2 = this;

      this.time = 0;

      this.tm = $(".t");

      this.timer = setInterval(function () {
        _this2.time++;
      }, 1000);

      this.word = $(".word");
      this.label_ = ["css", "transform", "margin", "padding", "position", "perspectiv", "clippath", "fontsize", "top", "display", "rotate", "fontweight", "lingnheight"];

      this.label_ = this.shuffle(this.label_);

      this.label_length = this.label_.length;

      this.wrap_ward(this.label_, this.num);

      this.addEvent();
    }
  }, {
    key: "action",
    value: function action() {

      if (this.label_length - 1 < this.num) {

        $("#overlay .btn").text("ステージクリア！");
        $(".time").addClass("visible");
        $(".clearTime").text(this.time);
        $("#overlay").removeClass("fade");

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

      window.addEventListener("keydown", function (evt) {

        var code = _this3.target_lang[i].toUpperCase().charCodeAt(0);

        if (code == evt.keyCode) {
          $(".word").find("span").eq(i).css("color", "red");

          i++;
        }

        if (_this3.lang_length - 1 < i) {

          $(".word").html("");
          _this3.num += 1;

          i = 0;
          _this3.action();
        }
      });
    }
  }]);

  return typing;
}(OriMath);

new typing().set();