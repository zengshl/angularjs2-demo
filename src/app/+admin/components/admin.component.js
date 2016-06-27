var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var sysuser_1 = require('../../+sysuser/components/sysuser');
var sysrole_1 = require("../../+sysrole/components/sysrole");
var document_1 = require("../../+document/components/document");
var folder_1 = require("../../+folder/components/folder");
var sysmoudle_1 = require("../../+sysmoudle/components/sysmoudle");
var sysdoctemplate_1 = require("../../+sysdoctemplate/components/sysdoctemplate");
var custmanager_component_1 = require('../../+custmanager/components/custmanager.component');
var index_1 = require("../../+file/index");
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
    AdminComponent.prototype.navFolder = function () {
        this.router.navigate(['Folder', { "userId": "0" }]);
    };
    AdminComponent.prototype.navFile = function () {
        this.router.navigate(['Document', { "userId": "0", "folderId": "0" },]);
    };
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
            },
            {
                path: '/file',
                name: 'File',
                component: index_1.FileComponent
            },
            {
                path: '/sysRole',
                name: 'SysRole',
                component: sysrole_1.SysRoleComponent,
            },
            {
                path: '/folder/:userId',
                name: 'Folder',
                component: folder_1.FolderComponent,
            },
            {
                path: '/document/:userId/:folderId',
                name: 'Document',
                component: document_1.DocumentComponent,
            },
            {
                path: '/moudle',
                name: 'Moudle',
                component: sysmoudle_1.SysMoudleComponent,
            },
            {
                path: '/template/:typeId',
                name: 'Template',
                component: sysdoctemplate_1.SysDocTemplateComponent,
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], AdminComponent);
    return AdminComponent;
})();
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map