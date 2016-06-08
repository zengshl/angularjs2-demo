import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'navlist-box',
  template: require('app/+navlist/components/navlist.component.html')
})
export class NavlistComponent {
  constructor(private router:Router){

  }
  nav(name:string){
    this.router.navigate([name])
    console.log(name);
  }
}
