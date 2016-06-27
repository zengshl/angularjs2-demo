"use strict";
var core_1 = require('@angular/core');
var index_1 = require("../../+navbar/index");
var router_deprecated_1 = require('@angular/router-deprecated');
var index_2 = require("../../+blank/index");
var index_3 = require("../../+advice/index");
var index_4 = require("../../+file/index");
var personal_component_1 = require("../../+personal/components/personal.component");
var personalset_1 = require("../../+personalset/components/personalset");
var index_5 = require("../../+newfile/index");
var chat_component_1 = require("../../+chat/components/chat.component");
var FrontPageComponent = (function () {
    function FrontPageComponent(router) {
        this.router = router;
        //如果用户已经登陆，自动跳转
        if (!sessionStorage.getItem('user')) {
            //alert('已经登陆');
            this.nav('Login');
        }
    }
    FrontPageComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    FrontPageComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    FrontPageComponent = __decorate([
        core_1.Component({
            selector: 'front-page',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, index_1.NavbarComponent, chat_component_1.ChatComponent],
            styles: [require('app/+frontpage/components/frontpage.component.css')],
            template: require('app/+frontpage/components/frontpage.component.html')
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/blank',
                name: 'Blank',
                component: index_2.BlankComponent
            },
            {
                path: '/file',
                name: 'File',
                component: index_4.FileComponent
            },
            {
                path: '/newfile/...',
                name: 'NewFile',
                component: index_5.NewFileComponent
            },
            {
                path: '/advice',
                name: 'Advice',
                component: index_3.AdviceComponent
            },
            {
                path: '/personal',
                name: 'Personal',
                component: personal_component_1.PersonalComponent,
                useAsDefault: true
            },
            {
                path: '/personalset',
                name: 'PersonalSet',
                component: personalset_1.PersonalSetComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], FrontPageComponent);
    return FrontPageComponent;
}());
exports.FrontPageComponent = FrontPageComponent;
//# sourceMappingURL=frontpage.component.js.map