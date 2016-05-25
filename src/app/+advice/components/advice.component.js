var core_1 = require('@angular/core');
var AdviceComponent = (function () {
    function AdviceComponent() {
    }
    AdviceComponent.prototype.ngAfterViewInit = function () {
    };
    AdviceComponent.prototype.freeAdvice = function () {
        setTimeout(function () {
            jQuery("#free").modal('show');
        }, 1);
    };
    AdviceComponent.prototype.vipAdvice = function () {
        setTimeout(function () {
            jQuery('.coupled.modal')
                .modal({
                allowMultiple: true
            });
            // open second modal on first modal buttons
            jQuery('.second.modal')
                .modal('attach events', '.first.modal .button');
            // show first immediately
            jQuery('.first.modal')
                .modal('show');
        });
    };
    AdviceComponent = __decorate([
        core_1.Component({
            selector: 'advice-box',
            styles: [require('app/+advice/components/advice.component.css')],
            template: require('app/+advice/components/advice.component.html')
        }), 
        __metadata('design:paramtypes', [])
    ], AdviceComponent);
    return AdviceComponent;
})();
exports.AdviceComponent = AdviceComponent;
//# sourceMappingURL=advice.component.js.map