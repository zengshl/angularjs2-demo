var testing_1 = require('@angular/testing');
var core_1 = require('@angular/core');
var compiler_1 = require('@angular/compiler');
var router_1 = require('@angular/router');
var common_1 = require('@angular/platform/common');
var location_mock_1 = require('@angular/src/mock/location_mock');
var router_2 = require('@angular/src/router/router');
var dom_adapter_1 = require('@angular/src/platform/dom/dom_adapter');
var app_component_1 = require('./app.component');
function main() {
    testing_1.describe('App component', function () {
        // Support for testing component that uses Router
        testing_1.beforeEachProviders(function () { return [
            router_1.RouteRegistry,
            compiler_1.DirectiveResolver,
            core_1.provide(common_1.Location, { useClass: location_mock_1.SpyLocation }),
            core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_component_1.AppComponent }),
            core_1.provide(router_1.Router, { useClass: router_2.RootRouter })
        ]; });
        testing_1.it('should work', testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                var appDOMEl = rootTC.debugElement.children[0].nativeElement;
                testing_1.expect(dom_adapter_1.DOM.querySelectorAll(appDOMEl, 'sd-app > sd-navbar > nav > a')[1].href).toMatch(/http:\/\/localhost:\d+\/about/);
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
            selector: 'test-cmp',
            template: '<sd-app></sd-app>',
            directives: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=app.component.spec.js.map