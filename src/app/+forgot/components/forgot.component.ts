import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {FORM_DIRECTIVES} from '@angular/common';
import {User,UtilService} from "../../shared/index";
import {ModifyPasswordComponent} from "../../+modifypassword/components/modifypwd.component";
import {Response} from '@angular/http';
/**
 * Created by Ping on 2016/5/10.
 */
@Component({
  selector: 'forgot-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES,ModifyPasswordComponent],
  template: require('app/+forgot/components/forgot.component.html')
})

export class ForgotComponent {
  mobile:string; //发送短信的手机号
  isDisabled:boolean = false;
  user:User;
  isNext:boolean = false; //是否下一步
  message:string; //验证码信息
  errorMsg:string;//错误信息
  error:boolean; //是否错误
  vdcode:string; //接收到验证码
  isRegistered:boolean = false; //手机未注册

  constructor(private router:Router, private _util:UtilService) {
    this.user = new User();
    this.message = '获取验证码';
    this.error = false;
  }

  //返回登陆页面
  toLogin() {
    this.router.parent.navigate(['Login']);
  }

  //倒计时
  countBack() {
    var i = 60;
    var intervalid:any;
    intervalid = setInterval(()=> {
      i--;
      if (i >= 1) {
        this.isDisabled = true; //将按钮变为禁止状态
        this.message = i + '秒';
      } else {
        this.isDisabled = false; //将按钮变为禁止状态
        this.message = '获取验证码';
        clearInterval(intervalid);
      }
    }, 1000);
  }

  //获取验证码
  getCode() {
    if (this.mobile) { //如果手机不为空
      alert('验证码已发送至您的手机，请注意查收！');
      this._util.getValidCodeForgot(this.mobile).subscribe((res:Response)=> {
        var data = res.json();
        if (data.status === "0") {
          this.errorMsg = '该手机未注册！';
          this.error = true;
          this.isRegistered = false;
          setTimeout(() => {
            this.error = false;
          }, 8000);
        } else if (data.status === "1") {
          this.vdcode = data.result;
          this.isRegistered = true;
        }
      });
      this.countBack();
    } else {
      alert("请输入您的手机号！")
    }

  }

  //下一步
  recallPwd(form:any) {
    if (!this.isRegistered) {
      this.errorMsg = '该手机未注册！';
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    } else if (form.validCode !== this.vdcode) {
      this.errorMsg = '验证码有误！';
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    } else { //进入下一步
      this.user.phone = form.phone;
      this.isNext = true;
    }
  }
}
