import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
//import {Router} from "@angular/router";
import {NavbarComponent} from "../../+navbar/index";
import {HeaderComponent} from "../../+head/index";
import {MainComponent} from "../../+main/index";
//import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
import {BlankComponent} from "../../+blank/index";
import {AdviceComponent} from "../../+advice/index";
import {AdminComponent} from "../../+admin/index";

@Component({
  selector: 'front-page',
  directives:[ROUTER_DIRECTIVES,NavbarComponent,HeaderComponent],
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
    path: '/',
    name: 'Main',
    component: MainComponent,
    useAsDefault: true
  },
  {
    path: '/shouye',
    name: 'Shouye',
    component: MainComponent
  },
  {
    path: '/advice',
    name: 'Advice',
    component: AdviceComponent
  }
])
export class FrontPageComponent implements AfterViewInit{
  constructor(private router:Router){}
  ngAfterViewInit() {



  }
  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }
}
