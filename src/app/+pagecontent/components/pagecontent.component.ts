import {Component} from '@angular/core';
//import {AlertComponent} from "../../+alert/components/alert.component";
//import {ConversationComponent} from "../../+conversation/components/conversation.component";
//import {DataComponent} from "../../+data/components/data.component";
//import {PageHeaderComponent} from "../../+pageheader/components/pageheader.component";
//import {PopularDomainsComponent} from "../../+populardomains/components/populardomains.component";
//import {RecentComponent} from "../../+recent/components/recent.component";
//import {SaleStatsComponent} from "../../+salestats/components/salestats.component";
//import {TrafficComponent} from "../../+traffic/components/traffic.component";

@Component({
  selector: 'page-content',
  //directives:[AlertComponent,ConversationComponent,DataComponent,
  //  PageHeaderComponent,PopularDomainsComponent,RecentComponent,SaleStatsComponent,TrafficComponent],
  template: require('app/+pagecontent/components/pagecontent.component.html')
})
export class PageContentComponent {}


