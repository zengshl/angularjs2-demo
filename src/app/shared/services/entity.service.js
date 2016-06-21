/**
 * Created by Ping on 2016/5/10.
 */
var User = (function () {
    function User() {
        this.id = 0;
        this.account = "";
        this.phone = "";
        this.password = "";
        this.email = "";
        this.userName = "";
        this.status = "";
        this.address = "";
        this.createTime = "";
        this.remark = "";
        this.companyNum = "";
        this.industry = "";
        this.region = "";
    }
    return User;
})();
exports.User = User;
//对象必须赋初值，否则scala后台转对象时会报错
var Admin = (function () {
    function Admin() {
        this.id = 0;
        this.phone = "";
        this.password = "";
        this.account = "";
        this.status = "";
        this.createTime = "";
        this.modifyTime = "";
        this.remark = "";
    }
    return Admin;
})();
exports.Admin = Admin;
var PageData = (function () {
    function PageData() {
        this.page = 0;
        this.size = 0;
        this.total = 0;
        this.iDisplayStart = 0;
        this.iDisplayLength = 0;
    }
    return PageData;
})();
exports.PageData = PageData;
var UserBase = (function () {
    function UserBase() {
        this.id = 0;
        this.userId = 0;
        this.userName = "";
        this.sex = "";
        this.birthday = "";
        this.email = "";
        this.remark = "";
        this.createTime = "";
        this.modifyTime = "";
    }
    return UserBase;
})();
exports.UserBase = UserBase;
var UserMember = (function () {
    function UserMember() {
        this.id = 0;
        this.userId = 0;
        this.memberGrade = 0;
        this.remark = "";
        this.description = "";
        this.status = "";
        this.createTime = "";
        this.expireTime = "";
    }
    return UserMember;
})();
exports.UserMember = UserMember;
var UserContact = (function () {
    function UserContact() {
        this.id = 0;
        this.userId = 0;
        this.remark = 0;
        this.contactPhone = "";
        this.contactName = "";
        this.createTime = "";
        this.lastContactTime = "";
    }
    return UserContact;
})();
exports.UserContact = UserContact;
var Folder = (function () {
    function Folder() {
        this.id = 0;
        this.userId = 0;
        this.fileName = "";
        this.fileType = "";
        this.createTime = "";
        this.remark = "";
    }
    return Folder;
})();
exports.Folder = Folder;
var File = (function () {
    function File() {
        this.id = 0;
        this.userId = 0;
        this.folderId = 0;
        this.docName = "";
        this.docContext = "";
        this.docPath = "";
        this.pdfPath = "";
        this.docType = "";
        this.createTime = "";
        this.remark = "";
        this.templateId = 0;
        this.status = "0";
    }
    return File;
})();
exports.File = File;
var Role = (function () {
    function Role() {
        this.id = 0;
        this.roleName = "";
        this.roleNo = "";
        this.roleDes = "";
        this.flag = false;
    }
    return Role;
})();
exports.Role = Role;
var Menu = (function () {
    function Menu() {
        this.id = 0;
        this.menuName = "";
        this.menuNo = "";
        this.menuDes = "";
        this.menuPath = "";
        this.menuValue = "";
        this.routerName = "";
        this.pid = 0;
        this.flag = false;
    }
    return Menu;
})();
exports.Menu = Menu;
var Power = (function () {
    function Power() {
        this.id = 0;
        this.roleId = 0;
        this.powerId = 0;
        this.powerType = "";
        this.remark = "";
    }
    return Power;
})();
exports.Power = Power;
var UserRole = (function () {
    function UserRole() {
        this.id = 0;
        this.userId = 0;
        this.roleId = 0;
        this.remark = "";
    }
    return UserRole;
})();
exports.UserRole = UserRole;
var Moudle = (function () {
    function Moudle() {
        this.id = 0;
        this.moudleName = "";
        this.createTime = "";
        this.remark = "";
    }
    return Moudle;
})();
exports.Moudle = Moudle;
var Doctype = (function () {
    function Doctype() {
        this.id = 0;
        this.preId = 0;
        this.typeName = "";
        this.moudleId = 0;
        this.status = "";
        this.remark = "";
    }
    return Doctype;
})();
exports.Doctype = Doctype;
var DocTemplate = (function () {
    function DocTemplate() {
        this.id = 0;
        this.typeId = 0;
        this.resourceName = "";
        this.resourcePath = "";
        this.resourceTitle = "";
        this.resouceContext = "";
        this.createTime = "";
    }
    return DocTemplate;
})();
exports.DocTemplate = DocTemplate;
var ConfidentAgreement = (function () {
    function ConfidentAgreement() {
        this.id = 0;
        this.mouldId = 0;
        this.mouldName = "Confidentiallity Agreement";
        this.version = 0;
        this.organizationType = "";
        this.aName = "";
        this.aAddress = "";
        this.bName = "";
        this.bAddress = "";
        this.projectName = "";
        this.confDefination = "";
        this.contractPeriod = 0;
        this.secrecy = 0;
        this.aContactName = "";
        this.aContactPhone = "";
        this.aContactEmail = "";
        this.aContactFax = "";
        this.aContactAddress = "";
        this.bContactName = "";
        this.bContactPhone = "";
        this.bContactEmail = "";
        this.bContactFax = "";
        this.bContactAddress = "";
        this.recievers = "";
        this.dispute = "";
        this.liability = "";
        this.aSiger = "";
        this.bSiger = "";
        this.userId = 0;
        this.createTime = "";
        this.remark = "";
    }
    return ConfidentAgreement;
})();
exports.ConfidentAgreement = ConfidentAgreement;
var ConfidentTransfer = (function () {
    function ConfidentTransfer() {
        this.id = 0;
        this.aName = "";
        this.aIdNo = "";
        this.percentage = 0;
        this.totalMoney = 0;
        this.payMoney = 0;
        this.residueMoney = 0;
        this.otherExpenses = "";
        this.delayPercentage = 0;
        this.bName = "";
        this.bIdNo = "";
        this.committee = "";
        this.companyName = "";
        this.aSiger = "";
        this.bSiger = "";
    }
    return ConfidentTransfer;
})();
exports.ConfidentTransfer = ConfidentTransfer;
var CheckBox = (function () {
    function CheckBox() {
        this.flag = false;
        this.value = "";
    }
    return CheckBox;
})();
exports.CheckBox = CheckBox;
var DocAttr = (function () {
    function DocAttr(documentId, n, v) {
        this.id = 0;
        this.attrType = "";
        this.attrName = "";
        this.attrValue = "";
        this.attrModule = "";
        this.createTime = "";
        this.modifyTime = "";
        this.documentId = 0;
        this.templateId = 0;
        this.attrName = n || "";
        this.attrValue = v || "";
        this.documentId = documentId || 0;
    }
    return DocAttr;
})();
exports.DocAttr = DocAttr;
var LawCategory = (function () {
    function LawCategory() {
    }
    return LawCategory;
})();
exports.LawCategory = LawCategory;
var UserCompany = (function () {
    function UserCompany() {
        this.id = 0;
        this.userId = 0;
        this.companyName = "";
        this.companyScope = "";
        this.companyAddress = "";
    }
    return UserCompany;
})();
exports.UserCompany = UserCompany;
//步骤的实体类
var Step = (function () {
    function Step() {
        this.stepId = 0;
        this.stepTitle = "";
        this.description = "";
        this.status = "";
    }
    return Step;
})();
exports.Step = Step;
//步骤组的实体类
var Steps = (function () {
    function Steps() {
        this.id = 0;
        this.stepName = "";
        this.data = new Array();
    }
    return Steps;
})();
exports.Steps = Steps;
//历史信息
var History = (function () {
    function History() {
        this.id = 0;
        this.docName = "";
        this.typeName = "";
        this.templateName = "";
        this.createTime = "";
        //主体信息
        this.aName = "";
        this.aIdNo = "";
        this.bName = "";
        this.bIdNo = "";
        //联系人信息
        this.aContactName = "";
        this.aContactPhone = "";
        this.aContactEmail = "";
        this.aContactFax = "";
        this.aContactAddress = "";
        this.bContactName = "";
        this.bContactPhone = "";
        this.bContactEmail = "";
        this.bContactFax = "";
        this.bContactAddress = "";
        //签名
        this.aSiger = "";
        this.bSiger = "";
    }
    return History;
})();
exports.History = History;
//# sourceMappingURL=entity.service.js.map