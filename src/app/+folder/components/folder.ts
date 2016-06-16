/**
 * Created by lenovo on 2016/5/24.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {PageData,Role,Menu,Power} from "../../shared/services/entity.service";
import {Router,RouteParams} from '@angular/router-deprecated';
declare var jQuery:JQueryStatic;


@Component({
  selector: 'doc_folder',
  providers:[UtilService],
  directives: [DataTableDirectives],
  styles: [ require('app/+folder/components/folder.css')],
  template: require('app/+folder/components/folder.html')
})

export class FolderComponent implements AfterViewInit{
  ngAfterViewInit() {

  }
  private data: any ;
  private pdata :PageData;
  private tableShow:boolean = true

  isInsert:boolean = false;
  nameSearch:string = "";
  userSearch:string = "";
  phoneSearch:string = "";

  userId = "";
  canBack:boolean = true;

  constructor(private _util:UtilService,private rooteParmas:RouteParams,private router:Router){

    this.userId = rooteParmas.get("userId");
    if(this.userId == "0"){
      this.canBack = false;
    }
    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1;
    this.pdata.iDisplayLength = 10;

    this.pdata.searchData = {"userId":this.userId,"userName":this.userSearch,"fileName":this.nameSearch,"phone":this.phoneSearch};
    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getFolderList(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });

  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {"userId":this.userId,"userName":this.userSearch,"fileName":this.nameSearch,"phone":this.phoneSearch};
    this._util.getFolderList(JSON.stringify(ds)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }
//查询
  filter(){
    this.updataTable();
  }
  //表格刷新
  updataTable(){
    this.pdata.searchData = {"userId":this.userId,"userName":this.userSearch,"fileName":this.nameSearch,"phone":this.phoneSearch};
    this._util.getFolderList(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
      this.tableShow = true;
    });
  }
//点击每一行表格
  clickItem(item:any){
    this.router.parent.navigate(['Document',{"userId":item.userId,"folderId":item.id},]);
  }

  back(){
    this.router.parent.navigate(['Custmanager']);
  }
}
