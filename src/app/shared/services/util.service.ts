
import  {Http} from '@angular/http';
import  {Injectable} from '@angular/core';
import {DocAttr,ConfidentAgreement} from "./entity.service";
/**
 * Created by Ping on 2016/5/10.
 */
  @Injectable()
export class UtilService  {

//private url = 'http://120.24.252.170:9000/';
  private url = 'http://192.168.1.104:9000/';
  constructor(public http: Http)  {
    //通过构造器解析网页内部的json数据，将原始数据流存储于_promise中，将流的json对象存储到components中；
    //this._promise = new Promise<void>((resolve) =>  {
    //  http.get('assets/json/users.json')
    //    .subscribe((res: Response) =>  {
    //      this.users = res.json();
    //      resolve();
    //    });
    //});


  };
//将构造器解析出来的存储于components中的json数据，转为原始数据流，并存储于_promise中，并返回；
//  getUsers(): Promise<User[]>  {
//    return this._promise.then(() =>  {
//      return this.users;
//    });
//  };
  //获取confinfo的jason数据
  getConfinfo(){
    return this.http.get("assets/json/confinfo.json");
  }
  //获取confreciever的jason数据
  getConfreciever(){
    return this.http.get("assets/json/confreciever.json");
  }
  //获取mould的jason数据
  getMould(){
    var str = this.url + 'law/doc/getMoudleList';
    return this.http.get(str);
  }
  //获取doctype的jason数据
  getDoctype(mouldId:number){
    var str = this.url + 'law/doc/getDocTypeListByMoudleId/'+ mouldId;
    return this.http.get(str);
  }
  //获取验证码
  getValidCode(phone:string):any  {
    var str = this.url + 'law/user/smsValid/'+phone;
   return this.http.get(str);
  };
  //获取验证码
  getValidCodeForgot(phone:string):any  {
    var str = this.url + 'law/user/smsValidMdPassword/'+phone;
    return this.http.get(str);
  };
  //手机号或者邮箱获取验证码
  getValidMdPassword(data:string):any{
    var str = this.url + 'law/user/ValidMdPassword';
    return this.http.post(str,data);

  }
  //注册表单提交
  signUp(data:string)  {
    var str = this.url + 'law/user/register';
    return this.http.post(str,data);
  };
  //登陆
  logIn(data:string)  {
    var str = this.url + 'law/user/login';
    return this.http.post(str,data);
  };
    //修改密码
    mdfPassword(data:string)  {
        var str = this.url + 'law/user/forgetPassword';
        return this.http.post(str,data);
    };

  //用户管理部分
  //获取管理用户信息
  getAdmin(pageData:string):any {
    var str = this.url+'law/sysuser/pageListMap';
    return this.http.post(str,pageData);
  };

  //获取数据
  getData(pageData:string,url:string):any {
    var str = url+"/pageListMap";
    return this.http.post(str,pageData);
  }

  //删除管理用户信息
  deleteAdmin(data:string):any{
    var str = this.url+ 'law/sysuser/userDelect';
    return this.http.post(str,data);
  }

  getAdminInfo(data:string):any{
    var str = this.url+'law/sysuser/getInfo';
    return this.http.post(str,data);
  }

  updataAdminInfo(data:string):any{
    var str = this.url+"law/sysuser/updataInfo";
    return this.http.post(str,data);
  }

  insertAdminInfo(data:string):any{
    var str = this.url+"law/sysuser/insertInfo";
    return this.http.post(str,data);
  }

  adminDeletes(data:string){
    var str = this.url+"law/sysuser/deletes";
    return this.http.post(str,data);
  }

  //通过客户id获取文件夹
  getFolder(userId:number){
    var str = this.url + "law/doc/queryFolderByUserId/"+userId;
    return this.http.get(str);
  }
  //通过客户id和文件夹id获取文件
  getFile(folderId:number,userId:number){ //folderId 为零，则文件未分类
    var str = this.url + "law/doc/queryDocByUserIdFoldId/"+folderId+"/"+userId;
    return this.http.get(str);
  }
  //删除文件夹
  deleteFolder(folderId:number,userId:number){
    var str = this.url + "law/doc/removeFolder/"+userId+"/"+folderId;
    return this.http.get(str);
  }
  //更新文件夹
  updateFolder(data:string){
    var str = this.url + 'law/doc/updataFolder';
    return this.http.post(str,data);
  }

  //更新文件
  updateFile(data:string){
    data = '{"doc":'+data+'}';
    var str = this.url + 'law/doc/updataDocument';
    return this.http.post(str,data);
  }
  //更新文件的文件夹id
  updateFileFolder(data:string){
    var str = this.url + 'law/doc/updataDocumentWithFolderId';
    return this.http.post(str,data)
  }


  adminLogin(data:string)  {
    var str = this.url + 'law/sysuser/loginByPhone';
    return this.http.post(str,data);
  }

  getAllRole():any{
    var str = this.url+"law/sysuser/getAllRole";
    return this.http.get(str);
  }
  //角色管理部分
  //获取管理用户信息
  getRole(pageData:string):any {
    var str = this.url+'law/sysrole/pageList';
    return this.http.post(str,pageData);
  };

  //删除管理用户信息
  deleteRole(data:string):any{
    var str = this.url+'law/sysrole/roleDelect';
    return this.http.post(str,data);
  }

  getRoleInfo(data:string):any{
    var str = this.url+'law/sysrole/getInfo';
    return this.http.post(str,data);
  }

  updataRoleInfo(data:string):any{
    var str = this.url+"law/sysrole/updataInfo";
    return this.http.post(str,data);
  }

  insertRoleInfo(data:string):any{
    var str = this.url+"law/sysrole/insertInfo";
    return this.http.post(str,data);
  }

  getAllMenu():any{
    var str = this.url+"law/sysrole/getAllMenu";
    return this.http.get(str);
  }

  //批量删除角色
  roleDeletes(data:string):any{
    var str = this.url+"law/sysrole/deletes";
    return this.http.post(str,data);
  }
  /**
   * 文件夹部分
   * */
  getFolderList(data:string){
    var str = this.url + "law/doc/pageFolder";
    return this.http.post(str,data);
  }

  getDocumentByuserIdAndfolderId(data:string){
    var str = this.url + "law/doc/queryDocWithSearchData";
    return this.http.post(str,data);
  }

  //后台用户部分
  getUser(data:string){
    var str = this.url + "law/user/pagelist";
    return this.http.post(str,data);
  }
  //创建文件夹
  createFolder(folderName:string,userId:number){
    var str = this.url + "law/doc/createFolde";
    var data = '{"folderName":"'+folderName+'", "userId":'+userId+'}'
    return this.http.post(str,data);


  }

  //后台模板部分
  getMoudle(data:string){
    var str = this.url + "law/moudle/pageList";
    return this.http.post(str,data);
  }

  deleteMoudle(data:string){
    var str = this.url + "law/moudle/moudleDelect";
    return this.http.post(str,data);
  }

  getMoudleInfo(data:string){
    var str = this.url + "law/moudle/getInfo";
    return this.http.post(str,data);
  }

  updataMoudleInfo(data:string){
    var str = this.url + "law/moudle/updataInfo";
    return this.http.post(str,data);
  }

  insertMoudleInfo(data:string){
    var str = this.url + "law/moudle/insertInfo";
    return this.http.post(str,data);
  }

  getDocTemplate(data:string){
    var str = this.url + "law/moudle/getDocTemplate";
    return this.http.post(str,data);
  }
  //后台文件资源模板
  deleteTemplate(data:string){
    var str = this.url + "law/template/deleteTemplate";
    return this.http.post(str,data);
  }

  getTemplateInfo(data:string){
    var str = this.url + "law/template/getTemplateInfo";
    return this.http.post(str,data);
  }

  updataTemplateInfo(data:string){
    var str = this.url + "law/template/updataTemplateInfo";
    return this.http.post(str,data);
  }

  insertTemplateInfo(data:string){
    var str = this.url + "law/template/insertTemplateInfo";
    return this.http.post(str,data);
  }

  //获取全部文档模块
  getAllMoudle(){
    var str = this.url+"law/moudle/getAllMoudle";
    return this.http.get(str);
  }

  //
  insertTypeMoudle(data:string){
    var str = this.url + "law/moudle/insertTypeMoudle";
    return this.http.post(str,data);
  }
  //创建文件，返回文件id
  createFile(data:string){
    var str = this.url + "law/doc/insertUserDoc";
    return this.http.post(str,data);
  }
  //创建文件属性，返回文件0，1
  createDocAttr(data:string){
    var str = this.url + "law/docattr/insert";
    return this.http.post(str,data);
  }
  //通过文件id,获取所有该文件属性
  getDocAttrs(docId:number){
    var data = JSON.stringify({"documentId":docId});
    var str = this.url + "law/docattr/getAttrWithDocumentId";
    return this.http.post(str,data);
  }
  //生成文档文件
  generateFile(fileId:string,format:string){
    var str = this.url + "law/doc/downLoadFile/"+fileId+"/"+format;
    if(format == "show"){
      this.http.get(str).subscribe((res)=>{
        var path = res.json();
        str = "file:///"+path;
        window.open(str);
      })
    }else{
      window.open(str);
    }

    //return this.http.get(str);

  }
  //根据id获取用户信息
  getUserById(id:number){
    var str = this.url + "law/user/getUserById/"+id;
    return this.http.get(str);
  }
  //更新用户信息
  updataUser(data:string){
    var str = this.url + "law/user/updata";
    return this.http.post(str,data);
  }
  //删除文档
  deleteFile(docId:number){
    var data = JSON.stringify({"documentId":docId});
    var str = this.url + "law/doc/deleteDocById";
    return this.http.post(str,data);
  }
  //获取案件类型列表
  getLawCategory(){
    var str = "assets/json/lawcategory.json";
    return this.http.get(str);
  }

  //对属性数据进行转化 1
  transFormat(attr:DocAttr[]):ConfidentAgreement{
    var c = new ConfidentAgreement();
    attr.forEach((a:DocAttr)=>{
      if(a.attrName === "organizationType") c.organizationType = a.attrValue;
      if(a.attrName === "aName") c.aName = a.attrValue;
      if(a.attrName === "aIdNo") c.aIdNo = a.attrValue;
      if(a.attrName === "aAddress") c.aAddress = a.attrValue;
      if(a.attrName === "bName") c.bName = a.attrValue;
      if(a.attrName === "bIdNo") c.bIdNo = a.attrValue;
      if(a.attrName === "bAddress") c.bAddress = a.attrValue;
      if(a.attrName === "projectName") c.projectName = a.attrValue;
      if(a.attrName === "confDefination") c.confDefination = a.attrValue;
      if(a.attrName === "contractPeriod") c.contractPeriod = parseInt(a.attrValue);
      if(a.attrName === "secrecy") c.secrecy = parseInt(a.attrValue);
      if(a.attrName === "aContactName") c.aContactName = a.attrValue;
      if(a.attrName === "aContactPhone") c.aContactPhone = a.attrValue;
      if(a.attrName === "aContactEmail") c.aContactEmail = a.attrValue;
      if(a.attrName === "aContactFax") c.aContactFax = a.attrValue;
      if(a.attrName === "aContactAddress") c.aContactAddress = a.attrValue;
      if(a.attrName === "bContactName") c.bContactName = a.attrValue;
      if(a.attrName === "bContactPhone") c.bContactPhone = a.attrValue;
      if(a.attrName === "bContactEmail") c.bContactEmail = a.attrValue;
      if(a.attrName === "bContactFax") c.bContactFax = a.attrValue;
      if(a.attrName === "bContactAddress") c.bContactAddress = a.attrValue;
      if(a.attrName === "recievers") c.recievers = a.attrValue;
      if(a.attrName === "dispute") c.dispute = a.attrValue;
      if(a.attrName === "liability") c.liability = a.attrValue;
      if(a.attrName === "aSiger") c.aSiger = a.attrValue;
      if(a.attrName === "bSiger") c.bSiger = a.attrValue;
    })
    return c;
  }
//属性转化2
  setAttrData(documentId:number,agreement:ConfidentAgreement):DocAttr[]{
    var attrData:DocAttr[] = new Array<DocAttr>();
    var a = new DocAttr(documentId,"aName",agreement.aName);
    attrData.push(a);
    a = new DocAttr(documentId,"bName",agreement.bName);
    attrData.push(a);
    a = new DocAttr(documentId,"organizationType",agreement.organizationType);
    attrData.push(a);
    a = new DocAttr(documentId,"aIdNo",agreement.aIdNo);
    attrData.push(a);
    a = new DocAttr(documentId,"bIdNo",agreement.bIdNo);
    attrData.push(a);
    a = new DocAttr(documentId,"projectName",agreement.projectName);
    attrData.push(a);
    a = new DocAttr(documentId,"confDefination",agreement.confDefination);
    attrData.push(a);
    a = new DocAttr(documentId,"contractPeriod",""+agreement.contractPeriod);
    attrData.push(a);
    a = new DocAttr(documentId,"secrecy",""+agreement.secrecy);
    attrData.push(a);
    a = new DocAttr(documentId,"aContactName",agreement.aContactName);
    attrData.push(a);
    a = new DocAttr(documentId,"bContactName",agreement.bContactName);
    attrData.push(a);
    a = new DocAttr(documentId,"aContactPhone",""+agreement.aContactPhone);
    attrData.push(a);
    a = new DocAttr(documentId,"bContactPhone",""+agreement.bContactPhone);
    attrData.push(a);
    a = new DocAttr(documentId,"aContactEmail",agreement.aContactEmail);
    attrData.push(a);
    a = new DocAttr(documentId,"bContactEmail",""+agreement.bContactEmail);
    attrData.push(a);
    a = new DocAttr(documentId,"aContactFax",""+agreement.aContactFax);
    attrData.push(a);
    a = new DocAttr(documentId,"bContactFax",agreement.bContactFax);
    attrData.push(a);
    a = new DocAttr(documentId,"aContactAddress",agreement.aContactAddress);
    attrData.push(a);
    a = new DocAttr(documentId,"bContactAddress",""+agreement.bContactAddress);
    attrData.push(a);
    a = new DocAttr(documentId,"recievers",""+agreement.recievers);
    attrData.push(a);
    a = new DocAttr(documentId,"dispute",""+agreement.dispute);
    attrData.push(a);
    a = new DocAttr(documentId,"liability",""+agreement.liability);
    attrData.push(a);
    a = new DocAttr(documentId,"aSiger",agreement.aSiger);
    attrData.push(a);
    a = new DocAttr(documentId,"bSiger",""+agreement.bSiger);
    attrData.push(a);
    return attrData;
  }

};




