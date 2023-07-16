import { Component, } from '@angular/core';
import { InsuranceFormComponent } from '../InsuranceForm/insuranceForm.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from 'src/app/utils/FormDataServices/formDataServices';
@Component({
  selector: 'quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.sass']
})

export class QuotationComponent {
  constructor(private route: ActivatedRoute, private formDataService: FormDataService, private router: Router) { }
  ngOnInit() { 
    this.route.queryParams.subscribe(params => {
      this.monthlyQuote = params['monthlyQuote'];
      this.quoteReference = params['quoteReference'];
    });    
  }
  monthlyQuote = null;
  quoteReference = null;

  handleBackToLanding() {
    this.formDataService.clearAllFormData();
    this.router.navigate(['/']);    
  }
}
