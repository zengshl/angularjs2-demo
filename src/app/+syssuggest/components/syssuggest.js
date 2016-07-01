//import {Component, OnInit} from '@angular/core';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';
//import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
//import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
//import {TableData} from './table-data';
//import {UtilService} from "../../shared/index";
//import  {User,UserCompany,PageData} from '../../shared/index';
//
//// webpack html imports
//let template = require('./syssuggest.html');
//
//@Component({
//    selector: 'sys-suggest',
//    template: template,
//    providers:[UtilService],
//    directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES]
//})
//export class SysSuggestComponent implements OnInit {
//    public rows:Array<any> = [];
//
//    //表头与排序
//    public columns:Array<any> = [
//        //{title: 'Name', name: 'name'},
//        //{title: 'Position', name: 'position', sort: false},
//        //{title: 'Office', name: 'office', sort: 'asc'},
//        //{title: 'Extn.', name: 'ext', sort: ''},
//        //{title: 'Start date', name: 'startDate'},
//        //{title: 'Salary ($)', name: 'salary'}
//        {title: '用户名', name: 'name'},
//        {title: '标题', name: 'position', sort: false},
//        {title: '反馈内容', name: 'office', sort: 'asc'},
//        {title: '反馈时间.', name: 'ext', sort: ''},
//        {title: '操作', name: ''}
//    ];
//    //初始页面，不要改，该了会报错
//    public page:number = 1;
//    //每页显示的数据条数
//    public itemsPerPage:number = 5;
//    public maxSize:number = 5;
//    public numPages:number = 1;
//    public length:number = 0;
//
//    public config:any = {
//        //是否分页
//        paging: true,
//        //排序列
//        sorting: {columns: this.columns},
//        //filtering: {filterString: '', columnName: 'position'}
//        //过滤条件
//        filtering: {
//            position: { filterString: '' },
//            office: { filterString: '' }
//        }
//    };
//
//    //数据
//    private data:Array<any> ;
//
//    private pdata :PageData;
//    titleSearch : string = '';
//    user : User;
//
//    public constructor(private _util:UtilService) {
//
//        this.data = TableData;
//        //实例化分页对象
//        this.user = new User();
//        this.pdata = new PageData();
//        this.pdata.iDisplayStart = 0;
//        this.pdata.page = 1;
//        this.pdata.iDisplayLength = 8;
//
//        this.pdata.searchData = {'adviceTitle':this.titleSearch,"userId":this.user.id+""}
//
//        _util.getSuggest(JSON.stringify(this.pdata)).subscribe((res:Response)=>{
//            console.log(res.json());
//        });
//
//        this.length = this.data.length;
//    }
//
//    public ngOnInit():void {
//        this.onChangeTable(this.config);
//    }
//
//    public changePage(page:any, data:Array<any> = this.data):Array<any> {
//        console.log(page);
//        let start = (page.page - 1) * page.itemsPerPage;
//        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
//        return data.slice(start, end);
//    }
//
//    public changeSort(data:any, config:any):any {
//        if (!config.sorting) {
//            return data;
//        }
//
//        let columns = this.config.sorting.columns || [];
//        let columnName:string = void 0;
//        let sort:string = void 0;
//
//        for (let i = 0; i < columns.length; i++) {
//            if (columns[i].sort !== '') {
//                columnName = columns[i].name;
//                sort = columns[i].sort;
//            }
//        }
//
//        if (!columnName) {
//            return data;
//        }
//
//        // simple sorting
//        return data.sort((previous:any, current:any) => {
//            if (previous[columnName] > current[columnName]) {
//                return sort === 'desc' ? -1 : 1;
//            } else if (previous[columnName] < current[columnName]) {
//                return sort === 'asc' ? -1 : 1;
//            }
//            return 0;
//        });
//    }
//
//    public changeFilter(data:any, config:any):any {
//        if (!config.filtering) {
//            return data;
//        }
//
//        //let filteredData:Array<any> = data.filter((item:any) =>
//        //    item[config.filtering.columnName].match(this.config.filtering.filterString));
//        return data.filter((item: any) =>
//        item["position"].match(this.config.filtering.position.filterString) &&
//        item["office"].match(this.config.filtering.office.filterString));
//
//        //return filteredData;
//    }
//
//    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
//        if (config.filtering) {
//            Object.assign(this.config.filtering, config.filtering);
//        }
//        if (config.sorting) {
//            Object.assign(this.config.sorting, config.sorting);
//        }
//
//        let filteredData = this.changeFilter(this.data, this.config);
//        let sortedData = this.changeSort(filteredData, this.config);
//        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
//        this.length = sortedData.length;
//    }
//}
//旧的插件处理
/**
 * Created by lenovo on 2016/6/2.
 */
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require('../../shared/index');
var index_2 = require("../../shared/index");
var index_3 = require('../../entitys/index');
////验证组件加载
var common_1 = require('@angular/common');
var SysSuggestComponent = (function () {
    function SysSuggestComponent(router, _util) {
        var _this = this;
        this.router = router;
        this._util = _util;
        this.titleSearch = '';
        this.nameSearch = '';
        this.isInsert = false;
        this.tableShow = true;
        //实例化分页对象
        this.user = new index_1.User();
        this.pdata = new index_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 8;
        this.pdata.sortData = "";
        this.fb = new index_3.FeedBack();
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": this.nameSearch };
        _util.getSuggest(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    SysSuggestComponent.prototype.ngAfterViewInit = function () {
    };
    SysSuggestComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    SysSuggestComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    SysSuggestComponent.prototype.reset = function () {
        this.fb = new index_3.FeedBack();
        this.fb.userId = this.user.id;
    };
    //切换页面，获取表单数据
    SysSuggestComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": this.nameSearch };
        this._util.getSuggest(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //查询
    SysSuggestComponent.prototype.filter = function () {
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": this.nameSearch };
        this.updataTable();
    };
    SysSuggestComponent.prototype.deleteData = function (feedback) {
        var _this = this;
        //将string转为int
        var id = feedback.id;
        feedback.id = parseInt(id);
        //let userId = feedback.userId;
        //feedback.userId = parseInt(userId)
        this._util.deleteFeedBack(feedback.id).subscribe(function (res) {
            //let getdata = res.json();
            //if(getdata == 1){
            //    swal("反馈意见删除成功", "", "success");
            //}else{
            //    swal("反馈意见删除失败", "", "error");
            //}
            _this.updataTable();
        });
    };
    SysSuggestComponent.prototype.updataData = function (feedback) {
        console.log(feedback);
        this.fb.id = parseInt(feedback.id);
        this.fb.userId = parseInt(feedback.userId);
        this.fb.createTime = feedback.createTime;
        this.fb.adviceTitle = feedback.adviceTitle;
        this.fb.advice = feedback.advice;
        this.tableShow = false;
        this.isInsert = false;
    };
    //表格刷新
    SysSuggestComponent.prototype.updataTable = function () {
        var _this = this;
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": this.nameSearch };
        this._util.getSuggest(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //新增或者保存
    SysSuggestComponent.prototype.insertOrUpdata = function () {
        var _this = this;
        if (this.isInsert) {
            this._util.insertSuggestInfo(JSON.stringify(this.fb)).subscribe(function (res) {
                var data = res.json();
                if (data != null && data != 0) {
                    swal("意见反馈保存成功", "", "success");
                }
                else {
                    swal("意见反馈保存失败", "", "error");
                }
                _this.updataTable();
            });
        }
        else {
            this._util.updataSuggestInfo(JSON.stringify(this.fb)).subscribe(function (res) {
                var data = res.json();
                if (data == 1) {
                    swal("意见反馈修改成功", "", "success");
                }
                else {
                    swal("意见反馈修改失败", "", "error");
                }
                _this.updataTable();
            });
        }
    };
    //跳转到新增界面
    SysSuggestComponent.prototype.insert = function () {
        this.isInsert = true;
        this.tableShow = false;
        this.fb = new index_3.FeedBack();
        this.fb.userId = this.user.id;
    };
    //返回列表界面
    SysSuggestComponent.prototype.backTo = function () {
        this.fb = new index_3.FeedBack();
        this.fb.userId = this.user.id;
        this.tableShow = true;
    };
    //排序
    SysSuggestComponent.prototype.sortby = function (title) {
        this.pdata.sortData = title;
        this.updataTable();
    };
    SysSuggestComponent = __decorate([
        core_1.Component({
            selector: 'sys_suggest',
            providers: [index_2.UtilService],
            directives: [datatable_1.DataTableDirectives, common_1.FORM_DIRECTIVES,],
            template: require('app/+syssuggest/components/syssuggest.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, index_2.UtilService])
    ], SysSuggestComponent);
    return SysSuggestComponent;
})();
exports.SysSuggestComponent = SysSuggestComponent;
//# sourceMappingURL=syssuggest.js.map