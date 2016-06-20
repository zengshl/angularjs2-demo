import { Component, OnInit } from '@angular/core';
import { MODAL_DIRECTIVES } from 'angular2-semantic-ui/angular2-semantic-ui'

@Component({
  selector: 'demo-box',
  directives: [MODAL_DIRECTIVES],
  styles: [ require('app/+demo/components/demo.component.css') ],
  template: require('app/+demo/components/demo.component.html')
})
export class DemoComponent {
  private modalOptions: any;
  private showModal: boolean;

  constructor() {

  }

  ngOnInit() {
    this.modalOptions = {
      "size": "small",
      "type": "default",
      "closeable": true
    }
  }

  activeModal(): void {
    this.showModal = true;
  }

  cancel(): void {
    this.showModal = false;
  }

}



