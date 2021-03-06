/**
 * Created by lenovo on 2016/5/20.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {UtilService} from '../../shared/index';
import {Response} from '@angular/http';
import {PageData,Admin,UserBase,UserRole,Role} from '../../shared/services/entity.service';
import {FORM_DIRECTIVES} from '@angular/common';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import { Control, ControlGroup } from '@angular/common';
import { ValidationMessagesComponent } from 'ng2-validate/core';
import {EmailValidation, MobileValidation, PasswordValidation, PersonIdValidation} from "../../shared/index";
declare var jQuery:JQueryStatic;


@Component({
  selector: 'sys_user',
  providers:[UtilService],
  directives: [DataTableDirectives,FORM_DIRECTIVES,NKDatetime,ValidationMessagesComponent],
  styles: [ require('app/+sysuser/components/sysuser.css')],
  template: require('app/+sysuser/components/sysuser.html')
})

export class SysUserComponent implements AfterViewInit{
  private myForm: ControlGroup;
  private mobileControl: Control;
  private emailControl: Control;
  ngAfterViewInit() {
    jQuery('#gender').click(function(){

    });

    jQuery("#selected").dropdown({
      maxSelections: 3
    });

    jQuery('.ui.radio.checkbox').checkbox();

    jQuery("[name='gender']").on("change",

      function(e){
        console.log(jQuery(e.target).val());
      }

    );
    this.mobileControl = new Control('', new MobileValidation().validator);
    this.emailControl = new Control('', new EmailValidation().validator);
    this.myForm = new ControlGroup({

      emailControl: this.emailControl,
      mobileControl : this.mobileControl
    });
  }
  private data: any ;
  private pdata :PageData;
  private tableShow:boolean = true
  curUser:Admin;
  userBase:UserBase = new UserBase();
  private ids:Array<number>;//批量删除id组
  userRole: Array<UserRole>;  //发送到后台的角色数组数据

  arrayRole:Array<Array<Role>>;//用来决定每行有几列角色数据

  secondPSD:string = "";
  isInsert:boolean = false;
  isdeletes:boolean = true;
  accountSearch:string = '';
  phoneSearch:string = '';
  modalContent:string = '';
  modalHeader:string = '';

  private getRole : Array<Role>;//所有的角色
  private getUserRole : any;//某个用户获取的角色

  constructor(private _util:UtilService){
    Date.prototype.toJSON = function () { return this.toLocaleString(); } //初始化日期时区

    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1;
	  this.pdata.iDisplayLength = 8;
    this.pdata.searchData = {'account':this.accountSearch,'phone':this.phoneSearch}
    this.pdata.sortData = "";

    //实例化用户对象
    this.curUser = new Admin();
    this.userBase = new UserBase();
    this.getRole = new Array<Role>();
    this.userRole = new Array<UserRole>();
    this.arrayRole = new Array<Array<Role>>();
    this.ids = new Array<number>();

    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getAdmin(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });

    //获取全部角色
    _util.getAllRole().subscribe((res:Response)=>{
      this.getRole = res.json();
      let roleArr = new  Array<Role>();
      //将角色重构成每行4列
      for(var i=0;i<this.getRole.length;i++){
        if(i%3 == 0 && i == this.getRole.length-1){
          roleArr = new  Array<Role>();
          roleArr.push(this.getRole[i]);
          this.arrayRole.push(roleArr)
        }else if(i%3 == 0){
          roleArr = new  Array<Role>();
          roleArr.push(this.getRole[i]);
        }else if(i%3 == 2 || i == this.getRole.length-1){
          roleArr.push(this.getRole[i]);
          this.arrayRole.push(roleArr)
        }else{
          roleArr.push(this.getRole[i]);
        }
      }
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
    //将string转为int
    let id = user.id;
    user.id = parseInt(id);
    this._util.deleteAdmin(JSON.stringify(user)).subscribe((res:Response)=>{

      let getdata = res.json();
      if(getdata == 1){
        swal("用户删除成功", "", "success");
      }else{
        swal("用户删除失败", "", "error");
      }
      this.updataTable();
    });
  }

  //获取详细信息
  updataData(user:any){
    //由于获取到的列表是map（string，string），所以需要多number类型的数据进行转换
    let id = user.id
    user.id = parseInt(id);
    this._util.getAdminInfo(JSON.stringify(user)).subscribe((res:Response)=>{
      let getdata = res.json();

      this.curUser = getdata.data;
      if(getdata.base.length>0) this.userBase = getdata.base[0];

      //使用datetime插件时，1) 所有日期格式都要经过如下的处理，截取年月日
      //2) 同时要在主构造器内，对时区进行初始化：Date.prototype.toJSON = function () { return this.toLocaleString(); }
      // 3) 注意ng2-datetime插件有改动，如若有复原，则需要重新修改
      // 在ng2-datetime.ts文件的第九行，加入ngModel: <input type="text" class="form-control" [(ngModel)]="date"/>
      this.userBase.birthday = this.userBase.birthday.substr(0,this.userBase.birthday.lastIndexOf("/")+3);

      this.getUserRole = getdata.role;

      //有权限的角色打勾
      for(var j=0;j<this.getRole.length;j++){
        this.getRole[j].flag = false;
        for(var i=0;i<this.getUserRole.length;i++){
          if(this.getUserRole[i].id == this.getRole[j].id){
            //该菜单选中
            this.getRole[j].flag = true;
            //将已有的权限保存，以便更新时使用
            let userrole = new UserRole();
            userrole.userId = this.curUser.id;
            userrole.roleId = this.getRole[j].id;
            this.userRole.push(userrole);
          }
        }
      }
      this.tableShow = false;
      this.isInsert = false;
    });
  }

  //返回列表界面
  backTo(){
    this.curUser = new Admin();
    this.userBase = new UserBase();
    this.userRole = new Array<UserRole>();
    this.tableShow = true;
  }


  //更新用户信息
  updataAdmin(){
    //var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase};
    var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase,'role':this.userRole};
    this._util.updataAdminInfo(JSON.stringify(data)).subscribe((res:Response)=>{
      let data = res.json();
      this.updataTable();

    });
  }

  //重置表单
  resetAdmin(){
    this.curUser = new Admin();
    this.userBase = new UserBase();
    this.userRole = new Array<UserRole>();
    //for(var j=0;j<this.getRole.length;j++){
    //  this.getRole[j].flag = false;
    //}
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
    if(this.curUser.password != '' && this.curUser.password == this.secondPSD){
      //var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase};
      var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase,'role':this.userRole};
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
    this.userRole = new Array<UserRole>();
    this.ids = new Array<number>();
    this.pdata.searchData = {'account':this.accountSearch,'phone':this.phoneSearch};
    this._util.getAdmin(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
      this.tableShow = true;
    });
  }
  //角色选中与取消
  onSelect(event:any,role:any){
    if(event.checked){
      let addrole = new UserRole();
      addrole.userId = this.curUser.id;
      addrole.roleId = role.id;
      this.userRole.push(addrole);
    }else{
      for(var i=0;i<this.userRole.length;i++){
        if(this.userRole[i].roleId == role.id){
          this.userRole.splice(i,1);
        }
      }
    }
  }

  //批量删除勾选
  onDelete(event:any,item:any){
    if(event.checked){
      //选中
      this.ids.push(parseInt(item.id));
    }else{
      //取消
      for(var i=0;i<this.ids.length;i++){
        if(this.ids[i] == item.id){
          this.ids.splice(i,1);
        }
      }
    }
    //批量删除按钮点击控制
    if(this.ids.length>0){
      this.isdeletes = false;
    }else{
      this.isdeletes = true;
    }
  }
  //批量删除
  deletes(){
    this._util.adminDeletes(JSON.stringify(this.ids)).subscribe((res:Response)=>{
      this.updataTable();
      swal("批量删除成功", "", "success");
    });
  }
  radioSelect(event:any){
    if(event.checked){
      console.log(event.value);
    }
  }

  //新增或者保存
  insertOrUpdata(){
    if(this.myForm.valid){
      var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase,'role':this.userRole};
      if(this.isInsert){
        if(this.curUser.password != '' && this.curUser.password == this.secondPSD){
          var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase,'role':this.userRole};
          this._util.insertAdminInfo(JSON.stringify(data)).subscribe((res:Response)=>{
            let data = res.json();
            if(data.userRes != null && data.userRes != 0){
              swal("用户保存成功", "", "success");
            }else{
              swal("用户保存失败", "", "error");
            }
            this.updataTable();
          });
        }else{
          swal("新增失败,请确认两次密码一致", "", "error");
        }
      }else{
        this._util.updataAdminInfo(JSON.stringify(data)).subscribe((res:Response)=>{
          let data = res.json();
          if(data.userRes == 1){
            swal("用户修改成功", "", "success");
          }else{
            swal("用户修改失败", "", "error");
          }
          this.updataTable();
        });
      }
    }else{
      //console.log('请完善必填信息');
    }
  }

  //排序
  sortby(title:string){
    this.pdata.sortData = title;
    this.updataTable();
  }
}
