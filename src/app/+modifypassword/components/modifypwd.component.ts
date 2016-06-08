import  {Component} from '@angular/core';
import  {Router} from '@angular/router-deprecated';
import  {FORM_DIRECTIVES} from '@angular/common';
import  {User,UtilService} from '../../shared/index';
import {Response} from '@angular/http';
/**
 * Created by Ping on 2016/5/10.
 */
@Component( {
  selector: 'modify-password',
  providers: [UtilService],
  inputs:['user'],
  directives:[FORM_DIRECTIVES],
  template: require('app/+modifypassword/components/modifypwd.component.html')
})

export class ModifyPasswordComponent  {
  error:boolean = false;
  errorMsg:string;
  user:User;
  constructor(private router:Router, private _util:UtilService)  { }
  toLogin()  {
    this.router.parent.navigate(['Login']);
  }
  //发送并获取信息
  modifyPwd(form:any)  {
    if(form.password !== form.passwordConfirm) {
      this.errorMsg = '确认密码输入不一致！';
      this.error = true;
      setTimeout(() =>  {
        this.error = false;
      }, 3000);
    }else {
      this.user.password = form.password;
      this._util.mdfPassword(JSON.stringify(this.user)).subscribe((res:Response)=> {
        var data = res.json();
        if(data.status ==='1') { //修改成功
          alert('密码修改成功！');
          this.toLogin();
        }else {
          alert('密码修改失败！');
        }
      });
    }
    //alert('已发送至您的手机，请注意查收！');
    //this.toLogin();
  }
}
