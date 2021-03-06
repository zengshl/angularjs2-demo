import {Component} from '@angular/core';
import {NavbarComponent} from "../../+navbar/index";
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {BlankComponent} from "../../+blank/index";
import {AdviceComponent} from "../../+advice/index";
import {AdminComponent} from "../../+admin/index";
import {FileComponent} from "../../+file/index";
import {PersonalComponent} from "../../+personal/components/personal.component";
import {PersonalSetComponent} from "../../+personalset/components/personalset";
import {NewFileComponent} from "../../+newfile/index";
import {ChatComponent} from "../../+chat/components/chat.component";
import {SuggestComponent} from '../../+suggest/index';

@Component({
  selector: 'front-page',
  directives:[ROUTER_DIRECTIVES,NavbarComponent,ChatComponent],
  styles: [ require('app/+frontpage/components/frontpage.component.css') ],
  template: require('app/+frontpage/components/frontpage.component.html')
})
@RouteConfig([
  {
    path: '/blank',  //用这种方法，可以默认一个路由为开始路由
    name: 'Blank',
    component: BlankComponent
  },
  {
    path: '/file', //我的文件
    name: 'File',
    component: FileComponent
  },
  {
    path: '/newfile/...', //创建法律文档
    name: 'NewFile',
    component: NewFileComponent
  },
  {
    path: '/advice',
    name: 'Advice',
    component: AdviceComponent
  },
  {
    path: '/personal',      //个人中心
    name: 'Personal',
    component: PersonalComponent,
    useAsDefault: true
  },
  {
    path: '/personalset',  //个人设置
    name: 'PersonalSet',
    component: PersonalSetComponent
  },
  {
    path: '/suggest',
    name: 'Suggest',
    component: SuggestComponent
  }
])
export class FrontPageComponent {
  constructor(private router:Router){
    //如果用户已经登陆，自动跳转
    if(!sessionStorage.getItem('user')) {
      //alert('已经登陆');
      this.nav('Login');
    }
  }
  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }
}
