var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var sysuser_1 = require('../../+sysuser/components/sysuser');
var custmanager_component_1 = require('../../+custmanager/components/custmanager.component');
var AdminComponent = (function () {
    function AdminComponent(router) {
        this.router = router;
    }
    AdminComponent.prototype.ngAfterViewInit = function () {
        jQuery('#leftMenu')
            .accordion();
    };
    ;
    AdminComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    ;
    AdminComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    ;
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin-box',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            styles: [require('app/+admin/components/admin.component.css')],
            template: require('app/+admin/components/admin.component.html')
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/custmanager',
                name: 'Custmanager',
                component: custmanager_component_1.CustmanagerComponent
            },
            {
                path: '/sysUser',
                name: 'SysUser',
                component: sysuser_1.SysUserComponent,
                useAsDefault: true
            },
            {
                path: '/user',
                name: 'User',
                component: sysuser_1.SysUserComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], AdminComponent);
    return AdminComponent;
})();
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map