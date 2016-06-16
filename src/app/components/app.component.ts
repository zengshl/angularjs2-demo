
import {Component,AfterViewInit,Injectable} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig,Router} from  '@angular/router-deprecated';
import {LoginComponent} from '../+login/index';
import {SignupComponent} from '../+signup/index';
import {ForgotComponent} from '../+forgot/index';
import {ModifyPasswordComponent} from "../+modifypassword/components/modifypwd.component";
import {FrontPageComponent} from "../+frontpage/index";
import {DemoComponent} from "../+demo/index";
import {AdminLoginComponent} from '../+adminlogin/index';
declare var jQuery:JQueryStatic;

//import {servicesInjectables} from '../+chat/ts/services/services';
//import {utilInjectables} from '../+chat/ts/util/util';
//import {ChatApp} from "../+chat/ts/app";
//import {ChatWindow} from "../+chat/ts/components/ChatWindow"
//import {
//  MessagesService,
//  ThreadsService,
//  UserService
//} from '../+chat/ts/services/services';
//import {ChatExampleData} from '../+chat/ts/ChatExampleData';
//import {User, Thread, Message} from '../+chat/ts/models';

import {AdminComponent} from "../+admin/index";
import {ValidDemoComponent} from "../+validdemo/index";
import {HomeComponent} from "../+home/home.component";

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
  //{
  //  path: '/',  //用这种方法，可以默认一个路由为开始路由
  //  name: 'Home',
  //  component: HomeComponent,
  //  useAsDefault: true
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
