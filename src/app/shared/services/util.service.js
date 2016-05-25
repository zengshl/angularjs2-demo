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
        this.url = 'http://192.168.1.102:9000/';
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
        var str = this.url + 'law/cus/smsValid/' + phone;
        return this.http.get(str);
    };
    ;
    //获取验证码
    UtilService.prototype.getValidCodeForgot = function (phone) {
        var str = this.url + 'law/cus/smsValidMdPassword/' + phone;
        return this.http.get(str);
    };
    ;
    //注册表单提交
    UtilService.prototype.signUp = function (data) {
        var str = this.url + 'law/cus/register';
        return this.http.post(str, data);
    };
    ;
    //登陆
    UtilService.prototype.logIn = function (data) {
        var str = this.url + 'law/cus/login';
        return this.http.post(str, data);
    };
    ;
    //修改密码
    UtilService.prototype.mdfPassword = function (data) {
        var str = this.url + 'law/cus/forgetPassword';
        return this.http.post(str, data);
    };
    ;
    //获取管理用户信息
    UtilService.prototype.getAdmin = function (pageData) {
        var str = this.url + 'law/user/pageListPost';
        return this.http.post(str, pageData);
    };
    ;
    //获取数据
    UtilService.prototype.getData = function (pageData, url) {
        var str = url + '/pageListMap';
        return this.http.post(str, pageData);
    };
    //删除管理用户信息
    UtilService.prototype.deleteAdmin = function (data) {
        var str = this.url + 'law/user/userDelect';
        return this.http.post(str, data);
    };
    ;
    UtilService.prototype.getAdminInfo = function (data) {
        var str = this.url + 'law/user/getInfo';
        return this.http.post(str, data);
    };
    ;
    UtilService.prototype.updataAdminInfo = function (data) {
        var str = this.url + 'law/user/updataInfo';
        return this.http.post(str, data);
    };
    ;
    UtilService.prototype.insertAdminInfo = function (data) {
        var str = this.url + 'law/user/insertInfo';
        return this.http.post(str, data);
    };
    ;
    UtilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UtilService);
    return UtilService;
})();
exports.UtilService = UtilService;
;
//# sourceMappingURL=util.service.js.map