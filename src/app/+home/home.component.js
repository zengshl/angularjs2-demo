var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var index_1 = require('../shared/index');
var HomeComponent = (function () {
    /**
     * Creates an instance of the HomeComponent with the injected
     * NameListService.
     *
     * @param {NameListService} nameListService the injected NameListService
     */
    function HomeComponent(nameListService) {
        this.nameListService = nameListService;
    }
    /**
     * Calls the add method of the NameListService with the current
     * newName value of the form.
     * @return {boolean} false to prevent default form submit behavior to refresh the page.
     */
    HomeComponent.prototype.addName = function () {
        this.nameListService.add(this.newName);
        this.newName = '';
        return false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'sd-home',
            styles: [require('app/+home/home.component.css')],
            template: require('app/+home/home.component.html'),
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [index_1.NameListService])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map