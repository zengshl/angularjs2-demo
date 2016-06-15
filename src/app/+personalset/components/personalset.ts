/**
 * Created by lenovo on 2016/6/2.
 */
import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {AfterViewInit} from "@angular/core";
import  {User,UserCompany} from '../../shared/index';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
//验证组件加载
import {FORM_DIRECTIVES} from '@angular/common';
import { Control, ControlGroup } from '@angular/common';
import { ValidationMessagesComponent } from 'ng2-validate/core';
import {EmailValidation, MobileValidation, PasswordValidation, PersonIdValidation} from "../../shared/index";

declare var jQuery:JQueryStatic;

@Component({
  selector: 'navbar-box',
  providers:[UtilService],
  directives: [FORM_DIRECTIVES,ValidationMessagesComponent],
  template: require('app/+personalset/components/personalset.html')
})
export class PersonalSetComponent implements AfterViewInit{
  private myForm: ControlGroup;
  private mobileControl: Control;
  //private emailControl: Control;

  user:User;
  company:UserCompany;

  ngAfterViewInit() {
    //jQuery('#leftMenu')
    //  .accordion();
    this.mobileControl = new Control('', new MobileValidation().validator);
    //this.emailControl = new Control('', new EmailValidation().validator);
    this.myForm = new ControlGroup({

      //emailControl: this.emailControl,
      mobileControl : this.mobileControl
    });
  }
  constructor(private router:Router,private _util:UtilService)  {
    this.user = new User();
    this.company = new UserCompany();
    if(sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.freshUser();
    }
  }



  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }

  choose(value:string){
    console.log(value);
  }

  updataUser(){
    this._util.updataUser(JSON.stringify(this.user)).subscribe((res:Response)=>{
      this.freshUser();
      if(res.json() !=0){
        alert("更新成功");
      }else{
        alert("更新失败");
      }
    });
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
}
