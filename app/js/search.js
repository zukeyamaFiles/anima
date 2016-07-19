
var SKUSORT  = (function(){
  var INITWORD = [];
  var ELEMENT = {};

  function SKUSORT(){
    this.CreateOverLay();
    ELEMENT.trgger = $(".sku-trigger-btn");
    ELEMENT.overlay = $("#sku-search-overlay");
    ELEMENT.container = $("#sku-search-container");
    ELEMENT.val = $(".val",ELEMENT.container);
    ELEMENT.clear = $(".sku-clear > span");
    ELEMENT.select_cnt = $(".sku-select-cnt")
    ELEMENT.select_ttl = $(".select-ttl",ELEMENT.container);
    ELEMENT.nest_block = $(".sku-nest-block");
    ELEMENT.sort_nest_block = $("#sku-sort .sku-nest-block");
    ELEMENT.select_ttl_txt = $("#sku-sort .txt");
    ELEMENT.detail_child = $(".sku-nest-vri");
    ELEMENT.child_block = $(".sku-nest-block");
    ELEMENT.span_inr_label = $(".sku-nest-block > ul > li > span label");
    ELEMENT.label = $(".sku-select-list > li label");
    ELEMENT.show_list = $(".sku-nest-vri-list > li");
    ELEMENT.cat_ttl = $(".cat-ttl",ELEMENT.container);
    ELEMENT.init = $(".init",ELEMENT.container);
    ELEMENT.cat_cnt = $("#sku-cat .sku-select-cnt");
    ELEMENT.sku_nest_vri = $(".sku-nest-vri");
    ELEMENT.sku_loader_box = $("#sku-loader-box");
    ELEMENT.close = $("#sku-search-container .close");
    ELEMENT.val.each(function(i,e){
      INITWORD.push(e.innerText);
    });
  }

  SKUSORT.prototype.initialize = function(){
    var flag,
        stat,
        stat2,
        stat3,
        stat4;

    ELEMENT.select_cnt.each(function(){
        stat = $(this).css("display");
    });

    stat2 = ELEMENT.detail_child.css("display");
    stat3 = ELEMENT.child_block.css("display");
    stat4 = ELEMENT.cat_cnt.css("display");
    flag = stat === "block" || stat2 === "block" || stat3 === "block" || stat4 === "none";

    if(ELEMENT.select_ttl.hasClass("open")) ELEMENT.select_ttl.removeClass("open");

    if(flag) {
      ELEMENT.detail_child.hide();
      ELEMENT.sort_nest_block.hide();
      ELEMENT.select_ttl_txt.removeClass("open");
      ELEMENT.select_cnt.each(function(i){
        if(i !== (ELEMENT.select_cnt.length-1)) {
          ELEMENT.select_cnt.eq(i).hide();
        } else {
          ELEMENT.select_cnt.eq(i).show();
          $(this).prev().toggleClass("open");
        }
      });
    }

    ELEMENT.select_ttl.each(function(i){
      $(this).find(".val").text(INITWORD[i]);
    });

    ELEMENT.init.each(function(){
      $(this).find("input").attr("checked","checked");
    });
  }

  SKUSORT.prototype.addEvent = function(){
    var _that = this;
    ELEMENT.trgger.click(function(){
      _that.fade();
      return false;
    });

    ELEMENT.close.click(function(){
      _that.fade();
    });

    ELEMENT.overlay.click(function(){
      _that.fade();
      return false;
    });

    ELEMENT.clear.click(function(){
      _that.initialize();
      window.scrollTo(0,0);
    });

    ELEMENT.span_inr_label.click(function(e){
      e.stopPropagation();
      var parent = $(this).parent();
      if($("+ .sku-nest-vri",parent).css("display") !== "block") ELEMENT.detail_child.slideUp();
      var state = parent.next(".sku-nest-vri").css("display");
      if($("+ .sku-nest-vri",parent).css("display") !== "block") {
        $("+ .sku-nest-vri",parent).slideDown();
      }
      _that.val_text.call(this,$(this).text())
    });

    ELEMENT.show_list.click(function(){
      _that.val_text.call(this,$(this).text())
    });

    ELEMENT.select_ttl.click(function(e){
        e.stopPropagation();
        $(this).toggleClass("open");
        $("+ .sku-select-cnt",this).slideToggle();
    });

    ELEMENT.select_ttl_txt.click(function(){
        $(this).next().slideToggle();
        $(this).toggleClass("open");
    });

     ELEMENT.label.click(function(e){
      e.stopPropagation();
      var checked = $(this).prev().attr("checked");
      if(checked) return;
      ELEMENT.nest_block.addClass("add");
        _that.val_text.call(this,$(this).text());
    }); 

    ELEMENT.cat_ttl.find("label").click(function(){
      ELEMENT.sku_nest_vri.slideUp();
    _that.val_text.call(this,$(this).text());
    });
  }

  SKUSORT.prototype.val_text = function(el){
    var val = $(this).parents(".val-parent").find(".val");
    val.text(el);
  }

  SKUSORT.prototype.fade = function(){
      ELEMENT.overlay.fadeToggle(500);
      ELEMENT.container.fadeToggle(500);
  }

  SKUSORT.prototype.CreateOverLay = function(){
    var docFragment = document.createDocumentFragment();
    var overlay = document.createElement("div");
  	overlay.id ="sku-search-overlay";
  	var skuLoaderBox = document.createElement("div");
  	skuLoaderBox.id ="sku-loader-box";
  	var txt = document.createElement("p");
  	txt.textContent = "Now lading...";
  	skuLoaderBox.appendChild(txt);
  	var loader = document.createElement("span");
  	loader.id = "sku-loader";
  	skuLoaderBox.appendChild(loader);
  	docFragment.appendChild(overlay);
  	docFragment.appendChild(skuLoaderBox);
  	document.body.appendChild(docFragment);
   }

/*


  SKUSORT.prototype.loading = function(){
    var _that = this;
    $("#comp-loader-box").toggleClass("load");
    $("#comp-loader-box").show();
    ELMENT.overlay.css('z-index',9999);
    ELMENT.overlay.unbind("click");
    setTimeout(function(){
      $("#comp-loader-box").hide();
      $("#comp-loader-box").toggleClass("load");
      ELMENT.overlay.css('z-index',1);
      ELMENT.overlay.bind("click", _that.fade);
    },3000);
  }

  SKUSORT.prototype.AJAX = function(){
    var _that = this;
    $.ajax({
      type: 'GET',
      url: 'data.json',
      cache : false,
      dataType: 'json',
      data: {
        p1: 'hoge',
        p2: 'fuga'
      },
       success: function(json){
        setTimeout(function(){
          $("#comp-loader-box").hide();
          ELMENT.overlay.fadeToggle(500)
        },3000);
          _that.create_DOM(json);
        }
    });
  }

  SKUSORT.prototype.create_DOM = function(obj){
    var body = document.getElementById("wrapper");
    var docFragment = document.createDocumentFragment();
    var div = document.createElement("div");
    var p = document.createElement("p");
    var el = document.createElement("li");
    var a = document.createElement("a");
    var len = obj.charas.length
    for(var i = 0; i < len; i++) {
      var div = document.createElement("div");
      var p = document.createElement("p");
      var p2 = document.createElement("p");
      var p3 = document.createElement("p");
      div.className = "test";
      p.id ="t1";
      p.textContent = obj.charas[i].product;
      p2.id ="t2";
      p2.textContent = obj.charas[i].price;
      p3.id ="t3";
      p3.textContent = obj.charas[i].price;
      div.appendChild(p);
      div.appendChild(p2);
      div.appendChild(p3);
      docFragment.appendChild(div);
    }

    body.appendChild(docFragment);
  }
*/
  return SKUSORT;

}());

$(function(){
  new SKUSORT().addEvent();
})
