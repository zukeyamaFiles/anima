
;(function($){

	$(function(){
		var li = $("#thumb-newdb-1606 .thumb-detail").find("li");
		var pic = $("#thumb-newdb-1606 .pic").find("img");
		var pager_li = $(".pager li");
		var thumb_detail = $(".thumb-detail");
		var m = thumb_detail.css("margin-right");
		var thumb_wrap = $(".thumb-wrap")[0];
		var len = thumb_detail.length;
		var thumb_detail_width = thumb_detail.width() + parseFloat(m);
		var thumb_box_all = thumb_detail_width * len;
		var thumb_box = $(".thumb-box");
		var li_inner_length = $(".thumb-inner").find("li").length;
		var pager = $(".pager").find("a");
		thumb_box.css("width",thumb_box_all);

		show_pager();

		li.click(function(){
			var src = this.getAttribute("data-url");
			li.removeClass("current");
			$(this).addClass("current");
			pic.attr("src",src);
		})

		pager.live("click",function(){
			var index = $(this).parent().index();
			thumb_box.css("left",-(thumb_detail_width * index));
			$(".pager li").removeClass("current");
			$(this).parent().addClass("current");
			return false;
		})

		function show_pager(){
			
		if(thumb_detail.length == 1) {
			thumb_detail.addClass("single");
			if(li_inner_length <= 8) {
				thumb_box.addClass("few");
			}
			return false;
		}

		var ul = document.createElement("ul");
		ul.className = "pager";
	    var len = thumb_detail.length;

	    for(var i = 0; i < len; i++) {
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.href = "#";
			a.textContent = i + 1;
			if(i === 0) li.className = "current";
			li.appendChild(a);
			ul.appendChild(li);
		  }
			thumb_wrap.appendChild(ul);
		}

	})

})(jQuery);