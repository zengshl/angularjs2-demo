/**
 * Created by lenovo on 2016/5/30.
 */
import {Component,NgZone} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';   //文件上传的组件
import {Response} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {PageData,Moudle,Doctype,DocTemplate} from "../../shared/services/entity.service";
import {bootstrap} from "angular2/platform/browser"

//import {AddSysMoudleComponent} from "../../+addsysmoudle/components/addsysmoudle";

declare var jQuery:JQueryStatic;


@Component({
  selector: 'sys_moudle',
  providers:[UtilService],
  directives: [DataTableDirectives,UPLOAD_DIRECTIVES],
  styles: [ require('app/+sysmoudle/components/sysmoudle.css')],
  template: require('app/+sysmoudle/components/sysmoudle.html')
})
export class SysMoudleComponent implements AfterViewInit{

  ip : string = "http://192.168.1.104:9000/";

  ngAfterViewInit() {

    jQuery('#text').dropdown();
    //jQuery('.ui.fluid.search.dropdown').dropdown();
  }
  zone: NgZone;
  options: Object = {
    url: 'http://localhost:9000/law/file/upload'
    //url: this.ip + 'law/file/upload'
  };

  basicProgress: number = 0;
  basicResp: Object;
  textName:string = "";

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
    this.pdata.sortData = "";
    this.curType = new Doctype();
    this.temps = new Array<DocTemplate>();
    this.allMoudle = new Array<Moudle>();
    this.curMoudle = new Moudle();
    this.pdata.searchData = {"moudleName":this.typeSearch}
    //实例化用户对象

    this.ip = _util.getUrl();

    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getMoudle(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });

    this.getAllMoudle();

    this.zone = new NgZone({ enableLongStackTrace: false });
  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {"typeName":this.typeSearch}
    this._util.getMoudle(JSON.stringify(ds)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }
  //删除模板类型
  deleteData(doctype:any){
    //由于返回的数据是map（string，string）类型，所以需要对number类型的数据进行处理
    let id = doctype.id;
    let preId = doctype.preId;
    let moudleId = doctype.moudleId;
    doctype.id = parseInt(id);
    doctype.preId = parseInt(preId);
    doctype.moudleId = parseInt(moudleId);
    this._util.deleteMoudle(JSON.stringify(doctype)).subscribe((res:Response)=>{
      let getdata = res.json();
      if(getdata == 1){
        swal("模板删除成功", "", "success");
      }else{
        swal("模板删除成功", "", "error");
      }
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
      console.log(this.attrData);
      this.tableShow = false;
      this.isInsert = false;
    });
  }
  //返回列表界面
  backTo(){
    this.curType = new Doctype();
    this.temps = new Array<DocTemplate>();
    this.tableShow = true;
    this.addAttr = false;
    this.updataTable();
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
    this.textName = "";
    this.basicProgress = 0;
  }
  //新增类型模板
  insertAttrData(){
    this.temps.push(this.addTemp);
    this.updataAttrData();
  }
  //重置模板属性
  resetAttr(){
    this.addTemp = new DocTemplate();
    this.textName = "";
    this.basicProgress = 0;
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
    this.textName = "";
    this.basicProgress = 0;
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
      let data = res.json();
      if(data != null && data != 0){
        swal("模块保存成功", "", "success");
      }else{
        swal("模块保存失败", "", "error");
      }
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

  //新增或者保存
  insertOrUpdata(){
    if(this.isInsert){
    //对数据进行处理
          let moudleId = jQuery("#moudleId").val();
          if(moudleId!=null&&moudleId!=""){
            this.curType.moudleId = parseInt(moudleId);
          }
          var data = {"isInsert":this.isInsert,"type":this.curType,"temp": this.temps};
          this._util.insertMoudleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
            let resData = res.json();
            if(resData.typeRes != null && resData.typeRes != 0){
              swal("模板保存成功", "", "success");
            }else{
              swal("模板保存失败", "", "error");
            }
            this.updataTable();
          });
    }else{
      //对数据进行处理
      let moudleId = jQuery("#moudleId").val();
      this.curType.moudleId = parseInt(moudleId);
      var data = {"isInsert":this.isInsert,"type":this.curType,"temp": this.temps};
      this._util.updataMoudleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        let data = res.json();
        if(data.roleRes == 1){
          swal("模板修改成功", "", "success");
        }else{
          swal("模板修改失败", "", "error");
        }
        this.updataTable();
      });
    }
  }

  insertOrUpdataAttr(){
    if(this.isAttrInsert){
      this.temps.push(this.addTemp);
      this.updataAttrData();
    }else{
      this.updataAttrData();
      }
  }

  handleBasicUpload(data): void {
    this.basicResp = data;
    this.textName = this.basicResp.originalName;
    this.addTemp.resourcePath = "C:/law/template/"+this.textName;
    this.addTemp.resourceTitle = this.textName.split(".")[0];
    this.zone.run(() => {
      this.basicProgress = 50;
    });
      setTimeout(() => {
        this.zone.run(() => {
          this.basicProgress = 100;
        });
      }, 500);
    }
  //排序
    sortby(title:string){
      this.pdata.sortData = title;
      this.updataTable();
    }
  }
