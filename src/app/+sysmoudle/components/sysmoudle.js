/**
 * Created by lenovo on 2016/5/30.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require("../../shared/index");
var entity_service_1 = require("../../shared/services/entity.service");
var SysMoudleComponent = (function () {
    function SysMoudleComponent(_util) {
        var _this = this;
        this._util = _util;
        this.tableShow = true;
        this.attrs = Array();
        this.isInsert = false;
        this.nameSearch = "";
        this.titleSearch = "";
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 3;
        this.curMoudle = new entity_service_1.Moudle();
        this.attrs = new Array();
        this.pdata.searchData = { "resourceName": this.nameSearch, "resourceTitle": this.titleSearch };
        //实例化用户对象
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getMoudle(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
    }
    SysMoudleComponent.prototype.ngAfterViewInit = function () {
    };
    //切换页面，获取表单数据
    SysMoudleComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { "resourceName": this.nameSearch, "resourceTitle": this.titleSearch };
        this._util.getMoudle(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //删除角色
    SysMoudleComponent.prototype.deleteData = function (role) {
        var _this = this;
        this._util.deleteMoudle(JSON.stringify(role)).subscribe(function (res) {
            var getdata = res.json();
            _this.updataTable();
        });
    };
    //获取详细信息
    SysMoudleComponent.prototype.updataData = function (role) {
        var _this = this;
        this._util.getMoudleInfo(JSON.stringify(role)).subscribe(function (res) {
            var getdata = res.json();
            _this.curRole = getdata.data;
            _this.powers = getdata.power;
            //有权限的菜单打勾
            for (var j = 0; j < _this.menus.length; j++) {
                _this.menus[j].flag = false;
                for (var i = 0; i < _this.powers.length; i++) {
                    if (_this.powers[i].id == _this.menus[j].id) {
                        //该菜单选中
                        _this.menus[j].flag = true;
                        //将已有的权限保存，以便更新时使用
                        var power = new Power();
                        power.roleId = _this.curRole.id;
                        power.powerId = _this.menus[j].id;
                        power.powerType = "menu";
                        _this.postPowers.push(power);
                    }
                }
            }
            _this.tableShow = false;
            _this.isInsert = false;
        });
    };
    //返回列表界面
    SysMoudleComponent.prototype.backTo = function () {
        this.curRole = new Role();
        this.postPowers = new Array();
        this.tableShow = true;
    };
    //更新角色信息
    SysMoudleComponent.prototype.updataRole = function () {
        var _this = this;
        var data = { "isInsert": this.isInsert, "moudle": this.curMoudle, "attrs": this.attrs };
        this._util.updataMoudleInfo(JSON.stringify(data)).subscribe(function (res) {
            var data = res.json();
            _this.updataTable();
        });
    };
    //重置表单
    SysMoudleComponent.prototype.resetRole = function () {
        this.curRole = new Role();
        this.postPowers = new Array();
    };
    //查询
    SysMoudleComponent.prototype.filter = function () {
        this.pdata.searchData = { "resourceName": this.nameSearch, "resourceTitle": this.titleSearch };
        this.updataTable();
    };
    //调整到新增界面
    SysMoudleComponent.prototype.insert = function () {
        this.isInsert = true;
        this.tableShow = false;
        this.resetRole();
    };
    //新增角色信息
    SysMoudleComponent.prototype.insertMoudle = function () {
        var _this = this;
        var data = { "isInsert": this.isInsert, "moudle": this.curMoudle, "attrs": this.attrs };
        this._util.insertMoudleInfo(JSON.stringify(data)).subscribe(function (res) {
            _this.updataTable();
        });
    };
    //表格刷新
    SysMoudleComponent.prototype.updataTable = function () {
        var _this = this;
        this.postPowers = new Array();
        this.pdata.searchData = { "resourceName": this.nameSearch, "resourceTitle": this.titleSearch };
        this._util.getMoudle(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //点击每一行表格
    SysMoudleComponent.prototype.clickItem = function (item) {
        console.log(item);
    };
    SysMoudleComponent = __decorate([
        core_1.Component({
            selector: 'sys_moudle',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives],
            styles: [require('app/+sysmoudle/components/sysmoudle.css')],
            template: require('app/+sysmoudle/components/sysmoudle.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService])
    ], SysMoudleComponent);
    return SysMoudleComponent;
})();
exports.SysMoudleComponent = SysMoudleComponent;
//# sourceMappingURL=sysmoudle.js.map