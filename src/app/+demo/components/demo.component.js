var core_1 = require('@angular/core');
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var ng2_dragula_2 = require("ng2-dragula/ng2-dragula");
var DemoComponent = (function () {
    function DemoComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.many = ['The', 'possibilities', 'are', 'endless!'];
        this.many2 = ['Explore', 'them'];
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    DemoComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        console.log("drop");
    };
    DemoComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        // do something else
    };
    DemoComponent = __decorate([
        core_1.Component({
            selector: 'demo-box',
            directives: [ng2_dragula_2.Dragula],
            viewProviders: [ng2_dragula_1.DragulaService],
            styles: [require('app/+demo/components/demo.component.css')],
            template: require('app/+demo/components/demo.component.html')
        }), 
        __metadata('design:paramtypes', [ng2_dragula_1.DragulaService])
    ], DemoComponent);
    return DemoComponent;
})();
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.component.js.map