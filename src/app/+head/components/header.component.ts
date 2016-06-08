import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {Router} from '@angular/router-deprecated';
declare var jQuery:JQueryStatic;

@Component({
  selector: 'header-box',
  styles: [ require('app/+head/components/header.component.css') ],
  template: require('app/+head/components/header.component.html')
})
export class HeaderComponent implements AfterViewInit{
  constructor(private router:Router){}
  ngAfterViewInit() {

    jQuery('.flexslider').flexslider({
      animation: "fade",
      controlsContainer: ".flexslider",
      // slideDirection: "vertical",
      slideshowSpeed: 3000,
      directionNav: false,
      controlNav: true,
      animationDuration: 900
    });

  }
  nav(name:string){
    this.router.parent.navigate([name]);
  }

}
