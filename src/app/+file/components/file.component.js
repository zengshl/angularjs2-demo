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
        this.showCreateFolder = false;
        this.showModifyFolder = false;
        this.user = new index_2.User();
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.differ = differs.find([]).create(null);
        this.getFolder();
        this.getFile();
        //拖拽功能 1
        dragulaService.setOptions('bag', {
            revertOnSpill: true,
            moves: function (el, container, handle) {
                //console.log(el, container, handle);
                return container.className !== 'item'; //其中term是class里面完整的类名，返回false时该指定对象无法拖拽
            }
        });
        dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
    }
    FileComponent.prototype.ngAfterViewInit = function () {
    };
    ;
    FileComponent.prototype.ngDoCheck = function () {
        //var changes = this.differ.diff(this.myFiles);
        //if(changes){
        //  console.log("change",this.myFiles);
        //}
    };
    //拖拽功能 2
    FileComponent.prototype.onDrop = function (args) {
        var _this = this;
        var el = args[0], target = args[1];
        var fileId = jQuery(el).find('.fileId').text();
        if (target.className === 'item') {
            var folderId = jQuery(target).find('.folderId').text();
            var data = '{"folderId":' + folderId + ', "docId":' + fileId + ' }';
            this._util.updateFileFolder(data).subscribe(function (res) {
                _this._util.getFile(0, _this.user.id).subscribe(function (res) {
                    _this.files = res.json().data;
                });
            });
        }
        else {
            var folderId = jQuery(target).parent().find('.folderId').text();
            var data = '{"folderId":' + folderId + ', "docId":' + fileId + ' }';
            this._util.updateFileFolder(data).subscribe(function (res) {
                //console.log(res);
                //this.getFile();  //刷新文件列表（将原来的文件夹中的文件释放）
                // console.log(fileId,"msg",folderId,this.myFiles);
                //重新刷新两个文件夹列表
                _this._util.getFile(_this.myFolder.id, _this.user.id).subscribe(function (res) {
                    _this.myFiles = res.json().data;
                });
                _this._util.getFile(0, _this.user.id).subscribe(function (res) {
                    _this.files = res.json().data;
                    //console.log(this.files);
                });
            });
        }
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
        //console.log(fd);
        this._util.deleteFolder(fd.id, fd.userId).subscribe(function (res) {
            // console.log(res);
            _this.getFolder(); //刷新文件夹列表
            _this.getFile(); //刷新文件列表（将原来的文件夹中的文件释放）
        });
    };
    //打开文件夹
    FileComponent.prototype.openFolder = function (fd) {
        var _this = this;
        this.myFiles = []; //保证打开文件夹后，没有先前的文件夹的文件列表
        this.myFolder = fd;
        this._util.getFile(this.myFolder.id, this.user.id).subscribe(function (res) {
            _this.myFiles = res.json().data;
            _this.showMyFiles = true;
        });
    };
    //新建文件夹
    FileComponent.prototype.create = function (fn) {
        var _this = this;
        //console.log(fn);
        if (fn) {
            this._util.createFolder(fn, this.user.id).subscribe(function (res) {
                _this.showCreateFolder = false;
                _this.getFolder(); //刷新文件夹列表
            });
        }
        else {
            alert("不能为空");
        }
    };
    //修改文件夹
    FileComponent.prototype.modifyFolder = function (fd) {
        this.myFolder = fd;
        this.forModify = this.myFolder.fileName;
        this.showModifyFolder = true;
    };
    FileComponent.prototype.modify = function (forModify) {
        var _this = this;
        if (forModify) {
            this.myFolder.fileName = forModify;
            this._util.updateFolder(JSON.stringify(this.myFolder)).subscribe(function (res) {
                _this.showModifyFolder = false;
                _this.getFolder(); //刷新文件夹列表
            });
        }
        else {
            alert("不能为空");
        }
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