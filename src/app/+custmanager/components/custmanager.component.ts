import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {PageData,UserCompany} from "../../shared/services/entity.service";
import {Router} from '@angular/router-deprecated';

declare var jQuery:JQueryStatic;

@Component({
  selector: 'custmanager-box',
  providers:[UtilService],
  directives: [DataTableDirectives],
  styles: [ require('app/+custmanager/components/custmanager.component.css') ],
  template: require('app/+custmanager/components/custmanager.component.html')
})
export class CustmanagerComponent {

  private data: any ;
  private pdata :PageData;
  private tableShow:boolean = true
  private company : UserCompany;
  isInsert:boolean = false;
  userSearch:string = "";

  constructor(private _util:UtilService,private router:Router){
    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1 ;
    this.pdata.iDisplayLength = 8;
    this.company = new UserCompany();
    this.pdata.searchData = {"userName":this.userSearch};
    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getUser(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });

  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {"userName":this.userSearch};
    this._util.getUser(JSON.stringify(ds)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }
//查询
  filter(){
    this.updataTable();
  }
  //表格刷新
  updataTable(){
    this.pdata.searchData = {"userName":this.userSearch};
    this._util.getUser(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
      this.tableShow = true;
    });
  }
//点击每一行表格
  clickItem(item:any){
    console.log(item);
    this.company = new UserCompany();
    this._util.getUserById(parseInt(item.id)).subscribe((res:Response)=>{
      if(res.json().company!=null){
        this.company = res.json().company;
      }
    });
  }
}
