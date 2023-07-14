import { Component, } from '@angular/core';
import { InsuranceForm, Vehicle } from 'src/app/data/dataTypes';
import { ApiService } from '../../utils/ApiServices/apiServices'
import { API_URL } from 'src/app/data/apiLists';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})

export class LandingComponent {
  constructor() { }
  ngOnInit() { }

  insuranceForm: InsuranceForm = {}
  vehicleForm: Vehicle = {}
  isInsuranceFormCompleted = false;
  apiService = new ApiService();

  handleInsuranceFormChange(insuranceInput: InsuranceForm) {
    this.insuranceForm = Object.fromEntries(Object.entries(insuranceInput).map(([key, value]) => [key, typeof value === 'string' ? parseFloat(value) : value]));;
    console.log(this.insuranceForm)
    this.isInsuranceFormCompleted = true;
  }

  handleVehicleFormChange(vehicleInput: Vehicle) {
    this.vehicleForm = vehicleInput;
    this.handleSubmission();
  }

  handleSubmission() {
    const requestBody = this.insuranceForm;
    console.table(requestBody)
    this.apiService.postApiCall(`http://localhost:8080/${API_URL.GET_PREMIUM_AND_QUOTE_REF}`, requestBody)
    .subscribe(response => {
      console.log(response);
    });
  }  
}
