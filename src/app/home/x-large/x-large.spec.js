var testing_1 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var testing_2 = require('@angular/core/testing');
// Load the implementations that should be tested
var x_large_directive_1 = require('./x-large.directive');
testing_2.describe('x-large directive', function () {
    // Create a test component to test directives
    var TestComponent = (function () {
        function TestComponent() {
        }
        TestComponent = __decorate([
            core_1.Component({
                template: '',
                directives: [x_large_directive_1.XLarge]
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    })();
    testing_2.it('should sent font-size to x-large', testing_2.async(testing_2.inject([testing_1.TestComponentBuilder], function (tcb) {
        return tcb.overrideTemplate(TestComponent, '<div x-large>Content</div>')
            .createAsync(TestComponent).then(function (fixture) {
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement.children[0];
            expect(compiled.style.fontSize).toBe('x-large');
        });
    })));
});
//# sourceMappingURL=x-large.spec.js.map