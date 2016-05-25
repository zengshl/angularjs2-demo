var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var HeaderComponent = (function () {
    function HeaderComponent(router) {
        this.router = router;
    }
    HeaderComponent.prototype.ngAfterViewInit = function () {
        jQuery('.flexslider').flexslider({
            animation: "fade",
            controlsContainer: ".flexslider",
            // slideDirection: "vertical",
            slideshowSpeed: 3000,
            directionNav: false,
            controlNav: true,
            animationDuration: 900
        });
    };
    HeaderComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-box',
            styles: [require('app/+head/components/header.component.css')],
            template: require('app/+head/components/header.component.html')
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
})();
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map