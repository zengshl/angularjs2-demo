import {Component,AfterViewInit } from '@angular/core';
import {ConfidentAgreement} from "../../shared/index";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'newfile-box',
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

constructor(){
  if(sessionStorage.getItem("nextStep1")){ //如果已经进入了第二个阶段
    this.showList = false;
    this.showQ6 = true;
    this.step1 = 'completed';
    this.step2 = 'active';
    this.step3 = 'disabled';
  }
}

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
  test:string ="";
  //步骤
  step1:string = 'active';
  step2:string = 'disabled';
  step3:string = 'disabled';


  ngAfterViewInit():any {
    var str:string ="";
    jQuery("#dropdown").dropdown({
      allowAdditions: true,
      onChange: function(value, text, $selectedItem) {
        str = value.reduce(function(x,y){
          return x+"、"+y;
        });
        console.log(str);
        sessionStorage.setItem("data",str);
      }
    });
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
  //读取多选信息；

  setConf(){
    this.showQ6 = !this.showQ6;
    this.showQ7 = !this.showQ7;
    this.agreement.confDefination = sessionStorage.getItem("data");
    console.log(this.agreement.confDefination);
  }

  //提交有效期
  setDate(){
    this.showQ8 = !this.showQ8;
    this.showQ7 = !this.showQ7
  }


}
