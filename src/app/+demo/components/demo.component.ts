import { Component, OnInit } from '@angular/core';
import {HighlightDirective} from "../../shared/directives/demo.directive";

@Component({
  selector: 'demo-box',
  directives: [HighlightDirective],
  styles: [ require('app/+demo/components/demo.component.css') ],
  template: require('app/+demo/components/demo.component.html')
})
export class DemoComponent {


  constructor() {

  }



}



