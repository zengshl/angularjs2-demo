import  {Http} from '@angular/http';
import  {Injectable} from '@angular/core';
import {Folder,File} from "./entity.service";
/**
 * Created by Ping on 2016/5/10.
 */
  @Injectable()
export class UtilService  {
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
  //获取管理用户信息
  getAdmin(pageData:string):any  {
    var str = this.url + 'law/sysuser/pageListPost';
    return this.http.post(str,pageData);
  };

  //获取数据
  getData(pageData:string,url:string):any  {
    var str = url+'/pageListMap';
    return this.http.post(str,pageData);
  }

  //删除管理用户信息
  deleteAdmin(data:string):any {
    var str = this.url + 'law/sysuser/userDelect';
    return this.http.post(str,data);
  };

  getAdminInfo(data:string):any {
    var str = this.url + 'law/user/getInfo';
    return this.http.post(str,data);
  };

  updataAdminInfo(data:string):any {
    var str = this.url + 'law/user/updataInfo';
    return this.http.post(str,data);
  };

  insertAdminInfo(data:string):any {
    var str = this.url + 'law/user/insertInfo';
    return this.http.post(str,data)
  };

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
  updateFolder(folder:Folder){
    var str = this.url + '/law/doc/updataFolder';
    return this.http.post(str,folder)
  }

  //更新文件
  updateFile(file:File){
    var str = this.url + '/law/doc/updataDocument';
    return this.http.post(str,file)
  }
  //更新文件的文件夹id
  updateFileFolder(data:string){
    var str = this.url + '/law/doc/updataDocumentWithFolderId';
    return this.http.post(str,data)
  }

};
