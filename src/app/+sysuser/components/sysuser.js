/**
 * Created by lenovo on 2016/5/20.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require('../../shared/index');
var entity_service_1 = require('../../shared/services/entity.service');
var common_1 = require('@angular/common');
var index_2 = require("../../+addsysuser/index");
var SysUserComponent = (function () {
    function SysUserComponent(_util) {
        var _this = this;
        this._util = _util;
        this.tableShow = true;
        this.isInsert = false;
        this.accountSearch = '';
        this.phoneSearch = '';
        this.modalContent = '';
        this.modalHeader = '';
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 10;
        this.pdata.searchData = { 'account': this.accountSearch, 'phone': this.phoneSearch };
        //实例化用户对象
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getAdmin(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    SysUserComponent.prototype.ngAfterViewInit = function () {
        jQuery('#gender').click(function () {
            alert('11');
        });
    };
    //切换页面，获取表单数据
    SysUserComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { 'account': this.accountSearch, 'phone': this.phoneSearch };
        this._util.getAdmin(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //删除用户
    SysUserComponent.prototype.deleteData = function (user) {
        var _this = this;
        this._util.deleteAdmin(JSON.stringify(user)).subscribe(function (res) {
            var getdata = res.json();
            _this.updataTable();
        });
    };
    //获取详细信息
    SysUserComponent.prototype.updataData = function (user) {
        var _this = this;
        this._util.getAdminInfo(JSON.stringify(user)).subscribe(function (res) {
            var getdata = res.json();
            console.log(_this.curUser + '，' + getdata.data);
            _this.curUser = getdata.data;
            for (var i = 0; i < getdata.base.length; i++) {
                _this.userBase = getdata.base[i];
            }
            _this.tableShow = false;
            _this.isInsert = false;
        });
    };
    //返回列表界面
    SysUserComponent.prototype.backTo = function () {
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
        this.tableShow = true;
    };
    //更新用户信息
    SysUserComponent.prototype.updataAdmin = function () {
        var _this = this;
        var data = { 'isInsert': this.isInsert, 'user': this.curUser, 'base': this.userBase };
        this._util.updataAdminInfo(JSON.stringify(data)).subscribe(function (res) {
            var data = res.json();
            _this.updataTable();
        });
    };
    //重置表单
    SysUserComponent.prototype.resetAdmin = function () {
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
    };
    //查询
    SysUserComponent.prototype.filter = function () {
        this.pdata.searchData = { 'account': this.accountSearch, 'phone': this.phoneSearch };
        this.updataTable();
    };
    //调整到新增界面
    SysUserComponent.prototype.insert = function () {
        this.isInsert = true;
        this.tableShow = false;
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
    };
    //新增用户信息
    SysUserComponent.prototype.insertAdmin = function () {
        var _this = this;
        if (this.curUser.password != '' && this.curUser.password != this.secondPSD) {
            var data = { 'isInsert': this.isInsert, 'user': this.curUser, 'base': this.userBase };
            this._util.insertAdminInfo(JSON.stringify(data)).subscribe(function (res) {
                var data = res.json();
                _this.updataTable();
            });
        }
        else {
        }
    };
    //表格刷新
    SysUserComponent.prototype.updataTable = function () {
        var _this = this;
        this.pdata.searchData = { 'account': this.accountSearch, 'phone': this.phoneSearch };
        this._util.getAdmin(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    SysUserComponent = __decorate([
        core_1.Component({
            selector: 'sys_user',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives, common_1.FORM_DIRECTIVES, index_2.AddSysUserComponent],
            styles: [require('app/+sysuser/components/sysuser.css')],
            template: require('app/+sysuser/components/sysuser.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService])
    ], SysUserComponent);
    return SysUserComponent;
})();
exports.SysUserComponent = SysUserComponent;
//# sourceMappingURL=sysuser.js.map