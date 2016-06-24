"use strict";
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var index_1 = require('../../shared/index');
var index_2 = require('../../+adminlogin/index');
var index_3 = require('../../+userlogin/index');
/**
 * Created by Ping on 2016/5/10.
 */
var LoginComponent = (function () {
    function LoginComponent(router, http, _util) {
        this.router = router;
        this.http = http;
        this._util = _util;
    }
    LoginComponent.prototype.ngAfterViewInit = function () {
    };
    LoginComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    ;
    LoginComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    ;
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-box',
            providers: [index_1.UtilService],
            directives: [common_1.FORM_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES],
            template: require('app/+login/components/login.component.html'),
            styles: ["\n    @media all and (max-width:765px)\n      {\n        #mobileHide{ display:none }\n      }\n  "]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/adminlogin',
                name: 'AdminLogin',
                component: index_2.AdminLoginComponent
            },
            {
                path: '/userlogin',
                name: 'UserLogin',
                component: index_3.UserLoginComponent,
                useAsDefault: true
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, index_1.UtilService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map