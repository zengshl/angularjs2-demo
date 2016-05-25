import  {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import  {FORM_DIRECTIVES} from '@angular/common';
import  {Http} from '@angular/http';
import  {User} from '../../shared/index'; //通过集中在index内，使得一个地址可以引用很多组件（用逗号隔开）
import {UtilService} from '../../shared/index';
import {AfterViewInit} from "@angular/core";
declare var jQuery:JQueryStatic;
/**
 * Created by Ping on 2016/5/10.
 */
@Component( {
  selector: 'login-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES],
  template: require('app/+login/components/login.component.html')
})

export class LoginComponent implements AfterViewInit {
  ngAfterViewInit() {
    jQuery('.ui.checkbox')
      .checkbox();
  }
  message:string; //提示信息
  error:boolean; //是否有错
  phone:string; //手机号输入框
  password:string; //密码输入框
  user:User;
  constructor(private router:Router,private http:Http,private _util:UtilService) {
    this.user = new User();
    //记住密码
    this.phone = localStorage.getItem('phone');
    this.password = localStorage.getItem('password');
    //如果用户已经登陆，自动跳转
    if(sessionStorage.getItem('user')) {
      //alert('已经登陆');
      this.router.parent.navigate(['FrontPage']);
    }
  }
  //去注册
  toSignup() {
    this.router.parent.navigate(['Signup']);
  }
  //忘记密码
  toForgot() {
    this.router.parent.navigate(['Forgot']);
  }
  //登陆
  login(form:any) {
    var isLogin = false;
    this.user.account = form.accountCtrl;
    this.user.password = form.pwdCtrl;
    this._util.logIn(JSON.stringify(this.user)).subscribe((res)=>{
      var data = res.json();
      if(data.status === '0'){
        this.message = '您所输入的用户名或密码不正确，请重新输入！';
        this.error = true;
        setTimeout(() =>  {
          this.error = false;
        }, 5000);
      }else if(data.status === '1'){ //登陆成功
        sessionStorage.setItem('user', JSON.stringify(data.reuslt));
        if (form.rmbCtrl)  { //是否记住密码
          localStorage.setItem('phone', form.accountCtrl);
          localStorage.setItem('password', form.pwdCtrl);
        } else  {
          localStorage.clear();
        }
        //alert('登陆成功');
        this.router.parent.navigate(['FrontPage']);
      }
     // console.log(data);
    });


  }
}
