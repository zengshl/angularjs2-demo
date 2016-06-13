import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare var jQuery:JQueryStatic;

@Component({
  selector: 'addsysuser-box',
  styles: [ require('app/+addsysuser/components/addsysuser.component.css') ],
  template: require('app/+addsysuser/components/addsysuser.component.html')
})
export class AddSysUserComponent implements AfterViewInit{
  ngAfterViewInit() {
    jQuery('#datetimepicker').datetimepicker({
      format: 'yyyy-mm-dd',
      language:  'zh-CN',
      autoclose: true,
      minView:1,
      todayBtn: true
    });

  }
  constructor(){
    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
  }
}
