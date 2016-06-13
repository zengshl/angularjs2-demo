import {Component } from '@angular/core';
import {UtilService,Moudle} from "../../shared/index";
import {TermListComponent} from "./termlist.component";

@Component({
  selector: 'templateList-box',
  providers: [UtilService],
  directives:[TermListComponent],
  template: `
      <!-- 标题 -->
      <div  *ngFor = "let mds of moulds">
        <div class="row" style="margin:20px 0 20px 2px;">
          <h3>{{mds.moudleName}}</h3>
          <input type="text" [(ngModel)]="mds.id" style="display: none">
        </div>
        <!-- 文件列表 -->
        <div class="row">
          <div class="ui fluid vertical menu">
            <termlist [mould] = "mds"></termlist>
          </div>
        </div>
        <br><br>
      </div>
  `
})
export class TemplateListComponent{
  moulds:Array<Moudle> = new Array<Moudle>();


  constructor(private _util:UtilService){    //获取文件模板列表
    _util.getMould().subscribe((res)=>{
      this.moulds = <Moudle[]>res.json();
      //console.log(this.moulds);
    });
  }


}
