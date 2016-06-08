var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var index_1 = require('../../shared/index');
var index_2 = require('../../shared/index');
/**
 * Created by Ping on 2016/5/10.
 */
var SignupComponent = (function () {
    function SignupComponent(router, _util) {
        this.router = router;
        this._util = _util;
        //isDisabled:boolean = false;
        this.isRegistered = false;
        this.user = new index_2.User();
        //this.message ='获取验证码';
        this.error = false;
    }
    SignupComponent.prototype.ngAfterViewInit = function () {
        jQuery('.ui.checkbox')
            .checkbox();
    };
    //返回登陆页面
    SignupComponent.prototype.toLogin = function () {
        this.router.parent.navigate(['Login']);
    };
    ////倒计时
    //countBack(){
    //  var i = 60;
    //  var intervalid = setInterval(()=>{
    //    i--;
    //    if(i>=1) {
    //      this.isDisabled = true; //将按钮变为禁止状态
    //      this.message = i+'秒';
    //    } else {
    //      this.isDisabled = false; //将按钮变为禁止状态
    //      this.message = '获取验证码';
    //      clearInterval(intervalid);
    //    }
    //  }, 1000);
    //}
    ////获取验证码
    //  getCode() {
    //    if(this.mobile){ //如果手机不为空
    //      alert('验证码已发送至您的手机，请注意查收！');
    //      this._util.getValidCode(this.mobile).subscribe((res:Response)=>{
    //        var data = res.json();
    //        if(data.status ==="0"){
    //          this.errorMsg = '该手机已注册！';
    //          this.error = true;
    //          setTimeout(() => {
    //            this.error = false;
    //          }, 10000);
    //          this.isRegistered = true;
    //        }else if(data.status ==="1"){
    //          this.vdcode = data.result;
    //        }
    //      });
    //      this.countBack();
    //    }else{
    //      alert("请输入您的手机号！")
    //    }
    //
    //  }
    //注册按钮
    SignupComponent.prototype.register = function (form) {
        var _this = this;
        if (form.password !== form.passwordConfirm) {
            this.errorMsg = '确认密码输入不一致！';
            this.error = true;
            setTimeout(function () {
                _this.error = false;
            }, 10000);
        }
        else {
            if (form.account.contains("@")) {
                //邮箱注册
                this.user.email = form.account;
                this.user.account = form.account;
                this.user.password = form.password;
                this.signup();
            }
            else if (form.account.length == 11) {
                var value = form.account;
                if (parseInt(value) > 10000000000) {
                    //手机注册
                    this.user.phone = form.account;
                    this.user.account = form.account;
                    this.user.password = form.password;
                    this.signup();
                }
                else {
                    alert("请输入正确的手机号");
                }
            }
            else {
                alert("请输入正确的格式");
            }
        }
    };
    //注册请求
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this._util.signUp(JSON.stringify(this.user)).subscribe(function (res) {
            var data = res.json();
            //console.log(data); //显示验证码
            if (data.status == "0") {
                _this.errorMsg = '该账号已注册！';
                _this.error = true;
                setTimeout(function () {
                    _this.error = false;
                }, 10000);
            }
            else {
                alert(data.message);
                _this.toLogin();
            }
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'signup-box',
            providers: [index_1.UtilService],
            template: require('app/+signup/components/signup.component.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, index_1.UtilService])
    ], SignupComponent);
    return SignupComponent;
})();
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map