 $(".pp p").contents().each(function(){
        var elmThis = $(this);
        if (this.nodeType == 3) {
            var $this = $(this);
            $this.replaceWith($this.text().replace(/(\S)/g, '<span class="textSplitLoad">$&</span>'));
        }
    });

var j = 0;

$(".bu").click(function(){



var val = $("#a").val();


//文字列を検索できるアプリ

var reg = new RegExp(val,"g");
$(".mn").contents().each(function(i,s){

j++;
var $this = $(this);





 $this.replaceWith($this.text().replace(reg, '<a href="#'+j+'" class="textSplitLoad">$&</a>'));

});


if(!$(".textSplitLoad").length){

  alert("検出されませんでした");

}

})
