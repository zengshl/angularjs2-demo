var testing_1 = require('angular2/testing');
var core_1 = require('angular2/core');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var home_component_1 = require('./home.component');
var index_1 = require('../../shared/index');
function main() {
    testing_1.describe('Home component', function () {
        testing_1.it('should work', testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                var homeInstance = rootTC.debugElement.children[0].componentInstance;
                var homeDOMEl = rootTC.debugElement.children[0].nativeElement;
                var nameListLen = function () {
                    return homeInstance.nameListService.names.length;
                };
                testing_1.expect(homeInstance.nameListService).toEqual(jasmine.any(index_1.NameListService));
                testing_1.expect(nameListLen()).toEqual(4);
                testing_1.expect(dom_adapter_1.DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());
                homeInstance.newName = 'Minko';
                homeInstance.addName();
                rootTC.detectChanges();
                testing_1.expect(nameListLen()).toEqual(5);
                testing_1.expect(dom_adapter_1.DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());
                testing_1.expect(dom_adapter_1.DOM.querySelectorAll(homeDOMEl, 'li')[4].textContent).toEqual('Minko');
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({
            providers: [index_1.NameListService],
            selector: 'test-cmp',
            template: '<sd-home></sd-home>',
            directives: [home_component_1.HomeComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=home.component.spec.js.map