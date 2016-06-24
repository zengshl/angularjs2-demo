"use strict";
var core_1 = require('@angular/core');
var AddSysUserComponent = (function () {
    function AddSysUserComponent() {
        //this.router.parent.navigate(['Mainn']); //测试时，直接指定路由
    }
    AddSysUserComponent.prototype.ngAfterViewInit = function () {
        jQuery('#datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            autoclose: true,
            minView: 1,
            todayBtn: true
        });
    };
    AddSysUserComponent = __decorate([
        core_1.Component({
            selector: 'addsysuser-box',
            styles: [require('app/+addsysuser/components/addsysuser.component.css')],
            template: require('app/+addsysuser/components/addsysuser.component.html')
        }), 
        __metadata('design:paramtypes', [])
    ], AddSysUserComponent);
    return AddSysUserComponent;
}());
exports.AddSysUserComponent = AddSysUserComponent;
//# sourceMappingURL=addsysuser.component.js.map