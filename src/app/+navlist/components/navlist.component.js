"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var NavlistComponent = (function () {
    function NavlistComponent(router) {
        this.router = router;
    }
    NavlistComponent.prototype.nav = function (name) {
        this.router.navigate([name]);
        console.log(name);
    };
    NavlistComponent = __decorate([
        core_1.Component({
            selector: 'navlist-box',
            template: require('app/+navlist/components/navlist.component.html')
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], NavlistComponent);
    return NavlistComponent;
}());
exports.NavlistComponent = NavlistComponent;
//# sourceMappingURL=navlist.component.js.map