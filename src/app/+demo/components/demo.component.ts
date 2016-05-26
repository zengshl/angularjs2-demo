import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DragulaService} from "ng2-dragula/ng2-dragula";
import {Dragula} from "ng2-dragula/ng2-dragula";

declare var jQuery:JQueryStatic;

@Component({
  selector: 'demo-box',
  directives: [Dragula],
  viewProviders: [DragulaService],
  styles: [ require('app/+demo/components/demo.component.css') ],
  template: require('app/+demo/components/demo.component.html')
})
export class DemoComponent implements AfterViewInit{
  public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  public many2: Array<string> = ['Explore', 'them'];
  constructor(private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    console.log("drop")
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }



}



