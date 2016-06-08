var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var index_1 = require("../../shared/index");
var modifypwd_component_1 = require("../../+modifypassword/components/modifypwd.component");
/**
 * Created by Ping on 2016/5/10.
 */
var ForgotComponent = (function () {
    function ForgotComponent(router, _util) {
        this.router = router;
        this._util = _util;
        this.isDisabled = false;
        this.isNext = false; //是否下一步
        this.isRegistered = false; //手机未注册
        this.user = new index_1.User();
        this.message = '获取验证码';
        this.error = false;
    }
    //返回登陆页面
    ForgotComponent.prototype.toLogin = function () {
        this.router.parent.navigate(['Login']);
    };
    //倒计时
    ForgotComponent.prototype.countBack = function () {
        var _this = this;
        var i = 60;
        var intervalid;
        intervalid = setInterval(function () {
            i--;
            if (i >= 1) {
                _this.isDisabled = true; //将按钮变为禁止状态
                _this.message = i + '秒';
            }
            else {
                _this.isDisabled = false; //将按钮变为禁止状态
                _this.message = '获取验证码';
                clearInterval(intervalid);
            }
        }, 1000);
    };
    //获取验证码
    ForgotComponent.prototype.getCode = function () {
        var _this = this;
        if (this.mobile) {
            alert('验证码已发送至您的手机，请注意查收！');
            this._util.getValidCodeForgot(this.mobile).subscribe(function (res) {
                var data = res.json();
                if (data.status === "0") {
                    _this.errorMsg = '该手机未注册！';
                    _this.error = true;
                    _this.isRegistered = false;
                    setTimeout(function () {
                        _this.error = false;
                    }, 8000);
                }
                else if (data.status === "1") {
                    _this.vdcode = data.result;
                    _this.isRegistered = true;
                }
            });
            this.countBack();
        }
        else {
            alert("请输入您的手机号！");
        }
    };
    //下一步
    ForgotComponent.prototype.recallPwd = function (form) {
        var _this = this;
        if (!this.isRegistered) {
            this.errorMsg = '该手机未注册！';
            this.error = true;
            setTimeout(function () {
                _this.error = false;
            }, 3000);
        }
        else if (form.validCode !== this.vdcode) {
            this.errorMsg = '验证码有误！';
            this.error = true;
            setTimeout(function () {
                _this.error = false;
            }, 3000);
        }
        else {
            this.user.phone = form.phone;
            this.isNext = true;
        }
    };
    ForgotComponent = __decorate([
        core_1.Component({
            selector: 'forgot-box',
            providers: [index_1.UtilService],
            directives: [common_1.FORM_DIRECTIVES, modifypwd_component_1.ModifyPasswordComponent],
            template: require('app/+forgot/components/forgot.component.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, index_1.UtilService])
    ], ForgotComponent);
    return ForgotComponent;
})();
exports.ForgotComponent = ForgotComponent;
//# sourceMappingURL=forgot.component.js.map