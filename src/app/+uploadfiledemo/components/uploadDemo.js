/**
 * Created by zengshl on 2016-04-13.
 */
var core_1 = require('@angular/core');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader'); //文件上传的组件
var UploadDemo = (function () {
    function UploadDemo() {
        this.options = {
            url: 'http://localhost:9000/law/file/upload'
        };
        this.basicProgress = 0;
        this.multipleProgress = 0;
        this.multipleResp = [];
        this.dropProgress = 0;
        this.dropResp = [];
        this.textName = "";
        console.log("http://ng2-uploader.com:10050/upload");
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    UploadDemo.prototype.handleBasicUpload = function (data) {
        var _this = this;
        this.basicResp = data;
        this.textName = this.basicResp.originalName;
        this.zone.run(function () {
            _this.basicProgress = data.progress.percent;
        });
        //    if (data && data.response) {
        //    data = JSON.parse(data.response);
        //    this.uploadFile = data;
        //}
    };
    UploadDemo.prototype.handleMultipleUpload = function (data) {
        var _this = this;
        var index = this.multipleResp.findIndex(function (x) { return x.id === data.id; });
        if (index === -1) {
            this.multipleResp.push(data);
        }
        else {
            this.zone.run(function () {
                _this.multipleResp[index] = data;
            });
        }
        var total = 0, uploaded = 0;
        this.multipleResp.forEach(function (resp) {
            total += resp.progress.total;
            uploaded += resp.progress.loaded;
        });
        this.multipleProgress = Math.floor(uploaded / (total / 100));
    };
    UploadDemo.prototype.handleDropUpload = function (data) {
        var _this = this;
        var index = this.dropResp.findIndex(function (x) { return x.id === data.id; });
        if (index === -1) {
            this.dropResp.push(data);
        }
        else {
            this.zone.run(function () {
                _this.dropResp[index] = data;
            });
        }
        var total = 0, uploaded = 0;
        this.dropResp.forEach(function (resp) {
            total += resp.progress.total;
            uploaded += resp.progress.loaded;
        });
        this.dropProgress = Math.floor(uploaded / (total / 100));
    };
    UploadDemo = __decorate([
        core_1.Component({
            selector: 'upload-demo',
            styles: [require('app/+uploadfiledemo/components/uploadDemo.css')],
            template: require('app/+uploadfiledemo/components/uploadDemo.html'),
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
            pipes: []
        }), 
        __metadata('design:paramtypes', [])
    ], UploadDemo);
    return UploadDemo;
})();
exports.UploadDemo = UploadDemo;
//# sourceMappingURL=uploadDemo.js.map