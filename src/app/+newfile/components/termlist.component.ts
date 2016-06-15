import {Component,OnChanges,SimpleChange,EventEmitter} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Moudle,Doctype,UtilService,File,User} from "../../shared/index";

@Component({
  selector: 'termlist',
  inputs:['mould'],
  providers: [UtilService],
  template: `
    <a class="item" *ngFor = "let t of docType" (click)="showTemplate(t)">
       <h4 class="ui header">{{t.typeName}}</h4>
        <p>{{t.remark}}</p>
    </a>
  `
})
export class TermListComponent implements OnChanges{
  mould:Moudle;
  file:File = new File();
  user:User = new User();
  docType:Array<Doctype> = new Array<Doctype>();

  constructor(private _util:UtilService,private router:Router){

  }
  nav(name:string){
    this.router.parent.navigate([name])
    //console.log(name);
  }
  ngOnChanges(changes:{[propName: string]: SimpleChange}):any {
    this._util.getDoctype(this.mould.id).subscribe((res)=>{
      this.docType = <Doctype[]>res.json();
    });
  }
  showTemplate(t:Doctype){
    if(t.preId === 0){  //保密协议
      if(sessionStorage.getItem('user')){
        this.user = <User>JSON.parse(sessionStorage.getItem('user'));
        this.file.userId = this.user.id;
        this.file.docType = "2"; //docType 对应doc_docType表中的id,此处2对应保密协议；待其他模板健全后，改为 t.id+""
        this.file.templateId = 1; //保密协议 第1个版本
        //this.file.docName = "保密协议";
        this.file.folderId = 0; //未分类文件夹
        this.file.status = "0"; //非最终化
        sessionStorage.setItem("file",JSON.stringify(this.file));
        this.nav('./ConfidTemplate');  //此处到时候，通过if语句判断上面的模板参数，来指定相应的路由

      }
    }

  }

}
