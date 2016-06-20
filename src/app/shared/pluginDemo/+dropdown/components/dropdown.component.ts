import { Component, OnInit } from '@angular/core';
import { DROPDOWN_DIRECTIVES } from 'angular2-semantic-ui/angular2-semantic-ui'

declare var jQuery:JQueryStatic;

@Component({
  selector: 'demo-box',
  directives: [DROPDOWN_DIRECTIVES],
  styles: [ require('app/+demo/components/demo.component.css') ],
  template: require('app/+demo/components/demo.component.html')
})
export class DemoComponent {
  private selectedColor: string;
  private selectedPerson: any;
  private selectedPersons: Array<any> = [];
  private colors: Array<string> = [];
  private persons: Array<any> = [];
  private fieldForShow: string;

  constructor() {
    this.colors = ["Green", "Red", "Blue", "Yellow", "Black"];
    this.persons = [
      {
        "id": 1,
        "name": "Tom",
        "age": 18
      }, {
        "id": 2,
        "name": "Jerry",
        "age": 25
      }, {
        "id": 3,
        "name": "Jim",
        "age": 15
      }
    ]
    this.fieldForShow = "name";
  }

  ngOnInit() {
    this.selectedPersons.push(this.persons[1]);
  }



}



