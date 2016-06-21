
import {Component,AfterViewInit,Injectable} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig,Router} from  '@angular/router-deprecated';
import {LoginComponent} from '../+login/index';
import {SignupComponent} from '../+signup/index';
import {ForgotComponent} from '../+forgot/index';
import {ModifyPasswordComponent} from "../+modifypassword/components/modifypwd.component";
import {FrontPageComponent} from "../+frontpage/index";
import {DemoComponent} from "../+demo/index";
import {AdminLoginComponent} from '../+adminlogin/index';

import {AdminComponent} from "../+admin/index";
import {ValidDemoComponent} from "../+validdemo/index";

@Component({
  selector: 'sd-app',
  template: require('app/components/app.component.html'),
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/login/...',  //用这种方法，可以默认一个路由为开始路由
    name: 'Login',
    component: LoginComponent,
    useAsDefault: true
  },
  //{
  //  path: '/',  //用这种方法，可以默认一个路由为开始路由
  //  name: 'Demo',
  //  component: DemoComponent
  //},

  {
    path: '/front/...',  //用这种方法，可以默认一个路由为开始路由
    name: 'FrontPage',
    component: FrontPageComponent
  },
  {
    path: '/validdemo',  //用这种方法，可以默认一个路由为开始路由
    name: 'ValidDemo',
    component: ValidDemoComponent
  },
  {
    path: '/register',
    name: 'Signup',
    component: SignupComponent
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: ForgotComponent
  },
  {
    path: '/admin/...',
    name: 'Admin',
    component: AdminComponent
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLoginComponent
  }

])
export class AppComponent {


  constructor(private router:Router) {

  }
}
