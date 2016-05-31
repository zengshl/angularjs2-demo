/**
 * Created by lenovo on 2016/5/30.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {PageData,Moudle,Doctype} from "../../shared/services/entity.service";

//import {AddSysMoudleComponent} from "../../+addsysmoudle/components/addsysmoudle";

declare var jQuery:JQueryStatic;


@Component({
  selector: 'sys_moudle',
  providers:[UtilService],
  directives: [DataTableDirectives],
  styles: [ require('app/+sysmoudle/components/sysmoudle.css')],
  template: require('app/+sysmoudle/components/sysmoudle.html')
})
export class SysMoudleComponent implements AfterViewInit{
  ngAfterViewInit() {

  }
  private data: any ;
  private attrData :any = {"data":[],page:0,size:0};
  private pdata :PageData;
  private tableShow:boolean = true
  private curMoudle:Moudle;
  private types:Array<Doctype>;
  private addType:Doctype;


  isInsert:boolean = false;
  addAttr:boolean = false;
  nameSearch:string = "";


  constructor(private _util:UtilService,private router:Router){
    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1;
    this.pdata.iDisplayLength = 3;
    this.curMoudle = new Moudle();
    this.types = new Array<Doctype>();

    this.pdata.searchData = {"moudleName":this.nameSearch}
    //实例化用户对象

    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getMoudle(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {"moudleName":this.nameSearch}
    this._util.getMoudle(JSON.stringify(ds)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }

  //删除角色
  deleteData(role:any){
    this._util.deleteMoudle(JSON.stringify(role)).subscribe((res:Response)=>{

      let getdata = res.json();
      this.updataTable();
    });
  }

  //获取详细信息
  updataData(role:any){
    this._util.getMoudleInfo(JSON.stringify(role)).subscribe((res:Response)=>{
      let getdata = res.json();
      this.curMoudle = getdata.data;
      this.types = getdata.types;
      this.attrData.data = this.types;
      this.attrData.page = 1;
      this.attrData.size = this.types.length;

      this.tableShow = false;
      this.isInsert = false;
    });
  }

  //返回列表界面
  backTo(){
    this.curMoudle = new Moudle();
    this.types = new Array<Doctype>();
    this.tableShow = true;
  }


  //更新模板信息
  updataMoudle(){
    var data = {"isInsert":this.isInsert,"moudle":this.curMoudle,"types": this.types};
    this._util.updataMoudleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
      let data = res.json();
      this.updataTable();

    });
  }

  //重置表单
  resetMoudle(){
    this.curMoudle = new Moudle();
    this.types = new Array<Doctype>();
  }

  //查询
  filter(){
    this.pdata.searchData = {"moudleName":this.nameSearch}
    this.updataTable();
  }

  //调整到新增界面
  insert(){
    this.isInsert = true;
    this.tableShow = false;
    this.resetMoudle();
  }
  //新增模板信息
  insertMoudle(){
      var data = {"isInsert":this.isInsert,"moudle":this.curMoudle,"types": this.types};
      this._util.insertMoudleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        this.updataTable();
      });
  }

  //表格刷新
  updataTable(){
    this.types = new Array<Doctype>();
    this.attrData.data = this.types;
    this.attrData.page = 1;
    this.attrData.size = this.types.length;
    this.pdata.searchData = {"moudleName":this.nameSearch}
      this._util.getMoudle(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
        this.tableShow = true;
    });
  }

  mouseenter(event:any,item:any){
    console.log(event+","+item);
  }

  //跳转到增加模板属性界面
  insertType(){
    this.addAttr = true;
    this.addType = new Doctype();
  }
  //返回模板信息界面
  goback(){
    this.addAttr = false;
  }
  //新增模板属性
  insertAttrData(){
    this.types.push(this.addType);
    this.attrData.data = this.types;
    this.attrData.page = 1;
    this.attrData.size = this.types.length;
    this.addAttr = false;
  }
  //重置模板属性
  resetAttr(){
    this.addType = new Doctype();
  }

  //点击每一行表格
  clickItem(item:any){
    console.log(item);
    this.router.parent.navigate(['Template',{"typeId":item.id}]);
  }
}
