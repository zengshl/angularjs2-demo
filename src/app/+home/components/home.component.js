var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var index_1 = require('../../shared/index');
var HomeComponent = (function () {
    function HomeComponent(nameListService) {
        this.nameListService = nameListService;
    }
    /*
     * @param newname  any text as input.
     * @returns return false to prevent default form submit behavior to refresh the page.
     */
    HomeComponent.prototype.addName = function () {
        this.nameListService.add(this.newName);
        this.newName = '';
        return false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'sd-home',
            templateUrl: 'app/+home/components/home.component.html',
            styleUrls: ['app/+home/components/home.component.css'],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [index_1.NameListService])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map