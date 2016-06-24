"use strict";
/**
 * Created by lenovo on 2016/5/30.
 */
var core_1 = require('@angular/core');
var datatable_1 = require('angular2-datatable/datatable');
var index_1 = require("../../shared/index");
var router_deprecated_1 = require('@angular/router-deprecated');
var entity_service_1 = require("../../shared/services/entity.service");
var SysMoudleComponent = (function () {
    function SysMoudleComponent(_util, router) {
        var _this = this;
        this._util = _util;
        this.router = router;
        this.attrData = { "data": [], page: 0, size: 0 };
        this.tableShow = true;
        this.isInsert = false;
        this.isAttrInsert = false;
        this.addAttr = false;
        this.isAddTypeMoudle = false;
        this.typeSearch = "";
        //实例化分页对象
        this.pdata = new entity_service_1.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 10;
        this.curType = new entity_service_1.Doctype();
        this.temps = new Array();
        this.allMoudle = new Array();
        this.curMoudle = new entity_service_1.Moudle();
        this.pdata.searchData = { "moudleName": this.typeSearch };
        //实例化用户对象
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
        _util.getMoudle(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
        });
        this.getAllMoudle();
    }
    SysMoudleComponent.prototype.ngAfterViewInit = function () {
        jQuery('#text').dropdown();
        //jQuery('.ui.fluid.search.dropdown').dropdown();
    };
    //切换页面，获取表单数据
    SysMoudleComponent.prototype.getPageData = function (ds) {
        var _this = this;
        ds.searchData = { "typeName": this.typeSearch };
        this._util.getMoudle(JSON.stringify(ds)).subscribe(function (res) {
            _this.data = res.json();
        });
    };
    //删除模板类型
    SysMoudleComponent.prototype.deleteData = function (doctype) {
        var _this = this;
        //由于返回的数据是map（string，string）类型，所以需要对number类型的数据进行处理
        var id = doctype.id;
        var preId = doctype.preId;
        var moudleId = doctype.moudleId;
        doctype.id = parseInt(id);
        doctype.preId = parseInt(preId);
        doctype.moudleId = parseInt(moudleId);
        this._util.deleteMoudle(JSON.stringify(doctype)).subscribe(function (res) {
            var getdata = res.json();
            if (getdata == 1) {
                swal("模板删除成功", "", "success");
            }
            else {
                swal("模板删除成功", "", "error");
            }
            _this.updataTable();
        });
    };
    //获取详细信息
    SysMoudleComponent.prototype.updataData = function (doctype) {
        var _this = this;
        //由于返回的数据是map（string，string）类型，所以需要对number类型的数据进行处理
        var id = doctype.id;
        var preId = doctype.preId;
        var moudleId = doctype.moudleId;
        doctype.id = parseInt(id);
        doctype.preId = parseInt(preId);
        doctype.moudleId = parseInt(moudleId);
        this._util.getMoudleInfo(JSON.stringify(doctype)).subscribe(function (res) {
            var getdata = res.json();
            _this.curType = getdata.data;
            _this.temps = getdata.temp;
            _this.attrData.data = _this.temps;
            _this.attrData.page = 1;
            _this.attrData.size = _this.temps.length;
            console.log(_this.attrData);
            _this.tableShow = false;
            _this.isInsert = false;
        });
    };
    //返回列表界面
    SysMoudleComponent.prototype.backTo = function () {
        this.curType = new entity_service_1.Doctype();
        this.temps = new Array();
        this.tableShow = true;
        this.updataTable();
    };
    //重置表单
    SysMoudleComponent.prototype.resetMoudle = function () {
        this.curType = new entity_service_1.Doctype();
        this.temps = new Array();
    };
    //查询
    SysMoudleComponent.prototype.filter = function () {
        this.pdata.searchData = { "typeName": this.typeSearch };
        this.updataTable();
    };
    //调整到新增界面
    SysMoudleComponent.prototype.insert = function () {
        this.isInsert = true;
        this.tableShow = false;
        this.resetMoudle();
    };
    //表格刷新
    SysMoudleComponent.prototype.updataTable = function () {
        var _this = this;
        this.temps = new Array();
        this.attrData.data = this.temps;
        this.attrData.page = 1;
        this.attrData.size = this.temps.length;
        this.pdata.searchData = { "typeName": this.typeSearch };
        this._util.getMoudle(JSON.stringify(this.pdata)).subscribe(function (res) {
            _this.data = res.json();
            _this.tableShow = true;
        });
    };
    SysMoudleComponent.prototype.mouseenter = function (event, item) {
    };
    //跳转到增加模板属性界面
    SysMoudleComponent.prototype.insertTemp = function () {
        this.addAttr = true;
        this.addTemp = new entity_service_1.DocTemplate();
        this.isAttrInsert = true;
    };
    //返回模板信息界面
    SysMoudleComponent.prototype.goback = function () {
        this.addAttr = false;
    };
    //新增类型模板
    SysMoudleComponent.prototype.insertAttrData = function () {
        this.temps.push(this.addTemp);
        this.updataAttrData();
    };
    //重置模板属性
    SysMoudleComponent.prototype.resetAttr = function () {
        this.addTemp = new entity_service_1.DocTemplate();
    };
    SysMoudleComponent.prototype.updataAttr = function (item) {
        this.addAttr = true;
        this.addTemp = item;
        this.isAttrInsert = false;
    };
    SysMoudleComponent.prototype.updataAttrData = function () {
        this.attrData.data = this.temps;
        this.attrData.page = 1;
        this.attrData.size = this.temps.length;
        this.addAttr = false;
    };
    //获取全部模块
    SysMoudleComponent.prototype.getAllMoudle = function () {
        var _this = this;
        this._util.getAllMoudle().subscribe(function (res) {
            _this.allMoudle = res.json();
        });
    };
    //跳转到添加模块界面
    SysMoudleComponent.prototype.insertTypeMoudle = function () {
        this.isAddTypeMoudle = true;
        this.curMoudle = new entity_service_1.Moudle();
    };
    //新增模块
    SysMoudleComponent.prototype.insertTypeMoudleData = function () {
        var _this = this;
        this._util.insertTypeMoudle(JSON.stringify(this.curMoudle)).subscribe(function (res) {
            var data = res.json();
            if (data != null && data != 0) {
                swal("模块保存成功", "", "success");
            }
            else {
                swal("模块保存失败", "", "error");
            }
            _this.resetTypeMoudle();
            _this.getAllMoudle();
            _this.isAddTypeMoudle = false;
        });
    };
    //重置模块
    SysMoudleComponent.prototype.resetTypeMoudle = function () {
        this.curMoudle = new entity_service_1.Moudle();
    };
    //返回类型信息界面
    SysMoudleComponent.prototype.backType = function () {
        this.curMoudle = new entity_service_1.Moudle();
        this.isAddTypeMoudle = false;
    };
    //新增或者保存
    SysMoudleComponent.prototype.insertOrUpdata = function () {
        var _this = this;
        if (this.isInsert) {
            //对数据进行处理
            var moudleId = jQuery("#moudleId").val();
            if (moudleId != null && moudleId != "") {
                this.curType.moudleId = parseInt(moudleId);
            }
            var data = { "isInsert": this.isInsert, "type": this.curType, "temp": this.temps };
            this._util.insertMoudleInfo(JSON.stringify(data)).subscribe(function (res) {
                var resData = res.json();
                if (resData.typeRes != null && resData.typeRes != 0) {
                    swal("模板保存成功", "", "success");
                }
                else {
                    swal("模板保存失败", "", "error");
                }
                _this.updataTable();
            });
        }
        else {
            //对数据进行处理
            var moudleId = jQuery("#moudleId").val();
            this.curType.moudleId = parseInt(moudleId);
            var data = { "isInsert": this.isInsert, "type": this.curType, "temp": this.temps };
            this._util.updataMoudleInfo(JSON.stringify(data)).subscribe(function (res) {
                var data = res.json();
                if (data.roleRes == 1) {
                    swal("模板修改成功", "", "success");
                }
                else {
                    swal("模板修改失败", "", "error");
                }
                _this.updataTable();
            });
        }
    };
    SysMoudleComponent.prototype.insertOrUpdataAttr = function () {
        if (this.isAttrInsert) {
            this.temps.push(this.addTemp);
            this.updataAttrData();
        }
        else {
            this.updataAttrData();
        }
    };
    SysMoudleComponent = __decorate([
        core_1.Component({
            selector: 'sys_moudle',
            providers: [index_1.UtilService],
            directives: [datatable_1.DataTableDirectives],
            styles: [require('app/+sysmoudle/components/sysmoudle.css')],
            template: require('app/+sysmoudle/components/sysmoudle.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, router_deprecated_1.Router])
    ], SysMoudleComponent);
    return SysMoudleComponent;
}());
exports.SysMoudleComponent = SysMoudleComponent;
//# sourceMappingURL=sysmoudle.js.map