import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'advice-box',
  styles: [ require('app/+advice/components/advice.component.css') ],
  template: require('app/+advice/components/advice.component.html')
})
export class AdviceComponent implements AfterViewInit{
  ngAfterViewInit() {

  }

  freeAdvice(){
    setTimeout(function(){
      jQuery("#free").modal('show');
    },1);
  }
  vipAdvice(){
    setTimeout(function(){
      jQuery('.coupled.modal')
        .modal({
          allowMultiple: true
        })
      ;
// open second modal on first modal buttons
      jQuery('.second.modal')
        .modal('attach events', '.first.modal .button')
      ;
// show first immediately
      jQuery('.first.modal')
        .modal('show')
      ;
    })
  }


}
