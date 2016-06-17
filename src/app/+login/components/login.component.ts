import  {Component} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import  {FORM_DIRECTIVES} from '@angular/common';
import  {Http} from '@angular/http';
import  {User} from '../../shared/index'; //通过集中在index内，使得一个地址可以引用很多组件（用逗号隔开）
import {UtilService} from '../../shared/index';
import {AdminLoginComponent} from '../../+adminlogin/index';
import {UserLoginComponent} from '../../+userlogin/index';
import {AfterViewInit} from "@angular/core";
declare var jQuery:JQueryStatic;
/**
 * Created by Ping on 2016/5/10.
 */
@Component( {
  selector: 'login-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES,ROUTER_DIRECTIVES],
  template: require('app/+login/components/login.component.html'),
  styles:[`
  @media all and (max-width:765px)
    {
      #mobileHide{ display:none }
    }


  `]
})
@RouteConfig([
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLoginComponent
  },
  {
    path: '/userlogin',  //用这种方法，可以默认一个路由为开始路由
    name: 'UserLogin',
    component: UserLoginComponent,
    useAsDefault: true
  }
])

export class LoginComponent implements AfterViewInit {
  ngAfterViewInit() {

  }
  constructor(private router:Router,private http:Http,private _util:UtilService) {

  }

  nav(name:string) {
    this.router.parent.navigate([name]);
  };

  navSelf(name:string) {
    this.router.navigate([name]);
  };
}
