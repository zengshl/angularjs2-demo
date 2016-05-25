import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'sd-navbar',
  styles: [ require('app/shared/navbar/navbar.component.css') ],
  template: require('app/shared/navbar/navbar.component.html'),
  directives: [ROUTER_DIRECTIVES]
})
/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {}
