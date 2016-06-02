/**
 * Created by lenovo on 2016/6/2.
 */
import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {AfterViewInit} from "@angular/core";
import  {User} from '../../shared/index';
declare var jQuery:JQueryStatic;

@Component({
  selector: 'navbar-box',
  template: require('app/+personalset/components/personalset.html')
})
export class PersonalSetComponent implements AfterViewInit{
  user:User;
  constructor(private router:Router)  {
    this.user = new User();
    this.user.phone = "123456";
    if(sessionStorage.getItem('user')) {
      //this.user = sessionStorage.getItem('user');
      this.user = JSON.parse(sessionStorage.getItem('user'))
      console.log(JSON.parse(sessionStorage.getItem('user')));
    }
  }

  ngAfterViewInit() {
    jQuery('#leftMenu')
      .accordion();
  }

  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }

  choose(value:string){
    console.log(value);
  }
}
