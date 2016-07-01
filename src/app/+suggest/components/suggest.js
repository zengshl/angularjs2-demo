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
var SuggestComponent = (function () {
    function SuggestComponent(router, _util) {
        var _this = this;
        this.router = router;
        this._util = _util;
        this.titleSearch = '';
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
        if (sessionStorage.getItem('user')) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.fb.userId = this.user.id;
        }
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": "" };
        _util.getSuggest(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    SuggestComponent.prototype.ngAfterViewInit = function () {
    };
    SuggestComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    SuggestComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    SuggestComponent.prototype.reset = function () {
        this.fb = new index_3.FeedBack();
        this.fb.userId = this.user.id;
    };
    //切换页面，获取表单数据
    SuggestComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": "" };
        this._util.getSuggest(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //查询
    SuggestComponent.prototype.filter = function () {
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": "" };
        this.updataTable();
    };
    SuggestComponent.prototype.deleteData = function (feedback) {
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
    SuggestComponent.prototype.updataData = function (feedback) {
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
    SuggestComponent.prototype.updataTable = function () {
        var _this = this;
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "", "userName": "" };
        this._util.getSuggest(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //新增或者保存
    SuggestComponent.prototype.insertOrUpdata = function () {
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
    SuggestComponent.prototype.insert = function () {
        this.isInsert = true;
        this.tableShow = false;
        this.fb = new index_3.FeedBack();
        this.fb.userId = this.user.id;
    };
    //返回列表界面
    SuggestComponent.prototype.backTo = function () {
        this.fb = new index_3.FeedBack();
        this.fb.userId = this.user.id;
        this.tableShow = true;
    };
    SuggestComponent.prototype.sortby = function (title) {
        this.pdata.sortData = title;
        this.updataTable();
    };
    SuggestComponent = __decorate([
        core_1.Component({
            selector: 'suggest',
            providers: [index_2.UtilService],
            directives: [datatable_1.DataTableDirectives, common_1.FORM_DIRECTIVES,],
            template: require('app/+suggest/components/suggest.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, index_2.UtilService])
    ], SuggestComponent);
    return SuggestComponent;
})();
exports.SuggestComponent = SuggestComponent;
//# sourceMappingURL=suggest.js.map