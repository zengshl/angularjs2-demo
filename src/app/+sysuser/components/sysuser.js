"use strict";
/**
 * Created by lenovo on 2016/5/20.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require('../../shared/index');
var entity_service_1 = require('../../shared/services/entity.service');
var common_1 = require('@angular/common');
var ng2_datetime_1 = require('ng2-datetime/ng2-datetime');
var common_2 = require('@angular/common');
var core_2 = require('ng2-validate/core');
var index_2 = require("../../shared/index");
var SysUserComponent = (function () {
    function SysUserComponent(_util) {
        var _this = this;
        this._util = _util;
        this.tableShow = true;
        this.userBase = new entity_service_1.UserBase();
        this.secondPSD = "";
        this.isInsert = false;
        this.isdeletes = true;
        this.accountSearch = '';
        this.phoneSearch = '';
        this.modalContent = '';
        this.modalHeader = '';
        this.birthday = "";
        Date.prototype.toJSON = function () { return this.toLocaleString(); }; //初始化日期时区
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 8;
        this.pdata.searchData = { 'account': this.accountSearch, 'phone': this.phoneSearch };
        //实例化用户对象
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
        this.getRole = new Array();
        this.userRole = new Array();
        this.arrayRole = new Array();
        this.ids = new Array();
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getAdmin(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
        //获取全部角色
        _util.getAllRole().subscribe(function (res) {
            _this.getRole = res.json();
            var roleArr = new Array();
            //将角色重构成每行4列
            for (var i = 0; i < _this.getRole.length; i++) {
                if (i % 3 == 0 && i == _this.getRole.length - 1) {
                    roleArr = new Array();
                    roleArr.push(_this.getRole[i]);
                    _this.arrayRole.push(roleArr);
                }
                else if (i % 3 == 0) {
                    roleArr = new Array();
                    roleArr.push(_this.getRole[i]);
                }
                else if (i % 3 == 2 || i == _this.getRole.length - 1) {
                    roleArr.push(_this.getRole[i]);
                    _this.arrayRole.push(roleArr);
                }
                else {
                    roleArr.push(_this.getRole[i]);
                }
            }
        });
    }
    SysUserComponent.prototype.ngAfterViewInit = function () {
        jQuery('#gender').click(function () {
            alert('11');
        });
        jQuery("#selected").dropdown({
            maxSelections: 3
        });
        jQuery('.ui.radio.checkbox').checkbox();
        jQuery("[name='gender']").on("change", function (e) {
            console.log(jQuery(e.target).val());
        });
        this.mobileControl = new common_2.Control('', new index_2.MobileValidation().validator);
        this.emailControl = new common_2.Control('', new index_2.EmailValidation().validator);
        this.myForm = new common_2.ControlGroup({
            emailControl: this.emailControl,
            mobileControl: this.mobileControl
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
        //将string转为int
        var id = user.id;
        user.id = parseInt(id);
        this._util.deleteAdmin(JSON.stringify(user)).subscribe(function (res) {
            var getdata = res.json();
            if (getdata == 1) {
                swal("用户删除成功", "", "success");
            }
            else {
                swal("用户删除失败", "", "error");
            }
            _this.updataTable();
        });
    };
    //获取详细信息
    SysUserComponent.prototype.updataData = function (user) {
        var _this = this;
        //由于获取到的列表是map（string，string），所以需要多number类型的数据进行转换
        var id = user.id;
        user.id = parseInt(id);
        this._util.getAdminInfo(JSON.stringify(user)).subscribe(function (res) {
            var getdata = res.json();
            _this.curUser = getdata.data;
            if (getdata.base.length > 0)
                _this.userBase = getdata.base[0];
            _this.birthday = _this.userBase.birthday.substr(0, 8);
            console.log(_this.userBase.birthday, _this.birthday);
            _this.getUserRole = getdata.role;
            //有权限的角色打勾
            for (var j = 0; j < _this.getRole.length; j++) {
                _this.getRole[j].flag = false;
                for (var i = 0; i < _this.getUserRole.length; i++) {
                    if (_this.getUserRole[i].id == _this.getRole[j].id) {
                        //该菜单选中
                        _this.getRole[j].flag = true;
                        //将已有的权限保存，以便更新时使用
                        var userrole = new entity_service_1.UserRole();
                        userrole.userId = _this.curUser.id;
                        userrole.roleId = _this.getRole[j].id;
                        _this.userRole.push(userrole);
                    }
                }
            }
            _this.tableShow = false;
            _this.isInsert = false;
        });
    };
    //返回列表界面
    SysUserComponent.prototype.backTo = function () {
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
        this.userRole = new Array();
        this.tableShow = true;
    };
    //更新用户信息
    SysUserComponent.prototype.updataAdmin = function () {
        var _this = this;
        //var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase};
        var data = { 'isInsert': this.isInsert, 'user': this.curUser, 'base': this.userBase, 'role': this.userRole };
        this._util.updataAdminInfo(JSON.stringify(data)).subscribe(function (res) {
            var data = res.json();
            _this.updataTable();
        });
    };
    //重置表单
    SysUserComponent.prototype.resetAdmin = function () {
        this.curUser = new entity_service_1.Admin();
        this.userBase = new entity_service_1.UserBase();
        this.userRole = new Array();
        //for(var j=0;j<this.getRole.length;j++){
        //  this.getRole[j].flag = false;
        //}
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
        if (this.curUser.password != '' && this.curUser.password == this.secondPSD) {
            //var data = {'isInsert':this.isInsert,'user':this.curUser,'base':this.userBase};
            var data = { 'isInsert': this.isInsert, 'user': this.curUser, 'base': this.userBase, 'role': this.userRole };
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
        this.userRole = new Array();
        this.ids = new Array();
        this.pdata.searchData = { 'account': this.accountSearch, 'phone': this.phoneSearch };
        this._util.getAdmin(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    //角色选中与取消
    SysUserComponent.prototype.onSelect = function (event, role) {
        if (event.checked) {
            var addrole = new entity_service_1.UserRole();
            addrole.userId = this.curUser.id;
            addrole.roleId = role.id;
            this.userRole.push(addrole);
        }
        else {
            for (var i = 0; i < this.userRole.length; i++) {
                if (this.userRole[i].roleId == role.id) {
                    this.userRole.splice(i, 1);
                }
            }
        }
    };
    //批量删除勾选
    SysUserComponent.prototype.onDelete = function (event, item) {
        if (event.checked) {
            //选中
            this.ids.push(parseInt(item.id));
        }
        else {
            //取消
            for (var i = 0; i < this.ids.length; i++) {
                if (this.ids[i] == item.id) {
                    this.ids.splice(i, 1);
                }
            }
        }
        //批量删除按钮点击控制
        if (this.ids.length > 0) {
            this.isdeletes = false;
        }
        else {
            this.isdeletes = true;
        }
    };
    //批量删除
    SysUserComponent.prototype.deletes = function () {
        var _this = this;
        this._util.adminDeletes(JSON.stringify(this.ids)).subscribe(function (res) {
            _this.updataTable();
            swal("批量删除成功", "", "success");
        });
    };
    SysUserComponent.prototype.radioSelect = function (event) {
        if (event.checked) {
            console.log(event.value);
        }
    };
    //新增或者保存
    SysUserComponent.prototype.insertOrUpdata = function () {
        var _this = this;
        if (this.myForm.valid) {
            var data = { 'isInsert': this.isInsert, 'user': this.curUser, 'base': this.userBase, 'role': this.userRole };
            Date.prototype.toJSON = function () { return this.toLocaleString(); };
            if (this.isInsert) {
                if (this.curUser.password != '' && this.curUser.password == this.secondPSD) {
                    var data = { 'isInsert': this.isInsert, 'user': this.curUser, 'base': this.userBase, 'role': this.userRole };
                    this._util.insertAdminInfo(JSON.stringify(data)).subscribe(function (res) {
                        var data = res.json();
                        if (data.userRes != null && data.userRes != 0) {
                            swal("用户保存成功", "", "success");
                        }
                        else {
                            swal("用户保存失败", "", "error");
                        }
                        _this.updataTable();
                    });
                }
                else {
                    swal("新增失败,请确认两次密码一致", "", "error");
                }
            }
            else {
                this._util.updataAdminInfo(JSON.stringify(data)).subscribe(function (res) {
                    var data = res.json();
                    if (data.userRes == 1) {
                        swal("用户修改成功", "", "success");
                    }
                    else {
                        swal("用户修改失败", "", "error");
                    }
                    _this.updataTable();
                });
            }
        }
        else {
        }
    };
    SysUserComponent = __decorate([
        core_1.Component({
            selector: 'sys_user',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives, common_1.FORM_DIRECTIVES, ng2_datetime_1.NKDatetime, core_2.ValidationMessagesComponent],
            styles: [require('app/+sysuser/components/sysuser.css')],
            template: require('app/+sysuser/components/sysuser.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService])
    ], SysUserComponent);
    return SysUserComponent;
}());
exports.SysUserComponent = SysUserComponent;
//# sourceMappingURL=sysuser.js.map