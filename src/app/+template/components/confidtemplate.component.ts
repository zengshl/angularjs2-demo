import {Component,NgZone } from '@angular/core';
import {ConfidentAgreement,UtilService,Moudle,Doctype,DocAttr,File,Step,Steps,CheckBox,History} from "../../shared/index";
import {Router} from '@angular/router-deprecated';
import  {FORM_DIRECTIVES} from '@angular/common';
import {DimmerComponent} from "./dimmer.directive";
import {User,UserCompany} from "../../shared/index";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'confidtemplate-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES,DimmerComponent],
  styles: [ require('app/+template/components/confidtemplate.component.css') ],
  template: require('app/+template/components/confidtemplate.component.html')
})
export class ConfidTemplateComponent {

  //问题显示开关
  showList:boolean = false;
  showPro:boolean = true;
  showQ1:boolean = false;
  showQ2:boolean = false;
  showQ3:boolean = false;
  showQ4:boolean = false;
  showQ5:boolean = false;
  showQ6:boolean = false;
  showQ7:boolean = false;
  showQ8:boolean = false;
  showQ9:boolean = false;
  showQ10:boolean = false;
  showQ11:boolean = false;

  //问题的数据
  agreement: ConfidentAgreement = new ConfidentAgreement();
  business:boolean = true; //是否是企业 / 个人
  discloseToB:boolean = true; //是否向乙方披露
  discloseToA:boolean = true; //是否向甲方披露
  aPersonName:string = ''; //甲方自然人姓名
  bPersonName:string = ''; //乙方自然人姓名
  aCompanyName:string = ''; //甲方公司名称
  bCompanyName:string = ''; //乙方公司名称
  conclusion:string = ''; //总结信息
  aIdNo:string = '';
  bIdNo:string = '';
  confinfo:CheckBox[]; //保密信息列表
  confreciever:CheckBox[]; //保密人员列表
  dispute:boolean = true; //争议版本切换
  liability:boolean = true;
  moulds:Array<Moudle> = new Array<Moudle>();
  docType:Array<Doctype> = new Array<Doctype>();
  differ:any;
  file:File = new File();
  history:History[] = new Array<History>(); //获取历史信息填表
  his:History = new History();
  hisFlag:boolean[] = [ true,false,false ]; //控制历史信息显示
  hisInfo:boolean =false;

  isModal:boolean = false;
  isInfo:string = "";

  //步骤
  step1:string = 'active';
  step2:string = '';
  step3:string = '';
  //步骤组
  steps:Steps[] = new Array<Steps>();
  mySteps:Steps = new Steps();
  //组装Attr json对象
  docAttr: DocAttr = new DocAttr();
  attrData : Array<DocAttr> = new Array<DocAttr>();

  //进度条
  //分别控制2个进度条
  mySteps1:Steps = new Steps();
  mySteps2:Steps = new Steps();
  zone1: NgZone;
  zone2: NgZone;
  canProgressUp :boolean = true;
  canProgressDown:boolean = false;
  onPerson : boolean = false;
  onBussiness : boolean = true;
  canFileNameUp : boolean = true;

  //争议的版本
  disputeVersion1:string = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
      + "如协商未能解决争议，任何一方可将争议提交（中国国际经济贸易仲裁委员会）仲裁，"
      + "仲裁应依照该会当时有效的仲裁规则进行。仲裁地点在（北京），仲裁语言为（中文），"
      + "仲裁裁决是终局的，对双方均有约束力。";
  disputeVersion2:string = "甲、乙双方因理解、执行本协议或与本协议有关的任何性质的争议，应首先尽最大努力以友好协商的方式解决。"
      +"如协商未能解决争议，任何一方可向具有管辖权的法院起诉。";
  //责任版本
  libVersion1:string =" 如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接损失以及因此而支出的合理费用。";
  libVersion2:string = "如因接收方违反本协议项下义务披露保密信息对披露方造成损失，接收方应赔偿披露方的全部直接和间接损失以及因此而支出的全部费用。";

  //中转变量
  midData:any;

  //用户信息
  user:User = new User();
  company:UserCompany = new UserCompany();


  constructor(private _util:UtilService,private router:Router){
    this.zone1 = new NgZone({ enableLongStackTrace: false });
    this.zone2 = new NgZone({ enableLongStackTrace: false });

    this.file = <File>JSON.parse(sessionStorage.getItem('file'));
    this.file.docName = "保密协议"+_util.getSerialNo();
    //获取用户信息
    _util.getUserInfoById(this.file.userId).subscribe((res)=>{
      this.user = <User>res.json().data;
      this.company = <UserCompany>res.json().company;
      //console.log(this.user,this.company);
      if(!this.user) this.user = new User();
      if(!this.company) this.company = new UserCompany();
    })
    //获取保密信息定义列表
    _util.getConfinfo().subscribe((res)=>{
      this.confinfo = <CheckBox[]> res.json();
    });
    //获取保密人员列表
    _util.getConfreciever().subscribe((res)=>{
      this.confreciever = <CheckBox[]> res.json();
    });


    //....................................................
    //获取步骤组
    _util.getSteps().subscribe((res)=>{
      this.steps =<Steps[]> res.json();
      //console.log(this.steps);
      this.getStepsById(1,this.mySteps1);
    });

    //if(sessionStorage.getItem("nextStep1")){ //如果已经进入了第二个阶段
    //  //this.nav('./ConfidTemplate');
    //  this.showPro = false;
    //  this.showList = false;
    //  this.showQ6 = true;
    //  this.step1 = '';
    //  this.step2 = 'active';
    //  this.step3 = '';
    //  this.activeStep(2,1,this.mySteps2);
    //}


  }

  //设置值
  setValue(value:string){
    if(this.midData == 'aCompanyName'){    this.aCompanyName = value;    this.progerssUp('aCompanyName');}
    if(this.midData == 'bCompanyName'){    this.bCompanyName = value;    this.progerssUp('bCompanyName'); }
    if(this.midData == 'aPersonName') {    this.aPersonName = value;    this.progerssUp('aPersonName');}
    if(this.midData == 'aIdNo') {    this.aIdNo = value;    this.progerssUp('aIdNo');}
    if(this.midData == 'bPersonName'){    this.bPersonName = value;    this.progerssUp('bPersonName');}
    if(this.midData == 'bIdNo'){    this.bIdNo = value;    this.progerssUp('bIdNo');}
    if(this.midData == 'agreement.aContactName'){    this.agreement.aContactName = value;    this.progerssUp('aContactName');}
    if(this.midData == 'agreement.bContactName'){    this.agreement.bContactName = value;    this.progerssUp('bContactName');}
    if(this.midData == 'agreement.aContactPhone'){    this.agreement.aContactPhone = value;    this.progerssUp('aContactPhone');}
    if(this.midData == 'agreement.bContactPhone'){    this.agreement.bContactPhone = value;    this.progerssUp('bContactPhone');}
    if(this.midData == 'agreement.aContactEmail'){    this.agreement.aContactEmail = value;    this.progerssUp('aContactEmail');}
    if(this.midData == 'agreement.bContactEmail'){    this.agreement.bContactEmail = value;    this.progerssUp('bContactEmail');}
    if(this.midData == 'agreement.aContactFax'){    this.agreement.aContactFax = value;    this.progerssUp('aContactFax');}
    if(this.midData == 'agreement.bContactFax') {    this.agreement.bContactFax = value;    this.progerssUp('bContactFax');}
    if(this.midData == 'agreement.aContactAddress'){    this.agreement.aContactAddress = value;    this.progerssUp('aContactAddress');}
    if(this.midData == 'agreement.bContactAddress'){    this.agreement.bContactAddress = value;    this.progerssUp('bContactAddress');}
    if(this.midData == 'agreement.aSiger') {    this.agreement.aSiger = value;    this.progerssUp('aSiger');}
    if(this.midData == 'agreement.bSiger') {    this.agreement.bSiger = value;    this.progerssUp('bSiger');}
  }
  //获取值
  getValue(a:any){
    this.midData = a;
  }


//显示历史
//  showHistory(index:number){
//    this.hisFlag = [];
//    if(index!=-1) this.hisFlag[index]= true;
//  }

  //获取历史信息填表
  getHistory(value:string){
    this._util.getHistory(this.file.userId,this.file.docType,this.file.templateId,value).subscribe((res)=>{
      this.history = <History[]>res.json();
      this.isInfo = value; //确定是显示什么样的列表
    })
  }
  //选择记录填表
  selectRecord(hs:History){
    if(this.isInfo == "a"){
      if(this.business){
        this.historyValue(this.aCompanyName);
        this.aCompanyName = hs.aName;
        this.progerssUp('aCompanyName');
      }else{
        this.historyValue(this.aPersonName);
        this.aPersonName = hs.aName;
        this.progerssUp('aPersonName');
        this.historyValue(this.aIdNo);
        this.aIdNo = hs.aIdNo;
        this.progerssUp('aIdNo');
      }
    }else if(this.isInfo == "b"){
      if(this.business){
        this.historyValue(this.bCompanyName);
        this.bCompanyName = hs.bName;
        this.progerssUp('bCompanyName');
      }else{
        this.historyValue(this.bPersonName);
        this.bPersonName = hs.bName;
        this.progerssUp('bPersonName');
        this.historyValue(this.bIdNo);
        this.bIdNo = hs.bIdNo;
        this.progerssUp('bIdNo');
      }
    }else if(this.isInfo == "ac"){
      this.historyValue(this.agreement.aContactName);
      this.agreement.aContactName = hs.aContactName;
      this.progerssUp('aContactName');
      this.historyValue(this.agreement.aContactPhone);
      this.agreement.aContactPhone = hs.aContactPhone;
      this.progerssUp('aContactPhone');
      this.historyValue(this.agreement.aContactEmail);
      this.agreement.aContactEmail = hs.aContactEmail;
      this.progerssUp('aContactEmail');
      this.historyValue(this.agreement.aContactFax);
      this.agreement.aContactFax = hs.aContactFax;
      this.progerssUp('aContactFax');
      this.historyValue(this.agreement.aContactAddress);
      this.agreement.aContactAddress = hs.aContactAddress;
      this.progerssUp('aContactAddress');
    }else if(this.isInfo == "bc"){
      this.historyValue(this.agreement.bContactName);
      this.agreement.bContactName = hs.bContactName;
      this.progerssUp('bContactName');
      this.historyValue(this.agreement.bContactPhone);
      this.agreement.bContactPhone = hs.bContactPhone;
      this.progerssUp('bContactPhone');
      this.historyValue(this.agreement.bContactEmail);
      this.agreement.bContactEmail = hs.bContactEmail;
      this.progerssUp('bContactEmail');
      this.historyValue(this.agreement.bContactFax);
      this.agreement.bContactFax = hs.bContactFax;
      this.progerssUp('bContactFax');
      this.historyValue(this.agreement.bContactAddress);
      this.agreement.bContactAddress = hs.bContactAddress;
      this.progerssUp('bContactAddress');
    }else if(this.isInfo == "as"){
      this.historyValue(this.agreement.aSiger);
      this.agreement.aSiger = hs.aSiger;
      this.progerssUp('aSiger');
    }else if(this.isInfo == "bs"){
      this.historyValue(this.agreement.bSiger);
      this.agreement.bSiger = hs.bSiger;
      this.progerssUp('bSiger');
    }

    this.isModal = false;


  }

//输入步骤组的id，获取步骤组
  getStepsById(id:number,valStep:Steps){
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
  //按钮触发步骤变化
  activeStep(stepsId:number,stepId:number,valStep:Steps){
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
    if(this.business){  //确定个人还是企业
      this.agreement.aName = this.aCompanyName;
      this.agreement.bName = this.bCompanyName;
      this.agreement.organizationType = "企业";
    }else{
      this.agreement.aName = this.aPersonName;
      this.agreement.bName = this.bPersonName;
      this.agreement.organizationType = "自然人";
      this.agreement.aIdNo = this.aIdNo;
      this.agreement.bIdNo = this.bIdNo;
    }
    this.showQ5 = !this.showQ5;
    this.showQ1 = !this.showQ1;
    if(this.canFileNameUp){
      this.zone1.run(() => {
        if(this.mySteps1.progress >  80){
          this. mySteps1.progress = 100;
        }else{
          this. mySteps1.progress += 20;
        }
      });
      this.canFileNameUp = false;
    }
    this.activeStep(1,3,this.mySteps1);

    if(this.discloseToA && this.discloseToB){
      this.conclusion = this.agreement.aName+"与"
          +this.agreement.bName+"签订保密协议。在协议规定内，相互披露和接收彼此商业信息。" +
          "是否确定？"
    }else if(this.discloseToB){
      this.conclusion = this.agreement.aName+"与"+this.agreement.bName+"签订保密协议。" +
          "在协议规定内，"+this.agreement.aName+"应当向"+this.agreement.bName+"披露本"+this.agreement.organizationType+"的商业信息。" +"是否确定？"
    }else if(this.discloseToA){
      this.conclusion = this.agreement.aName+"与"+this.agreement.bName+"签订保密协议。" +"在协议规定内，"+this.agreement.aName+"可以获取"
          +this.agreement.bName+"披露给本"+this.agreement.organizationType+"的商业信息。" +"是否确定？"
    }else{
      swal(this.agreement.organizationType+"至少是披露方或者接收方，请重新填写问题答案。", "", "error");
      this.showQ1 = !this.showQ1;
      this.showPro = !this.showPro;
      this.activeStep(1,1,this.mySteps1);

    }


  }
  //下一阶段
  nextStep1(){
    this.step1 = '';
    this.step2 = 'active';
    this.step3 = '';
    this.activeStep(2,1,this.mySteps2);
    if(sessionStorage.getItem("file")){
      this._util.createFile(JSON.stringify(this.file)).subscribe((res)=>{
        this.file.id = res.json();
        var documentId = this.file.id;
        var a = new DocAttr(documentId,"aName",this.agreement.aName);
        this.attrData.push(a);
        a = new DocAttr(documentId,"bName",this.agreement.bName);
        this.attrData.push(a);
        a = new DocAttr(documentId,"organizationType",this.agreement.organizationType);
        this.attrData.push(a);
        a = new DocAttr(documentId,"aIdNo",this.agreement.aIdNo);
        this.attrData.push(a);
        a = new DocAttr(documentId,"bIdNo",this.agreement.bIdNo);
        this.attrData.push(a);
        this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
          //sessionStorage.setItem("nextStep1","token");
          //swal("Good job!", "第一步完成！", "success");
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
    //console.log(a,c);
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
    this.activeStep(2,2,this.mySteps2);
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
    console.log(this.agreement.recievers);
  }

  //设置最后信息
  setAttrData(){
    sessionStorage.setItem("nextStep1","");
    this.step1 = '';
    this.step2 = '';
    this.step3 = 'active';
    this.activeStep(2,6,this.mySteps2);
    var documentId = this.file.id;
    var a = new DocAttr(documentId,"projectName",this.agreement.projectName);
    this.attrData.push(a);
    a = new DocAttr(documentId,"confDefination",this.agreement.confDefination);
    this.attrData.push(a);
    a = new DocAttr(documentId,"contractPeriod",""+this.agreement.contractPeriod);
    this.attrData.push(a);
    a = new DocAttr(documentId,"secrecy",""+this.agreement.secrecy);
    this.attrData.push(a);
    a = new DocAttr(documentId,"aContactName",this.agreement.aContactName);
    this.attrData.push(a);
    a = new DocAttr(documentId,"bContactName",this.agreement.bContactName);
    this.attrData.push(a);
    a = new DocAttr(documentId,"aContactPhone",""+this.agreement.aContactPhone);
    this.attrData.push(a);
    a = new DocAttr(documentId,"bContactPhone",""+this.agreement.bContactPhone);
    this.attrData.push(a);
    a = new DocAttr(documentId,"aContactEmail",this.agreement.aContactEmail);
    this.attrData.push(a);
    a = new DocAttr(documentId,"bContactEmail",""+this.agreement.bContactEmail);
    this.attrData.push(a);
    a = new DocAttr(documentId,"aContactFax",""+this.agreement.aContactFax);
    this.attrData.push(a);
    a = new DocAttr(documentId,"bContactFax",this.agreement.bContactFax);
    this.attrData.push(a);
    a = new DocAttr(documentId,"aContactAddress",this.agreement.aContactAddress);
    this.attrData.push(a);
    a = new DocAttr(documentId,"bContactAddress",""+this.agreement.bContactAddress);
    this.attrData.push(a);
    a = new DocAttr(documentId,"recievers",""+this.agreement.recievers);
    this.attrData.push(a);
    a = new DocAttr(documentId,"dispute",""+this.agreement.dispute);
    this.attrData.push(a);
    a = new DocAttr(documentId,"liability",""+this.agreement.liability);
    this.attrData.push(a);
    a = new DocAttr(documentId,"aSiger",this.agreement.aSiger);
    this.attrData.push(a);
    a = new DocAttr(documentId,"bSiger",""+this.agreement.bSiger);
    this.attrData.push(a);
  }
  //最后总结保存信息
  finalConclude(){
    this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=>{
      swal("保存成功！", "", "success");
      this.nav("File");
    })
  };
  //最后生成文件
  createDocument(format:string){
    if(this.fillAll() == "") {
      this._util.createDocAttr(JSON.stringify(this.attrData)).subscribe(()=> {
        this._util.generateFile("" + this.file.id, format);
        this.nav("File");
      })
    }else{
      swal(this.fillAll()+"未填写完整","","error");
    }

  }


  nav(name:string){
    this.router.parent.navigate([name])
    //console.log(name);
  }

  //add by wss 2016.07.07

  actionTo(name:string){
    if(name == 'showPro'){
      this.activeStep(1,1,this.mySteps1)
    }if(name == 'showQ1'){
      this.activeStep(1,2,this.mySteps1);
    }else if(name == 'showQ6'){
      this.activeStep(2,1,this.mySteps2);
    }else if(name == 'showQ7'){
      this.activeStep(2,2,this.mySteps2);
    }else if(name == 'showQ8'){
      this.activeStep(2,3,this.mySteps2);
    }else if(name == 'showQ9'){
      this.activeStep(2,4,this.mySteps2);
    }else if(name == 'showQ10'){
      this.activeStep(2,5,this.mySteps2);
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
      if(this.agreement.aName == '' || this.agreement.aIdNo == '' || this.agreement.bName == '' || this.agreement.bIdNo == ''){
        this.showQ1 = true;
        this.activeStep(1,2,this.mySteps1);
      }else if(this.file.docName == '' ){
        this.showQ5 = true;
        this.activeStep(1,3,this.mySteps1);
      }else{
        this.showQ1 = true;
        this.activeStep(1,2,this.mySteps1);
      }
    }else if(step == 'step2'){
      this.step1 = "";
      this.step2 = "active";
      this.step3 = "";
      //判断第二个场景为填写的信息
      if(this.agreement.projectName == '' ){
        this.showQ6 = true;
        this.activeStep(2,1,this.mySteps2);
      }else if(parseInt(this.agreement.contractPeriod) == 0 || parseInt(this.agreement.secrecy) == 0 ){
        this.showQ7 = true;
        this.activeStep(2,2,this.mySteps2);
      }else if(this.agreement.aContactName == ''|| this.agreement.bContactName == '' || this.agreement.aContactPhone == ''
          || this.agreement.bContactPhone == ''|| this.agreement.aContactEmail ==  '' || this.agreement.bContactEmail == ''
          || this.agreement.aContactFax == '' || this.agreement.bContactFax == '' || this.agreement.aContactAddress == ''
          || this.agreement.bContactAddress == ''){
        this.showQ8 = true;
        this.activeStep(2,3,this.mySteps2);
      }else if(this.agreement.aSiger == '' || this.agreement.bSiger == '' ){
        this.showQ10 = true;
        this.activeStep(2,5,this.mySteps2);
      }else{
        this.showQ6 = true;
        this.activeStep(2,1,this.mySteps2);
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

  //进度条增长控制
  progressUpPercent(zone:ngZone,mySteps:Steps,value:string,percent:number,extra:number){
    console.log('value'+value + this.canProgressUp+this.canProgressDown);
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
  //输入框获得焦点时，判断输入框是否已经填写过
  focusValue(name:any,target:any){
    console.log(target.value);
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

  //输入框获得焦点时，判断输入框是否已经填写过
  historyValue(value:any){
    //判断值是否能转成int
    if(isNaN(parseInt(value))){
      //不能转成int，判断是否为空字符串
      if(value == ''){
        this.canProgressUp = true;
        this.canProgressDown = false;
      }else{
        this.canProgressUp = false;
        this.canProgressDown = true;
      }
    }else{
      //能转成int，判断是否为0
      if(parseInt(value) == 0){
        this.canProgressUp = true;
        this.canProgressDown = false;
      }else{
        this.canProgressUp = false;
        this.canProgressDown = true;
      }
    }

  }

  //输入框失去焦点时，改变进度条
  progerssUp(name:string){
    console.log(name);
    if(name == 'aPersonName'){
      this.progressUpPercent(this.zone1,this.mySteps1,this.aPersonName,20,0);
    }
    if(name == 'aIdNo'){
      this.progressUpPercent(this.zone1,this.mySteps1,this.aIdNo,20,0);
    }
    if(name == 'bPersonName'){
      this.progressUpPercent(this.zone1,this.mySteps1,this.bPersonName,20,0);
    }
    if(name == 'bIdNo'){
      this.progressUpPercent(this.zone1,this.mySteps1,this.bIdNo,20,0);
    }
    if(name == 'docName'){
      this.progressUpPercent(this.zone1,this.mySteps1,this.file.docName,20,0);
    }
    if(name == 'aCompanyName'){
      console.log(this.aCompanyName);
      this.progressUpPercent(this.zone1,this.mySteps1,this.aCompanyName,40,0);
    }
    if(name == 'bCompanyName'){
      this.progressUpPercent(this.zone1,this.mySteps1,this.bCompanyName,40,0);
    }
    if(name == 'projectName'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.projectName,7,-5);
    }
    if(name == 'contractPeriod'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.contractPeriod,7,-5);
    }
    if(name == 'secrecy'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.secrecy,7,-5);
    }
    if(name == 'aContactName'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.aContactName,7,-5);
    }
    if(name == 'bContactName'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.bContactName,7,-5);
    }
    if(name == 'aContactPhone'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.aContactPhone,7,-5);
    }
    if(name == 'bContactPhone'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.bContactPhone,7,-5);
    }
    if(name == 'aContactEmail'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.aContactEmail,7,-5);
    }
    if(name == 'bContactEmail'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.bContactEmail,7,-5);
    }
    if(name == 'aContactFax'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.aContactFax,7,-5);
    }
    if(name == 'bContactFax'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.bContactFax,7,-5);
    }
    if(name == 'aContactAddress'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.aContactFax,7,-5);
    }
    if(name == 'bContactAddress'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.bContactFax,7,-5);
    }

    //////////////////////////////////////////////////////////////////////////
    if(name == 'aSiger'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.aSiger,7,-5);
    }
    if(name == 'bSiger'){
      this.progressUpPercent(this.zone2,this.mySteps2,this.agreement.bSiger,7,-5);
    }
  }

  //公司和个人的切换
  isBussiness(isBussiness:string){
    if(isBussiness == 'true'){
      if(this.onPerson) {
        if (this.aPersonName != '') {
          this.bussinessChangeProgress(false, this.zone1, this.mySteps1, '', 20, 0);
        }
        if (this.aIdNo != '') {
          this.bussinessChangeProgress(false, this.zone1, this.mySteps1, '', 20, 0);
        }
        if (this.bPersonName != '') {
          this.bussinessChangeProgress(false, this.zone1, this.mySteps1, '', 20, 0);
        }
        if (this.bIdNo != '') {
          this.bussinessChangeProgress(false, this.zone1, this.mySteps1, '', 20, 0);
        }
        if (this.aCompanyName != '') {
          this.bussinessChangeProgress(true, this.zone1, this.mySteps1, this.aCompanyName, 40, 0);
        }
        if (this.bCompanyName != '') {
          this.bussinessChangeProgress(true, this.zone1, this.mySteps1, this.bCompanyName, 40, 0);
        }
        this.onPerson = false;
        this.onBussiness = true;
      }
    }else{
      if( this.onBussiness){
        if (this.aCompanyName != '') {
          this.bussinessChangeProgress(false, this.zone1, this.mySteps1, '', 40, 0);
        }
        if (this.bCompanyName != '') {
          this.bussinessChangeProgress(false, this.zone1, this.mySteps1, '', 40, 0);
        }
        if (this.aPersonName != '') {
          this.bussinessChangeProgress(true, this.zone1, this.mySteps1, this.aPersonName, 20, 0);
        }
        if (this.aIdNo != '') {
          this.bussinessChangeProgress(true, this.zone1, this.mySteps1, this.aIdNo, 20, 0);
        }
        if (this.bPersonName != '') {
          this.bussinessChangeProgress(true, this.zone1, this.mySteps1, this.bPersonName, 20, 0);
        }
        if (this.bIdNo != '') {
          this.bussinessChangeProgress(true, this.zone1, this.mySteps1, this.bIdNo, 20, 0);
        }
        this.onPerson = true;
        this.onBussiness = false;
      }
    }
  }

  bussinessChangeProgress(progressUp:boolean,zone:ngZone,mySteps:Steps,value:string,percent:number,extra:number){
    if(progressUp){
      this.canProgressUp = true;
      this.canProgressDown = false;
      this.progressUpPercent(zone,mySteps,value,percent,extra);
    }else{
      this.canProgressUp = false;
      this.canProgressDown = true;
      this.progressUpPercent(zone,mySteps,value,percent,extra);
    }
  }

  fillAll(){
    let result = '';
    if(this.business){
      if(this.agreement.aName == ''){
        result = '甲方公司名称';
      }else if(this.agreement.bName == ''){
        result = '乙方公司名称';
      }else{
        result = this.otherAll();
      }
    }else{
      if(this.agreement.aName == ''){
        result = '甲方姓名';
      }else if(this.agreement.aIdNo == ''){
        result = '甲方身份证号/护照号';
      }else if(this.agreement.bName == ''){
        result = '乙方姓名';
      }else if(this.agreement.bIdNo == ''){
        result = '乙方身份证号/护照号';
      }else{
        result = this.otherAll();
      }
    }
    return result;
  }

  otherAll(){
    let result = '';
    if(this.file.docName == ''){
      result = '保密协议名称';
    }else if(this.agreement.projectName == ''){
      result = '项目名称';
    }else if(parseInt(this.agreement.contractPeriod) == 0){
      result = '有效期';
    }else if(parseInt(this.agreement.secrecy) == 0){
      result = '保密期限';
    }else if(this.agreement.aContactName == '' ){
      result = '甲方指定联系人姓名';
    }else if(this.agreement.bContactName == '' ){
      result = '乙方指定联系人姓名';
    }else if(this.agreement.aContactPhone == ''){
      result = '甲方指定联系人手机号';
    }else if(this.agreement.bContactPhone == '' ){
      result = '乙方指定联系人手机号';
    }else if(this.agreement.aContactEmail == ''){
      result = '甲方指定联系人邮箱';
    }else if(this.agreement.bContactEmail == '' ){
      result = '乙方指定联系人邮箱';
    }else if(this.agreement.aContactFax == '' ){
      result = '甲方指定联系人传真';
    }else if(this.agreement.bContactFax == ''){
      result = '乙方指定联系人传真';
    }else if(this.agreement.aContactAddress == '' ){
      result = '甲方指定联系人地址';
    }else if(this.agreement.bContactAddress == ''){
      result = '乙方指定联系人地址';
    }else if(this.agreement.aSiger == ''){
      result = '甲方法定代表人';
    }else if(this.agreement.bSiger == ''){
      result = '乙方法定代表人';
    }
    return result;
  }
}


