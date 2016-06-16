import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';
declare var jQuery:JQueryStatic;

@Component({
  selector: 'personal-box',
  directives:[ROUTER_DIRECTIVES],
  template: require('app/+personal/components/personal.component.html')
})

export class PersonalComponent implements AfterViewInit{

  constructor(private router:Router){}
  ngAfterViewInit() {}
  nav(name:string){
    this.router.parent.navigate([name]);
  }
  navSelf(name:string){
    this.router.navigate([name]);
  }
  test(){
    swal("Good job!", "You clicked the button!", "success");
  }
}
