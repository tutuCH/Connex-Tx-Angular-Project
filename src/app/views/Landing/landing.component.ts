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
    this.router.navigate(['/insurance-form']);
  }

}
