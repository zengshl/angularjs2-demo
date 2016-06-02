import {Component,AfterViewInit } from '@angular/core';
import {ConfidentAgreement,UtilService,Moudle,Doctype} from "../../shared/index";
import {CheckBox} from "../../shared/services/entity.service";
import  {FORM_DIRECTIVES} from '@angular/common';
declare var jQuery:JQueryStatic;

@Component({
  selector: 'newfile-box',
  providers: [UtilService],
  directives:[FORM_DIRECTIVES],
  styles: [ require('app/+newfile/components/newfile.component.css') ],
  template: require('app/+newfile/components/newfile.component.html')
})
export class NewFileComponent implements AfterViewInit {


  //问题显示开关
    showList:boolean = true;
    showPro:boolean = false;
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
  mds:Moudle;

  //步骤
  step1:string = 'active';
  step2:string = 'disabled';
  step3:string = 'disabled';

  constructor(private _util:UtilService){
    //获取保密信息定义列表
    _util.getConfinfo().subscribe((res)=>{
      this.confinfo = <CheckBox[]> res.json();
    });
    //获取保密人员列表
    _util.getConfreciever().subscribe((res)=>{
      this.confreciever = <CheckBox[]> res.json();
    });
    //获取文件模板列表
    _util.getMould().subscribe((res)=>{
      this.moulds = <Moudle[]>res.json();
      //console.log(this.moulds);
    });
    //if(sessionStorage.getItem("nextStep1")){ //如果已经进入了第二个阶段
    //  this.showList = false;
    //  this.showQ6 = true;
    //  this.step1 = 'completed';
    //  this.step2 = 'active';
    //  this.step3 = 'disabled';
    //}
  }

  ngAfterViewInit():any {
    //jQuery(".ui.checkbox").checkbox();
  }

//获取docType
  getDocType(moudleId:number):Doctype[]{
    this._util.getDoctype(moudleId).subscribe((res)=>{
       this.docType = <Doctype[]>res.json();
    });
    console.log(this.docType);
    return this.docType;
  }

//返回重新填写
  back(){
    //复原
    this.business = false;
    this.discloseToA = false;
    this.discloseToB = false;
    this.aPersonName = null;
    this.bPersonName = null;
    this.aCompanyName = null;
    this.bCompanyName = null;
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
    sessionStorage.setItem("nextStep1","true");
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
      this.agreement.dispute = 1;
    }else{
      this.agreement.dispute = 2;
    }
    if(this.liability){
      this.agreement.liability = 1;
    }else{
      this.agreement.liability = 2;
    }
    console.log(this.agreement.recievers);
  }

  //最后总结
  finalConclude(){

  };




}
