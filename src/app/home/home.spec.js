var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
// Load the implementations that should be tested
var app_service_1 = require('../app.service');
var home_component_1 = require('./home.component');
var title_1 = require('./title');
testing_1.describe('Home', function () {
    // provide our implementations or mocks to the dependency injector
    testing_1.beforeEachProviders(function () { return [
        http_1.BaseRequestOptions,
        testing_2.MockBackend,
        {
            provide: http_1.Http,
            useFactory: function (backend, defaultOptions) {
                return new http_1.Http(backend, defaultOptions);
            },
            deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
        },
        app_service_1.AppState,
        title_1.Title,
        home_component_1.Home
    ]; });
    testing_1.it('should have default data', testing_1.inject([home_component_1.Home], function (home) {
        expect(home.localState).toEqual({ value: '' });
    }));
    testing_1.it('should have a title', testing_1.inject([home_component_1.Home], function (home) {
        expect(!!home.title).toEqual(true);
    }));
    testing_1.it('should log ngOnInit', testing_1.inject([home_component_1.Home], function (home) {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        home.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=home.spec.js.map