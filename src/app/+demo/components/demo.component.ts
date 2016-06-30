import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-box',
  styles: [ require('app/+demo/components/demo.component.css') ],
  template: require('app/+demo/components/demo.component.html')
})
export class DemoComponent {
  a: number = 0.255;
  b: number = 1.3495;
}


