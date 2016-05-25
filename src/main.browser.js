/*
 * Providers provided by Angular
 */
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
/*
* Platform and Environment
* our providers/directives/pipes
*/
var index_1 = require('./platform/browser/index');
var environment_1 = require('./platform/environment');
/*
* App Component
* our top level component that holds all of our components
*/
var app_component_1 = require('./app/components/app.component');
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
function main(initialHmrState) {
    return platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, index_1.PROVIDERS.concat(environment_1.ENV_PROVIDERS, index_1.DIRECTIVES, index_1.PIPES))
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */
/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
    // activate hot module reload
    var ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
}
else {
    // bootstrap when document is ready
    document.addEventListener('DOMContentLoaded', function () { return main(); });
}
//# sourceMappingURL=main.browser.js.map