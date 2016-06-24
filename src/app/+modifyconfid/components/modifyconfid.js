"use strict";
/**
 * Created by wss on 2016/6/20.
 */
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var index_1 = require('../../shared/index');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var router_deprecated_1 = require('@angular/router-deprecated');
var ModifyConfidComponent = (function () {
    function ModifyConfidComponent(_util, dragulaService, router) {
        var _this = this;
        this._util = _util;
        this.dragulaService = dragulaService;
        this.router = router;
        this.modifyList = true;
        this.showQ1 = false;
        this.showQ2 = false;
        this.showQ4 = false;
        this.showQ5 = false;
        this.showQ6 = false;
        this.dispute = true; //争议版本切换
        this.liability = true;
        this.attrData = new Array();
        this.openMyFile = false;
        this.disputeVersion1 = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
            + "如协商未能解决争议，任何一方可将争议提交（中国国际经济贸易仲裁委员会）仲裁，"
            + "仲裁应依照该会当时有效的仲裁规则进行。仲裁地点在（北京），仲裁语言为（中文），"
            + "仲裁裁决是终局的，对双方均有约束力。";
        this.disputeVersion2 = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
            + "如协商未能解决争议，任何一方可向具有管辖权的法院起诉。";
        //责任版本
        this.libVersion1 = " 如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接损失以及因此而支出的合理费用。";
        this.libVersion2 = "如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接和间接损失以及因此而支出的全部费用。";
        this.openHolderList = new core_2.EventEmitter();
        _util.getConfinfo().subscribe(function (res) {
            _this.confinfo = res.json();
        });
        //获取保密人员列表
        _util.getConfreciever().subscribe(function (res) {
            _this.confreciever = res.json();
        });
    }
    ModifyConfidComponent.prototype.ngAfterViewInit = function () {
    };
    //最终化文档
    ModifyConfidComponent.prototype.finalizedDocument = function () {
        var _this = this;
        if (confirm("您确定要最终化该文档?")) {
            this._util.finalFile(this.myFile.id).subscribe(function (res) {
                _this.isFinal = true;
                //最终化后，需要重新刷新文档列表
                //this.refreshFileList(this.myFile.folderId);
                alert("成功最终化文档！");
            });
            return true;
        }
        else {
            return false;
        }
    };
    //修改文件
    ModifyConfidComponent.prototype.updateFile = function () {
        this._util.updateFile(JSON.stringify(this.myFile)).subscribe();
    };
    ModifyConfidComponent.prototype.close = function (name) {
        this.openHolderList.emit(name);
    };
    //检查协议主体类型
    ModifyConfidComponent.prototype.checkOrg = function () {
        this.modifyList = !this.modifyList;
        if (this.agreement.organizationType == '企业') {
            this.showQ1 = !this.showQ1;
        }
        else {
            this.showQ2 = !this.showQ2;
        }
    };
    //保密材料选择..........................
    //全选
    ModifyConfidComponent.prototype.selectAll = function () {
        this.confinfo.forEach(function (c) {
            c.flag = true;
        });
    };
    ;
    //全不选
    ModifyConfidComponent.prototype.selectNone = function () {
        this.confinfo.forEach(function (c) {
            c.flag = false;
        });
    };
    //组装选择对象值为字符串，以分号隔开
    ModifyConfidComponent.prototype.oToS = function () {
        var str = "";
        this.confinfo.forEach(function (c) {
            if (c.flag) {
                str += c.value + "、";
            }
        });
        this.agreement.confDefination = str.substr(0, str.length - 1); //去除最后一个顿号
        this.updateAgreement();
    };
    //保密人员选择..........................
    //全选
    ModifyConfidComponent.prototype.selectAllPerson = function () {
        this.confreciever.forEach(function (c) {
            c.flag = true;
        });
    };
    ;
    //全不选
    ModifyConfidComponent.prototype.selectNonePerson = function () {
        this.confreciever.forEach(function (c) {
            c.flag = false;
        });
    };
    //组装选择对象值为字符串，以分号隔开
    ModifyConfidComponent.prototype.oToSPerson = function () {
        var str = "";
        this.confreciever.forEach(function (c) {
            if (c.flag) {
                str += c.value + "、";
            }
        });
        this.agreement.recievers = str.substr(0, str.length - 1); //去除最后一个顿号
        //方案选择
        if (this.dispute) {
            this.agreement.dispute = this.disputeVersion1;
        }
        else {
            this.agreement.dispute = this.disputeVersion2;
        }
        if (this.liability) {
            this.agreement.liability = this.libVersion1;
        }
        else {
            this.agreement.liability = this.libVersion2;
        }
        this.updateAgreement();
    };
    //修改协议
    ModifyConfidComponent.prototype.updateAgreement = function () {
        this.attrData = this._util.setAttrData(this.myFile.id, this.agreement);
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(function () {
            // alert("修改成功！");
            swal("Good job!", "修改成功！", "success");
        });
    };
    //生成文件
    ModifyConfidComponent.prototype.createDocument = function (format) {
        this._util.generateFile("" + this.myFile.id, format);
    };
    ModifyConfidComponent = __decorate([
        core_1.Component({
            selector: 'modifyconfid-box',
            providers: [index_1.UtilService, ng2_dragula_1.DragulaService],
            directives: [ng2_dragula_1.Dragula],
            inputs: ['myFile', 'agreement', 'isFinal'],
            outputs: ['openHolderList'],
            template: require('app/+modifyconfid/components/modifyconfid.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, ng2_dragula_1.DragulaService, router_deprecated_1.Router])
    ], ModifyConfidComponent);
    return ModifyConfidComponent;
}());
exports.ModifyConfidComponent = ModifyConfidComponent;
//# sourceMappingURL=modifyconfid.js.map