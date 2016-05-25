var core_1 = require('@angular/core');
var DemoComponent = (function () {
    function DemoComponent() {
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    }
    DemoComponent.prototype.ngAfterViewInit = function () {
        jQuery('#datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            autoclose: true,
            minView: 1,
            todayBtn: true
        });
    };
    DemoComponent = __decorate([
        core_1.Component({
            selector: 'demo-box',
            styles: [require('app/+demo/components/demo.component.css')],
            template: require('app/+demo/components/demo.component.html')
        }), 
        __metadata('design:paramtypes', [])
    ], DemoComponent);
    return DemoComponent;
})();
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.component.js.map