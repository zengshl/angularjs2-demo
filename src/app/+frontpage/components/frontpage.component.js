var core_1 = require('@angular/core');
//import {Router} from "@angular/router";
var index_1 = require("../../+navbar/index");
var index_2 = require("../../+head/index");
var index_3 = require("../../+main/index");
//import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
var router_deprecated_1 = require('@angular/router-deprecated');
var index_4 = require("../../+blank/index");
var index_5 = require("../../+advice/index");
var FrontPageComponent = (function () {
    function FrontPageComponent(router) {
        this.router = router;
    }
    FrontPageComponent.prototype.ngAfterViewInit = function () {
    };
    FrontPageComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    FrontPageComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    FrontPageComponent = __decorate([
        core_1.Component({
            selector: 'front-page',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, index_1.NavbarComponent, index_2.HeaderComponent],
            styles: [require('app/+frontpage/components/frontpage.component.css')],
            template: require('app/+frontpage/components/frontpage.component.html')
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/blank',
                name: 'Blank',
                component: index_4.BlankComponent
            },
            {
                path: '/',
                name: 'Main',
                component: index_3.MainComponent,
                useAsDefault: true
            },
            {
                path: '/shouye',
                name: 'Shouye',
                component: index_3.MainComponent
            },
            {
                path: '/advice',
                name: 'Advice',
                component: index_5.AdviceComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], FrontPageComponent);
    return FrontPageComponent;
})();
exports.FrontPageComponent = FrontPageComponent;
//# sourceMappingURL=frontpage.component.js.map