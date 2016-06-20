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

  user:User;
  company:UserCompany;
  showbase:boolean = true;
  showvalidate:boolean = false;
  showcompany:boolean = false;
  //步骤
  step1:string = 'active';
  step2:string = '';
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

  updataUser(){
    if(this.myForm.valid){
      this._util.updataUser(JSON.stringify(this.user)).subscribe((res:Response)=>{
        this.freshUser();
        if(res.json() !=0){
          alert("更新成功");
        }else{
          alert("更新失败");
        }
      });
    }else{
      console.log('请完善必填信息');
    }
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
      this.step2 = "";
      this.step3 = "";
      this.showbase = true;
      this.showvalidate = false;
      this.showcompany = false;
    }else if(step == 'step2'){
      this.step1 = "";
      this.step2 = "active";
      this.step3 = "";
      this.showbase = false;
      this.showvalidate = true;
      this.showcompany = false;
    }else{
      this.step1 = "";
      this.step2 = "";
      this.step3 = "active";
      this.showbase = false;
      this.showvalidate = false;
      this.showcompany = true;
    }
  }
}
