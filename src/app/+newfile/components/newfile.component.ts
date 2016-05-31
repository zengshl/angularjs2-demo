import {Component} from '@angular/core';

@Component({
  selector: 'newfile-box',
  styles: [ require('app/+newfile/components/newfile.component.css') ],
  template: require('app/+newfile/components/newfile.component.html')
})
export class NewFileComponent {
  //问题显示开关
    showList:boolean = true;
    showPro:boolean = false;
    showQ1:boolean = false;
    showQ2:boolean = false;
    showQ3:boolean = false;
    showQ4:boolean = false;
    showQ41:boolean = false;
    showQ5:boolean = false;
  //问题的数据
    discloseToB:boolean = false;
    discloseToA:boolean = false;
  aLastName:string;
  aFirstName:string;
  bLastName:string;
  bFirstName:string;
  aCompanyName:string;
  bCompanyName:string;



}
