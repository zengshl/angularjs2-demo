import  {Http} from '@angular/http';
import  {Injectable} from '@angular/core';
/**
 * Created by Ping on 2016/5/10.
 */
  @Injectable()
export class UtilService  {

private url = 'http://localhost:9000/';
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
    var str = this.url+'law/sysuser/pageListPost';
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
};
