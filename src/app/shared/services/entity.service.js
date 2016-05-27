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
var Folder = (function () {
    function Folder() {
    }
    return Folder;
})();
exports.Folder = Folder;
var File = (function () {
    function File() {
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
//# sourceMappingURL=entity.service.js.map