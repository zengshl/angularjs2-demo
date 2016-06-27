"use strict";
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var index_1 = require('../../shared/index'); //通过集中在index内，使得一个地址可以引用很多组件（用逗号隔开）
var index_2 = require('../../shared/index');
/**
 * Created by wss on 2016/5/25.
 */
var AdminLoginComponent = (function () {
    function AdminLoginComponent(router, http, _util) {
        this.router = router;
        this.http = http;
        this._util = _util;
        this.admin = new index_1.Admin();
        //记住密码
        this.account = localStorage.getItem('adminAccount');
        this.password = localStorage.getItem('adminPassword');
        //如果用户已经登陆，自动跳转
        if (sessionStorage.getItem('admin')) {
        }
    }
    AdminLoginComponent.prototype.ngAfterViewInit = function () {
        jQuery('.ui.checkbox')
            .checkbox();
    };
    //登陆
    AdminLoginComponent.prototype.login = function (form) {
        var _this = this;
        var isLogin = false;
        this.admin.account = form.accountCtrl;
        this.admin.password = form.pwdCtrl;
        this._util.adminLogin(JSON.stringify(this.admin)).subscribe(function (res) {
            console.log(res.json());
            var data = res.json();
            if (data.data.status === '0') {
                console.log("失败");
                _this.message = '您所输入的用户名或密码不正确，请重新输入！';
                _this.error = true;
                setTimeout(function () {
                    _this.error = false;
                }, 5000);
            }
            else if (data.data.status === '1') {
                console.log("成功");
                sessionStorage.setItem('admin', JSON.stringify(data.data.user));
                if (form.rmbCtrl) {
                    localStorage.setItem('adminAccount', form.accountCtrl);
                    localStorage.setItem('adminPassword', form.pwdCtrl);
                }
                else {
                    localStorage.clear();
                }
                //alert('登陆成功');
                _this.router.parent.navigate(['Admin']);
            }
        });
    };
    AdminLoginComponent = __decorate([
        core_1.Component({
            selector: 'adminlogin-box',
            providers: [index_2.UtilService],
            directives: [common_1.FORM_DIRECTIVES],
            template: require('app/+adminlogin/components/adminlogin.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, index_2.UtilService])
    ], AdminLoginComponent);
    return AdminLoginComponent;
}());
exports.AdminLoginComponent = AdminLoginComponent;
//# sourceMappingURL=adminlogin.js.map