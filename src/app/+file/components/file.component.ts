import {Component,  DoCheck,KeyValueDiffers,AfterViewInit} from '@angular/core';
import {UtilService} from '../../shared/index';
import {User,Folder,File} from "../../shared/index";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
declare var jQuery:JQueryStatic;

@Component({
  selector: 'file-box',
  providers:[UtilService,DragulaService],
  directives: [Dragula],
  styles: [ require('app/+file/components/file.component.css') ],
  template: require('app/+file/components/file.component.html')
})
export class FileComponent implements AfterViewInit, DoCheck {
  user:User;
  folders:Folder[];
  files:File[] = new Array<File>(); //这个必须要用，否则无法拖拽
  showMyFiles:boolean = false;
  myFolder: Folder;
  myFiles:File[] = new Array<File>();
  showCreateFolder:boolean = false;
  showModifyFolder:boolean = false;
  forModify:string; //用于修改
  differ:any;

  constructor(private _util:UtilService,private dragulaService:DragulaService,private differs: KeyValueDiffers){
    this.user = new User();
    this.user = <User>JSON.parse(sessionStorage.getItem('user'));
    this.differ = differs.find([]).create(null);

    this.getFolder();
    this.getFile();

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
  ngAfterViewInit() {

  };

  public ngDoCheck():any {  //藏检查
    //var changes = this.differ.diff(this.myFiles);
    //if(changes){
    //  console.log("change",this.myFiles);
    //}
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
        //console.log(res);
        //this.getFile();  //刷新文件列表（将原来的文件夹中的文件释放）
       // console.log(fileId,"msg",folderId,this.myFiles);
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
  getFile(){
    this._util.getFile(0,this.user.id).subscribe((res)=>{
      this.files = <File[]> res.json().data;
      //console.log(this.files);
    });
  }

  //删除文件夹
  deleteFolder(fd:Folder){
    //console.log(fd);
    this._util.deleteFolder(fd.id,fd.userId).subscribe((res)=>{
     // console.log(res);
      this.getFolder(); //刷新文件夹列表
      this.getFile();  //刷新文件列表（将原来的文件夹中的文件释放）
    });
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
        this.getFolder(); //刷新文件夹列表

      });
    }else{
      alert("不能为空");
    }
  }



}
