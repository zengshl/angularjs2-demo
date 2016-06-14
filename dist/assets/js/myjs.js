/**
 * Created by Ping on 2016/5/13.
 */
(function ( $, window, document, undefined ) {

$(document).ready(function(){

  //semantic中的导航栏
  $("body").on("click",".menu a.item",function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .parents('.item').siblings().removeClass('active') ;
    $(this)
      .parents('.item').siblings().find(".item").removeClass('active') ;
    $(this)
      .siblings().find('.item').removeClass('active');

  })

  $("body").on("click",".nav-list li",function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .parents('li').siblings().removeClass('active') ;
    $(this)
      .parents('li').siblings().find("li").removeClass('active') ;

  })
    $("body").on("click","#hello",function(){
      alert("hellolll");
    });

  //导航栏效果
  $("body").on("click",".shell ul li",function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .parents('li').siblings().removeClass('active') ;
    $(this)
      .parents('li').siblings().find("li").removeClass('active') ;

  })





})

}(jQuery, window, document));

