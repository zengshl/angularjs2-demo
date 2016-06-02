import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'chat-box',
  styles: [ require('app/+chat/components/chat.component.css') ],
  template: require('app/+chat/components/chat.component.html')
})
export class ChatComponent  implements AfterViewInit{

  ngAfterViewInit() {
    //Sldie
    jQuery("#cust01").mouseenter(function(){
       jQuery("#custList").fadeIn();
    });
    jQuery("#cust01").mouseleave(function(){
       jQuery("#custList").fadeOut();
    });

  }

}
