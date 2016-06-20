var core_1 = require('@angular/core');
var index_1 = require("../../shared/index");
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var ShareTransferComponent = (function () {
    function ShareTransferComponent(_util, router) {
        var _this = this;
        this._util = _util;
        this.router = router;
        //问题显示开关
        //showList:boolean = false;
        this.showPro = true;
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
        //问题的数据
        this.agreement = new index_1.ConfidentAgreement();
        this.transfer = new index_1.ConfidentTransfer();
        this.business = true; //是否是企业 / 个人
        this.discloseToB = true; //是否向乙方披露
        this.discloseToA = true; //是否向甲方披露
        //liability:boolean = true;
        //moulds:Array<Moudle> = new Array<Moudle>();
        //docType:Array<Doctype> = new Array<Doctype>();
        //differ:any;
        this.file = new index_1.File();
        //history:History[] = new Array<History>(); //获取历史信息填表
        //his:History = new History();
        //isModal:boolean = false;
        //isInfo:string = "";
        //步骤
        this.step1 = 'active';
        this.step2 = 'disabled';
        this.step3 = 'disabled';
        //步骤组
        this.steps = new Array();
        this.mySteps = new index_1.Steps();
        //组装Attr json对象
        this.docAttr = new index_1.DocAttr();
        this.attrData = new Array();
        this.file = JSON.parse(sessionStorage.getItem('file'));
        this.file.docName = "股份转让协议" + _util.getSerialNo();
        //获取步骤组
        _util.getSteps().subscribe(function (res) {
            _this.steps = res.json();
            _this.getStepsById(3);
        });
        //if(sessionStorage.getItem("nextStep1")){ //如果已经进入了第二个阶段
        //  //this.nav('./ConfidTemplate');
        //  this.showPro = false;
        //  this.showList = false;
        //  this.showQ6 = true;
        //  this.step1 = 'completed';
        //  this.step2 = 'active';
        //  this.step3 = 'disabled';
        //  this.activeStep(2,1);
        //}
    }
    //获取历史信息填表
    ShareTransferComponent.prototype.getHistory = function (value) {
        //this._util.getHistory(this.file.userId,this.file.docType,this.file.templateId,value).subscribe((res)=>{
        //    this.history = <History[]>res.json();
        //    this.isInfo = value; //确定是显示什么样的列表
        //})
    };
    //选择记录填表
    ShareTransferComponent.prototype.selectRecord = function (hs) {
        //if(this.isInfo == "a"){
        //    if(this.business){
        //        this.aCompanyName = hs.aName;
        //    }else{
        //        this.aPersonName = hs.aName;
        //        this.aIdNo = hs.aIdNo;
        //    }
        //}else if(this.isInfo == "b"){
        //    if(this.business){
        //        this.bCompanyName = hs.bName;
        //    }else{
        //        this.bPersonName = hs.bName;
        //        this.bIdNo = hs.bIdNo;
        //    }
        //}else if(this.isInfo == "ac"){
        //    this.agreement.aContactName = hs.aContactName;
        //    this.agreement.aContactPhone = hs.aContactPhone;
        //    this.agreement.aContactEmail = hs.aContactEmail;
        //    this.agreement.aContactFax = hs.aContactFax;
        //    this.agreement.aContactAddress = hs.aContactAddress;
        //}else if(this.isInfo == "bc"){
        //    this.agreement.bContactName = hs.bContactName;
        //    this.agreement.bContactPhone = hs.bContactPhone;
        //    this.agreement.bContactEmail = hs.bContactEmail;
        //    this.agreement.bContactFax = hs.bContactFax;
        //    this.agreement.bContactAddress = hs.bContactAddress;
        //}else if(this.isInfo == "as"){
        //    this.agreement.aSiger = hs.aSiger;
        //}else if(this.isInfo == "bs"){
        //    this.agreement.bSiger = hs.bSiger;
        //}
        //
        //this.isModal = false;
    };
    //输入步骤组的id，获取步骤组
    ShareTransferComponent.prototype.getStepsById = function (id) {
        var _this = this;
        this.steps.forEach(function (s) {
            if (s.id === id) {
                _this.mySteps = s;
                return;
            }
        });
    };
    //按钮触发步骤变化
    ShareTransferComponent.prototype.activeStep = function (stepsId, stepId) {
        this.getStepsById(stepsId);
        this.mySteps.data.map(function (ms) {
            if (ms.stepId > stepId) {
                ms.status = "disabled";
            }
            else if (ms.stepId < stepId) {
                ms.status = "completed";
            }
            else {
                ms.status = "active";
            }
        });
    };
    //总结
    ShareTransferComponent.prototype.conclude = function () {
        if (this.aPersonName == null || this.bPersonName == null || this.aIdNo == null || this.bIdNo == null) {
            alert("名称不能为空！");
            return;
        }
        this.transfer.aName = this.aPersonName;
        this.transfer.bName = this.bPersonName;
        this.transfer.aIdNo = this.aIdNo;
        this.transfer.bIdNo = this.bIdNo;
        this.conclusion = this.transfer.aName + "与"
            + this.transfer.bName + "签订股份转让协议。在协议规定内，相互遵守和监督彼此股份转让信息。" +
            "是否确定？";
        this.showQ5 = !this.showQ5;
        this.showQ1 = !this.showQ1;
        this.activeStep(3, 3);
    };
    //下一阶段
    ShareTransferComponent.prototype.nextStep1 = function () {
        var _this = this;
        this.step1 = 'completed';
        this.step2 = 'active';
        this.step3 = 'disabled';
        this.activeStep(4, 1);
        if (sessionStorage.getItem("file")) {
            this._util.createFile(JSON.stringify(this.file)).subscribe(function (res) {
                _this.file.id = res.json();
                var documentId = _this.file.id;
                var a = new index_1.DocAttr(documentId, "aName", _this.transfer.aName);
                _this.attrData.push(a);
                a = new index_1.DocAttr(documentId, "bName", _this.transfer.bName);
                _this.attrData.push(a);
                a = new index_1.DocAttr(documentId, "aIdNo", _this.transfer.aIdNo);
                _this.attrData.push(a);
                a = new index_1.DocAttr(documentId, "bIdNo", _this.transfer.bIdNo);
                _this.attrData.push(a);
                _this._util.createDocAttr(JSON.stringify(_this.attrData)).subscribe(function () {
                    //sessionStorage.setItem("nextStep1","token");
                    swal("Good job!", "第一步完成！", "success");
                });
                _this.attrData = new Array(); //数据归零
            });
        }
        else {
            swal("Oops..", "请重新选择文件模板", "error");
            //alert("请重新选择文件模板");
            this.nav('./TemplateList');
        }
    };
    //测试
    ShareTransferComponent.prototype.test = function () {
        alert("ok");
    };
    //组装选择对象值为字符串，以分号隔开
    ShareTransferComponent.prototype.oToS = function () {
        this.activeStep(4, 2);
    };
    //组装选择对象值为字符串，以分号隔开
    ShareTransferComponent.prototype.oToSPerson = function () {
        var str = "";
    };
    //设置最后信息
    ShareTransferComponent.prototype.setAttrData = function () {
        sessionStorage.setItem("nextStep1", "");
        this.step1 = 'completed';
        this.step2 = 'completed';
        this.step3 = 'active';
        this.activeStep(4, 6);
        var documentId = this.file.id;
        var a = new index_1.DocAttr(documentId, "companyName", this.transfer.companyName);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "percentage", "" + this.transfer.percentage);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "totalMoney", "" + this.transfer.totalMoney);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "payMoney", "" + this.transfer.payMoney);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "residueMoney", "" + this.transfer.residueMoney);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "otherExpenses", this.transfer.otherExpenses);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "delayPercentage", "" + this.transfer.delayPercentage);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "aSiger", "" + this.transfer.aSiger);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "bSiger", "" + this.transfer.bSiger);
        this.attrData.push(a);
        a = new index_1.DocAttr(documentId, "committee", "" + this.transfer.committee);
        this.attrData.push(a);
    };
    //最后总结保存信息
    ShareTransferComponent.prototype.finalConclude = function () {
        var _this = this;
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(function () {
            swal("保存成功！", "第一步完成！", "success");
            _this.nav("File");
        });
    };
    ;
    //最后生成文件
    ShareTransferComponent.prototype.createDocument = function (format) {
        var _this = this;
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(function () {
            _this._util.generateFile("" + _this.file.id, format);
            _this.nav("File");
        });
    };
    ShareTransferComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    ShareTransferComponent = __decorate([
        core_1.Component({
            selector: 'sharetransfer-box',
            providers: [index_1.UtilService],
            directives: [common_1.FORM_DIRECTIVES],
            template: require('app/+sharetransfer/components/sharetransfer.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, router_deprecated_1.Router])
    ], ShareTransferComponent);
    return ShareTransferComponent;
})();
exports.ShareTransferComponent = ShareTransferComponent;
//# sourceMappingURL=sharetransfer.js.map