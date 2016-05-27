var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var index_1 = require('../+login/index');
var index_2 = require('../+signup/index');
var index_3 = require('../+forgot/index');
var router_deprecated_2 = require('@angular/router-deprecated');
var index_4 = require("../+frontpage/index");
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
var index_5 = require("../+admin/index");
var AppComponent = (function () {
    //isChatShow:boolean = false;//聊天控制
    //hasMessage:boolean = false;
    //currentThread:Thread;
    //newMessageNum:number = 0;
    function AppComponent(router) {
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
        this.router = router;
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
    AppComponent = __decorate([
        core_1.Component({
            selector: 'sd-app',
            templateUrl: 'app/components/app.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/login/...',
                name: 'Login',
                component: index_1.LoginComponent
            },
            //{
            //  path: '/',  //用这种方法，可以默认一个路由为开始路由
            //  name: 'Demo',
            //  component: DemoComponent
            //},
            {
                path: '/...',
                name: 'FrontPage',
                component: index_4.FrontPageComponent,
                useAsDefault: true
            },
            {
                path: '/register',
                name: 'Signup',
                component: index_2.SignupComponent
            },
            {
                path: '/forgot',
                name: 'Forgot',
                component: index_3.ForgotComponent
            },
            {
                path: '/admin/...',
                name: 'Admin',
                component: index_5.AdminComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_2.Router])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map