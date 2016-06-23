
import {Component,  DoCheck,KeyValueDiffers,AfterViewInit} from '@angular/core';
import {UtilService} from '../../shared/index';
import {User,Folder,File,DocAttr,ConfidentAgreement,ConfidentTransfer,CheckBox} from "../../shared/index";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {Router} from '@angular/router-deprecated';
import {ModifyFileComponent} from '../../+modifyfile/index';
import {ModifyConfidComponent} from '../../+modifyconfid/index';

declare var jQuery:JQueryStatic;

@Component({
  selector: 'file-box',
  providers:[UtilService,DragulaService],
  directives: [Dragula,ModifyFileComponent,ModifyConfidComponent],
  styles: [ require('app/+file/components/file.component.css') ],
  template: require('app/+file/components/file.component.html')
})
export class FileComponent {

//开关
  showCreateFolder:boolean = false;
  showModifyFolder:boolean = false;
  showMyFiles:boolean = false;
  openMyFile:boolean = false;
  openList:boolean = true;
  openTransfer:boolean = false;

  modifyList:boolean = true;
  dispute:boolean = true; //争议版本切换
  liability:boolean = true;
  isFinal:boolean = false; //是否已经最终化

  move:boolean = false;
  moveTo:boolean = false;
  user:User;
  folders:Folder[];
  files:File[] = new Array<File>(); //这个必须要用，否则无法拖拽
  myFolder: Folder;
  myFiles:File[] = new Array<File>();
  myFile:File = new File();
  forModify:string; //用于修改
  differ:any;
  attrs:DocAttr[] = new Array<DocAttr>(); //属性列表
  agreement: ConfidentAgreement = new ConfidentAgreement();
  transfer : ConfidentTransfer = new ConfidentTransfer();
  attrData : Array<DocAttr> = new Array<DocAttr>();

  constructor(public _util:UtilService,private dragulaService:DragulaService,private router:Router){
    this.user = new User();
    this.user = <User>JSON.parse(sessionStorage.getItem('user'));

    this.getFolder();
    this.getFile(0);

    //拖拽功能 1
      dragulaService.setOptions('bag', {
        revertOnSpill: true,
        moves: function (el, container, handle) {
          //console.log(el, container, handle);
          return container.className !== 'item' ;  //其中term是class里面完整的类名，返回false时该指定对象无法拖拽
        }
      });

    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });


  }


  //拖拽功能 2
  private onDrop(args) {
    let [el, target] = args;
      var fileId = jQuery(el).find('.fileId').text();
    if(target.className === 'item'){
      var folderId = jQuery(target).find('.folderId').text();
      var data = '{"folderId":'+ folderId+ ', "docId":'+fileId+' }'
      this._util.updateFileFolder(data).subscribe((res)=>{
        this._util.getFile(0,this.user.id).subscribe((res)=>{
          this.files = <File[]> res.json().data;
        });
      });
    }else{
      var folderId = jQuery(target).parent().find('.folderId').text();
      var data = '{"folderId":'+ folderId+ ', "docId":'+fileId+' }'
      this._util.updateFileFolder(data).subscribe((res)=>{
        //重新刷新两个文件夹列表
          this._util.getFile(this.myFolder.id,this.user.id).subscribe((res)=>{
            this.myFiles = <File[]> res.json().data;
          });
        this._util.getFile(0,this.user.id).subscribe((res)=>{
          this.files = <File[]> res.json().data;
          //console.log(this.files);
        });
      });
    }
  }




  //获取该用户的文件夹
  getFolder(){
    this._util.getFolder(this.user.id).subscribe((res)=>{
      this.folders = <Folder[]> res.json();
    })
  }
  //获取该用户的文件
  getFile(folderId:number){
    this._util.getFile(folderId,this.user.id).subscribe((res)=>{
      this.files = <File[]> res.json().data;
      //console.log(this.files);
    });
  }

  //删除文件夹
  deleteFolder(fd:Folder){
    //console.log(fd);
    if (confirm("您确定要删除吗?")){
      this._util.deleteFolder(fd.id,fd.userId).subscribe((res)=>{
        // console.log(res);
        this.getFolder(); //刷新文件夹列表
        this.getFile(0);  //刷新文件列表（将原来的文件夹中的文件释放）
      });
      return true;
    }
    else{
      return false;
    }

    //this._util.deleteFolder(fd.id,fd.userId).subscribe((res)=>{
    // // console.log(res);
    //  this.getFolder(); //刷新文件夹列表
    //  this.getFile(0);  //刷新文件列表（将原来的文件夹中的文件释放）
    //});
  }
  //打开文件夹
  openFolder(fd:Folder){
    this.myFiles = []; //保证打开文件夹后，没有先前的文件夹的文件列表
    this.myFolder = fd;
    this._util.getFile(this.myFolder.id,this.user.id).subscribe((res)=>{
      this.myFiles = <File[]> res.json().data;
      this.showMyFiles = true;
    });

  }

//新建文件夹
  create(fn: string){
    //console.log(fn);
    if(fn){ //不为空的话
      this._util.createFolder(fn,this.user.id).subscribe((res)=>{
        alert("创建文件夹成功！");
        this.showCreateFolder = false;
        this.getFolder(); //刷新文件夹列表

      });

    }else{
      alert("不能为空");
    }
  }
//修改文件夹
  modifyFolder(fd:Folder){
    this.myFolder = fd;
    this.forModify = this.myFolder.fileName;
    this.showModifyFolder = true;

  }
  modify(forModify:string){
    if(forModify){
      this.myFolder.fileName = forModify;
      this._util.updateFolder(JSON.stringify(this.myFolder)).subscribe((res)=>{
        this.showModifyFolder = false;
        alert("修改成功！");
        this.getFolder(); //刷新文件夹列表

      });
    }else{
      alert("不能为空");
    }
  }
//跳转路由功能
  nav(name:string){
    this.router.parent.navigate([name])
    //console.log(name);
  }


  //删除文档
  deleteFile(mf:File){
    this.myFile = mf;
    if (confirm("您确定要删除吗?")){
      this._util.deleteFile(this.myFile.id).subscribe(()=>{
        if(this.myFile.folderId !== 0){
          this._util.getFile(this.myFile.folderId,this.user.id).subscribe((res)=>{
            this.myFiles = <File[]> res.json().data;
            this.showMyFiles = true;
          });
        }else {
          this.getFile(0);
        }
        alert("删除成功！");
      })
      return true;
    }
    else{
      return false;
    }


  }
  //复制文件
  copyFile(mf:File){
    this.myFile = mf;
    var data = '{"docId":'+this.myFile.id+',"docName":"'+this.myFile.docName+'-副本"'+'}';
    this._util.copyFile(data).subscribe((res)=>{
      var rc = res.json;
      console.log(rc);
      alert("文件复制成功！");
      //刷新列表
      this.refreshFileList(this.myFile.folderId);
    })
  }
  //更新文件
  updateFile(){
    this._util.updateFile(JSON.stringify(this.myFile)).subscribe();
  }
//修改文件
  modifyFile(mf:File){
    this.myFile = mf;
    this._util.getDocAttrs(this.myFile.id).subscribe((res)=>{
        this.attrs = <DocAttr[]>res.json();
      //console.log(this.attrs);
      if(this.myFile.docType == '7'){
        this.transfer = this._util.transTransfer(this.attrs);
        this.openMyFile = false;
        this.openList = false;
        this.openTransfer = true;
      }else{
        this.agreement = this._util.transFormat(this.attrs);
        this.openMyFile = true;
        this.openList = false;
        this.openTransfer = false;
      }

      //如果该文件是最终化
      if(this.myFile.status == "1"){
        this.isFinal = true; //最终化开关
      }else{
        this.isFinal = false;
      }
    });
  }
  //最终化文档
  finalizedDocument(){
    if (confirm("您确定要最终化该文档?")){
      this._util.finalFile(this.myFile.id).subscribe((res)=>{
        this.isFinal = true;
        //最终化后，需要重新刷新文档列表
        this.refreshFileList(this.myFile.folderId);
        alert("成功最终化文档！");
      })
      return true;
    }
    else{
      return false;
    }

  }
  //文件列表刷新
  refreshFileList(folderId:number){
    if(folderId == 0){ //未归类文档
      this._util.getFile(0,this.user.id).subscribe((res)=>{
        this.files = <File[]> res.json().data;
      });
    }else{ //相关文件夹的文档列表刷新
      this._util.getFile(folderId,this.user.id).subscribe((res)=>{
        this.myFiles = <File[]> res.json().data;
      });
    }
  }
  //移动文件按钮
  moveFile(mf:File){
    this.myFile = mf;
  }
  moveToFolder(folderId:number){
    if(this.myFile.folderId == 0){  //未归类的文件
      this.myFile.folderId = folderId;
      var data = '{"folderId":'+ folderId+ ', "docId":'+this.myFile.id+' }'
      this._util.updateFileFolder(data).subscribe((res)=>{
        //重新刷新文件列表
        this._util.getFile(0,this.user.id).subscribe((res)=>{
          this.files = <File[]> res.json().data;
          //console.log(this.files);
          alert("文件转移成功！");
          this.move = false;
        });
      });

    }else{ //指定文件夹
      var fdId = this.myFolder.id;
      this.myFile.folderId = folderId;
      var data = '{"folderId":'+ folderId+ ', "docId":'+this.myFile.id+' }'
      this._util.updateFileFolder(data).subscribe((res)=>{
        //重新刷新文件列表
        this._util.getFile(fdId,this.user.id).subscribe((res)=>{
          this.myFiles = <File[]> res.json().data;
          alert("文件转移成功！");
        });
        this.moveTo = false;
      });

    }
  }
  //移动界面返回
  backTo(){
    if(this.myFile.folderId == 0){
      this.move = false;
    }else{
      this.moveTo = false;
    }
  }

  modifyFileComponentClose(name:string){
    if(name == 'transfer'){
        this.openList = true;
        this.openTransfer = false;
    }else if(name == 'confid'){
        this.openList = true;
        this.openMyFile = false;
    }
  }

}












































































