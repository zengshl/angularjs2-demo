import { Component, OnInit } from '@angular/core';
import { Control, ControlGroup } from '@angular/common';
import { ValidationMessagesComponent } from 'ng2-validate/core';
import {EmailValidation, MobileValidation, PasswordValidation, PersonIdValidation} from "../../shared/index";
import {AfterViewInit} from "angular2-datatable/_node_modules/@angular/core/esm/src/metadata/lifecycle_hooks";
import {UtilService,LawCategory} from "../../shared/index";

declare var jQuery:JQueryStatic;

@Component({
  selector: 'demo-box',
  providers:[UtilService],
  styles: [ require('app/+demo/components/demo.component.css') ],
  template: require('app/+demo/components/demo.component.html')
})
export class DemoComponent implements AfterViewInit{
  errorMessage:string;
  lawCategory:LawCategory[] = [];

  ngAfterViewInit(){
    jQuery("#selected").dropdown(); //通过这种方式，可以直接实现semantic的dropdown效果；
    // jQuery("#selected").dropdown({
    //     action: 'hide',
    //     onChange: function(value, text, $selectedItem) {
    //         jQuery("#dataHide").val(value);
    //         console.log(jQuery("#dataHide").val())
    //     }
    // })
  }

  constructor(private _util:UtilService){
    _util.getLawCategory().subscribe((res)=>{
      this.lawCategory = <LawCategory[]>res.json();
    })

  }

    //console.log(data);
  onItemChange(value:string){
    console.log(parseInt(value));
  }


}



