/**
 * Created by Ping on 2016/6/14.
 */
import {Component,EventEmitter } from '@angular/core';
import {History} from "../../shared/services/entity.service";
@Component({
  selector: 'dimmer-box',
  inputs: ['hs','flag'], //父组件向子组件传递数据
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
     <!-- 主体信息，用require的话，可能会导致延迟 -->
     <table class="ui teal celled table" *ngIf = "flag == 'a' ">
      <thead>
      <tr>
        <th>文档类型</th>
        <th>创建时间</th>
        <th>甲方名称</th>
        <th>甲方证件号</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.aName}}</td>
        <td>{{h.aIdNo}}</td>
      </tr>
      </tbody>
    </table>
    <table class="ui teal celled table" *ngIf = "flag == 'b' ">
      <thead>
      <tr>
        <th>文档类型</th>
        <th>创建时间</th>
        <th>乙方名称</th>
        <th>乙方证件号</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.bName}}</td>
        <td>{{h.bIdNo}}</td>
      </tr>
      </tbody>
    </table>

    <!-- 联系信息 -->
     <table class="ui teal celled table" *ngIf = "flag == 'ac' ">
      <thead>
      <tr>
        <th>文档类型</th>
        <th>创建时间</th>
        <th>甲方联系人名字</th>
        <th>甲方手机号</th>
        <th>甲方邮箱</th>
        <th>甲方传真号</th>
        <th>甲方地址</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.aContactName}}</td>
        <td>{{h.aContactPhone}}</td>
        <td>{{h.aContactEmail}}</td>
        <td>{{h.aContactFax}}</td>
        <td>{{h.aContactAddress}}</td>
      </tr>
      </tbody>
    </table>
    <table class="ui teal celled table" *ngIf = "flag == 'bc' ">
      <thead>
      <tr>
        <th>文档类型</th>
        <th>创建时间</th>
        <th>乙方联系人名字</th>
        <th>乙方手机号</th>
        <th>乙方邮箱</th>
        <th>乙方传真号</th>
        <th>乙方地址</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.bContactName}}</td>
        <td>{{h.bContactPhone}}</td>
        <td>{{h.bContactEmail}}</td>
        <td>{{h.bContactFax}}</td>
        <td>{{h.bContactAddress}}</td>
      </tr>
      </tbody>
    </table>

    <!-- 签名信息 -->
     <table class="ui teal celled table" *ngIf = "flag == 'as' ">
      <thead>
      <tr>
        <th>文档类型</th>
        <th>创建时间</th>
        <th>甲方签名人</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.aSiger}}</td>
      </tr>
      </tbody>
    </table>
    <table class="ui teal celled table" *ngIf = "flag == 'bs' ">
      <thead>
      <tr>
        <th>文档类型</th>
        <th>创建时间</th>
        <th>乙方签名人</th>
      </tr>
      </thead>
      <tbody *ngFor = "let h of hs">
        <tr  (click)="send(h)">
        <td>{{h.typeName}}</td>
        <td>{{h.createTime}}</td>
        <td>{{h.bSiger}}</td>
      </tr>
      </tbody>
    </table>

  `
})
export class DimmerComponent {
  hs:History;
  flag: string;
  modal:EventEmitter<History> = new EventEmitter<History>();
  send(h:History){
    this.modal.emit(h);
  }
}
