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
    eventType: "click",
    animation: "slideToggle",
    callback: function(){}
};

var toggleSlide = {};
toggleSlide.setting = $.extend({},defaults,option);
var eventTrigger = $(this).find(toggleSlide.setting.trigger),
    toggleContainer = $(this).children(toggleSlide.setting.container);
    if(toggleSlide.setting.hidden) {
        toggleContainer.addClass(toggleSlide.setting.className);
    }
    eventTrigger.on(toggleSlide.setting.eventType,function(e) {
        e.stopPropagation();
        toggleContainer.not(":animated")[toggleSlide.setting.animation](toggleSlide.setting.duration,toggleSlide.setting.callback);
        return false;
    });
}

})(jQuery);
