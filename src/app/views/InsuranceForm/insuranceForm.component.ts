// Import required modules and components
import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/utils/FormDataServices/formDataServices';
import { FormDataKey } from 'src/app/data/dataTypes';
import { InsuranceFormQuestionList } from 'src/app/data/data';
// Define the component
@Component({
  selector: 'insuranceForm',
  templateUrl: './insuranceForm.component.html',
  styleUrls: ['./insuranceForm.component.sass']
})
export class InsuranceFormComponent {
  insuranceFormQuestionList = InsuranceFormQuestionList;
  constructor(private router: Router, private formDataService: FormDataService) { }
  ngOnInit() { 
    const completedInsuranceForm = this.formDataService.getFormData(FormDataKey.INSURANCE_FORM);
    if (completedInsuranceForm && completedInsuranceForm.status === "VALID") {
      this.insuranceForm.setValue(completedInsuranceForm.value);
    }
  }

  // Define the form group with its form controls and validators
  insuranceForm = new FormGroup({
    ageFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
    drivingExperienceFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
    driverRecordFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
    claimsFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
    carValueFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
    annualMileageFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
    insuranceHistoryFormControl: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]*$/)]),
  });

  errorMatcher = new MyErrorStateMatcher();
  // Define a method that will be called when the form is submitted
  handleInsuranceFormSubmit() {
    this.formDataService.saveFormData(FormDataKey.INSURANCE_FORM, this.insuranceForm);
    this.router.navigate(['/vehicle-form']);
  }
}