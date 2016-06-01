
import {Component,AfterViewInit,Injectable} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig} from  '@angular/router-deprecated';
import {LoginComponent} from '../+login/index';
import {SignupComponent} from '../+signup/index';
import {ForgotComponent} from '../+forgot/index';
import {Router} from  '@angular/router-deprecated';
import {MainComponent} from "../+main/index";
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

@Component({
  selector: 'sd-app',
  template: require('app/components/app.component.html'),
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/login/...',  //用这种方法，可以默认一个路由为开始路由
    name: 'Login',
    component: LoginComponent
  },
  //{
  //  path: '/',  //用这种方法，可以默认一个路由为开始路由
  //  name: 'Demo',
  //  component: DemoComponent
  //},
  {
    path: '/...',  //用这种方法，可以默认一个路由为开始路由
    name: 'FrontPage',
    component: FrontPageComponent,
    useAsDefault: true
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

  //isChatShow:boolean = false;//聊天控制
  //hasMessage:boolean = false;
  //currentThread:Thread;
  //newMessageNum:number = 0;

  constructor(private router:Router) {
    //如果没有登陆的话，自动转为登陆页面
    //if(!sessionStorage.getItem("user")){
    //  this.router.navigate(['Login']);
    //}
    //  ChatExampleData.init(messagesService, threadsService, userService);
    //  this.threadsService.currentThread.subscribe(
    //    (thread: Thread) => {
    //      this.currentThread = thread;
    //    });
    //  //计时器
    //  var self =this;
    //  self.timer = setInterval(_ => {
    //    self.hasMessage = self.messagesService.hasNewMessage;
    //    self.newMessageNum = self.messagesService.newMessageNum;
    //    if(self.hasMessage){
    //      $('.ui.Tiny.image')
    //        .transition('flash')
    //    }
    //    //clearInterval(self.timer);
    //  },1000);
    //}

    //override
    //ngAfterViewInit() {
    //  //jQuery(".item.menu").click(function(){
    //  //    alert("bb")
    //  //});
    //
    //  jQuery('#talkImage')
    //    .popup();
    //
    //  setTimeout(
    //    () => {
    //      this.isChatShow = true;
    //      this.threadsService.setIsOpenChat(true);
    //      console.log("ChatShow");
    //    },
    //    5000);
    //
    //}
    //chatShow(){
    //  jQuery('#talkImage')
    //    .popup('hide');
    //  this.hasMessage = false;
    //  this.messagesService.setHasNewMessage(false);
    //  this.messagesService.setNewMessageNum(this.messagesService.newMessageNum-this.currentThread.newMessageNum);
    //  this.currentThread.setNewMessageNum(0);
    //  this.threadsService.setIsOpenChat(true);
    //  this.isChatShow = true;
    //
    //}

    //closeParentWindow(arg){
    //  this.isChatShow = arg;
    //  //jQuery('#talkImage')
    //  //    .popup('reposition');
    //  jQuery('#talkImage')
    //    .popup();
    //  jQuery('#talkImage')
    //    .popup('show');
    //
    //  this.messagesService.setNewMessageNum(this.messagesService.newMessageNum-this.currentThread.newMessageNum);
    //  if(this.messagesService.newMessageNum == 0){
    //    this.messagesService.setHasNewMessage(false);
    //  }else{
    //    this.messagesService.setHasNewMessage(true);
    //  }
    //  this.currentThread.setNewMessageNum(0);
    //  this.threadsService.setIsOpenChat(false);
    //}
  }
}
