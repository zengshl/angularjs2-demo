import {Component } from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {ConfidTemplateComponent} from "../../+template/index";
import {BlankComponent} from "../../+blank/components/blank.component";
import {TemplateListComponent} from "./templatelist.component";
import {ShareTransferComponent} from "../../+sharetransfer/index";

@Component({
  selector: 'newfile-box',
  directives:[ROUTER_DIRECTIVES],
  styles: [ require('app/+newfile/components/newfile.component.css') ],
  template: require('app/+newfile/components/newfile.component.html')
})
@RouteConfig([
  {
    path: '/',  //模板列表
    name: 'TemplateList',
    component: TemplateListComponent,
    useAsDefault: true
  },
  {
    path: '/confid',  //保密协议
    name: 'ConfidTemplate',
    component: ConfidTemplateComponent
  },
  {
    path: '/sharetransfer',  //股权转让
    name: 'ShareTransfer',
    component: ShareTransferComponent
  }

])
export class NewFileComponent{
  constructor(private router:Router)  {}
  nav(name:string){
    this.router.parent.navigate([name]);
  }
}
