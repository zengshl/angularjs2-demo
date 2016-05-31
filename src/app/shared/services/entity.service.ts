/**
 * Created by Ping on 2016/5/10.
 */
export class User {
  id:number;
  account:string;
  phone:string;
  password:string;
  email:string;
  userName:string;
  status:string;
  address:string;
  createTime:string;
  remark:string;
}
//对象必须赋初值，否则scala后台转对象时会报错
export class Admin {
  id:number = 0;
  phone:string = "";
  password:string = "";
  account:string = "";
  status:string = "";
  createTime:string = "";
  modifyTime:string = "";
  remark:string = "";
}

export class PageData {
  data:any;
  page: number;
  size: number;
  total :number;
  searchData:any;
  iDisplayStart:number;
  iDisplayLength:number;
}

export class UserBase {
  id:number = 0;
  userId: number = 0;
  userName: string = "";
  sex :string = "";
  email:string = "";
  remark:string = "";
  createTime:string = "";
  modifyTime:string = "";
}


export class UserMember {
  id:number;
  userId: number;
  memberGrade: number;
  remark :string;
  description:string;
  status:string;
  createTime:string;
  expireTime:string;
}

export class UserContact {
  id:number;
  userId: number;
  remark: number;
  contactPhone :string;
  contactName:string;
  createTime:string;
  lastContactTime:string;
}

export class Folder {
  id:number;
  userId: number;
  fileName: string;
  fileType :string;
  createTime:string;
  remark:string;
}

export class File {
  id:number;
  userId: number;
  folderId: number;
  docName :string;
  docContext :string;
  docPath :string;
  docType :string;
  createTime:string;
  remark:string;
  templateId:number;
}

export class Role{
  id:number = 0;
  roleName:string = "";
  roleNo:string = "";
  roleDes:string = "";
  flag:boolean = false;
}

export class Menu{
  id:number = 0;
  menuName:string = "";
  menuNo:string = "";
  menuDes:string = "";
  menuPath:string = "";
  menuValue:string = "";
  routerName:string = "";
  pid:number = 0;
  flag:boolean = false;
}

export class Power{
  id : number = 0;
  roleId : number = 0;
  powerId : number = 0;
  powerType : string = "";
  remark : string = "";
}

export class UserRole{
  id : number = 0;
  userId : number = 0;
  roleId : number = 0;
  remark : string = "";
}

export class Moudle{
  id : number = 0;
  moudleName : string = "";
  createTime : string = "";
  remark : string = "";
}

export class Doctype{
  id : number = 0;
  preId : number = 0;
  typeName : string = "";
  moudleId : number = 0;
  status : string = "";
  remark : string = "";
}

export class DocTemplate{
  id: number = 0;
  typeId: number = 0;
  resourceName : string = "";
  resourcePath : string = "";
  resourceTitle : string = "";
  resouceContext : string = "";
  createTime : string = "";
  docTypeId: string = "";
}

