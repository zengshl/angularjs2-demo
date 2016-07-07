import {Component,NgZone } from '@angular/core';
import {ConfidentAgreement,ConfidentTransfer,UtilService,Moudle,Doctype,DocAttr,File,Step,Steps,CheckBox,History} from "../../shared/index";
import {Router} from '@angular/router-deprecated';
import {User,UserCompany} from "../../shared/index";
import  {FORM_DIRECTIVES} from '@angular/common';
import {DimmerComponent} from "../../+template/components/dimmer.directive";
declare var jQuery:JQueryStatic;

@Component({
    selector: 'sharetransfer-box',
    providers: [UtilService],
    directives:[FORM_DIRECTIVES,DimmerComponent],
    template: require('app/+sharetransfer/components/sharetransfer.html')
})
export class ShareTransferComponent {

    //问题显示开关
    //showList:boolean = false;
    zone1: NgZone;
    zone2: NgZone;

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
    showQ11:boolean = false;

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

    file:File = new File();

    history:History[] = new Array<History>(); //获取历史信息填表
    his:History = new History();
    //步骤
    step1:string = 'active';
    step2:string = '';
    step3:string = '';
    //步骤组
    steps:Steps[] = new Array<Steps>();
    mySteps:Steps = new Steps();
    //分别控制2个进度条
    mySteps1:Steps = new Steps();
    mySteps2:Steps = new Steps();
    //组装Attr json对象
    docAttr: DocAttr = new DocAttr();
    attrData : Array<DocAttr> = new Array<DocAttr>();
    //中转变量
    midData:string = "";
    canProgressUp :boolean = true;
    canProgressDown:boolean = false;
    //用户信息
    user:User = new User();
    company:UserCompany = new UserCompany();

    hisFlag:boolean[] = [ true,false,false ]; //控制历史信息显示
    hisInfo:boolean =false;

    isModal:boolean = false;
    isInfo:string = "";

    canFileNameUp : boolean = true;

    constructor(private _util:UtilService,private router:Router){
        this.zone1 = new NgZone({ enableLongStackTrace: false });
        this.zone2 = new NgZone({ enableLongStackTrace: false });
        this.file = <File>JSON.parse(sessionStorage.getItem('file'));
        this.file.docName = "股份转让协议"+_util.getSerialNo();
        //获取步骤组
        _util.getSteps().subscribe((res)=>{
            this.steps =<Steps[]> res.json();
            this.getStepsById(3,this.mySteps1);
        });
        //获取用户信息
        _util.getUserInfoById(this.file.userId).subscribe((res)=>{
            this.user = <User>res.json().data;
            this.company = <UserCompany>res.json().company;
            if(!this.user) this.user = new User();
            if(!this.company) this.company = new UserCompany();
        });
        this.showHistory(0);
    }
    //获取历史信息填表
    getHistory(value:string){
        this._util.getHistory(this.file.userId,this.file.docType,this.file.templateId,value).subscribe((res)=>{
            this.history = <History[]>res.json();
            this.isInfo = value; //确定是显示什么样的列表
        })
    }

//输入步骤组的id，获取步骤组
    getStepsById(id:number,valStep:Steps){
        console.log(valStep);
        this.steps.forEach((s)=>{
            if(s.id === id) {
                if(id === this.mySteps.id){
                    let progress = this.mySteps.progress;
                    this.mySteps = s;
                    this.mySteps.progress = progress;
                    valStep = s;
                    valStep.progress = progress;
                }else{
                    this.mySteps = s;
                    valStep = this.s;
                }
                return;
            }
        })
    }

    //选择记录填表
    selectRecord(hs:History){
        if(this.isInfo == "a"){
            this.transfer.aName = hs.aName;
            this.transfer.aIdNo = hs.aIdNo;
        }else if(this.isInfo == "b"){
            this.transfer.bName = hs.bName
            this.transfer.bIdNo = hs.bIdNo
        }else if(this.isInfo == "as"){
            this.transfer.aSiger = hs.aSiger;
        }else if(this.isInfo == "bs"){
            this.transfer.bSiger = hs.bSiger;
        }else if(this.isInfo == "cn"){
            this.transfer.companyName = hs.transferCompany;
        }
        this.isModal = false;
    }
    //按钮触发步骤变化
    activeStep(stepsId:number,stepId:number,valStep:Steps){
        console.log('valStep='+valStep);
        this.getStepsById(stepsId,valStep);
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
            this.conclusion = this.transfer.aName+"与"
                +this.transfer.bName+"签订股份转让协议。在协议规定内，相互遵守和监督彼此股份转让信息。" +
                "是否确定？"
            this.showQ5 = !this.showQ5;
            this.showQ1 = !this.showQ1;
            if(this.canFileNameUp) {
                this.zone1.run(() => {
                    if (this.mySteps1.progress > 80) {
                        this.mySteps1.progress = 100;
                    } else {
                        this.mySteps1.progress += 20;
                    }
                });
                this.canFileNameUp = false;
            }
        this.activeStep(3,3,this.mySteps1);
    }
    //下一阶段
    nextStep1(){
        this.showQ5 = !this.showQ5;
        this.showQ6 = !this.showQ6;
        this.step1 = '';
        this.step2 = 'active';
        this.step3 = '';
        this.activeStep(4,1,this.mySteps2);
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
                    //swal({
                    //    title: "Good job!",
                    //    text: "第一步完成！",
                    //    type: "success",
                    //    showCancelButton: true,
                    //    confirmButtonColor: "#DD6B55",
                    //    confirmButtonText: "继续!",
                    //    closeOnConfirm: true
                    //}, function(isConfirm){
                    //    if (isConfirm) {
                    //        swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    //    } else {
                    //        swal("Cancelled", "Your imaginary file is safe :)", "error");
                    //    }
                    //});
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
        swal("ok！", "", "success");
    }

    //组装选择对象值为字符串，以分号隔开
    oToS(){
        this.activeStep(4,2,this.mySteps2);
    }

    //组装选择对象值为字符串，以分号隔开
    oToSPerson(){
        var str:string = "";
    }

    //设置最后信息
    setAttrData(){
        sessionStorage.setItem("nextStep1","");
        this.step1 = '';
        this.step2 = '';
        this.step3 = 'active';
        this.activeStep(4,6,this.mySteps2);
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
        if(this.fillAll() == ""){
            this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
                swal("保存成功！", "第一步完成！", "success");
                this.nav("File");
            })
        }else{
            swal(this.fillAll()+"未填写完整","","error");
        }
    };
    //最后生成文件
    createDocument(format:string){
        if(this.fillAll() == ""){
            this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
                this._util.generateFile(""+this.file.id,format);
                this.nav("File");
            })
        }else{
            swal(this.fillAll()+"未填写完整","","error");
        }
    }


    nav(name:string){
        this.router.parent.navigate([name])
    }

    //设置值
    setValue(value:string){
        console.log(this.midData);
        if(this.midData == 'aName') this.transfer.aName = value;
        if(this.midData == 'aIdNo') this.transfer.aIdNo = value;
        if(this.midData == 'bName') this.transfer.bName = value;
        if(this.midData == 'bIdNo') this.transfer.bIdNo = value;
        if(this.midData == 'agreement.bSiger') this.agreement.aSiger = value;
        if(this.midData == 'agreement.bSiger') this.agreement.bSiger = value;
        this.midData = '';
    }
    //获取值
    getValue(a:any){
        this.midData = a;
    }
    //显示历史
    showHistory(index:number){
        this.hisFlag = [];
        if(index!=-1) this.hisFlag[index]= true;
    }
    hideHistory(index:number){
        if(index!=-1) this.hisFlag[index]= false;
    }

    //输入框失去焦点时，改变进度条
    progerssUp(name:string){
        console.log(name);
        if(name == 'aName'){
            this.progressUpPercent(this.zone1,this.mySteps1,this.transfer.aName,20,0);
        }
        if(name == 'aIdNo'){
            this.progressUpPercent(this.zone1,this.mySteps1,this.transfer.aIdNo,20,0);
        }
        if(name == 'bName'){
            this.progressUpPercent(this.zone1,this.mySteps1,this.transfer.bName,20,0);
        }
        if(name == 'bIdNo'){
            this.progressUpPercent(this.zone1,this.mySteps1,this.transfer.bIdNo,20,0);
        }
        if(name == 'docName'){
            this.progressUpPercent(this.zone1,this.mySteps1,this.file.docName,20,0);
        }
        if(name == 'percentage'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.percentage,11,1);
        }
        if(name == 'totalMoney'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.totalMoney,11,1);
        }
        if(name == 'payMoney'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.payMoney,11,1);
        }
        if(name == 'residueMoney'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.residueMoney,11,1);
        }
        if(name == 'delayPercentage'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.delayPercentage,11,1);
        }
        if(name == 'committee'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.committee,11,1);
        }
        if(name == 'companyName'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.companyName,11,1);
        }
        if(name == 'aSiger'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.aSiger,11,1);
        }
        if(name == 'bSiger'){
            this.progressUpPercent(this.zone2,this.mySteps2,this.transfer.bSiger,11,1);
        }
    }

    //输入框获得焦点时，判断输入框是否已经填写过
    focusValue(name:any,target:any){

        //判断值是否能转成int
        if(isNaN(parseInt(target.value))){
            //不能转成int，判断是否为空字符串
            if(target.value == ''){
                this.canProgressUp = true;
                this.canProgressDown = false;
            }else{
                this.canProgressUp = false;
                this.canProgressDown = true;
            }
        }else{
            //能转成int，判断是否为0
            if(parseInt(target.value) == 0){
                this.canProgressUp = true;
                this.canProgressDown = false;
            }else{
                this.canProgressUp = false;
                this.canProgressDown = true;
            }
        }

    }

    //进度条增长控制
    progressUpPercent(zone:ngZone,mySteps:Steps,value:string,percent:number,extra:number){
        console.log(zone+","+value+","+percent+","+extra)
        if(value != ''){
            if(this.canProgressUp){
                zone.run(() => {
                    if(mySteps.progress >=  (100 - percent - extra)){
                        mySteps.progress = 100;
                    }else{
                        mySteps.progress += percent;
                    }
                });
            }
        }else{
            if(this.canProgressDown) {
                zone.run(() => {
                    if (mySteps.progress <= (0 + percent + extra)) {
                        mySteps.progress = 0;
                    } else {
                        mySteps.progress -= percent;
                    }
                });
            }
        }
    }

    actionTo(name:string){
        console.log(name);
        if(name == 'showQ1'){
            this.activeStep(3,2,this.mySteps1);
        }else if(name == 'showPro'){
            this.activeStep(3,1,this.mySteps1);
        }else if(name == 'showQ5'){
            this.activeStep(3,2,this.mySteps1);
        }else if(name == 'showQ7'){
            this.activeStep(4,3,this.mySteps2);
        }else if(name == 'showQ6'){
            this.activeStep(4,2,this.mySteps2);
        }else if(name == 'showQ8'){
            this.activeStep(4,1,this.mySteps2);
        }else if(name == 'showQ9'){
            this.activeStep(4,4,this.mySteps2);
        }else if(name == 'showQ10'){
            this.activeStep(4,5,this.mySteps2);
        }
    }


    //场景切换
    stepClick(step:string){
        this.closeAll();
        if(step == 'step1'){
            this.step1 = "active";
            this.step2 = "";
            this.step3 = "";
            //判断第一个场景未填写的信息
            if(this.transfer.aName == '' || this.transfer.aIdNo == '' || this.transfer.bName == '' || this.transfer.bIdNo == ''){
                this.showQ1 = true;
                this.activeStep(3,2,this.mySteps1);
            }else if(this.file.docName == '' || parseInt(this.transfer.percentage) == 0){
                this.showQ5 = true;
                this.activeStep(3,3,this.mySteps1);
            }else{
                this.showQ1 = true;
                this.activeStep(3,2,this.mySteps1);
            }
        }else if(step == 'step2'){
            this.step1 = "";
            this.step2 = "active";
            this.step3 = "";
            //判断第二个场景为填写的信息
            if(this.transfer.companyName == '' || parseInt(this.transfer.percentage) == 0 ){
                this.showQ6 = true;
                this.activeStep(4,1,this.mySteps2);
            }else if(parseInt(this.transfer.totalMoney) == 0 || parseInt(this.transfer.payMoney) == 0 || parseInt(this.transfer.residueMoney) == 0 ){
                this.showQ7 = true;
                this.activeStep(4,2,this.mySteps2);
            }else if(parseInt(this.transfer.delayPercentage) == 0 || this.transfer.committee == ''){
                this.showQ9 = true;
                this.activeStep(4,4,this.mySteps2);
            }else if(this.transfer.aSiger == '' || this.transfer.bSiger == '' ){
                this.showQ10 = true;
                this.activeStep(4,5,this.mySteps2);
            }else{
                this.showQ6 = true;
                this.activeStep(4,1,this.mySteps2);
            }
        }else{
            this.step1 = "";
            this.step2 = "";
            this.step3 = "active";
            this.showQ11 = true;
        }
    }

    closeAll(){
        this.showPro = false;
        this.showQ1 = false;
        this.showQ2 = false;
        this.showQ3 = false;
        this.showQ4 = false;
        this.showQ41 = false;
        this.showQ5 = false;
        this.showQ6 = false;
        this.showQ7 = false;
        this.showQ8 = false;
        this. showQ9 = false;
        this.showQ10 = false;
        this.showQ11 = false;
    }

    //检验每个字段是否已经都填写
    fillAll(){
        let result = '';
        if(this.transfer.aName == ''){
            result = '甲方姓名';
        }else if(this.transfer.aIdNo == ''){
            result = '甲方身份证号/护照号';
        }else if(this.transfer.bName == ''){
            result = '乙方姓名';
        }else if(this.transfer.bIdNo == ''){
            result = '乙方身份证号/护照号';
        }else if(this.file.docName == ''){
            result = '股份转让协议名称';
        }else if(this.transfer.companyName == ''){
            result = '公司名称';
        }else if(parseInt(this.transfer.percentage) == 0){
            result = '股权占比';
        }else if(parseInt(this.transfer.totalMoney) == 0){
            result = '转让价格';
        }else if(parseInt(this.transfer.payMoney) == 0 ){
            result = '首付金额';
        }else if(parseInt(this.transfer.residueMoney) == 0 ){
            result = '剩余金额';
        }else if(this.transfer.otherExpenses == ''){
            result = '有关费用的负担';
        }else if(parseInt(this.transfer.delayPercentage) == 0 ){
            result = '违约责任';
        }else if(this.transfer.committee == ''){
            result = '争议解决条款';
        }else if(this.transfer.aSiger == ''){
            result = '转让方名字';
        }else if(this.transfer.bSiger == ''){
            result = '受让方名字';
        }
        return result;
    }
}


