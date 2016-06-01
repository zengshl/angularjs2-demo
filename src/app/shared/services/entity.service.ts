/**
 * Created by Ping on 2016/5/10.
 */
export class User {
  id:number = 0;
  account:string = "";
  phone:string = "";
  password:string = "";
  email:string = "";
  userName:string = "";
  status:string = "";
  address:string = "";
  createTime:string = "";
  remark:string = "";
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
  page:number = 0;
  size:number = 0;
  total :number = 0;
  searchData:any;
  iDisplayStart:number = 0;
  iDisplayLength:number = 0;
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
  id:number = 0;
  userId:number = 0;
  memberGrade:number = 0;
  remark :string = "";
  description:string = "";
  status:string = "";
  createTime:string = "";
  expireTime:string = "";
}

export class UserContact {
  id:number = 0;
  userId:number = 0;
  remark:number = 0;
  contactPhone :string = "";
  contactName:string = "";
  createTime:string = "";
  lastContactTime:string = "";
}

export class Folder {
  id:number = 0;
  userId:number = 0;
  fileName:string = "";
  fileType :string = "";
  createTime:string = "";
  remark:string = "";
}

export class File {
  id:number = 0;
  userId:number = 0;
  folderId:number = 0;
  docName :string = "";
  docContext :string = "";
  docPath :string = "";
  docType :string = "";
  createTime:string = "";
  remark:string = "";
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
  docTypeId: number = 0;
}

export class ConfidentAgreement{
  id:number = 0;
  mouldId:number = 0;
  mouldName : string = "Confidentiallity Agreement";
  version :number = 0;
  organizationType:string = "";
  aName :string = "";
  aIdNo : string ;
  aAdress :string = "";
  bName :string = "";
  bIdNo : string ;
  bAdress :string = "";
  projectName:string = "";
  confDefination:string = "";
  contractPeriod:number = 0;
  secrecy:number = 0;
  aContactName:string = "";
  aContactPhone:string = "";
  aContactEmail:string = "";
  aContactFax:string = "";
  aContactAdress:string = "";
  bContactName:string = "";
  bContactPhone:string = "";
  bContactEmail:string = "";
  bContactFax:string = "";
  bContactAdress:string = "";
  recievers:string = "";
  dispute:number = 0;
  liability:number = 0;
  aSiger:string = "";
  bSiger:string = "";
  userId: number = 0;
  createTime:string = "";
  remark:string = "";

}
