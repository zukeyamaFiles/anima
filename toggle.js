(function($){

$.fn.toggleCmn = function(option){


if(this.length === 0) return;

var defaults = {
    className: "is-hidden",
    duration: 300,
    animated: true,
    trigger: "[data-roll='js-toggleTrigger']",
    container: ".toggleBox",
    hidden: true,
    callback: function(){}
};

var toggleSlide = {};
toggleSlide.setting = $.extend({},defaults,option);
var eventTrigger = $(this).find(toggleSlide.setting.trigger),
    toggleContainer = $(this).children(toggleSlide.setting.container);
    if(toggleSlide.setting.hidden) {
        toggleContainer.addClass(toggleSlide.setting.className);
    }
    eventTrigger.on("click",function(e) {
        e.stopPropagation();
        toggleContainer.not(":animated").slideToggle(toggleSlide.setting.duration,toggleSlide.setting.callback);
        return false;
    });
}

})(jQuery);
