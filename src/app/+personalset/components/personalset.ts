/**
 * Created by lenovo on 2016/6/2.
 */
import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {AfterViewInit} from "@angular/core";
import  {User,UserCompany} from '../../shared/index';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
////验证组件加载
import {FORM_DIRECTIVES} from '@angular/common';
import { Control, ControlGroup } from '@angular/common';
import { ValidationMessagesComponent } from 'ng2-validate/core';
import {EmailValidation, MobileValidation, PasswordValidation, PersonIdValidation} from "../../shared/index";


declare var jQuery:JQueryStatic;

@Component({
  selector: 'personal-set',
  providers:[UtilService],
  directives: [FORM_DIRECTIVES,ValidationMessagesComponent],
  template: require('app/+personalset/components/personalset.html')
})
export class PersonalSetComponent implements AfterViewInit{
  private myForm: ControlGroup;
  private emailControl: Control;
  private mobileControl: Control;
  private isValid:boolean;
  newPhone = "";
  newEmail = "";
  isPhoneRegistered = false;
  isEmailRegistered = false;

  user_phone_code = "";
  user_email_code = "";
  get_phone_code = "";
  get_email_code = ""

  firstPSD = "";
  secondPSD = "";

  user:User;
  company:UserCompany;
  showbase:boolean = true;
  showvalidate:boolean = false;
  showcompany:boolean = false;
  //步骤
  step1:string = 'active';
  //step2:string = '';
  step3:string = '';

  ngAfterViewInit() {

  }

  constructor(private router:Router,private _util:UtilService)  {
    this.user = new User();
    this.company = new UserCompany();
    if(sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.freshUser();
    }
    this.emailControl = new Control('', new EmailValidation().validator);
    this.mobileControl = new Control('', new MobileValidation().validator);
    //this.passwordControl = new Control('', new PasswordValidation().validator);
    //this.personidControl = new Control('', new PersonIdValidation().validator);
    this.myForm = new ControlGroup({
      emailControl: this.emailControl,
      mobileControl : this.mobileControl
      //passwordControl: this.passwordControl,
      //personidControl : this.personidControl
    });
  }

  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }

  choose(value:string){
      console.log('value');
  }


  //modify by zengshl 需要公司的信息也一起更新下

  updataUser(){
    //if(this.myForm.valid){

      //添加公司的信息处理
      let  updateData = {};
      updateData.user = this.user;
      updateData.company = this.company;
      updateData.companyId = this.company.id;
      console.log(JSON.stringify(updateData));
      this._util.updataUser(JSON.stringify(updateData)).subscribe((res:Response)=>{
        this.freshUser();
        if(res.json() !=0){
          swal("更新成功！", "", "success");
        }else{
          swal("更新失败!", "", "error");
        }
      });
    //}else{
    //  console.log('请完善必填信息');
    //}
  }

  //刷新数据
  freshUser(){
    this._util.getUserById(this.user.id).subscribe((resp:Response)=>{
      this.user = resp.json().data;
      if(resp.json().company != null){
        this.company = resp.json().company
      }
    });
  }

  stepClick(step:string){
    console.log(step);
    //event.target.style.background = 'LightBLue';
    if(step == 'step1'){
      this.step1 = "active";
      //this.step2 = "";
      this.step3 = "";
      this.showbase = true;
      this.showvalidate = false;
      this.showcompany = false;
    }
    else{
      this.step1 = "";
      //this.step2 = "";
      this.step3 = "active";
      this.showbase = false;
      this.showvalidate = false;
      this.showcompany = true;
    }
  }

  getEmailCode(){
    if(this.newEmail == ""){
      swal("请输入新邮箱","",'error');
    }
    else{
      let codeUser = new User();
      codeUser.email = this.newEmail;
      this._util.getgetValidChangeMdPassword(JSON.stringify(codeUser)).subscribe((res:Response)=> {
        var data = res.json();
        if (data.status === "0") {
          this.isEmailRegistered = false;
          swal("修改失败","该邮箱不存在或已被使用！",'error');

        } else if (data.status === "1") {
          swal("验证码已发送至您的邮箱，请注意查收！", "", "success");
          this.get_phone_code = data.result;
          this.isEmailRegistered = true;
        }
      });
      this.countBack();
    }
  }

  getPhoneCode(){
    if(this.newPhone == ""){
      swal("请输入新手机","",'error');
    }
    else{
    let codeUser = new User();
    codeUser.phone = this.newPhone;
    this._util.getgetValidChangeMdPassword(JSON.stringify(codeUser)).subscribe((res:Response)=> {
      var data = res.json();
      if (data.status === "0") {
        this.isPhoneRegistered = false;
        swal("修改失败","该手机号不存在或已被使用！",'error');

      } else if (data.status === "1") {
        swal("验证码已发送至您的手机，请注意查收！", "", "success");
        this.get_email_code = data.result;
        this.isPhoneRegistered = true;
      }
    });
    this.countBack();
    }
  }

  changePhone(){
    if(!isPhoneRegistered){
      swal("请先对新手机号进行验证","","error");
    }else{
      if(user_phone_code == ''){
        swal("请输入验证码","","error");
      }else if(user_phone_code != get_phone_code){
        swal("验证码错误","","error");
      }else{
        //修改用户的手机
        //添加公司的信息处理
        let  updateData = {};
        this.user.phone = this.newPhone;
        updateData.user = this.user;
        updateData.company = this.company;
        updateData.companyId = this.company.id;
        this._util.updataUser(JSON.stringify(updateData)).subscribe((res:Response)=>{
          this.freshUser();
          if(res.json() !=0){
            swal("更新成功！", "", "success");
          }else{
            swal("更新失败!", "", "error");
          }
        });
      }
    }
  }

  changeEmail(){

    if(!isEmailRegistered){
      swal("请先对新邮箱进行验证","","error");
    }else{
      if(user_email_code == ''){
        swal("请输入验证码","","error");
      }else if(user_email_code != get_email_code){
        swal("验证码错误","","error");
      }else{
        //修改用户的手机
        let  updateData = {};
        this.user.email = this.newEmail;
        updateData.user = this.user;
        updateData.company = this.company;
        updateData.companyId = this.company.id;
        this._util.updataUser(JSON.stringify(updateData)).subscribe((res:Response)=>{
          this.freshUser();
          if(res.json() !=0){
            swal("更新成功！", "", "success");
          }else{
            swal("更新失败!", "", "error");
          }
        });
      }
    }
  }

  //倒计时
  countBack() {
    //var i = 60;
    //var intervalid:any;
    //intervalid = setInterval(()=> {
    //  i--;
    //  if (i >= 1) {
    //    this.isDisabled = true; //将按钮变为禁止状态
    //    this.message = i + '秒';
    //  } else {
    //    this.isDisabled = false; //将按钮变为禁止状态
    //    this.message = '获取验证码';
    //    clearInterval(intervalid);
    //  }
    //}, 1000);
  }

  changePSD(){
    if(this.firstPSD == "" || this.secondPSD == ""){
      swal("新密码不能为空","","error");
    }else if(this.firstPSD != this.secondPSD){
      swal("两次新密码不一致","","success")
    }else{
      this.user.password = this.firstPSD;
      this._util.updataPSD(JSON.stringify(this.user)).subscribe((res:Response)=> {
        var data = res.json();
        if(data > 0) { //修改成功
          swal("密码修改成功！", "", "success");
        }else {
          swal("密码修改失败!", "", "error");
        }
      });
    }
  }
}
