var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var entity_service_1 = require("./entity.service");
/**
 * Created by Ping on 2016/5/10.
 */
var UtilService = (function () {
    function UtilService(http) {
        //通过构造器解析网页内部的json数据，将原始数据流存储于_promise中，将流的json对象存储到components中；
        //this._promise = new Promise<void>((resolve) =>  {
        //  http.get('assets/json/users.json')
        //    .subscribe((res: Response) =>  {
        //      this.users = res.json();
        //      resolve();
        //    });
        //});
        this.http = http;
        //private url = 'http://120.24.252.170:9000/';
        //  private url = 'http://192.168.1.104:9000/';
        this.url = 'http://localhost:9000/';
    }
    ;
    //将构造器解析出来的存储于components中的json数据，转为原始数据流，并存储于_promise中，并返回；
    //  getUsers(): Promise<User[]>  {
    //    return this._promise.then(() =>  {
    //      return this.users;
    //    });
    //  };
    //获取confinfo的jason数据
    UtilService.prototype.getConfinfo = function () {
        return this.http.get("assets/json/confinfo.json");
    };
    //获取confreciever的jason数据
    UtilService.prototype.getConfreciever = function () {
        return this.http.get("assets/json/confreciever.json");
    };
    //获取mould的jason数据
    UtilService.prototype.getMould = function () {
        var str = this.url + 'law/doc/getMoudleList';
        return this.http.get(str);
    };
    //获取doctype的jason数据
    UtilService.prototype.getDoctype = function (mouldId) {
        var str = this.url + 'law/doc/getDocTypeListByMoudleId/' + mouldId;
        return this.http.get(str);
    };
    //获取验证码
    UtilService.prototype.getValidCode = function (phone) {
        var str = this.url + 'law/user/smsValid/' + phone;
        return this.http.get(str);
    };
    ;
    //获取验证码
    UtilService.prototype.getValidCodeForgot = function (phone) {
        var str = this.url + 'law/user/smsValidMdPassword/' + phone;
        return this.http.get(str);
    };
    ;
    //手机号或者邮箱获取验证码
    UtilService.prototype.getValidMdPassword = function (data) {
        var str = this.url + 'law/user/ValidMdPassword';
        return this.http.post(str, data);
    };
    //注册表单提交
    UtilService.prototype.signUp = function (data) {
        var str = this.url + 'law/user/register';
        return this.http.post(str, data);
    };
    ;
    //登陆
    UtilService.prototype.logIn = function (data) {
        var str = this.url + 'law/user/login';
        return this.http.post(str, data);
    };
    ;
    //修改密码
    UtilService.prototype.mdfPassword = function (data) {
        var str = this.url + 'law/user/forgetPassword';
        return this.http.post(str, data);
    };
    ;
    //用户管理部分
    //获取管理用户信息
    UtilService.prototype.getAdmin = function (pageData) {
        var str = this.url + 'law/sysuser/pageListMap';
        return this.http.post(str, pageData);
    };
    ;
    //获取数据
    UtilService.prototype.getData = function (pageData, url) {
        var str = url + "/pageListMap";
        return this.http.post(str, pageData);
    };
    //删除管理用户信息
    UtilService.prototype.deleteAdmin = function (data) {
        var str = this.url + 'law/sysuser/userDelect';
        return this.http.post(str, data);
    };
    UtilService.prototype.getAdminInfo = function (data) {
        var str = this.url + 'law/sysuser/getInfo';
        return this.http.post(str, data);
    };
    UtilService.prototype.updataAdminInfo = function (data) {
        var str = this.url + "law/sysuser/updataInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.insertAdminInfo = function (data) {
        var str = this.url + "law/sysuser/insertInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.adminDeletes = function (data) {
        var str = this.url + "law/sysuser/deletes";
        return this.http.post(str, data);
    };
    //通过客户id获取文件夹
    UtilService.prototype.getFolder = function (userId) {
        var str = this.url + "law/doc/queryFolderByUserId/" + userId;
        return this.http.get(str);
    };
    //通过客户id和文件夹id获取文件
    UtilService.prototype.getFile = function (folderId, userId) {
        var str = this.url + "law/doc/queryDocByUserIdFoldId/" + folderId + "/" + userId;
        return this.http.get(str);
    };
    //删除文件夹
    UtilService.prototype.deleteFolder = function (folderId, userId) {
        var str = this.url + "law/doc/removeFolder/" + userId + "/" + folderId;
        return this.http.get(str);
    };
    //更新文件夹
    UtilService.prototype.updateFolder = function (data) {
        var str = this.url + 'law/doc/updataFolder';
        return this.http.post(str, data);
    };
    //更新文件
    UtilService.prototype.updateFile = function (data) {
        data = '{"doc":' + data + '}';
        var str = this.url + 'law/doc/updataDocument';
        return this.http.post(str, data);
    };
    //更新文件的文件夹id
    UtilService.prototype.updateFileFolder = function (data) {
        var str = this.url + 'law/doc/updataDocumentWithFolderId';
        return this.http.post(str, data);
    };
    //最终化文件
    UtilService.prototype.finalFile = function (docId) {
        var str = this.url + "law/doc/finalDoc/" + docId;
        return this.http.get(str);
    };
    UtilService.prototype.adminLogin = function (data) {
        var str = this.url + 'law/sysuser/loginByPhone';
        return this.http.post(str, data);
    };
    UtilService.prototype.getAllRole = function () {
        var str = this.url + "law/sysuser/getAllRole";
        return this.http.get(str);
    };
    //角色管理部分
    //获取管理用户信息
    UtilService.prototype.getRole = function (pageData) {
        var str = this.url + 'law/sysrole/pageList';
        return this.http.post(str, pageData);
    };
    ;
    //删除管理用户信息
    UtilService.prototype.deleteRole = function (data) {
        var str = this.url + 'law/sysrole/roleDelect';
        return this.http.post(str, data);
    };
    UtilService.prototype.getRoleInfo = function (data) {
        var str = this.url + 'law/sysrole/getInfo';
        return this.http.post(str, data);
    };
    UtilService.prototype.updataRoleInfo = function (data) {
        var str = this.url + "law/sysrole/updataInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.insertRoleInfo = function (data) {
        var str = this.url + "law/sysrole/insertInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.getAllMenu = function () {
        var str = this.url + "law/sysrole/getAllMenu";
        return this.http.get(str);
    };
    //批量删除角色
    UtilService.prototype.roleDeletes = function (data) {
        var str = this.url + "law/sysrole/deletes";
        return this.http.post(str, data);
    };
    /**
     * 文件夹部分
     * */
    UtilService.prototype.getFolderList = function (data) {
        var str = this.url + "law/doc/pageFolder";
        return this.http.post(str, data);
    };
    UtilService.prototype.getDocumentByuserIdAndfolderId = function (data) {
        var str = this.url + "law/doc/queryDocWithSearchData";
        return this.http.post(str, data);
    };
    //后台用户部分
    UtilService.prototype.getUser = function (data) {
        var str = this.url + "law/user/pagelist";
        return this.http.post(str, data);
    };
    //创建文件夹
    UtilService.prototype.createFolder = function (folderName, userId) {
        var str = this.url + "law/doc/createFolde";
        var data = '{"folderName":"' + folderName + '", "userId":' + userId + '}';
        return this.http.post(str, data);
    };
    //后台模板部分
    UtilService.prototype.getMoudle = function (data) {
        var str = this.url + "law/moudle/pageList";
        return this.http.post(str, data);
    };
    UtilService.prototype.deleteMoudle = function (data) {
        var str = this.url + "law/moudle/moudleDelect";
        return this.http.post(str, data);
    };
    UtilService.prototype.getMoudleInfo = function (data) {
        var str = this.url + "law/moudle/getInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.updataMoudleInfo = function (data) {
        var str = this.url + "law/moudle/updataInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.insertMoudleInfo = function (data) {
        var str = this.url + "law/moudle/insertInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.getDocTemplate = function (data) {
        var str = this.url + "law/moudle/getDocTemplate";
        return this.http.post(str, data);
    };
    //后台文件资源模板
    UtilService.prototype.deleteTemplate = function (data) {
        var str = this.url + "law/template/deleteTemplate";
        return this.http.post(str, data);
    };
    UtilService.prototype.getTemplateInfo = function (data) {
        var str = this.url + "law/template/getTemplateInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.updataTemplateInfo = function (data) {
        var str = this.url + "law/template/updataTemplateInfo";
        return this.http.post(str, data);
    };
    UtilService.prototype.insertTemplateInfo = function (data) {
        var str = this.url + "law/template/insertTemplateInfo";
        return this.http.post(str, data);
    };
    //获取全部文档模块
    UtilService.prototype.getAllMoudle = function () {
        var str = this.url + "law/moudle/getAllMoudle";
        return this.http.get(str);
    };
    //
    UtilService.prototype.insertTypeMoudle = function (data) {
        var str = this.url + "law/moudle/insertTypeMoudle";
        return this.http.post(str, data);
    };
    //创建文件，返回文件id
    UtilService.prototype.createFile = function (data) {
        var str = this.url + "law/doc/insertUserDoc";
        return this.http.post(str, data);
    };
    //创建文件属性，返回文件0，1
    UtilService.prototype.createDocAttr = function (data) {
        var str = this.url + "law/docattr/insert";
        return this.http.post(str, data);
    };
    //通过文件id,获取所有该文件属性
    UtilService.prototype.getDocAttrs = function (docId) {
        var data = JSON.stringify({ "documentId": docId });
        var str = this.url + "law/docattr/getAttrWithDocumentId";
        return this.http.post(str, data);
    };
    //生成文档文件
    UtilService.prototype.generateFile = function (fileId, format) {
        var str = this.url + "law/doc/downLoadFile/" + fileId + "/" + format;
        window.open(str);
        //return this.http.get(str);
    };
    //根据id获取用户信息
    UtilService.prototype.getUserById = function (id) {
        var str = this.url + "law/user/getUserById/" + id;
        return this.http.get(str);
    };
    //更新用户信息
    UtilService.prototype.updataUser = function (data) {
        var str = this.url + "law/user/updata";
        return this.http.post(str, data);
    };
    //删除文档
    UtilService.prototype.deleteFile = function (docId) {
        var data = JSON.stringify({ "documentId": docId });
        var str = this.url + "law/doc/deleteDocById";
        return this.http.post(str, data);
    };
    //复制文档
    UtilService.prototype.copyFile = function (data) {
        var str = this.url + "law/doc/copyDoc";
        return this.http.post(str, data);
    };
    //获取案件类型列表
    UtilService.prototype.getLawCategory = function () {
        var str = "assets/json/lawcategory.json";
        return this.http.get(str);
    };
    //对属性数据进行转化 1
    UtilService.prototype.transFormat = function (attr) {
        var c = new entity_service_1.ConfidentAgreement();
        attr.forEach(function (a) {
            if (a.attrName === "organizationType")
                c.organizationType = a.attrValue;
            if (a.attrName === "aName")
                c.aName = a.attrValue;
            if (a.attrName === "aIdNo")
                c.aIdNo = a.attrValue;
            if (a.attrName === "aAddress")
                c.aAddress = a.attrValue;
            if (a.attrName === "bName")
                c.bName = a.attrValue;
            if (a.attrName === "bIdNo")
                c.bIdNo = a.attrValue;
            if (a.attrName === "bAddress")
                c.bAddress = a.attrValue;
            if (a.attrName === "projectName")
                c.projectName = a.attrValue;
            if (a.attrName === "confDefination")
                c.confDefination = a.attrValue;
            if (a.attrName === "contractPeriod")
                c.contractPeriod = parseInt(a.attrValue);
            if (a.attrName === "secrecy")
                c.secrecy = parseInt(a.attrValue);
            if (a.attrName === "aContactName")
                c.aContactName = a.attrValue;
            if (a.attrName === "aContactPhone")
                c.aContactPhone = a.attrValue;
            if (a.attrName === "aContactEmail")
                c.aContactEmail = a.attrValue;
            if (a.attrName === "aContactFax")
                c.aContactFax = a.attrValue;
            if (a.attrName === "aContactAddress")
                c.aContactAddress = a.attrValue;
            if (a.attrName === "bContactName")
                c.bContactName = a.attrValue;
            if (a.attrName === "bContactPhone")
                c.bContactPhone = a.attrValue;
            if (a.attrName === "bContactEmail")
                c.bContactEmail = a.attrValue;
            if (a.attrName === "bContactFax")
                c.bContactFax = a.attrValue;
            if (a.attrName === "bContactAddress")
                c.bContactAddress = a.attrValue;
            if (a.attrName === "recievers")
                c.recievers = a.attrValue;
            if (a.attrName === "dispute")
                c.dispute = a.attrValue;
            if (a.attrName === "liability")
                c.liability = a.attrValue;
            if (a.attrName === "aSiger")
                c.aSiger = a.attrValue;
            if (a.attrName === "bSiger")
                c.bSiger = a.attrValue;
        });
        return c;
    };
    //对属性数据进行转化 1
    UtilService.prototype.transTransfer = function (attr) {
        var c = new entity_service_1.ConfidentTransfer();
        attr.forEach(function (a) {
            if (a.attrName === "aName")
                c.aName = a.attrValue;
            if (a.attrName === "aIdNo")
                c.aIdNo = a.attrValue;
            if (a.attrName === "bName")
                c.bName = a.attrValue;
            if (a.attrName === "bIdNo")
                c.bIdNo = a.attrValue;
            if (a.attrName === "percentage")
                c.percentage = parseInt(a.attrValue);
            if (a.attrName === "totalMoney")
                c.totalMoney = parseInt(a.attrValue);
            if (a.attrName === "payMoney")
                c.payMoney = parseInt(a.attrValue);
            if (a.attrName === "residueMoney")
                c.residueMoney = parseInt(a.attrValue);
            if (a.attrName === "otherExpenses")
                c.otherExpenses = a.attrValue;
            if (a.attrName === "delayPercentage")
                c.delayPercentage = parseInt(a.attrValue);
            if (a.attrName === "committee")
                c.committee = a.attrValue;
            if (a.attrName === "companyName")
                c.companyName = a.attrValue;
            if (a.attrName === "aSiger")
                c.aSiger = a.attrValue;
            if (a.attrName === "bSiger")
                c.bSiger = a.attrValue;
        });
        return c;
    };
    //属性转化2
    UtilService.prototype.setAttrData = function (documentId, agreement) {
        var attrData = new Array();
        var a = new entity_service_1.DocAttr(documentId, "aName", agreement.aName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bName", agreement.bName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "organizationType", agreement.organizationType);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aIdNo", agreement.aIdNo);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bIdNo", agreement.bIdNo);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "projectName", agreement.projectName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "confDefination", agreement.confDefination);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "contractPeriod", "" + agreement.contractPeriod);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "secrecy", "" + agreement.secrecy);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aContactName", agreement.aContactName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bContactName", agreement.bContactName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aContactPhone", "" + agreement.aContactPhone);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bContactPhone", "" + agreement.bContactPhone);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aContactEmail", agreement.aContactEmail);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bContactEmail", "" + agreement.bContactEmail);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aContactFax", "" + agreement.aContactFax);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bContactFax", agreement.bContactFax);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aContactAddress", agreement.aContactAddress);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bContactAddress", "" + agreement.bContactAddress);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "recievers", "" + agreement.recievers);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "dispute", "" + agreement.dispute);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "liability", "" + agreement.liability);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aSiger", agreement.aSiger);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bSiger", "" + agreement.bSiger);
        attrData.push(a);
        return attrData;
    };
    //股权转让文档属性数据转换
    UtilService.prototype.setTransferData = function (documentId, transfer) {
        var attrData = new Array();
        var a = new entity_service_1.DocAttr(documentId, "aName", transfer.aName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bName", transfer.bName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aIdNo", transfer.aIdNo);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bIdNo", transfer.bIdNo);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "percentage", "" + transfer.percentage);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "totalMoney", "" + transfer.totalMoney);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "payMoney", "" + transfer.payMoney);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "residueMoney", "" + transfer.residueMoney);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "otherExpenses", transfer.otherExpenses);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "delayPercentage", "" + transfer.delayPercentage);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "committee", "" + transfer.committee);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "companyName", transfer.companyName);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "aSiger", transfer.aSiger);
        attrData.push(a);
        a = new entity_service_1.DocAttr(documentId, "bSiger", "" + transfer.bSiger);
        attrData.push(a);
        return attrData;
    };
    //获取步骤组
    UtilService.prototype.getSteps = function () {
        return this.http.get("assets/json/steps.json");
    };
    //获取该用户历史信息填表
    UtilService.prototype.getHistory = function (userId, docType, tempId, value) {
        var str = this.url + "law/doc/getAnameInfo/" + userId + "/" + docType + "/" + tempId + "/" + value;
        return this.http.get(str);
    };
    //随机生成序列号
    UtilService.prototype.getSerialNo = function () {
        var mydate = new Date();
        return "" + mydate.getHours() + mydate.getMilliseconds() + mydate.getSeconds();
    };
    //生成用户id
    UtilService.prototype.getId = function (object) {
        var id = 1;
        object.forEach(function (item, key) {
            if (item.id > id) {
                id = item.id;
            }
        });
        return id + 1;
    };
    //通过用户id,获取用户信息
    UtilService.prototype.getUserInfoById = function (userId) {
        var str = this.url + "law/user/getUserById/" + userId;
        return this.http.get(str);
    };
    UtilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UtilService);
    return UtilService;
})();
exports.UtilService = UtilService;
;
//# sourceMappingURL=util.service.js.map