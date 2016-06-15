/**
 * Created by Ping on 2016/6/14.
 */
import {Component,EventEmitter } from '@angular/core';
import {History} from "../../shared/services/entity.service";
@Component({
  selector: 'dimmer-box',
  inputs: ['hs'], //父组件向子组件传递数据
  outputs: ['modal'],   //子组件向父组件传递数据 (传出流程-1)
  styles: [ `
    table tr{
      cursor: pointer;
      cursor: hand;
    }
    table tr:hover {
      background-color: #f2f2f2;
      color: #fff;
      cursor:hand;
    }
  ` ],
  template: `

      <table class="ui teal celled table">
      <thead>
      <tr>
        <th>文档类型{{isModal}}</th>
        <th>创建时间</th>
        <th>甲方名称</th>
        <th>甲方证件号</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.aNAME}}</td>
        <td>{{h.aIdNo}}</td>
      </tr>
      </tbody>
    </table>

  `
})
export class DimmerComponent {
  hs:History;
  modal:EventEmitter<History> = new EventEmitter<History>();
  send(h:History){
    this.modal.emit(h);
  }
}
