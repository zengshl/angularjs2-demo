"use strict";
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var PersonalComponent = (function () {
    function PersonalComponent(router) {
        this.router = router;
    }
    PersonalComponent.prototype.ngAfterViewInit = function () { };
    PersonalComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    PersonalComponent.prototype.navSelf = function (name) {
        this.router.navigate([name]);
    };
    PersonalComponent.prototype.test = function () {
        swal("Good job!", "You clicked the button!", "success");
    };
    PersonalComponent = __decorate([
        core_1.Component({
            selector: 'personal-box',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            template: require('app/+personal/components/personal.component.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], PersonalComponent);
    return PersonalComponent;
}());
exports.PersonalComponent = PersonalComponent;
//# sourceMappingURL=personal.component.js.map