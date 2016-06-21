var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var index_1 = require('../../shared/index');
/**
 * Created by Ping on 2016/5/10.
 */
var ModifyPasswordComponent = (function () {
    function ModifyPasswordComponent(router, _util) {
        this.router = router;
        this._util = _util;
        this.error = false;
    }
    ModifyPasswordComponent.prototype.toLogin = function () {
        this.router.parent.navigate(['Login']);
    };
    //发送并获取信息
    ModifyPasswordComponent.prototype.modifyPwd = function (form) {
        var _this = this;
        if (form.password !== form.passwordConfirm) {
            this.errorMsg = '确认密码输入不一致！';
            this.error = true;
            setTimeout(function () {
                _this.error = false;
            }, 3000);
        }
        else {
            this.user.password = form.password;
            this._util.mdfPassword(JSON.stringify(this.user)).subscribe(function (res) {
                var data = res.json();
                if (data.status === '1') {
                    alert('密码修改成功！');
                    _this.toLogin();
                }
                else {
                    alert('密码修改失败！');
                }
            });
        }
        //alert('已发送至您的手机，请注意查收！');
        //this.toLogin();
    };
    ModifyPasswordComponent = __decorate([
        core_1.Component({
            selector: 'modify-password',
            providers: [index_1.UtilService],
            inputs: ['user'],
            directives: [common_1.FORM_DIRECTIVES],
            template: require('app/+modifypassword/components/modifypwd.component.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, index_1.UtilService])
    ], ModifyPasswordComponent);
    return ModifyPasswordComponent;
})();
exports.ModifyPasswordComponent = ModifyPasswordComponent;
//# sourceMappingURL=modifypwd.component.js.map