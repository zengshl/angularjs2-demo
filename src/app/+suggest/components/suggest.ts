/**
 * Created by lenovo on 2016/6/2.
 */
import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {AfterViewInit} from "@angular/core";
import {DataTableDirectives} from 'angular2-datatable/datatable';
import  {User,UserCompany,PageData} from '../../shared/index';
import {UtilService} from "../../shared/index";
import {Response} from '@angular/http';
import {FeedBack} from '../../entitys/index';

////验证组件加载
import {FORM_DIRECTIVES} from '@angular/common';


declare var jQuery:JQueryStatic;

@Component({
    selector: 'suggest',
    providers:[UtilService],
    directives: [DataTableDirectives,FORM_DIRECTIVES,],
    template: require('app/+suggest/components/suggest.html')
})
export class SuggestComponent implements AfterViewInit{

    private data: any ;
    private pdata :PageData;
    titleSearch : string = '';
    isInsert : boolean  = false;
    fb : FeedBack;
    user : User;
    private tableShow:boolean = true
    ngAfterViewInit() {

    }

    constructor(private router:Router,private _util:UtilService)  {

        //实例化分页对象
        this.user = new User();
        this.pdata = new PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 8;
        this.pdata.sortData = "";

        this.fb = new FeedBack();
        if(sessionStorage.getItem('user')) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.fb.userId = this.user.id;
        }

        this.pdata.searchData = {'adviceTitle':this.titleSearch,"userId":this.user.id+"","userName":""}

        _util.getSuggest(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
            this.data = res.json();
        });


    }

    nav(name:string){
        this.router.parent.navigate([name]);
    }

    navSelf(name:string){
        this.router.navigate([name]);
    }

    reset(){
        this.fb = new FeedBack();
        this.fb.userId = this.user.id;
    }

    //切换页面，获取表单数据
    getPageData(ds:any){
        ds.searchData = {'adviceTitle':this.titleSearch,"userId":this.user.id+"","userName":""}
        this._util.getSuggest(JSON.stringify(ds)).subscribe((res:Response)=>{
            this.data = res.json();
        });
    }


    //查询
    filter(){
        this.pdata.searchData = {'adviceTitle':this.titleSearch,"userId":this.user.id+"","userName":""}
        this.updataTable();
    }

    deleteData(feedback:any){
        //将string转为int
        let id = feedback.id;
        feedback.id = parseInt(id);
        //let userId = feedback.userId;
        //feedback.userId = parseInt(userId)
        this._util.deleteFeedBack(feedback.id).subscribe((res:Response)=>{

            //let getdata = res.json();
            //if(getdata == 1){
            //    swal("反馈意见删除成功", "", "success");
            //}else{
            //    swal("反馈意见删除失败", "", "error");
            //}
            this.updataTable();
        });
    }

    updataData(feedback:any){
        console.log(feedback);
        this.fb.id = parseInt(feedback.id);
        this.fb.userId = parseInt(feedback.userId);
        this.fb.createTime = feedback.createTime;
        this.fb.adviceTitle = feedback.adviceTitle;
        this.fb.advice = feedback.advice;
        this.tableShow = false;
        this.isInsert = false;
    }


    //表格刷新
    updataTable(){

        this.pdata.searchData = {'adviceTitle':this.titleSearch,"userId":this.user.id+"","userName":""}

        this._util.getSuggest(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
            this.data = res.json();
            this.tableShow = true;
        });
    }

    //新增或者保存
    insertOrUpdata(){
            if(this.isInsert){
                    this._util.insertSuggestInfo(JSON.stringify(this.fb)).subscribe((res:Response)=>{
                        let data = res.json();
                        if(data != null && data != 0){
                            swal("意见反馈保存成功", "", "success");
                        }else{
                            swal("意见反馈保存失败", "", "error");
                        }
                        this.updataTable();
                    });
            }else{
                this._util.updataSuggestInfo(JSON.stringify(this.fb)).subscribe((res:Response)=>{
                    let data = res.json();
                    if(data == 1){
                        swal("意见反馈修改成功", "", "success");
                    }else{
                        swal("意见反馈修改失败", "", "error");
                    }
                    this.updataTable();
                });
            }
    }


    //跳转到新增界面
    insert(){
        this.isInsert = true;
        this.tableShow = false;
        this.fb = new FeedBack();
        this.fb.userId = this.user.id;
    }


    //返回列表界面
    backTo(){
        this.fb = new FeedBack();
        this.fb.userId = this.user.id;
        this.tableShow = true;
    }

    sortby(title:string){
        this.pdata.sortData = title;
        this.updataTable();
    }
}
