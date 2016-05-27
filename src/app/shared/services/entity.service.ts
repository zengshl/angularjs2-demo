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
}
