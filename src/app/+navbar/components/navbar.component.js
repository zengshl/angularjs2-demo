var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var index_1 = require("../../shared/index");
var NavbarComponent = (function () {
    function NavbarComponent(router) {
        this.router = router;
        this.isLogin = false;
        this.user = new index_1.User();
        //假设已经登陆(假数据)
        //this.user.phone = '13712345678';
        //this.user.userName = 'Jason';
        //sessionStorage.setItem('user',JSON.stringify(this.user));
        //假如已经登陆
        if (sessionStorage.getItem('user')) {
            this.isLogin = true;
            this.user = JSON.parse(sessionStorage.getItem('user'));
            // console.log(this.user)
            if (this.user.userName.trim() === '') {
                if (this.user.phone.trim() !== '') {
                    this.user.userName = this.user.phone;
                }
                else {
                    this.user.userName = this.user.email;
                }
            }
        }
    }
    NavbarComponent.prototype.logout = function () {
        sessionStorage.clear();
        this.isLogin = false;
        this.router.parent.navigate(['Login']);
    };
    NavbarComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    NavbarComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar-box',
            styles: [require('app/+navbar/components/navbar.component.css')],
            template: require('app/+navbar/components/navbar.component.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], NavbarComponent);
    return NavbarComponent;
})();
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map