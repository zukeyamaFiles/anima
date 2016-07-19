
;(function($){


$.fn.new_db_carousel = function(setting){
	if(this.length === 0 ) return;
	var EL = {};
	var prifix = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'],
		prefix_trans,
		callback,
		pre;

	EL.vri_prev = $(this).find(setting.prev);
	EL.vri_next = $(this).find(setting.next);
	EL.vri_carousel_list = $(this).find(setting.slide_block);
	EL.vri_li = EL.vri_carousel_list.find("li");
	EL.vri_cnt_page = $(this).find(setting.page_cnt);
	EL.current_length = $(this).find(setting.current_length);
	EL.all_length = $(this).find(setting.all_length);
	EL.slide_val = undefined;
	EL.li_width = EL.vri_li.width();
	EL.li_len = EL.vri_li.length;
	EL.li_m = EL.vri_li.css("margin-right");
	EL.ul_init_w = (EL.li_width * EL.li_len) + (parseFloat(EL.li_m) * (EL.li_len));
	EL.slide_w = (EL.li_width * setting.slide_length) + (parseFloat(EL.li_m) * setting.slide_length);
	EL.slide_length = 1;
	EL.pager_length = Math.ceil(EL.ul_init_w/EL.slide_w);
	EL.all_length.html(EL.pager_length);
	EL.vri_carousel_list.css("width",EL.ul_init_w);

	if(EL.slide_val === undefined || 0) {
		EL.vri_prev.addClass("disabled");
	}

	if(EL.slide_w >= EL.ul_init_w) {
	 EL.vri_next.addClass("disabled");
	}

	if(EL.li_len > setting.slide_length) {
		EL.vri_next.show();
		EL.vri_prev.show();
	}

	for (var i = 0; i < prifix.length; i++) {
		if (EL.vri_carousel_list[0].style[prifix[i]] !== undefined) {
			pre = prifix[i].replace('Perspective', '');
			prefix_trans = pre + 'Transform';
		}
	}

	var pre_transition = pre.replace('Transform', '').toLowerCase();
	var duration = setting.duration || 0.3;
	EL.vri_carousel_list[0].style["-" + pre_transition + "-transition-duration"] = duration + "s";

	addAction();

	function addAction(){
			EL.vri_prev.bind("click",addActionDetail);
			EL.vri_next.bind("click",addActionDetail);
	}

	function slide(e){
		var flag = e.className.match("prev");
		
		if(flag) {

			if(EL.slide_val === undefined || EL.slide_val === 0) return false;
			EL.current_length.html(EL.current_length.text() - EL.slide_length);
			EL.vri_prev.unbind("click")
			EL.vri_carousel_list[0].style[prefix_trans] = "translate3d("+ moveposition(flag) +"px,0,0)"
			EL.vri_carousel_list.bind("webkitTransitionEnd transitionend",function(){
				if(EL.slide_val === undefined || EL.slide_val === 0) {
				 EL.vri_prev.addClass("disabled");
				}
				if(Math.abs(EL.slide_val) <= EL.ul_init_w - EL.slide_w) {
				 EL.vri_next.removeClass("disabled");
				}
				EL.vri_prev.bind("click",callback);
				EL.vri_carousel_list.unbind("webkitTransitionEnd transitionend");
			})

		} else {

			if(Math.abs(EL.slide_val) >= EL.ul_init_w - EL.slide_w || EL.slide_w  >= EL.ul_init_w) return false;
			EL.vri_next.unbind("click");
			EL.vri_carousel_list[0].style[prefix_trans] = "translate3d("+ moveposition(flag) +"px,0,0)"
			EL.current_length.html(parseInt(EL.current_length.text()) + EL.slide_length);
			EL.vri_carousel_list.bind("webkitTransitionEnd transitionend",function(){
				if(EL.slide_val !== undefined || EL.slide_val !== 0) {
				 EL.vri_prev.removeClass("disabled");
				}
				if(Math.abs(EL.slide_val) >= EL.ul_init_w - EL.slide_w) {
				 EL.vri_next.addClass("disabled");
				}
				EL.vri_next.bind("click",callback);
				EL.vri_carousel_list.unbind("webkitTransitionEnd transitionend");
			})

		}
	}

	function moveposition(flag){
		EL.slide_val = EL.slide_val === undefined ? -EL.slide_w: flag ? (parseInt(EL.slide_val,10)+EL.slide_w) : (parseInt(EL.slide_val,10)-EL.slide_w);
		return EL.slide_val;
	}

	function addActionDetail(e){
		slide(e.target);
	}

}

})(jQuery);

$(function(){

	$(".new-carousel").new_db_carousel({
		prev: ".vri-prev",
		next: ".vri-next",
		slide_block: ".vri-carousel-list",
		page_cnt: ".vri-cnt-page",
		current_length: ".current-length",
		all_length: ".all-length",
		duration: .5,
		slide_length: 5
	});

	$(".new-carousel-btm").new_db_carousel({
		prev: ".vri-prev",
		next: ".vri-next",
		slide_block: ".vri-carousel-list",
		page_cnt: ".vri-cnt-page",
		current_length: ".current-length",
		all_length: ".all-length",
		duration: .5,
		slide_length: 5
	});

	$("#pdt-info-newdb-1606").new_db_carousel({
		prev: ".pic-prev",
		next: ".pic-next",
		slide_block: ".pict-list",
		page_cnt: ".pic-cnt-page",
		current_length: ".pic-length",
		all_length: ".pic-all-length",
		duration: .3,
		slide_length: 1
	});

})
