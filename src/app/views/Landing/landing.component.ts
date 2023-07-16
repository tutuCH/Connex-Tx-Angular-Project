import { Component, } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})

export class LandingComponent {
  constructor(private router: Router) { }
  ngOnInit() { }
  
  handleLandingClick() {
    // navigate to /insurace-form
    this.router.navigate(['/insurance-form']);
  }

}
