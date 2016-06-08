import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {UtilService} from '../../shared/index';
import {User} from '../../shared/index';
import {AfterViewInit} from "@angular/core";
import {Response} from '@angular/http';
declare var jQuery:JQueryStatic;
/**
 * Created by Ping on 2016/5/10.
 */
@Component({
  selector: 'signup-box',
  providers: [UtilService],
  template: require('app/+signup/components/signup.component.html')
})

export class SignupComponent implements AfterViewInit{
  mobile:string; //发送短信的手机号
  //isDisabled:boolean = false;
  isRegistered:boolean =false;
  user:User;
  //message:string; //验证码信息
  errorMsg:string;//错误信息
  error:boolean; //是否错误
  agree:boolean; //同意条款
  vdcode:string; //接收到验证码
  constructor(private router:Router,private _util:UtilService) {
    this.user = new User();
    //this.message ='获取验证码';
    this.error = false;
  }
  ngAfterViewInit() {
    jQuery('.ui.checkbox')
      .checkbox();
  }
  //返回登陆页面
    toLogin() {
        this.router.parent.navigate(['Login']);
    }
  ////倒计时
  //countBack(){
  //  var i = 60;
  //  var intervalid = setInterval(()=>{
  //    i--;
  //    if(i>=1) {
  //      this.isDisabled = true; //将按钮变为禁止状态
  //      this.message = i+'秒';
  //    } else {
  //      this.isDisabled = false; //将按钮变为禁止状态
  //      this.message = '获取验证码';
  //      clearInterval(intervalid);
  //    }
  //  }, 1000);
  //}

  ////获取验证码
  //  getCode() {
  //    if(this.mobile){ //如果手机不为空
  //      alert('验证码已发送至您的手机，请注意查收！');
  //      this._util.getValidCode(this.mobile).subscribe((res:Response)=>{
  //        var data = res.json();
  //        if(data.status ==="0"){
  //          this.errorMsg = '该手机已注册！';
  //          this.error = true;
  //          setTimeout(() => {
  //            this.error = false;
  //          }, 10000);
  //          this.isRegistered = true;
  //        }else if(data.status ==="1"){
  //          this.vdcode = data.result;
  //        }
  //      });
  //      this.countBack();
  //    }else{
  //      alert("请输入您的手机号！")
  //    }
  //
  //  }
  //注册按钮
  register(form:any) {
     if(form.password !== form.passwordConfirm) {
      this.errorMsg = '确认密码输入不一致！';
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 10000);
    } else {
      if(form.account.contains("@")){
        //邮箱注册
        this.user.email = form.account;
        this.user.account = form.account;
        this.user.password = form.password;
        this.signup();
      }else if(form.account.length==11){
        let value = form.account
        if(parseInt(value)>10000000000){
          //手机注册
          this.user.phone = form.account;
          this.user.account = form.account;
          this.user.password = form.password;
          this.signup();
        }else{
          alert("请输入正确的手机号");
        }
      }else{
        alert("请输入正确的手机号或邮箱");
      }
    }
  }

  //注册请求
  signup(){
    this._util.signUp(JSON.stringify(this.user)).subscribe((res:Response)=>{
      var data = res.json();
      //console.log(data); //显示验证码
      if(data.status == "0"){
        this.errorMsg = '该账号已注册！';
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 10000);
      }else{
        alert(data.message);
        this.toLogin();
      }
    });
  }
}
