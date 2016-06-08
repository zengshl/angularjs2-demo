/**
 * Created by lenovo on 2016/5/20.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require("../../shared/index");
var entity_service_1 = require("../../shared/services/entity.service");
var SysRoleComponent = (function () {
    function SysRoleComponent(_util) {
        var _this = this;
        this._util = _util;
        this.tableShow = true;
        this.isInsert = false;
        this.nameSearch = "";
        this.noSearch = "";
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 3;
        this.menus = new Array();
        this.postPowers = new Array();
        this.pdata.searchData = { "roleName": this.nameSearch, "roleNo": this.noSearch };
        //实例化用户对象
        this.curRole = new entity_service_1.Role();
        this.arrayMenu = new Array();
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getRole(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
        //获取全部菜单
        this._util.getAllMenu().subscribe(function (res) {
            _this.menus = res.json();
            var menuArr = new Array();
            //将角色重构成每行3列
            for (var i = 0; i < _this.menus.length; i++) {
                if (i % 3 == 0 && i == _this.menus.length - 1) {
                    menuArr = new Array();
                    menuArr.push(_this.menus[i]);
                    _this.arrayMenu.push(menuArr);
                }
                else if (i % 3 == 0) {
                    menuArr = new Array();
                    menuArr.push(_this.menus[i]);
                }
                else if (i % 3 == 2 || i == _this.menus.length - 1) {
                    menuArr.push(_this.menus[i]);
                    _this.arrayMenu.push(menuArr);
                }
                else {
                    menuArr.push(_this.menus[i]);
                }
            }
        });
    }
    SysRoleComponent.prototype.ngAfterViewInit = function () {
    };
    //切换页面，获取表单数据
    SysRoleComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { "roleName": this.nameSearch, "roleNo": this.noSearch };
        this._util.getRole(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //删除角色
    SysRoleComponent.prototype.deleteData = function (role) {
        var _this = this;
        this._util.deleteRole(JSON.stringify(role)).subscribe(function (res) {
            var getdata = res.json();
            _this.updataTable();
        });
    };
    //获取详细信息
    SysRoleComponent.prototype.updataData = function (role) {
        var _this = this;
        this._util.getRoleInfo(JSON.stringify(role)).subscribe(function (res) {
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
                        var power = new entity_service_1.Power();
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
    SysRoleComponent.prototype.backTo = function () {
        this.curRole = new entity_service_1.Role();
        this.postPowers = new Array();
        this.tableShow = true;
    };
    //更新角色信息
    SysRoleComponent.prototype.updataRole = function () {
        var _this = this;
        var data = { "isInsert": this.isInsert, "role": this.curRole, "power": this.postPowers };
        this._util.updataRoleInfo(JSON.stringify(data)).subscribe(function (res) {
            var data = res.json();
            _this.updataTable();
        });
    };
    //重置表单
    SysRoleComponent.prototype.resetRole = function () {
        this.curRole = new entity_service_1.Role();
        this.postPowers = new Array();
        //for(var j=0;j<this.menus.length;j++){
        //  this.menus[j].flag = false;
        //}
    };
    //查询
    SysRoleComponent.prototype.filter = function () {
        this.pdata.searchData = { "roleName": this.nameSearch, "roleNo": this.noSearch };
        this.updataTable();
    };
    //调整到新增界面
    SysRoleComponent.prototype.insert = function () {
        this.isInsert = true;
        this.tableShow = false;
        this.resetRole();
    };
    //新增角色信息
    SysRoleComponent.prototype.insertRole = function () {
        var _this = this;
        var data = { "isInsert": this.isInsert, "role": this.curRole, "power": this.postPowers };
        this._util.insertRoleInfo(JSON.stringify(data)).subscribe(function (res) {
            _this.updataTable();
        });
    };
    //表格刷新
    SysRoleComponent.prototype.updataTable = function () {
        var _this = this;
        this.postPowers = new Array();
        this.pdata.searchData = { "roleName": this.nameSearch, "roleNo": this.noSearch };
        this._util.getRole(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //权限选中与取消
    SysRoleComponent.prototype.onSelect = function (event, menu) {
        if (event.checked) {
            var power = new entity_service_1.Power();
            power.roleId = this.curRole.id;
            power.powerId = menu.id;
            power.powerType = "menu";
            this.postPowers.push(power);
        }
        else {
            for (var i = 0; i < this.postPowers.length; i++) {
                if (this.postPowers[i].powerId == menu.id && this.postPowers[i].powerType == "menu") {
                    this.postPowers.splice(i, 1);
                }
            }
        }
    };
    //点击每一行表格
    SysRoleComponent.prototype.clickItem = function (item) {
        console.log(item);
    };
    SysRoleComponent.prototype.mouseenter = function (event, item) {
        console.log(event + "," + item);
    };
    SysRoleComponent = __decorate([
        core_1.Component({
            selector: 'sys_role',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives],
            styles: [require('app/+sysrole/components/sysrole.css')],
            template: require('app/+sysrole/components/sysrole.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService])
    ], SysRoleComponent);
    return SysRoleComponent;
})();
exports.SysRoleComponent = SysRoleComponent;
//# sourceMappingURL=sysrole.js.map