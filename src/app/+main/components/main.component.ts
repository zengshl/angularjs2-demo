import {Component} from '@angular/core';
import {ROUTER_PROVIDERS} from "@angular/router";
import {HeaderComponent} from "../../+head/index";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'main-box',
  directives:[HeaderComponent],
  styles: [ require('app/+main/components/main.component.css') ],
  template: require('app/+main/components/main.component.html')
})

export class MainComponent {

}
