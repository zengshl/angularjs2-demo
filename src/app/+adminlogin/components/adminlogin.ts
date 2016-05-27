import  {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import  {FORM_DIRECTIVES} from '@angular/common';
import  {Http} from '@angular/http';
import  {Admin} from '../../shared/index'; //通过集中在index内，使得一个地址可以引用很多组件（用逗号隔开）
import {UtilService} from '../../shared/index';
import {AfterViewInit} from "@angular/core";
declare var jQuery:JQueryStatic;
/**
 * Created by wss on 2016/5/25.
 */
@Component( {
  selector: 'adminlogin-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES],
  template: require('app/+adminlogin/components/adminlogin.html')
})

export class AdminLoginComponent implements AfterViewInit {
  ngAfterViewInit() {
    jQuery('.ui.checkbox')
      .checkbox();
  }
  message:string; //提示信息
  error:boolean; //是否有错
  account:string; //账号输入框
  password:string; //密码输入框
  admin:Admin;
  constructor(private router:Router,private http:Http,private _util:UtilService) {
    this.admin = new Admin();
    //记住密码
    this.account = localStorage.getItem('adminAccount');
    this.password = localStorage.getItem('adminPassword');
    //如果用户已经登陆，自动跳转
    if(sessionStorage.getItem('admin')) {
      //alert('已经登陆');
      //this.router.parent.navigate(['Admin']);
    }
  }
  //登陆
  login(form:any) {
    var isLogin = false;
    this.admin.account = form.accountCtrl;
    this.admin.password = form.pwdCtrl;
    this._util.adminLogin(JSON.stringify(this.admin)).subscribe((res)=>{
      console.log(res.json());
      var data = res.json();
      if(data.data.status === '0'){
        console.log("失败");
        this.message = '您所输入的用户名或密码不正确，请重新输入！';
        this.error = true;
        setTimeout(() =>  {
          this.error = false;
        }, 5000);
      }else if(data.data.status === '1'){ //登陆成功
        console.log("成功");
        sessionStorage.setItem('admin', JSON.stringify(data.data.user));
        if (form.rmbCtrl)  { //是否记住密码
          localStorage.setItem('adminAccount', form.accountCtrl);
          localStorage.setItem('adminPassword', form.pwdCtrl);
        } else  {
          localStorage.clear();
        }
        //alert('登陆成功');
        this.router.parent.navigate(['Admin']);
      }
    });


  }
}
