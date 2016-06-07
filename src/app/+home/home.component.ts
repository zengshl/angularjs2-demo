import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'sd-home',
  styles: [ require('app/+home/home.component.css') ],
  template: require('app/+home/home.component.html')
})
/**
 * 该组件的目的是让主页跳转
 */
export class HomeComponent {
  constructor(){
    window.open("assets/home.html","_self");
    //if(sessionStorage.getItem('user')) {
    //  //alert('已经登陆');
    //  this.router.navigate(['FrontPage']);
    //}else{
    //
    //  //this.router.navigate(['Login']);
    //}

  }
}
