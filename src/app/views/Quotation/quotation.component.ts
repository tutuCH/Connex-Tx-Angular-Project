import { Component, } from '@angular/core';
import { InsuranceFormComponent } from '../InsuranceForm/insuranceForm.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.sass']
})

export class QuotationComponent {
  constructor(private route: ActivatedRoute) { }
  ngOnInit() { 
    this.route.queryParams.subscribe(params => {
      this.monthlyQuote = params['monthlyQuote'];
      this.quoteReference = params['quoteReference'];
    });    
  }
  monthlyQuote = null;
  quoteReference = null;

}
