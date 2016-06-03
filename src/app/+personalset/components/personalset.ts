/**
 * Created by lenovo on 2016/6/2.
 */
import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {AfterViewInit} from "@angular/core";
import  {User} from '../../shared/index';
import {UtilService} from "../../shared/index";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'navbar-box',
  providers:[UtilService],
  template: require('app/+personalset/components/personalset.html')
})
export class PersonalSetComponent implements AfterViewInit{
  user:User;
  constructor(private router:Router,private _util:UtilService)  {
    this.user = new User();
    if(sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.freshUser();
    }
  }

  ngAfterViewInit() {
    jQuery('#leftMenu')
      .accordion();
  }

  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }

  choose(value:string){
    console.log(value);
  }

  updataUser(){
    this._util.updataUser(JSON.stringify(this.user)).subscribe((res:Response)=>{
      this.freshUser();
    });
  }

  //刷新数据
  freshUser(){
    this._util.getUserById(this.user.id).subscribe((resp:Response)=>{
      this.user = resp.json();
    });
  }
}
