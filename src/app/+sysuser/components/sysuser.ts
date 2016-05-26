/**
 * Created by lenovo on 2016/5/20.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from '../../shared/index';
import {Response} from '@angular/http';
import {PageData,Admin,UserBase,UserMember,UserContact} from '../../shared/services/entity.service';
import {FORM_DIRECTIVES} from '@angular/common';
import {AddSysUserComponent} from "../../+addsysuser/index";
declare var jQuery:JQueryStatic;


@Component({
  selector: 'sys_user',
  providers:[UtilService],
  directives: [DataTableDirectives,FORM_DIRECTIVES, AddSysUserComponent],
  styles: [ require('app/+sysuser/components/sysuser.css')],
  template: require('app/+sysuser/components/sysuser.html')
})

export class SysUserComponent implements AfterViewInit{

  ngAfterViewInit() {
    jQuery('#gender').click(function(){
      alert('11')

    });


  }
  private data: any ;
  private pdata :PageData;
  private tableShow:boolean = true
  curUser:Admin;
  userBase:UserBase;
  secondPSD:string;
  isInsert:boolean = false;
  accountSearch:string = '';
  phoneSearch:string = '';
  modalContent:string = '';
  modalHeader:string = '';


  constructor(private _util:UtilService){
    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1;
    this.pdata.iDisplayLength = 10;
    this.pdata.searchData = {'account':this.accountSearch,'phone':this.phoneSearch}
    //实例化用户对象
    this.curUser = new Admin();
    this.userBase = new UserBase();

    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getAdmin(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });

  }



  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {'account':this.accountSearch,'phone':this.phoneSearch};
    this._util.getAdmin(JSON.stringify(ds)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }

  //删除用户
  deleteData(user:any){
    this._util.deleteAdmin(JSON.stringify(user)).subscribe((res:Response)=>{

      let getdata = res.json();
      this.updataTable();
    });
  }

  //获取详细信息
  updataData(user:any){
    this._util.getAdminInfo(JSON.stringify(user)).subscribe((res:Response)=>{
      let getdata = res.json();
      console.log(this.curUser+'，'+getdata.data)
      this.curUser = getdata.data;
      for(var i=0;i<getdata.base.length;i++){
        this.userBase = getdata.base[i]
      }
      this.tableShow = false;
      this.isInsert = false;
    });
  }

  //返回列表界面
  backTo(){
    this.curUser = new Admin();
    this.userBase = new UserBase();
    this.tableShow = true;
  }


  //更新用户信息
  updataAdmin(){
    var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase};
    this._util.updataAdminInfo(JSON.stringify(data)).subscribe((res:Response)=>{
      let data = res.json();
      this.updataTable();

    });
  }

  //重置表单
  resetAdmin(){
    this.curUser = new Admin();
    this.userBase = new UserBase();
  }

  //查询
  filter(){
    this.pdata.searchData = {'account':this.accountSearch,'phone':this.phoneSearch};
    this.updataTable();
  }

  //调整到新增界面
  insert(){
    this.isInsert = true;
    this.tableShow = false;

    this.curUser = new Admin();

    this.userBase = new UserBase();

  }
  //新增用户信息
  insertAdmin(){
    if(this.curUser.password != '' && this.curUser.password != this.secondPSD){
      var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase};
      this._util.insertAdminInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        let data = res.json();
        this.updataTable();
      });
    }else{
      //this.modelshow('新增失败','请确认两次密码一致');
    }
  }

  //表格刷新
  updataTable(){
      this.pdata.searchData = {'account':this.accountSearch,'phone':this.phoneSearch};
      this._util.getAdmin(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
        this.tableShow = true;
    });
  }
  ////弹窗
  //modelshow(head:string,content:string){
  //  this.modalHeader = head;
  //  this.modalContent = content;
  //    setTimeout(function(){
  //    jQuery('#insert').modal('show');
  //  },1);
  //}
}
