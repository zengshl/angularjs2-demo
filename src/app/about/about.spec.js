var testing_1 = require('@angular/core/testing');
// Load the implementations that should be tested
var about_component_1 = require('./about.component');
testing_1.describe('About', function () {
    // provide our implementations or mocks to the dependency injector
    testing_1.beforeEachProviders(function () { return [
        about_component_1.About
    ]; });
    testing_1.it('should log ngOnInit', testing_1.inject([about_component_1.About], function (about) {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        about.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=about.spec.js.map