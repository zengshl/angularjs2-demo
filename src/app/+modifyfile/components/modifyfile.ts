/**
 * Created by wss on 2016/6/20.
 */
import {Component,  DoCheck,KeyValueDiffers,AfterViewInit} from '@angular/core';
import {EventEmitter } from '@angular/core';
import {UtilService} from '../../shared/index';
import {User,Folder,File,DocAttr,ConfidentTransfer,CheckBox} from "../../shared/index";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {Router} from '@angular/router-deprecated';
declare var jQuery:JQueryStatic;

@Component({
    selector: 'modifyfile-box',
    providers:[UtilService,DragulaService],
    directives: [Dragula],
    inputs: ['myFile','transfer','isFinal'],
    outputs:['openHolderList'],
    template: require('app/+modifyfile/components/modifyfile.html')
})
export class ModifyFileComponent implements AfterViewInit{

    showQ1:boolean = false;
    showQ2:boolean = false;
    showQ3:boolean = false;
    showQ4:boolean = false;
    showQ41:boolean = false;
    showQ5:boolean = false;
    showQ6:boolean = false;
    showQ7:boolean = false;
    showQ8:boolean = false;
    showQ9:boolean = false;
    showQ10:boolean = false;

    transfer : ConfidentTransfer ;
    myFile : File;

    isFinal:boolean; //是否已经最终化
    attrData : Array<DocAttr> = new Array<DocAttr>();
    modifyList :boolean = true;
    openMyFile :boolean = false;

    openHolderList:EventEmitter<string> = new EventEmitter<string>();


    ngAfterViewInit() {

    }

    constructor(public _util:UtilService,private dragulaService:DragulaService,private router:Router){

    }

    //最终化文档
    finalizedDocument(){
        if (confirm("您确定要最终化该文档?")){
            this._util.finalFile(this.myFile.id).subscribe((res)=>{
                this.isFinal = true;
                //最终化后，需要重新刷新文档列表
                //this.refreshFileList(this.myFile.folderId);
                swal("成功最终化文档！", "", "success");
            })
            return true;
        }
        else{
            return false;
        }
    }

    //生成文件
    createDocument(format:string){
        this._util.generateFile(""+this.myFile.id,format);
    }

    //修改协议
    updateTransfer(){
        this.attrData = this._util.setTransferData(this.myFile.id,this.transfer);
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
            swal("Good job!", "修改成功！", "success");
        })
    }
    //修改文件
    updateFile(){
        this._util.updateFile(JSON.stringify(this.myFile)).subscribe();
    }

    close(name:string){
        this.openHolderList.emit(name);
    }
}