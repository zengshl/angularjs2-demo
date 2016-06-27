System.register("src/directives/ng-file-select", ["angular2/core", "../services/ng2-uploader"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      ng2_uploader_1;
  var NgFileSelect;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(ng2_uploader_1_1) {
      ng2_uploader_1 = ng2_uploader_1_1;
    }],
    execute: function() {
      NgFileSelect = (function() {
        function NgFileSelect(el) {
          var _this = this;
          this.el = el;
          this.onUpload = new core_1.EventEmitter();
          this.uploader = new ng2_uploader_1.Ng2Uploader();
          setTimeout(function() {
            _this.uploader.setOptions(_this.options);
          });
          this.uploader._emitter.subscribe(function(data) {
            _this.onUpload.emit(data);
          });
        }
        NgFileSelect.prototype.onFiles = function() {
          var files = this.el.nativeElement.files;
          if (files.length) {
            this.uploader.addFilesToQueue(files);
          }
        };
        NgFileSelect = __decorate([core_1.Directive({
          selector: '[ng-file-select]',
          inputs: ['options: ng-file-select'],
          outputs: ['onUpload'],
          host: {'(change)': 'onFiles()'}
        }), __metadata('design:paramtypes', [core_1.ElementRef])], NgFileSelect);
        return NgFileSelect;
      }());
      exports_1("NgFileSelect", NgFileSelect);
    }
  };
});

System.register("src/services/ng2-uploader", ["angular2/core"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1;
  var UploadedFile,
      Ng2Uploader;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }],
    execute: function() {
      UploadedFile = (function() {
        function UploadedFile(id, originalName, size) {
          this.id = id;
          this.originalName = originalName;
          this.size = size;
          this.progress = {
            loaded: 0,
            total: 0,
            percent: 0
          };
          this.done = false;
          this.error = false;
          this.abort = false;
        }
        UploadedFile.prototype.setProgres = function(progress) {
          this.progress = progress;
        };
        UploadedFile.prototype.setError = function() {
          this.error = true;
          this.done = true;
        };
        UploadedFile.prototype.setAbort = function() {
          this.abort = true;
          this.done = true;
        };
        UploadedFile.prototype.onFinished = function(status, statusText, response) {
          this.status = status;
          this.statusText = statusText;
          this.response = response;
          this.done = true;
        };
        return UploadedFile;
      }());
      Ng2Uploader = (function() {
        function Ng2Uploader() {
          this.cors = false;
          this.withCredentials = false;
          this.multiple = false;
          this.maxUploads = 3;
          this.allowedExtensions = [];
          this.maxSize = false;
          this.data = {};
          this.noParams = true;
          this.autoUpload = true;
          this.multipart = true;
          this.method = 'POST';
          this.debug = false;
          this.customHeaders = {};
          this.encodeHeaders = true;
          this.authTokenPrefix = "Bearer";
          this.authToken = undefined;
          this.fieldName = "file";
          this._queue = [];
          this._emitter = new core_1.EventEmitter(true);
        }
        Ng2Uploader.prototype.setOptions = function(options) {
          this.url = options.url != null ? options.url : this.url;
          this.cors = options.cors != null ? options.cors : this.cors;
          this.withCredentials = options.withCredentials != null ? options.withCredentials : this.withCredentials;
          this.multiple = options.multiple != null ? options.multiple : this.multiple;
          this.maxUploads = options.maxUploads != null ? options.maxUploads : this.maxUploads;
          this.allowedExtensions = options.allowedExtensions != null ? options.allowedExtensions : this.allowedExtensions;
          this.maxSize = options.maxSize != null ? options.maxSize : this.maxSize;
          this.data = options.data != null ? options.data : this.data;
          this.noParams = options.noParams != null ? options.noParams : this.noParams;
          this.autoUpload = options.autoUpload != null ? options.autoUpload : this.autoUpload;
          this.multipart = options.multipart != null ? options.multipart : this.multipart;
          this.method = options.method != null ? options.method : this.method;
          this.debug = options.debug != null ? options.debug : this.debug;
          this.customHeaders = options.customHeaders != null ? options.customHeaders : this.customHeaders;
          this.encodeHeaders = options.encodeHeaders != null ? options.encodeHeaders : this.encodeHeaders;
          this.authTokenPrefix = options.authTokenPrefix != null ? options.authTokenPrefix : this.authTokenPrefix;
          this.authToken = options.authToken != null ? options.authToken : this.authToken;
          this.fieldName = options.fieldName != null ? options.fieldName : this.fieldName;
          if (!this.multiple) {
            this.maxUploads = 1;
          }
        };
        Ng2Uploader.prototype.uploadFilesInQueue = function() {
          var _this = this;
          var newFiles = this._queue.filter(function(f) {
            return !f.uploading;
          });
          newFiles.forEach(function(f) {
            _this.uploadFile(f);
          });
        };
        ;
        Ng2Uploader.prototype.uploadFile = function(file) {
          var _this = this;
          var xhr = new XMLHttpRequest();
          var form = new FormData();
          form.append(this.fieldName, file, file.name);
          var uploadingFile = new UploadedFile(this.generateRandomIndex(), file.name, file.size);
          var queueIndex = this._queue.indexOf(file);
          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              var percent = Math.round(e.loaded / e.total * 100);
              uploadingFile.setProgres({
                total: e.total,
                loaded: e.loaded,
                percent: percent
              });
              _this._emitter.emit(uploadingFile);
            }
          };
          xhr.upload.onabort = function(e) {
            uploadingFile.setAbort();
            _this._emitter.emit(uploadingFile);
          };
          xhr.upload.onerror = function(e) {
            uploadingFile.setError();
            _this._emitter.emit(uploadingFile);
          };
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              uploadingFile.onFinished(xhr.status, xhr.statusText, xhr.response);
              _this.removeFileFromQueue(queueIndex);
              _this._emitter.emit(uploadingFile);
            }
          };
          xhr.open(this.method, this.url, true);
          xhr.withCredentials = this.withCredentials;
          if (this.customHeaders) {
            Object.keys(this.customHeaders).forEach(function(key) {
              xhr.setRequestHeader(key, _this.customHeaders[key]);
            });
          }
          if (this.authToken) {
            xhr.setRequestHeader("Authorization", this.authTokenPrefix + " " + this.authToken);
          }
          xhr.send(form);
        };
        Ng2Uploader.prototype.addFilesToQueue = function(files) {
          for (var _i = 0,
              files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (this.isFile(file) && !this.inQueue(file)) {
              this._queue.push(file);
            }
          }
          if (this.autoUpload) {
            this.uploadFilesInQueue();
          }
        };
        Ng2Uploader.prototype.removeFileFromQueue = function(i) {
          this._queue.splice(i, 1);
        };
        Ng2Uploader.prototype.clearQueue = function() {
          this._queue = [];
        };
        Ng2Uploader.prototype.getQueueSize = function() {
          return this._queue.length;
        };
        Ng2Uploader.prototype.inQueue = function(file) {
          var fileInQueue = this._queue.filter(function(f) {
            return f === file;
          });
          return fileInQueue.length ? true : false;
        };
        Ng2Uploader.prototype.isFile = function(file) {
          return file !== null && (file instanceof Blob || (file.name && file.size));
        };
        Ng2Uploader.prototype.log = function(msg) {
          if (!this.debug) {
            return;
          }
          console.log('[Ng2Uploader]:', msg);
        };
        Ng2Uploader.prototype.generateRandomIndex = function() {
          return Math.random().toString(36).substring(7);
        };
        Ng2Uploader = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], Ng2Uploader);
        return Ng2Uploader;
      }());
      exports_1("Ng2Uploader", Ng2Uploader);
    }
  };
});

System.register("src/directives/ng-file-drop", ["angular2/core", "../services/ng2-uploader"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      ng2_uploader_1;
  var NgFileDrop;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(ng2_uploader_1_1) {
      ng2_uploader_1 = ng2_uploader_1_1;
    }],
    execute: function() {
      NgFileDrop = (function() {
        function NgFileDrop(el) {
          var _this = this;
          this.el = el;
          this.onUpload = new core_1.EventEmitter();
          this.uploader = new ng2_uploader_1.Ng2Uploader();
          setTimeout(function() {
            _this.uploader.setOptions(_this.options);
          });
          this.uploader._emitter.subscribe(function(data) {
            _this.onUpload.emit(data);
          });
          this.initEvents();
        }
        NgFileDrop.prototype.initEvents = function() {
          var _this = this;
          this.el.nativeElement.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var dt = e.dataTransfer;
            var files = dt.files;
            if (files.length) {
              _this.uploader.addFilesToQueue(files);
            }
          }, false);
          this.el.nativeElement.addEventListener('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
          }, false);
          this.el.nativeElement.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
          }, false);
        };
        NgFileDrop = __decorate([core_1.Directive({
          selector: '[ng-file-drop]',
          inputs: ['options: ng-file-drop'],
          outputs: ['onUpload'],
          host: {'(change)': 'onFiles()'}
        }), __metadata('design:paramtypes', [core_1.ElementRef])], NgFileDrop);
        return NgFileDrop;
      }());
      exports_1("NgFileDrop", NgFileDrop);
    }
  };
});

System.register("ng2-uploader", ["./src/services/ng2-uploader", "./src/directives/ng-file-select", "./src/directives/ng-file-drop"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var ng2_uploader_1,
      ng_file_select_1,
      ng_file_drop_1;
  var UPLOAD_DIRECTIVES;
  var exportedNames_1 = {'UPLOAD_DIRECTIVES': true};
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(ng2_uploader_1_1) {
      ng2_uploader_1 = ng2_uploader_1_1;
      exportStar_1(ng2_uploader_1_1);
    }, function(ng_file_select_1_1) {
      ng_file_select_1 = ng_file_select_1_1;
      exportStar_1(ng_file_select_1_1);
    }, function(ng_file_drop_1_1) {
      ng_file_drop_1 = ng_file_drop_1_1;
      exportStar_1(ng_file_drop_1_1);
    }],
    execute: function() {
      exports_1("default", {
        directives: [ng_file_select_1.NgFileSelect, ng_file_drop_1.NgFileDrop],
        providers: [ng2_uploader_1.Ng2Uploader]
      });
      exports_1("UPLOAD_DIRECTIVES", UPLOAD_DIRECTIVES = [ng_file_select_1.NgFileSelect, ng_file_drop_1.NgFileDrop]);
    }
  };
});
