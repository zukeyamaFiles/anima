var staticField = {
 bEmail : false,
 bNick : false,
 bBirth : false,
 bNB : false,
 submitForm: null,
 modal: false,

 init: function() {

  $("body").find("form").each(function() {
   var birth = false;
   var email = false;
   if($(this).find(".js-static-email").length != 0) email = true;
   if($(this).find(".js-static-birth").length != 0) birth = true;
   if($(this).find(".js-static-nick").length != 0) {

    if(birth) {
     staticField.addEventNBSubmit($(this));
    } else {

     staticField.addEventNickSubmit($(this));
    }
   } else if(birth) {
    staticField.addEventBirthSubmit($(this));
   } else if(email) {
    staticField.addEventEmailSubmit($(this));
   } else {
    staticField.addEventSubmit($(this));
   }
  });
  if(staticField.bNick || staticField.bBirth || staticField.bNB || staticField.bEmail) {
   staticField.displayConfirm();
   if(staticField.bEmail) staticField.displayEmail();
   if(staticField.bNick) staticField.displayNick();
   if(staticField.bBirth) staticField.displayBirth();
   if(staticField.bNB) staticField.displayNB();
   $(".mc-cancel").click(staticField.hideDialog);
   $(".mc-ok").click(function() {
    staticField.submitForm.submit();
   });
  }
 },

 displayEmail: function() {
  var html = '<div id="modal-confirm-email" class="js-modal inner"><p class="confirm-txt">莉･荳九・蜀・ｮｹ縺ｯ荳蠎ｦ險ｭ螳壹☆繧九→螟画峩縺ｧ縺阪∪縺帙ｓ縲�<br>繧医ｍ縺励＞縺ｧ縺吶°・�</p>';
  html += '<p class="mc-cancel modal-close"><img src="/img/sp/btn_modal_close_sp01.png" alt="close"></p>';
  html += '<div class="val-txt"><span class="val-ttl">繝｡繝ｼ繝ｫ繧｢繝峨Ξ繧ｹ・�</span><span class="mc-email"></span></div>';
  html += '<ul class="confirm-btn">'
  html += '<li><input class="btn mc-cancel cmn-btn-gray" type="button" value="繧ｭ繝｣繝ｳ繧ｻ繝ｫ"></li>'
  html += '<li><input class="btn mc-ok cmn-btn-black" type="button" value="・ｯ・ｫ"></li>'
  html += '</ul>'
  html += '</div>';
  $("body").append(html);

 displayNick: function() {
  var html = '<div id="modal-confirm-nick" class="js-modal inner"><p class="confirm-txt">莉･荳九・蜀・ｮｹ縺ｯ荳蠎ｦ險ｭ螳壹☆繧九→螟画峩縺ｧ縺阪∪縺帙ｓ縲�<br>繧医ｍ縺励＞縺ｧ縺吶°・�</p>';
  html += '<p class="mc-cancel modal-close"><img src="/img/sp/btn_modal_close_sp01.png" alt="close"></p>';
  html += '<div class="val-txt"><span class="val-ttl">繝九ャ繧ｯ繝阪・繝・�</span><span class="mc-nick"></span></div>';
  html += '<ul class="confirm-btn">'
  html += '<li><input class="btn mc-cancel cmn-btn-gray" type="button" value="繧ｭ繝｣繝ｳ繧ｻ繝ｫ"></li>'
  html += '<li><input class="btn mc-ok cmn-btn-black" type="button" value="・ｯ・ｫ"></li>'
  html += '</ul>'
  html += '</div>';
  $("body").append(html);
 },

 displayBirth: function() {
  var html = '<div id="modal-confirm-birth" class="js-modal inner"><p class="confirm-txt">莉･荳九・蜀・ｮｹ縺ｯ荳蠎ｦ險ｭ螳壹☆繧九→螟画峩縺ｧ縺阪∪縺帙ｓ縲�<br>繧医ｍ縺励＞縺ｧ縺吶°・�</p>';
  html += '<p class="mc-cancel modal-close"><img src="/img/sp/btn_modal_close_sp01.png" alt="close"></p>';
  html += '<div class="val-txt">逕溷ｹｴ譛域律・�';
  html += '<span class="mc-year"></span>蟷ｴ';
  html += '<span class="mc-month"></span>譛�';
  html += '<span class="mc-day"></span>譌･</div>';
  html += '<ul class="confirm-btn">'
  html += '<li><input class="btn mc-cancel cmn-btn-gray" type="button" value="繧ｭ繝｣繝ｳ繧ｻ繝ｫ"></li>'
  html += '<li><input class="btn mc-ok cmn-btn-black" type="button" value="・ｯ・ｫ"></li>'
  html += '</ul>'
  html += '</div>';
  $("body").append(html);
 },
 // confirm nickname and birthday
 displayNB: function() {
  var html = '<div id="modal-confirm-nb" class="js-modal inner"><p class="confirm-txt">莉･荳九・蜀・ｮｹ縺ｯ荳蠎ｦ險ｭ螳壹☆繧九→螟画峩縺ｧ縺阪∪縺帙ｓ縲�<br>繧医ｍ縺励＞縺ｧ縺吶°・�</p>';
  html += '<p class="mc-cancel modal-close"><img src="/img/sp/btn_modal_close_sp01.png" alt="close" /></p>';
  html += '<div class="val-txt"><span class="val-ttl">繝九ャ繧ｯ繝阪・繝・�</span><span class="mc-nick"></span></div>';
  html += '<div class="val-txt">逕溷ｹｴ譛域律・�';
  html += '<span class="mc-year"></span>蟷ｴ';
  html += '<span class="mc-month"></span>譛�';
  html += '<span class="mc-day"></span>譌･</div>';
  html += '<ul class="confirm-btn">'
  html += '<li><input class="btn mc-cancel cmn-btn-gray" type="button" value="繧ｭ繝｣繝ｳ繧ｻ繝ｫ"></li>'
  html += '<li><input class="btn mc-ok cmn-btn-black" type="button" value="・ｯ・ｫ"></li>'
  html += '</ul>'
  html += '</div>';
  $("body").append(html);
 },
 displayConfirm: function() {
  $("body").append('<div id="js-blind" class="js-modal"></div>');

 },
 copyBirth: function(form) {
   $(".mc-year").text(form.find(".js-birth-year").val());
   $(".mc-month").text(form.find(".js-birth-month").val());
   $(".mc-day").text(form.find(".js-birth-day").val());
 },
 copyNick: function(form) {
   $(".mc-nick").text(form.find(".js-static-nick").val());
 },
 copyEmail: function(form) {
   if (form.find(':hidden[name="data[AccountEdit][email_type]"]').val() == "pc") {
     $(".mc-email").text($(".pc-email").text());
   } else {
     $(".mc-email").text($(".mb-email").text());
   }
 },
 addEventEmailSubmit: function(form) {
  staticField.bEmail = true;
  form.find(".js-isform-submit").click(function() {
   if(staticField.modal) return true;
   staticField.copyEmail(form);
   staticField.submitForm = form;
   return staticField.showDialog($("#modal-confirm-email"));
  });
 },
 addEventNickSubmit: function(form) {
  staticField.bNick = true;
  form.find(".js-isform-submit").click(function() {
   if(staticField.modal) return true;
   if($(".js-static-nick").val() == "") {
     form.submit();
     return;
   }
   staticField.copyNick(form);
   staticField.submitForm = form;
   return staticField.showDialog($("#modal-confirm-nick"));
  });
 },
 addEventBirthSubmit: function(form) {
  staticField.bBirth = true;
  form.find(".js-isform-submit").click(function() {
   if(staticField.modal) return true;
   if($(".js-birth-month").val() == "0" || $(".js-birth-day").val() == "0") {
     form.submit();
     return;
   }
   staticField.copyBirth(form);
   staticField.submitForm = form;
   return staticField.showDialog($("#modal-confirm-birth"));
  });
 },
 addEventNBSubmit: function(form) {
  staticField.bNB = true;
  form.find(".js-isform-submit").click(function() {
   if(staticField.modal) return true;
   if($(".js-static-nick").val() == "" || $(".js-birth-month").val() == "0" || $(".js-birth-day").val() == "0") {
     form.submit();
     return;
   }
   staticField.copyNick(form);
   staticField.copyBirth(form);
   staticField.submitForm = form;
   return staticField.showDialog($("#modal-confirm-nb"));
  });
 },
 addEventSubmit: function(form) {
  form.find(".js-isform-submit").one("click", function() {
   form.submit();
  });
 },
 showDialog: function(form) {
  var top = "20%";
  var left = 0;
  var right = 0;
  form.css({top: top, left: left,right: right});
  $("#js-blind").show();
  form.show();
  staticField.modal = true;
  return false;
 },
 hideDialog: function() {
  $(".js-modal").hide();
  staticField.modal = false;
 },
};

var isform = {
 init : function() {
  form_toggle();
  function form_toggle() {

    var toggle_name = {
      container: '.cmn-main',
      trigger: '.mode-chng',
      active: 'is-inpt-actv',
    }
      $(toggle_name.trigger).click(function(){
          $(toggle_name.container).toggleClass(toggle_name.active);
      });
  }


  var snsLogin = {
    addEvent: function() {
      var target_list = $('.tab-menu ul li');
      var tatget_block = $('.tab-conts .hide');
      var tatget_index = tatget_block.index();
      var state = tatget_index == 0?1:0;
      target_list.eq(state).addClass("select");
      target_list.click(function() {
        snsLogin.changeTab($('.tab-menu ul li').index(this));
      });
    },
    changeTab: function(tabnum) {
      $('.tab-conts .tab-show').hide().eq(tabnum).show();
      $('.tab-menu ul li').eq(tabnum).addClass('select').siblings().removeClass('select');
    },
  }
  snsLogin.addEvent();

var targetflame = $("#zip1");
var max_length = targetflame.attr("maxlength");
var target_suggest = $(".js-suggest");
var form_elment = document.getElementById("zip2");
targetflame.on("keyup",function(){
  nextFrame(this, max_length);
})
function nextFrame(i, m) {
  if (i.value.length >= m) {
    form_elment.focus();
  } 
}
  var target_suggest = $(".js-suggest");
  target_suggest.on("click",function() {
   $("#" + $(this).attr('datatarget')).val($(this).text());
   target_suggest.removeClass("active");
   $(this).addClass("active");
  });

  var target_txt_wrap = $(".js-pass-text-wrap");
  var js_pass = $(".js-pass");
  var js_pass_text = $(".js-pass-text");
  var js_switch = $(".js-pass-switch");
  var check_switch = $("#check_switch");
    target_txt_wrap.hide();
    js_pass.change(function() {
     js_pass_text.val($(this).val());
    });
    js_pass_text.change(function() {
     js_pass.val($(this).val());
    });
    js_switch.click(function() {
     if(check_switch.prop('checked')) {
       $("." + check_switch.attr('datatarget')).hide();
       target_txt_wrap.show();
     } else {
       $("." + check_switch.attr('datatarget')).show();
       target_txt_wrap.hide();
     }
    }); 

  $(".js-combo-check").each(function() {
   if($(this).prop('checked')) {
    var val = $(this).attr('dataval');
    $("." + $(this).attr('datatarget')).find('input[type=radio]').each(function() {
     if($(this).val() == val) $(this).attr('checked', 'checked');
    });
    $("." + $(this).attr('datatarget')).find('input[type=radio]').removeAttr('disabled');
   } else {
    var chkbox = $(this);
    $("." + $(this).attr('datatarget')).find('input[type=radio]').each(function() {
     if($(this).prop('checked')) chkbox.attr('dataval', $(this).val());
     $(this).removeAttr('checked');
    });
    $("." + $(this).attr('datatarget')).find('input[type=radio]').attr('disabled', 'disabled');
   }
  });

  $(".js-combo-check").click(function() {
   if($(this).prop('checked')) {
    var val = $(this).attr('dataval');
    $("." + $(this).attr('datatarget')).find('input[type=radio]').each(function() {
     if($(this).val() == val) $(this).attr('checked', 'checked');
    });
    $("." + $(this).attr('datatarget')).find('input[type=radio]').removeAttr('disabled');
   } else {
    var chkbox = $(this);
    $("." + $(this).attr('datatarget')).find('input[type=radio]').each(function() {
     if($(this).prop('checked')) chkbox.attr('dataval', $(this).val());
     $(this).removeAttr('checked');
    });
    $("." + $(this).attr('datatarget')).find('input[type=radio]').attr('disabled', 'disabled');
   }
  });
  $(".js-prev-page").click(function() {
   $("#pageback").val('1');
   $(this).parents('form:first').submit();
  });

  var postal = 0;
  postal += $("#zip1").length;
  postal += $("#zip2").length;
  postal += $("#pref").length;
  postal += $("#address1").length;
  postal += $("#address2").length;
  if(postal == 5) {
   $("#zip1").parents(".frm-zp:first").children('ul').append('<li><input id="postal_button" class="cmn-btn-darkgray" type="button" value="菴乗園讀懃ｴ｢"></li>');
   $("#postal_button").click(function() {
    if($("#zip1").val().length == 3 && $("#zip2").val().length == 4) {
     var zip1 = $("#zip1").val();
     var zip2 = $("#zip2").val();
     var url = '/api/postal_data?code1=' + zip1 + '&code2=' + zip2;
     $.getJSON(url, { method: "GET" }, function(resp) {
      if(resp.cnt == 1) {
       $("#pref").val(resp.data[0].pref_id);
       $("#address1").val(resp.data[0].city_name + resp.data[0].town_name).focus();
       $("#address_list").html("");
      } else if(resp.cnt > 1) {
       $("#pref").val(resp.data[0].pref_id);
       $("#address_list").html("");
       $.each(resp.data, function(cnt, val) {
        $("#address_list").append('<option value="' + val.city_name + val.town_name + '"></option>');
       });
       $("#address1").val(resp.data[0].city_name).focus();
      }
     });
    }
   });
  }

  $(".js-cndtn-toggle").on("click",function(){
    $(".info-list-block").not(":animated").slideToggle();
    return false;
  })


  var label_target = $(".js-label").find("input")
  label_target.one("focus",function(){
    $(this).closest("dl").find(".form-ttl").addClass("addshow");
    $(this).closest("dl").find(".sup-text").fadeIn(100).addClass("addshow");
    return false;
  })

  var anotation_target = $(".js-anotation").find("input");
  anotation_target.one("focus",function(){
   $(this).closest("dl").find(".sup-text").fadeIn(100).addClass("addshow");
  })
 },
};


function produce_check(el){
  this.target_trigger = $("#AccountEditProduceFlg"),
  this.slide_block = $(".slide-block");
  this.el_All = $(el+" .btn-rgstr");
  this.el_on = $(".js-produce-on");
  this.el_no = $(".js-produce-no");
  this.el_on_label = $(".js-produce-on").find("label");
  this.el_on_p = $(".js-produce-on").find("p");
  this.el_no_label = $(".js-produce-no").find("label");
  this.el_no_p = $(".js-produce-no").find("p");
  this.state = $("#AccountEditProduceFlg").prop("checked");
  this.not_el = $("#address2");
  this.select = $("#pref");
  this.trigger_input_el = $('#auth-mbr-list-produce form .frm-slct').eq(0).find(':input');
  this.slide_block.hide();
  this.init_block_show();
  this.el_All.hide();
  this.btn_show();
  this.check_show();
  this.member_validation();
}

produce_check.prototype.btn_show = function(){
  if(this.state){
    this.trigger_input_el.each(function(){
       $(this).removeAttr("disabled")
    })
    this.el_on.show();
    this.slide_block.slideDown();
  } else {
  this.slide_block.slideUp();
    this.trigger_input_el.each(function(){
      $(this).attr("disabled","disabled")
    })
    this.el_no.show();
  }
}

produce_check.prototype.member_validation = function(){
  var that = this; 
   this.trigger_input_el.on('change keyup focus', function() {
      that.check_show();
   });
}

produce_check.prototype.check_show = function(){
  var that = this;
  var checkOk = true;
  this.trigger_input_el.not(this.not_el).each(function() {
    if(!$(this).val()) {
      checkOk = false;
      return false;
    }
  });
  if(checkOk && that.select.val() != 50) {
    that.el_on_p.hide();
    that.el_on_label.show();
  } else {
    that.el_on_p.show();
    that.el_on_label.hide();
  }
}

produce_check.prototype.init_block_show = function(){
  if(this.state){
    this.slide_block.show();
  } else {
    this.slide_block.hide();
  } 
}

produce_check.prototype.addEvent = function(){
  var that = this;
  this.target_trigger.on('click',function(){
    that.el_All.hide();
    that.state = that.target_trigger.prop("checked");
    that.btn_show();
  })
}


var COMPLOAD = {
  delay: 4000,
  init: function(){
    var loader = $("#comp-overlay,#comp-loader-box");
    setTimeout(function(){
    $(loader).hide();
    },COMPLOAD.delay);
  }
}

$(function() {
 staticField.init();
 isform.init();
 new produce_check("#auth-mbr-list-produce").addEvent();
  COMPLOAD.init();
});
