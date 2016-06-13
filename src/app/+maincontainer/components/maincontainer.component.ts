import {Component} from '@angular/core';
import {AlertComponent} from "../../+alert/components/alert.component";
import {BreadCrumbsComponent} from "../../+breadcrumbs/components/breadcrumbs.component";
import {ConversationComponent} from "../../+conversation/components/conversation.component";
import {DataComponent} from "../../+data/components/data.component";
import {NavlistComponent} from "../../+navlist/components/navlist.component";
import {PageHeaderComponent} from "../../+pageheader/components/pageheader.component";
import {PopularDomainsComponent} from "../../+populardomains/components/populardomains.component";
import {RecentComponent} from "../../+recent/components/recent.component";
import {SaleStatsComponent} from "../../+salestats/components/salestats.component";
import {SettingComponent} from "../../+setting/components/setting.component";
import {TrafficComponent} from "../../+traffic/components/traffic.component";
import {ROUTER_PROVIDERS} from "@angular/router";
import {InquireComponent,PageContentComponent} from "../../+pagecontent/index";

@Component({
  selector: 'main-container',
  directives:[BreadCrumbsComponent,SettingComponent],
  template: require('app/+maincontainer/components/maincontainer.component.html')
})


export class MainContainerComponent {}
