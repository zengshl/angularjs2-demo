import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it,
  beforeEachProviders
} from '@angular/testing';
import {Component, provide} from '@angular/core';
import {DirectiveResolver} from '@angular/compiler';

import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from '@angular/router';
import {Location} from '@angular/platform/common';
import {SpyLocation} from '@angular/src/mock/location_mock';
import {RootRouter} from '@angular/src/router/router';

import {DOM} from '@angular/src/platform/dom/dom_adapter';
import {AppComponent} from './app.component';

export function main() {

  describe('App component', () => {

    // Support for testing component that uses Router
    beforeEachProviders(() => [
      RouteRegistry,
      DirectiveResolver,
      provide(Location, {useClass: SpyLocation}),
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
      provide(Router, {useClass: RootRouter})
    ]);

    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            expect(DOM.querySelectorAll(appDOMEl, 'sd-app > sd-navbar > nav > a')[1].href).toMatch(/http:\/\/localhost:\d+\/about/);
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>',
  directives: [AppComponent]
})
class TestComponent {}
