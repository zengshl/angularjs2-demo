var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var index_1 = require('../../shared/index'); //通过集中在index内，使得一个地址可以引用很多组件（用逗号隔开）
var index_2 = require('../../shared/index');
/**
 * Created by Ping on 2016/5/10.
 */
var UserLoginComponent = (function () {
    function UserLoginComponent(router, http, _util) {
        this.router = router;
        this.http = http;
        this._util = _util;
        this.user = new index_1.User();
        //记住密码
        this.phone = localStorage.getItem('phone');
        this.password = localStorage.getItem('password');
        //如果用户已经登陆，自动跳转
        if (sessionStorage.getItem('user')) {
            //alert('已经登陆');
            this.router.parent.navigate(['FrontPage']);
        }
    }
    UserLoginComponent.prototype.ngAfterViewInit = function () {
        jQuery('.ui.checkbox')
            .checkbox();
    };
    //去注册
    UserLoginComponent.prototype.toSignup = function () {
        this.router.parent.navigate(['Signup']);
    };
    //忘记密码
    UserLoginComponent.prototype.toForgot = function () {
        this.router.parent.navigate(['Forgot']);
    };
    //登陆
    UserLoginComponent.prototype.login = function (form) {
        var _this = this;
        var isLogin = false;
        this.user.account = form.accountCtrl;
        this.user.password = form.pwdCtrl;
        this._util.logIn(JSON.stringify(this.user)).subscribe(function (res) {
            var data = res.json();
            if (data.status === '0') {
                _this.message = '您所输入的用户名或密码不正确，请重新输入！';
                _this.error = true;
                setTimeout(function () {
                    _this.error = false;
                }, 5000);
            }
            else if (data.status === '1') {
                sessionStorage.setItem('user', JSON.stringify(data.reuslt));
                if (form.rmbCtrl) {
                    localStorage.setItem('phone', form.accountCtrl);
                    localStorage.setItem('password', form.pwdCtrl);
                }
                else {
                    localStorage.clear();
                }
                //alert('登陆成功');
                _this.router.parent.navigate(['FrontPage']);
            }
            // console.log(data);
        });
    };
    UserLoginComponent = __decorate([
        core_1.Component({
            selector: 'userlogin-box',
            providers: [index_2.UtilService],
            directives: [common_1.FORM_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES],
            template: require('app/+userlogin/components/userlogin.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, index_2.UtilService])
    ], UserLoginComponent);
    return UserLoginComponent;
})();
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=userlogin.js.map