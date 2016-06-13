



































































































import {Component } from '@angular/core';
import {ConfidentAgreement,UtilService,Moudle,Doctype,DocAttr,File} from "../../shared/index";
import {Router} from '@angular/router-deprecated';
import {CheckBox} from "../../shared/services/entity.service";
import  {FORM_DIRECTIVES} from '@angular/common';
declare var jQuery:JQueryStatic;

@Component({
  selector: 'confidtemplate-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES],
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
    showQ41:boolean = false;
    showQ5:boolean = false;
    showQ6:boolean = false;
    showQ7:boolean = false;
    showQ8:boolean = false;
    showQ9:boolean = false;
    showQ10:boolean = false;

  //问题的数据
  agreement: ConfidentAgreement = new ConfidentAgreement();
  business:boolean = false; //是否是企业 / 个人
  discloseToB:boolean = false; //是否向乙方披露
  discloseToA:boolean = false; //是否向甲方披露
  aPersonName:string; //甲方自然人姓名
  bPersonName:string; //乙方自然人姓名
  aCompanyName:string; //甲方公司名称
  bCompanyName:string; //乙方公司名称
  conclusion:string; //总结信息
  aIdNo:string;
  bIdNo:string;
  confinfo:CheckBox[]; //保密信息列表
  confreciever:CheckBox[]; //保密人员列表
  dispute:boolean = true; //争议版本切换
  liability:boolean = true;
  moulds:Array<Moudle> = new Array<Moudle>();
  docType:Array<Doctype> = new Array<Doctype>();
  differ:any;
  file:File = new File();
  //步骤
  step1:string = 'active';
  step2:string = 'disabled';
  step3:string = 'disabled';
  //组装Attr json对象
  docAttr: DocAttr = new DocAttr();
  attrData : Array<DocAttr> = new Array<DocAttr>();
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



  constructor(private _util:UtilService,private router:Router){
    this.file = <File>JSON.parse(sessionStorage.getItem('file'));
    //获取保密信息定义列表
    _util.getConfinfo().subscribe((res)=>{
      this.confinfo = <CheckBox[]> res.json();
    });
    //获取保密人员列表
    _util.getConfreciever().subscribe((res)=>{
      this.confreciever = <CheckBox[]> res.json();
    });

    if(sessionStorage.getItem("nextStep1")){ //如果已经进入了第二个阶段
      //this.nav('./ConfidTemplate');
      this.showPro = false;
      this.showList = false;
      this.showQ6 = true;
      this.step1 = 'completed';
      this.step2 = 'active';
      this.step3 = 'disabled';
    }
  }


//返回重新填写
  back(){
    //复原
    this.business = false;
    this.discloseToA = false;
    this.discloseToB = false;
    this.aPersonName = '';
    this.bPersonName = '';
    this.aCompanyName = '';
    this.bCompanyName = '';
  }
  //总结
  conclude(){
    if(this.business){  //确定个人还是企业
      this.agreement.aName = this.aCompanyName;
      this.agreement.bName = this.bCompanyName;
      this.agreement.organizationType = "企业";
      this.showQ5 = !this.showQ5;
      this.showQ41 = !this.showQ41;
    }else{
      this.agreement.aName = this.aPersonName;
      this.agreement.bName = this.bPersonName;
      this.agreement.organizationType = "自然人";
      this.agreement.aIdNo = this.aIdNo;
      this.agreement.bIdNo = this.bIdNo;
      this.showQ5 = !this.showQ5;
      this.showQ4 = !this.showQ4;
    }

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
      alert(this.agreement.organizationType+"至少是披露方或者接收方，请重新填写问题答案。");
      this.showQ5 = !this.showQ5;
      this.showPro = !this.showPro;
      this.back();

    }


  }
  //下一阶段
  nextStep1(){
    this.step1 = 'completed';
    this.step2 = 'active';
    this.step3 = 'disabled';
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
          sessionStorage.setItem("nextStep1","token");
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
    console.log(this.agreement.confDefination);
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
    this.step1 = 'completed';
    this.step2 = 'completed';
    this.step3 = 'active';
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
      alert("保存成功！");
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
    //console.log(name);
  }

}