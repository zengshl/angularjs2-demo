var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
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
        this.url = 'http://127.0.0.1:9000/';
    }
    ;
    //将构造器解析出来的存储于components中的json数据，转为原始数据流，并存储于_promise中，并返回；
    //  getUsers(): Promise<User[]>  {
    //    return this._promise.then(() =>  {
    //      return this.users;
    //    });
    //  };
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
        var str = this.url + 'law/sysuser/pageListPost';
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
    UtilService.prototype.updateFolder = function (folder) {
        var str = this.url + '/law/doc/updataFolder';
        return this.http.post(str, folder);
    };
    //更新文件
    UtilService.prototype.updateFile = function (file) {
        var str = this.url + '/law/doc/updataDocument';
        return this.http.post(str, file);
    };
    //更新文件的文件夹id
    UtilService.prototype.updateFileFolder = function (data) {
        var str = this.url + '/law/doc/updataDocumentWithFolderId';
        return this.http.post(str, data);
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
    UtilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UtilService);
    return UtilService;
})();
exports.UtilService = UtilService;
;
//# sourceMappingURL=util.service.js.map