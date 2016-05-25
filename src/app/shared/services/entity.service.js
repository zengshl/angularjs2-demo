/**
 * Created by Ping on 2016/5/10.
 */
var User = (function () {
    function User() {
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
    }
    return UserMember;
})();
exports.UserMember = UserMember;
var UserContact = (function () {
    function UserContact() {
    }
    return UserContact;
})();
exports.UserContact = UserContact;
//# sourceMappingURL=entity.service.js.map