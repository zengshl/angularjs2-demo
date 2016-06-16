/**
 * Created by lenovo on 2016/5/20.
 */
import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {PageData,Role,Menu,Power} from "../../shared/services/entity.service";
declare var jQuery:JQueryStatic;


@Component({
  selector: 'sys_role',
  providers:[UtilService],
  directives: [DataTableDirectives],
  styles: [ require('app/+sysrole/components/sysrole.css')],
  template: require('app/+sysrole/components/sysrole.html')
})

export class SysRoleComponent implements AfterViewInit{
  ngAfterViewInit() {
  }
  private data: any ;
  private menus : Array<Menu>;
  private postPowers: Array<Power>;
  arrayMenu:Array<Array<Menu>>;//用来决定每行有几列角色数据
  private powers : any;
  private pdata :PageData;
  private tableShow:boolean = true
  curRole:Role;
  private ids:Array<number>;


  isInsert:boolean = false;
  isdeletes:boolean = true;
  nameSearch:string = "";
  noSearch:string = "";


  constructor(private _util:UtilService){
    //实例化分页对象
    this.pdata = new PageData();
    this.pdata.iDisplayStart = 0;
    this.pdata.page = 1;
    this.pdata.iDisplayLength = 8;
    this.menus = new Array<Menu>();
    this.postPowers = new Array<Power>();
    this.pdata.searchData = {"roleName":this.nameSearch,"roleNo":this.noSearch}
    //实例化用户对象
    this.curRole = new Role();
    this.arrayMenu = new Array<Array<Menu>>();
    this.ids = new Array<number>();
    //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    _util.getRole(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.data = res.json();
    });
    //获取全部菜单
    this._util.getAllMenu().subscribe((res:Response)=>{
      this.menus = res.json();
      let menuArr = new  Array<Menu>();
      //将角色重构成每行3列
      for(var i=0;i<this.menus.length;i++){
        if(i%3 == 0 && i == this.menus.length-1){
          menuArr = new  Array<Menu>();
          menuArr.push(this.menus[i]);
          this.arrayMenu.push(menuArr)
        }else if(i%3 == 0){
          menuArr = new  Array<Menu>();
          menuArr.push(this.menus[i]);
        }else if(i%3 == 2 || i == this.menus.length-1){
          menuArr.push(this.menus[i]);
          this.arrayMenu.push(menuArr)
        }else{
          menuArr.push(this.menus[i]);
        }
      }
    });

  }
  //切换页面，获取表单数据
  getPageData(ds:any){
    ds.searchData = {"roleName":this.nameSearch,"roleNo":this.noSearch}
    this._util.getRole(JSON.stringify(ds)).subscribe((res:Response)=>{
      this.data = res.json();
    });
  }

  //删除角色
  deleteData(role:any){
    this._util.deleteRole(JSON.stringify(role)).subscribe((res:Response)=>{
      let getdata = res.json();
      if(getdata == 1){
        swal("角色删除成功", "", "success");
      }else{
        swal("角色删除失败", "", "error");
      }
      this.updataTable();
    });
  }

  //获取详细信息
  updataData(role:any){
    this._util.getRoleInfo(JSON.stringify(role)).subscribe((res:Response)=>{
      let getdata = res.json();
      this.curRole = getdata.data;
      this.powers = getdata.power;

      //有权限的菜单打勾
      for(var j=0;j<this.menus.length;j++){
          this.menus[j].flag = false;
          for(var i=0;i<this.powers.length;i++){
          if(this.powers[i].id == this.menus[j].id){
            //该菜单选中
            this.menus[j].flag = true;
            //将已有的权限保存，以便更新时使用
            let power = new Power();
            power.roleId = this.curRole.id;
            power.powerId = this.menus[j].id;
            power.powerType = "menu";
            this.postPowers.push(power);
          }
        }
      }
      this.tableShow = false;
      this.isInsert = false;
    });
  }

  //返回列表界面
  backTo(){
    this.curRole = new Role();
    this.postPowers = new Array<Power>()
    this.tableShow = true;
  }
  //新增或者保存
  insertOrUpdata(){
    var data = {"isInsert":this.isInsert,"role":this.curRole,"power": this.postPowers};
    if(this.isInsert){
      this._util.insertRoleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        if(res.json().userRes != null && res.json().userRes != 0){
          swal("角色保存成功", "", "success");
        }else{
          swal("角色保存失败", "", "error");
        }
        this.updataTable();
      });
    }else{
      this._util.updataRoleInfo(JSON.stringify(data)).subscribe((res:Response)=>{
        if(res.json().roleRes == 1){
          swal("角色更新成功", "", "success");
        }else{
          swal("角色更新失败", "", "error");
        }
        let data = res.json();
        this.updataTable();
      });
    }
  }

  //重置表单
  resetRole(){
    this.curRole = new Role();
    this.postPowers = new Array<Power>();
    //for(var j=0;j<this.menus.length;j++){
    //  this.menus[j].flag = false;
    //}
  }

  //查询
  filter(){
    this.pdata.searchData = {"roleName":this.nameSearch,"roleNo":this.noSearch}
    this.updataTable();
  }

  //调整到新增界面
  insert(){
    this.isInsert = true;
    this.tableShow = false;
    this.resetRole();
  }

  //表格刷新
  updataTable(){
    this.postPowers = new Array<Power>();
    this.pdata.searchData = {"roleName":this.nameSearch,"roleNo":this.noSearch}
      this._util.getRole(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
      this.ids = new Array<number>();
      this.data = res.json();
        this.tableShow = true;
    });
  }

  //权限选中与取消
  onSelect(event:any,menu:any){
    if(event.checked){
      let power = new Power();
      power.roleId = this.curRole.id;
      power.powerId = menu.id;
      power.powerType = "menu";
      this.postPowers.push(power);
    }else{
      for(var i=0;i<this.postPowers.length;i++){
        if(this.postPowers[i].powerId == menu.id && this.postPowers[i].powerType == "menu" ){
          this.postPowers.splice(i,1);
        }
      }
    }
  }

  //点击每一行表格
  clickItem(item:any){
    console.log(item);
  }

  mouseenter(event:any,item:any){
    //console.log(event+","+item);
  }
  //批量删除勾选
  onDelete(event:any,item:any){
    if(event.checked){
      //选中
      this.ids.push(item.id);
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
    this._util.roleDeletes(JSON.stringify(this.ids)).subscribe((res:Response)=>{
      this.updataTable();
      swal("批量删除成功", "", "success");
    });
  }
}
