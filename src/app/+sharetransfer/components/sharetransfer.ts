import {Component } from '@angular/core';
import {ConfidentAgreement,ConfidentTransfer,UtilService,Moudle,Doctype,DocAttr,File,Step,Steps,CheckBox,History} from "../../shared/index";
import {Router} from '@angular/router-deprecated';
import  {FORM_DIRECTIVES} from '@angular/common';
declare var jQuery:JQueryStatic;

@Component({
    selector: 'sharetransfer-box',
    providers: [UtilService],
    directives:[FORM_DIRECTIVES],
    template: require('app/+sharetransfer/components/sharetransfer.html')
})
export class ShareTransferComponent {

    //问题显示开关
    //showList:boolean = false;
    showPro:boolean = true;
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

    //问题的数据
    agreement: ConfidentAgreement = new ConfidentAgreement();
    transfer: ConfidentTransfer = new ConfidentTransfer();
    business:boolean = true; //是否是企业 / 个人
    discloseToB:boolean = true; //是否向乙方披露
    discloseToA:boolean = true; //是否向甲方披露
    aPersonName:string; //甲方自然人姓名
    bPersonName:string; //乙方自然人姓名
    aCompanyName:string; //甲方公司名称
    bCompanyName:string; //乙方公司名称
    conclusion:string; //总结信息
    aIdNo:string;
    bIdNo:string;
    //liability:boolean = true;
    //moulds:Array<Moudle> = new Array<Moudle>();
    //docType:Array<Doctype> = new Array<Doctype>();
    //differ:any;
    file:File = new File();
    //history:History[] = new Array<History>(); //获取历史信息填表
    //his:History = new History();
    //isModal:boolean = false;
    //isInfo:string = "";

    //步骤
    step1:string = 'active';
    step2:string = 'disabled';
    step3:string = 'disabled';
    //步骤组
    steps:Steps[] = new Array<Steps>();
    mySteps:Steps = new Steps();
    //组装Attr json对象
    docAttr: DocAttr = new DocAttr();
    attrData : Array<DocAttr> = new Array<DocAttr>();


    constructor(private _util:UtilService,private router:Router){
        this.file = <File>JSON.parse(sessionStorage.getItem('file'));
        this.file.docName = "股份转让协议"+_util.getSerialNo();
        //获取步骤组
        _util.getSteps().subscribe((res)=>{
            this.steps =<Steps[]> res.json();
            this.getStepsById(3);
        });


        //if(sessionStorage.getItem("nextStep1")){ //如果已经进入了第二个阶段
        //  //this.nav('./ConfidTemplate');
        //  this.showPro = false;
        //  this.showList = false;
        //  this.showQ6 = true;
        //  this.step1 = 'completed';
        //  this.step2 = 'active';
        //  this.step3 = 'disabled';
        //  this.activeStep(2,1);
        //}


    }

    //获取历史信息填表
    getHistory(value:string){
        //this._util.getHistory(this.file.userId,this.file.docType,this.file.templateId,value).subscribe((res)=>{
        //    this.history = <History[]>res.json();
        //    this.isInfo = value; //确定是显示什么样的列表
        //})
    }
    //选择记录填表
    selectRecord(hs:History){
        //if(this.isInfo == "a"){
        //    if(this.business){
        //        this.aCompanyName = hs.aName;
        //    }else{
        //        this.aPersonName = hs.aName;
        //        this.aIdNo = hs.aIdNo;
        //    }
        //}else if(this.isInfo == "b"){
        //    if(this.business){
        //        this.bCompanyName = hs.bName;
        //    }else{
        //        this.bPersonName = hs.bName;
        //        this.bIdNo = hs.bIdNo;
        //    }
        //}else if(this.isInfo == "ac"){
        //    this.agreement.aContactName = hs.aContactName;
        //    this.agreement.aContactPhone = hs.aContactPhone;
        //    this.agreement.aContactEmail = hs.aContactEmail;
        //    this.agreement.aContactFax = hs.aContactFax;
        //    this.agreement.aContactAddress = hs.aContactAddress;
        //}else if(this.isInfo == "bc"){
        //    this.agreement.bContactName = hs.bContactName;
        //    this.agreement.bContactPhone = hs.bContactPhone;
        //    this.agreement.bContactEmail = hs.bContactEmail;
        //    this.agreement.bContactFax = hs.bContactFax;
        //    this.agreement.bContactAddress = hs.bContactAddress;
        //}else if(this.isInfo == "as"){
        //    this.agreement.aSiger = hs.aSiger;
        //}else if(this.isInfo == "bs"){
        //    this.agreement.bSiger = hs.bSiger;
        //}
        //
        //this.isModal = false;


    }

//输入步骤组的id，获取步骤组
    getStepsById(id:number){
        this.steps.forEach((s)=>{
            if(s.id === id) {
                this.mySteps = s;
                return;
            }
        })
    }
    //按钮触发步骤变化
    activeStep(stepsId:number,stepId:number){
        this.getStepsById(stepsId);
        this.mySteps.data.map((ms:Step)=>{
            if(ms.stepId > stepId){
                ms.status = "disabled";
            }else if(ms.stepId < stepId){
                ms.status = "completed";
            }else{
                ms.status = "active";
            }
        })
    }

    //总结
    conclude(){

            if(this.aPersonName == null || this.bPersonName== null || this.aIdNo== null || this.bIdNo== null){
                alert("名称不能为空！");
                return;
            }
            this.transfer.aName = this.aPersonName;
            this.transfer.bName = this.bPersonName;
            this.transfer.aIdNo = this.aIdNo;
            this.transfer.bIdNo = this.bIdNo;
            this.conclusion = this.transfer.aName+"与"
                +this.transfer.bName+"签订股份转让协议。在协议规定内，相互遵守和监督彼此股份转让信息。" +
                "是否确定？"
        this.showQ5 = !this.showQ5;
        this.showQ1 = !this.showQ1;
        this.activeStep(3,3);
    }
    //下一阶段
    nextStep1(){
        this.step1 = 'completed';
        this.step2 = 'active';
        this.step3 = 'disabled';
        this.activeStep(4,1);
        if(sessionStorage.getItem("file")){
            this._util.createFile(JSON.stringify(this.file)).subscribe((res)=>{
                this.file.id = res.json();
                var documentId = this.file.id;
                var a = new DocAttr(documentId,"aName",this.transfer.aName);
                this.attrData.push(a);
                a = new DocAttr(documentId,"bName",this.transfer.bName);
                this.attrData.push(a);
                a = new DocAttr(documentId,"aIdNo",this.transfer.aIdNo);
                this.attrData.push(a);
                a = new DocAttr(documentId,"bIdNo",this.transfer.bIdNo);
                this.attrData.push(a);
                this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
                    //sessionStorage.setItem("nextStep1","token");
                    swal("Good job!", "第一步完成！", "success");
                })
                this.attrData  = new Array<DocAttr>(); //数据归零
            });
        }else{
            swal("Oops..", "请重新选择文件模板", "error");
            //alert("请重新选择文件模板");
            this.nav('./TemplateList');
        }
    }

//测试
    test(){
        alert("ok")
    }

    //组装选择对象值为字符串，以分号隔开
    oToS(){
        this.activeStep(4,2);
    }

    //组装选择对象值为字符串，以分号隔开
    oToSPerson(){
        var str:string = "";
    }

    //设置最后信息
    setAttrData(){
        sessionStorage.setItem("nextStep1","");
        this.step1 = 'completed';
        this.step2 = 'completed';
        this.step3 = 'active';
        this.activeStep(4,6);
        var documentId = this.file.id;
        var a = new DocAttr(documentId,"companyName",this.transfer.companyName);
        this.attrData.push(a);
        a = new DocAttr(documentId,"percentage",""+this.transfer.percentage);
        this.attrData.push(a);
        a = new DocAttr(documentId,"totalMoney",""+this.transfer.totalMoney);
        this.attrData.push(a);
        a = new DocAttr(documentId,"payMoney",""+this.transfer.payMoney);
        this.attrData.push(a);
        a = new DocAttr(documentId,"residueMoney",""+this.transfer.residueMoney);
        this.attrData.push(a);
        a = new DocAttr(documentId,"otherExpenses",this.transfer.otherExpenses);
        this.attrData.push(a);
        a = new DocAttr(documentId,"delayPercentage",""+this.transfer.delayPercentage);
        this.attrData.push(a);
        a = new DocAttr(documentId,"aSiger",""+this.transfer.aSiger);
        this.attrData.push(a);
        a = new DocAttr(documentId,"bSiger",""+this.transfer.bSiger);
        this.attrData.push(a);
        a = new DocAttr(documentId,"committee",""+this.transfer.committee);
        this.attrData.push(a);
    }
    //最后总结保存信息
    finalConclude(){
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
            swal("保存成功！", "第一步完成！", "success");
            this.nav("File");
        })
    };
    //最后生成文件
    createDocument(format:string){
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
            this._util.generateFile(""+this.file.id,format);
            this.nav("File");
        })
    }


    nav(name:string){
        this.router.parent.navigate([name])
    }
}


