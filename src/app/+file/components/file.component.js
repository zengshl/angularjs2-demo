var core_1 = require('@angular/core');
var index_1 = require('../../shared/index');
var index_2 = require("../../shared/index");
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var FileComponent = (function () {
    function FileComponent(_util, dragulaService, differs) {
        var _this = this;
        this._util = _util;
        this.dragulaService = dragulaService;
        this.differs = differs;
        this.files = new Array(); //这个必须要用，否则无法拖拽
        this.showMyFiles = false;
        this.myFiles = new Array();
        this.bagFiles = new Array();
        this.user = new index_2.User();
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.differ = differs.find([]).create(null);
        this.getFolder();
        this.getFile();
        //拖拽功能 1
        dragulaService.setOptions('bag', {
            revertOnSpill: true,
            moves: function (el, container, handle) {
                return handle.className != 'drag item'; //其中term是class里面完整的类名，返回false时该指定对象无法拖拽
            }
        });
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    FileComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.myFiles);
        if (changes) {
            console.log("change", this.myFiles);
        }
    };
    //拖拽功能 2
    FileComponent.prototype.onDropModel = function (args) {
        var _this = this;
        var el = args[0], target = args[1], source = args[2];
        setTimeout(function () {
            var fileId = jQuery(el).find('.fileId').text();
            var folderId = jQuery(target).parent().find('.folderId').text();
            var data = '{"folderId":' + folderId + ', "docId":' + fileId + ' }';
            _this._util.updateFileFolder(data).subscribe(function (res) {
                //console.log(res);
                _this.getFile(); //刷新文件列表（将原来的文件夹中的文件释放）
            });
            console.log(fileId, "msg", folderId, _this.myFiles);
            //重新刷新两个文件夹列表
            _this._util.getFile(_this.myFolder.id, _this.user.id).subscribe(function (res) {
                _this.myFiles = res.json().data;
            });
            _this._util.getFile(0, _this.user.id).subscribe(function (res) {
                _this.files = res.json().data;
                //console.log(this.files);
            });
        }, 1);
    };
    FileComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
    };
    //获取该用户的文件夹
    FileComponent.prototype.getFolder = function () {
        var _this = this;
        this._util.getFolder(this.user.id).subscribe(function (res) {
            _this.folders = res.json();
        });
    };
    //获取该用户的文件
    FileComponent.prototype.getFile = function () {
        var _this = this;
        this._util.getFile(0, this.user.id).subscribe(function (res) {
            _this.files = res.json().data;
            //console.log(this.files);
        });
    };
    //删除文件夹
    FileComponent.prototype.deleteFolder = function (fd) {
        var _this = this;
        console.log(fd);
        this._util.deleteFolder(fd.id, fd.userId).subscribe(function (res) {
            // console.log(res);
            _this.getFolder(); //刷新文件夹列表
            _this.getFile(); //刷新文件列表（将原来的文件夹中的文件释放）
        });
    };
    //打开文件夹
    FileComponent.prototype.openFolder = function (fd) {
        var _this = this;
        this.myFolder = fd;
        this._util.getFile(this.myFolder.id, this.user.id).subscribe(function (res) {
            _this.myFiles = res.json().data;
        });
        this.showMyFiles = true;
    };
    FileComponent = __decorate([
        core_1.Component({
            selector: 'file-box',
            providers: [index_1.UtilService, ng2_dragula_1.DragulaService],
            directives: [ng2_dragula_1.Dragula],
            styles: [require('app/+file/components/file.component.css')],
            template: require('app/+file/components/file.component.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, ng2_dragula_1.DragulaService, core_1.KeyValueDiffers])
    ], FileComponent);
    return FileComponent;
})();
exports.FileComponent = FileComponent;
//# sourceMappingURL=file.component.js.map