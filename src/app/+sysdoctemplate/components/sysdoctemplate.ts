/**
 * Created by lenovo on 2016/5/24.
 */
/**
 * Created by lenovo on 2016/5/20.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {PageData,DocTemplate} from "../../shared/services/entity.service";
import {RouteParams,Router} from '@angular/router-deprecated';
declare var jQuery:JQueryStatic;


@Component({
  selector: 'sys_doc_template',
  providers:[UtilService],
  directives: [DataTableDirectives],
  template: require('app/+sysdoctemplate/components/sysdoctemplate.html')
})

export class SysDocTemplateComponent implements AfterViewInit{
  ngAfterViewInit() {

  }
  private data: any ;
  private pdata :PageData;
  private tableShow:boolean = true

  isInsert:boolean = false;
  nameSearch:string = "";
  pathSearch:string = "";
  typeId:number = 0;

  private curDoc :DocTemplate;

  constructor(private _util:UtilService,private rooteParmas:RouteParams,private router:Router){
    //实例化分页对象

    this.typeId = rooteParmas.get("typeId");

    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 0;
    this.pdata.iDisplayLength = 10;

    this.curDoc = new DocTemplate();
    this.pdata.searchData = {"resourceName":this.nameSearch,"resourcePath":this.pathSearch,"typeId":this.typeId+""};
    _util.getDocTemplate(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();

    });

  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    this.pdata.searchData = {"resourceName":this.nameSearch,"resourcePath":this.pathSearch,"typeId":this.typeId+""};
    this._util.getDocTemplate(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }

  //查询
  filter(){
    this.updataTable();
  }

  //表格刷新
  updataTable(){
    this.pdata.searchData = {"resourceName":this.nameSearch,"resourcePath":this.pathSearch,"typeId":this.typeId+""};
    this._util.getDocTemplate(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
      this.tableShow = true;
    });
  }

  back(){
    this.router.parent.navigate(['Moudle']);
  }
//跳转到新增界面
  insert(){
    this.isInsert = true;
    this.tableShow = false;
    this.curDoc = new DocTemplate();
  }

  //新增资源模板信息
  insertDoc(){
      this.curDoc.typeId = this.typeId;
      var data = {'isInsert':this.isInsert,'temp':this.curDoc};
      this._util.insertTemplateInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        let data = res.json();
        this.updataTable();
      });
  }

  //重置表单
  resetDoc(){
    this.curDoc = new DocTemplate();
  }

  //更新资源模板信息
  updataDoc(){
    var data = {'isInsert':this.isInsert,'temp':this.curDoc};
    this._util.updataTemplateInfo(JSON.stringify(data)).subscribe((res:Response)=>{
      let data = res.json();
      this.updataTable();

    });
  }

  //获取详细信息
  updataData(user:any){
    this._util.getTemplateInfo(JSON.stringify(user)).subscribe((res:Response)=>{
      let getdata = res.json();
      this.curDoc = getdata.data;
      this.tableShow = false;
      this.isInsert = false;
    });
  }

  //删除资源模板信息
  deleteData(temp:any){
    this._util.deleteTemplate(JSON.stringify(temp)).subscribe((res:Response)=>{

      let getdata = res.json();
      this.updataTable();
    });
  }

  //返回列表界面
  backTo(){
    this.curDoc = new DocTemplate();
    this.tableShow = true;
  }
}
