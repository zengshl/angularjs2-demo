import {Component} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {SysUserComponent} from '../../+sysuser/components/sysuser';
import {SysRoleComponent} from "../../+sysrole/components/sysrole";
import {DocumentComponent} from "../../+document/components/document";
import {FolderComponent} from "../../+folder/components/folder";
import {CustmanagerComponent} from '../../+custmanager/components/custmanager.component';
import {FileComponent} from "../../+file/index";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'admin-box',
  directives: [ROUTER_DIRECTIVES] ,
  styles: [ require('app/+admin/components/admin.component.css') ],
  template: require('app/+admin/components/admin.component.html')
})
@RouteConfig([
  {
    path: '/custmanager',  //用这种方法，可以默认一个路由为开始路由
    name: 'Custmanager',
    component: CustmanagerComponent
  },
  {
    path: '/sysUser',  //用这种方法，可以默认一个路由为开始路由
    name: 'SysUser',
    component: SysUserComponent,
    useAsDefault: true
  },
  {
    path: '/user',  //用这种方法，可以默认一个路由为开始路由
    name: 'User',
    component: SysUserComponent
  },
  {
    path: '/file',  //用这种方法，可以默认一个路由为开始路由
    name: 'File',
    component: FileComponent
  },
  {
    path: '/sysRole',  //角色管理路由
    name: 'SysRole',
    component: SysRoleComponent,
  },
  {
    path: '/folder',  //文件夹管理路由
    name: 'Folder',
    component: FolderComponent,
  },
  {
    path: '/document/:userId/:folderId',  //文件管理路由
    name: 'Document',
    component: DocumentComponent,
  }
])


export class AdminComponent implements AfterViewInit {
  ngAfterViewInit() {
    jQuery('#leftMenu')
      .accordion();

  };

  constructor(private router:Router) {
  }

  nav(name:string) {
    this.router.parent.navigate([name]);
  };

  navSelf(name:string) {
    this.router.navigate([name]);
  };

}
