var core_1 = require('@angular/core');
var index_1 = require('../../shared/index');
var index_2 = require("../../shared/index");
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var router_deprecated_1 = require('@angular/router-deprecated');
var index_3 = require('../../+modifyfile/index');
var FileComponent = (function () {
    function FileComponent(_util, dragulaService, router) {
        var _this = this;
        this._util = _util;
        this.dragulaService = dragulaService;
        this.router = router;
        //开关
        this.showCreateFolder = false;
        this.showModifyFolder = false;
        this.showMyFiles = false;
        this.openMyFile = false;
        this.openList = true;
        this.openTransfer = false;
        this.modifyList = true;
        this.showQ1 = false;
        this.showQ2 = false;
        this.showQ4 = false;
        this.showQ5 = false;
        this.showQ6 = false;
        this.dispute = true; //争议版本切换
        this.liability = true;
        this.isFinal = false; //是否已经最终化
        this.move = false;
        this.moveTo = false;
        this.files = new Array(); //这个必须要用，否则无法拖拽
        this.myFiles = new Array();
        this.myFile = new index_2.File();
        this.attrs = new Array(); //属性列表
        this.agreement = new index_2.ConfidentAgreement();
        this.transfer = new index_2.ConfidentTransfer();
        this.attrData = new Array();
        this.disputeVersion1 = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
            + "如协商未能解决争议，任何一方可将争议提交（中国国际经济贸易仲裁委员会）仲裁，"
            + "仲裁应依照该会当时有效的仲裁规则进行。仲裁地点在（北京），仲裁语言为（中文），"
            + "仲裁裁决是终局的，对双方均有约束力。";
        this.disputeVersion2 = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
            + "如协商未能解决争议，任何一方可向具有管辖权的法院起诉。";
        //责任版本
        this.libVersion1 = " 如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接损失以及因此而支出的合理费用。";
        this.libVersion2 = "如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接和间接损失以及因此而支出的全部费用。";
        this.user = new index_2.User();
        this.user = JSON.parse(sessionStorage.getItem('user'));
        _util.getConfinfo().subscribe(function (res) {
            _this.confinfo = res.json();
        });
        //获取保密人员列表
        _util.getConfreciever().subscribe(function (res) {
            _this.confreciever = res.json();
        });
        this.getFolder();
        this.getFile(0);
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
    FileComponent.prototype.getFile = function (folderId) {
        var _this = this;
        this._util.getFile(folderId, this.user.id).subscribe(function (res) {
            _this.files = res.json().data;
            //console.log(this.files);
        });
    };
    //删除文件夹
    FileComponent.prototype.deleteFolder = function (fd) {
        var _this = this;
        //console.log(fd);
        if (confirm("您确定要删除吗?")) {
            this._util.deleteFolder(fd.id, fd.userId).subscribe(function (res) {
                // console.log(res);
                _this.getFolder(); //刷新文件夹列表
                _this.getFile(0); //刷新文件列表（将原来的文件夹中的文件释放）
            });
            return true;
        }
        else {
            return false;
        }
        //this._util.deleteFolder(fd.id,fd.userId).subscribe((res)=>{
        // // console.log(res);
        //  this.getFolder(); //刷新文件夹列表
        //  this.getFile(0);  //刷新文件列表（将原来的文件夹中的文件释放）
        //});
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
                alert("创建文件夹成功！");
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
                alert("修改成功！");
                _this.getFolder(); //刷新文件夹列表
            });
        }
        else {
            alert("不能为空");
        }
    };
    //跳转路由功能
    FileComponent.prototype.nav = function (name) {
        this.router.parent.navigate([name]);
        //console.log(name);
    };
    //删除文档
    FileComponent.prototype.deleteFile = function (mf) {
        var _this = this;
        this.myFile = mf;
        if (confirm("您确定要删除吗?")) {
            this._util.deleteFile(this.myFile.id).subscribe(function () {
                if (_this.myFile.folderId !== 0) {
                    _this._util.getFile(_this.myFile.folderId, _this.user.id).subscribe(function (res) {
                        _this.myFiles = res.json().data;
                        _this.showMyFiles = true;
                    });
                }
                else {
                    _this.getFile(0);
                }
                alert("删除成功！");
            });
            return true;
        }
        else {
            return false;
        }
    };
    //复制文件
    FileComponent.prototype.copyFile = function (mf) {
        var _this = this;
        this.myFile = mf;
        var data = '{"docId":' + this.myFile.id + ',"docName":"' + this.myFile.docName + '-副本"' + '}';
        this._util.copyFile(data).subscribe(function (res) {
            var rc = res.json;
            console.log(rc);
            alert("文件复制成功！");
            //刷新列表
            _this.refreshFileList(_this.myFile.folderId);
        });
    };
    //更新文件
    FileComponent.prototype.updateFile = function () {
        this._util.updateFile(JSON.stringify(this.myFile)).subscribe();
    };
    //修改文件
    FileComponent.prototype.modifyFile = function (mf) {
        var _this = this;
        this.myFile = mf;
        this._util.getDocAttrs(this.myFile.id).subscribe(function (res) {
            _this.attrs = res.json();
            //console.log(this.attrs);
            if (_this.myFile.docType == '7') {
                _this.transfer = _this._util.transTransfer(_this.attrs);
                _this.openMyFile = false;
                _this.openList = false;
                _this.openTransfer = true;
            }
            else {
                _this.agreement = _this._util.transFormat(_this.attrs);
                _this.openMyFile = true;
                _this.openList = false;
                _this.openTransfer = false;
            }
            //如果该文件是最终化
            if (_this.myFile.status == "1") {
                _this.isFinal = true; //最终化开关
            }
            else {
                _this.isFinal = false;
            }
        });
    };
    //最终化文档
    FileComponent.prototype.finalizedDocument = function () {
        var _this = this;
        if (confirm("您确定要最终化该文档?")) {
            this._util.finalFile(this.myFile.id).subscribe(function (res) {
                _this.isFinal = true;
                //最终化后，需要重新刷新文档列表
                _this.refreshFileList(_this.myFile.folderId);
                alert("成功最终化文档！");
            });
            return true;
        }
        else {
            return false;
        }
    };
    //文件列表刷新
    FileComponent.prototype.refreshFileList = function (folderId) {
        var _this = this;
        if (folderId == 0) {
            this._util.getFile(0, this.user.id).subscribe(function (res) {
                _this.files = res.json().data;
            });
        }
        else {
            this._util.getFile(folderId, this.user.id).subscribe(function (res) {
                _this.myFiles = res.json().data;
            });
        }
    };
    //移动文件按钮
    FileComponent.prototype.moveFile = function (mf) {
        this.myFile = mf;
    };
    FileComponent.prototype.moveToFolder = function (folderId) {
        var _this = this;
        if (this.myFile.folderId == 0) {
            this.myFile.folderId = folderId;
            var data = '{"folderId":' + folderId + ', "docId":' + this.myFile.id + ' }';
            this._util.updateFileFolder(data).subscribe(function (res) {
                //重新刷新文件列表
                _this._util.getFile(0, _this.user.id).subscribe(function (res) {
                    _this.files = res.json().data;
                    //console.log(this.files);
                    alert("文件转移成功！");
                    _this.move = false;
                });
            });
        }
        else {
            var fdId = this.myFolder.id;
            this.myFile.folderId = folderId;
            var data = '{"folderId":' + folderId + ', "docId":' + this.myFile.id + ' }';
            this._util.updateFileFolder(data).subscribe(function (res) {
                //重新刷新文件列表
                _this._util.getFile(fdId, _this.user.id).subscribe(function (res) {
                    _this.myFiles = res.json().data;
                    alert("文件转移成功！");
                });
                _this.moveTo = false;
            });
        }
    };
    //移动界面返回
    FileComponent.prototype.backTo = function () {
        if (this.myFile.folderId == 0) {
            this.move = false;
        }
        else {
            this.moveTo = false;
        }
    };
    //检查协议主体类型
    FileComponent.prototype.checkOrg = function () {
        this.modifyList = !this.modifyList;
        if (this.agreement.organizationType == '企业') {
            this.showQ1 = !this.showQ1;
        }
        else {
            this.showQ2 = !this.showQ2;
        }
    };
    //保密材料选择..........................
    //全选
    FileComponent.prototype.selectAll = function () {
        this.confinfo.forEach(function (c) {
            c.flag = true;
        });
    };
    ;
    //全不选
    FileComponent.prototype.selectNone = function () {
        this.confinfo.forEach(function (c) {
            c.flag = false;
        });
    };
    //组装选择对象值为字符串，以分号隔开
    FileComponent.prototype.oToS = function () {
        var str = "";
        this.confinfo.forEach(function (c) {
            if (c.flag) {
                str += c.value + "、";
            }
        });
        this.agreement.confDefination = str.substr(0, str.length - 1); //去除最后一个顿号
        this.updateAgreement();
    };
    //保密人员选择..........................
    //全选
    FileComponent.prototype.selectAllPerson = function () {
        this.confreciever.forEach(function (c) {
            c.flag = true;
        });
    };
    ;
    //全不选
    FileComponent.prototype.selectNonePerson = function () {
        this.confreciever.forEach(function (c) {
            c.flag = false;
        });
    };
    //组装选择对象值为字符串，以分号隔开
    FileComponent.prototype.oToSPerson = function () {
        var str = "";
        this.confreciever.forEach(function (c) {
            if (c.flag) {
                str += c.value + "、";
            }
        });
        this.agreement.recievers = str.substr(0, str.length - 1); //去除最后一个顿号
        //方案选择
        if (this.dispute) {
            this.agreement.dispute = this.disputeVersion1;
        }
        else {
            this.agreement.dispute = this.disputeVersion2;
        }
        if (this.liability) {
            this.agreement.liability = this.libVersion1;
        }
        else {
            this.agreement.liability = this.libVersion2;
        }
        this.updateAgreement();
    };
    //修改协议
    FileComponent.prototype.updateAgreement = function () {
        this.attrData = this._util.setAttrData(this.myFile.id, this.agreement);
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(function () {
            // alert("修改成功！");
            swal("Good job!", "修改成功！", "success");
        });
    };
    //生成文件
    FileComponent.prototype.createDocument = function (format) {
        console.log(format);
        this._util.generateFile("" + this.myFile.id, format);
    };
    FileComponent = __decorate([
        core_1.Component({
            selector: 'file-box',
            providers: [index_1.UtilService, ng2_dragula_1.DragulaService],
            directives: [ng2_dragula_1.Dragula, index_3.ModifyFileComponent],
            styles: [require('app/+file/components/file.component.css')],
            template: require('app/+file/components/file.component.html')
        }), 
        __metadata('design:paramtypes', [index_1.UtilService, ng2_dragula_1.DragulaService, router_deprecated_1.Router])
    ], FileComponent);
    return FileComponent;
})();
exports.FileComponent = FileComponent;
//# sourceMappingURL=file.component.js.map