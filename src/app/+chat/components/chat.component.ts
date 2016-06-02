import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";


@Component({
  selector: 'chat-box',
  styles: [ require('app/+chat/components/chat.component.css') ],
  template: require('app/+chat/components/chat.component.html')
})
export class ChatComponent  implements AfterViewInit{



  ngAfterViewInit() {

    var flag=0;
    jQuery('#rightArrow').on("click",function(){
      if(flag==1){
        jQuery("#floatDivBoxs").animate({right: '-175px'},300);
        jQuery(this).animate({right: '-5px'},300);
        jQuery(this).css('background-position','-50px 0');
        flag=0;
      }else{
        jQuery("#floatDivBoxs").animate({right: '0'},300);
        jQuery(this).animate({right: '170px'},300);
        jQuery(this).css('background-position','0px 0');
        flag=1;
      }
    });

  }

}
