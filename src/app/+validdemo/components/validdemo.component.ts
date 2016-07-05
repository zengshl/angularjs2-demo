import { Component, OnInit } from '@angular/core';
import { Control, ControlGroup } from '@angular/common';
import { ValidationMessagesComponent } from 'ng2-validate/core';
import {EmailValidation, MobileValidation, PasswordValidation, PersonIdValidation} from "../../shared/index";
import {CHECKBOX_DIRECTIVES,TAB_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

declare var jQuery:JQueryStatic;

@Component({
  selector: 'validdemo-box',
  directives: [ValidationMessagesComponent,CHECKBOX_DIRECTIVES,TAB_DIRECTIVES],
  styles: [ require('app/+validdemo/components/validdemo.component.css') ],
  template: require('app/+validdemo/components/validdemo.component.html')
})
export class ValidDemoComponent implements OnInit{
  private myForm: ControlGroup;
  private emailControl: Control;
  private mobileControl: Control;
  private passwordControl: Control;
  private personidControl: Control;

  private email: string;
  private mobile: string;
  private password: string;
  private personid: string;

  private isValid:boolean;

  eRadio = "hello";

  public ngOnInit(): void {
    this.emailControl = new Control('', new EmailValidation().validator);
    this.mobileControl = new Control('', new MobileValidation().validator);
    this.passwordControl = new Control('', new PasswordValidation().validator);
    this.personidControl = new Control('', new PersonIdValidation().validator);
    this.myForm = new ControlGroup({
      emailControl: this.emailControl,
      mobileControl : this.mobileControl,
      passwordControl: this.passwordControl,
      personidControl : this.personidControl
    });

  }
check(){
  console.log(this.emailControl.valid);
}

login(){
  console.log(this.myForm.valid);
}

  alert(){
    swal("你点击了弹窗页面","","success");
  }


}



