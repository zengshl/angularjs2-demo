/**
 * Created by wss on 2016/6/20.
 */
var core_1 = require('@angular/core');
var index_1 = require('../../shared/index');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var router_deprecated_1 = require('@angular/router-deprecated');
var ModifyFileComponent = (function () {
    function ModifyFileComponent(_util, dragulaService, router) {
        this._util = _util;
        this.dragulaService = dragulaService;
        this.router = router;
        this.showQ1 = false;
        this.showQ2 = false;
        this.showQ3 = false;
        this.showQ4 = false;
        this.showQ41 = false;
        this.showQ5 = false;
        this.showQ6 = false;
        this.showQ7 = false;
        this.showQ8 = false;
        this.showQ9 = false;
        this.showQ10 = false;
        this.attrData = new Array();
        this.modifyList = true;
        this.openMyFile = false;
    }
    ModifyFileComponent.prototype.ngAfterViewInit = function () {
    };
    //最终化文档
    ModifyFileComponent.prototype.finalizedDocument = function () {
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
    //生成文件
    ModifyFileComponent.prototype.createDocument = function (format) {
        this._util.generateFile("" + this.myFile.id, format);
    };
    //修改协议
    ModifyFileComponent.prototype.updateTransfer = function () {
        this.attrData = this._util.setTransferData(this.myFile.id, this.transfer);
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(function () {
            swal("Good job!", "修改成功！", "success");
        });
    };
    //修改文件
    ModifyFileComponent.prototype.updateFile = function () {
        this._util.updateFile(JSON.stringify(this.myFile)).subscribe();
    };
    ModifyFileComponent = __decorate([
        core_1.Component({
            selector: 'modifyfile-box',
            providers: [index_1.UtilService, ng2_dragula_1.DragulaService],
            directives: [ng2_dragula_1.Dragula],
            inputs: ['myFile', 'transfer', 'isFinal'],
            template: require('app/+modifyfile/components/modifyfile.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, ng2_dragula_1.DragulaService, router_deprecated_1.Router])
    ], ModifyFileComponent);
    return ModifyFileComponent;
})();
exports.ModifyFileComponent = ModifyFileComponent;
//# sourceMappingURL=modifyfile.js.map