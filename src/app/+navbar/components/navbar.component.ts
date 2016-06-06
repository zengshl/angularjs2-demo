import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {User} from "../../shared/index";
import {AfterViewInit} from "@angular/core";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'navbar-box',
  styles: [ require('app/+navbar/components/navbar.component.css') ],
  template: require('app/+navbar/components/navbar.component.html')
})
export class NavbarComponent implements AfterViewInit{
  isLogin:boolean = false;
  user:User;
  constructor(private router:Router)  {
    this.user = new User();
    //假设已经登陆(假数据)
    //this.user.phone = '13712345678';
    //this.user.userName = 'Jason';
    //sessionStorage.setItem('user',JSON.stringify(this.user));

    //假如已经登陆
    if(sessionStorage.getItem('user')){
      this.isLogin = true;

      this.user = <User>JSON.parse(sessionStorage.getItem('user'));
     // console.log(this.user)
      if(this.user.userName.trim() === '') {
        this.user.userName = this.user.phone;
      }
    }
    this.dropdown();
  }
  ngAfterViewInit() {

  }
  dropdown(){
    setTimeout(function(){
      jQuery('.ui.dropdown')
        .dropdown();
    },10);
  }

  logout(){
    sessionStorage.clear();
    this.isLogin = false;
    this.router.parent.navigate(['FrontPage']);
    this.dropdown();
  }
  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }
}
