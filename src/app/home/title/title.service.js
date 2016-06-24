"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Title = (function () {
    function Title(http) {
        this.http = http;
        this.value = 'Angular 2';
    }
    Title.prototype.getData = function () {
        console.log('Title#getData(): Get Data');
        // return this.http.get('/assets/data.json')
        // .map(res => res.json());
        return {
            value: 'AngularClass'
        };
    };
    Title = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Title);
    return Title;
}());
exports.Title = Title;
//# sourceMappingURL=title.service.js.map