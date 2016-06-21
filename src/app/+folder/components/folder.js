/**
 * Created by lenovo on 2016/5/24.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require("../../shared/index");
var entity_service_1 = require("../../shared/services/entity.service");
var router_deprecated_1 = require('@angular/router-deprecated');
var FolderComponent = (function () {
    function FolderComponent(_util, rooteParmas, router) {
        var _this = this;
        this._util = _util;
        this.rooteParmas = rooteParmas;
        this.router = router;
        this.tableShow = true;
        this.isInsert = false;
        this.nameSearch = "";
        this.userSearch = "";
        this.phoneSearch = "";
        this.userId = "";
        this.canBack = true;
        this.userId = rooteParmas.get("userId");
        if (this.userId == "0") {
            this.canBack = false;
        }
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 10;
        this.pdata.searchData = { "userId": this.userId, "userName": this.userSearch, "fileName": this.nameSearch, "phone": this.phoneSearch };
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getFolderList(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    FolderComponent.prototype.ngAfterViewInit = function () {
    };
    //切换页面，获取表单数据
    FolderComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { "userId": this.userId, "userName": this.userSearch, "fileName": this.nameSearch, "phone": this.phoneSearch };
        this._util.getFolderList(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //查询
    FolderComponent.prototype.filter = function () {
        this.updataTable();
    };
    //表格刷新
    FolderComponent.prototype.updataTable = function () {
        var _this = this;
        this.pdata.searchData = { "userId": this.userId, "userName": this.userSearch, "fileName": this.nameSearch, "phone": this.phoneSearch };
        this._util.getFolderList(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //点击每一行表格
    FolderComponent.prototype.clickItem = function (item) {
        this.router.parent.navigate(['Document', { "userId": item.userId, "folderId": item.id },]);
    };
    FolderComponent.prototype.back = function () {
        this.router.parent.navigate(['Custmanager']);
    };
    FolderComponent = __decorate([
        core_1.Component({
            selector: 'doc_folder',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives],
            styles: [require('app/+folder/components/folder.css')],
            template: require('app/+folder/components/folder.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, router_deprecated_1.RouteParams, router_deprecated_1.Router])
    ], FolderComponent);
    return FolderComponent;
})();
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=folder.js.map