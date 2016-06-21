var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require("../../shared/index");
var entity_service_1 = require("../../shared/services/entity.service");
var router_deprecated_1 = require('@angular/router-deprecated');
var CustmanagerComponent = (function () {
    function CustmanagerComponent(_util, router) {
        var _this = this;
        this._util = _util;
        this.router = router;
        this.tableShow = true;
        this.isInsert = false;
        this.userSearch = "";
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 8;
        this.pdata.searchData = { "userName": this.userSearch };
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getUser(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    //切换页面，获取表单数据
    CustmanagerComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { "userName": this.userSearch };
        this._util.getUser(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //查询
    CustmanagerComponent.prototype.filter = function () {
        this.updataTable();
    };
    //表格刷新
    CustmanagerComponent.prototype.updataTable = function () {
        var _this = this;
        this.pdata.searchData = { "userName": this.userSearch };
        this._util.getUser(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //点击每一行表格
    CustmanagerComponent.prototype.clickItem = function (item) {
        this.router.parent.navigate(['Folder', { "userId": item.id + '' }]);
        //this.company = new UserCompany();
        //this._util.getUserById(parseInt(item.id)).subscribe((res:Response)=>{
        //  if(res.json().company!=null){
        //    this.company = res.json().company;
        //  }
        //});
    };
    CustmanagerComponent = __decorate([
        core_1.Component({
            selector: 'custmanager-box',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives],
            styles: [require('app/+custmanager/components/custmanager.component.css')],
            template: require('app/+custmanager/components/custmanager.component.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, router_deprecated_1.Router])
    ], CustmanagerComponent);
    return CustmanagerComponent;
})();
exports.CustmanagerComponent = CustmanagerComponent;
//# sourceMappingURL=custmanager.component.js.map