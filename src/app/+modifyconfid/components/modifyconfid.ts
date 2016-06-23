/**
 * Created by wss on 2016/6/20.
 */
import {Component,  DoCheck,KeyValueDiffers,AfterViewInit} from '@angular/core';
import {EventEmitter } from '@angular/core';
import {UtilService} from '../../shared/index';
import {User,Folder,File,DocAttr,ConfidentAgreement,CheckBox} from "../../shared/index";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {Router} from '@angular/router-deprecated';
declare var jQuery:JQueryStatic;

@Component({
    selector: 'modifyconfid-box',
    providers:[UtilService,DragulaService],
    directives: [Dragula],
    inputs: ['myFile','agreement','isFinal'],
    outputs:['openHolderList'],
    template: require('app/+modifyconfid/components/modifyconfid.html')
})
export class ModifyConfidComponent implements AfterViewInit{

    modifyList:boolean = true;
    showQ1:boolean = false;
    showQ2:boolean = false;
    showQ4:boolean = false;
    showQ5:boolean = false;
    showQ6:boolean = false;
    dispute:boolean = true; //争议版本切换
    liability:boolean = true;

    isFinal:boolean; //是否已经最终化
    agreement: ConfidentAgreement;
    myFile:File;

    attrData : Array<DocAttr> = new Array<DocAttr>();
    openMyFile :boolean = false;

    confinfo:CheckBox[]; //保密信息列表
    confreciever:CheckBox[]; //保密人员列表
    disputeVersion1:string = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
        + "如协商未能解决争议，任何一方可将争议提交（中国国际经济贸易仲裁委员会）仲裁，"
        + "仲裁应依照该会当时有效的仲裁规则进行。仲裁地点在（北京），仲裁语言为（中文），"
        + "仲裁裁决是终局的，对双方均有约束力。";
    disputeVersion2:string = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
        +"如协商未能解决争议，任何一方可向具有管辖权的法院起诉。";
    //责任版本
    libVersion1:string =" 如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接损失以及因此而支出的合理费用。";
    libVersion2:string = "如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接和间接损失以及因此而支出的全部费用。";


    openHolderList:EventEmitter<string> = new EventEmitter<string>();


    ngAfterViewInit() {

    }

    constructor(public _util:UtilService,private dragulaService:DragulaService,private router:Router){

        _util.getConfinfo().subscribe((res)=>{
            this.confinfo = <CheckBox[]> res.json();
        });
        //获取保密人员列表
        _util.getConfreciever().subscribe((res)=>{
            this.confreciever = <CheckBox[]> res.json();
        });
    }

    //最终化文档
    finalizedDocument(){
        if (confirm("您确定要最终化该文档?")){
            this._util.finalFile(this.myFile.id).subscribe((res)=>{
                this.isFinal = true;
                //最终化后，需要重新刷新文档列表
                //this.refreshFileList(this.myFile.folderId);
                alert("成功最终化文档！");
            })
            return true;
        }
        else{
            return false;
        }
    }

    //修改文件
    updateFile(){
        this._util.updateFile(JSON.stringify(this.myFile)).subscribe();
    }

    close(name:string){
        this.openHolderList.emit(name);
    }

    //检查协议主体类型
    checkOrg(){
        this.modifyList = !this.modifyList;
        if(this.agreement.organizationType == '企业'){
            this.showQ1 = !this.showQ1;
        }else {
            this.showQ2 = !this.showQ2;
        }

    }

    //保密材料选择..........................
//全选
    selectAll(){
        this.confinfo.forEach((c:CheckBox)=>{
            c.flag = true;
        })
    };
    //全不选
    selectNone(){
        this.confinfo.forEach((c:CheckBox)=>{
            c.flag = false;
        })
    }

    //组装选择对象值为字符串，以分号隔开
    oToS(){
        var str:string = "";
        this.confinfo.forEach((c:CheckBox)=>{
            if(c.flag){
                str += c.value+"、";
            }

        });
        this.agreement.confDefination = str.substr(0,str.length-1); //去除最后一个顿号
        this.updateAgreement();
    }
    //保密人员选择..........................
//全选
    selectAllPerson(){
        this.confreciever.forEach((c:CheckBox)=>{
            c.flag = true;
        })
    };
    //全不选
    selectNonePerson(){
        this.confreciever.forEach((c:CheckBox)=>{
            c.flag = false;
        })
    }

    //组装选择对象值为字符串，以分号隔开
    oToSPerson(){
        var str:string = "";
        this.confreciever.forEach((c:CheckBox)=>{
            if(c.flag){
                str += c.value+"、";
            }
        });
        this.agreement.recievers = str.substr(0,str.length-1); //去除最后一个顿号
        //方案选择

        if(this.dispute){
            this.agreement.dispute = this.disputeVersion1;
        }else{
            this.agreement.dispute = this.disputeVersion2;
        }
        if(this.liability){
            this.agreement.liability = this.libVersion1;

        }else{
            this.agreement.liability = this.libVersion2;
        }
        this.updateAgreement();
    }


    //修改协议
    updateAgreement(){
        this.attrData = this._util.setAttrData(this.myFile.id,this.agreement);
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
            // alert("修改成功！");
            swal("Good job!", "修改成功！", "success");
        })
    }
    //生成文件
    createDocument(format:string){
        this._util.generateFile(""+this.myFile.id,format);

    }
}