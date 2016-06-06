/**
 * Created by lenovo on 2016/5/30.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {PageData,Moudle,Doctype,DocTemplate} from "../../shared/services/entity.service";

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

    jQuery('#text').dropdown();
    //jQuery('.ui.fluid.search.dropdown').dropdown();
  }
  private data: any ;
  private attrData :any = {"data":[],page:0,size:0};
  private pdata :PageData;
  private tableShow:boolean = true
  private curType:Doctype;
  private temps:Array<DocTemplate>;
  private addTemp:DocTemplate;
  private allMoudle:Array<Moudle>;
  private curMoudle:Moudle;



  isInsert:boolean = false;
  isAttrInsert:boolean = false;
  addAttr:boolean = false;
  isAddTypeMoudle:boolean = false;
  typeSearch:string = "";


  constructor(private _util:UtilService,private router:Router){
    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1;
    this.pdata.iDisplayLength = 10;
    this.curType = new Doctype();
    this.temps = new Array<DocTemplate>();
    this.allMoudle = new Array<Moudle>();
    this.curMoudle = new Moudle();
    this.pdata.searchData = {"moudleName":this.typeSearch}
    //实例化用户对象

    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getMoudle(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });

    this.getAllMoudle();
  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {"typeName":this.typeSearch}
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
  updataData(doctype:any){

    //由于返回的数据是map（string，string）类型，所以需要对number类型的数据进行处理
    let id = doctype.id;
    let preId = doctype.preId;
    let moudleId = doctype.moudleId;
    doctype.id = parseInt(id);
    doctype.preId = parseInt(preId);
    doctype.moudleId = parseInt(moudleId);

    this._util.getMoudleInfo(JSON.stringify(doctype)).subscribe((res:Response)=>{
      let getdata = res.json();
      this.curType = getdata.data;
      this.temps = getdata.temp;
      this.attrData.data = this.temps;
      this.attrData.page = 1;
      this.attrData.size = this.temps.length;

      this.tableShow = false;
      this.isInsert = false;
    });
  }

  //返回列表界面
  backTo(){
    this.curType = new Doctype();
    this.temps = new Array<DocTemplate>();
    this.tableShow = true;
    this.updataTable();
  }


  //更新模板信息
  updataMoudle(){
    //对数据进行处理
    let moudleId = jQuery("#moudleId").val();
    this.curType.moudleId = parseInt(moudleId);
    var data = {"isInsert":this.isInsert,"type":this.curType,"temp": this.temps};
    this._util.updataMoudleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
      let data = res.json();
      this.updataTable();

    });
  }

  //重置表单
  resetMoudle(){
    this.curType = new Doctype();
    this.temps = new Array<DocTemplate>();
  }

  //查询
  filter(){
    this.pdata.searchData = {"typeName":this.typeSearch}
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
    //对数据进行处理
      let moudleId = jQuery("#moudleId").val();
      this.curType.moudleId = parseInt(moudleId);
      var data = {"isInsert":this.isInsert,"type":this.curType,"temp": this.temps};
      this._util.insertMoudleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        this.updataTable();
      });
  }

  //表格刷新
  updataTable(){
    this.temps = new Array<DocTemplate>();
    this.attrData.data = this.temps;
    this.attrData.page = 1;
    this.attrData.size = this.temps.length;
    this.pdata.searchData = {"typeName":this.typeSearch}
      this._util.getMoudle(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
        this.tableShow = true;
    });
  }

  mouseenter(event:any,item:any){
    //console.log(event+","+item);
  }

  //跳转到增加模板属性界面
  insertTemp(){
    this.addAttr = true;
    this.addTemp = new DocTemplate();
    this.isAttrInsert = true;
  }
  //返回模板信息界面
  goback(){
    this.addAttr = false;
  }
  //新增类型模板
  insertAttrData(){
    this.temps.push(this.addTemp);
    this.updataAttrData();
  }
  //重置模板属性
  resetAttr(){
    this.addTemp = new DocTemplate();
  }

  updataAttr(item:any){
    this.addAttr = true;
    this.addTemp = item;
    this.isAttrInsert = false;
  }

  updataAttrData(){
    this.attrData.data = this.temps;
    this.attrData.page = 1;
    this.attrData.size = this.temps.length;
    this.addAttr = false;
  }
//获取全部模块
  getAllMoudle(){
    this._util.getAllMoudle().subscribe((res:Response)=>{
      this.allMoudle = res.json();
    });
  }
//跳转到添加模块界面
  insertTypeMoudle(){
    this.isAddTypeMoudle = true;
    this.curMoudle = new Moudle();
  }

  //新增模块
  insertTypeMoudleData(){
    this._util.insertTypeMoudle(JSON.stringify(this.curMoudle)).subscribe((res:Response)=>{
      this.resetTypeMoudle();
      this.getAllMoudle();
      this.isAddTypeMoudle = false;
    });
  }

  //重置模块
  resetTypeMoudle(){
    this.curMoudle = new Moudle();
  }
  //返回类型信息界面
  backType(){
    this.curMoudle = new Moudle();
    this.isAddTypeMoudle = false;
  }
}
