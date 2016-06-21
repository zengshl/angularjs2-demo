/**
 * Created by lenovo on 2016/5/24.
 */
/**
 * Created by lenovo on 2016/5/20.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require("../../shared/index");
var entity_service_1 = require("../../shared/services/entity.service");
var router_deprecated_1 = require('@angular/router-deprecated');
var DocumentComponent = (function () {
    function DocumentComponent(_util, rooteParmas, router) {
        //实例化分页对象
        var _this = this;
        this._util = _util;
        this.rooteParmas = rooteParmas;
        this.router = router;
        this.tableShow = true;
        this.isInsert = false;
        this.nameSearch = "";
        this.typeSearch = "";
        this.userId = "";
        this.folderId = "";
        this.canBack = true;
        this.userId = rooteParmas.get("userId");
        this.folderId = rooteParmas.get("folderId");
        if (this.userId == "0" && this.folderId == "0") {
            this.canBack = false;
        }
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 10;
        this.pdata.searchData = { "docName": this.nameSearch, "docType": this.typeSearch, "userId": this.userId, "folderId": this.folderId };
        _util.getDocumentByuserIdAndfolderId(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    DocumentComponent.prototype.ngAfterViewInit = function () {
    };
    //切换页面，获取表单数据
    DocumentComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { "docName": this.nameSearch, "docType": this.typeSearch, "userId": this.userId, "folderId": this.folderId };
        this._util.getDocumentByuserIdAndfolderId(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //查询
    DocumentComponent.prototype.filter = function () {
        this.updataTable();
    };
    //表格刷新
    DocumentComponent.prototype.updataTable = function () {
        var _this = this;
        this.pdata.searchData = { "docName": this.nameSearch, "docType": this.typeSearch, "userId": this.userId, "folderId": this.folderId };
        this._util.getDocumentByuserIdAndfolderId(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    DocumentComponent.prototype.back = function () {
        this.router.parent.navigate(['Folder', { "userId": this.userId }]);
    };
    DocumentComponent = __decorate([
        core_1.Component({
            selector: 'doc_document',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives],
            styles: [require('app/+document/components/document.css')],
            template: require('app/+document/components/document.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, router_deprecated_1.RouteParams, router_deprecated_1.Router])
    ], DocumentComponent);
    return DocumentComponent;
})();
exports.DocumentComponent = DocumentComponent;
//# sourceMappingURL=document.js.map