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
        this.file.docType = '2';
        this.file.templateId = 1; //保密协议 第1个版本
        this.file.docName = "保密协议";
        this.file.folderId = 0;
        this._util.createFile(JSON.stringify(this.file)).subscribe((res)=>{
          var str = res.json();
          sessionStorage.setItem("fileId",str);
          this.nav('./ConfidTemplate');
        });

      }
    }

  }

}
