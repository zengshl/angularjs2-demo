import {Component,  DoCheck,KeyValueDiffers} from '@angular/core';
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
export class FileComponent implements DoCheck {
  user:User;
  folders:Folder[];
  files:File[] = new Array<File>(); //这个必须要用，否则无法拖拽
  showMyFiles:boolean = false;
  myFolder: Folder;
  myFiles:File[] = new Array<File>();
  bagFiles:File[] = new Array<File>();

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
          return handle.className != 'drag item';  //其中term是class里面完整的类名，返回false时该指定对象无法拖拽
        }
      });

      dragulaService.dropModel.subscribe((value) => {
        this.onDropModel(value.slice(1));
      });
      dragulaService.removeModel.subscribe((value) => {
        this.onRemoveModel(value.slice(1));
      });

  }


  public ngDoCheck():any {  //藏检查
    var changes = this.differ.diff(this.myFiles);
    if(changes){
      console.log("change",this.myFiles);
    }
  }

  //拖拽功能 2

  private onDropModel(args) {
    let [el, target, source] = args;
    setTimeout(()=>{
      var fileId = jQuery(el).find('.fileId').text();
      var folderId = jQuery(target).parent().find('.folderId').text();
      var data = '{"folderId":'+ folderId+ ', "docId":'+fileId+' }'
      this._util.updateFileFolder(data).subscribe((res)=>{
        //console.log(res);
        this.getFile();  //刷新文件列表（将原来的文件夹中的文件释放）
      });
      console.log(fileId,"msg",folderId,this.myFiles);
      //重新刷新两个文件夹列表
      this._util.getFile(this.myFolder.id,this.user.id).subscribe((res)=>{
        this.myFiles = <File[]> res.json().data;
      });
      this._util.getFile(0,this.user.id).subscribe((res)=>{
        this.files = <File[]> res.json().data;
        //console.log(this.files);
      });

    },1);

  }
  private onRemoveModel(args) {
    let [el, source] = args;

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
    console.log(fd);
    this._util.deleteFolder(fd.id,fd.userId).subscribe((res)=>{
     // console.log(res);
      this.getFolder(); //刷新文件夹列表
      this.getFile();  //刷新文件列表（将原来的文件夹中的文件释放）
    });
  }
  //打开文件夹
  openFolder(fd:Folder){
    this.myFolder = fd;
    this._util.getFile(this.myFolder.id,this.user.id).subscribe((res)=>{
      this.myFiles = <File[]> res.json().data;
    });
    this.showMyFiles = true;
  }




}
