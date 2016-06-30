/**
 * Created by zengshl on 2016-04-13.
 */
import {Component,NgZone} from '@angular/core';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';   //文件上传的组件
import {bootstrap} from "angular2/platform/browser"

@Component({
    selector: 'upload-demo',
    styles: [ require('app/+uploadfiledemo/components/uploadDemo.css') ],
    template: require('app/+uploadfiledemo/components/uploadDemo.html')
    directives: [UPLOAD_DIRECTIVES],
    pipes: []
})

//文件上传的操作处理

/*
* this.url = options.url != null ? options.url : this.url;
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
* */

export class UploadDemo {
    zone: NgZone;
    options: Object = {
        allowedExtensions : ['docx'],
        //url: 'http://localhost:9000/law/file/upload'
        url: 'http://192.168.1.55:8080/law/file/upload'

        //url: 'http://ng2-uploader.com:10050/upload'
    };
    basicProgress: number = 0;
    basicResp: Object;
    multipleProgress: number = 0;
    multipleResp: any[] = [];
    dropProgress: number = 0;
    dropResp: any[] = [];
    textName:string = "";
    uploadFile: any;

    constructor() {
        console.log("http://ng2-uploader.com:10050/upload");
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    handleBasicUpload(data): void {
        this.basicResp = data;
        this.textName = this.basicResp.originalName
        this.zone.run(() => {
            this.basicProgress = data.progress.percent;
        });
        //    if (data && data.response) {
        //    data = JSON.parse(data.response);
        //    this.uploadFile = data;
        //}
    }

    handleMultipleUpload(data): void {
        let index = this.multipleResp.findIndex(x => x.id === data.id);
        if (index === -1) {
            this.multipleResp.push(data);
        }
        else {
            this.zone.run(() => {
                this.multipleResp[index] = data;
            });
        }

        let total = 0, uploaded = 0;
        this.multipleResp.forEach(resp => {
            total += resp.progress.total;
            uploaded += resp.progress.loaded;
        });

        this.multipleProgress = Math.floor(uploaded / (total / 100));
    }

    handleDropUpload(data): void {
        let index = this.dropResp.findIndex(x => x.id === data.id);
        if (index === -1) {
            this.dropResp.push(data);
        }
        else {
            this.zone.run(() => {
                this.dropResp[index] = data;
            });
        }

        let total = 0, uploaded = 0;
        this.dropResp.forEach(resp => {
            total += resp.progress.total;
            uploaded += resp.progress.loaded;
        });

        this.dropProgress = Math.floor(uploaded / (total / 100));
    }

}

