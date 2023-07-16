// animation currently commented out

import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
// import { slideInAnimation } from './utils/Animations/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  // animations: [ slideInAnimation ]  
})



export class AppComponent {
  // constructor(private contexts: ChildrenOutletContexts) {}

  // getRouteAnimationData() {
  //   return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  // }
}
