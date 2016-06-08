import {Component} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {UtilService,LawCategory} from "../../shared/index";
declare var jQuery:JQueryStatic;

@Component({
  selector: 'advice-box',
  providers:[UtilService],
  styles: [ require('app/+advice/components/advice.component.css') ],
  template: require('app/+advice/components/advice.component.html')
})
export class AdviceComponent implements AfterViewInit{
  lawCategory:LawCategory[] = [];

  ngAfterViewInit(){
    jQuery("#selected").dropdown(); //通过这种方式，可以直接实现semantic的dropdown效果；
    // jQuery("#selected").dropdown({
    //     action: 'hide',
    //     onChange: function(value, text, $selectedItem) {
    //         jQuery("#dataHide").val(value);
    //         console.log(jQuery("#dataHide").val())
    //     }
    // })
  }

  constructor(private _util:UtilService){
    _util.getLawCategory().subscribe((res)=>{
      this.lawCategory = <LawCategory[]>res.json();
    })

  }

  //console.log(data);
  onItemChange(value:string){
    console.log(parseInt(value));
  }


}
