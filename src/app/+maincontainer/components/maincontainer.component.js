"use strict";
var core_1 = require('@angular/core');
var breadcrumbs_component_1 = require("../../+breadcrumbs/components/breadcrumbs.component");
var setting_component_1 = require("../../+setting/components/setting.component");
var MainContainerComponent = (function () {
    function MainContainerComponent() {
    }
    MainContainerComponent = __decorate([
        core_1.Component({
            selector: 'main-container',
            directives: [breadcrumbs_component_1.BreadCrumbsComponent, setting_component_1.SettingComponent],
            template: require('app/+maincontainer/components/maincontainer.component.html')
        }), 
        __metadata('design:paramtypes', [])
    ], MainContainerComponent);
    return MainContainerComponent;
}());
exports.MainContainerComponent = MainContainerComponent;
//# sourceMappingURL=maincontainer.component.js.map